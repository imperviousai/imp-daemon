package comm

import (
	"testing"

	"github.com/golang/mock/gomock"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/suite"
)

type DIDCommSuite struct {
	suite.Suite
	MockController *gomock.Controller

	// Under test
	DIDComm *didCommController
}

func (d *DIDCommSuite) SetupTest() {
	d.MockController = gomock.NewController(d.T())

	d.DIDComm = &didCommController{}
}

func (d *DIDCommSuite) AfterTest(_, _ string) {
	d.MockController.Finish()
}

func TestDIDComm(t *testing.T) {
	suite.Run(t, new(DIDCommSuite))
}

func (d *DIDCommSuite) TestStopNilTransportsSuccess() {
	d.Assert().Nil(d.DIDComm.Stop())
}

func (d *DIDCommSuite) TestCheckSendMsg() {
	canSend, err := d.DIDComm.CheckSendMsg(&DIDCommMsg{
		To: []string{"bad"},
	}, 0, nil, nil)
	d.Assert().Error(err)
	d.Assert().False(canSend)
}

func TestPrioritizeEndpoints(t *testing.T) {
	originalEndpoints := []didCommEndpoint{
		{
			protocol: "lightning",
			endpoint: "0",
		},
		{
			protocol: "ws",
			endpoint: "1",
		},
	}

	expectedNoAmount := []didCommEndpoint{
		{
			protocol: "ws",
			endpoint: "1",
		},
		{
			protocol: "lightning",
			endpoint: "0",
		},
	}
	expectedAmount := []didCommEndpoint{
		{
			protocol: "lightning",
			endpoint: "0",
		},
		{
			protocol: "ws",
			endpoint: "1",
		},
	}

	expectedNoLN := []didCommEndpoint{
		{
			protocol: "ws",
			endpoint: "1",
		},
	}

	// Under test
	// with no amount, ws is first
	newEndpoints := PriortizeEndpoints(originalEndpoints, 0, nil)
	assert.Equal(t, expectedNoAmount, newEndpoints)

	// with amount, lightning is first
	newEndpoints = PriortizeEndpoints(originalEndpoints, 10, nil)
	assert.Equal(t, expectedAmount, newEndpoints)

	// With message preferences excluding LN
	pref := &MessageSettings{
		ProtocolPreferences: []string{
			"ws",
		},
	}
	newEndpoints = PriortizeEndpoints(originalEndpoints, 0, pref)
	assert.Equal(t, expectedNoLN, newEndpoints)

	// With message preferences preferring WS
	pref = &MessageSettings{
		ProtocolPreferences: []string{
			"ws",
			"lightning",
		},
	}
	newEndpoints = PriortizeEndpoints(originalEndpoints, 0, pref)
	assert.Equal(t, expectedNoAmount, newEndpoints)

	// With message preferences preferring LN
	pref = &MessageSettings{
		ProtocolPreferences: []string{
			"lightning",
			"ws",
		},
	}
	newEndpoints = PriortizeEndpoints(originalEndpoints, 0, pref)
	assert.Equal(t, expectedAmount, newEndpoints)

	// With message preferences not matching any
	pref = &MessageSettings{
		ProtocolPreferences: []string{
			"bad",
		},
	}
	newEndpoints = PriortizeEndpoints(originalEndpoints, 0, pref)
	assert.Len(t, newEndpoints, 0)
}

func TestParseCallbackAssociateDIDTypeMessage(t *testing.T) {
	callbackMsg := CallbackMessage{
		Type:    "DID",
		Message: CallbackAssociateDIDMessage{DID: "did:test:123"},
	}

	parsedCallback, err := ParseCallbackAssociateDIDTypeMessage(callbackMsg)
	assert.Nil(t, err)

	expectedCallback := &CallbackAssociateDIDMessage{DID: "did:test:123"}
	assert.Equal(t, expectedCallback, parsedCallback)

	invalidCallbackMsg := CallbackMessage{
		Type:    "invalid",
		Message: "not a valid msg",
	}

	parsedInvalidCallback, err := ParseCallbackAssociateDIDTypeMessage(invalidCallbackMsg)
	assert.Error(t, err)
	assert.Nil(t, parsedInvalidCallback)
}
