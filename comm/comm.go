package comm

import (
	"crypto/ecdsa"
	"encoding/json"
	"errors"
	"sort"
	"strings"

	"github.com/hyperledger/aries-framework-go/pkg/doc/did"
	"github.com/imperviousai/imp-daemon/id"
	"github.com/imperviousai/imp-daemon/key"
	"github.com/imperviousai/imp-daemon/messages"
	"go.uber.org/zap"
)

//go:generate mockgen --destination=./mock/did_comm_mock.go --package=mock github.com/imperviousai/imp-daemon/comm DIDComm
//go:generate mockgen --destination=./mock/did_comm_transport_mock.go --package=mock github.com/imperviousai/imp-daemon/comm DIDCommTransport

type DIDCommTransportType int

const (
	DIDCommTransportHttp DIDCommTransportType = iota + 1
	DIDCommTransportLightning
	DIDCommTransportWebsocket
)

const (
	CallbackAssociateDIDType = "DID"
)

const SERVICE_ENDPOINT_DIDCOMM_MESSAGING_TYPE = "DIDCommMessaging"
const VERIFICATION_METHOD_JSON_WEBKEY_TYPE = "JsonWebKey2020"

type IncomingDIDMessage struct {
	Message  interface{}
	Callback *func(CallbackMessage) error
}

type CallbackMessage struct {
	Type    string
	Message interface{}
}

type CallbackAssociateDIDMessage struct {
	DID string
}

type DIDCommTransport interface {
	SendData(endpoint string, msgData *DIDCommMsg) error
	CheckMsg(endpoint string, msgData *DIDCommMsg) bool
}

type DIDComm interface {
	SendMsg(*DIDCommMsg, int64, []id.Service, *MessageSettings) (string, error)
	CheckSendMsg(*DIDCommMsg, int64, []id.Service, *MessageSettings) (bool, error)
	Stop() error
}

type didCommController struct {
	incomingDataChan  chan IncomingDIDMessage
	didCommTransports map[DIDCommTransportType]DIDCommTransport
	id                id.Identity
	messagesManager   messages.MessageManager
}

type DIDCommConfig struct {
	IncomingDataChan chan IncomingDIDMessage
	LightningManager DIDCommTransport
	HttpComm         DIDCommTransport
	WebsocketDIDComm DIDCommTransport
	Identity         id.Identity
	MessagesManager  messages.MessageManager
}

type MessageSettings struct {
	ProtocolPreferences []string
	SkipMessageSaving   bool
}

func NewDIDComm(config *DIDCommConfig) (DIDComm, error) {
	didCommController := &didCommController{
		id:                config.Identity,
		messagesManager:   config.MessagesManager,
		incomingDataChan:  config.IncomingDataChan,
		didCommTransports: make(map[DIDCommTransportType]DIDCommTransport),
	}

	if config.LightningManager != nil {
		didCommController.didCommTransports[DIDCommTransportLightning] = config.LightningManager
	}
	if config.HttpComm != nil {
		didCommController.didCommTransports[DIDCommTransportHttp] = config.HttpComm
	}
	if config.WebsocketDIDComm != nil {
		didCommController.didCommTransports[DIDCommTransportWebsocket] = config.WebsocketDIDComm
	}

	return didCommController, nil
}

func (d *didCommController) SendMsg(didCommEnvelope *DIDCommMsg, amt int64, additionalEndpoints []id.Service, settings *MessageSettings) (string, error) {
	// Have a DID from address, default to last user DID
	// TODO allow callers to set which from DID.
	_, longForm, err := d.id.GetLastUserDID()
	if err != nil {
		return "", err
	}
	// Always send long form, for now
	didCommEnvelope.From = longForm

	// Add amount too
	didCommEnvelope.AddAmountMetadata(amt)

	// Save the message first, then send individually to each party
	// if settings != nil && !settings.SkipMessageSaving {
	envelopeBytes, err := json.Marshal(didCommEnvelope)
	if err != nil {
		return "", err
	}

	if didCommEnvelope.Type != "https://impervious.ai/didcomm/relay-registration/1.0" {
		err = d.messagesManager.SaveMessage(&messages.MessageInfo{
			Id:         didCommEnvelope.ID,
			Type:       didCommEnvelope.Type,
			Recipients: append(didCommEnvelope.To, didCommEnvelope.From),
			Data:       envelopeBytes,
			// TODO move transport to message event
			// Transport:  transport,
		})
		if err != nil {
			zap.L().Error("Could not save message before sending",
				zap.Error(err),
			)
			return "", err
		}
	}

	// }

	err = d.sendMsgToRecipients(didCommEnvelope, amt, additionalEndpoints, settings)
	if err != nil {
		return "", err
	}
	return didCommEnvelope.ID, nil
}

