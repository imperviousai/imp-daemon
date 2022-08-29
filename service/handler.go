package service

import (
	"encoding/json"
	"errors"
	"strings"
	"sync"

	"github.com/imperviousai/imp-daemon/comm"
	"github.com/imperviousai/imp-daemon/id"
	"github.com/imperviousai/imp-daemon/key"
	"github.com/imperviousai/imp-daemon/messages"
	"github.com/imperviousai/imp-daemon/service/service"
	"go.uber.org/zap"
	"gopkg.in/square/go-jose.v2"
)

//go:generate mockgen --destination=./mock/handler_mock.go --package=mock github.com/imperviousai/imp-daemon/service Handler

// Handler will handle messages meant for specific services.
type Handler interface {
	// RegisterService will register a service to a certain custom record
	// number if that number does not already have a service registered.
	RegisterService(string, service.Service) error

	// Start will start the handler so it may listen for messages to handle.
	Start() error

	// Stop will start the handler so it may listen for messages to handle.
	Stop() error

	// GetService finds and returns an active service matching the type.
	GetService(string) (service.Service, error)
}

type handler struct {
	services         map[string]service.Service
	keyManager       key.KeyManager
	identityManager  id.Identity
	messageManager   messages.MessageManager
	websocketService Websocket
	dataChan         chan comm.IncomingDIDMessage
	stopChan         chan struct{}
}

// NewHandler returns a new service handler with
// a channel implemented for receiving messages
func NewHandler(c chan comm.IncomingDIDMessage, ws Websocket, keyManager key.KeyManager, identity id.Identity, messageManager messages.MessageManager) Handler {
	return &handler{
		dataChan:         c,
		keyManager:       keyManager,
		services:         make(map[string]service.Service),
		stopChan:         make(chan struct{}),
		websocketService: ws,
		identityManager:  identity,
		messageManager:   messageManager,
	}
}

// RegisterService will register a service to a certain custom record
// number if that number does not already have a service registered.
func (h *handler) RegisterService(customMessageType string, s service.Service) error {
	zap.L().Debug("[ServiceHandler] RegisterService")

	if _, ok := h.services[customMessageType]; ok {
		zap.L().Error("[ServiceHandler] RegisterService failed")
		return errors.New("Service already registered to custom message type")
	}
	h.services[customMessageType] = s

	zap.L().Debug("[ServiceHandler] RegisterService successful")
	return nil
}

