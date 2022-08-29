package websocket

import (
	"encoding/json"
	"errors"

	websocket_proto "github.com/imperviousai/freeimp/gen/go/proto/imp/api/websocket"
	"github.com/imperviousai/freeimp/service"
	"go.uber.org/zap"
)

// GRPC server implementation

type websocketServer struct {
	websocket_proto.UnimplementedWebsocketServer
	websocket service.Websocket
}

func NewWebsocketServer(w service.Websocket) websocket_proto.WebsocketServer {
	return &websocketServer{
		websocket: w,
	}
}

func (m *websocketServer) Subscribe(req *websocket_proto.SubscribeRequest, stream websocket_proto.Websocket_SubscribeServer) error {
	zap.L().Info("[Server] Subscribe")

	id, subscribeChan := m.websocket.SubscribeData()
	defer m.websocket.UnsubscribeData(id)
	defer zap.L().Info("[Server] Subscribe successful")

	for {
		data := <-subscribeChan

		// Build and send response to the client
		dataBody, err := json.Marshal(data)
		if err != nil {
			zap.L().Error("Error parsing data body")
			return err
		}
		res := stream.Send(&websocket_proto.SubscribeResponse{
			Data:   dataBody,
			Amount: data.GetAmountMetadata(),
		})

		// Handle any possible error, when sending the response
		if res != nil {
			zap.L().Error("[Server] Subscribe ending", zap.String("error", res.Error()))
			return errors.New("Stream error")
		}

		zap.L().Debug("[Server] Subscribe sent new message through stream", zap.String("message_id", data.ID))
	}
}