func (d *didCommController) sendMsgToRecipients(didCommEnvelope *DIDCommMsg, amt int64, additionalEndpoints []id.Service, settings *MessageSettings) error {
	msgIds := make([]string, len(didCommEnvelope.To))
	for i, to := range didCommEnvelope.To {
		if settings != nil && !settings.SkipMessageSaving {
			err := d.messagesManager.SaveMessageEvent(&messages.MessageEvent{
				DID:       to,
				MessageId: didCommEnvelope.ID,
				Type:      "pending",
			})
			if err != nil {
				zap.L().Error("PENDING MSG BUT COULD NOT SAVE MSG EVENT, IGNORING ERROR....",
					zap.Error(err),
				)
			}
		}

		msgSentId, err := d.sendMsgToRecipient(didCommEnvelope, amt, additionalEndpoints, to, settings)
		if err != nil {
			if settings != nil && !settings.SkipMessageSaving {
				err = d.messagesManager.SaveMessageEvent(&messages.MessageEvent{
					DID:       to,
					MessageId: didCommEnvelope.ID,
					Type:      "failed",
				})
				if err != nil {
					zap.L().Error("FAILED MSG BUT COULD NOT SAVE MSG EVENT, IGNORING ERROR....",
						zap.Error(err),
					)
				}
			}
			zap.L().Error("Could not send message to recipient",
				zap.Error(err),
			)
			continue
		}
		msgIds[i] = msgSentId

		if settings != nil && !settings.SkipMessageSaving {
			err = d.messagesManager.SaveMessageEvent(&messages.MessageEvent{
				DID:       to,
				MessageId: didCommEnvelope.ID,
				Type:      "sent",
			})
			if err != nil {
				zap.L().Error("SENT MSG BUT COULD NOT SAVE MSG EVENT, IGNORING ERROR....",
					zap.Error(err),
				)
			}
		}
	}

	zap.L().Debug("Sent individual encrypted messages", zap.Strings("ids", msgIds))
	return nil
}

func (d *didCommController) sendMsgToRecipient(didCommEnvelope *DIDCommMsg, amt int64, additionalEndpoints []id.Service, to string, settings *MessageSettings) (string, error) {
	// Require TO to be a DID
	if !strings.HasPrefix(to, "did:") {
		// Normal pubkey LN message, no DIDComm wrapping
		return "", errors.New("Recipient must be a DID")
	}

	// prefer additional endpoints if passed in
	// Convert endpoints
	additionalDIDEndpoint := make([]did.Service, 0)
	for _, additionalEndpoint := range additionalEndpoints {
		additionalDIDEndpoint = append(additionalDIDEndpoint, did.Service{
			ServiceEndpoint: additionalEndpoint.ServiceEndpoint,
			Type:            additionalEndpoint.Type,
			ID:              additionalEndpoint.ID,
		})
	}
	recipientDIDCommEndpoints, err := ParseDIDEndpoints(additionalDIDEndpoint)
	if err != nil {
		return "", err
	}

	// Resolve the DID
	didDoc, _, err := d.id.ResolveDID(to)
	if err != nil {
		return "", err
	}

	// Get the endpoints for this DID
	didEndpoints, err := d.getDIDCommEndpoints(didDoc)
	if err != nil {
		return "", err
	}

	recipientDIDCommEndpoints = append(recipientDIDCommEndpoints, didEndpoints...)

	if len(recipientDIDCommEndpoints) == 0 {
		return "", errors.New("Could not resolve DIDCommMessaging endpoints")
	}

	// reorder didcomm endpoints by priority
	// has to happen after adding additional endpoints
	recipientDIDCommEndpoints = PriortizeEndpoints(recipientDIDCommEndpoints, amt, settings)

	// Try to go through all the LN DIDComm listed until one works
	// TODO correctly handle errors if in a group message
	// TODO stack up these messages to send in the for loop but send outside this for loop
	// TODO save transport back to message event detail?
	sentMsgId, _, err := d.sendMsgToEndpoints(didDoc, to, recipientDIDCommEndpoints, didCommEnvelope)
	if err != nil {
		return "", err
	}
	return sentMsgId, nil
}

