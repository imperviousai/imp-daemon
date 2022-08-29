package state

import (
	"testing"

	"github.com/golang/mock/gomock"
	mock_db "github.com/imperviousai/freeimp/state/mock"
	"github.com/stretchr/testify/suite"
)

type AuthStateSuite struct {
	suite.Suite
	MockController *gomock.Controller

	// Mocks
	MockedDb *mock_db.MockDBManager

	// Under test
	AuthState *authState
}

func (s *AuthStateSuite) SetupTest() {
	s.MockController = gomock.NewController(s.T())
	s.MockedDb = mock_db.NewMockDBManager(s.MockController)

	s.AuthState = &authState{
		db: s.MockedDb,
	}
}

func (s *AuthStateSuite) AfterTest(_, _ string) {
	s.MockController.Finish()
}

func TestAuth(t *testing.T) {
	suite.Run(t, new(AuthStateSuite))
}

func (s *AuthStateSuite) TestSaveAuthSuccess() {
	// Mock setup
	authInfo := &AuthStateModel{
		Name:        "Test",
		Description: "Description",
		Key:         "94780794-a273-42ee-af9f-ad2a1726cefe",
	}
	idToCreate := int64(1)

	returnedResult := mock_db.NewMockResult(s.MockController)
	returnedResult.EXPECT().
		LastInsertId().
		Return(idToCreate, nil).
		Times(1)

	expectedSql := "insert into auth(name, description, apikey) values(?, ?, ?)"
	s.MockedDb.EXPECT().
		SafeExec(gomock.Eq(expectedSql), gomock.Eq(authInfo.Name), gomock.Eq(authInfo.Description), gomock.Eq(authInfo.Key)).
		Return(returnedResult, nil).
		Times(1)

	// Under test
	id, err := s.AuthState.SaveAuth(authInfo)
	s.Assert().Nil(err)
	s.Assert().Equal(idToCreate, id)
}

func (s *AuthStateSuite) TestDeleteAuthSuccess() {
	// Mock setup
	id := int64(1)

	expectedSql := "delete from auth where id = ?"
	s.MockedDb.EXPECT().
		SafeExec(gomock.Eq(expectedSql), gomock.Eq(int64(1))).
		Return(nil, nil).
		Times(1)

	// Under test
	err := s.AuthState.DeleteAuth(id)
	s.Assert().Nil(err)
}
