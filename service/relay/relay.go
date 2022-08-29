package relay

import (
	"encoding/json"
	"errors"
	"strings"
	"sync"
	"time"

	"github.com/imperviousai/imp-daemon/comm"
	"github.com/imperviousai/imp-daemon/id"
	relay_state "github.com/imperviousai/imp-daemon/service/relay/state"
	"github.com/imperviousai/imp-daemon/service/service"
	"github.com/imperviousai/imp-daemon/state"
	"go.uber.org/zap"
)

//go:generate mockgen --destination=./mock/relay_mock.go --package=mock github.com/imperviousai/imp-daemon/service/relay RelayService

type RelayService interface {
	service.Service
}

type relayService struct {
	didComm        comm.DIDComm
	state          relay_state.RelayState
	stopped        bool
	pollingWg      sync.WaitGroup
	pollerMsgIdMap map[int64]struct{}
	pollerMapLock  sync.RWMutex
}

type Config struct {
	DidComm comm.DIDComm
	Db      state.DBManager
}

func NewRelayService(cfg Config) (RelayService, error) {
	// Init the relay state database first
	state, err := relay_state.InitRelayState(cfg.Db)
	if err != nil {
		return nil, err
	}

	s := &relayService{
		didComm:        cfg.DidComm,
		state:          state,
		stopped:        false,
		pollingWg:      sync.WaitGroup{},
		pollerMsgIdMap: map[int64]struct{}{},
		pollerMapLock:  sync.RWMutex{},
	}

	// start the DB poller
	go s.startMessagePoller()

	return s, nil
}

func (v *relayService) Active() bool {
	// TODO handle this appropriately or remove
	return true
}

func (v *relayService) Type() string {
	return "relay"
}

func (v *relayService) HandleData(msg *comm.DIDCommMsg) error {
	messageBody := &comm.ForwardMsgBody{}
	bodyBytes, err := json.Marshal(msg.Body)
	if err != nil {
		return err
	}
	err = json.Unmarshal(bodyBytes, messageBody)
	if err != nil {
		return err
	}

	zap.L().Debug("[RELAY] relay message received", zap.ByteString("message", bodyBytes))

	// Parse next field and send attachment to the next DID
	// TODO just do 1 attachment, spec not clear on multiple
	if len(msg.Attachments) == 0 {
		zap.L().Debug("[RELAY] no attachment to relay", zap.ByteString("message", bodyBytes))
		return nil
	}

	attachment := &comm.Attachment{}
	attachmentBytes, err := json.Marshal(msg.Attachments[0])
	if err != nil {
		return err
	}
	err = json.Unmarshal(attachmentBytes, attachment)
	if err != nil {
		return err
	}

	// Check if the recipient had registered this node as a relay
	shorthandDID := strings.Split(messageBody.Next, "?")[0]
	zap.L().Debug("[RELAY] checking relay registration", zap.String("did", shorthandDID))
	recipientRegistered, err := v.state.GetRelayRegistration(shorthandDID)
	if err != nil {
		return err
	}
	if !recipientRegistered {
		return errors.New("Recipient has not registered to relay through this node")
	}

	// First try to auto relay if there's already a websocket opened with the recipient
	// TODO do a check first before attempting to relay
	err = v.relayMessage(nil, messageBody.Next, attachment.Data.JSON, true)
	if err == nil {
		// if NO error, then no need to save message,
		// do not store or send down additional endpoints
		zap.L().Debug("[RELAY] Auto relayed message through websocket", zap.String("did", shorthandDID), zap.Error(err))
		return nil
	}
	// IF error, proceed to either send down other endpoints or store for later
	zap.L().Debug("[RELAY] Error trying to auto relay, trying other means..", zap.String("did", shorthandDID), zap.Error(err))

	zap.L().Debug("[RELAY] Getting relay endpoints", zap.String("did", shorthandDID))
	recipientServiceEndpoints, err := v.state.GetRelayEndpoints(shorthandDID)
	if err != nil {
		return err
	}

	// If no endpoints, store the message
	if len(recipientServiceEndpoints) == 0 {
		zap.L().Debug("[RELAY] No endpoints, storing message", zap.String("did", shorthandDID))
		err = v.storeMessage(msg.ID, shorthandDID, attachment.Data.JSON)
		if err != nil {
			return err
		}

		zap.L().Debug("[RELAY] Stored relay message", zap.String("did", shorthandDID))
		return nil
	}

	// Otherwise, relay the message to one of the intended endpoints
	zap.L().Debug("[RELAY] Relaying message to stored did endpoints", zap.String("did", shorthandDID))
	// relay to longform did in case we do not have it
	return v.relayMessage(recipientServiceEndpoints, messageBody.Next, attachment.Data.JSON, false)
}

