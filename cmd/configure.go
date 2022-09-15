package cmd

import (
	"fmt"
	"net/http"
	"os"
	"path/filepath"
	"strings"
	"time"

	"github.com/imperviousai/imp-daemon/auth"
	"github.com/imperviousai/imp-daemon/comm"
	"github.com/imperviousai/imp-daemon/config"
	"github.com/imperviousai/imp-daemon/contacts"
	"github.com/imperviousai/imp-daemon/core"
	"github.com/imperviousai/imp-daemon/id"
	"github.com/imperviousai/imp-daemon/ipfs"
	"github.com/imperviousai/imp-daemon/key"
	"github.com/imperviousai/imp-daemon/lightning"
	"github.com/imperviousai/imp-daemon/lightning/node"
	"github.com/imperviousai/imp-daemon/messages"
	"github.com/imperviousai/imp-daemon/service"
	"github.com/imperviousai/imp-daemon/service/relay"
	"github.com/imperviousai/imp-daemon/state"
	"go.uber.org/zap"
	"go.uber.org/zap/zapcore"
)

type ConfigureContext struct {
	Core        core.Core
	Websocket   service.Websocket
	HttpDIDComm *http.Server
	Auth        auth.AuthService

	// Global things that don't need to be hot reloaded typically
	KeyManager key.KeyManager
	DB         state.DBManager
	IPFS       ipfs.IPFS
}

