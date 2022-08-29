package relay

import (
	"encoding/json"
	"errors"
	"strings"

	"github.com/imperviousai/freeimp/comm"
	"github.com/imperviousai/freeimp/id"
	relay_state "github.com/imperviousai/freeimp/service/relay/state"
	"github.com/imperviousai/freeimp/service/service"
	"github.com/imperviousai/freeimp/state"
	"go.uber.org/zap"
)

//go:generate mockgen --destination=./mock/relay_registration_mock.go --package=mock github.com/imperviousai/freeimp/service/relay RelayRegistrationService

const RELAY_REGISTRATION_DID_TYPE = "https://impervious.ai/didcomm/relay-registration/1.0"
const RELAY_REGISTRATION_REQUEST_TYPE = "registration"
const RELAY_MAILBOX_REQUEST_TYPE = "mailbox"

type RelayRegistrationService interface {
	service.Service

	// SendRegistrationRequest reqeusts a relay node to delegate them as a relay
	SendRegistrationRequest(toDID string, amt int64, data *RelayRegistrationRequestData) (string, error)
	// SendMailboxRequest requests a relay node to send stored messages to them now
	SendMailboxRequest(toDID string, amt int64, data *RelayMailboxRequestData) (string, error)
}

type relayRegistrationService struct {
	didComm comm.DIDComm
	state   relay_state.RelayState
}

type RegistrationConfig struct {
	DidComm comm.DIDComm
	Db      state.DBManager
}

type RelayRegistrationBody struct {
	Type string      `json:"type"`
	Data interface{} `json:"data"`
}

type RelayRegistrationRequestData struct {
	PrivateServiceEndpoints []id.Service `json:"privateServiceEndpoints"`
}

type RelayMailboxRequestData struct {
	PrivateServiceEndpoints []id.Service `json:"privateServiceEndpoints"`
}

func NewRelayRegistrationService(cfg RegistrationConfig) (RelayRegistrationService, error) {
	// Init the relay state database first
	state, err := relay_state.InitRelayState(cfg.Db)
	if err != nil {
		return nil, err
	}

	s := &relayRegistrationService{
		didComm: cfg.DidComm,
		state:   state,
	}

	return s, nil
}

func (v *relayRegistrationService) Active() bool {
	// TODO handle this appropriately or remove
	return true
}

func (v *relayRegistrationService) Type() string {
	return "relay-registration"
}

func (v *relayRegistrationService) HandleData(msg *comm.DIDCommMsg) error {
	messageBody := &RelayRegistrationBody{}
	bodyBytes, err := json.Marshal(msg.Body)
	if err != nil {
		return err
	}
	err = json.Unmarshal(bodyBytes, messageBody)
	if err != nil {
		return err
	}

	zap.L().Debug("[RELAY-REGISTRATION] relay message received", zap.ByteString("message", bodyBytes))

	// Handle the type of relay registration request
	switch messageBody.Type {

	// A client requested this node to relay/store messages to them
	case RELAY_REGISTRATION_REQUEST_TYPE:

		// parse data
		requestData := &RelayRegistrationRequestData{}
		requestDataBytes, err := json.Marshal(messageBody.Data)
		if err != nil {
			return err
		}
		err = json.Unmarshal(requestDataBytes, requestData)
		if err != nil {
			return err
		}

		// handle data
		return v.HandleRegistrationRequest(msg, requestData)

	// A client requested this node to send their mailbox to them
	case RELAY_MAILBOX_REQUEST_TYPE:

		// parse data
		requestData := &RelayMailboxRequestData{}
		requestDataBytes, err := json.Marshal(messageBody.Data)
		if err != nil {
			return err
		}
		err = json.Unmarshal(requestDataBytes, requestData)
		if err != nil {
			return err
		}

		// handle data
		return v.HandleMailboxRequest(msg, requestData)

	default:
		return errors.New("cannot handle relay registration message type")
	}
}

func (v *relayRegistrationService) HandleRegistrationRequest(msg *comm.DIDCommMsg, data *RelayRegistrationRequestData) error {
	zap.L().Debug("[RELAY-REGISTRATION] relay registration request received",
		zap.String("did", msg.From),
	)

	// First add the DID to the registration table
	shorthandDID := strings.Split(msg.From, "?")[0]
	err := v.state.AddRelayRegistration(shorthandDID)
	if err != nil {
		return err
	}

	// Then add the service endpoints that the DID has registered
	for _, serviceEndpoint := range data.PrivateServiceEndpoints {
		err := v.state.AddRelayEndpoint(shorthandDID,
			serviceEndpoint.ServiceEndpoint,
			serviceEndpoint.Type,
			serviceEndpoint.ID,
		)
		if err != nil {
			return err
		}
	}

	return nil
}

