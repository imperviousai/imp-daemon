package comm

import (
	"encoding/json"
	"errors"
	"net/http"
	"net/url"
	"strings"
	"sync"

	"github.com/gorilla/websocket"
	mockable_http "github.com/imperviousai/freeimp/http"
	"go.uber.org/zap"
)

//go:generate mockgen --destination=./mock/websocket_comm_mock.go --package=mock github.com/imperviousai/freeimp/comm WebsocketComm

var upgrader = websocket.Upgrader{} // use default options

// WebsocketComm is the transport mechanism for sending and receiving DIDComm
// messages over websockets.
type WebsocketComm interface {
	SendData(endpoint string, msg *DIDCommMsg) error
	CheckMsg(endpoint string, msgData *DIDCommMsg) bool
	Stop() error
	ServeHTTP(res http.ResponseWriter, req *http.Request)
}

type websocketComm struct {
	incomingDataChan chan IncomingDIDMessage
	httpClient       mockable_http.HttpClient

	socketIdsLock         sync.RWMutex
	socketIds             map[string]*sync.RWMutex
	socketWg              sync.WaitGroup
	socketConnectionsLock sync.RWMutex
	socketConnections     map[string]*socketConnection
	shuttingDown          bool
}

type WebsocketCommConfig struct {
	IncomingDataChan chan IncomingDIDMessage
}

func NewWebsocketComm(cfg *WebsocketCommConfig) (WebsocketComm, error) {
	h := &websocketComm{
		incomingDataChan:      cfg.IncomingDataChan,
		httpClient:            &http.Client{},
		socketConnections:     make(map[string]*socketConnection),
		socketConnectionsLock: sync.RWMutex{},
		socketIdsLock:         sync.RWMutex{},
		socketIds:             make(map[string]*sync.RWMutex),
		shuttingDown:          false,
	}

	return h, nil
}

func (w *websocketComm) Stop() error {
	zap.L().Debug("Shutting down websocket didcomm")
	w.socketConnectionsLock.Lock()
	defer w.socketConnectionsLock.Unlock()
	w.shuttingDown = true

	w.socketWg.Add(len(w.socketConnections))
	go func() {
		for id, s := range w.socketConnections {
			zap.L().Debug("Shutting down websocket",
				zap.String("websocket_id", id),
			)

			// get the socket lock for this individual id
			w.socketIdsLock.RLock()
			socketIdLock, ok := w.socketIds[id]
			w.socketIdsLock.RUnlock()
			if !ok {
				zap.L().Error("Cannot find lock for this socket connection",
					zap.String("socket_id", id),
				)
				continue
			}

			socketIdLock.Lock()
			defer socketIdLock.Unlock()

			if err := s.conn.Close(); err != nil {
				zap.L().Error(err.Error())
			}
			w.socketWg.Done()
		}
	}()
	w.socketWg.Wait()
	return nil
}

func (w *websocketComm) CheckMsg(endpoint string, msg *DIDCommMsg) bool {
	socketId, err := w.findSocketId(endpoint, msg)
	if err != nil {
		return false
	}
	return socketId != ""
}

func (w *websocketComm) SendData(endpoint string, msg *DIDCommMsg) (err error) {
	socketId, err := w.findSocketId(endpoint, msg)
	if err != nil {
		return err
	}

	return w.sendToSocketId(socketId, msg)
}