func ConfigureCore(globalCfg config.GlobalConfig, prevContext *ConfigureContext) *ConfigureContext {
	cfg := globalCfg.GetConfig()
	var err error

	// Setup state

	// If being reloaded, transfer previous global contexts
	var keyManager key.KeyManager
	var ipfsSvc ipfs.IPFS
	var db state.DBManager
	if prevContext != nil {
		if prevContext.DB != nil {
			db = prevContext.DB
		}
		if prevContext.KeyManager != nil {
			keyManager = prevContext.KeyManager
		}
		if prevContext.IPFS != nil {
			ipfsSvc = prevContext.IPFS
		}
	}

	// setup didcomm http server
	httpDIDCommServer, httpDIDCommMux := ConfigureDIDCommHttpServer(cfg)

	// Setup key management
	// if DB is already loaded, skip unlocking
	// IsReady should be true for non-encrypted types
	if db == nil || !db.IsReady() {
		zap.L().Debug("[Cfg] Configuring database")
		db, err = ConfigureDb(cfg)
		if err != nil {
			zap.L().Panic(err.Error())
		}

		// if passphrase is passed in the config, then auto unlock
		if !db.IsReady() && cfg.Key.Passphrase != "" {
			// Double check if db file even exiss
			// Do not let users unknowing set passphrase
			// on very first load automatically
			isInitialized := db.IsInitialized()
			if isInitialized {
				err = db.Unlock(cfg.Key.Passphrase)
				if err != nil {
					zap.L().Panic(err.Error())
				}
				zap.L().Debug("[Cfg] Auto unlocked db")
			} else {
				panic("Auto init passphrase while db file does not exist; remove cfg.key.passphrase")
			}
		}
	}
	// if key manager is not already loaded, load now
	if keyManager == nil || keyManager.IsLocked() {
		zap.L().Debug("[Cfg] Configuring key manager")
		keyManager, err = key.New(key.Config{Db: db})
		if err != nil {
			zap.L().Panic(err.Error())
		}
		// If passphrase is passed in the config then auto unlock
		if cfg.Key.Passphrase != "" {
			err = keyManager.UnlockSeed(cfg.Key.Passphrase)
			if err != nil {
				zap.L().Panic(err.Error())
			}
			zap.L().Debug("[Cfg] Auto unlocked key manager")
		}
	}

	// Setup auth
	authService, err := ConfigureAuth(cfg, db)
	if err != nil {
		zap.L().Panic(err.Error())
	}

	// channel for shared lightning message listening
	msgChan := make(chan comm.IncomingDIDMessage)

	// Setup lightning manager & nodes
	zap.L().Debug("[Cfg] Configuring lightning manager")
	lightningManager, err := ConfigureLightningManager(cfg, msgChan)
	if err != nil {
		zap.L().Panic(err.Error())
	}

	// Setup http didcomm
	zap.L().Debug("[Cfg] Configuring HTTP DIDComm")
	httpDIDComm, err := ConfigureHTTPDIDComm(cfg, msgChan)
	if err != nil {
		zap.L().Panic(err.Error())
	}
	if httpDIDComm != nil {
		httpDIDCommMux.Handle("/didcomm/http", httpDIDComm)
	}

	// Setup websocket didcomm
	websocketDIDComm, err := ConfigureWebsocketDIDComm(cfg, msgChan)
	if err != nil {
		zap.L().Panic(err.Error())
	}
	if websocketDIDComm != nil {
		httpDIDCommMux.Handle("/didcomm/websocket", websocketDIDComm)
	}

	zap.L().Debug("[Cfg] Configuring lightning nodes")
	if err := AddLightningNodes(cfg, lightningManager); err != nil {
		zap.L().Panic(err.Error())
	}

	// Create the websockets to be listened to
	zap.L().Debug("[Cfg] Setting up websocket service")
	ws := service.NewWebsocket()

	// Setup ION
	var ionSvc id.Ion
	if cfg.ION.Active {
		zap.L().Debug("[Cfg] Setting up ION")
		ionSvc, err = ConfigureIon(cfg, db, keyManager)
		if err != nil {
			zap.L().Panic(err.Error())
		}
	}

	// Setup identity functionality
	identity, err := id.New(id.Config{
		Db:                    db,
		Ion:                   ionSvc,
		KeyManager:            keyManager,
		UniversalResolverUrls: cfg.DID.UniversalResolverUrls,
	})
	if err != nil {
		zap.L().Panic(err.Error())
	}

	// Setup Messages manager
	zap.L().Debug("[Cfg] Setting up Messages")
	messagesManager, err := messages.New(&messages.Config{
		Db: db,
	})
	if err != nil {
		zap.L().Panic(err.Error())
	}

	// Setup DIDComm functionalilty
	didComm, err := comm.NewDIDComm(&comm.DIDCommConfig{
		IncomingDataChan: msgChan,
		LightningManager: lightningManager,
		HttpComm:         httpDIDComm,
		WebsocketDIDComm: websocketDIDComm,
		Identity:         identity,
		MessagesManager:  messagesManager,
	})
	if err != nil {
		zap.L().Panic(err.Error())
	}

	// Setup IPFS - 15 Sep 2022 - markcryptohash - disabled IPFS because we no longer need it.
	// Setup IPFS - 15 Sep 2022 - stewIMP - Added config option to disable instead
	if ipfsSvc == nil && cfg.IPFS.Active {
		zap.L().Debug("[Cfg] Setting up IPFS")
		ipfsSvc, err = ipfs.SetupIPFS(&ipfs.Config{
			DirectoryPath: cfg.IPFS.Directory,
		})
		if err != nil {
			zap.L().Panic(err.Error())
		}
	}

	// Setup Contacts manager
	zap.L().Debug("[Cfg] Setting up Contacts")
	contactsManager, err := contacts.New(&contacts.Config{
		Db:        db,
		IdManager: identity,
	})
	if err != nil {
		zap.L().Panic(err.Error())
	}

	// Setup services
	zap.L().Debug("[Cfg] Registering services")
	serviceHandler, err := ConfigureServiceHandler(cfg, msgChan, keyManager, identity, messagesManager, didComm, db, ws)
	if err != nil {
		zap.L().Panic(err.Error())
	}

	// Add configurations to Core
	zap.L().Debug("[Cfg] Configuring imp core")
	core, err := core.NewImpCore(&core.Config{
		Auth:             authService,
		ServiceHandler:   serviceHandler,
		LightningManager: lightningManager,
		Id:               identity,
		IPFS:             ipfsSvc,
		KeyManager:       keyManager,
		ContactsManager:  contactsManager,
		MessageManager:   messagesManager,
		DIDComm:          didComm,
		DBManager:        db,
		GlobalConfig:     globalCfg,
	})
	if err != nil {
		zap.L().Panic(err.Error())
	}

	return &ConfigureContext{
		Core:        core,
		KeyManager:  keyManager,
		Auth:        authService,
		DB:          db,
		IPFS:        ipfsSvc,
		Websocket:   ws,
		HttpDIDComm: httpDIDCommServer,
	}
}

