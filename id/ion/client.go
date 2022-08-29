package ion

import (
	"bytes"
	"encoding/base64"
	"encoding/json"
	"errors"
	"io"
	"net/http"

	"github.com/hyperledger/aries-framework-go/pkg/doc/jose/jwk"
)

//go:generate mockgen --destination=./mock/client_mock.go --package=mock github.com/imperviousai/imp-daemon/id/ion Client

const DEFAULT_URL string = "http://localhost:3000/"
const OPERATIONS_URL string = "operations"
const IDENTIFIERS_URL string = "identifiers"

type Client interface {
	ResolveDid(didstr string) ([]byte, error)
	UpdateDid(req interface{}) ([]byte, error)
}

type ClientConfig struct {
	Url string
}

type client struct {
	url string
}

func NewClient(cfg *ClientConfig) Client {
	url := DEFAULT_URL
	if cfg.Url != "" {
		url = cfg.Url
	}

	return &client{
		url: url,
	}
}

func (c *client) ResolveDid(didstr string) ([]byte, error) {
	resp, err := http.Get(c.url + IDENTIFIERS_URL + "/" + didstr)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	bodyBytes, err := io.ReadAll(resp.Body)
	if err != nil {
		return nil, err
	}
	return bodyBytes, nil
}

func (c *client) UpdateDid(req interface{}) ([]byte, error) {
	jsonReq, err := json.Marshal(req)
	if err != nil {
		return nil, err
	}

	resp, err := http.Post(c.url+OPERATIONS_URL, "application/json", bytes.NewBuffer(jsonReq))
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	if resp.StatusCode >= 400 {
		return nil, errors.New("Received an error from ION: " + resp.Status)
	}

	bodyBytes, err := io.ReadAll(resp.Body)
	if err != nil {
		return nil, err
	}

	// Check if error message from ION
	// Decode base64 and then check if IonError
	decodedErr := make([]byte, base64.URLEncoding.DecodedLen(len(bodyBytes)))
	_, err = base64.URLEncoding.Decode(decodedErr, bodyBytes)
	if err != nil {
		// ignore this, response not error
		return bodyBytes, nil
	}

	var ionErr *IonError
	err = json.Unmarshal(decodedErr, ionErr)
	if err != nil {
		// ignore this, response not err
		return bodyBytes, nil
	}
	if ionErr.Code != "" {
		// Message is more descriptive than code
		return nil, errors.New(ionErr.Message)
	}

	// Not an error
	return bodyBytes, nil
}

// ResolveDid Response
type ResolveDidResponse struct {
	Context             string              `json:"@context"`
	DidDocument         DidDocument         `json:"didDocument"`
	DidDocumentMetadata DidDocumentMetadata `json:"didDocumentMetadata"`
}
type Service struct {
	ID              string `json:"id"`
	Type            string `json:"type"`
	ServiceEndpoint string `json:"serviceEndpoint"`
}

type VerificationMethod struct {
	ID           string       `json:"id"`
	Controller   string       `json:"controller"`
	Type         string       `json:"type"`
	PublicKeyJwk PublicKeyJwk `json:"publicKeyJwk"`
}

// TODO remove in favor of real type
type DidDocument struct {
	ID                 string               `json:"id"`
	Context            []interface{}        `json:"@context"`
	Service            []Service            `json:"service"`
	VerificationMethod []VerificationMethod `json:"verificationMethod"`
	Authentication     []string             `json:"authentication"`
}
type Method struct {
	Published          bool   `json:"published"`
	RecoveryCommitment string `json:"recoveryCommitment"`
	UpdateCommitment   string `json:"updateCommitment"`
}
type DidDocumentMetadata struct {
	Method      Method `json:"method"`
	CanonicalID string `json:"canonicalId"`
}

// Create Request
type CreateRequest struct {
	Type       string     `json:"type"`
	SuffixData SuffixData `json:"suffixData"`
	Delta      Delta      `json:"delta"`
}
type SuffixData struct {
	DeltaHash          string `json:"deltaHash"`
	RecoveryCommitment string `json:"recoveryCommitment"`
}
type PublicKeyJwk struct {
	Kty string `json:"kty"`
	Crv string `json:"crv"`
	X   string `json:"x"`
	Y   string `json:"y"`
}
type PublicKeys struct {
	ID           string   `json:"id"`
	Type         string   `json:"type"`
	PublicKeyJwk jwk.JWK  `json:"publicKeyJwk"`
	Purposes     []string `json:"purposes"`
}
type Services struct {
	ID              string `json:"id"`
	Type            string `json:"type"`
	ServiceEndpoint string `json:"serviceEndpoint"` // TODO in ION this can be an object
}
type Document struct {
	PublicKeys []PublicKeys `json:"publicKeys,omitempty"`
	Services   []Services   `json:"services,omitempty"`
}

// Consolidate with Create Request
// Update Request
type UpdateRequest struct {
	Type        string `json:"type"`
	DidSuffix   string `json:"didSuffix"`
	RevealValue string `json:"revealValue"`
	Delta       Delta  `json:"delta"`
	SignedData  string `json:"signedData"`
}

type Patches struct {
	Action     string       `json:"action"`
	Services   []Services   `json:"services,omitempty"`
	PublicKeys []PublicKeys `json:"publicKeys,omitempty"`
	Ids        []string     `json:"ids,omitempty"`
	Document   *Document    `json:"document,omitempty"`
}

type Delta struct {
	Patches          []Patches `json:"patches"`
	UpdateCommitment string    `json:"updateCommitment"`
}

type UpdateDataToSign struct {
	UpdateKey *jwk.JWK `json:"updateKey"`
	DeltaHash string   `json:"deltaHash"`
}

type IonError struct {
	Message string `json:"message"`
	Code    string `json:"code"`
}
