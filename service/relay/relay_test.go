package relay

import (
	"encoding/json"
	"testing"

	"github.com/golang/mock/gomock"
	"github.com/imperviousai/imp-daemon/comm"
	mock_didcomm "github.com/imperviousai/imp-daemon/comm/mock"
	mock_state "github.com/imperviousai/imp-daemon/service/relay/state/mock"
	"github.com/stretchr/testify/suite"
)

type RelaySuite struct {
	suite.Suite
	MockController *gomock.Controller

	// Mocks
	MockedState   *mock_state.MockRelayState
	MockedDIDComm *mock_didcomm.MockDIDComm

	// Under test
	RelayService *relayService
}

func (s *RelaySuite) SetupTest() {
	s.MockController = gomock.NewController(s.T())
	s.MockedState = mock_state.NewMockRelayState(s.MockController)
	s.MockedDIDComm = mock_didcomm.NewMockDIDComm(s.MockController)

	s.RelayService = &relayService{
		state:   s.MockedState,
		didComm: s.MockedDIDComm,
	}
}

func (s *RelaySuite) AfterTest(_, _ string) {
	s.MockController.Finish()
}

func TestRelay(t *testing.T) {
	suite.Run(t, new(RelaySuite))
}

func (s *RelaySuite) TestStoreMessageSuccess() {
	id := "1"
	didStr := "did:peer:123"
	msg := &comm.DIDCommMsg{}
	msgBytes, err := json.Marshal(msg)
	s.Assert().Nil(err)

	// Setup mock
	s.MockedState.EXPECT().
		AddRelayMessage(gomock.Eq(didStr), gomock.Eq(string(msgBytes))).
		Return(nil).
		Times(1)

	// Under test
	err = s.RelayService.storeMessage(id, didStr, msg)
	s.Assert().Nil(err)
}