func (d *didCommController) CheckSendMsg(didCommEnvelope *DIDCommMsg, amt int64, additionalEndpoints []id.Service, settings *MessageSettings) (bool, error) {
	// Keep sending messages to a single DID for now
	to := didCommEnvelope.To[0]

	// Require TO to be a DID
	if !strings.HasPrefix(to, "did:") {
		// Normal pubkey LN message, no DIDComm wrapping
		return false, errors.New("Recipient must be a DID")
	}

	return d.checkMsg(DIDCommTransportWebsocket, "", didCommEnvelope), nil
}

func (d *didCommController) sendMsgToEndpoints(didDoc *did.Doc, to string, didCommEndpoints []didCommEndpoint, didCommEnvelope *DIDCommMsg) (string, string, error) {
	if didCommEnvelope.THID == "" {
		didCommEnvelope.THID = didCommEnvelope.ID
	}

	// Sign then encrypt the message first.
	// Done here so recursive relay handling encrypts to them too.
	didCommEnvelopeBytes, err := json.Marshal(didCommEnvelope)
	if err != nil {
		return "", "", err
	}

	signedMsg, err := d.id.SignWithDID(didCommEnvelope.From, didCommEnvelopeBytes)
	if err != nil {
		zap.L().Error("Error signing the message",
			zap.Error(err),
			zap.String("from", didCommEnvelope.From),
		)
		return "", "", err
	}
	zap.L().Debug("Signed the message",
		zap.Any("SignedMsg", signedMsg),
		zap.Any("Envolope", didCommEnvelope),
		zap.Any("ToDID", didDoc),
	)

	encryptedMsg, err := d.encryptMessage(didDoc, didCommEnvelope, signedMsg)
	if err != nil {
		return "", "", err
	}
	zap.L().Debug("Encrypted the message",
		zap.Any("EncryptedMsg", encryptedMsg),
		zap.Any("Envolope", didCommEnvelope),
		zap.Any("ToDID", didDoc),
	)

	// before sending down the list of endpoints, see if it was received
	// via websocket. If so, attempt to send down the socketId already opened
	err = d.sendMsg(DIDCommTransportWebsocket, "", encryptedMsg)
	if err != nil {
		zap.L().Debug("[Messenger] sendMsg failed to send down existing websocket endpoint, trying all endpoints...",
			zap.String("socket_id", didCommEnvelope.GetWebsocketId()),
			zap.String("did", to),
			zap.Any("endpoints", didCommEndpoints),
			zap.Error(err),
		)
		// don't return error, need to attempt down all didcomm endpoints
	} else {
		return encryptedMsg.ID, "ws", nil
	}

	for _, recipientDIDCommEndpoint := range didCommEndpoints {
		// Iterate through potential LN nodes until success
		switch recipientDIDCommEndpoint.protocol {

		// DID relay
		case "did":
			relayDID := recipientDIDCommEndpoint.protocol + ":" + recipientDIDCommEndpoint.endpoint
			// never send relay message to a did that IS yourself, infinite loop
			userDIDs, err := d.id.GetUserDIDs()
			if err != nil {
				continue
			}
			relayIsSelf := false
			for _, userDID := range userDIDs {
				if relayDID == userDID.ID {
					relayIsSelf = true
					break
				}
			}

			if relayIsSelf {
				continue
			}

			zap.L().Debug("[Messenger] Sending to DIDComm Relay",
				zap.String("Relay", relayDID),
			)

			// Wrap the message into a relay message
			relayMsg := NewForwardMsg(encryptedMsg, didCommEnvelope.From, to, didCommEnvelope.Typ)
			relayMsg.To = []string{relayDID}
			// TODO how much?
			// Don't default to sending relay money, instead if sending LN, send money
			// relayMsg.AddAmountMetadata(10)

			// Pull in DID info for the new mediator
			// Resolve the DID
			mediatorDidDoc, _, err := d.id.ResolveDID(relayDID)
			if err != nil {
				return "", "", err
			}

			// Get the endpoints for this DID
			mediatorDIDCommEndpoints, err := d.getDIDCommEndpoints(mediatorDidDoc)
			if err != nil {
				return "", "", err
			}

			// Send to the mediator instead
			return d.sendMsgToEndpoints(mediatorDidDoc, relayDID, mediatorDIDCommEndpoints, relayMsg)

		// HTTP endpoints
		case "http":
			fallthrough
		case "https":
			err = d.sendMsg(DIDCommTransportHttp, recipientDIDCommEndpoint.protocol+":"+recipientDIDCommEndpoint.endpoint, encryptedMsg)
			if err != nil {
				zap.L().Error("[Messenger] sendMsg failed to send to HTTP endpoint, trying next...",
					zap.String("http", recipientDIDCommEndpoint.endpoint),
					zap.Error(err),
				)
				continue
			}
			return encryptedMsg.ID, "https", nil

		// websocket endpoints
		case "ws":
			fallthrough
		case "wss":
			err = d.sendMsg(DIDCommTransportWebsocket, recipientDIDCommEndpoint.protocol+":"+recipientDIDCommEndpoint.endpoint, encryptedMsg)
			if err != nil {
				zap.L().Error("[Messenger] sendMsg failed to send to websocket endpoint, trying next...",
					zap.String("ws", recipientDIDCommEndpoint.endpoint),
					zap.Error(err),
				)
				continue
			}
			return encryptedMsg.ID, "ws", nil

		// Lightning DIDComm Endpoint
		case "lightning":
			// if sending lightning and amount is not filled in at all, fail
			// this is intention so that funds are not moved without explicit requests
			// this should change when network prioritize are available in the API
			if encryptedMsg.GetAmountMetadata() == 0 {
				zap.L().Error("[Messenger] ignoring lightning didcomm since amount is 0, trying next...",
					zap.String("to_pubkey", recipientDIDCommEndpoint.endpoint),
					zap.Error(err),
				)
				continue
			}

			err := d.sendMsg(DIDCommTransportLightning, recipientDIDCommEndpoint.endpoint, encryptedMsg)
			if err != nil {
				zap.L().Error("[Messenger] sendMsg failed to send to LN node, trying next...",
					zap.String("to_pubkey", recipientDIDCommEndpoint.endpoint),
					zap.Error(err),
				)
				continue
			}
			return encryptedMsg.ID, "lightning", nil

		}
	}

	return "", "", errors.New("Could not send to any endpoints")
}

