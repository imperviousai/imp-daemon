package relay

import (
	"errors"
	"testing"

	"github.com/golang/mock/gomock"
	"github.com/imperviousai/imp-daemon/comm"
	mock_didcomm "github.com/imperviousai/imp-daemon/comm/mock"
	"github.com/imperviousai/imp-daemon/id"
	mock_state "github.com/imperviousai/imp-daemon/service/relay/state/mock"
	"github.com/stretchr/testify/suite"
)

type RelayRegistrationSuite struct {
	suite.Suite
	MockController *gomock.Controller

	// Mocks
	MockedState   *mock_state.MockRelayState
	MockedDIDComm *mock_didcomm.MockDIDComm

	// Under test
	RelayRegistrationService *relayRegistrationService
}

func (s *RelayRegistrationSuite) SetupTest() {
	s.MockController = gomock.NewController(s.T())
	s.MockedState = mock_state.NewMockRelayState(s.MockController)
	s.MockedDIDComm = mock_didcomm.NewMockDIDComm(s.MockController)

	s.RelayRegistrationService = &relayRegistrationService{
		state:   s.MockedState,
		didComm: s.MockedDIDComm,
	}
}

func (s *RelayRegistrationSuite) AfterTest(_, _ string) {
	s.MockController.Finish()
}

func TestRelayRegistration(t *testing.T) {
	suite.Run(t, new(RelayRegistrationSuite))
}

func (s *RelayRegistrationSuite) TestSendRegistrationRequest() {
	toDID := "did:peer:123"
	amt := int64(1)
	data := &RelayRegistrationRequestData{}

	expectedResponse := "123-123-123-123"

	expectedMsg := comm.NewDIDCommMsg()
	expectedMsg.Type = RELAY_REGISTRATION_DID_TYPE
	expectedMsg.To = []string{toDID}
	expectedMsg.Body = &RelayRegistrationBody{
		Type: RELAY_REGISTRATION_REQUEST_TYPE,
		Data: data,
	}

	// Setup mock
	s.MockedDIDComm.EXPECT().
		SendMsg(gomock.Any(), gomock.Eq(amt), nil, nil).
		DoAndReturn(
			func(didCommEnvelope *comm.DIDCommMsg, amt int64, additionalEndpoints []id.Service, settings *comm.MessageSettings) (interface{}, error) {
				// do not compare uuid value
				didCommEnvelope.ID = expectedMsg.ID
				s.Assert().Equal(expectedMsg, didCommEnvelope)

				return expectedResponse, nil
			},
		)

	// Under test
	response, err := s.RelayRegistrationService.SendRegistrationRequest(toDID, amt, data)
	s.Assert().Nil(err)
	s.Assert().Equal(expectedResponse, response)
}

func (s *RelayRegistrationSuite) TestHandleRegistrationRequestSuccess() {
	toDID := "did:peer:321"
	fromDID := "did:peer:123?initialState=e"
	data := &RelayRegistrationRequestData{
		PrivateServiceEndpoints: make([]id.Service, 0),
	}

	expectedShortFormDID := "did:peer:123"

	expectedMsg := comm.NewDIDCommMsg()
	expectedMsg.Type = RELAY_REGISTRATION_REQUEST_TYPE
	expectedMsg.To = []string{toDID}
	expectedMsg.From = fromDID
	expectedMsg.Body = &RelayRegistrationRequestData{
		PrivateServiceEndpoints: make([]id.Service, 0),
	}

	// Setup mock
	s.MockedState.EXPECT().
		AddRelayRegistration(gomock.Eq(expectedShortFormDID)).
		Return(nil).
		Times(1)

	// Under test
	err := s.RelayRegistrationService.HandleRegistrationRequest(expectedMsg, data)
	s.Assert().Nil(err)
}

func (s *RelayRegistrationSuite) TestHandleMailboxRequestNoMessagesSuccess() {
	toDID := "did:peer:321"
	fromDID := "did:peer:123?initialState=e"
	data := &RelayMailboxRequestData{
		PrivateServiceEndpoints: make([]id.Service, 0),
	}

	expectedShortFormDID := "did:peer:123"

	expectedMsg := comm.NewDIDCommMsg()
	expectedMsg.Type = RELAY_MAILBOX_REQUEST_TYPE
	expectedMsg.To = []string{toDID}
	expectedMsg.From = fromDID
	expectedMsg.Body = &RelayMailboxRequestData{
		PrivateServiceEndpoints: make([]id.Service, 0),
	}

	// Setup mock
	s.MockedState.EXPECT().
		GetRelayRegistration(gomock.Eq(expectedShortFormDID)).
		Return(true, nil).
		Times(1)

	s.MockedState.EXPECT().
		GetRelayMessages(gomock.Eq(expectedShortFormDID)).
		Return(nil, nil).
		Times(1)

	// Under test
	err := s.RelayRegistrationService.HandleMailboxRequest(expectedMsg, data)
	s.Assert().Nil(err)
}

func (s *RelayRegistrationSuite) TestSendRegistrationRequestSuccess() {
	toDID := "did:peer:321"
	amt := int64(0)
	data := &RelayRegistrationRequestData{
		PrivateServiceEndpoints: make([]id.Service, 0),
	}

	expectedMsg := comm.NewDIDCommMsg()
	expectedMsg.Type = RELAY_REGISTRATION_DID_TYPE
	expectedMsg.To = []string{toDID}
	expectedMsg.Body = &RelayRegistrationBody{
		Type: RELAY_REGISTRATION_REQUEST_TYPE,
		Data: data,
	}

	expectedReturnedIds := "123-123-123-123"

	// Setup mock
	s.MockedDIDComm.EXPECT().
		SendMsg(gomock.Any(), gomock.Eq(amt), nil, nil).
		DoAndReturn(
			func(didCommEnvelope *comm.DIDCommMsg, amt int64, additionalEndpoints []id.Service, settings *comm.MessageSettings) (interface{}, error) {
				// do not compare uuid value
				didCommEnvelope.ID = expectedMsg.ID
				s.Assert().Equal(expectedMsg, didCommEnvelope)

				return expectedReturnedIds, nil
			},
		)

	// Under test
	id, err := s.RelayRegistrationService.SendRegistrationRequest(toDID, amt, data)
	s.Assert().Nil(err)
	s.Assert().Equal(expectedReturnedIds, id)
}

func (s *RelayRegistrationSuite) TestSendRegistrationRequestFailure() {
	toDID := "did:peer:321"
	amt := int64(0)
	data := &RelayRegistrationRequestData{
		PrivateServiceEndpoints: make([]id.Service, 0),
	}

	expectedMsg := comm.NewDIDCommMsg()
	expectedMsg.Type = RELAY_REGISTRATION_DID_TYPE
	expectedMsg.To = []string{toDID}
	expectedMsg.Body = &RelayRegistrationBody{
		Type: RELAY_REGISTRATION_REQUEST_TYPE,
		Data: data,
	}

	// Setup mock
	s.MockedDIDComm.EXPECT().
		SendMsg(gomock.Any(), gomock.Eq(amt), nil, nil).
		DoAndReturn(
			func(didCommEnvelope *comm.DIDCommMsg, amt int64, additionalEndpoints []id.Service, settings *comm.MessageSettings) (interface{}, error) {
				// do not compare uuid value
				didCommEnvelope.ID = expectedMsg.ID
				s.Assert().Equal(expectedMsg, didCommEnvelope)

				return nil, errors.New("something")
			},
		)

	// Under test
	_, err := s.RelayRegistrationService.SendRegistrationRequest(toDID, amt, data)
	s.Assert().EqualError(err, "something")
}
