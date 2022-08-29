package comm

import (
	"encoding/json"
	"io"
	"time"

	"github.com/google/uuid"
)

const BASIC_MSG_TYPE = "https://didcomm.org/basicmessage/2.0/message"
const ROUTING_MSG_TYPE = "https://didcomm.org/routing/2.0"
const ENCRYPTED_MSG_TYPE = "https://impervious.ai/didcomm/encryptedmessage/1.0/message"
const ENCRYPTED_MSG_TYP = "application/didcomm-encrypted+json"
const PLAIN_MSG_TYP = "application/didcomm-plain+json"

type DIDCommMsg struct {
	Typ         string       `json:"typ"`
	ID          string       `json:"id"`
	THID        string       `json:"thid"`
	PTHID       string       `json:"pthid"`
	Type        string       `json:"type"` // Application/consumer specific
	From        string       `json:"from"`
	To          []string     `json:"to"`
	CreatedTime int64        `json:"created_time"`
	ExpiresTime int64        `json:"expires_time"`
	Body        interface{}  `json:"body"` // Body structure depends on Type
	Attachments []Attachment `json:"attachments"`

	// Internal metadata just for Impervious use
	InternalMetadata map[string]interface{} `json:"internal_metadata"` // TODO do not export when sending across the wire

}

type BasicMsgBody struct {
	Content string `json:"content"`
}

// Forward messaging
type ForwardMsgBody struct {
	Next string `json:"next"`
}

// Encrypted attachment messaging
type EncryptedMsgDetailsBody struct {
	AttachmentId string `json:"attachment_id"`
}

type Attachment struct {
	ID          string         `json:"id"`
	Description string         `json:"description"`
	MediaType   string         `json:"media_type"`
	Data        AttachmentData `json:"data"`
}

type AttachmentData struct {
	JSON interface{} `json:"json"`
}

// Encrypted Messaging
type EncryptedMsg struct {
	Ciphertext string `json:"ciphertext"`
	Protected  string `json:"protected"`
	Tag        string `json:"tag"`
	Iv         string `json:"iv"`
}

type SignedMsg struct {
	Payload   string `json:"payload"`
	Protected string `json:"protected"`
	Signature string `json:"signature"`
}

func (s *DIDCommMsg) AddAmountMetadata(amt int64) {
	if s == nil || s.InternalMetadata == nil {
		s.InternalMetadata = make(map[string]interface{})
	}
	s.InternalMetadata["amount"] = amt
}

func (s *DIDCommMsg) GetAmountMetadata() int64 {
	if s == nil || s.InternalMetadata == nil {
		return 0
	}
	amt := s.InternalMetadata["amount"]

	if amtInt, ok := amt.(int64); ok {
		return amtInt
	}

	return 0
}

func (s *DIDCommMsg) AddWebsocketId(websocketId string) {
	if s == nil || s.InternalMetadata == nil {
		s.InternalMetadata = make(map[string]interface{})
	}
	s.InternalMetadata["websocket_id"] = websocketId
}

func (s *DIDCommMsg) GetWebsocketId() string {
	if s == nil || s.InternalMetadata == nil {
		return ""
	}
	websocketId := s.InternalMetadata["websocket_id"]

	if websocketStr, ok := websocketId.(string); ok {
		return websocketStr
	}

	return ""
}

// NewDIDCommMsg creates the base of a new DIDComm Message type.
// Additional parameters will need to be put in based on its use.
func NewDIDCommMsg() *DIDCommMsg {
	return &DIDCommMsg{
		Typ:              PLAIN_MSG_TYP,
		ID:               uuid.New().String(),
		CreatedTime:      time.Now().Unix(),
		InternalMetadata: make(map[string]interface{}),
	}
}

func NewBasicMsg(content string) *DIDCommMsg {
	didCommMsg := NewDIDCommMsg()
	didCommMsg.Type = BASIC_MSG_TYPE
	didCommMsg.Body = &BasicMsgBody{
		Content: content,
	}

	return didCommMsg
}

func NewForwardMsg(msgToForward interface{}, from, to, typ string) *DIDCommMsg {
	didCommMsg := NewDIDCommMsg()
	didCommMsg.Type = ROUTING_MSG_TYPE
	didCommMsg.From = from
	didCommMsg.Body = &ForwardMsgBody{
		Next: to, // Only supports one forward for now
	}
	didCommMsg.Attachments = []Attachment{
		{
			MediaType: typ,
			Data: AttachmentData{
				JSON: msgToForward,
			},
		},
	}

	return didCommMsg
}

