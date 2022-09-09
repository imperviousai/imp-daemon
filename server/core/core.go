package core

import (
	"context"

	"github.com/imperviousai/imp-daemon/core"
	core_proto "github.com/imperviousai/imp-daemon/gen/go/proto/imp/api/core"
	"go.uber.org/zap"
)

// GRPC server implementation

type coreServer struct {
	core_proto.UnimplementedCoreServer
	core core.Core
}

func NewCoreServer(c core.Core) core_proto.CoreServer {
	return &coreServer{
		core: c,
	}
}

func (m *coreServer) Status(ctx context.Context, req *core_proto.StatusRequest) (*core_proto.StatusResponse, error) {
	zap.L().Info("[Server] Core Status")

	status, err := m.core.KeyStatus()
	if err != nil {
		zap.L().Error("[Server] Status failed", zap.String("error", err.Error()))
		return nil, err
	}

	zap.L().Info("[Server] Core Status success")
	return &core_proto.StatusResponse{
		KeyStatus: &core_proto.KeyStatus{
			Status: status,
		},
	}, nil
}
