package id

import (
	"encoding/json"
	"io"
	"net/http"
	"strings"
	"testing"

	"github.com/golang/mock/gomock"
	"github.com/hyperledger/aries-framework-go/pkg/doc/did"
	"github.com/imperviousai/imp-daemon/http/mock"
	id_state "github.com/imperviousai/imp-daemon/id/state"
	mock_state "github.com/imperviousai/imp-daemon/id/state/mock"
	mock_key "github.com/imperviousai/imp-daemon/key/mock"
	"github.com/stretchr/testify/suite"
)

type IdentitySuite struct {
	suite.Suite
	MockController *gomock.Controller

	// Mocks
	MockedState *mock_state.MockIdentityState
	MockedKey   *mock_key.MockKeyManager
	HttpClient  *mock.MockHttpClient

	// Under test
	Identity *identity
}

func (s *IdentitySuite) SetupTest() {
	s.MockController = gomock.NewController(s.T())
	s.MockedState = mock_state.NewMockIdentityState(s.MockController)
	s.MockedKey = mock_key.NewMockKeyManager(s.MockController)
	s.HttpClient = mock.NewMockHttpClient(s.MockController)

	s.Identity = &identity{
		state:      s.MockedState,
		keyManager: s.MockedKey,
		httpClient: s.HttpClient,
	}
}

func (s *IdentitySuite) AfterTest(_, _ string) {
	s.MockController.Finish()
}

func TestIdentity(t *testing.T) {
	suite.Run(t, new(IdentitySuite))
}

func (s *IdentitySuite) TestGetUserDIDsSuccess() {
	expectedDID := []did.Doc{exampleDID}

	// Mock setup
	returnedDIDState := []*id_state.IdState{exampleDIDState}

	s.MockedState.EXPECT().
		FindOwnDID().
		Return(returnedDIDState, nil).
		Times(1)

	didDocs, err := s.Identity.GetUserDIDs()
	s.Assert().Nil(err)
	// Compare only a couple values for ease
	// TODO compare exact objects
	s.Assert().Equal(expectedDID[0].ID, didDocs[0].ID)
	s.Assert().Equal(expectedDID[0].Context, didDocs[0].Context)
}

func (s *IdentitySuite) TestUniversalResolverEmptyError() {
	resolvedDID, err := s.Identity.universalResolver(exampleDID.ID)
	s.Assert().EqualError(err, "could not resolve ID")
	s.Assert().Nil(resolvedDID)
}

func (s *IdentitySuite) TestUniversalResolverSuccess() {
	// Setup
	s.Identity.universalResolverUrls = []string{
		"http://test.com/id/",
	}

	parsedDID, err := did.ParseDocumentResolution([]byte(exampleIONDIDResolver))
	expectedDIDResponse := &ResolveDIDResponse{
		Document: parsedDID.DIDDocument,
	}
	s.Assert().Nil(err)

	// Mocks
	s.HttpClient.EXPECT().
		Do(gomock.Any()).
		Return(&http.Response{
			Body: io.NopCloser(strings.NewReader(exampleIONDIDResolver)),
		}, nil).
		Times(1)

	resolvedDIDResponse, err := s.Identity.universalResolver(exampleDID.ID)
	s.Assert().Nil(err)
	s.Assert().NotNil(resolvedDIDResponse)

	// Compare only a couple values for ease
	// TODO compare exact objects
	s.Assert().Equal(expectedDIDResponse.Document.ID, resolvedDIDResponse.Document.ID)
}

