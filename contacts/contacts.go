package contacts

import (
	"encoding/json"
	"errors"
	"time"

	contacts_state "github.com/imperviousai/imp-daemon/contacts/state"
	"github.com/imperviousai/imp-daemon/id"
	"github.com/imperviousai/imp-daemon/state"
	"go.uber.org/zap"
)

//go:generate mockgen --destination=./mock/contacts_mock.go --package=mock github.com/imperviousai/imp-daemon/contacts Contacts

type Contacts interface {
	GetContacts() ([]*ContactInfo, error)
	GetContact(id int64) (*ContactInfo, error)
	CreateContact(*ContactInfo) (*ContactInfo, error)
	UpdateContact(*ContactUpdate) (*ContactInfo, error)
	DeleteContact(int64) error
}

type contactManager struct {
	state           contacts_state.ContactsState
	identityManager id.Identity
}

type Config struct {
	Db        state.DBManager
	IdManager id.Identity
}

func New(cfg *Config) (Contacts, error) {
	// Init the identity state database first
	state, err := contacts_state.InitContactState(cfg.Db)
	if err != nil {
		return nil, err
	}

	return &contactManager{
		state:           state,
		identityManager: cfg.IdManager,
	}, nil
}

type ContactInfo struct {
	Id           int64     `json:"id"`
	DID          string    `json:"did"`
	DIDDocument  string    `json:"didDocument"`
	Name         string    `json:"name"`
	UserDID      string    `json:"userDID"`
	HasContacted bool      `json:"hasContacted"`
	Metadata     string    `json:"metadata"`
	Added        time.Time `json:"added"`
}

type ContactUpdate struct {
	Id       int64  `json:"id"`
	DID      string `json:"did"`
	Name     string `json:"name"`
	Metadata string `json:"metadata"`
}

func (c *contactManager) GetContacts() ([]*ContactInfo, error) {
	// resolve all of the DIDs here
	foundContacts, err := c.state.ListContacts()
	if err != nil {
		return nil, err
	}

	for i, foundContact := range foundContacts {
		// resolve DID to get back latest doc state of contact
		resolvedDoc, _, err := c.identityManager.ResolveDID(foundContact.DID)
		if err != nil {
			return nil, err
		}
		bytes, err := json.Marshal(resolvedDoc)
		if err != nil {
			return nil, err
		}
		foundContact.DIDDocument = string(bytes)
		foundContacts[i] = foundContact
	}

	return transformContactStateSliceToContactInfoSlice(foundContacts), nil
}

func (c *contactManager) GetContact(id int64) (*ContactInfo, error) {
	foundContact, err := c.state.FindContact(id)
	if err != nil {
		return nil, err
	}
	if foundContact == nil {
		return nil, nil
	}

	// resolve DID to get back latest doc state of contact
	resolvedDoc, _, err := c.identityManager.ResolveDID(foundContact.DID)
	if err != nil {
		return nil, err
	}
	bytes, err := json.Marshal(resolvedDoc)
	if err != nil {
		return nil, err
	}
	foundContact.DIDDocument = string(bytes)

	return transformContactStateToContactInfo(foundContact), nil
}

func (c *contactManager) CreateContact(contactToAdd *ContactInfo) (*ContactInfo, error) {
	zap.L().Debug("Creating contact", zap.Any("contact", contactToAdd))
	// Check if this DID is saved, if not save it first
	// ignore errors because it's fine if we don't resolve this DID
	preexistingDIDDocument, _, _ := c.identityManager.ResolveDID(contactToAdd.DID)
	if preexistingDIDDocument == nil {
		// Add the DID document to the ID store first
		if contactToAdd.DIDDocument == "" {
			return nil, errors.New("DID Document has not been added to storage and is not present in this contact")
		}
		err := c.identityManager.ImportDID(contactToAdd.DIDDocument, contactToAdd.DID)
		if err != nil {
			return nil, err
		}
	} else {
		// Replace DID with resolved document ID in case it was long form
		contactToAdd.DID = preexistingDIDDocument.ID
	}

	// If userDID not specified, then get the last one used
	if contactToAdd.UserDID == "" {
		lastUserDID, _, err := c.identityManager.GetLastUserDID()
		if err != nil {
			return nil, err
		}
		contactToAdd.UserDID = lastUserDID.ID
	}

	// only save DID url without parameters
	// contactToAdd.DID = strings.Split(contactToAdd.DID, "?")[0]
	zap.L().Debug("About to save contact", zap.Any("contactToAdd", contactToAdd))
	id, err := c.state.SaveContact(transformContactInfoToContactState(contactToAdd))
	if err != nil {
		return nil, err
	}
	// return the object back with the ID inserted
	contactToAdd.Id = id

	// add the resolved DID document in if it wasn't created already
	if preexistingDIDDocument != nil {
		bytes, err := json.Marshal(preexistingDIDDocument)
		if err != nil {
			return nil, err
		}
		contactToAdd.DIDDocument = string(bytes)
	}

	return contactToAdd, nil
}

func (c *contactManager) UpdateContact(contactToUpdate *ContactUpdate) (*ContactInfo, error) {
	// make sure ID exists
	if contactToUpdate.Id == 0 {
		return nil, errors.New("Cannot update contact without an ID")
	}

	err := c.state.UpdateContact(transformContactUpdateToContactState(contactToUpdate))
	if err != nil {
		return nil, err
	}

	// Get the latest state with the new updates
	return c.GetContact(contactToUpdate.Id)
}

func (c *contactManager) DeleteContact(id int64) error {
	// first check to see if contact exists at all
	contact, err := c.GetContact(id)
	if err != nil {
		return err
	}
	if contact == nil {
		return errors.New("Contact does not exist")
	}

	return c.state.DeleteContact(id)
}

func transformContactStateToContactInfo(contactsState *contacts_state.ContactState) *ContactInfo {
	conv := ContactInfo(*contactsState)
	return &conv
}

func transformContactStateSliceToContactInfoSlice(contactsStates []*contacts_state.ContactState) []*ContactInfo {
	contactInfos := make([]*ContactInfo, 0, len(contactsStates))
	for _, contactsState := range contactsStates {
		conv := ContactInfo(*contactsState)
		contactInfos = append(contactInfos, &conv)
	}
	return contactInfos
}

func transformContactInfoToContactState(contactsInfo *ContactInfo) *contacts_state.ContactState {
	conv := contacts_state.ContactState(*contactsInfo)
	return &conv
}

func transformContactUpdateToContactState(contactsUpdate *ContactUpdate) *contacts_state.ContactState {
	return &contacts_state.ContactState{
		Id:       contactsUpdate.Id,
		Name:     contactsUpdate.Name,
		DID:      contactsUpdate.DID,
		Metadata: contactsUpdate.Metadata,
	}
}
