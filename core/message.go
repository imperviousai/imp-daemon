package core

import (
	"encoding/json"

	"github.com/imperviousai/imp-daemon/comm"
	"github.com/imperviousai/imp-daemon/messages"
	"go.uber.org/zap"
)

func (c *core) SendMessage(message string, toDid string, amt int64, replyToId string) (string, error) {
	zap.L().Debug("[Core] SendMessage",
		zap.String("to_did", toDid),
	)

	didCommEnvelope := comm.NewBasicMsg(message)
	didCommEnvelope.To = []string{toDid}
	didCommEnvelope.THID = replyToId

	didCommEnvelope.AddAmountMetadata(amt)

	msgId, err := c.didComm.SendMsg(didCommEnvelope, amt, nil, nil)
	if err != nil {
		zap.L().Error("[Core] SendMessage failed", zap.String("error", err.Error()))
		return "", err
	}

	zap.L().Debug("[Core] SendMessage success", zap.String("message_id", msgId))
	return msgId, nil
}

func (c *core) SendMessageV2(body string, didCommType string, dids []string, amt int64, replyToId string, groupId string, settings *comm.MessageSettings) (string, error) {
	zap.L().Debug("[Core] SendMessageV2",
		zap.Strings("to_did", dids),
	)

	simpleMsg, err := createDIDCommMessageFromParts(body, didCommType, dids, amt, replyToId, groupId)
	if err != nil {
		return "", err
	}

	msgId, err := c.didComm.SendMsg(simpleMsg, amt, nil, settings)
	if err != nil {
		zap.L().Error("[Core] SendMessageV2 failed", zap.String("error", err.Error()))
		return "", err
	}

	zap.L().Debug("[Core] SendMessageV2 success", zap.String("message_id", msgId))
	return msgId, nil
}

func createDIDCommMessageFromParts(body string, didCommType string, dids []string, amt int64, replyToId string, groupId string) (*comm.DIDCommMsg, error) {
	// TODO if it is a groupId and not list of dids, then find and fill group

	// create a didcomm simple message and stick body/type/toDid there
	simpleMsg := comm.NewDIDCommMsg()
	simpleMsg.Type = didCommType
	simpleMsg.To = dids

	// unmarshal body to json
	var mapData map[string]interface{}
	if err := json.Unmarshal([]byte(body), &mapData); err != nil {
		return nil, err
	}
	simpleMsg.Body = mapData

	simpleMsg.AddAmountMetadata(amt)

	if replyToId != "" {
		simpleMsg.THID = replyToId
	}

	return simpleMsg, nil
}

func (c *core) GetMessages() ([]*messages.MessageInfo, error) {
	return c.messageManager.GetMessages()
}

func (c *core) SaveMessage(body string, didCommType string, dids []string, from string, replyToId string, groupId string) (string, error) {
	zap.L().Debug("[Core] SaveMessage",
		zap.Strings("to_did", dids),
	)

	simpleMsg, err := createDIDCommMessageFromParts(body, didCommType, dids, 0, replyToId, groupId)
	if err != nil {
		return "", nil
	}

	// Always send long form, for now
	simpleMsg.From = from

	envelopeBytes, err := json.Marshal(simpleMsg)
	if err != nil {
		return "", err
	}

	err = c.messageManager.SaveMessage(&messages.MessageInfo{
		Id:         simpleMsg.ID,
		Type:       simpleMsg.Type,
		Recipients: append(simpleMsg.To, simpleMsg.From),
		Data:       envelopeBytes,
	})
	if err != nil {
		return "", err
	}

	return simpleMsg.ID, nil
}

func (c *core) DeleteMessage(id, groupId string) error {
	return c.messageManager.DeleteMessage(id, groupId)
}