func (v *relayRegistrationService) HandleMailboxRequest(msg *comm.DIDCommMsg, data *RelayMailboxRequestData) error {
	zap.L().Debug("[RELAY-REGISTRATION] relay mailbox request received")

	// Check to see if this DID has registered before
	shorthandDID := strings.Split(msg.From, "?")[0]
	registered, err := v.state.GetRelayRegistration(shorthandDID)
	if err != nil {
		return err
	}
	if !registered {
		zap.L().Error("[RELAY-REGISTRATION] DID not registered to receive mailbox messages",
			zap.String("did", shorthandDID),
		)
		return errors.New("DID not registered to receive mailbox messages")
	}

	// Get the messages that have been stored
	messages, err := v.state.GetRelayMessages(shorthandDID)
	if err != nil {
		return err
	}

	if len(messages) == 0 {
		zap.L().Debug("[RELAY-REGISTRATION] no relay messages stored for this did",
			zap.String("did", shorthandDID),
		)
		return nil
	}

	// TODO send bulk message type
	for _, mailboxMessage := range messages {
		// Forward attachment to the node that asked, destinated to same node
		attachmentMsg := comm.DIDCommMsg{}
		err = json.Unmarshal([]byte(mailboxMessage.Message), &attachmentMsg)
		if err != nil {
			zap.L().Debug("[RELAY-REGISTRATION] not a valid attachment message to relay",
				zap.String("did", shorthandDID),
				zap.String("message", mailboxMessage.Message),
			)
		}

		forwardMsg := comm.NewForwardMsg(attachmentMsg, "", msg.From, comm.ENCRYPTED_MSG_TYP) // TODO what if it's a different type? non-encrypted?
		forwardMsg.To = []string{msg.From}                                                    // keep as long form to send properly

		// Send parsed forward message
		// add socket information from the requester, if present
		// TODO figure out how to make that be the case always
		if msg.GetWebsocketId() != "" {
			forwardMsg.AddWebsocketId(msg.GetWebsocketId())
		}
		// amount is 0, never send relay messages through LN for now
		// TODO message preferences
		msgId, err := v.didComm.SendMsg(forwardMsg, 0, data.PrivateServiceEndpoints, nil)
		if err != nil {
			zap.L().Error("[RELAY-REGISTRATION] Error relaying message",
				zap.String("did", shorthandDID),
				zap.String("err", err.Error()),
			)
			return err
		}
		zap.L().Debug("[RELAY-REGISTRATION] Relayed message",
			zap.String("did", shorthandDID),
			zap.String("messageId", msgId),
		)
		// Now delete the relayed message so we do not relay it again
		err = v.state.DeleteRelayMessage(mailboxMessage.Id)
		if err != nil {
			// do not return an error, just log and continue
			zap.L().Error("[RELAY-REGISTRATION] Error deleting relayed message",
				zap.String("err", err.Error()),
				zap.String("did", shorthandDID),
			)
		}
	}

	return nil
}

func (v *relayRegistrationService) SendRegistrationRequest(toDID string, amt int64, data *RelayRegistrationRequestData) (string, error) {
	msg := comm.NewDIDCommMsg()
	msg.Type = RELAY_REGISTRATION_DID_TYPE
	msg.To = []string{toDID}
	msg.Body = &RelayRegistrationBody{
		Type: RELAY_REGISTRATION_REQUEST_TYPE,
		Data: data,
	}

	// TODO message preferences
	msgId, err := v.didComm.SendMsg(msg, amt, nil, nil)
	if err != nil {
		return "", err
	}
	// Relay registrations should just be one message ID sent
	return msgId, nil
}

func (v *relayRegistrationService) SendMailboxRequest(toDID string, amt int64, data *RelayMailboxRequestData) (string, error) {
	msg := comm.NewDIDCommMsg()
	msg.Type = RELAY_REGISTRATION_DID_TYPE
	msg.To = []string{toDID}
	msg.Body = &RelayRegistrationBody{
		Type: RELAY_MAILBOX_REQUEST_TYPE,
		Data: data,
	}

	// TODO message preferences
	msgId, err := v.didComm.SendMsg(msg, amt, nil, nil)
	if err != nil {
		return "", err
	}
	// Relay registrations should just be one message ID sent
	return msgId, nil
}

func (v *relayRegistrationService) Shutdown() error {
	return nil
}
