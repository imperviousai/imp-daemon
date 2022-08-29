package contacts

import (
	"testing"

	"github.com/golang/mock/gomock"
	"github.com/hyperledger/aries-framework-go/pkg/doc/did"
	"github.com/imperviousai/imp-daemon/contacts/state"
	contacts_state "github.com/imperviousai/imp-daemon/contacts/state"
	mock_state "github.com/imperviousai/imp-daemon/contacts/state/mock"
	mock_identity_manager "github.com/imperviousai/imp-daemon/id/mock"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/suite"
)

type ContactsSuite struct {
	suite.Suite
	MockController *gomock.Controller

	// Mocks
	MockedState           *mock_state.MockContactsState
	MockedIdentityManager *mock_identity_manager.MockIdentity

	// Under test
	ContactManager *contactManager
}

func (s *ContactsSuite) SetupTest() {
	s.MockController = gomock.NewController(s.T())
	s.MockedState = mock_state.NewMockContactsState(s.MockController)
	s.MockedIdentityManager = mock_identity_manager.NewMockIdentity(s.MockController)

	s.ContactManager = &contactManager{
		state:           s.MockedState,
		identityManager: s.MockedIdentityManager,
	}
}

func (s *ContactsSuite) AfterTest(_, _ string) {
	s.MockController.Finish()
}

func TestDIDComm(t *testing.T) {
	suite.Run(t, new(ContactsSuite))
}

func (s *ContactsSuite) TestDeleteContactSuccess() {
	// Mock setup
	id := int64(1)
	didStr := "did:peer:123"

	foundContact := &state.ContactState{
		Id:  id,
		DID: didStr,
	}
	foundDoc := &did.Doc{
		ID: didStr,
	}

	s.MockedState.EXPECT().
		FindContact(gomock.Eq(id)).
		Return(foundContact, nil).
		Times(1)

	s.MockedIdentityManager.EXPECT().
		ResolveDID(gomock.Eq(didStr)).
		Return(foundDoc, "", nil).
		Times(1)

	s.MockedState.EXPECT().
		DeleteContact(gomock.Eq(id)).
		Return(nil).
		Times(1)

	// Under test
	err := s.ContactManager.DeleteContact(id)
	s.Assert().Nil(err)
}

func TestTransformContactStateSliceToContactInfoSlice(t *testing.T) {
	contactsStates := []*contacts_state.ContactState{
		{
			Id:           1,
			DID:          "did:peer:123",
			DIDDocument:  "some_did",
			Name:         "name",
			UserDID:      "did:peer:321",
			HasContacted: false,
			Metadata:     "some_metadata",
		},
	}
	expectedStates := []*ContactInfo{
		{
			Id:           1,
			DID:          "did:peer:123",
			DIDDocument:  "some_did",
			Name:         "name",
			UserDID:      "did:peer:321",
			HasContacted: false,
			Metadata:     "some_metadata",
		},
	}

	returnedStates := transformContactStateSliceToContactInfoSlice(contactsStates)
	assert.ElementsMatch(t, expectedStates, returnedStates)
}
