package key

import (
	"context"

	"github.com/imperviousai/imp-daemon/core"
	kv_proto "github.com/imperviousai/imp-daemon/gen/go/proto/imp/api/kv"
	"go.uber.org/zap"
)

type kvServer struct {
	kv_proto.UnimplementedKVServer
	core core.Core
}

func NewKVServer(c core.Core) kv_proto.KVServer {
	return &kvServer{
		core: c,
	}
}

func (k *kvServer) GetKey(ctx context.Context, req *kv_proto.GetKeyRequest) (*kv_proto.GetKeyResponse, error) {
	zap.L().Info("[Server] GetKey")

	value, err := k.core.GetKey(req.GetKey())
	if err != nil {
		zap.L().Error("[Server] GetKey Failed", zap.String("error", err.Error()))
		return nil, err
	}
	return &kv_proto.GetKeyResponse{
		Value: value,
	}, nil
}

func (k *kvServer) SetKey(ctx context.Context, req *kv_proto.SetKeyRequest) (*kv_proto.SetKeyResponse, error) {
	zap.L().Info("[Server] SetKey")
	err := k.core.SetKey(req.Key, req.Value)
	if err != nil {
		zap.L().Error("[Server] SetKey Failed", zap.String("error", err.Error()))
		return nil, err
	}
	return &kv_proto.SetKeyResponse{}, err
}

func (k *kvServer) DelKey(ctx context.Context, req *kv_proto.DelKeyRequest) (*kv_proto.DelKeyResponse, error) {
	zap.L().Info("[Server] GetKey")
	err := k.core.DelKey(req.Key)
	if err != nil {
		zap.L().Error("[Server] DelKey Failed", zap.String("error", err.Error()))
		return nil, err
	}
	return &kv_proto.DelKeyResponse{}, nil
}