func (v *relayService) relayMessage(recipientServiceEndpoints []id.Service, to string, attachment interface{}, wsOnly bool) error {
	// Take attachment message and send as a forward message destined to recipient
	// From is always overwritten during the send stage, TODO maybe remove it from a parameter?
	forwardMsg := comm.NewForwardMsg(attachment, "", to, comm.ENCRYPTED_MSG_TYP) // TODO what if it's a different type? non-encrypted?
	forwardMsg.To = []string{to}                                                 // keep as long form to send properly

	// if wsOnly, pass that through
	settings := &comm.MessageSettings{}
	if wsOnly {
		// check first if we can forward through wss from this relay
		settings.ProtocolPreferences = []string{
			"ws", "wss",
		}
		canSend, err := v.didComm.CheckSendMsg(forwardMsg, 0, recipientServiceEndpoints, settings)
		if err != nil {
			return err
		}
		if !canSend {
			return errors.New("cannot forward ws message down this relay")
		}
	}

	// Send parsed forward message
	// amount is 0, never send relay messages through LN for now
	msgId, err := v.didComm.SendMsg(forwardMsg, 0, recipientServiceEndpoints, settings)
	if err != nil {
		zap.L().Error("[RELAY] Error relaying message", zap.String("err", err.Error()))
		return err
	}
	zap.L().Debug("[RELAY] Relayed message", zap.String("messageId", msgId))

	return err
}

func (v *relayService) storeMessage(id string, did string, msg interface{}) error {
	msgBytes, err := json.Marshal(msg)
	if err != nil {
		return err
	}

	return v.state.AddRelayMessage(did, string(msgBytes))
}

func (v *relayService) relayMessageThroughWS(mailboxMessage *relay_state.MessageState) {
	v.pollerMapLock.Lock()
	v.pollerMsgIdMap[mailboxMessage.Id] = struct{}{}
	v.pollerMapLock.Unlock()

	defer func() {
		v.pollerMapLock.Lock()
		delete(v.pollerMsgIdMap, mailboxMessage.Id)
		v.pollerMapLock.Unlock()
	}()

	// Forward attachment to the node that asked, destinated to same node
	shorthandDID := strings.Split(mailboxMessage.DID, "?")[0]
	attachmentMsg := comm.DIDCommMsg{}
	err := json.Unmarshal([]byte(mailboxMessage.Message), &attachmentMsg)
	if err != nil {
		zap.L().Debug("[RELAY] not a valid attachment message to relay",
			zap.String("did", shorthandDID),
			zap.String("message", mailboxMessage.Message),
		)
	}

	// First try to auto relay if there's already a websocket opened with the recipient
	err = v.relayMessage(nil, mailboxMessage.DID, attachmentMsg, true)
	if err != nil {
		return
	}
	// if NO error, then no need to save message,
	// do not store or send down additional endpoints
	zap.L().Debug("[RELAY] DB poller relayed message through websocket", zap.String("did", shorthandDID), zap.Error(err))

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

func (v *relayService) startMessagePoller() {
	v.pollingWg.Add(1)
	for {
		// wait a second first
		time.Sleep(1 * time.Second)
		if v.stopped {
			break
		}

		// go through each recent message and send
		recentMsgs, err := v.state.GetAllRecentRelayMessages()
		if err != nil {
			zap.L().Error("[RELAY] Error getting all messages", zap.String("err", err.Error()))
		}

		for _, msg := range recentMsgs {
			v.pollerMapLock.RLock()
			if _, found := v.pollerMsgIdMap[msg.Id]; !found {
				go v.relayMessageThroughWS(msg)
			}
			v.pollerMapLock.RUnlock()
		}
	}
	v.pollingWg.Done()
}

func (v *relayService) Shutdown() error {
	v.stopped = true
	v.pollingWg.Wait()
	return nil
}
