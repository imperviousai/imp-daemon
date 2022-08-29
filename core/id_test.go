package core

import (
	"testing"

	"github.com/golang/mock/gomock"
	"github.com/hyperledger/aries-framework-go/pkg/doc/did"
	"github.com/imperviousai/freeimp/id"
	mock_identity_manager "github.com/imperviousai/freeimp/id/mock"
	"github.com/stretchr/testify/suite"
)

type CoreSuite struct {
	suite.Suite
	MockController *gomock.Controller

	// Mocks
	MockedIdentityManager *mock_identity_manager.MockIdentity

	// Under test
	Core *core
}

func (s *CoreSuite) SetupTest() {
	s.MockController = gomock.NewController(s.T())
	s.MockedIdentityManager = mock_identity_manager.NewMockIdentity(s.MockController)

	s.Core = &core{
		id: s.MockedIdentityManager,
	}
}

func (s *CoreSuite) AfterTest(_, _ string) {
	s.MockController.Finish()
}

func TestDIDComm(t *testing.T) {
	suite.Run(t, new(CoreSuite))
}

func (s *CoreSuite) TestUpdateDIDNonPeerSuccess() {
	documentUpdate := "something"
	expectedDidDoc := &did.Doc{
		ID: "did:something:123",
	}
	expectedLongFormDid := "did:something:123"

	// Mocks
	s.MockedIdentityManager.EXPECT().
		UpdateDID(gomock.Eq(documentUpdate)).
		Return(&id.DIDUpdateInfo{
			DID:         expectedDidDoc.ID,
			Document:    expectedDidDoc,
			LongFormDID: expectedLongFormDid,
		}, nil).
		Times(1)

	// Under test
	didUpdateInfo, err := s.Core.UpdateDID(documentUpdate)
	s.Assert().Nil(err)
	s.Assert().Equal(expectedDidDoc, didUpdateInfo.Document)
	s.Assert().Equal(expectedLongFormDid, didUpdateInfo.LongFormDID)
}

func (s *CoreSuite) TestDeleteDIDSuccess() {
	expectedDID := "did:something:123"

	// Mocks
	s.MockedIdentityManager.EXPECT().
		DeleteDID(gomock.Eq(expectedDID)).
		Return(nil).
		Times(1)

	// Under test
	err := s.Core.DeleteDID(expectedDID)
	s.Assert().Nil(err)
}