func NewEncryptedMsg(encryptedMsg *EncryptedMsg, from, to string) *DIDCommMsg {
	attachmentId := "1" // Just doing one for now

	return &DIDCommMsg{
		Typ:              ENCRYPTED_MSG_TYP,
		ID:               uuid.New().String(),
		CreatedTime:      time.Now().Unix(),
		InternalMetadata: make(map[string]interface{}),
		Type:             ENCRYPTED_MSG_TYPE,
		From:             from,
		To:               []string{to},
		Body: &EncryptedMsgDetailsBody{
			AttachmentId: attachmentId,
		},
		Attachments: []Attachment{
			{
				ID:        attachmentId,
				MediaType: ENCRYPTED_MSG_TYP,
				Data: AttachmentData{
					JSON: encryptedMsg,
				},
			},
		},
	}
}

func ParseMsgFromReq(msg io.ReadCloser) (interface{}, error) {
	var didCommEnvelope DIDCommMsg

	// Try to decode the request body into the struct. If there is an error,
	// respond to the client with the error message and a 400 status code.
	err := json.NewDecoder(msg).Decode(&didCommEnvelope)
	if err != nil {
		return nil, err
	}

	return didCommEnvelope, nil
}

func ParseMsgFromBytes(msg []byte, amount int64) (interface{}, error) {
	var encryptedEnvelope EncryptedMsg

	// Try to decode the request body into the struct. If there is an error,
	// respond to the client with the error message and a 400 status code.
	err := json.Unmarshal(msg, &encryptedEnvelope)
	if err == nil {
		// Double check ciphertext field not empty
		if encryptedEnvelope.Ciphertext != "" {
			return encryptedEnvelope, nil

		}
	}
	return ParseDIDCommMsgFromBytes(msg, amount)
}

func ParseDIDCommMsgFromBytes(msg []byte, amount int64) (*DIDCommMsg, error) {
	// If encrypted message didn't decode properly, try didcomm msg
	var didCommEnvelope DIDCommMsg

	// Try to decode the request body into the struct. If there is an error,
	// respond to the client with the error message and a 400 status code.
	err := json.Unmarshal(msg, &didCommEnvelope)
	if err != nil {
		return nil, err
	}

	didCommEnvelope.AddAmountMetadata(amount)

	return &didCommEnvelope, nil
}

func ParseDIDCommMsg(msg interface{}) (*DIDCommMsg, error) {
	didCommMsg := &DIDCommMsg{}
	msgBytes, err := json.Marshal(msg)
	if err != nil {
		return nil, err
	}
	err = json.Unmarshal(msgBytes, didCommMsg)
	if err != nil {
		return nil, err
	}

	// Set internal metadata to nil intentionally, weirdness in comparisons from json parsing
	if didCommMsg.InternalMetadata == nil {
		didCommMsg.InternalMetadata = make(map[string]interface{})
	}

	return didCommMsg, nil
}

func ParseBasicMsgBody(msg interface{}) (*BasicMsgBody, error) {
	body := &BasicMsgBody{}
	bodyBytes, err := json.Marshal(msg)
	if err != nil {
		return nil, err
	}
	err = json.Unmarshal(bodyBytes, body)
	if err != nil {
		return nil, err
	}

	return body, nil
}

func ParseEncryptedMsgDetailsBody(msg interface{}) (*EncryptedMsgDetailsBody, error) {
	encryptedMsgDetailsBody := &EncryptedMsgDetailsBody{}
	bodyBytes, err := json.Marshal(msg)
	if err != nil {
		return nil, err
	}
	err = json.Unmarshal(bodyBytes, encryptedMsgDetailsBody)
	if err != nil {
		return nil, err
	}

	return encryptedMsgDetailsBody, nil
}

func ParseEncryptedMsg(msg interface{}) (*EncryptedMsg, error) {
	encryptedMsg := &EncryptedMsg{}
	bodyBytes, err := json.Marshal(msg)
	if err != nil {
		return nil, err
	}
	err = json.Unmarshal(bodyBytes, encryptedMsg)
	if err != nil {
		return nil, err
	}

	return encryptedMsg, nil
}

func ParseSignedMsg(msg interface{}) (*SignedMsg, error) {
	signedMsg := &SignedMsg{}
	signedBytes, err := json.Marshal(msg)
	if err != nil {
		return nil, err
	}
	err = json.Unmarshal(signedBytes, signedMsg)
	if err != nil {
		return nil, err
	}

	return signedMsg, nil
}
