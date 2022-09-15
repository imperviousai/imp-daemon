package config

import (
	"fmt"
	"log"
	"os"
	"path/filepath"

	"go.uber.org/zap"
	"gopkg.in/yaml.v2"
)

type GlobalConfig interface {
	GetConfig() Config
	SaveConfig(cfg Config)
	WriteConfig() error
}

type globalConfig struct {
	cfg              Config
	path             string
	configChangeChan chan interface{}
}

func NewGlobalConfig(path string, configChangeChan chan interface{}) (GlobalConfig, error) {
	cfg := GetConfig(path)

	return &globalConfig{
		cfg:              cfg,
		configChangeChan: configChangeChan,
	}, nil
}

func (g *globalConfig) GetConfig() Config {
	return g.cfg
}

func (g *globalConfig) SaveConfig(cfg Config) {
	g.cfg = cfg
}

func (g *globalConfig) WriteConfig() error {
	err := g.cfg.writeFile(g.path)
	if err != nil {
		return err
	}

	if g.configChangeChan != nil {
		g.configChangeChan <- struct{}{}
	}
	return nil
}

type Config struct {
	Server      Server     `yaml:"server"`
	Sql         Sql        `yaml:"sql"`
	DID         DID        `yaml:"did"`
	ServiceList []Services `yaml:"service_list"`
	Lightning   Lightning  `yaml:"lightning"`
	IPFS        IPFS       `yaml:"ipfs"`
	ION         ION        `yaml:"ion"`
	Log         Log        `yaml:"log"`
	Key         Key        `yaml:"key"`
}

func DefaultConfig() Config {
	// create home path if not exists
	homePath, err := os.UserHomeDir()
	if err != nil {
		zap.L().Panic(err.Error())
	}
	homePath += "/.imp"
	if err := os.MkdirAll(filepath.Dir(homePath), 0750); err != nil {
		zap.L().Panic(err.Error())
	}

	sqlPath := homePath + "/imp.db"
	ipfsPath := homePath + "/ipfs"

	return Config{
		Server: Server{
			Enabled:     true,
			GrpcAddr:    "127.0.0.1:8881",
			HttpAddr:    "127.0.0.1:8882",
			HttpDIDAddr: "127.0.0.1:8883",
		},
		Sql: Sql{
			ConnectionString: fmt.Sprintf("file:%s?_auth&_auth_user=admin&_auth_pass=supersecretpassword&_auth_crypt=sha256", sqlPath),
			Type:             "sqlite",
		},
		DID: DID{
			UniversalResolverUrls: []string{
				"https://resolver.impervious.live/1.0/identifiers/",
			},
		},
		ServiceList: []Services{
			{
				ServiceType:       "relay",
				Active:            false,
				CustomMessageType: "https://didcomm.org/routing/2.0",
			},
			{
				ServiceType:       "relay-registration",
				Active:            true,
				CustomMessageType: "https://impervious.ai/didcomm/relay-registration/1.0",
			},
		},
		IPFS: IPFS{
			Directory: ipfsPath,
			Active: false,
		},
		ION: ION{
			Url:    "http://localhost:3000",
			Active: false,
		},
		Log: Log{
			IgnoreFileWrite: false,
		},
	}
}

type Key struct {
	Passphrase string `yaml:"passphrase"`
}

type Log struct {
	IgnoreFileWrite bool `yaml:"ignore_file_write"`
}

type IPFS struct {
	Directory string `yaml:"directory"`
	Active    bool   `yaml:"active"`
}

type Lightning struct {
	LndNode Lnd `yaml:"lnd_node"`
}

type DID struct {
	UniversalResolverUrls []string `yaml:"universal_resolver_urls"`
}

type Sql struct {
	ConnectionString string `yaml:"connection_string"`
	Type             string `yaml:"type"`
}

type Server struct {
	Enabled     bool   `yaml:"enabled"`
	GrpcAddr    string `yaml:"grpc_addr"`
	HttpAddr    string `yaml:"http_addr"`
	HttpDIDAddr string `yaml:"http_did_addr"`
}

type ION struct {
	Url    string `yaml:"url"`
	Active bool   `yaml:"active"`
}

type Lnd struct {
	Ip               string `yaml:"ip"`
	Port             string `yaml:"port"`
	PubKey           string `yaml:"pub_key"`
	TlsCert          string `yaml:"tls_cert"`
	TlsCertHex       string `yaml:"tls_cert_hex"`
	AdminMacaroon    string `yaml:"admin_macaroon"`
	AdminMacaroonHex string `yaml:"admin_macaroon_hex"`
	Listening        bool   `yaml:"listening"`
}

type Services struct {
	ServiceType           string      `yaml:"service_type"`
	Active                bool        `yaml:"active"`
	CustomMessageType     string      `yaml:"custom_message_type"`
	AdditionalServiceData interface{} `yaml:"additional_service_data"`
}

func GetConfig(path string) (config Config) {
	var cfg Config
	readFile(&cfg, path)
	return cfg
}

func processError(err error) {
	log.Fatal(err)
	os.Exit(2)
}

func readFile(cfg *Config, path string) {
	pathPri := determinePath(path)

	// Fallback to default config file
	f, err := os.Open(filepath.Clean(pathPri))
	if err != nil {
		processError(err)
	}
	defer func() {
		if err := f.Close(); err != nil {
			zap.L().Error(err.Error())
		}
	}()

	decoder := yaml.NewDecoder(f)
	err = decoder.Decode(cfg)
	if err != nil {
		processError(err)
	}
}

func (cfg *Config) writeFile(path string) error {
	pathPri := determinePath(path)

	data, err := yaml.Marshal(cfg)
	if err != nil {
		return err
	}

	err = os.WriteFile(pathPri, data, 0600)
	if err != nil {
		return err
	}

	return nil
}

func determinePath(path string) string {
	// Priority: path, local config, default
	if path == "" {
		if _, err := os.Stat("config/config.yml"); os.IsNotExist(err) {
			// create home path if not exists
			homePath, err := os.UserHomeDir()
			if err != nil {
				zap.L().Panic(err.Error())
			}
			homePath += "/.imp"
			if err := os.MkdirAll(filepath.Dir(homePath), 0750); err != nil {
				zap.L().Panic(err.Error())
			}

			path = homePath + "/config.yml"

			// check if ~/.imp/config.yml is already a file
			if _, err := os.Stat(path); os.IsNotExist(err) {
				// if not, write defaults to this file and return path
				cfg := DefaultConfig()
				if err := cfg.writeFile(path); err != nil {
					zap.L().Panic(err.Error())
				}
			}
		} else {
			path = "config/config.yml"
		}
	}
	return path
}

func (cfg *Config) DoesServiceExists(serviceType string) (bool, error) {
	for _, service := range cfg.ServiceList {
		if service.ServiceType == serviceType {
			return true, nil
		}
	}
	return false, nil
}
