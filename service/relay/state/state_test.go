package state

import (
	"testing"

	"github.com/golang/mock/gomock"
	mock_db "github.com/imperviousai/imp-daemon/state/mock"
	"github.com/stretchr/testify/suite"
)

type RelayStateSuite struct {
	suite.Suite
	MockController *gomock.Controller

	// Mocks
	MockedDb *mock_db.MockDBManager

	// Under test
	RelayState *relayState
}

func (s *RelayStateSuite) SetupTest() {
	s.MockController = gomock.NewController(s.T())
	s.MockedDb = mock_db.NewMockDBManager(s.MockController)

	s.RelayState = &relayState{
		db: s.MockedDb,
	}
}

func (s *RelayStateSuite) AfterTest(_, _ string) {
	s.MockController.Finish()
}

func TestRelayState(t *testing.T) {
	suite.Run(t, new(RelayStateSuite))
}

func (s *RelayStateSuite) TestGetRelayRegistrationSuccess() {
	didStr := "did:peer:123"

	// Mock setup
	expectedSql := `select did from relay_registration where did = ?`

	returnedRows := mock_db.NewMockRows(s.MockController)
	returnedRows.EXPECT().
		Close().
		Times(1)

	returnedRows.EXPECT().
		Next().
		Return(true).
		Times(1)

	setValues := []interface{}{
		"some_string",
	}

	returnedRows.EXPECT().
		Scan(gomock.Any()).
		SetArg(0, setValues[0]).
		Return(nil).
		Times(1)

	s.MockedDb.EXPECT().
		SafeQuery(gomock.Eq(expectedSql), gomock.Eq(didStr)).
		Return(returnedRows, nil).
		Times(1)

	// Under test
	isRegistered, err := s.RelayState.GetRelayRegistration(didStr)
	s.Assert().Nil(err)
	s.Assert().True(isRegistered)
}

func (s *RelayStateSuite) TestDeleteRelayMessageSuccess() {
	id := int64(1)

	// Mock setup
	expectedSql := `delete from relay_messages where id = ?`

	s.MockedDb.EXPECT().
		SafeExec(gomock.Eq(expectedSql), gomock.Eq(id)).
		Return(nil, nil).
		Times(1)

	// Under test
	err := s.RelayState.DeleteRelayMessage(id)
	s.Assert().Nil(err)
}
