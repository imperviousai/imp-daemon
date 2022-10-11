package core

import (
	"github.com/hyperledger/aries-framework-go/pkg/doc/did"
	"github.com/imperviousai/imp-daemon/auth"
	auth_state "github.com/imperviousai/imp-daemon/auth/state"
	"github.com/imperviousai/imp-daemon/comm"
	"github.com/imperviousai/imp-daemon/config"
	"github.com/imperviousai/imp-daemon/contacts"
	"github.com/imperviousai/imp-daemon/id"
	"github.com/imperviousai/imp-daemon/key"
	"github.com/imperviousai/imp-daemon/kv"
	"github.com/imperviousai/imp-daemon/lightning"
	"github.com/imperviousai/imp-daemon/messages"
	"github.com/imperviousai/imp-daemon/service"
	"github.com/imperviousai/imp-daemon/service/relay"
	"github.com/imperviousai/imp-daemon/state"
	"go.uber.org/zap"
)

//go:generate mockgen --destination=./mock/core_mock.go --package=mock github.com/imperviousai/imp-daemon/core Core

type Core interface {
	// Start will start the IMP core
	Start() error

	// Stop will stop the IMP core
	Stop() error

	//
	// KV commands
	//

	// GetKey gets a value
	GetKey(key string) (string, error)

	// SetKey sets a key with a value
	SetKey(key string, value string) error

	// DelKey deletes a key
	DelKey(key string) error

	//
	// Message Commands
	//

	// GetMessages gets all of the saved messages
	GetMessages() ([]*messages.MessageInfo, error)

	// DeleteMessage deletes a saved message
	DeleteMessage(string, string) error

	// SendMessage is an extension of KeySend for sending data to dest pub key.
	SendMessage(message string, toDid string, amt int64, replyToId string) (string, error)

	// SendMessageV2 will send a DIDComm formatted message to another DID.
	SendMessageV2(body string, didCommType string, dids []string, amt int64, replyToId string, groupId string, settings *comm.MessageSettings) (string, error)

	// SavveMessage will save a message to the database
	SaveMessage(body string, didCommType string, dids []string, from string, replyToId string, groupId string) (string, error)

	//
	// Lightning Commands
	//

	// SignMessage will sign a message with a lightning node.
	SignMessage([]byte) ([]byte, error)

	// GenerateInvoice will generate an invoice for a specific amount
	// and memo. Returns the pay request.
	GenerateInvoice(int64, string) (string, error)

	// PayInvoice will pay a specific pay request invoice and returns preimage.
	PayInvoice(string) (string, error)

	// CheckInvoice will check a specific pay request invoice and returns true or false.
	CheckInvoice(string) (bool, error)

	//
	// ID Commands
	//

	// ResolveDID resolves a DID URI and returns back a DID Document and long form did
	ResolveDID(did string) (*did.Doc, string, error)

	// ListDID lists DID documents stored locally
	ListDID() ([]*did.Doc, error)

	// CreateDID will create a DID with the given info and save to DB
	CreateDID(didType string, serviceEndpoints []id.Service) (*id.DIDUpdateInfo, error)

	// DeleteDID will delete a DID with a given id
	DeleteDID(did string) error

	// BackupDID returns the DID backup information
	BackupDID(did string) (*id.DIDUpdateInfo, error)

	// RecoverDID recovers a DID with the recovery kit
	RecoverDID(*id.DIDUpdateInfo, string, string) error

	// ImportDID will import a DID belonging to the user
	ImportDID(document, longFormDID string) error

	// UpdateDID will update a DID with a patch document
	UpdateDID(document string) (*id.DIDUpdateInfo, error)

	//
	// Relay Commands
	//

	// SendRegistrationRequest will send a registration request to a relay node
	SendRegistrationRequest(toDID string, amt int64, data *relay.RelayRegistrationRequestData) (string, error)

	// SendMailboxRequest will send a mailbox request to a relay node
	SendMailboxRequest(toDID string, amt int64, data *relay.RelayMailboxRequestData) (string, error)

	//
	// KeyManager Commands
	//

	// InitSeed will initialize the key manager with a master seed and initial api key
	InitSeed(seedImport string, passphrase string) (string, string, error)

	// UnlockSeed will unlock the key manager with the master seed encryption passphrase
	UnlockSeed(passphrase string) (string, error)

	// GetSeed will get the mnemonic seed phrase
	GetSeed() (string, error)

	Status() (string, error)

	//
	// Contacts Commands
	//

	contacts.Contacts

	/*type Contacts interface {
		GetContacts() ([]*ContactInfo, error)
		GetContact(id int64) (*ContactInfo, error)
		CreateContact(*ContactInfo) (*ContactInfo, error)
		UpdateContact(*ContactUpdate) (*ContactInfo, error)
		DeleteContact(int64) error
	}*/

	CreateContacts([]*contacts.ContactInfo) ([]*contacts.ContactInfo, error)

	//
	// Config Commands
	//

	// Get a lightning node from the daemon config
	GetLightningNodeConfig() (config.Lnd, error)

	// Save a lightning node to the daemon config
	SaveLightningNodeConfig(node config.Lnd) error

	// Get a ion node from the daemon config
	GetIONConfig() (config.ION, error)

	// Save an ION node to the daemon config
	SaveIONConfig(ionNode config.ION) error

	//
	// Auth Commands
	//

	// GenerateNewKey generates a new API key
	GenerateNewKey(name, description string) (*auth_state.AuthStateModel, error)

	// ListKeys will list API keys
	ListKeys() ([]*auth_state.AuthStateModel, error)

	// UpdateKey will update the name or description of a key
	UpdateKey(id int64, name, description string) error

	// DeleteKey will delete an api key
	DeleteKey(id int64) error
}