func (s *IdentitySuite) TestBackupDIDSuccess() {
	// Setup
	s.Identity.universalResolverUrls = []string{
		"http://test.com/id/",
	}

	parsedDID, err := did.ParseDocumentResolution([]byte(exampleIONDIDResolver))
	expectedRecoveryKit := &DIDUpdateInfo{
		DID:            parsedDID.DIDDocument.ID,
		Document:       parsedDID.DIDDocument,
		DIDDerivation:  1,
		KeyDerivations: []uint32{1, 2, 3},
	}
	s.Assert().Nil(err)

	// Mocks
	s.HttpClient.EXPECT().
		Do(gomock.Any()).
		Return(&http.Response{
			Body: io.NopCloser(strings.NewReader(exampleIONDIDResolver)),
		}, nil).
		Times(1)

	s.MockedState.EXPECT().
		GetDIDKeyId(gomock.Eq(parsedDID.DIDDocument.ID)).
		Return(int64(1), nil).
		Times(1)

	s.MockedKey.EXPECT().
		GetIndex(gomock.Eq(int64(1))).
		Return(uint32(1), nil).
		Times(1)

	s.MockedKey.EXPECT().
		GetChildrenKeys(gomock.Eq(int64(1))).
		Return(nil, []uint32{1, 2, 3}, nil).
		Times(1)

	returnedRecoveryKit, err := s.Identity.BackupDID(parsedDID.DIDDocument.ID)
	s.Assert().Nil(err)
	s.Assert().NotNil(returnedRecoveryKit)
	s.Assert().Equal(expectedRecoveryKit, returnedRecoveryKit)
}

func (s *IdentitySuite) TestRecoverDIDSuccess() {
	// Setup
	s.Identity.universalResolverUrls = []string{
		"http://test.com/id/",
	}

	parsedDID, err := did.ParseDocumentResolution([]byte(exampleIONDIDResolver))
	s.Assert().Nil(err)

	documentBytes, err := json.Marshal(parsedDID.DIDDocument)
	s.Assert().Nil(err)
	documentStr := string(documentBytes)

	recovery := &DIDUpdateInfo{
		DID:            parsedDID.DIDDocument.ID,
		LongFormDID:    parsedDID.DIDDocument.ID,
		Document:       parsedDID.DIDDocument,
		DIDDerivation:  1,
		KeyDerivations: []uint32{1, 2, 3},
	}

	// Mocks
	s.HttpClient.EXPECT().
		Do(gomock.Any()).
		Return(&http.Response{
			Body: io.NopCloser(strings.NewReader(exampleIONDIDResolver)),
		}, nil).
		Times(1)

	s.MockedKey.EXPECT().
		NewChild(gomock.Eq(int64(0)), gomock.Eq(recovery.DIDDerivation)).
		Return(int64(1), nil, uint32(0), nil).
		Times(1)

	s.MockedKey.EXPECT().
		NewChild(gomock.Eq(int64(1)), gomock.Eq(recovery.KeyDerivations[0])).
		Return(int64(2), nil, uint32(0), nil).
		Times(1)

	s.MockedKey.EXPECT().
		NewChild(gomock.Eq(int64(1)), gomock.Eq(recovery.KeyDerivations[1])).
		Return(int64(3), nil, uint32(0), nil).
		Times(1)

	s.MockedKey.EXPECT().
		NewChild(gomock.Eq(int64(1)), gomock.Eq(recovery.KeyDerivations[2])).
		Return(int64(4), nil, uint32(0), nil).
		Times(1)

	s.MockedState.EXPECT().
		SaveID(gomock.Eq(recovery.DID), gomock.Eq(documentStr), gomock.Eq(true), gomock.Eq(int64(1)), gomock.Eq("")).
		Return(nil).
		Times(1)

	// Under test
	err = s.Identity.RecoverDID(recovery)
	s.Assert().Nil(err)
}

