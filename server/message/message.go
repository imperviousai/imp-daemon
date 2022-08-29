package message

import (
	"context"

	"github.com/imperviousai/freeimp/comm"
	"github.com/imperviousai/freeimp/core"
	messaging_proto "github.com/imperviousai/freeimp/gen/go/proto/imp/api/messaging"
	"github.com/imperviousai/freeimp/messages"
	"go.uber.org/zap"
	"google.golang.org/protobuf/types/known/timestamppb"
)

// GRPC server implementation

type messagingServer struct {
	messaging_proto.UnimplementedMessagingServer
	core core.Core
}

func NewMessagingServer(c core.Core) messaging_proto.MessagingServer {
	return &messagingServer{
		core: c,
	}
}

func (m *messagingServer) SendMessage(ctx context.Context, req *messaging_proto.SendMessageRequest) (*messaging_proto.SendMessageResponse, error) {
	zap.L().Info("[Server] SendMessage",
		zap.String("to_did", req.GetDid()),
	)

	id, err := m.core.SendMessage(req.GetMsg(), req.GetDid(), req.GetAmount(), req.GetReplyToId())
	if err != nil {
		zap.L().Error("[Server] SendMessage failed", zap.String("error", err.Error()))
		return nil, err
	}

	zap.L().Info("[Server] SendMessage success", zap.String("message_id", id))
	return &messaging_proto.SendMessageResponse{
		Id: id,
	}, nil
}

func (m *messagingServer) SendMessageV2(ctx context.Context, req *messaging_proto.SendMessageV2Request) (*messaging_proto.SendMessageV2Response, error) {
	zap.L().Info("[Server] SendMessageV2",
		zap.String("to_did", req.GetDid()),
		zap.Any("body_str", req.GetBody()),
	)

	var dids []string
	if len(req.GetDid()) > 0 {
		dids = []string{req.GetDid()}
	} else {
		dids = req.GetRecipientList()
	}

	settings := convertProtoToMessageSettings(req.GetMessageSettings())
	id, err := m.core.SendMessageV2(req.GetBody(), req.GetType(), dids, req.GetAmount(), req.GetReplyToId(), req.GetGroupId(), settings)
	if err != nil {
		zap.L().Error("[Server] SendMessageV2 failed", zap.String("error", err.Error()))
		return nil, err
	}

	zap.L().Info("[Server] SendMessageV2 success", zap.String("message_ids", id))
	return &messaging_proto.SendMessageV2Response{
		Id: id,
	}, nil
}

func (m *messagingServer) SaveMessageV2(ctx context.Context, req *messaging_proto.SaveMessageV2Request) (*messaging_proto.SaveMessageV2Response, error) {
	zap.L().Info("[Server] SaveMessageV2",
		zap.String("to_did", req.GetDid()),
		zap.Any("body_str", req.GetBody()),
	)

	var dids []string
	if len(req.GetDid()) > 0 {
		dids = []string{req.GetDid()}
	} else {
		dids = req.GetRecipientList()
	}

	id, err := m.core.SaveMessage(req.GetBody(), req.GetType(), dids, req.GetFrom(), req.GetReplyToId(), req.GetGroupId())
	if err != nil {
		zap.L().Error("[Server] SaveMessageV2 failed", zap.String("error", err.Error()))
		return nil, err
	}

	zap.L().Info("[Server] SaveMessageV2 success", zap.String("message_ids", id))
	return &messaging_proto.SaveMessageV2Response{
		Id: id,
	}, nil
}

func (m *messagingServer) GetMessageList(ctx context.Context, req *messaging_proto.GetMessageListRequest) (*messaging_proto.GetMessageListResponse, error) {
	zap.L().Info("[Server] GetMessageList")

	msgs, err := m.core.GetMessages()
	if err != nil {
		zap.L().Error("[Server] GetMessageList failed", zap.String("error", err.Error()))
		return nil, err
	}

	zap.L().Info("[Server] GetMessageList success")
	return &messaging_proto.GetMessageListResponse{
		Messages: convertMessagesToProto(msgs),
	}, nil
}

func (m *messagingServer) DeleteMessage(ctx context.Context, req *messaging_proto.DeleteMessageRequest) (*messaging_proto.DeleteMessageResponse, error) {
	zap.L().Info("[Server] DeleteMessage",
		zap.String("id", req.GetId()),
	)
	err := m.core.DeleteMessage(req.GetId(), "")
	if err != nil {
		return nil, err
	}

	zap.L().Info("[Server] DeleteMessage success")
	return &messaging_proto.DeleteMessageResponse{}, nil
}

func (m *messagingServer) DeleteGroupMessage(ctx context.Context, req *messaging_proto.DeleteGroupMessageRequest) (*messaging_proto.DeleteGroupMessageResponse, error) {
	zap.L().Info("[Server] DeleteGroupMessage",
		zap.String("group_id", req.GetGroupId()),
	)
	err := m.core.DeleteMessage("", req.GetGroupId())
	if err != nil {
		return nil, err
	}

	zap.L().Info("[Server] DeleteGroupMessage success")
	return &messaging_proto.DeleteGroupMessageResponse{}, nil
}

func convertProtoToMessageSettings(settings *messaging_proto.MessageSettings) *comm.MessageSettings {
	if settings == nil {
		return nil
	}
	messageSettings := &comm.MessageSettings{
		ProtocolPreferences: settings.GetProtocolPreferences(),
	}
	return messageSettings
}

func convertMessagesToProto(msgs []*messages.MessageInfo) []*messaging_proto.Message {
	convertedMsgList := make([]*messaging_proto.Message, 0)

	for _, msg := range msgs {
		convertedMsg := convertMessageToProto(msg)
		convertedMsgList = append(convertedMsgList, convertedMsg)
	}

	return convertedMsgList
}

func convertMessageToProto(msg *messages.MessageInfo) *messaging_proto.Message {
	return &messaging_proto.Message{
		Id:         msg.Id,
		Type:       msg.Type,
		Recipients: msg.Recipients,
		Data:       string(msg.Data),
		Transport:  msg.Transport,
		GroupId:    msg.GroupId,
		Events:     convertMessageEventsToProto(msg.Events),
	}
}

func convertMessageEventsToProto(msgEvents []messages.MessageEvent) []*messaging_proto.MessageEvent {
	eventsList := make([]*messaging_proto.MessageEvent, len(msgEvents))
	for i, msgEvent := range msgEvents {
		eventsList[i] = convertMessageEventToProto(msgEvent)
	}
	return eventsList
}

func convertMessageEventToProto(msgEvent messages.MessageEvent) *messaging_proto.MessageEvent {
	return &messaging_proto.MessageEvent{
		Id:        msgEvent.Id,
		MessageId: msgEvent.MessageId,
		DID:       msgEvent.DID,
		Type:      msgEvent.Type,
		EventTime: timestamppb.New(msgEvent.EventTime),
	}
}
