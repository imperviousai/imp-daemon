package state

import (
	"database/sql"
	"errors"
	"fmt"
	"time"

	"github.com/google/uuid"
	"github.com/imperviousai/imp-daemon/state"
)

//go:generate mockgen --destination=./mock/message_state_mock.go --package=mock github.com/imperviousai/imp-daemon/messages/state MessagesState

type MessagesState interface {
	SaveMessage(*MessageState) error
	SaveMessageEvent(*MessageEvent) error
	ListMessages(*MessageState) ([]*MessageState, error)
	FindMessage(id string) (*MessageState, error)
	DeleteMessage(id string) error
	DeleteMessages(groupId string) error
}

type MessageState struct {
	Id         string         `json:"id"`
	Type       string         `json:"type"`
	Recipients []string       `json:"recipients"`
	Data       []byte         `json:"data"`
	Transport  string         `json:"transport"`
	GroupId    string         `json:"group_id"`
	Events     []MessageEvent `json:"events"`
	Added      time.Time      `json:"added"`
}

type MessageEvent struct {
	Id        string    `json:"id"`
	MessageId string    `json:"messageId"`
	DID       string    `json:"did"`
	Type      string    `json:"type"`
	EventTime time.Time `json:"added"`
}

type messagesState struct {
	db state.DBManager
}

type messagesStateInternal struct {
	Id        string         `json:"id"`
	Type      sql.NullString `json:"type"`
	GroupId   string         `json:"groupId"`
	Data      sql.NullString `json:"data"`
	Transport sql.NullString `json:"transport"`
	Added     sql.NullTime   `json:"added"`
}

type messageEventInternal struct {
	Id        string         `json:"id"`
	MessageId string         `json:"messageId"`
	DID       string         `json:"did"`
	Type      sql.NullString `json:"type"`
	Added     sql.NullTime   `json:"added"`
}

func convertMessageEventsInternal(internal *messageEventInternal) *MessageEvent {
	var nullableType string
	var nullableAdded time.Time

	if internal.Type.Valid {
		nullableType = internal.Type.String
	}
	if internal.Added.Valid {
		nullableAdded = internal.Added.Time
	}
	return &MessageEvent{
		Id:        internal.Id,
		MessageId: internal.MessageId,
		DID:       internal.DID,
		Type:      nullableType,
		EventTime: nullableAdded,
	}
}

func convertMessagesStateInternal(internal *messagesStateInternal, recipients []string, events []MessageEvent) *MessageState {
	var nullableType string
	var nullableData string
	var nullableTransport string
	var nullableAdded time.Time

	if internal.Type.Valid {
		nullableType = internal.Type.String
	}
	if internal.Data.Valid {
		nullableData = internal.Data.String
	}
	if internal.Transport.Valid {
		nullableTransport = internal.Transport.String
	}
	if internal.Added.Valid {
		nullableAdded = internal.Added.Time
	}
	return &MessageState{
		Id:         internal.Id,
		Type:       nullableType,
		Recipients: recipients,
		Events:     events,
		GroupId:    internal.GroupId,
		Data:       []byte(nullableData),
		Transport:  nullableTransport,
		Added:      nullableAdded,
	}
}

func InitMessageState(db state.DBManager) (MessagesState, error) {
	createContactGroupssTable := fmt.Sprintf("create table if not exists message_groups (id integer %s, group_id VARCHAR(255), did VARCHAR(255) NOT NULL, unique(id, did))", state.PRIMARY_KEY(db.Type()))
	db.RegisterInitScript(createContactGroupssTable)

	createMessagesTable := fmt.Sprintf("create table if not exists messages (id VARCHAR(255) PRIMARY KEY, type VARCHAR(255), groupId VARCHAR(255) references message_groups(group_id), data json not NULL, transport VARCHAR(255), added datetime default %s)", state.DEFAULT_TIMESTAMP(db.Type()))
	db.RegisterInitScript(createMessagesTable)

	createMessageEventsTable := fmt.Sprintf("create table if not exists message_events (id integer %s, messageId VARCHAR(255) references messages(id), did VARCHAR(255) NOT NULL, type VARCHAR(255) NOT NULL, added datetime default %s)", state.PRIMARY_KEY(db.Type()), state.DEFAULT_TIMESTAMP(db.Type()))
	db.RegisterInitScript(createMessageEventsTable)

	return &messagesState{
		db: db,
	}, nil
}

func (m *messagesState) SaveMessage(msg *MessageState) error {
	// first check if this group has already been saved
	sharedGroupId, err := m.findSharedGroupId(msg.Recipients)
	if err != nil {
		if err.Error() == "No Shared ID" {
			// it's okay if we did not find a group, create one now
			sharedGroupId, err = m.saveGroup(msg.Recipients)
			if err != nil {
				return err
			}
		} else {
			return err
		}
		if sharedGroupId == "" {
			return errors.New("Shared group not found or saved")
		}
	}

	sqlStmt := "insert into messages(id, type, groupId, data, transport) values(?, ?, ?, ?, ?)"
	_, err = m.db.SafeExec(sqlStmt, msg.Id, msg.Type, sharedGroupId, state.JSON(m.db.Type(), string(msg.Data)), msg.Transport)
	if err != nil {
		return err
	}
	return nil
}

