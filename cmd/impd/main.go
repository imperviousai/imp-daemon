package main

import (
	"context"
	"encoding/json"
	"flag"
	"io/fs"
	"log"
	"net"
	"net/http"
	"os"
	"os/signal"
	"sync"
	"time"

	"github.com/imperviousai/imp-daemon/gen/openapiv2/proto/imp/api/ipfs"
	"go.uber.org/zap"
	"google.golang.org/grpc/credentials/insecure"

	"github.com/imperviousai/imp-daemon/cmd"
	"github.com/imperviousai/imp-daemon/config"
	auth_server "github.com/imperviousai/imp-daemon/server/auth"
	config_server "github.com/imperviousai/imp-daemon/server/config"
	contacts_server "github.com/imperviousai/imp-daemon/server/contacts"
	id_server "github.com/imperviousai/imp-daemon/server/id"
	key_server "github.com/imperviousai/imp-daemon/server/key"
	kv_server "github.com/imperviousai/imp-daemon/server/kv"
	lightning_server "github.com/imperviousai/imp-daemon/server/lightning"
	message_server "github.com/imperviousai/imp-daemon/server/message"
	relay_server "github.com/imperviousai/imp-daemon/server/relay"
	websocket_server "github.com/imperviousai/imp-daemon/server/websocket"
	"github.com/rs/cors"
	"google.golang.org/grpc"

	"embed"

	"github.com/go-openapi/loads"
	"github.com/go-openapi/runtime/middleware"
	filemux "github.com/gorilla/mux"
	"github.com/grpc-ecosystem/grpc-gateway/v2/runtime"
	auth_proto "github.com/imperviousai/imp-daemon/gen/go/proto/imp/api/auth"
	config_proto "github.com/imperviousai/imp-daemon/gen/go/proto/imp/api/config"
	contacts_proto "github.com/imperviousai/imp-daemon/gen/go/proto/imp/api/contacts"
	id_proto "github.com/imperviousai/imp-daemon/gen/go/proto/imp/api/id"
	key_proto "github.com/imperviousai/imp-daemon/gen/go/proto/imp/api/key"
	kv_proto "github.com/imperviousai/imp-daemon/gen/go/proto/imp/api/kv"
	lightning_proto "github.com/imperviousai/imp-daemon/gen/go/proto/imp/api/lightning"
	messaging_proto "github.com/imperviousai/imp-daemon/gen/go/proto/imp/api/messaging"
	relay_proto "github.com/imperviousai/imp-daemon/gen/go/proto/imp/api/relay"
	websocket_proto "github.com/imperviousai/imp-daemon/gen/go/proto/imp/api/websocket"
	"github.com/imperviousai/imp-daemon/gen/openapiv2/proto/imp/api/auth"
	config_openapi "github.com/imperviousai/imp-daemon/gen/openapiv2/proto/imp/api/config"
	"github.com/imperviousai/imp-daemon/gen/openapiv2/proto/imp/api/contacts"
	"github.com/imperviousai/imp-daemon/gen/openapiv2/proto/imp/api/id"
	"github.com/imperviousai/imp-daemon/gen/openapiv2/proto/imp/api/key"
	"github.com/imperviousai/imp-daemon/gen/openapiv2/proto/imp/api/kv"
	"github.com/imperviousai/imp-daemon/gen/openapiv2/proto/imp/api/lightning"
	"github.com/imperviousai/imp-daemon/gen/openapiv2/proto/imp/api/messaging"
	"github.com/imperviousai/imp-daemon/gen/openapiv2/proto/imp/api/relay"
	"github.com/imperviousai/imp-daemon/gen/openapiv2/proto/imp/api/websocket"
	"github.com/tmc/grpc-websocket-proxy/wsproxy"
)

var configPath = flag.String("config", "", "The path of the config file")

// this path must be inside cmd/impd/
//
//nolint:all
//go:embed all:out/*
var content embed.FS

