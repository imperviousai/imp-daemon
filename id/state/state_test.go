package state

import (
	"testing"

	"github.com/golang/mock/gomock"
	mock_db "github.com/imperviousai/imp-daemon/state/mock"
	"github.com/stretchr/testify/suite"
)

type IdentityStateSuite struct {
	suite.Suite
	MockController *gomock.Controller

	// Mocks
	MockedDb *mock_db.MockDBManager

	// Under test
	IdentityState *identityState
}

func (s *IdentityStateSuite) SetupTest() {
	s.MockController = gomock.NewController(s.T())
	s.MockedDb = mock_db.NewMockDBManager(s.MockController)

	s.IdentityState = &identityState{
		db: s.MockedDb,
	}
}

func (s *IdentityStateSuite) AfterTest(_, _ string) {
	s.MockController.Finish()
}

func TestDIDComm(t *testing.T) {
	suite.Run(t, new(IdentityStateSuite))
}

func (s *IdentityStateSuite) TestFindIDSuccess() {
	// Mock setup
	id := "did:peer:123"

	expectedSql := `select document, patches, belongsToUser from identity where did = ?`
	/*
		expectedState := &IdState{
			Document:      "string",
			Patches:       "string",
			BelongsToUser: true,
		}
	*/

	returnedRows := mock_db.NewMockRows(s.MockController)
	returnedRows.EXPECT().
		Close().
		Times(1)

	returnedRows.EXPECT().
		Next().
		Return(true).
		Times(1)

		// TODO can't do this until https://github.com/golang/mock/pull/595
		/*
			setValues := []interface{}{
				sql.NullString{
					String: expectedState.Document,
					Valid:  true,
				},
				sql.NullString{
					String: expectedState.Patches,
					Valid:  true,
				},
				expectedState.BelongsToUser,
			}

			returnedRows.EXPECT().
				Scan(gomock.Any()).
				SetArg(0, setValues[0]).
				SetArg(1, setValues[1]).
				SetArg(2, setValues[2]).
				Return(nil).
				Times(1)
		*/

	returnedRows.EXPECT().
		Scan(gomock.Any()).
		Return(nil).
		Times(1)

	s.MockedDb.EXPECT().
		SafeQuery(gomock.Eq(expectedSql), gomock.Eq(id)).
		Return(returnedRows, nil).
		Times(1)

	// Under test
	idState, err := s.IdentityState.FindID(id)
	s.Assert().Nil(err)
	s.Assert().NotNil(idState)

	// can't compare end result until gomock #595
	// s.Assert().Equal(expectedState, idState)
}

func (s *IdentityStateSuite) TestDeleteIDSuccess() {
	// Mock setup
	id := "did:peer:123"

	expectedSql := `delete from identity where did = ?`

	s.MockedDb.EXPECT().
		SafeExec(gomock.Eq(expectedSql), gomock.Eq(id)).
		Return(nil, nil).
		Times(1)

	// Under test
	err := s.IdentityState.DeleteID(id)
	s.Assert().Nil(err)
}
