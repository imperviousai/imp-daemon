package state

import (
	"database/sql"
	"fmt"
	"time"

	"github.com/imperviousai/imp-daemon/state"
)

//go:generate mockgen --destination=./mock/contacts_state_mock.go --package=mock github.com/imperviousai/imp-daemon/contacts/state ContactsState

type ContactsState interface {
	SaveContact(*ContactState) (int64, error)
	UpdateContact(*ContactState) error
	ListContacts() ([]*ContactState, error)
	FindContact(id int64) (*ContactState, error)
	DeleteContact(id int64) error
}

type contactsState struct {
	db state.DBManager
}

type contactsStateInternal struct {
	Id           int64          `json:"id"`
	DID          sql.NullString `json:"did"`
	Name         sql.NullString `json:"name"`
	UserDID      sql.NullString `json:"userDID"`
	HasContacted bool           `json:"hasContacted"`
	Metadata     sql.NullString `json:"metadata"`
	Added        sql.NullTime   `json:"added"`
}

type ContactState struct {
	Id           int64     `json:"id"`
	DID          string    `json:"did"`
	DIDDocument  string    `json:"didDocument"`
	Name         string    `json:"name"`
	UserDID      string    `json:"userDID"`
	HasContacted bool      `json:"hasContacted"`
	Metadata     string    `json:"metadata"`
	Added        time.Time `json:"added"`
}

func convertContactsStateInternal(internal *contactsStateInternal) *ContactState {
	var nullableDID string
	var nullableName string
	var nullableUserDID string
	var nullableMetadata string
	var nullableAdded time.Time

	if internal.DID.Valid {
		nullableDID = internal.DID.String
	}
	if internal.Name.Valid {
		nullableName = internal.Name.String
	}
	if internal.UserDID.Valid {
		nullableUserDID = internal.UserDID.String
	}
	if internal.Metadata.Valid {
		nullableMetadata = internal.Metadata.String
	}
	if internal.Added.Valid {
		nullableAdded = internal.Added.Time
	}

	return &ContactState{
		Id:           internal.Id,
		DID:          nullableDID,
		Name:         nullableName,
		UserDID:      nullableUserDID,
		Metadata:     nullableMetadata,
		HasContacted: internal.HasContacted,
		Added:        nullableAdded,
	}
}

func InitContactState(db state.DBManager) (ContactsState, error) {
	// create Contacts Table
	createContactsTable := fmt.Sprintf("create table if not exists contacts (id integer %s, did VARCHAR(255) references identity(id), name VARCHAR(255), userDID VARCHAR(255), hasContacted bool, metadata json, added datetime default %s, unique(did, userDID), unique(name, userDID))", state.PRIMARY_KEY(db.Type()), state.DEFAULT_TIMESTAMP(db.Type()))
	db.RegisterInitScript(createContactsTable)

	return &contactsState{
		db: db,
	}, nil
}

func (c *contactsState) SaveContact(contactInfo *ContactState) (int64, error) {
	sqlStmt := "insert into contacts(did, name, userDID, hasContacted, metadata) values(?, ?, ?, ?, ?)"
	result, err := c.db.SafeExec(sqlStmt, contactInfo.DID, contactInfo.Name, contactInfo.UserDID, state.BOOL(c.db.Type(), contactInfo.HasContacted), state.JSON(c.db.Type(), contactInfo.Metadata))
	if err != nil {
		return 0, err
	}
	return result.LastInsertId()
}

func (c *contactsState) UpdateContact(contactUpdate *ContactState) error {
	sqlStmt := "update contacts set did = ?, name = ?, metadata = ? where id = ?"
	_, err := c.db.SafeExec(sqlStmt, contactUpdate.DID, contactUpdate.Name, state.JSON(c.db.Type(), contactUpdate.Metadata), contactUpdate.Id)
	if err != nil {
		return err
	}
	return nil
}

func (c *contactsState) ListContacts() ([]*ContactState, error) {
	contactsList := make([]*ContactState, 0)
	sqlStmt := "select id, did, name, userDID, hasContacted, metadata, added from contacts"
	rows, err := c.db.SafeQuery(sqlStmt)
	if err != nil {
		return nil, err
	}

	defer rows.Close()
	for rows.Next() {
		contactInfo := &contactsStateInternal{}
		err = rows.Scan(&contactInfo.Id, &contactInfo.DID, &contactInfo.Name, &contactInfo.UserDID, &contactInfo.HasContacted, &contactInfo.Metadata, &contactInfo.Added)
		if err != nil {
			return nil, err
		}
		convertedContact := convertContactsStateInternal(contactInfo)
		contactsList = append(contactsList, convertedContact)
	}

	err = rows.Err()
	if err != nil {
		return nil, err
	}
	return contactsList, err
}

func (c *contactsState) FindContact(id int64) (*ContactState, error) {
	output := &contactsStateInternal{}
	sqlStmt := "select id, did, name, userDID, hasContacted, metadata, added from contacts where id = ?"
	rows, err := c.db.SafeQuery(sqlStmt, id)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	if !rows.Next() {
		if rows.Err() == nil {
			return nil, nil
		}
		// No error means there were just no results
		return nil, rows.Err()
	}

	err = rows.Scan(&output.Id, &output.DID, &output.Name, &output.UserDID, &output.HasContacted, &output.Metadata, &output.Added)
	if err != nil {
		return nil, err
	}
	return convertContactsStateInternal(output), nil
}

func (c *contactsState) DeleteContact(id int64) error {
	sqlStmt := "delete from contacts where id = ?"
	_, err := c.db.SafeExec(sqlStmt, id)
	if err != nil {
		return err
	}
	return nil
}