func main() {
	flag.Parse()
	configChangeChan := make(chan interface{})
	globalConfig, err := config.NewGlobalConfig(*configPath, configChangeChan)
	if err != nil {
		zap.L().Panic(err.Error())
	}

	// Start up the logger
	logger, err := cmd.ConfigureLogger(globalConfig)
	if err != nil {
		zap.L().Panic(err.Error())
	}
	zap.ReplaceGlobals(logger)

	// didcomm https/websocket server
	ctx := cmd.ConfigureCore(globalConfig, nil)
	if err := ctx.Core.Start(); err != nil {
		zap.L().Panic(err.Error())
	}

	firstRun := true
	shouldRestart := true

	var grpcServer *grpc.Server
	var httpProxy *http.Server
	var fileServer *http.Server

	// Graceful shutdowns
	var wg sync.WaitGroup
	signalChan := make(chan os.Signal, 1)
	signal.Notify(signalChan, os.Interrupt)
	for {
		if !shouldRestart {
			zap.L().Info("Daemon restart was not requested, shutting down...")
			break
		}

		if firstRun {
			firstRun = false
		} else {
			// swap the core context with a new one
			// reuse the key manager so password does not
			// have to be reentered
			ctx = cmd.ConfigureCore(globalConfig, ctx)
			if err := ctx.Core.Start(); err != nil {
				zap.L().Panic(err.Error())
			}
		}

		shouldRestart = func() bool {

			// Set up the grpc server
			if globalConfig.GetConfig().Server.Enabled {
				zap.L().Debug("Setting up grpc server", zap.String("addr", globalConfig.GetConfig().Server.GrpcAddr))
				grpcListen, err := net.Listen("tcp", globalConfig.GetConfig().Server.GrpcAddr)
				if err != nil {
					zap.L().Error(err.Error())
				}

				serverOpts := []grpc.ServerOption{
					grpc.MaxRecvMsgSize(1 * 1024 * 1024 * 200),
					grpc.UnaryInterceptor(ctx.Auth.Unary()),
					grpc.StreamInterceptor(ctx.Auth.Stream()),
				}
				grpcServer = grpc.NewServer(serverOpts...)
				messaging_proto.RegisterMessagingServer(grpcServer, message_server.NewMessagingServer(ctx.Core))
				relay_proto.RegisterRelayServer(grpcServer, relay_server.NewRelayServer(ctx.Core))
				contacts_proto.RegisterContactsServer(grpcServer, contacts_server.NewContactsServer(ctx.Core))
				auth_proto.RegisterAuthServer(grpcServer, auth_server.NewAuthServer(ctx.Core))
				config_proto.RegisterConfigServer(grpcServer, config_server.NewConfigServer(ctx.Core))
				key_proto.RegisterKeyServer(grpcServer, key_server.NewKeyServer(ctx.Core))
				websocket_proto.RegisterWebsocketServer(grpcServer, websocket_server.NewWebsocketServer(ctx.Websocket))
				lightning_proto.RegisterLightningServer(grpcServer, lightning_server.NewLightningServer(ctx.Core))
				id_proto.RegisterIDServer(grpcServer, id_server.NewIDServer(ctx.Core))
				kv_proto.RegisterKVServer(grpcServer, kv_server.NewKVServer(ctx.Core))

				// Http proxy
				zap.L().Debug("Setting up http proxy", zap.String("addr", globalConfig.GetConfig().Server.HttpAddr))
				ctxProxy, cancel := context.WithCancel(context.Background())
				defer cancel()
				mux := runtime.NewServeMux(
					runtime.WithIncomingHeaderMatcher(CustomMatcher),
				)
				opts := []grpc.DialOption{
					grpc.WithTransportCredentials(insecure.NewCredentials()),
					grpc.WithDefaultCallOptions(
						grpc.MaxCallRecvMsgSize(1*1024*1024*200),
						grpc.MaxCallSendMsgSize(1*1024*1024*200),
					),
				}
				err = messaging_proto.RegisterMessagingHandlerFromEndpoint(ctxProxy, mux, globalConfig.GetConfig().Server.GrpcAddr, opts)
				if err != nil {
					zap.L().Error(err.Error())
				}

				err = relay_proto.RegisterRelayHandlerFromEndpoint(ctxProxy, mux, globalConfig.GetConfig().Server.GrpcAddr, opts)
				if err != nil {
					zap.L().Error(err.Error())
				}
				err = config_proto.RegisterConfigHandlerFromEndpoint(ctxProxy, mux, globalConfig.GetConfig().Server.GrpcAddr, opts)
				if err != nil {
					zap.L().Error(err.Error())
				}
				err = key_proto.RegisterKeyHandlerFromEndpoint(ctxProxy, mux, globalConfig.GetConfig().Server.GrpcAddr, opts)
				if err != nil {
					zap.L().Error(err.Error())
				}
				err = kv_proto.RegisterKVHandlerFromEndpoint(ctxProxy, mux, globalConfig.GetConfig().Server.GrpcAddr, opts)
				if err != nil {
					zap.L().Error(err.Error())
				}
				err = websocket_proto.RegisterWebsocketHandlerFromEndpoint(ctxProxy, mux, globalConfig.GetConfig().Server.GrpcAddr, opts)
				if err != nil {
					zap.L().Error(err.Error())
				}
				err = lightning_proto.RegisterLightningHandlerFromEndpoint(ctxProxy, mux, globalConfig.GetConfig().Server.GrpcAddr, opts)
				if err != nil {
					zap.L().Error(err.Error())
				}
				err = id_proto.RegisterIDHandlerFromEndpoint(ctxProxy, mux, globalConfig.GetConfig().Server.GrpcAddr, opts)
				if err != nil {
					zap.L().Error(err.Error())
				}
				err = contacts_proto.RegisterContactsHandlerFromEndpoint(ctxProxy, mux, globalConfig.GetConfig().Server.GrpcAddr, opts)
				if err != nil {
					zap.L().Error(err.Error())
				}
				err = auth_proto.RegisterAuthHandlerFromEndpoint(ctxProxy, mux, globalConfig.GetConfig().Server.GrpcAddr, opts)
				if err != nil {
					zap.L().Error(err.Error())
				}

				httpProxy = &http.Server{
					Addr:              globalConfig.GetConfig().Server.HttpAddr,
					Handler:           wsproxy.WebsocketProxy(cors.AllowAll().Handler(mux)),
					ReadHeaderTimeout: 10 * time.Second,
				}
				injectSpecsMiddleware(httpProxy)

				r := filemux.NewRouter()
				serverRoot, err := fs.Sub(content, "out") // creates a filesystem under a subdir
				if err != nil {
					log.Fatal(err)
				}
				r.PathPrefix("").Handler(http.StripPrefix("", http.FileServer(http.FS(serverRoot))))

				fileServer = &http.Server{
					Addr:              globalConfig.GetConfig().Server.ClientAddr,
					Handler:           r,
					ReadHeaderTimeout: 10 * time.Second,
				}

				wg.Add(2)

				// Start servers and wait
				go func() {
					defer wg.Done()

					zap.L().Debug("Starting grpc server")
					err := grpcServer.Serve(grpcListen)
					if err != nil {
						zap.L().Error(err.Error())
					}
				}()

				go func() {
					defer wg.Done()

					zap.L().Debug("Starting grpc http proxy")
					err := httpProxy.ListenAndServe()
					if err != nil {
						zap.L().Error(err.Error())
					}
				}()

				// http/websocket didcomm server
				if ctx.HttpDIDComm != nil {
					wg.Add(1)

					// Start server and wait
					go func() {
						defer wg.Done()

						zap.L().Debug("Starting didcomm http proxy")
						err := ctx.HttpDIDComm.ListenAndServe()
						if err != nil {
							zap.L().Error(err.Error())
						}
					}()
				}
			}
			// Webserver started..

			wg.Add(1) // for static web server
			go func() {
				defer wg.Done()
				zap.L().Debug("Starting static file server")
				err := fileServer.ListenAndServe()
				if err != nil {
					zap.L().Error(err.Error())
				}
			}()

			wg.Add(1) // for core

			zap.L().Info("IMPD started!")

			shutdownFunc := func() {
				// Shutdown imp
				if err := ctx.Core.Stop(); err != nil {
					zap.L().Error(err.Error())
				}
				wg.Done()

				if globalConfig.GetConfig().Server.Enabled {
					// Shutdown proxy
					zap.L().Debug("Shutting down http proxy")
					if err := httpProxy.Shutdown(context.Background()); err != nil {
						zap.L().Error(err.Error())
					}

					// Shutdown grpc
					zap.L().Debug("Shutting down grpc")
					// Ideally a graceful stop, but need to shut down
					// the grpc subscriber
					grpcServer.Stop()

					// Shutdown FileServer
					zap.L().Debug("Shutting down fileserver")
					err := fileServer.Shutdown(context.Background())
					if err != nil {
						zap.L().Error(err.Error())
					}

					// Shutdown http didcomm
					if ctx.HttpDIDComm != nil {
						zap.L().Debug("Shutting down http didcomm")
						if err := ctx.HttpDIDComm.Shutdown(context.Background()); err != nil {
							zap.L().Error(err.Error())
						}
					}
				}
			}

			go func() {
				<-signalChan
				zap.L().Info("Caught signal to shut down")
				shutdownFunc()
			}()

			configChanged := false
			go func() {
				<-configChangeChan
				wg.Add(1)
				zap.L().Info("Config setting changed, restarting..")
				shutdownFunc()
				configChanged = true
				wg.Done()
			}()

			wg.Wait()

			return configChanged
		}()

		if shouldRestart {
			zap.L().Debug("Daemon restart requested, waiting 1 seconds..")
			time.Sleep(1 * time.Second)
		}
	}

	err = zap.L().Sync()
	if err != nil {
		// do nothing
		return
	}
}

