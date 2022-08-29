package messages

import (
	"testing"
	"time"

	"github.com/golang/mock/gomock"
	messages_state "github.com/imperviousai/imp-daemon/messages/state"
	mock_state "github.com/imperviousai/imp-daemon/messages/state/mock"
	"github.com/stretchr/testify/suite"
)

type MessageSuite struct {
	suite.Suite
	MockController *gomock.Controller

	// Mocks
	MockedState *mock_state.MockMessagesState

	// Under test
	Message *messageManager
}

func (s *MessageSuite) SetupTest() {
	s.MockController = gomock.NewController(s.T())
	s.MockedState = mock_state.NewMockMessagesState(s.MockController)

	s.Message = &messageManager{
		state: s.MockedState,
	}
}

func (s *MessageSuite) AfterTest(_, _ string) {
	s.MockController.Finish()
}

func TestMessage(t *testing.T) {
	suite.Run(t, new(MessageSuite))
}

func (s *MessageSuite) TestGetMessagesSuccess() {
	expectedMessages := []*MessageInfo{
		{
			Id:     "some_id",
			Events: make([]MessageEvent, 0),
		},
	}

	// Mock setup
	returnedMessages := []*messages_state.MessageState{
		{
			Id: "some_id",
		},
	}

	s.MockedState.EXPECT().
		ListMessages(gomock.Any()).
		Return(returnedMessages, nil).
		Times(1)

	// Under test
	messages, err := s.Message.GetMessages()
	s.Assert().Nil(err)
	s.Assert().ElementsMatch(expectedMessages, messages)
}

func (s *MessageSuite) TestDeleteMessageSuccess() {
	// Test for ID deletion
	id := "1"

	// Mock setup
	s.MockedState.EXPECT().
		DeleteMessage(id).
		Return(nil).
		Times(1)

	// Under test
	err := s.Message.DeleteMessage(id, "")
	s.Assert().Nil(err)

	// Test for Group deletion
	group := "2"

	// Mock setup
	s.MockedState.EXPECT().
		DeleteMessages(group).
		Return(nil).
		Times(1)

	// Under test
	err = s.Message.DeleteMessage("", group)
	s.Assert().Nil(err)

	// Test for no deletion error

	// Under test
	err = s.Message.DeleteMessage("", "")
	s.Assert().Error(err)
}

func (s *MessageSuite) TestSaveMessageEventSuccess() {
	now := time.Now()

	event := &MessageEvent{
		Id:        "1",
		MessageId: "2",
		DID:       "did:peer:123",
		Type:      "sent",
		EventTime: now,
	}
	convertedEvent := &messages_state.MessageEvent{
		Id:        "1",
		MessageId: "2",
		DID:       "did:peer:123",
		Type:      "sent",
		EventTime: now,
	}

	// Mock setup
	s.MockedState.EXPECT().
		SaveMessageEvent(convertedEvent).
		Return(nil).
		Times(1)

	// Under test
	err := s.Message.SaveMessageEvent(event)
	s.Assert().Nil(err)
}
