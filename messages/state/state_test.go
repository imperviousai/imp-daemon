package state

import (
	"database/sql"
	"testing"
	"time"

	"github.com/golang/mock/gomock"
	mock_db "github.com/imperviousai/imp-daemon/state/mock"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/suite"
)

type MessageStateSuite struct {
	suite.Suite
	MockController *gomock.Controller

	// Mocks
	MockedDb *mock_db.MockDBManager

	// Under test
	MessageState *messagesState
}

func (s *MessageStateSuite) SetupTest() {
	s.MockController = gomock.NewController(s.T())
	s.MockedDb = mock_db.NewMockDBManager(s.MockController)

	s.MessageState = &messagesState{
		db: s.MockedDb,
	}
}

func (s *MessageStateSuite) AfterTest(_, _ string) {
	s.MockController.Finish()
}

func TestMessageState(t *testing.T) {
	suite.Run(t, new(MessageStateSuite))
}

func (s *MessageStateSuite) TestGetRecipientIdsFromGroupIdSuccess() {
	groupId := "some_id"

	// Mock setup
	expectedSql := `select did from message_groups where group_id = ?`

	returnedRows := mock_db.NewMockRows(s.MockController)
	returnedRows.EXPECT().
		Close().
		Times(1)

	returnedRows.EXPECT().
		Next().
		Return(true).
		Times(1)

	returnedRows.EXPECT().
		Next().
		Return(false).
		Times(1)

	returnedRows.EXPECT().
		Err().
		Return(nil).
		Times(1)

	returnedRows.EXPECT().
		Scan(gomock.Any()).
		Return(nil).
		Times(1)

	s.MockedDb.EXPECT().
		SafeQuery(gomock.Eq(expectedSql), gomock.Eq(groupId)).
		Return(returnedRows, nil).
		Times(1)

	// Under test
	recipientIds, err := s.MessageState.getRecipientIdsFromGroupId(groupId)
	s.Assert().Nil(err)
	s.Assert().NotNil(recipientIds)
}

func (s *MessageStateSuite) TestGetMessageEventsFromGroupId() {
	messageId := "some_id"

	// Mock setup
	expectedSql := `select id, did, type, added from message_events where messageId = ?`

	returnedRows := mock_db.NewMockRows(s.MockController)
	returnedRows.EXPECT().
		Close().
		Times(1)

	returnedRows.EXPECT().
		Next().
		Return(true).
		Times(1)

	returnedRows.EXPECT().
		Next().
		Return(false).
		Times(1)

	returnedRows.EXPECT().
		Err().
		Return(nil).
		Times(1)

	returnedRows.EXPECT().
		Scan(gomock.Any()).
		Return(nil).
		Times(1)

	s.MockedDb.EXPECT().
		SafeQuery(gomock.Eq(expectedSql), gomock.Eq(messageId)).
		Return(returnedRows, nil).
		Times(1)

	// Under test
	messageEvents, err := s.MessageState.getMessageEventsFromGroupId(messageId)
	s.Assert().Nil(err)
	s.Assert().NotNil(messageEvents)
}

func (s *MessageStateSuite) TestFindSharedGroupIdSuccess() {
	groupId := "some_id"
	did1 := "did:peer:1"
	did2 := "did:peer:2"

	// Mock setup
	expectedSql := `select group_id from message_groups where did = ?`

	returnedRows := mock_db.NewMockRows(s.MockController)
	returnedRows.EXPECT().
		Close().
		Times(2)

	// Returned rows happens twice, in this order
	returnedRows.EXPECT().
		Next().
		Return(true).
		Times(1)

	returnedRows.EXPECT().
		Next().
		Return(false).
		Times(1)

	returnedRows.EXPECT().
		Next().
		Return(true).
		Times(1)

	returnedRows.EXPECT().
		Next().
		Return(false).
		Times(1)

	// Should return no error twice
	returnedRows.EXPECT().
		Err().
		Return(nil).
		Times(2)

	// Sets the value of both group ID calls
	setValues := []interface{}{
		groupId,
	}
	returnedRows.EXPECT().
		Scan(gomock.Any()).
		SetArg(0, setValues[0]).
		Return(nil).
		Times(2)

	// This should happen twice, once for each DID
	s.MockedDb.EXPECT().
		SafeQuery(gomock.Eq(expectedSql), gomock.Eq(did1)).
		Return(returnedRows, nil).
		Times(1)

	s.MockedDb.EXPECT().
		SafeQuery(gomock.Eq(expectedSql), gomock.Eq(did2)).
		Return(returnedRows, nil).
		Times(1)

	// Under test
	foundGroupId, err := s.MessageState.findSharedGroupId([]string{did1, did2})
	s.Assert().Nil(err)
	s.Assert().Equal(groupId, foundGroupId)
}

