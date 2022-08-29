package state

import (
	"testing"

	"github.com/golang/mock/gomock"
	mock_db "github.com/imperviousai/imp-daemon/state/mock"
	"github.com/stretchr/testify/suite"
)

type KeyStateSuite struct {
	suite.Suite
	MockController *gomock.Controller

	// Mocks
	MockedDb *mock_db.MockDBManager

	// Under test
	KeyState *keyState
}

func (s *KeyStateSuite) SetupTest() {
	s.MockController = gomock.NewController(s.T())
	s.MockedDb = mock_db.NewMockDBManager(s.MockController)

	s.KeyState = &keyState{
		db: s.MockedDb,
	}
}

func (s *KeyStateSuite) AfterTest(_, _ string) {
	s.MockController.Finish()
}

func TestKeyState(t *testing.T) {
	suite.Run(t, new(KeyStateSuite))
}

func (s *KeyStateSuite) TestGetSeedSuccess() {
	// Mock setup
	expectedSql := `select encrypted_seed, salt from seed`
	// expectedSeed := "some_seed"
	// expectedSalt := "some_salt"

	returnedRows := mock_db.NewMockRows(s.MockController)
	returnedRows.EXPECT().
		Close().
		Times(1)

	returnedRows.EXPECT().
		Next().
		Return(true).
		Times(1)

		// can't test set on multiple values yet
		/*
			setValues := []interface{}{
				expectedSeed,
			}
		*/

	returnedRows.EXPECT().
		Scan(gomock.Any()).
		// SetArg(0, setValues[0]).
		Return(nil).
		Times(1)

	s.MockedDb.EXPECT().
		SafeQuery(gomock.Eq(expectedSql)).
		Return(returnedRows, nil).
		Times(1)

	// Under test
	_, _, err := s.KeyState.GetSeed()
	s.Assert().Nil(err)
	// s.Assert().Equal(expectedSeed, seed)
	// s.Assert().Equal(expectedSalt, salt)
}

func (s *KeyStateSuite) TestGetMnemonicSuccess() {
	// Mock setup
	expectedSql := `select encrypted_mnemonic, salt from seed`

	returnedRows := mock_db.NewMockRows(s.MockController)
	returnedRows.EXPECT().
		Close().
		Times(1)

	returnedRows.EXPECT().
		Next().
		Return(true).
		Times(1)

	returnedRows.EXPECT().
		Scan(gomock.Any()).
		Return(nil).
		Times(1)

	s.MockedDb.EXPECT().
		SafeQuery(gomock.Eq(expectedSql)).
		Return(returnedRows, nil).
		Times(1)

	// Under test
	_, _, err := s.KeyState.GetMnemonic()
	// Can't test specific values yet with gomock
	s.Assert().Nil(err)
}