// Start will start the handler so it may listen for messages to handle.
func (h *handler) Start() error {
	zap.L().Debug("[ServiceHandler] Start")

	if len(h.services) == 0 {
		zap.L().Error("[ServiceHandler] RegisterService failed no services")
		return errors.New("No services to start up")
	}

	var wg sync.WaitGroup

	go func() {
		for {
			select {
			// New data message received to hand off to a service
			case incomingDIDMessage := <-h.dataChan:

				// Process this message asynchronously, wait for it before ending though
				wg.Add(1)
				go func() {
					defer wg.Done()

					msgInterface := incomingDIDMessage.Message
					originalMsg, err := comm.ParseDIDCommMsg(msgInterface)
					if err != nil || originalMsg == nil || originalMsg.ID == "" {
						zap.L().Error("[ServiceHandler] Received unparsable message",
							zap.Any("message", msgInterface),
							zap.Error(err),
						)
						return
					}

					msg, err := h.DecryptOnion(originalMsg)
					if err != nil {
						zap.L().Error("[ServiceHandler] Error decrypting message",
							zap.Any("message", msgInterface),
							zap.Error(err),
						)
						return
					}
					msg.AddWebsocketId(originalMsg.GetWebsocketId()) // TODO this should convert automatically

					zap.L().Debug("[ServiceHandler] Received message for record",
						zap.Any("type", msg.Type),
						zap.String("message_id", msg.ID),
						zap.String("socket_id", msg.GetWebsocketId()),
					)

					// Check if there is a service it might belong to
					shouldSaveMsg := true
					service, ok := h.services[msg.Type]
					if ok {
						err := service.HandleData(msg)
						if err != nil {
							zap.L().Error("[ServiceHandler] A service could not handle data message",
								zap.String("message_id", msg.ID),
								zap.String("service", service.Type()),
								zap.Any("data", msg.Body),
								zap.String("error", err.Error()),
							)
						} else {
							// If a service handled the message, do not save it to the
							// dedicated message store.
							// It is the responsibility of the internal service to save
							// messages it has received.
							//
							// This can change in the future but for now there's no internal
							// services that do not save internally.
							shouldSaveMsg = false
						}
					} else {
						// quietly ignore if there is not a service
						zap.L().Debug("[ServiceHandler] No services dedicated to this type of message, ignoring internally..",
							zap.String("message_id", msg.ID),
							zap.String("type", msg.Type),
						)
					}

					// Send all messages to the websocket subservice anyways
					zap.L().Debug("[ServiceHandler] Publishing message to websocket",
						zap.String("message_id", msg.ID),
					)
					go h.websocketService.PublishData(*msg)

					// Save message to the store
					if shouldSaveMsg {
						zap.L().Debug("[ServiceHandler] Saving message to the store",
							zap.String("message_id", msg.ID),
						)
						msgBytes, err := json.Marshal(msg)
						if err != nil {
							return
						}

						// determine the transport before saving
						// TODO this logic needs to be better
						transport := "https"
						if msg.GetAmountMetadata() != 0 {
							transport = "lightning"
						}
						if msg.GetWebsocketId() != "" {
							transport = "ws"
						}

						err = h.messageManager.SaveMessage(&messages.MessageInfo{
							Id:         msg.ID,
							Type:       msg.Type,
							Recipients: append(msg.To, msg.From),
							Data:       msgBytes,
							Transport:  transport,
						})
						if err != nil {
							zap.L().Error("[ServiceHandler] FAILED SAVING MSG BUT RECEIVED",
								zap.Any("message", msg),
								zap.Error(err),
							)
							return
						}
					}

					// Making callback to transport, useful for associating DID with socket
					if incomingDIDMessage.Callback != nil {
						// only care about websocket ones for now
						if msg.GetWebsocketId() != "" {
							callback := *incomingDIDMessage.Callback
							shorthandDID := strings.Split(originalMsg.From, "?")[0]
							err = callback(comm.CallbackMessage{
								Type: comm.CallbackAssociateDIDType,
								Message: comm.CallbackAssociateDIDMessage{
									DID: shorthandDID,
								},
							})
							// log error but do not return, these callbacks should not
							// be mission critical
							if err != nil {
								zap.L().Error("[ServiceHandler] FAILED CALLBACK FROM MSG RECEIVED",
									zap.Any("message", msg),
									zap.Error(err),
								)
							}
						}
					}

					zap.L().Debug("[ServiceHandler] Handled message",
						zap.String("message_id", msg.ID),
					)

				}()

			// Stop listenining and exit
			case <-h.stopChan:
				wg.Wait()
				return
			}
		}
	}()

	zap.L().Debug("[ServiceHandler] Start successful")
	return nil
}

