package id

import (
	"bytes"
	"encoding/base64"
	"encoding/json"
	"errors"
	"fmt"
	"strings"
	"testing"

	"github.com/golang/mock/gomock"
	"github.com/hyperledger/aries-framework-go/pkg/doc/did"
	"github.com/hyperledger/aries-framework-go/pkg/doc/jose/jwk"
	"github.com/imperviousai/freeimp/http/mock"
	"github.com/imperviousai/freeimp/id/ion"
	mock_state "github.com/imperviousai/freeimp/id/state/mock"
	"github.com/imperviousai/freeimp/key"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/suite"
)

type IonSuite struct {
	suite.Suite
	MockController *gomock.Controller

	// Mocks
	MockedState *mock_state.MockIdentityState
	HttpClient  *mock.MockHttpClient

	// Under test
	IonService *ionService
}

func (s *IonSuite) SetupTest() {
	s.MockController = gomock.NewController(s.T())
	s.MockedState = mock_state.NewMockIdentityState(s.MockController)
	s.HttpClient = mock.NewMockHttpClient(s.MockController)

	s.IonService = &ionService{
		state: s.MockedState,
	}
}

func (s *IonSuite) AfterTest(_, _ string) {
	s.MockController.Finish()
}

func TestIonService(t *testing.T) {
	suite.Run(t, new(IonSuite))
}

func (s *IonSuite) TestUpdateDidFailures() {
	updateDID := exampleDID
	updateDID.Service[0].ServiceEndpoint = "lightning:0101"

	//
	// Test nil didState
	//

	// Mock setup
	s.MockedState.EXPECT().
		FindID(gomock.Eq(updateDID.ID)).
		Return(nil, nil).
		Times(1)

	_, _, _, err := s.IonService.UpdateDid(&updateDID)
	s.Assert().EqualError(err, "Did not found")

	//
	// Test state failure
	//

	// Mock setup
	s.MockedState.EXPECT().
		FindID(gomock.Eq(updateDID.ID)).
		Return(nil, errors.New("some state error")).
		Times(1)

	_, _, _, err = s.IonService.UpdateDid(&updateDID)
	s.Assert().EqualError(err, "some state error")

	//
	// Test does not belong to user
	//

	returnedDIDState := exampleDIDState
	returnedDIDState.BelongsToUser = false

	// Mock setup
	s.MockedState.EXPECT().
		FindID(gomock.Eq(updateDID.ID)).
		Return(returnedDIDState, nil).
		Times(1)

	_, _, _, err = s.IonService.UpdateDid(&updateDID)
	s.Assert().EqualError(err, "Can not update an ION DID that is not yours")
}

func TestMultihashEncode(t *testing.T) {
	// Test for pubkey
	pubkey := &ion.PublicKeyJwk{
		Kty: "EC",
		Crv: "secp256k1",
		X:   "wfwQCJ3ORqVdnHXkT8P-Lg_GtxBEhX3ty9NUnwnHrmw",
		Y:   "uie8qL_VuAnRDduphZuxLO6qT9kPp3KRGEIRlTpWrfU",
	}

	encodedPubkey, err := multihashEncode(pubkey, 2)
	if err != nil {
		t.Errorf("Error encoding pubkey: %s", err.Error())
		return
	}
	expectedUpdateCommitment := "EiDKIkwqO69IPG3pOlHkdb86nYt0aNxSHZu2r-bhEznjdA"
	if strings.Compare(string(encodedPubkey), expectedUpdateCommitment) != 0 {
		t.Errorf("Expected (%s) got (%s)", expectedUpdateCommitment, string(encodedPubkey))
		return
	}

	jwtStr := fmt.Sprintf(`{"crv":"%s","kty":"%s","x":"%s","y":"%s"}`,
		"secp256k1",
		"EC",
		"H_1t5YxbRuZ_cR3_vGcYiAehZHJZ2F5c4WvrHnjVxQI",
		"5JcEiHYW4T3m-CJ5s8R25b1ZwteXtfonNGZAQCUfj40",
	)
	var jsonWebKey jwk.JWK
	err = jsonWebKey.UnmarshalJSON([]byte(jwtStr))
	if err != nil {
		t.Errorf("Error parsing jwk: %s", err.Error())
		return
	}

	// Test for delta
	delta := &ion.Delta{
		UpdateCommitment: "EiD3Yu-rEP0jSdWUpDDYqJpoIwbymD3a748XygVjX4nJjA",
		Patches: []ion.Patches{
			{
				Action: "replace",
				Document: &ion.Document{
					PublicKeys: []ion.PublicKeys{
						{
							ID:           "key-1",
							Type:         "EcdsaSecp256k1VerificationKey2019",
							PublicKeyJwk: jsonWebKey,
							Purposes: []string{
								"authentication",
							},
						},
					},
					Services: []ion.Services{
						{
							ID:              "LNPubkey1",
							Type:            "LNPubkey",
							ServiceEndpoint: "lightning:3352823e022c712d478f079c8e0ede62d8f6cce562de3b5e5b6851c49c99af244e",
						},
						{
							ID:              "Alias",
							Type:            "Alias",
							ServiceEndpoint: "alias:test_username",
						},
					},
				},
			},
		},
	}

	encodedDelta, err := multihashEncode(delta, 1)
	if err != nil {
		t.Errorf("Error encoding delta: %s", err.Error())
		return
	}
	expectedEncodedDelta := "EiBUtw2kbYCRWHxBsb5RmszvSwvLJDGltrSJchLQ4sT3ZQ"
	if strings.Compare(string(encodedDelta), expectedEncodedDelta) != 0 {
		t.Errorf("Expected (%s) got (%s)", expectedEncodedDelta, string(encodedDelta))
		return
	}
}

