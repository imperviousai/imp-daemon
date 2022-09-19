package lightning

import (
	"encoding/json"
	"errors"
	"sync"

	"github.com/imperviousai/imp-daemon/comm"
	"github.com/imperviousai/imp-daemon/lightning/node"
	"go.uber.org/zap"
)

//go:generate mockgen --destination=./mock/lightning_manager_mock.go --package=mock github.com/imperviousai/imp-daemon/lightning LightningManager

// LightningManager is the manager in charge of subscribing to and
// managing multiple lightning nodes. Data transfer happens via channels
// in order to abstract base functionality.
type LightningManager interface {
	// Status will report the status of the Lightning Nodes connected
	Status() ([]NodeStatus, error)

	// Subscribe will subscribe to keysend events on all nodes on configured chan.
	Subscribe() error

	// CheckMsg will check the message to see if it can send down this transport
	CheckMsg(endpoint string, msg *comm.DIDCommMsg) bool

	// SendData will send a keysend message from a specific node public key.
	SendData(endpoint string, msg *comm.DIDCommMsg) error

	// AddNode will add a node to the LightningManager.
	// If subscriptions are active, will start on new node.
	AddNode(node.Node) error

	// SignMessage will sign the provided message using a node
	SignMessage([]byte) ([]byte, error)

	// VerifySignature will verify the provided signature using a node
	VerifySignature([]byte, []byte) (bool, error)

	// GenerateInvoice will generate an invoice from one of the active nodes.
	GenerateInvoice(int64, string) (string, error)

	// PayInvoice will pay an invoice from one of the active nodes.
	PayInvoice(string) (string, error)

	// PayInvoice will check an invoice for payment.
	CheckInvoice(string) (bool, error)

	// RemoveNode will disconnect & remove node from LightningManager.
	RemoveNode(string) error

	// Stop will stop the lightning manager and
	// all lightning nodes connected to it.
	Stop()
}

type lightningManager struct {
	nodeControllers     map[string]*nodeController
	nodesLock           sync.RWMutex
	incomingDataChan    chan comm.IncomingDIDMessage
	subscriptionsActive bool
}

type nodeController struct {
	node   node.Node
	active bool
}

type LightningManagerConfig struct {
	IncomingDataChan chan comm.IncomingDIDMessage
}

func NewLightningManager(cfg *LightningManagerConfig) LightningManager {
	return &lightningManager{
		nodeControllers:     make(map[string]*nodeController),
		nodesLock:           sync.RWMutex{},
		incomingDataChan:    cfg.IncomingDataChan,
		subscriptionsActive: false,
	}
}

// Subscribe will subscribe to keysend events on all nodes.
func (l *lightningManager) Subscribe() error {
	zap.L().Debug("[LM] Subscribe")

	l.nodesLock.RLock()
	defer l.nodesLock.RUnlock()

	// Allow running without lightning node
	if len(l.nodeControllers) == 0 {
		return nil
	}

	for _, nodeCtrl := range l.nodeControllers {
		nodeCtrl.active = true

		if !nodeCtrl.node.ShouldListen() {
			zap.L().Debug("[LM] Subscribe skipping non-listening node")
			continue
		}
		zap.L().Debug("[LM] Subscribe about to subscribe with next node")
		if err := nodeCtrl.node.Subscribe(l.incomingDataChan); err != nil {
			// ignore the error if just a single node has an issue
			// mark the node as inactive
			zap.L().Error("[LM] Subcribe failed with node")
			nodeCtrl.active = false
			continue
		}
		l.subscriptionsActive = true
		zap.L().Debug("[LM] Subcribe succeeded subscription with a node")
	}

	// if no subscriptions were able to be activated,
	// then give warning, this is okay - not every daemon
	// wants to listen to a lightning node but can still connect
	if !l.subscriptionsActive {
		zap.L().Debug("[LM] Not subscribing to any lightning node")
		return nil
	}

	zap.L().Debug("[LM] Subscribe succeeded")
	return nil
}

func (l *lightningManager) CheckMsg(endpoint string, msg *comm.DIDCommMsg) bool {
	// TODO should maybe try to resolve pubkey or something?
	return true
}