func (h *handler) DecryptOnion(wrappedMsg *comm.DIDCommMsg) (*comm.DIDCommMsg, error) {
	if wrappedMsg.Type == comm.ROUTING_MSG_TYPE {
		// If the destination is ourself, then take the attachment message and decrypt it
		messageBody := &comm.ForwardMsgBody{}
		bodyBytes, err := json.Marshal(wrappedMsg.Body)
		if err != nil {
			return nil, err
		}
		err = json.Unmarshal(bodyBytes, messageBody)
		if err != nil {
			return nil, err
		}
		// shortId matching
		forwardTo := strings.Split(messageBody.Next, "?")[0]

		// check if this DID belongs to this user
		// indicates that the forwarding stops here and to decrypt
		userIdentities, err := h.identityManager.GetUserDIDs()
		if err != nil {
			return nil, err
		}

		found := false
		for _, userIdentity := range userIdentities {
			if userIdentity.ID == forwardTo {
				found = true
				break
			}
		}
		if !found {
			// This forward message is not meant for this user as the final destination
			// pass it back upward so it can be handled appropriately by forwarding services
			return wrappedMsg, nil
		}

		// This forward message is for this user, take the attachment and decrypt it
		if len(wrappedMsg.Attachments) != 1 {
			return nil, errors.New("Cannot handle forward message with attachments != 1")
		}

		// Turn attachment into simple message
		attachment := &comm.Attachment{}
		attachmentBytes, err := json.Marshal(wrappedMsg.Attachments[0])
		if err != nil {
			return nil, err
		}
		err = json.Unmarshal(attachmentBytes, attachment)
		if err != nil {
			return nil, err
		}
		simpleMsgAttachment := &comm.DIDCommMsg{}
		simpleMsgBytes, err := json.Marshal(attachment.Data.JSON)
		if err != nil {
			zap.L().Error("[ServiceHandler] Could not marshal message attachment",
				zap.Any("attachment", attachment.Data.JSON),
			)
			return nil, err
		}
		err = json.Unmarshal(simpleMsgBytes, simpleMsgAttachment)
		if err != nil {
			zap.L().Error("[ServiceHandler] Could not unmarshal message attachment",
				zap.Any("attachment", attachment.Data.JSON),
			)
			return nil, err
		}

		// This message may be encrypted too, go through this again
		return h.DecryptOnion(simpleMsgAttachment)

	} else if wrappedMsg.Typ == comm.ENCRYPTED_MSG_TYP {
		// Get the attachment encryption message to decrypt
		encryptedMsgDetailsBody, err := comm.ParseEncryptedMsgDetailsBody(wrappedMsg.Body)
		if err != nil {
			zap.L().Error("[ServiceHandler] Received unparsable encrypted message",
				zap.Any("message", wrappedMsg),
			)
			return nil, errors.New("Could not decrypt onion")
		}
		attachmentId := encryptedMsgDetailsBody.AttachmentId

		var foundMsgAttachment *comm.Attachment
		for i := range wrappedMsg.Attachments {
			if wrappedMsg.Attachments[i].ID == attachmentId {
				foundMsgAttachment = &wrappedMsg.Attachments[i]
				break
			}
		}
		if foundMsgAttachment == nil {
			zap.L().Error("[ServiceHandler] Could not find encrypted attachment",
				zap.Any("message", wrappedMsg),
			)
			return nil, errors.New("Could not decrypt onion")
		}

		encryptedMsg, err := comm.ParseEncryptedMsg(foundMsgAttachment.Data.JSON)
		if err != nil {
			zap.L().Error("[ServiceHandler] Unable to parse encrypted attachment",
				zap.Any("message", foundMsgAttachment.Data.JSON),
			)
			return nil, errors.New("Could not decrypt onion")
		}

		zap.L().Debug("[ServiceHandler] Decrypting encrypted message",
			zap.Any("encrypted_msg", encryptedMsg),
		)

		decryptedMsg, err := h.keyManager.Decrypt(encryptedMsg.Protected, encryptedMsg.Ciphertext, encryptedMsg.Iv, encryptedMsg.Tag)
		if err != nil {
			zap.L().Error("[ServiceHandler] Could not decrypt message",
				zap.Error(err),
			)
			return nil, errors.New("Could not decrypt onion")
		}

		// decrypted messages must be parsed as jws
		// get the DID from the signature
		signedObj, err := jose.ParseSigned(string(decryptedMsg))
		if err != nil {
			zap.L().Error("[ServiceHandler] Could not parse signed message",
				zap.Error(err),
			)
			return nil, errors.New("Could not parse signed message")
		}

		sigs := signedObj.Signatures
		if len(sigs) != 1 {
			zap.L().Error("[ServiceHandler] Could not parse signed message",
				zap.Error(err),
			)
			return nil, errors.New("Could not parse signed message")
		}
		singleSigHeaderKID := sigs[0].Protected.KeyID
		if singleSigHeaderKID == "" {
			zap.L().Error("[ServiceHandler] Could not parse signed message",
				zap.Error(err),
			)
			return nil, errors.New("Could not parse signed message")
		}
		// Take the first part of the DID string as the DID (minus #ID)
		fromDIDSigned := strings.Split(singleSigHeaderKID, "#")[0]

		// first parse the message to see if there's a full DID document inside
		// since its possible we have never resolved the DID before
		unsignedObject, err := jose.ParseSigned(string(decryptedMsg))
		if err != nil {
			return nil, err
		}
		simpleMsgUnsigned, err := comm.ParseDIDCommMsgFromBytes(unsignedObject.UnsafePayloadWithoutVerification(), 0)
		if err != nil {
			zap.L().Error("[ServiceHandler] Could not check unsigned message",
				zap.Error(err),
			)
			return nil, errors.New("Could not check message")
		}
		if simpleMsgUnsigned == nil {
			zap.L().Error("[ServiceHandler] Could not check unsigned message",
				zap.Error(err),
			)
			return nil, errors.New("Could not check message")
		}
		mainDIDStr := strings.Split(simpleMsgUnsigned.From, "?")[0]
		if mainDIDStr != fromDIDSigned {
			zap.L().Error("[ServiceHandler] Could not verify signed message from supposed from",
				zap.Error(err),
			)
			return nil, errors.New("From does not match signature header key")
		}

		// Verify with that
		signedMessage, err := h.identityManager.VerifyFromDID(simpleMsgUnsigned.From, string(decryptedMsg))
		if err != nil {
			zap.L().Error("[ServiceHandler] Could not verify signed message",
				zap.Error(err),
			)
			return nil, errors.New("Could not parse verify message")
		}
		if signedMessage == nil {
			zap.L().Error("[ServiceHandler] Signed message is empty",
				zap.Error(err),
			)
			return nil, errors.New("Signed message is empty")
		}

		// parse signed message into a simple message
		simpleMsgDecrypted, err := comm.ParseDIDCommMsgFromBytes(signedMessage, wrappedMsg.GetAmountMetadata())
		if err != nil {
			zap.L().Error("[ServiceHandler] Could not parse decrypted message",
				zap.Error(err),
			)
			return nil, errors.New("Could not decrypt onion")
		}
		if simpleMsgDecrypted == nil {
			zap.L().Error("[ServiceHandler] Could not parse decrypted message")
			return nil, errors.New("Could not decrypt onion")
		}

		zap.L().Debug("[ServiceHandler] Decrypted message successfully",
			zap.Any("decrypted_msg", simpleMsgDecrypted),
		)

		// if msg is another onion message, do the decryption again
		return h.DecryptOnion(simpleMsgDecrypted)
	}

	// Message is not encrypted, so just return it
	return wrappedMsg, nil
}

// Stop will stop the handler, stop listening for messages, and stop its services
func (h *handler) Stop() error {
	zap.L().Debug("[ServiceHandler] Stop")

	close(h.stopChan)

	var serviceWg sync.WaitGroup

	for _, serv := range h.services {
		if serv.Active() {
			// Attempt shutdown in a routine to
			// concurrently shut down the rest.
			serviceWg.Add(1)
			go func(s service.Service) {
				if err := s.Shutdown(); err != nil {
					zap.L().Error("[ServiceHandler] Error shutting down a service",
						zap.String("service", s.Type()),
						zap.String("error", err.Error()),
					)
				}
				serviceWg.Done()
			}(serv)
		}
	}

	// Wait for all services to successfully shut down.
	zap.L().Debug("[ServiceHandler] Stop waiting for all services to stop")
	serviceWg.Wait()
	zap.L().Debug("[ServiceHandler] Stop successful")

	return nil
}

func (h *handler) GetService(serviceToFind string) (service.Service, error) {
	// go through each service and find the service name
	for _, s := range h.services {
		if s.Type() == serviceToFind {
			if !s.Active() {
				return nil, errors.New("Service not active")
			}
			return s, nil
		}
	}

	return nil, errors.New("Could not find service")
}
