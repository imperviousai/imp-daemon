package state

import (
	"database/sql"
	"fmt"

	"github.com/imperviousai/freeimp/id"
	"github.com/imperviousai/freeimp/state"
	_ "modernc.org/sqlite"
)

//go:generate mockgen --destination=./mock/relay_state_mock.go --package=mock github.com/imperviousai/freeimp/service/relay/state RelayState

type messageStateInternal struct {
	Id      int64          `json:"id"`
	DID     sql.NullString `json:"did"`
	Message sql.NullString `json:"message"`
}

type MessageState struct {
	Id      int64  `json:"id"`
	DID     string `json:"did"`
	Message string `json:"message"`
}

func convertMessageStateInternal(internal *messageStateInternal) *MessageState {
	var nullableDID string
	var nullableMessage string
	if internal.Message.Valid {
		nullableMessage = internal.Message.String
	}
	if internal.DID.Valid {
		nullableDID = internal.DID.String
	}

	return &MessageState{
		Id:      internal.Id,
		Message: nullableMessage,
		DID:     nullableDID,
	}
}

type RelayState interface {
	AddRelayRegistration(did string) error
	GetRelayRegistration(did string) (bool, error)

	AddRelayEndpoint(did string, serviceEndpoint string, seType string, serviceEndpointId string) error
	GetRelayEndpoints(did string) ([]id.Service, error)

	AddRelayMessage(did, msg string) error
	GetRelayMessages(did string) ([]*MessageState, error)
	GetAllRecentRelayMessages() ([]*MessageState, error)
	DeleteRelayMessage(id int64) error
}

type relayState struct {
	db state.DBManager
}

func InitRelayState(db state.DBManager) (RelayState, error) {
	// Create Relay Registration Table
	// For now just keep track of DID that has passed registration
	// This could have more custom variables like date, amount paid, etc. in the future
	createRelayRegistrationTable := fmt.Sprintf("create table if not exists relay_registration (id integer %s, did VARCHAR(255) not null, active bool)", state.PRIMARY_KEY(db.Type()))
	db.RegisterInitScript(createRelayRegistrationTable)

	// Create Relay Table
	createRelayTable := fmt.Sprintf("create table if not exists relay (id integer %s, did VARCHAR(255) not null, service_endpoint VARCHAR(255) not null, type VARCHAR(255) not null, service_endpoint_id VARCHAR(255) not null)", state.PRIMARY_KEY(db.Type()))
	db.RegisterInitScript(createRelayTable)

	// Create mailbox that stores relay messages
	createRelayMessagesTable := fmt.Sprintf("create table if not exists relay_messages (id integer %s, did VARCHAR(255) not null, message json not null, added datetime default %s)", state.PRIMARY_KEY(db.Type()), state.DEFAULT_TIMESTAMP(db.Type()))
	db.RegisterInitScript(createRelayMessagesTable)

	return &relayState{
		db: db,
	}, nil
}

func (s *relayState) AddRelayRegistration(did string) error {
	sqlStmt := "insert into relay_registration(did, active) values(?, ?)"
	_, err := s.db.SafeExec(sqlStmt, did, state.BOOL(s.db.Type(), true))
	if err != nil {
		return err
	}
	return nil
}

func (s *relayState) GetRelayRegistration(did string) (bool, error) {
	var output string
	sqlStmt := "select did from relay_registration where did = ?"
	rows, err := s.db.SafeQuery(sqlStmt, did)
	if err != nil {
		return false, err
	}

	defer rows.Close()
	if !rows.Next() {
		if rows.Err() == nil {
			return false, nil
		}
		// No error means there were just no results
		return false, rows.Err()
	}
	err = rows.Scan(&output)
	if err != nil {
		return false, err
	}
	// If no output, then DID has not been registered, return error
	if output == "" {
		return false, nil
	}

	return true, nil
}

func (s *relayState) AddRelayEndpoint(did string, serviceEndpoint string, seType string, id string) error {
	sqlStmt := "insert into relay(did, service_endpoint, type, service_endpoint_id) values(?, ?, ?, ?)"
	_, err := s.db.SafeExec(sqlStmt, did, serviceEndpoint, seType, id)
	if err != nil {
		return err
	}
	return nil
}

func (s *relayState) GetRelayEndpoints(did string) ([]id.Service, error) {
	serviceEndpoints := make([]id.Service, 0)
	sqlStmt := "select service_endpoint, type, service_endpoint_id from relay where did = ?"
	rows, err := s.db.SafeQuery(sqlStmt, did)
	if err != nil {
		return serviceEndpoints, err
	}

	defer rows.Close()
	for rows.Next() {
		var rServiceEndpoint sql.NullString
		var rType sql.NullString
		var rId sql.NullString

		err = rows.Scan(&rServiceEndpoint, &rType, &rId)
		if err != nil {
			return serviceEndpoints, err
		}
		if rServiceEndpoint.Valid && rType.Valid && rId.Valid {
			serviceEndpoints = append(serviceEndpoints, id.Service{
				ServiceEndpoint: rServiceEndpoint.String,
				Type:            rType.String,
				ID:              rId.String,
			})
		}
	}

	err = rows.Err()
	if err != nil {
		return serviceEndpoints, err
	}
	return serviceEndpoints, err
}

func (s *relayState) AddRelayMessage(did, msg string) error {
	sqlStmt := "insert into relay_messages(did, message) values(?, ?)"
	_, err := s.db.SafeExec(sqlStmt, did, msg)
	if err != nil {
		return err
	}
	return nil
}

func (s *relayState) GetRelayMessages(did string) ([]*MessageState, error) {
	messages := make([]*MessageState, 0)
	sqlStmt := "select id, message from relay_messages where did = ?"
	rows, err := s.db.SafeQuery(sqlStmt, did)
	if err != nil {
		return messages, err
	}

	defer rows.Close()
	for rows.Next() {
		messageInfo := &messageStateInternal{}
		err = rows.Scan(&messageInfo.Id, &messageInfo.Message)
		if err != nil {
			return messages, err
		}
		messages = append(messages, convertMessageStateInternal(messageInfo))
	}

	err = rows.Err()
	if err != nil {
		return messages, err
	}
	return messages, err
}

func (s *relayState) GetAllRecentRelayMessages() ([]*MessageState, error) {
	messages := make([]*MessageState, 0)
	sqlStmt := fmt.Sprintf(`select id, did, message from relay_messages where added > %s`, state.DATE_SINCE(s.db.Type(), 60, "second"))
	rows, err := s.db.SafeQuery(sqlStmt)
	if err != nil {
		return messages, err
	}

	defer rows.Close()
	for rows.Next() {
		messageInfo := &messageStateInternal{}
		err = rows.Scan(&messageInfo.Id, &messageInfo.DID, &messageInfo.Message)
		if err != nil {
			return messages, err
		}
		messages = append(messages, convertMessageStateInternal(messageInfo))
	}

	err = rows.Err()
	if err != nil {
		return messages, err
	}
	return messages, err
}

func (s *relayState) DeleteRelayMessage(id int64) error {
	sqlStmt := "delete from relay_messages where id = ?"
	_, err := s.db.SafeExec(sqlStmt, id)
	if err != nil {
		return err
	}
	return nil
}