func CustomMatcher(key string) (string, bool) {
	switch key {
	case "X-API-KEY":
		return "x-api-key", true
	case "x-api-key":
		return key, true
	default:
		return runtime.DefaultHeaderMatcher(key)
	}
}

func injectSpecsMiddleware(s *http.Server) {
	lightningSpec, err := loads.Analyzed(json.RawMessage([]byte(lightning.SwaggerJSON)), "")
	if err != nil {
		zap.L().Error(err.Error())
		return
	}
	idSpec, err := loads.Analyzed(json.RawMessage([]byte(id.SwaggerJSON)), "")
	if err != nil {
		zap.L().Error(err.Error())
		return
	}
	messagingSpec, err := loads.Analyzed(json.RawMessage([]byte(messaging.SwaggerJSON)), "")
	if err != nil {
		zap.L().Error(err.Error())
		return
	}
	ipfsSpec, err := loads.Analyzed(json.RawMessage([]byte(ipfs.SwaggerJSON)), "")
	if err != nil {
		zap.L().Error(err.Error())
		return
	}
	relaySpec, err := loads.Analyzed(json.RawMessage([]byte(relay.SwaggerJSON)), "")
	if err != nil {
		zap.L().Error(err.Error())
		return
	}
	contactsSpec, err := loads.Analyzed(json.RawMessage([]byte(contacts.SwaggerJSON)), "")
	if err != nil {
		zap.L().Error(err.Error())
		return
	}
	authSpec, err := loads.Analyzed(json.RawMessage([]byte(auth.SwaggerJSON)), "")
	if err != nil {
		zap.L().Error(err.Error())
		return
	}
	configSpec, err := loads.Analyzed(json.RawMessage([]byte(config_openapi.SwaggerJSON)), "")
	if err != nil {
		zap.L().Error(err.Error())
		return
	}
	keySpec, err := loads.Analyzed(json.RawMessage([]byte(key.SwaggerJSON)), "")
	if err != nil {
		zap.L().Error(err.Error())
		return
	}
	kvSpec, err := loads.Analyzed(json.RawMessage([]byte(kv.SwaggerJSON)), "")
	if err != nil {
		zap.L().Error(err.Error())
		return
	}
	websocketSpec, err := loads.Analyzed(json.RawMessage([]byte(websocket.SwaggerJSON)), "")
	if err != nil {
		zap.L().Error(err.Error())
		return
	}

	s.Handler = middleware.Spec("/lightning",
		lightningSpec.Raw(),
		middleware.Redoc(middleware.RedocOpts{BasePath: "/docs", Path: "lightning", SpecURL: "/lightning/swagger.json"}, s.Handler),
	)
	s.Handler = middleware.Spec("/id",
		idSpec.Raw(),
		middleware.Redoc(middleware.RedocOpts{BasePath: "/docs", Path: "id", SpecURL: "/id/swagger.json"}, s.Handler),
	)
	s.Handler = middleware.Spec("/messaging",
		messagingSpec.Raw(),
		middleware.Redoc(middleware.RedocOpts{BasePath: "/docs", Path: "messaging", SpecURL: "/messaging/swagger.json"}, s.Handler),
	)
	s.Handler = middleware.Spec("/ipfs",
		ipfsSpec.Raw(),
		middleware.Redoc(middleware.RedocOpts{BasePath: "/docs", Path: "ipfs", SpecURL: "/ipfs/swagger.json"}, s.Handler),
	)
	s.Handler = middleware.Spec("/relay",
		relaySpec.Raw(),
		middleware.Redoc(middleware.RedocOpts{BasePath: "/docs", Path: "relay", SpecURL: "/relay/swagger.json"}, s.Handler),
	)
	s.Handler = middleware.Spec("/contacts",
		contactsSpec.Raw(),
		middleware.Redoc(middleware.RedocOpts{BasePath: "/docs", Path: "contacts", SpecURL: "/contacts/swagger.json"}, s.Handler),
	)
	s.Handler = middleware.Spec("/auth",
		authSpec.Raw(),
		middleware.Redoc(middleware.RedocOpts{BasePath: "/docs", Path: "auth", SpecURL: "/auth/swagger.json"}, s.Handler),
	)
	s.Handler = middleware.Spec("/config",
		configSpec.Raw(),
		middleware.Redoc(middleware.RedocOpts{BasePath: "/docs", Path: "config", SpecURL: "/config/swagger.json"}, s.Handler),
	)
	s.Handler = middleware.Spec("/key",
		keySpec.Raw(),
		middleware.Redoc(middleware.RedocOpts{BasePath: "/docs", Path: "key", SpecURL: "/key/swagger.json"}, s.Handler),
	)
	s.Handler = middleware.Spec("/kv",
		kvSpec.Raw(),
		middleware.Redoc(middleware.RedocOpts{BasePath: "/docs", Path: "kv", SpecURL: "/kv/swagger.json"}, s.Handler),
	)
	s.Handler = middleware.Spec("/websocket",
		websocketSpec.Raw(),
		middleware.Redoc(middleware.RedocOpts{BasePath: "/docs", Path: "websocket", SpecURL: "/websocket/swagger.json"}, s.Handler),
	)
}