func (w *websocketComm) findSocketId(endpoint string, msg *DIDCommMsg) (socketId string, err error) {
	// get socket id from endpoint, if we have an existing connection
	w.socketConnectionsLock.RLock()
	for existingSocketId, existingSocket := range w.socketConnections {
		if endpoint != "" && existingSocket.endpoint == endpoint {
			socketId = existingSocketId
			zap.L().Debug("Found socket id from endpoint",
				zap.String("socket_id", socketId),
				zap.String("endpoint", endpoint),
			)
			break
		} else if msg.To[0] != "" && existingSocket.did == msg.To[0] {
			// if there's a DID associated with this socket, send there
			zap.L().Debug("Found socket id from did",
				zap.String("socket_id", existingSocketId),
				zap.String("did", msg.To[0]),
			)
			socketId = existingSocketId
		}
	}
	w.socketConnectionsLock.RUnlock()

	// if no existing socket by endpoint, see if the caller
	// had a socketid it received its original message from
	// that it is now replying to. If so, we will now associate
	// the endpoint to the socketid
	if socketId == "" && msg.GetWebsocketId() != "" {
		socketId = msg.GetWebsocketId()
		zap.L().Debug("message had websocket id already, going to use it for sending",
			zap.String("socket_id", socketId),
			zap.String("endpoint", endpoint),
		)
		w.socketConnectionsLock.Lock()
		if val, ok := w.socketConnections[socketId]; ok {
			zap.L().Debug("Going to assign endpoint to found socket",
				zap.String("socket_id", socketId),
				zap.String("endpoint", endpoint),
			)
			val.endpoint = endpoint
			w.socketConnections[socketId] = val
		}
		w.socketConnectionsLock.Unlock()
	}

	// if socketid is not derrived from endpoint and not passed
	// in via message, then we should create a new socket conn
	if socketId == "" {
		// check if endpoint is a websocket endpoint
		if endpoint == "" || !strings.HasPrefix(endpoint, "ws") {
			return "", errors.New("not connected to destination and no ws endpoint")
		}

		// if so, connect and continue to send message to socket using new socketid
		socketId, err = w.connectToSocket(endpoint, msg.To[0])
		if err != nil {
			return "", err
		}
		zap.L().Debug("Sending message down new socket",
			zap.String("socket_id", socketId),
			zap.String("endpoint", endpoint),
		)
	}

	return socketId, nil
}

func (w *websocketComm) connectToSocket(endpoint, did string) (string, error) {
	u, err := url.Parse(endpoint)
	if err != nil {
		return "", err
	}

	c, resp, err := websocket.DefaultDialer.Dial(u.String(), nil)
	if err != nil {
		return "", err
	}
	// NOTE: using sec-websocket-accept sending side, because no raw
	// access to what our socket library had sent. Using sec-websocket-key
	// on the server side. Should't matter if it is different because its
	// only dealing with local socket management
	socketId := resp.Header.Get("sec-websocket-accept")
	w.maintainSocket(c, endpoint, socketId, "")
	return socketId, nil
}

func (w *websocketComm) sendToSocketId(socketId string, msg *DIDCommMsg) error {
	dataToSend, err := json.Marshal(msg)
	if err != nil {
		return err
	}
	zap.L().Debug("[Websocket] SendData sending message over websocket",
		zap.ByteString("data", dataToSend),
		zap.String("socket_id", socketId),
	)

	w.socketConnectionsLock.RLock()
	var c *websocket.Conn
	if val, ok := w.socketConnections[socketId]; ok {
		c = val.conn
	}
	w.socketConnectionsLock.RUnlock()

	if c == nil {
		zap.L().Error("No socket with specified id",
			zap.String("socket_id", socketId),
		)
		return errors.New("No active connection with specified socketid")
	}

	// get the socket lock for this individual id
	w.socketIdsLock.RLock()
	socketIdLock, ok := w.socketIds[socketId]
	w.socketIdsLock.RUnlock()
	if !ok {
		zap.L().Error("Cannot find lock for this socket connection",
			zap.String("socket_id", socketId),
		)
		return errors.New("No lockable connection with specified socketid")
	}

	socketIdLock.Lock()
	defer socketIdLock.Unlock()
	return c.WriteMessage(websocket.TextMessage, dataToSend)
}

