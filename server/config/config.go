package config

import (
	"context"

	"github.com/imperviousai/imp-daemon/config"
	"github.com/imperviousai/imp-daemon/core"
	config_proto "github.com/imperviousai/imp-daemon/gen/go/proto/imp/api/config"
	"go.uber.org/zap"
)

// GRPC server implementation

type configServer struct {
	config_proto.UnimplementedConfigServer
	core core.Core
}

func NewConfigServer(c core.Core) config_proto.ConfigServer {
	return &configServer{
		core: c,
	}
}

func (m *configServer) GetLightningConfig(ctx context.Context, req *config_proto.GetLightningConfigRequest) (*config_proto.GetLightningConfigResponse, error) {
	zap.L().Info("[Server] GetLightningConfig")

	lightningConfig, err := m.core.GetLightningNodeConfig()
	if err != nil {
		zap.L().Error("[Server] GetLightningConfig failed", zap.String("error", err.Error()))
		return nil, err
	}
	zap.L().Info("[Server] GetLightningConfig success")

	return &config_proto.GetLightningConfigResponse{
		LightningConfig: convertLndConfigToProto(&lightningConfig),
	}, nil
}

func (m *configServer) SaveLightningConfig(ctx context.Context, req *config_proto.SaveLightningConfigRequest) (*config_proto.SaveLightningConfigResponse, error) {
	zap.L().Info("[Server] SaveLightningConfig")

	node := convertLndProtoToConfig(req.GetLightningConfig())
	err := m.core.SaveLightningNodeConfig(*node)
	if err != nil {
		zap.L().Error("[Server] SaveLightningConfig failed", zap.String("error", err.Error()))
		return nil, err
	}
	zap.L().Info("[Server] SaveLightningConfig success")

	return &config_proto.SaveLightningConfigResponse{}, nil
}

func (m *configServer) GetIONConfig(ctx context.Context, req *config_proto.GetIONConfigRequest) (*config_proto.GetIONConfigResponse, error) {
	zap.L().Info("[Server] GetIONConfig")

	zap.L().Info("[Server] GetIONConfig")

	ionConfig, err := m.core.GetIONConfig()
	if err != nil {
		zap.L().Error("[Server] GetIONConfig failed", zap.String("error", err.Error()))
		return nil, err
	}
	zap.L().Info("[Server] GetIONConfig success")

	return &config_proto.GetIONConfigResponse{
		IonConfig: convertIONConfigToProto(&ionConfig),
	}, nil
}

func (m *configServer) SaveIONConfig(ctx context.Context, req *config_proto.SaveIONConfigRequest) (*config_proto.SaveIONConfigResponse, error) {
	zap.L().Info("[Server] SaveIONConfig")

	ionCfg := convertIONProtoToConfig(req.GetIonConfig())
	err := m.core.SaveIONConfig(*ionCfg)
	if err != nil {
		zap.L().Error("[Server] SaveIONConfig failed", zap.String("error", err.Error()))
		return nil, err
	}
	zap.L().Info("[Server] SaveIONConfig success")

	return &config_proto.SaveIONConfigResponse{}, nil
}

func convertLndProtoToConfig(internal *config_proto.LightningConfig) *config.Lnd {
	if internal == nil {
		return nil
	}
	return &config.Lnd{
		Ip:               internal.Ip,
		Port:             internal.Port,
		PubKey:           internal.Pubkey,
		TlsCert:          internal.TlsCert,
		TlsCertHex:       internal.TlsCertHex,
		AdminMacaroon:    internal.AdminMacaroon,
		AdminMacaroonHex: internal.AdminMacaroonHex,
		Listening:        internal.Listening,
	}
}

func convertLndConfigToProto(internal *config.Lnd) *config_proto.LightningConfig {
	if internal == nil {
		return nil
	}
	return &config_proto.LightningConfig{
		Ip:               internal.Ip,
		Port:             internal.Port,
		Pubkey:           internal.PubKey,
		TlsCert:          internal.TlsCert,
		TlsCertHex:       internal.TlsCertHex,
		AdminMacaroon:    internal.AdminMacaroon,
		AdminMacaroonHex: internal.AdminMacaroonHex,
		Listening:        internal.Listening,
	}
}

func convertIONProtoToConfig(internal *config_proto.IONConfig) *config.ION {
	if internal == nil {
		return nil
	}
	return &config.ION{
		Url:    internal.Url,
		Active: internal.Active,
	}
}

func convertIONConfigToProto(internal *config.ION) *config_proto.IONConfig {
	if internal == nil {
		return nil
	}
	return &config_proto.IONConfig{
		Url:    internal.Url,
		Active: internal.Active,
	}
}