func (s *IdentitySuite) TestParseMissingContextSuccess() {
	exampleIONDIDResolverMissingContext := "{\"@context\": \"https://w3id.org/did-resolution/v1\",\"didDocument\": {\"id\": \"did:ion:EiClkZMDxPKqC9c-umQfTkR8vvZ9JPhl_xLDI9Nfk38w5w\",\"verificationMethod\": [{\"id\": \"#someKeyId\",\"controller\": \"did:ion:EiClkZMDxPKqC9c-umQfTkR8vvZ9JPhl_xLDI9Nfk38w5w\",\"type\": \"EcdsaSecp256k1VerificationKey2019\",\"publicKeyJwk\": {\"kty\": \"EC\",\"crv\": \"secp256k1\",\"x\": \"WfY7Px6AgH6x-_dgAoRbg8weYRJA36ON-gQiFnETrqw\",\"y\": \"IzFx3BUGztK0cyDStiunXbrZYYTtKbOUzx16SUK0sAY\"}}],\"service\": [{\"id\": \"#linkedin\",\"type\": \"linkedin\",\"serviceEndpoint\": \"https://linkedin.com/in/henry-tsai-6b884014\"},{\"id\": \"#github\",\"type\": \"github\",\"serviceEndpoint\": \"https://github.com/thehenrytsai\"}],\"authentication\": [\"#someKeyId\"]},\"didResolutionMetadata\": {\"pattern\": \"^(did:ion:(?!test).+)$\",\"driverUrl\": \"http://driver-did-ion:8080/1.0/identifiers/\",\"duration\": 4,\"did\": {\"didString\": \"did:ion:EiClkZMDxPKqC9c-umQfTkR8vvZ9JPhl_xLDI9Nfk38w5w\",\"methodSpecificId\": \"EiClkZMDxPKqC9c-umQfTkR8vvZ9JPhl_xLDI9Nfk38w5w\",\"method\": \"ion\"},\"contentType\": \"application/did+ld+json\",\"convertedFrom\": \"application/did+json\",\"convertedTo\": \"application/did+ld+json\"},\"didDocumentMetadata\": {\"method\": {\"published\": true,\"recoveryCommitment\": \"EiDKYXZ2MkHRCYDVtXI7ONiTkTdVfs9Tnb-tDDHGXLzmOw\",\"updateCommitment\": \"EiDNk40DUvxCef8_BinU5DDIAhNWE4e7Ea9Q6P7GAbJ6VA\"},\"canonicalId\": \"did:ion:EiClkZMDxPKqC9c-umQfTkR8vvZ9JPhl_xLDI9Nfk38w5w\"}}"

	parsedRelaxedDoc, err := tryParseDIDResolution([]byte(exampleIONDIDResolverMissingContext))
	s.Assert().Nil(err)

	expectedDoc, err := did.ParseDocumentResolution([]byte(exampleIONDIDResolver))
	s.Assert().Nil(err)
	s.Assert().Equal(expectedDoc.DIDDocument.ID, parsedRelaxedDoc.DIDDocument.ID)
	s.Assert().Equal(expectedDoc.DIDDocument.Context, parsedRelaxedDoc.DIDDocument.Context)
}

var exampleDID did.Doc = did.Doc{
	Context: []string{
		"https://www.w3.org/ns/did/v1",
	},
	ID: "did:peer:1zQmZaCDZr1s8MyQb52174DjReP5RpHY9MnWUVx9iSsPt86Y",
	VerificationMethod: []did.VerificationMethod{
		{
			Controller: "",
			ID:         "#keys-1",
			Type:       "Ed25519VerificationKey2018",
		},
		{
			Controller: "",
			ID:         "#keys-2",
			Type:       "JsonWebKey2020",
		},
	},
	Service: []did.Service{
		{
			ID:              "#DidCommMessaging-1",
			ServiceEndpoint: "lightning:0309dd56300b7ab40fc7195bb4893b7791da04d2ec96c43c3b603a307821ba9992",
			Type:            "DidCommMessaging",
		},
	},
	Authentication: []did.Verification{
		{
			VerificationMethod: did.VerificationMethod{
				ID: "#keys-1",
			},
		},
	},
	AssertionMethod: []did.Verification{
		{
			VerificationMethod: did.VerificationMethod{
				ID: "#keys-1",
			},
		},
	},
	KeyAgreement: []did.Verification{
		{
			VerificationMethod: did.VerificationMethod{
				ID: "#keys-1",
			},
		},
	},
}
var exampleDIDState *id_state.IdState = &id_state.IdState{
	Did:           "did:peer:1zQmZaCDZr1s8MyQb52174DjReP5RpHY9MnWUVx9iSsPt86Y",
	Document:      "{\"@context\":[\"https://www.w3.org/ns/did/v1\"],\"id\":\"did:peer:1zQmZaCDZr1s8MyQb52174DjReP5RpHY9MnWUVx9iSsPt86Y\",\"verificationMethod\":[{\"controller\":\"\",\"id\":\"#keys-1\",\"publicKeyBase58\":\"7Hc1xM7XvgtkcsMbCBtHxA9uHhxCMvAWGfgQoXcmnUTodrmJL97ouL1Htk3\",\"type\":\"Ed25519VerificationKey2018\"},{\"controller\":\"\",\"id\":\"#keys-2\",\"publicKeyJwk\":{\"kty\":\"EC\",\"crv\":\"P-384\",\"x\":\"YXeco0YWCxU-xcg1CgDG6ajwLUpLXYAk0u93oZFLX84dgC3In0WVhvoHChFPOka5\",\"y\":\"fv7n0OrLKRlCODylLsbpAkhTqzKIlalYtdwG9ZurIQ7s5Qb7Jf1FWEZ471y6b25r\"},\"type\":\"JsonWebKey2020\"}],\"service\":[{\"id\":\"#DidCommMessaging-1\",\"priority\":0,\"recipientKeys\":[],\"routingKeys\":[],\"serviceEndpoint\":\"lightning:0309dd56300b7ab40fc7195bb4893b7791da04d2ec96c43c3b603a307821ba9992\",\"type\":\"DidCommMessaging\"}],\"authentication\":[\"#keys-1\"],\"assertionMethod\":[\"#keys-1\"],\"keyAgreement\":[\"#keys-2\"],\"created\":\"2022-04-22T12:56:06.663623-05:00\",\"updated\":\"2022-04-22T12:56:06.663623-05:00\"}",
	BelongsToUser: true,
}

