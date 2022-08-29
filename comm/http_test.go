package comm

import (
	"errors"
	"io"
	"net/http"
	"strings"
	"testing"

	"github.com/golang/mock/gomock"
	"github.com/imperviousai/imp-daemon/http/mock"
	"github.com/stretchr/testify/suite"
)

type HttpCommSuite struct {
	suite.Suite
	MockController *gomock.Controller

	// Mocks
	HttpClient *mock.MockHttpClient

	// Under test
	HttpComm *httpComm
}

func (h *HttpCommSuite) SetupTest() {
	h.MockController = gomock.NewController(h.T())
	h.HttpClient = mock.NewMockHttpClient(h.MockController)

	h.HttpComm = &httpComm{
		httpClient: h.HttpClient,
	}
}

func (h *HttpCommSuite) AfterTest(_, _ string) {
	h.MockController.Finish()
}

func TestHttpComm(t *testing.T) {
	suite.Run(t, new(HttpCommSuite))
}

func (h *HttpCommSuite) TestSendDataSuccess() {
	// Mock setup
	endpoint := "https://something.com"
	msg := &DIDCommMsg{}

	h.HttpClient.EXPECT().
		Do(gomock.Any()).
		Return(&http.Response{
			Body: io.NopCloser(strings.NewReader("")),
		}, nil).
		Times(1)

	// Under test
	err := h.HttpComm.SendData(endpoint, msg)
	h.Assert().Nil(err)
}

func (h *HttpCommSuite) TestSendDataRequestError() {
	// Mock setup
	endpoint := "https://something.com"
	msg := &DIDCommMsg{}

	h.HttpClient.EXPECT().
		Do(gomock.Any()).
		Return(nil, errors.New("error")).
		Times(1)

	// Under test
	err := h.HttpComm.SendData(endpoint, msg)
	h.Assert().EqualError(err, "error")
}
