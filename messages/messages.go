package messages

import (
	"errors"
	"strings"
	"time"

	messages_state "github.com/imperviousai/imp-daemon/messages/state"
	"github.com/imperviousai/imp-daemon/state"
)

//go:generate mockgen --destination=./mock/message_mock.go --package=mock github.com/imperviousai/imp-daemon/messages MessageManager

type MessageManager interface {
	GetMessages() ([]*MessageInfo, error)
	SaveMessage(*MessageInfo) error
	SaveMessageEvent(*MessageEvent) error
	DeleteMessage(string, string) error
}

type Config struct {
	Db state.DBManager
}

type messageManager struct {
	state messages_state.MessagesState
}

func New(cfg *Config) (MessageManager, error) {
	// Init the identity state database first
	state, err := messages_state.InitMessageState(cfg.Db)
	if err != nil {
		return nil, err
	}

	return &messageManager{
		state: state,
	}, nil
}

type MessageInfo struct {
	Id         string         `json:"id"`
	Type       string         `json:"type"`
	Recipients []string       `json:"recipients"`
	Data       []byte         `json:"data"`
	Events     []MessageEvent `json:"events"`
	Transport  string         `json:"transport"`
	GroupId    string         `json:"group_id"`
	Added      time.Time      `json:"added"`
}

type MessageEvent struct {
	Id        string    `json:"id"`
	MessageId string    `json:"messageId"`
	DID       string    `json:"did"`
	Type      string    `json:"type"`
	EventTime time.Time `json:"added"`
}

type MessageQuery struct {
	Id         string   `json:"id"`
	Type       string   `json:"type"`
	Recipients []string `json:"recipients"`
}

func (m *messageManager) GetMessages() ([]*MessageInfo, error) {
	messagesState, err := m.state.ListMessages(transformMessageInfoToMessageState(&MessageInfo{}))
	if err != nil {
		return nil, err
	}
	return transformMessageStateSliceToMessageInfoSlice(messagesState), nil
}

func (m *messageManager) SaveMessage(msg *MessageInfo) error {
	// compact all DIDs down to the main DID, no query parameters
	for i, recipient := range msg.Recipients {
		msg.Recipients[i] = strings.Split(recipient, "?")[0]
	}

	return m.state.SaveMessage(transformMessageInfoToMessageState(msg))
}

func (m *messageManager) SaveMessageEvent(event *MessageEvent) error {
	return m.state.SaveMessageEvent(transformMessageEventToMessageEventState(*event))
}

func (m *messageManager) DeleteMessage(id, groupId string) error {
	switch {
	case id != "":
		return m.state.DeleteMessage(id)
	case groupId != "":
		return m.state.DeleteMessages(groupId)
	default:
		return errors.New("no message deletion parameters specified")
	}
}

func transformMessageInfoToMessageState(messageInfo *MessageInfo) *messages_state.MessageState {

	msgEvent :=
		transformMessageEventsToMessageEventState(messageInfo.Events)
	return &messages_state.MessageState{
		Id:         messageInfo.Id,
		Type:       messageInfo.Type,
		Recipients: messageInfo.Recipients,
		Data:       messageInfo.Data,
		Transport:  messageInfo.Transport,
		GroupId:    messageInfo.GroupId,
		Events:     msgEvent,
		Added:      messageInfo.Added,
	}
}

func transformMessageEventsToMessageEventState(messageEvents []MessageEvent) []messages_state.MessageEvent {
	convertedMessageEvents := make([]messages_state.MessageEvent, 0, len(messageEvents))
	for _, messageEvent := range messageEvents {
		conv := transformMessageEventToMessageEventState(messageEvent)
		convertedMessageEvents = append(convertedMessageEvents, *conv)
	}

	return convertedMessageEvents
}

func transformMessageEventToMessageEventState(messageEvent MessageEvent) *messages_state.MessageEvent {
	return &messages_state.MessageEvent{
		Id:        messageEvent.Id,
		MessageId: messageEvent.MessageId,
		DID:       messageEvent.DID,
		Type:      messageEvent.Type,
		EventTime: messageEvent.EventTime,
	}
}

func transformMessageStateSliceToMessageInfoSlice(messagesStates []*messages_state.MessageState) []*MessageInfo {

	messageInfos := make([]*MessageInfo, 0, len(messagesStates))
	for _, messagesState := range messagesStates {
		convertedEvents := transformMessageEventStateSliceToMessageEventSlice(messagesState.Events)
		conv := MessageInfo{
			Id:         messagesState.Id,
			Type:       messagesState.Type,
			Recipients: messagesState.Recipients,
			Data:       messagesState.Data,
			Transport:  messagesState.Transport,
			GroupId:    messagesState.GroupId,
			Events:     convertedEvents,
			Added:      messagesState.Added,
		}
		messageInfos = append(messageInfos, &conv)
	}
	return messageInfos
}

func transformMessageEventStateSliceToMessageEventSlice(messagesEvents []messages_state.MessageEvent) []MessageEvent {
	convertedMessageEvents := make([]MessageEvent, 0, len(messagesEvents))
	for _, messageEvent := range messagesEvents {
		conv := MessageEvent{
			Id:        messageEvent.Id,
			MessageId: messageEvent.MessageId,
			DID:       messageEvent.DID,
			Type:      messageEvent.Type,
			EventTime: messageEvent.EventTime,
		}
		convertedMessageEvents = append(convertedMessageEvents, conv)
	}
	return convertedMessageEvents
}
