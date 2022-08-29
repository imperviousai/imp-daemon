package auth

import (
	"context"
	"time"

	"github.com/google/uuid"
	auth_state "github.com/imperviousai/freeimp/auth/state"
	"github.com/imperviousai/freeimp/state"
	"google.golang.org/grpc"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/metadata"
	"google.golang.org/grpc/status"
)

//go:generate mockgen --destination=./mock/auth_mock.go --package=mock github.com/imperviousai/freeimp/auth AuthService

type AuthService interface {
	// Auth GPRC validators
	Unary() grpc.UnaryServerInterceptor
	Stream() grpc.StreamServerInterceptor

	// Usable API's
	GenerateNewKey(name, description string) (*auth_state.AuthStateModel, error)
	ListKeys() ([]*auth_state.AuthStateModel, error)
	UpdateKey(id int64, name, description string) error
	DeleteKey(id int64) error
}

type authService struct {
	state auth_state.AuthState
}

type AuthConfig struct {
	Db state.DBManager
}

func NewAuthService(cfg AuthConfig) (AuthService, error) {
	// Init the identity state database first
	// only if DB is actually ready
	state, err := auth_state.InitAuthState(cfg.Db)
	if err != nil {
		return nil, err
	}

	return &authService{
		state: state,
	}, nil
}
func (a *authService) GenerateNewKey(name, description string) (*auth_state.AuthStateModel, error) {
	newKey := uuid.New().String()
	newAuthKey := &auth_state.AuthStateModel{
		Name:        name,
		Description: description,
		Key:         newKey,
	}
	newKeyId, err := a.state.SaveAuth(newAuthKey)
	if err != nil {
		return nil, err
	}
	newAuthKey.Id = newKeyId
	newAuthKey.Added = time.Now()
	return newAuthKey, nil
}
func (a *authService) ListKeys() ([]*auth_state.AuthStateModel, error) {
	return a.state.ListAuth()
}

func (a *authService) UpdateKey(id int64, name, description string) error {
	updateAuthKey := &auth_state.AuthStateModel{
		Id:          id,
		Name:        name,
		Description: description,
	}
	return a.state.UpdateAuth(updateAuthKey)
}
func (a *authService) DeleteKey(id int64) error {
	return a.state.DeleteAuth(id)
}

func (a *authService) Unary() grpc.UnaryServerInterceptor {
	return func(
		ctx context.Context,
		req interface{},
		info *grpc.UnaryServerInfo,
		handler grpc.UnaryHandler,
	) (interface{}, error) {
		err := a.authorize(ctx, info.FullMethod)
		if err != nil {
			return nil, err
		}

		return handler(ctx, req)
	}
}

func (a *authService) Stream() grpc.StreamServerInterceptor {
	return func(
		srv interface{},
		stream grpc.ServerStream,
		info *grpc.StreamServerInfo,
		handler grpc.StreamHandler,
	) error {
		err := a.authorize(stream.Context(), info.FullMethod)
		if err != nil {
			return err
		}

		return handler(srv, stream)
	}
}

func (a *authService) authorize(ctx context.Context, method string) error {
	_, ok := allowAllList()[method]
	if ok {
		// everyone can access
		return nil
	}

	// get the api key
	md, ok := metadata.FromIncomingContext(ctx)
	if !ok {
		return status.Errorf(codes.Unauthenticated, "metadata is not provided")
	}
	values := md["x-api-key"]
	if len(values) == 0 {
		return status.Errorf(codes.Unauthenticated, "api key is not provided")
	}
	apiKey := values[0]

	apiKeys, err := a.state.ListAuth()
	if err != nil {
		return err
	}

	for _, storedApiKey := range apiKeys {
		if apiKey == storedApiKey.Key {
			return nil
		}
	}

	// if we made it through all the keys and no match, return error
	return status.Error(codes.PermissionDenied, "no permission to access this RPC")
}

func allowAllList() map[string]struct{} {
	return map[string]struct{}{
		"/key.Key/InitSeed":              {},
		"/key.Key/UnlockSeed":            {},
		"/key.Key/Status":                {},
		"/websocket.Websocket/Subscribe": {},
	}
}
