package auth

import (
	"context"
	"testing"
	"time"

	"github.com/golang/mock/gomock"
	"github.com/google/uuid"
	auth_state "github.com/imperviousai/freeimp/auth/state"
	mock_state "github.com/imperviousai/freeimp/auth/state/mock"
	"github.com/stretchr/testify/suite"
	"google.golang.org/grpc/metadata"
)

type ContactsSuite struct {
	suite.Suite
	MockController *gomock.Controller

	// Mocks
	MockedState *mock_state.MockAuthState

	// Under test
	AuthService *authService
}

func (s *ContactsSuite) SetupTest() {
	s.MockController = gomock.NewController(s.T())
	s.MockedState = mock_state.NewMockAuthState(s.MockController)

	s.AuthService = &authService{
		state: s.MockedState,
	}
}

func (s *ContactsSuite) AfterTest(_, _ string) {
	s.MockController.Finish()
}

func TestDIDComm(t *testing.T) {
	suite.Run(t, new(ContactsSuite))
}

func (s *ContactsSuite) TestDeleteAuthSuccess() {
	// Mock setup
	id := int64(1)

	s.MockedState.EXPECT().
		DeleteAuth(gomock.Eq(id)).
		Return(nil).
		Times(1)

	// Under test
	err := s.AuthService.DeleteKey(id)
	s.Assert().Nil(err)
}

func (s *ContactsSuite) TestListAuthSuccess() {
	// Mock setup
	expectedReturn := []*auth_state.AuthStateModel{
		{
			Id:          1,
			Name:        "name",
			Description: "description",
		},
	}

	s.MockedState.EXPECT().
		ListAuth().
		Return(expectedReturn, nil).
		Times(1)

	// Under test
	returnedKeys, err := s.AuthService.ListKeys()
	s.Assert().Nil(err)
	s.Assert().Equal(expectedReturn, returnedKeys)
}

func (s *ContactsSuite) TestUpdateKeySuccess() {
	// Mock setup
	id := int64(1)
	name := "name"
	description := "description"

	s.MockedState.EXPECT().
		UpdateAuth(gomock.Eq(&auth_state.AuthStateModel{
			Id:          id,
			Name:        name,
			Description: description,
		})).
		Return(nil).
		Times(1)

	// Under test
	err := s.AuthService.UpdateKey(id, name, description)
	s.Assert().Nil(err)
}

func (s *ContactsSuite) TestGenerateNewKeySuccess() {
	// Mock setup
	name := "name"
	description := "description"
	newKey := uuid.New().String()

	keyToReturn := &auth_state.AuthStateModel{
		Id:          1,
		Name:        name,
		Description: description,
		Key:         newKey,
		Added:       time.Now(),
	}

	s.MockedState.EXPECT().
		SaveAuth(gomock.Any()). // Can't test UUID generation
		Return(keyToReturn.Id, nil).
		Times(1)

	// Under test
	returnedKey, err := s.AuthService.GenerateNewKey(name, description)
	s.Assert().Nil(err)
	s.Assert().Equal(keyToReturn.Id, returnedKey.Id)
	s.Assert().Equal(keyToReturn.Name, returnedKey.Name)
	s.Assert().Equal(keyToReturn.Description, returnedKey.Description)
}

func (s *ContactsSuite) TestAuthorizeAnyAllowedSuccess() {
	// Under test
	err := s.AuthService.authorize(context.Background(), "/key.Key/InitSeed")
	s.Assert().Nil(err)

	err = s.AuthService.authorize(context.Background(), "/key.Key/Status")
	s.Assert().Nil(err)
}

func (s *ContactsSuite) TestAuthorizeNoAPIKeyFailure() {
	ctx := context.Background()

	// test no metadata
	err := s.AuthService.authorize(ctx, "/key.Key/Unlock")
	s.Assert().EqualError(err, "rpc error: code = Unauthenticated desc = metadata is not provided")

	// test no valid auth header
	authMap := make(map[string]string)
	authMap["authorization"] = "123-123-123-123"
	authMd := metadata.New(authMap)
	noAuthCtx := metadata.NewIncomingContext(ctx, authMd)

	err = s.AuthService.authorize(noAuthCtx, "/key.Key/Unlock")
	s.Assert().EqualError(err, "rpc error: code = Unauthenticated desc = api key is not provided")
}

func (s *ContactsSuite) TestAuthorizeSuccess() {
	// Mock setup
	expectedReturn := []*auth_state.AuthStateModel{
		{
			Id:          1,
			Name:        "name",
			Description: "description",
			Key:         "1-1-1-1",
		},
	}

	s.MockedState.EXPECT().
		ListAuth().
		Return(expectedReturn, nil).
		Times(1)

	// Under test
	authMap := make(map[string]string)
	authMap["x-api-key"] = "1-1-1-1"
	authMd := metadata.New(authMap)
	ctx := metadata.NewIncomingContext(context.Background(), authMd)
	err := s.AuthService.authorize(ctx, "/key.Key/Unlock")
	s.Assert().Nil(err)
}