func (w *websocketComm) ServeHTTP(res http.ResponseWriter, req *http.Request) {
	c, err := upgrader.Upgrade(res, req, nil)
	if err != nil {
		zap.L().Error(err.Error())
		return
	}
	socketId := req.Header.Get("sec-websocket-key")

	// we don't know what DID endpoint this is for upon socket open,
	// might figure that out later and can assign it a did endpoint
	w.maintainSocket(c, "", socketId, "")
}

func (w *websocketComm) maintainSocket(c *websocket.Conn, endpoint, socketId, did string) {
	if socketId == "" {
		// must not be a websocket request
		return
	}

	// add to socket connections and then kick off a continual reader
	w.socketConnectionsLock.Lock()
	w.socketConnections[socketId] = &socketConnection{
		conn:     c,
		endpoint: endpoint,
		did:      did,
	}
	w.socketConnectionsLock.Unlock()

	w.socketIdsLock.Lock()
	w.socketIds[socketId] = &sync.RWMutex{}
	w.socketIdsLock.Unlock()

	zap.L().Info("Opening websocket",
		zap.String("websocket_id", socketId),
	)

	go func() {
		for {
			if w.shuttingDown {
				return
			}

			_, message, err := c.ReadMessage()
			if err != nil {

				// get the socket lock for this individual id
				w.socketIdsLock.RLock()
				socketIdLock, ok := w.socketIds[socketId]
				w.socketIdsLock.RUnlock()
				if !ok {
					zap.L().Error("Cannot find lock for this socket connection",
						zap.String("socket_id", socketId),
					)
					return
				}
				socketIdLock.Lock()
				defer socketIdLock.Unlock()

				// if already shutting down, don't try to close here
				if w.shuttingDown {
					return
				}

				// if there is an error here, close the socket connection
				zap.L().Error(err.Error(),
					zap.String("websocket_id", socketId),
				)

				err = c.Close()
				if err != nil {
					zap.L().Error(err.Error(),
						zap.String("websocket_id", socketId),
					)
				}

				w.socketConnectionsLock.Lock()
				delete(w.socketConnections, socketId)
				w.socketConnectionsLock.Unlock()

				w.socketIdsLock.Lock()
				delete(w.socketIds, socketId)
				w.socketIdsLock.Unlock()
				return
			} else if len(message) == 0 {
				zap.L().Error("No bytes parsed through websocket connection",
					zap.String("websocket_id", socketId),
				)
				continue
			}

			didCommEnvelope, err := ParseDIDCommMsgFromBytes(message, 0)
			if err != nil || didCommEnvelope == nil {
				zap.L().Error("error decoding websocket message",
					zap.Error(err),
					zap.String("websocket_id", socketId),
				)
				continue
			}
			zap.L().Debug("Received a websocket msg",
				zap.Any("msg", didCommEnvelope),
				zap.String("websocket_id", socketId),
			)

			didCommEnvelope.AddWebsocketId(socketId)

			// create an anonymous callback function to associate socketId to DID
			didCallback := func(message CallbackMessage) error {
				if message.Type == CallbackAssociateDIDType {
					parsedMsg, err := ParseCallbackAssociateDIDTypeMessage(message)
					if err != nil {
						return err
					}

					if parsedMsg == nil || parsedMsg.DID == "" {
						return nil
					}

					// TODO do not do if already done before??
					zap.L().Debug("callback is associating socketid with did",
						zap.String("socket_id", socketId),
						zap.String("did", parsedMsg.DID),
					)
					w.socketConnectionsLock.RLock()
					if val, ok := w.socketConnections[socketId]; ok {
						zap.L().Debug("Going to assign did to found socket",
							zap.String("socket_id", socketId),
							zap.String("did", parsedMsg.DID),
						)
						val.did = parsedMsg.DID
					}
					w.socketConnectionsLock.RUnlock()
				}

				return nil
			}

			w.incomingDataChan <- IncomingDIDMessage{Message: didCommEnvelope, Callback: &didCallback}
		}
	}()
}

type socketConnection struct {
	conn     *websocket.Conn
	endpoint string
	did      string
}