func (s *MessageStateSuite) TestDeleteMessageSuccess() {
	// Mock setup
	id := "1"

	expectedSql := "delete from messages where id = ?"
	s.MockedDb.EXPECT().
		SafeExec(gomock.Eq(expectedSql), gomock.Eq(id)).
		Return(nil, nil).
		Times(1)

	// Under test
	err := s.MessageState.DeleteMessage(id)
	s.Assert().Nil(err)
}

func (s *MessageStateSuite) TestDeleteMessagesSuccess() {
	// Mock setup
	groupId := "1"

	expectedSql := "delete from messages where groupId = ?"
	s.MockedDb.EXPECT().
		SafeExec(gomock.Eq(expectedSql), gomock.Eq(groupId)).
		Return(nil, nil).
		Times(1)

	// Under test
	err := s.MessageState.DeleteMessages(groupId)
	s.Assert().Nil(err)
}

func TestConvertMessagesStateInternalSuccess(t *testing.T) {
	now := time.Now()

	internal := &messagesStateInternal{
		Id: "1",
		Type: sql.NullString{
			String: "type",
			Valid:  true,
		},
		GroupId: "2",
		Data: sql.NullString{
			String: "data",
			Valid:  true,
		},
		Transport: sql.NullString{
			String: "transport",
			Valid:  true,
		},
		Added: sql.NullTime{
			Time:  now,
			Valid: true,
		},
	}

	recipients := []string{"123", "321"}
	eventList := []MessageEvent{{
		Id:        "1",
		DID:       "123",
		Type:      "something",
		EventTime: now,
	}}

	expected := &MessageState{
		Id:         "1",
		Type:       "type",
		GroupId:    "2",
		Recipients: []string{"123", "321"},
		Data:       []byte("data"),
		Events:     eventList,
		Transport:  "transport",
		Added:      now,
	}

	conversion := convertMessagesStateInternal(internal, recipients, eventList)

	assert.Equal(t, expected, conversion)
}

func TestConvertMessageEventsInternal(t *testing.T) {
	now := time.Now()

	internal := &messageEventInternal{
		Id:  "1",
		DID: "did:peer:123",
		Type: sql.NullString{
			String: "type",
			Valid:  true,
		},
		MessageId: "2",
		Added: sql.NullTime{
			Time:  now,
			Valid: true,
		},
	}
	expected := &MessageEvent{
		Id:        "1",
		DID:       "did:peer:123",
		Type:      "type",
		MessageId: "2",
		EventTime: now,
	}

	conversion := convertMessageEventsInternal(internal)

	assert.Equal(t, expected, conversion)
}

func (s *MessageStateSuite) TestSaveMessageEvent() {
	// Mock setup
	did := "did:peer:123"
	messageId := "1"
	eventType := "sent"

	expectedSql := "insert into message_events(did, messageId, type) values(?, ?, ?)"
	s.MockedDb.EXPECT().
		SafeExec(gomock.Eq(expectedSql), gomock.Eq(did), gomock.Eq(messageId), gomock.Eq(eventType)).
		Return(nil, nil).
		Times(1)

	// Under test
	err := s.MessageState.SaveMessageEvent(&MessageEvent{
		DID:       did,
		MessageId: messageId,
		Type:      eventType,
	})
	s.Assert().Nil(err)
}