func ConfigureLogger(globalCfg config.GlobalConfig) (*zap.Logger, error) {
	outputPaths := []string{"stdout"}
	errorOutputPaths := []string{"stderr"}

	// First make sure file exists
	if globalCfg != nil && !globalCfg.GetConfig().Log.IgnoreFileWrite {
		path, err := os.UserHomeDir()
		if err != nil {
			zap.L().Panic(err.Error())
		}
		path += "/.imp/log.txt"
		if err := os.MkdirAll(filepath.Dir(path), 0750); err != nil {
			zap.L().Panic(err.Error())
		}
		if _, err := os.Stat(path); os.IsNotExist(err) {
			f, err := os.Create(filepath.Clean(path))
			if err != nil {
				zap.L().Panic(err.Error())
			}
			defer func() {
				if err := f.Close(); err != nil {
					zap.L().Error(err.Error())
				}
			}()
		}
		outputPaths = append(outputPaths, path)
		errorOutputPaths = append(errorOutputPaths, path)
	}

	return zap.Config{
		Level:       zap.NewAtomicLevelAt(zap.DebugLevel),
		Development: false,
		Sampling: &zap.SamplingConfig{
			Initial:    100,
			Thereafter: 100,
		},
		Encoding: "json",
		EncoderConfig: zapcore.EncoderConfig{
			TimeKey:        "ts",
			LevelKey:       "level",
			NameKey:        "logger",
			CallerKey:      "caller",
			FunctionKey:    zapcore.OmitKey,
			MessageKey:     "msg",
			StacktraceKey:  "stacktrace",
			LineEnding:     zapcore.DefaultLineEnding,
			EncodeLevel:    zapcore.LowercaseLevelEncoder,
			EncodeTime:     zapcore.ISO8601TimeEncoder,
			EncodeDuration: zapcore.SecondsDurationEncoder,
			EncodeCaller:   zapcore.ShortCallerEncoder,
		},
		OutputPaths:      outputPaths,
		ErrorOutputPaths: errorOutputPaths,
	}.Build()
}

func ConfigureServiceHandler(cfg config.Config,
	incomingDataChan chan comm.IncomingDIDMessage,
	keyManager key.KeyManager,
	identity id.Identity,
	messageManager messages.MessageManager,
	didComm comm.DIDComm,
	db state.DBManager,
	ws service.Websocket) (service.Handler, error) {

	serviceHandler := service.NewHandler(incomingDataChan, ws, keyManager, identity, messageManager)

	for _, s := range cfg.ServiceList {
		if !s.Active {
			continue
		}

		zap.L().Debug("[Cfg] Registering service", zap.String("service", s.ServiceType))

		// Register service from config
		switch s.ServiceType {
		case "relay":
			r, err := relay.NewRelayService(relay.Config{
				DidComm: didComm,
				Db:      db,
			})
			if err != nil {
				return nil, fmt.Errorf("could not create service: %s\n", err.Error())
			}
			err = serviceHandler.RegisterService(s.CustomMessageType, r)
			if err != nil {
				return nil, fmt.Errorf("could not register service: %s\n", err.Error())
			}

		case "relay-registration":
			r, err := relay.NewRelayRegistrationService(relay.RegistrationConfig{
				DidComm: didComm,
				Db:      db,
			})
			if err != nil {
				return nil, fmt.Errorf("could not create service: %s\n", err.Error())
			}
			err = serviceHandler.RegisterService(s.CustomMessageType, r)
			if err != nil {
				return nil, fmt.Errorf("could not register service: %s\n", err.Error())
			}

		// Do nothing if not recognizing a service type.
		default:
			zap.L().Warn("[Cfg] Unfamiliar with service type", zap.String("service", s.ServiceType))
		}

	}

	return serviceHandler, nil
}

