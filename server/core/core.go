package core

import (
	"context"

	"github.com/imperviousai/imp-daemon/core"
	core_proto "github.com/imperviousai/imp-daemon/gen/go/proto/imp/api/core"
	"github.com/imperviousai/imp-daemon/lightning"
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

	// Check key status
	keyStatus, err := m.core.KeyStatus()
	if err != nil {
		zap.L().Error("[Server] Status failed", zap.String("error", err.Error()))
		return nil, err
	}

	// Check LN status
	lightningStatus, err := m.core.CheckLightningStatus()
	if err != nil {
		zap.L().Error("[Server] Status failed", zap.String("error", err.Error()))
		return nil, err
	}

	// TODO check relay status

	zap.L().Info("[Server] Core Status success")
	return &core_proto.StatusResponse{
		KeyStatus: &core_proto.KeyStatus{
			Status: keyStatus,
		},
		LightningStatus: lightningStatusToProto(lightningStatus),
		// TODO relay status
	}, nil
}

func lightningStatusToProto(nodeStatus []lightning.NodeStatus) *core_proto.LightningStatus {
	nodeStatusProto := make([]*core_proto.NodeStatus, 0, len(nodeStatus))
	for _, node := range nodeStatus {
		nodeStatusProto = append(nodeStatusProto, &core_proto.NodeStatus{
			Pubkey: node.Pubkey,
			Active: node.Active,
		})
	}

	return &core_proto.LightningStatus{
		NodeStatusList: nodeStatusProto,
	}
}
