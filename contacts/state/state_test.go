package state

import (
	"testing"

	"github.com/golang/mock/gomock"
	mock_db "github.com/imperviousai/freeimp/state/mock"
	"github.com/stretchr/testify/suite"
)

type ContactsStateSuite struct {
	suite.Suite
	MockController *gomock.Controller

	// Mocks
	MockedDb *mock_db.MockDBManager

	// Under test
	ContactsState *contactsState
}

func (s *ContactsStateSuite) SetupTest() {
	s.MockController = gomock.NewController(s.T())
	s.MockedDb = mock_db.NewMockDBManager(s.MockController)

	s.ContactsState = &contactsState{
		db: s.MockedDb,
	}
}

func (s *ContactsStateSuite) AfterTest(_, _ string) {
	s.MockController.Finish()
}

func TestDIDComm(t *testing.T) {
	suite.Run(t, new(ContactsStateSuite))
}

func (s *ContactsStateSuite) TestDeleteContactSuccess() {
	// Mock setup
	id := int64(1)

	expectedSql := "delete from contacts where id = ?"
	s.MockedDb.EXPECT().
		SafeExec(gomock.Eq(expectedSql), gomock.Eq(int64(1))).
		Return(nil, nil).
		Times(1)

	// Under test
	err := s.ContactsState.DeleteContact(id)
	s.Assert().Nil(err)
}
