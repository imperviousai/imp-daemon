package node

import (
	"github.com/imperviousai/imp-daemon/comm"
	"github.com/lightningnetwork/lnd/lnrpc"
)

//go:generate mockgen --destination=./mock/node_mock.go --package=mock github.com/imperviousai/imp-daemon/lightning/node Node

// Node is an implementation of a single lightning node with only the
// functionality that the LightningManager needs to worry about.
type Node interface {
	// GetInfo will get the node's basic info.
	GetInfo() (*lnrpc.GetInfoResponse, error)

	// GetPubkey will get the node's public key.
	GetPubkey() string

	// Subscribe will subscribe to keysends through the channel from the node.
	Subscribe(chan comm.IncomingDIDMessage) error

	// Keysend will send a message through Lightning to another node with an amount.
	Keysend(pubKey string, msgData []byte, amt int64) error

	// SignMessage will sign the provided message using a node
	SignMessage([]byte) ([]byte, error)

	// VerifySignature will verify the provided signature using a node
	VerifySignature(msg, signature []byte) (bool, error)

	// VerifySignature will verify the provided signature using a specific node pubkey.
	VerifySignatureFromPubkey(msg, signature, pubkey []byte) (bool, error)

	// GenerateInvoice will generate an invoice from one of the active nodes.
	GenerateInvoice(int64, string) (string, error)

	// PayInvoice will pay an invoice from one of the active nodes.
	PayInvoice(string) (string, error)

	// PayInvoice will check an invoice for payment.
	CheckInvoice(string) (bool, error)

	// Disconnect will disconnect safely from the node.
	Disconnect() error

	// ShouldListen indicates if this node should listen to incoming messages
	ShouldListen() bool

	// GetChannels Get the channels from the connected LND node
	GetChannels() (int64, error)

	// GetTransactions Get the transactions from the connected LND node
	GetTransactions() (string, error)
}

const (
	NodePubkeyKeysendType   uint64 = 555555
	MessageKeysendType      uint64 = 684931
	MessageOrderKeysendType uint64 = 123456
)
