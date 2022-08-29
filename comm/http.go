package comm

import (
	"bytes"
	"encoding/json"
	"net/http"

	mockable_http "github.com/imperviousai/imp-daemon/http"

	"go.uber.org/zap"
)

//go:generate mockgen --destination=./mock/http_comm_mock.go --package=mock github.com/imperviousai/imp-daemon/comm HttpComm

// HttpComm is the transport mechanism for sending and receiving DIDComm
// messages over an http socket.
type HttpComm interface {
	SendData(endpoint string, msg *DIDCommMsg) error
	CheckMsg(endpoint string, msg *DIDCommMsg) bool
	Stop() error
	ServeHTTP(res http.ResponseWriter, req *http.Request)
}

type httpComm struct {
	incomingDataChan chan IncomingDIDMessage
	httpClient       mockable_http.HttpClient
}

type HttpCommConfig struct {
	IncomingDataChan chan IncomingDIDMessage
}

func NewHttpComm(cfg *HttpCommConfig) (HttpComm, error) {
	h := &httpComm{
		incomingDataChan: cfg.IncomingDataChan,
		httpClient:       &http.Client{},
	}
	return h, nil
}

func (h *httpComm) Stop() error {
	zap.L().Debug("Shutting down http didcomm")
	// TODO this does nothing right now, maybe remove?
	return nil
}

func (h *httpComm) CheckMsg(endpoint string, msg *DIDCommMsg) bool {
	// TODO should maybe try to resolve IP address or something?
	return true
}

func (h *httpComm) SendData(endpoint string, msg *DIDCommMsg) error {
	dataToSend, err := json.Marshal(msg)
	if err != nil {
		return err
	}
	zap.L().Debug("[HTTP] SendData sending message over http",
		zap.ByteString("data", dataToSend),
		zap.String("url", endpoint),
	)

	req, err := http.NewRequest(http.MethodPost, endpoint, bytes.NewBuffer(dataToSend))
	if err != nil {
		zap.L().Error(err.Error())
		return err
	}
	resp, err := h.httpClient.Do(req)
	if err != nil {
		zap.L().Error(err.Error())
		return err
	}
	defer resp.Body.Close()

	zap.L().Debug("Received an http response",
		zap.String("response", resp.Status),
	)

	return nil
}

func (h *httpComm) ServeHTTP(res http.ResponseWriter, req *http.Request) {
	switch req.Method {
	case "GET":
		return
	case "POST":
		didCommEnvelope, err := ParseMsgFromReq(req.Body)
		if err != nil {
			zap.L().Error("error decoding http message",
				zap.Error(err),
			)
			return
		}
		zap.L().Debug("Received an HTTP msg",
			zap.Any("msg", didCommEnvelope),
		)

		h.incomingDataChan <- IncomingDIDMessage{Message: didCommEnvelope}
	}
}