func (d *didCommController) encryptMessage(didDoc *did.Doc, msg *DIDCommMsg, signedMsg string) (*DIDCommMsg, error) {
	// Get encryption keys from the recipient did, only look through key agreement
	keys, err := ParseDIDEncryptionKeys(didDoc.KeyAgreement)
	if err != nil {
		return nil, err
	}
	if len(keys) == 0 {
		return nil, errors.New("Cannot encrypt to recipient, no supported key agreement keys")
	}

	// Just using first one found, no reason for any other yet
	encryptedString, err := key.EncryptToEllipticPubkey(&keys[0], []byte(signedMsg))
	if err != nil {
		return nil, err
	}

	// Parse encryptedd string to DIDComm encrypted message
	var encryptedMsg EncryptedMsg
	err = json.Unmarshal([]byte(encryptedString), &encryptedMsg)
	if err != nil {
		return nil, err
	}

	// The wrapped encrypted message
	encryptedDIDCommMsg := NewEncryptedMsg(&encryptedMsg, msg.From, msg.To[0])

	// Add the internal msg metadata back into the encrypted msg
	// TODO have this happen to all metadata, not hardcoded ones
	encryptedDIDCommMsg.AddAmountMetadata(msg.GetAmountMetadata())
	encryptedDIDCommMsg.AddWebsocketId(msg.GetWebsocketId())

	return encryptedDIDCommMsg, nil
}

func (d *didCommController) checkMsg(transport DIDCommTransportType, endpoint string, msg *DIDCommMsg) bool {
	return d.didCommTransports[transport].CheckMsg(endpoint, msg)
}

func (d *didCommController) sendMsg(transport DIDCommTransportType, endpoint string, msg *DIDCommMsg) error {
	err := d.didCommTransports[transport].SendData(endpoint, msg)
	if err != nil {
		zap.L().Error("[Messenger] sendMsg failed", zap.String("error", err.Error()))
		return err
	}

	zap.L().Debug("[Messenger] sendMsg successful",
		zap.String("message_id", msg.ID),
	)
	return nil
}

type didCommEndpoint struct {
	protocol string
	endpoint string
}

func (d *didCommController) getDIDCommEndpoints(didDoc *did.Doc) ([]didCommEndpoint, error) {
	// Check if it has a messaging service
	didCommEndpoints, err := ParseDIDEndpoints(didDoc.Service)
	if err != nil {
		return nil, err
	}

	return didCommEndpoints, nil
}

func (d *didCommController) Stop() error {
	if d.didCommTransports == nil {
		return nil
	}
	if v := d.didCommTransports[DIDCommTransportHttp]; v != nil {
		httpComunication, ok := v.(*httpComm)
		if ok {
			err := httpComunication.Stop()
			if err != nil {
				zap.L().Error(err.Error())
			}
		}
	}
	if v := d.didCommTransports[DIDCommTransportWebsocket]; v != nil {
		websocketComunication, ok := v.(*websocketComm)
		if ok {
			err := websocketComunication.Stop()
			if err != nil {
				zap.L().Error(err.Error())
			}
		}
	}

	return nil
}