func TestJwkJsonParsing(t *testing.T) {
	xString := "wfwQCJ3ORqVdnHXkT8P-Lg_GtxBEhX3ty9NUnwnHrmw"
	yString := "uie8qL_VuAnRDduphZuxLO6qT9kPp3KRGEIRlTpWrfU"

	xBytes, err := base64.RawURLEncoding.DecodeString(xString)
	if err != nil {
		t.Errorf("Error encoding x: %s", err.Error())
		return
	}
	yBytes, err := base64.RawURLEncoding.DecodeString(yString)
	if err != nil {
		t.Errorf("Error encoding y: %s", err.Error())
		return
	}

	BaseJwk := &ion.PublicKeyJwk{
		Kty: "EC",
		Crv: "secp256k1",
		X:   xString,
		Y:   yString,
	}
	baseJwkMarshal, err := json.Marshal(BaseJwk)
	if err != nil {
		t.Errorf("Error marshaling base jwk: %s", err.Error())
		return
	}

	libraryJwk, err := key.EllipticParamsToJWK("secp256k1", "EC", xBytes, yBytes)
	if err != nil {
		t.Errorf("Error creating jwk: %s", err.Error())
		return
	}
	libraryJwkMarshal, err := json.Marshal(libraryJwk)
	if err != nil {
		t.Errorf("Error marshaling library jwk: %s", err.Error())
		return
	}

	if !bytes.Equal(baseJwkMarshal, libraryJwkMarshal) {
		t.Errorf("JWKs are not equal: %b != %b", baseJwkMarshal, libraryJwkMarshal)
	}
}

func TestAddingServicePatch(t *testing.T) {
	// Add service from empty original did doc
	originalDidDoc := emptyIonDoc

	newDidDoc := emptyIonDoc
	newDidDoc.Service = append(newDidDoc.Service, did.Service{
		ID:              "#DidCommMessaging-1",
		ServiceEndpoint: "lightning:0309dd56300b7ab40fc7195bb4893b7791da04d2ec96c43c3b603a307821ba9992",
		Type:            "DidCommMessaging",
	})

	expectedPatch := []ion.Patches{
		{
			Action: "add-services",
			Services: []ion.Services{
				{
					ID:              "DidCommMessaging-1",
					ServiceEndpoint: "lightning:0309dd56300b7ab40fc7195bb4893b7791da04d2ec96c43c3b603a307821ba9992",
					Type:            "DidCommMessaging",
				},
			},
		},
	}

	// Under test
	returnedPatch, err := createIONPatchesFromUpdates(&newDidDoc, &originalDidDoc)
	assert.Nil(t, err)
	assert.Equal(t, expectedPatch, returnedPatch)

	//
	// Now remove previous service and add a new one
	//
	originalDidDoc = newDidDoc

	newDidDoc = originalDidDoc
	newDidDoc.Service = []did.Service{
		{
			ID:              "#DidCommMessaging-1",
			ServiceEndpoint: "lightning:123",
			Type:            "DidCommMessaging",
		},
	}

	expectedPatch = []ion.Patches{
		{
			Action: "remove-services",
			Ids:    []string{"DidCommMessaging-1"},
		},
		{
			Action: "add-services",
			Services: []ion.Services{
				{
					ID:              "DidCommMessaging-1",
					ServiceEndpoint: "lightning:123",
					Type:            "DidCommMessaging",
				},
			},
		},
	}

	// Under test
	returnedPatch, err = createIONPatchesFromUpdates(&newDidDoc, &originalDidDoc)
	assert.Nil(t, err)
	assert.Equal(t, expectedPatch, returnedPatch)

	//
	// Now remove the new added services
	//
	originalDidDoc = newDidDoc

	newDidDoc = originalDidDoc
	newDidDoc.Service = nil
	expectedPatch = []ion.Patches{
		{
			Action: "remove-services",
			Ids:    []string{"DidCommMessaging-1"},
		},
	}

	// Under test
	returnedPatch, err = createIONPatchesFromUpdates(&newDidDoc, &originalDidDoc)
	assert.Nil(t, err)
	assert.Equal(t, expectedPatch, returnedPatch)

}

var emptyIonDoc did.Doc = did.Doc{
	Context: []string{
		"https://www.w3.org/ns/did/v1",
	},
	ID:                 "did:ion:ion123",
	VerificationMethod: []did.VerificationMethod{},
	Service:            []did.Service{},
	Authentication:     []did.Verification{},
	AssertionMethod:    []did.Verification{},
	KeyAgreement:       []did.Verification{},
}
