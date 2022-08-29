package comm

import (
	"sync"
	"testing"

	"github.com/golang/mock/gomock"
	"github.com/imperviousai/imp-daemon/http/mock"
	"github.com/stretchr/testify/suite"
)

type WebsocketCommSuite struct {
	suite.Suite
	MockController *gomock.Controller

	// Mocks
	HttpClient *mock.MockHttpClient

	// Under test
	WebsocketComm *websocketComm
}

func (w *WebsocketCommSuite) SetupTest() {
	w.MockController = gomock.NewController(w.T())
	w.HttpClient = mock.NewMockHttpClient(w.MockController)

	w.WebsocketComm = &websocketComm{
		httpClient:            w.HttpClient,
		socketConnectionsLock: sync.RWMutex{},
		socketIds:             make(map[string]*sync.RWMutex),
		socketConnections:     make(map[string]*socketConnection),
	}
}

func (w *WebsocketCommSuite) AfterTest(_, _ string) {
	w.MockController.Finish()
}

func TestWebsocketComm(t *testing.T) {
	suite.Run(t, new(WebsocketCommSuite))
}

func (w *WebsocketCommSuite) TestSendDataNoWebsocketIdError() {
	// Mock setup
	endpoint := ""
	msg := &DIDCommMsg{}

	// Under test
	err := w.WebsocketComm.SendData(endpoint, msg)
	w.Assert().EqualError(err, "not connected to destination and no ws endpoint")
}

func (w *WebsocketCommSuite) TestSendDataNotValidEnpointError() {
	// Mock setup
	endpoint := "http://should-be-ws.com"
	msg := &DIDCommMsg{}

	// Under test
	err := w.WebsocketComm.SendData(endpoint, msg)
	w.Assert().EqualError(err, "not connected to destination and no ws endpoint")
}

func (w *WebsocketCommSuite) TestStopNoSocketsSuccess() {
	// Under test
	err := w.WebsocketComm.Stop()
	w.Assert().Nil(err)

	// make sure we are indicating that we are shutting down
	w.Assert().True(w.WebsocketComm.shuttingDown)
}

func (w *WebsocketCommSuite) TestCheckMsg() {
	// test found
	oneSocket := make(map[string]*socketConnection)
	oneSocket["1"] = &socketConnection{
		conn:     nil,
		endpoint: "wss://0.0.0.0",
	}
	w.WebsocketComm.socketConnections = oneSocket

	found := w.WebsocketComm.CheckMsg("wss://0.0.0.0", &DIDCommMsg{
		To: []string{"to"},
	})
	w.Assert().True(found)

	// test not found
	notFound := w.WebsocketComm.CheckMsg("wss://1.0.0.0", &DIDCommMsg{
		To: []string{"to"},
	})
	w.Assert().False(notFound)
}
