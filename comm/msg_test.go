package comm

import (
	"bytes"
	"encoding/json"
	"io"
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestAddAmountMetadata(t *testing.T) {
	message := &DIDCommMsg{}

	if message.GetAmountMetadata() != int64(0) {
		t.Error("empty amount not set to 0")
	}

	message.AddAmountMetadata(1)

	if message.InternalMetadata["amount"] != int64(1) {
		t.Error("amount did not set correctly")
	}

	if message.GetAmountMetadata() != int64(1) {
		t.Error("amount did not get correctly")
	}

	message.AddAmountMetadata(2)
	if message.GetAmountMetadata() != int64(2) {
		t.Error("amount did not overwrite correctly")
	}
}

func TestAddWebsocketIdMetadata(t *testing.T) {
	message := &DIDCommMsg{}

	if message.GetWebsocketId() != "" {
		t.Error("empty websocket id not set to empty string")
	}

	message.AddWebsocketId("1")

	if message.InternalMetadata["websocket_id"] != "1" {
		t.Error("websocket id did not set correctly")
	}

	if message.GetWebsocketId() != "1" {
		t.Error("websocket id did not get correctly")
	}

	message.AddWebsocketId("2")
	if message.GetWebsocketId() != "2" {
		t.Error("websocket id did not overwrite correctly")
	}
}

func TestParseMsgFromReqSuccess(t *testing.T) {
	message := NewBasicMsg("hello world")

	marshaledMessage, err := json.Marshal(message)
	assert.Nil(t, err)

	reader := bytes.NewReader(marshaledMessage)
	parsedMsgInterface, err := ParseMsgFromReq(io.NopCloser(reader))
	assert.Nil(t, err)

	parsedMsg, err := ParseDIDCommMsg(parsedMsgInterface)
	assert.Nil(t, err)

	// parse body as a basic message
	parsedBody, err := ParseBasicMsgBody(parsedMsg.Body)
	assert.Nil(t, err)
	parsedMsg.Body = parsedBody

	assert.Equal(t, message, parsedMsg)
}

func TestParseMsgFromBytesSuccess(t *testing.T) {
	message := NewBasicMsg("hello world")

	marshaledMessage, err := json.Marshal(message)
	assert.Nil(t, err)

	parsedMsgInterface, err := ParseMsgFromBytes(marshaledMessage, 0)
	assert.Nil(t, err)

	parsedMsg, err := ParseDIDCommMsg(parsedMsgInterface)
	assert.Nil(t, err)

	// parse body as a basic message
	parsedBody, err := ParseBasicMsgBody(parsedMsg.Body)
	assert.Nil(t, err)
	parsedMsg.Body = parsedBody

	// ignore internal metadata from parsing
	parsedMsg.InternalMetadata = make(map[string]interface{})
	assert.Equal(t, message, parsedMsg)
}
