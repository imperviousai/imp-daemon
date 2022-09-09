package key

import (
	"context"

	"github.com/imperviousai/imp-daemon/core"
	key_proto "github.com/imperviousai/imp-daemon/gen/go/proto/imp/api/key"
	"go.uber.org/zap"
)

// GRPC server implementation

type keyServer struct {
	key_proto.UnimplementedKeyServer
	core core.Core
}

func NewKeyServer(c core.Core) key_proto.KeyServer {
	return &keyServer{
		core: c,
	}
}

func (m *keyServer) InitSeed(ctx context.Context, req *key_proto.InitSeedRequest) (*key_proto.InitSeedResponse, error) {
	zap.L().Info("[Server] InitSeed")

	mnenomic, apiKey, err := m.core.InitSeed(req.GetMnenomic(), req.GetPassphrase())
	if err != nil {
		zap.L().Error("[Server] InitSeed failed", zap.String("error", err.Error()))
		return nil, err
	}

	zap.L().Info("[Server] InitSeed success")
	return &key_proto.InitSeedResponse{
		Mnenomic: mnenomic,
		ApiKey:   apiKey,
	}, nil
}

func (m *keyServer) UnlockSeed(ctx context.Context, req *key_proto.UnlockSeedRequest) (*key_proto.UnlockSeedResponse, error) {
	zap.L().Info("[Server] UnlockSeed")

	err := m.core.UnlockSeed(req.GetPassphrase())
	if err != nil {
		zap.L().Error("[Server] UnlockSeed failed", zap.String("error", err.Error()))
		return nil, err
	}

	zap.L().Info("[Server] UnlockSeed success")
	return &key_proto.UnlockSeedResponse{}, nil
}

func (m *keyServer) Status(ctx context.Context, req *key_proto.StatusRequest) (*key_proto.StatusResponse, error) {
	zap.L().Info("[Server] Status")

	status, err := m.core.KeyStatus()
	if err != nil {
		zap.L().Error("[Server] Status failed", zap.String("error", err.Error()))
		return nil, err
	}

	zap.L().Info("[Server] Status success")
	return &key_proto.StatusResponse{
		Status: status,
	}, nil
}