// SendData will send a keysend message from a specific node public key.
// If no internal node pubkey was specified then msg will send from any.
func (l *lightningManager) SendData(toPubkey string, msgData *comm.DIDCommMsg) error {
	zap.L().Debug("[LM] SendData",
		zap.String("to_pubkey", toPubkey),
		// zap.Any("message", msgData),
		zap.Int64("amount", msgData.GetAmountMetadata()),
	)

	// Check amount, can't send for free
	amt := msgData.GetAmountMetadata()
	if amt == 0 {
		return errors.New("Cannot send 0 amount payment")
	}

	l.nodesLock.RLock()
	defer l.nodesLock.RUnlock()

	if len(l.nodeControllers) < 1 {
		zap.L().Error("[LM] SendData had no nodes available to send from")
		return errors.New("No nodes available to send from")
	}

	// If no node is specified, try all active ones
	var lastErr error
	for _, nodeCtrl := range l.nodeControllers {
		if !nodeCtrl.active {
			continue
		}
		msgBytes, err := json.Marshal(msgData)
		if err != nil {
			return err
		}
		if err := nodeCtrl.node.Keysend(toPubkey, msgBytes, amt); err != nil {
			zap.L().Error("[LM] SendData failed through node, trying next..", zap.String("error", err.Error()))
			// Try the next node if error
			lastErr = err
			continue
		}
		// Keysend complete, return
		zap.L().Debug("[LM] SendData successful")
		return nil
	}

	// If it went through all nodes without success, return last error
	zap.L().Error("[LM] SendData failed", zap.String("error", lastErr.Error()))
	return lastErr
}

func (l *lightningManager) SignMessage(msg []byte) ([]byte, error) {
	zap.L().Debug("[LM] SignMessage",
		zap.ByteString("message", msg),
	)

	// TODO specify from pubkey

	// If no node is specified, try all active ones
	var lastErr error
	for _, nodeCtrl := range l.nodeControllers {
		if !nodeCtrl.active {
			continue
		}

		signature, err := nodeCtrl.node.SignMessage(msg)
		if err != nil {
			zap.L().Error("[LM] SignMessage failed through node, trying next..", zap.String("error", err.Error()))

			// Try the next node if error
			lastErr = err
			continue
		}
		// sign message complete, return
		zap.L().Debug("[LM] SignMessage successful")
		return signature, nil
	}

	zap.L().Error("[LM] SignMessage failed", zap.String("error", lastErr.Error()))
	return nil, lastErr
}

func (l *lightningManager) VerifySignature(msg []byte, signature []byte) (bool, error) {
	zap.L().Debug("[LM] VerifySignature",
		zap.ByteString("message", msg),
		zap.ByteString("signature", msg),
	)

	// Try all active ones
	var lastErr error
	for _, nodeCtrl := range l.nodeControllers {
		if !nodeCtrl.active {
			continue
		}
		result, err := nodeCtrl.node.VerifySignature(msg, signature)
		if err != nil {
			zap.L().Error("[LM] VerifySignature failed through node, trying next..", zap.String("error", err.Error()))

			// Try the next node if error
			lastErr = err
			continue
		}
		// result acquired, return
		zap.L().Debug("[LM] VerifySignature successful")
		return result, nil
	}

	zap.L().Error("[LM] VerifySignature failed", zap.String("error", lastErr.Error()))
	return false, lastErr
}

func (l *lightningManager) GenerateInvoice(amt int64, memo string) (string, error) {
	zap.L().Debug("[LM] GenerateInvoice",
		zap.Int64("amount", amt),
		zap.String("memo", memo),
	)

	// Try all active ones
	var lastErr error
	for _, nodeCtrl := range l.nodeControllers {
		if !nodeCtrl.active {
			continue
		}
		result, err := nodeCtrl.node.GenerateInvoice(amt, memo)
		if err != nil {
			zap.L().Error("[LM] GenerateInvoice failed through node, trying next..", zap.String("error", err.Error()))

			// Try the next node if error
			lastErr = err
			continue
		}
		// result acquired, return
		zap.L().Debug("[LM] GenerateInvoice successful")
		return result, nil
	}

	zap.L().Error("[LM] GenerateInvoice failed", zap.String("error", lastErr.Error()))
	return "", lastErr
}

func (l *lightningManager) PayInvoice(inv string) (string, error) {
	zap.L().Debug("[LM] PayInvoice",
		zap.String("invoice", inv),
	)

	// Try all active ones
	var lastErr error
	for _, nodeCtrl := range l.nodeControllers {
		if !nodeCtrl.active {
			continue
		}
		result, err := nodeCtrl.node.PayInvoice(inv)
		if err != nil {
			zap.L().Error("[LM] PayInvoice failed through node, trying next..", zap.String("error", err.Error()))

			// Try the next node if error
			lastErr = err
			continue
		}
		// result acquired, return
		zap.L().Debug("[LM] PayInvoice successful")
		return result, nil
	}

	zap.L().Error("[LM] PayInvoice failed", zap.String("error", lastErr.Error()))
	return "", lastErr
}