func ParseDIDEndpoints(endpoints []did.Service) ([]didCommEndpoint, error) {
	didCommEndpoints := make([]didCommEndpoint, 0)
	for _, service := range endpoints {
		zap.L().Debug("Checking did doc service",
			zap.Any("service", service),
		)
		if strings.EqualFold(service.Type, SERVICE_ENDPOINT_DIDCOMM_MESSAGING_TYPE) {
			// TODO Handle if service endpoint is a redirect (ie did:something:123#LNPubkey)
			lnServiceEndpoint := strings.Split(service.ServiceEndpoint, ":")
			if len(lnServiceEndpoint) < 2 {
				zap.L().Debug("service endpoint not 2")
				continue
			}
			// concat all strings after the first
			prefix := lnServiceEndpoint[0]
			endpoint := lnServiceEndpoint[1]
			for i := 2; i < len(lnServiceEndpoint); i++ {
				endpoint = endpoint + ":" + lnServiceEndpoint[i]
			}

			zap.L().Debug("adding didcomm endpoint", zap.String("endpoint", endpoint))
			didCommEndpoints = append(didCommEndpoints, didCommEndpoint{
				protocol: prefix,
				endpoint: endpoint,
			})
		}
	}

	return didCommEndpoints, nil
}

// PriortizeEndpoints will reorder all of the endpoints to prioritize
// different types.
// Current order is WS, HTTP, LN.
// Different logic can be applied in the future.
func PriortizeEndpoints(endpoints []didCommEndpoint, amt int64, settings *MessageSettings) []didCommEndpoint {
	// basic preferences if no settings passed in
	if settings == nil || len(settings.ProtocolPreferences) == 0 {
		sort.Slice(endpoints, func(i, j int) bool {
			// prioritize lightning if an amount is filled in at all
			if amt != 0 {
				if endpoints[i].protocol == "lightning" {
					return true
				}
			}

			// since websocket is pri, move 'i' to front if 'j' is not already in front
			if (endpoints[i].protocol == "ws" || endpoints[i].protocol == "wss") && endpoints[j].protocol != "ws" && endpoints[j].protocol != "wss" {
				return true
			}

			// TODO do pri on others, for now just care about websocket being pri
			return false
		})
		return endpoints
	} else {
		newEndpoints := make([]didCommEndpoint, 0)
		// Remove the protocols that are not in settings
		for _, endpoint := range endpoints {
			for _, protocol := range settings.ProtocolPreferences {
				if endpoint.protocol == protocol {
					newEndpoints = append(newEndpoints, endpoint)
					break
				}
			}
		}

		// Sort the rest of the protocols by order in settings
		sort.Slice(newEndpoints, func(i, j int) bool {
			// find the preference for i, then the preference for j
			// if i is less than j, then return true to bump up priority list
			iPref := 100 // an arbitrary high number in case not found
			jPref := 100
			for pref, protocol := range settings.ProtocolPreferences {
				if endpoints[i].protocol == protocol {
					iPref = pref
				}
				if endpoints[j].protocol == protocol {
					jPref = pref
				}
			}
			return iPref < jPref
		})

		return newEndpoints
	}
}

// ParseDIDEncryptionKeys will parse a DID Document's verification keys and
// look for keys that we support for encrypting to. Right now that's just
// P-384 elliptic keys.
func ParseDIDEncryptionKeys(vms []did.Verification) ([]ecdsa.PublicKey, error) {
	keyAgreementKeys := make([]ecdsa.PublicKey, 0)
	for _, vm := range vms {
		// Looking for type of JsonWebKey2020
		if vm.VerificationMethod.Type != VERIFICATION_METHOD_JSON_WEBKEY_TYPE {
			continue
		}
		publicKeyJwk := vm.VerificationMethod.JSONWebKey()
		if publicKeyJwk == nil {
			continue
		}

		publicKey, err := key.JWKToElliptic(publicKeyJwk)
		if err != nil {
			continue
		}
		keyAgreementKeys = append(keyAgreementKeys, *publicKey)
	}

	return keyAgreementKeys, nil
}

func ParseCallbackAssociateDIDTypeMessage(message CallbackMessage) (*CallbackAssociateDIDMessage, error) {
	parsedMsg, ok := message.Message.(CallbackAssociateDIDMessage)
	if !ok {
		return nil, errors.New("Could not parse CallbackAssociateDid message")
	}

	return &parsedMsg, nil
}
