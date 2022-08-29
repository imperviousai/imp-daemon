package relay

import (
	"context"

	"github.com/imperviousai/imp-daemon/core"
	relay_proto "github.com/imperviousai/imp-daemon/gen/go/proto/imp/api/relay"
	"github.com/imperviousai/imp-daemon/id"
	"github.com/imperviousai/imp-daemon/service/relay"
	"go.uber.org/zap"
)

// GRPC server implementation

type relayServer struct {
	relay_proto.UnimplementedRelayServer
	core core.Core
}

func NewRelayServer(c core.Core) relay_proto.RelayServer {
	return &relayServer{
		core: c,
	}
}

func (m *relayServer) RequestRelay(ctx context.Context, req *relay_proto.RequestRelayRequest) (*relay_proto.RequestRelayResponse, error) {
	zap.L().Info("[Server] RequestRelay",
		zap.String("to_did", req.GetToDID()),
	)

	// Convert service endpoints to relay request
	reqData := &relay.RelayRegistrationRequestData{
		PrivateServiceEndpoints: make([]id.Service, 0),
	}
	for _, serviceEndpoint := range req.GetPrivateServiceEndpoints() {
		reqData.PrivateServiceEndpoints = append(reqData.PrivateServiceEndpoints, id.Service{
			ID:              serviceEndpoint.Id,
			Type:            serviceEndpoint.Type,
			ServiceEndpoint: serviceEndpoint.ServiceEndpoint,
		})
	}

	id, err := m.core.SendRegistrationRequest(req.GetToDID(), req.GetAmount(), reqData)
	if err != nil {
		zap.L().Error("[Server] SendMessage failed", zap.String("error", err.Error()))
		return nil, err
	}

	zap.L().Info("[Server] SendMessage success", zap.String("message_id", id))
	return &relay_proto.RequestRelayResponse{
		Id: id,
	}, nil
}

func (m *relayServer) RequestMailbox(ctx context.Context, req *relay_proto.RequestMailboxRequest) (*relay_proto.RequestMailboxResponse, error) {
	zap.L().Info("[Server] RequestMailbox",
		zap.String("to_did", req.GetToDID()),
	)

	// Convert service endpoints to relay request
	reqData := &relay.RelayMailboxRequestData{
		PrivateServiceEndpoints: make([]id.Service, 0),
	}
	for _, serviceEndpoint := range req.GetPrivateServiceEndpoints() {
		reqData.PrivateServiceEndpoints = append(reqData.PrivateServiceEndpoints, id.Service{
			ID:              serviceEndpoint.Id,
			Type:            serviceEndpoint.Type,
			ServiceEndpoint: serviceEndpoint.ServiceEndpoint,
		})
	}

	id, err := m.core.SendMailboxRequest(req.GetToDID(), req.GetAmount(), reqData)
	if err != nil {
		zap.L().Error("[Server] SendMessage failed", zap.String("error", err.Error()))
		return nil, err
	}

	zap.L().Info("[Server] SendMessage success", zap.String("message_id", id))
	return &relay_proto.RequestMailboxResponse{
		Id: id,
	}, nil
}