func (l *lightningManager) CheckInvoice(inv string) (bool, error) {
	zap.L().Debug("[LM] CheckInvoice",
		zap.String("invoice", inv),
	)

	// Try all active ones
	var lastErr error
	for _, nodeCtrl := range l.nodeControllers {
		if !nodeCtrl.active {
			continue
		}
		result, err := nodeCtrl.node.CheckInvoice(inv)
		if err != nil {
			zap.L().Error("[LM] CheckInvoice failed through node, trying next..", zap.String("error", err.Error()))

			// Try the next node if error
			lastErr = err
			continue
		}
		// result acquired, return
		zap.L().Debug("[LM] CheckInvoice successful")
		return result, nil
	}

	zap.L().Error("[LM] CheckInvoice failed", zap.String("error", lastErr.Error()))
	return false, lastErr
}

// AddNode will add a node to the LightningManager.
// If subscriptions are active, will start on new node.
func (l *lightningManager) AddNode(node node.Node) error {
	zap.L().Debug("[LM] AddNode")

	l.nodesLock.Lock()
	defer l.nodesLock.Unlock()

	nodePubKey := node.GetPubkey()

	// If already subscribed, start subscription for this node.
	isActive := false
	if l.subscriptionsActive {
		isActive = true
		if node.ShouldListen() {
			err := node.Subscribe(l.incomingDataChan)
			if err != nil {
				zap.L().Error("[LM] AddNode failed subscribing to added node", zap.String("error", err.Error()))
				return err
			}
		}
	}

	l.nodeControllers[nodePubKey] = &nodeController{
		node:   node,
		active: isActive,
	}

	zap.L().Debug("[LM] AddNode succeeded")
	return nil
}

// RemoveNode will disconnect & remove node from LightningManager.
func (l *lightningManager) RemoveNode(id string) error {
	zap.L().Debug("[LM] RemoveNode")

	l.nodesLock.Lock()
	defer l.nodesLock.Unlock()

	if nodeCtrl, ok := l.nodeControllers[id]; ok {
		if err := nodeCtrl.node.Disconnect(); err != nil {
			zap.L().Error("[LM] RemoveNode failed", zap.String("error", err.Error()))
			return err
		}
		delete(l.nodeControllers, id)
		zap.L().Debug("[LM] RemoveNode succeeded")
		return nil
	}

	zap.L().Error("[LM] RemoveNode node does not exist")
	return errors.New("Node does not exist")
}

// Stop will stop the lightning manager and
// all lightning nodes connected to it.
func (l *lightningManager) Stop() {
	zap.L().Debug("[LM] Stop")

	l.nodesLock.Lock()
	defer l.nodesLock.Unlock()

	var nodeWg sync.WaitGroup

	// Only go through active nodes.
	for _, nodeCtrl := range l.nodeControllers {
		if !nodeCtrl.active {
			continue
		}

		nodeWg.Add(1)
		go func(n node.Node, wg *sync.WaitGroup) {
			zap.L().Debug("[LM] Stop requested for node")
			if err := n.Disconnect(); err != nil {
				zap.L().Error("[LM] Stop failed", zap.String("error", err.Error()))
			}
			zap.L().Debug("[LM] Stoped node")
			nodeWg.Done()
		}(nodeCtrl.node, &nodeWg)
	}

	zap.L().Debug("[LM] Waiting for all nodes to stop")

	nodeWg.Wait()

	zap.L().Debug("[LM] Stop successful")
}

type NodeStatus struct {
	Pubkey string
	Active bool
}

func (l *lightningManager) Status() ([]NodeStatus, error) {
	zap.L().Debug("[LM] Status")

	l.nodesLock.Lock()
	defer l.nodesLock.Unlock()

	nodeStatuses := make([]NodeStatus, 0, len(l.nodeControllers))

	// Go through each node
	for _, nodeCtrl := range l.nodeControllers {
		active := nodeCtrl.active
		// Double check if active nodes are indeed connected
		if active {
			_, err := nodeCtrl.node.GetInfo()
			if err != nil {
				zap.L().Error("[LM] Node status check failed",
					zap.String("pubkey", nodeCtrl.node.GetPubkey()),
					zap.String("error", err.Error()),
				)
				active = false
			}
		}

		nodeStatuses = append(nodeStatuses, NodeStatus{
			Pubkey: nodeCtrl.node.GetPubkey(),
			Active: active,
		})
	}

	return nodeStatuses, nil
}
