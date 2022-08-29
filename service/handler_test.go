package service

import (
	"testing"

	"github.com/golang/mock/gomock"
	"github.com/imperviousai/freeimp/service/service"
	mock_service "github.com/imperviousai/freeimp/service/service/mock"
	"github.com/stretchr/testify/suite"
)

type HandlerSuite struct {
	suite.Suite
	MockController *gomock.Controller

	// Mocks

	// Under test
	Handler *handler
}

func (s *HandlerSuite) SetupTest() {
	s.MockController = gomock.NewController(s.T())

	s.Handler = &handler{
		services: make(map[string]service.Service),
	}
}

func (s *HandlerSuite) AfterTest(_, _ string) {
	s.MockController.Finish()
}

func TestHandler(t *testing.T) {
	suite.Run(t, new(HandlerSuite))
}

func (s *HandlerSuite) TestRegisterServiceSuccess() {
	serviceType := "type"
	sampleService := mock_service.NewMockService(s.MockController)

	// Under test
	err := s.Handler.RegisterService(serviceType, sampleService)
	s.Assert().Nil(err)
	insertedService := s.Handler.services["type"]
	s.Assert().Equal(sampleService, insertedService)
}
