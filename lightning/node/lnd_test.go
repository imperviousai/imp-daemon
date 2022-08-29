package node

import (
	"errors"
	"testing"

	"github.com/golang/mock/gomock"
	lnd_mock "github.com/imperviousai/freeimp/lightning/node/mock/lnd"
	"github.com/lightningnetwork/lnd/lnrpc"
	"github.com/lightningnetwork/lnd/record"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/suite"
)

const (
	TestPubkey string = "03f74cf6f42a330be4b5cd5121060dec31c6424459c5035d1ba7297d57263b3d70"
)

type LndNodeSuite struct {
	suite.Suite
	MockController *gomock.Controller

	LightningClient *lnd_mock.MockLightningClient
	RouterClient    *lnd_mock.MockRouterClient
	SignerClient    *lnd_mock.MockSignerClient

	// Under test
	Node *lndNode
}

func (s *LndNodeSuite) SetupTest() {
	s.MockController = gomock.NewController(s.T())

	// Create the mocks for each lnd rpc client used
	s.LightningClient = lnd_mock.NewMockLightningClient(s.MockController)
	s.RouterClient = lnd_mock.NewMockRouterClient(s.MockController)
	s.SignerClient = lnd_mock.NewMockSignerClient(s.MockController)

	// Add the mocks to the node under test
	s.Node = &lndNode{
		cfg: &LndConfig{
			Pubkey: TestPubkey,
		},
		lndClient:    s.LightningClient,
		routerClient: s.RouterClient,
		signerClient: s.SignerClient,
	}
}

func (s *LndNodeSuite) AfterTest(_, _ string) {
	s.MockController.Finish()
}

func (s *LndNodeSuite) TestSignCustomRecordsEmptyError() {
	expectedError := errors.New("error")
	expectedRequest := &lnrpc.SignMessageRequest{
		Msg: []byte{},
	}

	s.LightningClient.EXPECT().
		SignMessage(gomock.Any(), gomock.Eq(expectedRequest)).
		Return(nil, expectedError).
		Times(1)

	signedMessage, err := s.Node.signCustomRecords(nil)
	s.Assert().Nil(signedMessage)
	s.Assert().Equal(expectedError, err)
}

func (s *LndNodeSuite) TestSignCustomRecordsSuccess() {
	customRecords := map[uint64][]byte{
		100000:                {0x01, 0x02},
		200000:                {0x03, 0x04},
		record.KeySendType:    {0x10, 0x10},
		NodePubkeyKeysendType: {0x09, 0x09},
	}

	expectedRequest := &lnrpc.SignMessageRequest{
		Msg: []byte{0x01, 0x02, 0x03, 0x04},
	}
	expectedSignature := []byte{0x11, 0x11}
	mockResp := &lnrpc.SignMessageResponse{
		Signature: string(expectedSignature),
	}

	s.LightningClient.EXPECT().
		SignMessage(gomock.Any(), gomock.Eq(expectedRequest)).
		Return(mockResp, nil).
		Times(1)

	signedMessage, err := s.Node.signCustomRecords(customRecords)
	s.Assert().Equal(expectedSignature, signedMessage)
	s.Assert().NoError(err)
}

func TestLndNode(t *testing.T) {
	suite.Run(t, new(LndNodeSuite))
}

func TestConcatenateSortedCustomRecords(t *testing.T) {
	tests := map[string]struct {
		input map[uint64][]byte
		want  []byte
	}{
		"empty": {
			input: make(map[uint64][]byte),
			want:  make([]byte, 0),
		},
		"only keysend ignored": {
			input: map[uint64][]byte{
				record.KeySendType: {0x01},
			},
			want: make([]byte, 0),
		},
		"only node pubkey ignored": {
			input: map[uint64][]byte{
				NodePubkeyKeysendType: {0x01},
			},
			want: make([]byte, 0),
		},
		"only keysend pubkey ignored": {
			input: map[uint64][]byte{
				record.KeySendType:    {0x01},
				NodePubkeyKeysendType: {0x01},
			},
			want: make([]byte, 0),
		},
		"single message": {
			input: map[uint64][]byte{
				100000: {0x01, 0x02},
			},
			want: []byte{0x01, 0x02},
		},
		"two messages": {
			input: map[uint64][]byte{
				100000: {0x01, 0x02},
				100001: {0x03, 0x04},
			},
			want: []byte{0x01, 0x02, 0x03, 0x04},
		},
		"two messages same data": {
			input: map[uint64][]byte{
				100000: {0x01, 0x02},
				100001: {0x01, 0x02},
			},
			want: []byte{0x01, 0x02, 0x01, 0x02},
		},
		"five messages": {
			input: map[uint64][]byte{
				100000: {0x01, 0x02},
				100001: {0x03, 0x04},
				100002: {0x05, 0x06},
				100003: {0x07, 0x08, 0x09},
				100004: {0x10, 0x11},
			},
			want: []byte{0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08, 0x09, 0x10, 0x11},
		},
		"single message with ignored records": {
			input: map[uint64][]byte{
				100000:                {0x01, 0x02},
				record.KeySendType:    {0x01},
				NodePubkeyKeysendType: {0x01},
			},
			want: []byte{0x01, 0x02},
		},
		"two messages out of order": {
			input: map[uint64][]byte{
				100001: {0x03, 0x04},
				100000: {0x01, 0x02},
			},
			want: []byte{0x01, 0x02, 0x03, 0x04},
		},
	}

	for name, tc := range tests {
		t.Run(name, func(t *testing.T) {
			got := concatenateSortedCustomRecords(tc.input)
			assert.Equal(t, tc.want, got)
		})
	}
}
