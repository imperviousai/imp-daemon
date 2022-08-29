package lightning

import (
	"errors"
	"testing"

	"github.com/golang/mock/gomock"
	"github.com/imperviousai/imp-daemon/comm"
	"github.com/imperviousai/imp-daemon/lightning/node/mock"
	"github.com/stretchr/testify/suite"
)

type LightningManagerSuite struct {
	suite.Suite
	Nodes          map[string]*mock.MockNode
	MockController *gomock.Controller

	// Under test
	LightningManager *lightningManager
}

func (s *LightningManagerSuite) SetupTest() {
	s.MockController = gomock.NewController(s.T())

	s.LightningManager = &lightningManager{
		nodeControllers:     make(map[string]*nodeController),
		subscriptionsActive: true,
		incomingDataChan:    make(chan comm.IncomingDIDMessage),
	}

	// Spin up two independent node mocks
	node0 := mock.NewMockNode(s.MockController)
	node1 := mock.NewMockNode(s.MockController)
	s.Nodes = map[string]*mock.MockNode{
		"node0": node0,
		"node1": node1,
	}

	// Add each one, odd nodes are inactive at start
	i := 0
	for nodePubkey, n := range s.Nodes {
		s.LightningManager.nodeControllers[nodePubkey] = &nodeController{
			node:   n,
			active: i%2 == 0,
		}
		i++
	}
}

func (s *LightningManagerSuite) AfterTest(_, _ string) {
	s.MockController.Finish()
}

/* TODO fix deadlock tests
func (s *LightningManagerSuite) TestStopActiveSuccess() {
	s.Nodes["node0"].EXPECT().Disconnect().Times(1).Return(nil)

	s.LightningManager.Stop()
}

func (s *LightningManagerSuite) TestStopActiveError() {
	s.Nodes["node0"].EXPECT().Disconnect().Times(1).Return(errors.New("error"))

	s.LightningManager.Stop()
}
*/

func (s *LightningManagerSuite) TestAddNodeNoSubscriptionsSuccess() {
	newNode := mock.NewMockNode(s.MockController)

	newNode.EXPECT().GetPubkey().Times(1).Return("newnode")

	// Simulate subscriptions turned off
	s.LightningManager.subscriptionsActive = false

	err := s.LightningManager.AddNode(newNode)
	s.NoError(err)

	// Assert that node has been added
	nodeCtrl, ok := s.LightningManager.nodeControllers["newnode"]
	s.Assert().True(ok)
	s.Assert().False(nodeCtrl.active)
}

func (s *LightningManagerSuite) TestAddNodeActiveSubscriptionsSuccess() {
	newNode := mock.NewMockNode(s.MockController)

	newNode.EXPECT().GetPubkey().Times(1).Return("newnode")
	newNode.EXPECT().ShouldListen().Times(1).Return(true)

	newNode.EXPECT().Subscribe(s.LightningManager.incomingDataChan).Times(1).Return(nil)

	err := s.LightningManager.AddNode(newNode)
	s.NoError(err)

	// Assert that node has been added
	nodeCtrl, ok := s.LightningManager.nodeControllers["newnode"]
	s.Assert().True(ok)
	s.Assert().True(nodeCtrl.active)
}

func (s *LightningManagerSuite) TestAddNodeActiveSubscriptionsSubscribeFailure() {
	newNode := mock.NewMockNode(s.MockController)

	newNode.EXPECT().GetPubkey().Times(1).Return("newnode")
	newNode.EXPECT().ShouldListen().Times(1).Return(true)

	simErr := errors.New("error")
	newNode.EXPECT().Subscribe(s.LightningManager.incomingDataChan).Times(1).Return(simErr)

	err := s.LightningManager.AddNode(newNode)
	s.Error(err)

	// Assert that node has NOT been added
	_, ok := s.LightningManager.nodeControllers["newnode"]
	s.Assert().False(ok)
}

func TestLightningManager(t *testing.T) {
	suite.Run(t, new(LightningManagerSuite))
}