var exampleIONDIDResolver string = "{\"@context\": \"https://w3id.org/did-resolution/v1\",\"didDocument\": {\"@context\":[\"https://www.w3.org/ns/did/v1\"],\"id\": \"did:ion:EiClkZMDxPKqC9c-umQfTkR8vvZ9JPhl_xLDI9Nfk38w5w\",\"verificationMethod\": [{\"id\": \"#someKeyId\",\"controller\": \"did:ion:EiClkZMDxPKqC9c-umQfTkR8vvZ9JPhl_xLDI9Nfk38w5w\",\"type\": \"EcdsaSecp256k1VerificationKey2019\",\"publicKeyJwk\": {\"kty\": \"EC\",\"crv\": \"secp256k1\",\"x\": \"WfY7Px6AgH6x-_dgAoRbg8weYRJA36ON-gQiFnETrqw\",\"y\": \"IzFx3BUGztK0cyDStiunXbrZYYTtKbOUzx16SUK0sAY\"}}],\"service\": [{\"id\": \"#linkedin\",\"type\": \"linkedin\",\"serviceEndpoint\": \"https://linkedin.com/in/henry-tsai-6b884014\"},{\"id\": \"#github\",\"type\": \"github\",\"serviceEndpoint\": \"https://github.com/thehenrytsai\"}],\"authentication\": [\"#someKeyId\"]},\"didResolutionMetadata\": {\"pattern\": \"^(did:ion:(?!test).+)$\",\"driverUrl\": \"http://driver-did-ion:8080/1.0/identifiers/\",\"duration\": 4,\"did\": {\"didString\": \"did:ion:EiClkZMDxPKqC9c-umQfTkR8vvZ9JPhl_xLDI9Nfk38w5w\",\"methodSpecificId\": \"EiClkZMDxPKqC9c-umQfTkR8vvZ9JPhl_xLDI9Nfk38w5w\",\"method\": \"ion\"},\"contentType\": \"application/did+ld+json\",\"convertedFrom\": \"application/did+json\",\"convertedTo\": \"application/did+ld+json\"},\"didDocumentMetadata\": {\"method\": {\"published\": true,\"recoveryCommitment\": \"EiDKYXZ2MkHRCYDVtXI7ONiTkTdVfs9Tnb-tDDHGXLzmOw\",\"updateCommitment\": \"EiDNk40DUvxCef8_BinU5DDIAhNWE4e7Ea9Q6P7GAbJ6VA\"},\"canonicalId\": \"did:ion:EiClkZMDxPKqC9c-umQfTkR8vvZ9JPhl_xLDI9Nfk38w5w\"}}"