func (m *messagesState) SaveMessageEvent(event *MessageEvent) error {
	sqlStmt := "insert into message_events(did, messageId, type) values(?, ?, ?)"
	_, err := m.db.SafeExec(sqlStmt, event.DID, event.MessageId, event.Type)
	if err != nil {
		return err
	}
	return nil
}

func (m *messagesState) saveGroup(ids []string) (string, error) {
	// create a new uuid for this group
	groupId := uuid.New().String()
	for _, id := range ids {
		sqlStmt := "insert into message_groups(group_id, did) values(?, ?)"
		_, err := m.db.SafeExec(sqlStmt, groupId, id)
		if err != nil {
			return "", err
		}
	}
	return groupId, nil
}

func (m *messagesState) findSharedGroupId(ids []string) (string, error) {
	sharedGroupAmount := make(map[string]int)

	for i, id := range ids {
		groupIds, err := m.findAllGroupsForId(id)
		if err != nil {
			return "", err
		}

		for _, groupId := range groupIds {
			sharedGroupAmount[groupId]++
		}
		if i == 0 {
			continue
		}

		// if not the first, check to make sure all map values have i+1 entries
		// we can skip out early if it doesn't and not check the rest
		for k, v := range sharedGroupAmount {
			if v != i+1 {
				continue
			}
			// So far each id has a shared value
			// If at the end, return that value
			if len(ids) == i+1 {
				return k, nil
			}
		}
	}

	return "", errors.New("No Shared ID")
}

func (m *messagesState) findAllGroupsForId(id string) ([]string, error) {
	groupIdList := make([]string, 0)
	sqlStmt := "select group_id from message_groups where did = ?"
	rows, err := m.db.SafeQuery(sqlStmt, id)
	if err != nil {
		return nil, err
	}

	defer rows.Close()
	for rows.Next() {
		var id string
		err = rows.Scan(&id)
		if err != nil {
			return nil, err
		}
		groupIdList = append(groupIdList, id)
	}

	err = rows.Err()
	if err != nil {
		return nil, err
	}

	return groupIdList, nil
}

func (m *messagesState) ListMessages(msgQuery *MessageState) ([]*MessageState, error) {
	messageList := make([]*MessageState, 0)
	// TODO more queries
	// whereQuery := ""
	sqlStmt := "select id, type, groupId, data, transport, added from messages "
	rows, err := m.db.SafeQuery(sqlStmt)
	if err != nil {
		return nil, err
	}

	defer rows.Close()
	for rows.Next() {
		messageInfo := &messagesStateInternal{}
		err = rows.Scan(&messageInfo.Id, &messageInfo.Type, &messageInfo.GroupId, &messageInfo.Data, &messageInfo.Transport, &messageInfo.Added)
		if err != nil {
			return nil, err
		}
		// per each message, get all the recipients
		// TODO cache recipients
		recipientIds, err := m.getRecipientIdsFromGroupId(messageInfo.GroupId)
		if err != nil {
			return nil, err
		}

		// per each message, get the list of events
		eventList, err := m.getMessageEventsFromGroupId(messageInfo.Id)
		if err != nil {
			return nil, err
		}

		convertedState := convertMessagesStateInternal(messageInfo, recipientIds, eventList)

		messageList = append(messageList, convertedState)
	}

	err = rows.Err()
	if err != nil {
		return nil, err
	}
	return messageList, err
}

func (m *messagesState) getRecipientIdsFromGroupId(id string) ([]string, error) {
	recipients := make([]string, 0)
	sqlStmt := "select did from message_groups where group_id = ?"
	rows, err := m.db.SafeQuery(sqlStmt, id)
	if err != nil {
		return nil, err
	}

	defer rows.Close()
	for rows.Next() {
		var did string
		err = rows.Scan(&did)
		if err != nil {
			return nil, err
		}
		recipients = append(recipients, did)
	}

	err = rows.Err()
	if err != nil {
		return nil, err
	}

	return recipients, nil
}

func (m *messagesState) getMessageEventsFromGroupId(id string) ([]MessageEvent, error) {
	eventList := make([]MessageEvent, 0)
	sqlStmt := "select id, did, type, added from message_events where messageId = ?"
	rows, err := m.db.SafeQuery(sqlStmt, id)
	if err != nil {
		return nil, err
	}

	defer rows.Close()
	for rows.Next() {
		messageEvent := &messageEventInternal{}
		err = rows.Scan(&messageEvent.Id, &messageEvent.DID, &messageEvent.Type, &messageEvent.Added)
		if err != nil {
			return nil, err
		}
		messageEvent.MessageId = id
		convertedEvent := convertMessageEventsInternal(messageEvent)
		eventList = append(eventList, *convertedEvent)
	}

	err = rows.Err()
	if err != nil {
		return nil, err
	}

	return eventList, nil
}

func (m *messagesState) FindMessage(id string) (*MessageState, error) {
	// TODO
	return nil, nil
}

func (m *messagesState) DeleteMessage(id string) error {
	sqlStmt := "delete from messages where id = ?"
	_, err := m.db.SafeExec(sqlStmt, id)
	if err != nil {
		return err
	}
	return nil
}

func (m *messagesState) DeleteMessages(groupId string) error {
	sqlStmt := "delete from messages where groupId = ?"
	_, err := m.db.SafeExec(sqlStmt, groupId)
	if err != nil {
		return err
	}
	return nil
}