type core struct {
	auth             auth.AuthService
	serviceHandler   service.Handler
	lightningManager lightning.LightningManager
	id               id.Identity
	keyManager       key.KeyManager
	dbManager        state.DBManager
	contactsManager  contacts.Contacts
	messageManager   messages.MessageManager
	didComm          comm.DIDComm
	globalConfig     config.GlobalConfig
	kvManager        kv.KvManager
}

type Config struct {
	Auth             auth.AuthService
	ServiceHandler   service.Handler
	LightningManager lightning.LightningManager
	Id               id.Identity
	KeyManager       key.KeyManager
	DBManager        state.DBManager
	ContactsManager  contacts.Contacts
	MessageManager   messages.MessageManager
	DIDComm          comm.DIDComm
	GlobalConfig     config.GlobalConfig
	KvManager        kv.KvManager
}

func NewImpCore(cfg *Config) (Core, error) {
	core := &core{
		auth:             cfg.Auth,
		serviceHandler:   cfg.ServiceHandler,
		lightningManager: cfg.LightningManager,
		id:               cfg.Id,
		keyManager:       cfg.KeyManager,
		dbManager:        cfg.DBManager,
		contactsManager:  cfg.ContactsManager,
		messageManager:   cfg.MessageManager,
		didComm:          cfg.DIDComm,
		globalConfig:     cfg.GlobalConfig,
		kvManager:        cfg.KvManager,
	}

	return core, nil
}

// Start will start the IMP core
func (c *core) Start() error {
	zap.L().Info("[Core] Starting")

	// Start services
	zap.L().Debug("[Core] Starting service handler")
	if err := c.serviceHandler.Start(); err != nil {
		zap.L().Error("[Core] Service handler failed to start", zap.String("error", err.Error()))
		return err
	}
	zap.L().Debug("[Core] Service handler started")

	// Start subscribing to lightning events
	zap.L().Debug("[Core] Starting lightning manager subscription")
	if err := c.lightningManager.Subscribe(); err != nil {
		zap.L().Error("[Core] Lightning manager subscription failed to start", zap.String("error", err.Error()))
		return err
	}
	zap.L().Debug("[Core] Lightning manager subscription successful")

	zap.L().Info("[Core] Started successfully")
	return nil
}

// Stop will stop the IMP core
func (c *core) Stop() error {
	zap.L().Info("[Core] Stopping")

	// Stop services
	zap.L().Debug("[Core] Stopping service handler")
	if err := c.serviceHandler.Stop(); err != nil {
		zap.L().Error("[Core] Service handler failed to stop", zap.String("error", err.Error()))
		return err
	}
	zap.L().Debug("[Core] service handler stopped")

	// Stop DIDComm
	if c.didComm != nil {
		zap.L().Debug("[Core] Stopping DIDComm")
		if err := c.didComm.Stop(); err != nil {
			zap.L().Error("[Core] DIDComm failed to stop", zap.String("error", err.Error()))
		}
		zap.L().Debug("[Core] DIDComm stoppped")
	}

	// Stop lightning
	zap.L().Debug("[Core] Stopping lightning manager")
	c.lightningManager.Stop()
	zap.L().Debug("[Core] Lightning manager stoppped")

	zap.L().Info("[Core] Stopped successfully")
	return nil
}
