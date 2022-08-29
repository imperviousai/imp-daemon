package ipfs

import (
	"testing"

	"github.com/golang/mock/gomock"
	mock_ipfs "github.com/imperviousai/freeimp/ipfs/mock/ipfs"
	mock_path "github.com/imperviousai/freeimp/ipfs/mock/ipfs/path"
	icore "github.com/ipfs/interface-go-ipfs-core"
	"github.com/stretchr/testify/suite"
)

type IPFSSuite struct {
	suite.Suite
	MockController *gomock.Controller

	// Mocks
	MockedIPFSCore *mock_ipfs.MockCoreAPI
	MockedIPFSPin  *mock_ipfs.MockPinAPI

	// Under test
	IPFS *ipfs
}

func (s *IPFSSuite) SetupTest() {
	s.MockController = gomock.NewController(s.T())
	s.MockedIPFSCore = mock_ipfs.NewMockCoreAPI(s.MockController)
	s.MockedIPFSPin = mock_ipfs.NewMockPinAPI(s.MockController)

	s.IPFS = &ipfs{
		core: s.MockedIPFSCore,
	}
}

func (s *IPFSSuite) AfterTest(_, _ string) {
	s.MockController.Finish()
}

func TestDIDComm(t *testing.T) {
	suite.Run(t, new(IPFSSuite))
}

func (s *IPFSSuite) TestListFilesSuccess() {
	expectedFileList := []string{"test1.txt", "test2.txt"}

	// Mock setup
	s.MockedIPFSCore.EXPECT().
		Pin().
		Return(s.MockedIPFSPin).
		Times(1)

	fileChan := make(chan icore.Pin, 2)
	filePath1 := mock_path.NewMockResolved(s.MockController)
	filePath1.EXPECT().
		String().
		Return("test1.txt").
		Times(1)
	filePin1 := mock_ipfs.NewMockPin(s.MockController)
	filePin1.EXPECT().
		Path().
		Return(filePath1).
		Times(1)

	filePath2 := mock_path.NewMockResolved(s.MockController)
	filePath2.EXPECT().
		String().
		Return("test2.txt").
		Times(1)
	filePin2 := mock_ipfs.NewMockPin(s.MockController)
	filePin2.EXPECT().
		Path().
		Return(filePath2).
		Times(1)

	fileChan <- filePin1
	fileChan <- filePin2
	close(fileChan)

	s.MockedIPFSPin.EXPECT().
		Ls(gomock.Any()).
		Return(fileChan, nil).
		Times(1)

	fileList, err := s.IPFS.ListFiles()
	s.Assert().Nil(err)
	s.Assert().Equal(expectedFileList, fileList)
}
