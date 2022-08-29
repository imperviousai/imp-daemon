package core

import (
	"errors"
	"strings"

	"github.com/hyperledger/aries-framework-go/pkg/doc/did"
	"github.com/imperviousai/freeimp/id"
	"go.uber.org/zap"
)

func (c *core) ResolveDID(did string) (*did.Doc, string, error) {
	return c.id.ResolveDID(did)
}

func (c *core) ListDID() ([]*did.Doc, error) {
	return c.id.ListDIDs()
}

func (c *core) CreateDID(didType string, serviceEndpoints []id.Service) (*id.DIDUpdateInfo, error) {
	return c.id.CreateDID(didType, serviceEndpoints)
}

func (c *core) DeleteDID(did string) error {
	return c.id.DeleteDID(did)
}

func (c *core) ImportDID(document, longFormDID string) error {
	return c.id.ImportDID(document, longFormDID)
}

func (c *core) UpdateDID(document string) (*id.DIDUpdateInfo, error) {
	// first update the DID document

	didUpdateInfo, err := c.id.UpdateDID(document)
	if err != nil {
		return nil, err
	}

	if !strings.HasPrefix(didUpdateInfo.LongFormDID, "did:peer:") {
		return didUpdateInfo, nil
	}

	// now send updates to each contact if using peer DIDs
	// do not fail here though, since update actions took place
	// this is a best effort P2P based update to contacts
	// could be better, but alternatively, updates can always be sent later
	contacts, err := c.contactsManager.GetContacts()
	if err != nil {
		zap.L().Error("[Core] could not get contacts to send updates to", zap.Error(err))
		return didUpdateInfo, nil
	}

	for _, contact := range contacts {
		// TODO standardize an update did message, for now empty ping
		_, err := c.SendMessageV2("{}", "https://didcomm.org/trust-ping/2.0/ping", []string{contact.DID}, 10, "", "", nil)
		if err != nil {
			zap.L().Error("[Core] could not send update message to contact", zap.Error(err))
		}
	}

	return didUpdateInfo, nil
}

func (c *core) BackupDID(did string) (*id.DIDUpdateInfo, error) {
	return c.id.BackupDID(did)
}

func (c *core) RecoverDID(recoveryKit *id.DIDUpdateInfo, seed string, passphrase string) error {
	// check if seed is already initialized
	status, err := c.Status()
	if err != nil {
		return err
	}

	switch status {
	case "READY":
		// already initialized, run the recovery
		return c.id.RecoverDID(recoveryKit)

	case "NOT_INITIALIZED":
		// need to use seed + passphrase first
		if seed == "" || passphrase == "" {
			return errors.New("DB not initialized and passphrase/seed not passed in")
		}
		_, _, err := c.InitSeed(seed, passphrase)
		if err != nil {
			return err
		}

		// now that the seed is initialized, recover the DID
		return c.id.RecoverDID(recoveryKit)

	case "LOCKED":
		return errors.New("Database needs to be unlocked first")

	default:
		return errors.New("unknown state of database")
	}
}
