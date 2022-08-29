package auth

import (
	"context"

	auth_state "github.com/imperviousai/freeimp/auth/state"
	"github.com/imperviousai/freeimp/core"
	auth_proto "github.com/imperviousai/freeimp/gen/go/proto/imp/api/auth"
	"go.uber.org/zap"
)

// GRPC server implementation

type authServer struct {
	auth_proto.UnimplementedAuthServer
	core core.Core
}

func NewAuthServer(c core.Core) auth_proto.AuthServer {
	return &authServer{
		core: c,
	}
}

func (s *authServer) GetAuthKeys(ctx context.Context, req *auth_proto.GetAuthKeysRequest) (*auth_proto.GetAuthKeysResponse, error) {
	zap.L().Info("[Server] GetAuthKeys")

	authKeys, err := s.core.ListKeys()
	if err != nil {
		zap.L().Error("[Server] GetAuthKeys failed", zap.String("error", err.Error()))
		return nil, err
	}
	zap.L().Info("[Server] GetAuthKeys success")

	authKeysList := make([]*auth_proto.AuthAPIKey, 0)
	for _, internalKey := range authKeys {
		authKeysList = append(authKeysList, convertAuthToProto(internalKey))
	}

	return &auth_proto.GetAuthKeysResponse{
		Keys: authKeysList,
	}, nil
}

func (s *authServer) CreateAuthKey(ctx context.Context, req *auth_proto.CreateAuthKeyRequest) (*auth_proto.CreateAuthKeyResponse, error) {
	zap.L().Info("[Server] CreateAuthKey")

	key, err := s.core.GenerateNewKey(req.GetName(), req.GetDescription())
	if err != nil {
		zap.L().Error("[Server] CreateAuthKey failed", zap.String("error", err.Error()))
		return nil, err
	}
	zap.L().Info("[Server] CreateAuthKey success")

	return &auth_proto.CreateAuthKeyResponse{
		Key: key.Key,
	}, nil
}

func (s *authServer) UpdateAuthKey(ctx context.Context, req *auth_proto.UpdateAuthKeyRequest) (*auth_proto.UpdateAuthKeyResponse, error) {
	zap.L().Info("[Server] UpdateAuthKey")

	err := s.core.UpdateKey(req.GetId(), req.GetName(), req.GetDescription())
	if err != nil {
		zap.L().Error("[Server] UpdateAuthKey failed", zap.String("error", err.Error()))
		return nil, err
	}
	zap.L().Info("[Server] UpdateAuthKey success")

	return &auth_proto.UpdateAuthKeyResponse{}, nil
}

func (s *authServer) DeleteAuthKey(ctx context.Context, req *auth_proto.DeleteAuthKeyRequest) (*auth_proto.DeleteAuthKeyResponse, error) {
	zap.L().Info("[Server] DeleteAuthKey")

	err := s.core.DeleteKey(req.GetId())
	if err != nil {
		zap.L().Error("[Server] DeleteAuthKey failed", zap.String("error", err.Error()))
		return nil, err
	}
	zap.L().Info("[Server] DeleteAuthKey success")

	return &auth_proto.DeleteAuthKeyResponse{}, nil
}

func convertAuthToProto(internal *auth_state.AuthStateModel) *auth_proto.AuthAPIKey {
	if internal == nil {
		return nil
	}
	return &auth_proto.AuthAPIKey{
		Id:          internal.Id,
		Name:        internal.Name,
		Description: internal.Description,
	}
}
