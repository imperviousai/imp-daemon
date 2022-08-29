package service

import (
	"sync"

	"github.com/google/uuid"
	"github.com/imperviousai/freeimp/comm"
)

//go:generate mockgen --destination=./mock/websocket_mock.go --package=mock github.com/imperviousai/freeimp/service Websocket

type Websocket interface {
	PublishData(comm.DIDCommMsg)
	SubscribeData() (uuid.UUID, chan comm.DIDCommMsg)
	UnsubscribeData(uuid.UUID)
}

type websocket struct {
	subscribers  map[uuid.UUID]chan comm.DIDCommMsg
	channelMutex sync.RWMutex
}

func NewWebsocket() Websocket {
	return &websocket{
		subscribers:  make(map[uuid.UUID]chan comm.DIDCommMsg),
		channelMutex: sync.RWMutex{},
	}
}

func (w *websocket) PublishData(d comm.DIDCommMsg) {
	w.channelMutex.Lock()
	defer w.channelMutex.Unlock()

	if len(w.subscribers) == 0 {
		return
	}

	for _, channel := range w.subscribers {
		channel <- d
	}
}

func (w *websocket) SubscribeData() (uuid.UUID, chan comm.DIDCommMsg) {
	// Create the chan
	chanId := uuid.New()
	newChan := make(chan comm.DIDCommMsg)

	// Add it to the channel list
	w.channelMutex.Lock()
	defer w.channelMutex.Unlock()

	w.subscribers[chanId] = newChan

	// Return the channel
	return chanId, newChan
}

func (w *websocket) UnsubscribeData(id uuid.UUID) {
	w.channelMutex.Lock()
	defer w.channelMutex.Unlock()

	// Find the channel if it exists
	channel, ok := w.subscribers[id]
	if !ok {
		// nop
		return
	}
	close(channel)
	delete(w.subscribers, id)
}
