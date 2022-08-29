package key

import (
	"encoding/hex"
	"testing"

	"github.com/golang/mock/gomock"
	mock_state "github.com/imperviousai/freeimp/key/state/mock"
	"github.com/stretchr/testify/suite"
	"github.com/tyler-smith/go-bip32"
	"github.com/tyler-smith/go-bip39"
)

type KeySuite struct {
	suite.Suite
	MockController *gomock.Controller

	// Mocks
	MockedState       *mock_state.MockKeyState
	ExpectedChildKeys []*bip32.Key

	// helpers
	mnemonic     string
	passphrase   string
	salt         string
	expectedSeed []byte

	// results from the init
	encryptedSeed     string
	encryptedMnemonic string

	// Under test
	Key *keyManager
}

func (s *KeySuite) SetupTest() {
	s.MockController = gomock.NewController(s.T())
	s.MockedState = mock_state.NewMockKeyState(s.MockController)

	// use same mnemonic for it all
	s.mnemonic = "photo rhythm tide grain box fitness loud output bubble deposit replace tray"
	s.passphrase = "passphrase"
	s.expectedSeed = []byte{0xc0, 0x81, 0x6b, 0x8b, 0xf1, 0x91, 0xf4, 0xd4, 0x18, 0x75, 0xdf, 0x4, 0x3, 0x8c, 0x4, 0xf7, 0x11, 0xaf, 0x37, 0xef, 0x69, 0xa3, 0x3d, 0x38, 0x51, 0x7, 0x6a, 0x4e, 0x5b, 0xdf, 0xfe, 0x56, 0x5d, 0xff, 0x1c, 0xd9, 0xfe, 0xb6, 0x30, 0xed, 0x90, 0xe, 0x55, 0x9d, 0xe5, 0x93, 0x9, 0xed, 0xdc, 0x71, 0xf9, 0x87, 0x6, 0xc5, 0xd3, 0x33, 0xfd, 0xed, 0xf7, 0xc, 0xd8, 0x17, 0xb5, 0xa}

	s.Key = &keyManager{
		state:            s.MockedState,
		encryptionRounds: 2,
	}

	// Mock some of the InitSeed process
	s.MockedState.EXPECT().
		GetSeed().
		Return("", "", nil).
		Times(1)

	// TODO actually test that the seed is encrypted properly
	s.MockedState.EXPECT().
		SaveSeed(gomock.Any(), gomock.Any(), gomock.Any()).
		DoAndReturn(
			func(seed, salt, mnemonic string) interface{} {
				// store the encrypted seed after it inits
				s.encryptedSeed = seed
				s.encryptedMnemonic = mnemonic
				s.salt = salt
				return nil
			}).
		Times(1)

	// Now init seed to use for all tests and test initialization process
	returnedMnemonic, err := s.Key.InitSeed(s.mnemonic, s.passphrase)
	s.Assert().Nil(err)
	s.Assert().Equal(s.mnemonic, returnedMnemonic)

	// pregenerate some expected child keys from index to test against
	index1, err := s.Key.masterPrivKey.NewChildKey(1)
	s.Assert().Nil(err)
	s.ExpectedChildKeys = []*bip32.Key{
		index1,
	}
}

func (s *KeySuite) AfterTest(_, _ string) {
	s.MockController.Finish()
}

func TestKey(t *testing.T) {
	suite.Run(t, new(KeySuite))
}

func (s *KeySuite) TestGetKeySuccess() {
	childId := int64(1)

	// Mock setup
	returnedIndex := uint32(1)
	returnedParentIndex := int64(0)
	returnedRootDerivation := int64(1)

	s.MockedState.EXPECT().
		GetChild(gomock.Eq(childId)).
		Return(returnedIndex, returnedParentIndex, returnedRootDerivation, nil).
		Times(1)

		// Under test
	key, _, err := s.Key.GetKey(childId)
	s.Assert().Nil(err)
	s.Assert().Equal(s.ExpectedChildKeys[0], key)
}

func (s *KeySuite) TestUnlockSeed() {
	initialMasterKey := s.Key.masterPrivKey
	initialMnemonic := s.Key.mnemonic

	s.MockedState.EXPECT().
		GetSeed().
		Return(s.encryptedSeed, s.salt, nil).
		Times(1)

	s.MockedState.EXPECT().
		GetMnemonic().
		Return(s.encryptedMnemonic, s.salt, nil).
		Times(1)

	// Under test
	err := s.Key.UnlockSeed(s.passphrase)
	s.Assert().NoError(err)
	s.Assert().Equal(initialMasterKey, s.Key.masterPrivKey)
	s.Assert().Equal(initialMnemonic, s.Key.mnemonic)
}

func (s *KeySuite) TestGetMnemonicSuccess() {
	// it should already be unlocked

	// Under test
	seed, err := s.Key.GetSeed()
	s.Assert().Nil(err)
	s.Assert().Equal(s.mnemonic, seed)
}

func (s *KeySuite) TestEncryptSuccess() {
	seed := bip39.NewSeed(s.mnemonic, "")
	s.Assert().Equal(seed, s.expectedSeed)
	saltString, err := hex.DecodeString(s.salt)
	s.Assert().NoError(err)

	encryptedBytes, returnedSalt, err := encrypt(seed, s.passphrase, saltString, s.Key.encryptionRounds)
	s.Assert().Nil(err)
	s.Assert().Equal(returnedSalt, saltString)

	// now test that it can decrypt properly
	decryptedBytes, err := decrypt(encryptedBytes, s.passphrase, saltString, s.Key.encryptionRounds)
	s.Assert().Nil(err)
	s.Assert().Equal(seed, decryptedBytes)
}

func (s *KeySuite) TestNewSeedSuccess() {
	seed1 := bip39.NewSeed(s.mnemonic, "")
	seed2 := bip39.NewSeed(s.mnemonic, "")
	s.Assert().Equal(seed1, seed2)
}