func ConfigureAuth(cfg config.Config, db state.DBManager) (auth.AuthService, error) {
	return auth.NewAuthService(auth.AuthConfig{
		Db: db,
	})
}

func ConfigureHTTPDIDComm(cfg config.Config, channel chan comm.IncomingDIDMessage) (comm.HttpComm, error) {
	if cfg.Server.HttpDIDAddr != "" {
		zap.L().Debug("[Cfg] Configuring Http DIDComm")
		return comm.NewHttpComm(&comm.HttpCommConfig{
			IncomingDataChan: channel,
		})
	}
	return nil, nil
}

func ConfigureLightningManager(cfg config.Config, channel chan comm.IncomingDIDMessage) (lightning.LightningManager, error) {
	lnm := lightning.NewLightningManager(&lightning.LightningManagerConfig{
		IncomingDataChan: channel,
	})

	return lnm, nil
}
func ConfigureWebsocketDIDComm(cfg config.Config, channel chan comm.IncomingDIDMessage) (comm.WebsocketComm, error) {
	if cfg.Server.HttpDIDAddr != "" {
		zap.L().Debug("[Cfg] Configuring Websocket DIDComm")
		return comm.NewWebsocketComm(&comm.WebsocketCommConfig{
			IncomingDataChan: channel,
		})
	}
	return nil, nil
}

func AddLightningNodes(cfg config.Config, lnm lightning.LightningManager) error {
	lndNode, err := ConfigureLightningNodes(cfg)
	if err != nil {
		zap.L().Error("Could not connect to lightning node, skipping lightning setup...",
			zap.Error(err),
		)
	}
	if lndNode == nil {
		return nil
	}

	zap.L().Debug("[Cfg] Adding newly created lightning node")
	if err := lnm.AddNode(lndNode); err != nil {
		return err
	}

	return nil
}

func ConfigureLightningNodes(cfg config.Config) (node.Node, error) {
	if cfg.Lightning.LndNode.Ip == "" {
		// Allow running without lightning node
		return nil, nil
	}

	zap.L().Debug("[Cfg] Connecting to new lightning node")
	lndNode, err := node.NewLndNode(&node.LndConfig{
		IpAddress:    cfg.Lightning.LndNode.Ip,
		Port:         cfg.Lightning.LndNode.Port,
		MacaroonPath: cfg.Lightning.LndNode.AdminMacaroon,
		MacaroonHex:  cfg.Lightning.LndNode.AdminMacaroonHex,
		TlsCertPath:  cfg.Lightning.LndNode.TlsCert,
		TlsCertHex:   cfg.Lightning.LndNode.TlsCertHex,
		Pubkey:       cfg.Lightning.LndNode.PubKey,
		ShouldListen: cfg.Lightning.LndNode.Listening,
	})
	if err != nil {
		return nil, err
	}
	return lndNode, nil
}

func ConfigureDb(cfg config.Config) (state.DBManager, error) {
	return state.NewDB(cfg.Sql.Type, cfg.Sql.ConnectionString)
}

func ConfigureIon(cfg config.Config, db state.DBManager, keymanager key.KeyManager) (id.Ion, error) {
	return id.NewIon(&id.IonConfig{
		IonUrl:     cfg.ION.Url,
		Db:         db,
		KeyManager: keymanager,
	})
}

func ConfigureDIDCommHttpServer(cfg config.Config) (*http.Server, *http.ServeMux) {
	if cfg.Server.Enabled && cfg.Server.HttpDIDAddr != "" {
		h := http.NewServeMux()

		return &http.Server{
			Addr:              cfg.Server.HttpDIDAddr,
			Handler:           h,
			ReadHeaderTimeout: 10 * time.Second,
		}, h
	}
	return nil, nil
}

func GetStringInBetweenTwoString(str string, startS string, endS string) (result string) {
	s := strings.Index(str, startS)
	if s == -1 {
		return str
	}
	newS := str[s+len(startS):]
	e := strings.Index(newS, endS)
	if e == -1 {
		return str
	}
	result = newS[:e]
	return result
}
