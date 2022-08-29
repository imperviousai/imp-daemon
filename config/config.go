package config

import (
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
	Server struct {
		Enabled     bool   `yaml:"enabled"`
		GrpcAddr    string `yaml:"grpc_addr"`
		HttpAddr    string `yaml:"http_addr"`
		HttpDIDAddr string `yaml:"http_did_addr"`
	} `yaml:"server"`
	Sql struct {
		ConnectionString string `yaml:"connection_string"`
		Type             string `yaml:"type"`
	} `yaml:"sql"`
	DID struct {
		UniversalResolverUrls []string `yaml:"universal_resolver_urls"`
	} `yaml:"did"`
	ServiceList []Services `yaml:"service_list"`
	Lightning   struct {
		LndNode Lnd `yaml:"lnd_node"`
	} `yaml:"lightning"`
	IPFS struct {
		Directory string `yaml:"directory"`
	} `yaml:"ipfs"`
	ION ION `yaml:"ion"`
	Log struct {
		IgnoreFileWrite bool `yaml:"ignore_file_write"`
	} `yaml:"log"`
	Key struct {
		Passphrase string `yaml:"passphrase"`
	} `yaml:"key"`
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

	err = os.WriteFile(pathPri, data, 0)
	if err != nil {
		return err
	}

	return nil
}

func determinePath(path string) string {
	// Priority: path, local config, default
	if path == "" {
		if _, err := os.Stat("config/local.config.yml"); os.IsNotExist(err) {
			path = "config/config.yml"
		} else {
			path = "config/local.config.yml"
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
