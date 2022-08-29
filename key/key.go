package key

import (
	"crypto/aes"
	"crypto/cipher"
	"crypto/ecdsa"
	"crypto/rand"
	"encoding/hex"
	"errors"
	"fmt"

	key_state "github.com/imperviousai/imp-daemon/key/state"
	"github.com/imperviousai/imp-daemon/state"
	"github.com/tyler-smith/go-bip32"
	"github.com/tyler-smith/go-bip39"
	"golang.org/x/crypto/scrypt"
)

//go:generate mockgen --destination=./mock/key_mock.go --package=mock github.com/imperviousai/imp-daemon/key KeyManager

type KeyManager interface {
	// InitSeed creates the master key encrypted with a passphrase, returns the mnemonic
	InitSeed(seedImport string, passphrase string) (string, error)

	// UnlockSeed unlocks the master key with passphrase
	UnlockSeed(passphrase string) error

	// GetSeed gets the seed phrase mnemonic that was used to initialize this daemon
	GetSeed() (string, error)

	IsLocked() bool

	// New Child will create a new child key from the master key.
	// If current index is specified, that will be used. Otherwise generated.
	// Master seed should be unlocked first. Child ID should be tracked
	// by the caller. Private key bytes are also returned.
	NewChild(parentId int64, keyIndex uint32) (int64, []byte, uint32, error)

	// GetChildKey gets the private key bytes for a certain child derrivation.
	GetChildKey(childId int64) ([]byte, error)

	GetIndex(id int64) (uint32, error)

	// GetChildrenKeys gets all the children private keys created from parent
	GetChildrenKeys(parentId int64) ([][]byte, []uint32, error)

	//
	// Specific key algorithms
	//

	// ED25519

	// CreateNewED25519Key will create a new ED25519 keypair and save to DB under the identity key passed in.
	// Returns public key, private key, the backing store ID, and the backing key index.
	CreateNewED25519Key(int64) ([]byte, []byte, int64, uint32, error)

	// Elliptic

	// CreateNewSECP256K1Key will create a new SECP256K1 keypair and save to DB under the identity key passed in.
	// Returns private key, the backing store ID, and the backing key index.
	CreateNewSECP256K1Key(int64) (*ecdsa.PrivateKey, int64, uint32, error)

	// CreateNewP384Key will create a new P384 keypair and save to DB under the identity key passed in.
	// Returns private key, the backing store ID, and the backing key index.
	CreateNewP384Key(int64) (*ecdsa.PrivateKey, int64, uint32, error)

	// Decrypt will attempt to decrypt a message with one of the saved keys
	// Returns the decrypted message as bytes.
	Decrypt(protected, ciphertext, iv, tag string) ([]byte, error)
}

const ENCRYPTION_ROUNDS = 1048576

type keyManager struct {
	state         key_state.KeyState
	masterPrivKey *bip32.Key
	mnemonic      string

	// should not change, but useful for tests
	encryptionRounds int
}

type Config struct {
	Db state.DBManager
}

func New(cfg Config) (KeyManager, error) {
	// Init the key state first
	state, err := key_state.InitKeyState(cfg.Db)
	if err != nil {
		return nil, err
	}

	return &keyManager{
		state:            state,
		encryptionRounds: ENCRYPTION_ROUNDS,
	}, nil
}

func (k *keyManager) InitSeed(seedImport string, passphrase string) (string, error) {
	// Make sure master seed has not been initialized first
	previousSeed, _, err := k.state.GetSeed()
	if err != nil {
		return "", err
	}
	if previousSeed != "" {
		return "", errors.New("Seed has already been initialized")
	}

	if passphrase == "" {
		return "", errors.New("Passphrase is required to create seed")
	}

	var mnemonic string
	// check imported seed, otherwise create one
	if seedImport != "" {
		if !bip39.IsMnemonicValid(seedImport) {
			return "", errors.New("Invalid mnemonic seed")
		}
		mnemonic = seedImport
	} else {
		// Generate a mnemonic for memorization or user-friendly seeds
		entropy, err := bip39.NewEntropy(256)
		if err != nil {
			return "", err
		}
		mnemonic, err = bip39.NewMnemonic(entropy)
		if err != nil {
			return "", err
		}
	}

	// Generate a Bip32 HD wallet for the mnemonic
	// Not using password for bip39, using password for seed encryption
	seed := bip39.NewSeed(mnemonic, "")
	masterKey, err := bip32.NewMasterKey(seed)
	if err != nil {
		return "", err
	}
	k.masterPrivKey = masterKey

	// Now that the master priv key has been generated from seed,
	// save the seed into storage, with password as encryption
	seedEncryptBytes, salt, err := encrypt(seed, passphrase, nil, k.encryptionRounds)
	if err != nil {
		return "", err
	}
	seedEncryptStr := hex.EncodeToString(seedEncryptBytes)

	// We save mnemonic now as well, to return back to user for recovvery kits
	// Use the same salt that we've had above
	mnemonicEncryptBytes, _, err := encrypt([]byte(mnemonic), passphrase, salt, k.encryptionRounds)
	if err != nil {
		return "", err
	}
	mnemonicEncryptStr := hex.EncodeToString(mnemonicEncryptBytes)

	saltStr := hex.EncodeToString(salt)
	err = k.state.SaveSeed(seedEncryptStr, saltStr, mnemonicEncryptStr)
	if err != nil {
		return "", err
	}

	k.mnemonic = mnemonic
	return mnemonic, nil
}

func (k *keyManager) GetSeed() (string, error) {
	if k.mnemonic == "" {
		return "", errors.New("Seed has either not been initialized or currently locked")
	}

	return k.mnemonic, nil
}

func (k *keyManager) UnlockSeed(passphrase string) error {
	// Get the encrypted seed from the store
	encryptedSeed, salt, err := k.state.GetSeed()
	if err != nil {
		return err
	}
	if encryptedSeed == "" {
		return errors.New("Seed has not been initialized, use InitSeed APIs first")
	}

	if passphrase == "" {
		return errors.New("Passphrase is required to unlock seed")
	}

	encryptedSeedBytes, err := hex.DecodeString(encryptedSeed)
	if err != nil {
		return err
	}
	saltBytes, err := hex.DecodeString(salt)
	if err != nil {
		return err
	}

	unencryptedSeed, err := decrypt(encryptedSeedBytes, passphrase, saltBytes, k.encryptionRounds)
	if err != nil {
		return err
	}

	masterKey, err := bip32.NewMasterKey(unencryptedSeed)
	if err != nil {
		return err
	}
	k.masterPrivKey = masterKey

	// Also try to get mnemonic to save in memory too
	encryptedMnemonic, salt, err := k.state.GetMnemonic()
	if err != nil || encryptedMnemonic == "" {
		// Do not return error, initially this was not required
		return nil
	}
	encryptedMnemonicBytes, err := hex.DecodeString(encryptedMnemonic)
	if err != nil {
		return err
	}
	saltBytes, err = hex.DecodeString(salt)
	if err != nil {
		return err
	}
	mnemonic, err := decrypt(encryptedMnemonicBytes, passphrase, saltBytes, k.encryptionRounds)
	if err != nil {
		return err
	}
	k.mnemonic = string(mnemonic)

	return nil
}

func (k *keyManager) IsLocked() bool {
	if k == nil || k.masterPrivKey == nil {
		return true
	}
	return false
}

func (k *keyManager) NewChild(parentId int64, keyIndex uint32) (int64, []byte, uint32, error) {
	if k.masterPrivKey == nil {
		return 0, nil, 0, errors.New("Master key not initialized or unlocked")
	}

	keyIndexSpecified := keyIndex != 0
	var currentIndex uint32
	var err error

	if parentId == 0 && keyIndex == 0 {
		// then requesting child from root
		// TODO for now root derivation is only 1
		currentIndex, err = k.state.GetLastSeedIndex(1)
		if err != nil {
			return 0, nil, 0, err
		}
		keyIndex = currentIndex + 1
	} else {
		currentIndex, err = k.state.GetLastChildIndex(parentId)
		if err != nil {
			return 0, nil, 0, err
		}
		keyIndex = currentIndex + 1
	}

	// Get the parent to make a child out of
	parentKey, _, err := k.GetKey(parentId)
	if err != nil {
		return 0, nil, 0, err
	}

	// Increment, make sure that it is a valid child
	for i := 0; i < 100; i++ {
		newChild, err := parentKey.NewChildKey(keyIndex)
		if err != nil {
			if keyIndexSpecified {
				// do not attempt to increment if caller specified index
				return 0, nil, 0, err
			}
			keyIndex++
			continue
		}

		// now that we know child is good, save it before returning
		keyId, err := k.state.AddChild(keyIndex, parentId)
		if err != nil {
			return 0, nil, 0, err
		}

		return keyId, newChild.Key, keyIndex, nil
	}

	return 0, nil, 0, errors.New("Unknown error derriving child key")
}

func (k *keyManager) GetKey(childId int64) (*bip32.Key, uint32, error) {
	// There is no child parent, must be root
	if childId == 0 {
		return k.masterPrivKey, 0, nil
	}

	// Go get the key details from the db
	index, parentId, rootDerivation, err := k.state.GetChild(childId)
	if err != nil {
		return nil, 0, err
	}

	// if parentId AND rootDerivation are filled in, that can't be
	if parentId != 0 && rootDerivation != 0 {
		return nil, 0, errors.New("Key can't be derrived from a parent AND root")
	}

	// Parent is root, the key is the child's index directly
	if rootDerivation != 0 {
		childKey, err := k.masterPrivKey.NewChildKey(index)
		if err != nil {
			return nil, 0, err
		}
		return childKey, index, nil
	}

	// Derive from the parent key, which could have its own parent
	if parentId != 0 {
		parentKey, _, err := k.GetKey(parentId)
		if err != nil {
			return nil, 0, err
		}

		childKey, err := parentKey.NewChildKey(index)
		if err != nil {
			return nil, 0, err
		}
		return childKey, index, nil
	}

	// If both root derivation and parent id is 0, then error
	return nil, 0, errors.New("Key must have a parent")
}

func (k *keyManager) GetChildKey(childId int64) ([]byte, error) {
	if k.masterPrivKey == nil {
		return nil, errors.New("Master key not initialized or unlocked")
	}

	key, _, err := k.GetKey(childId)
	if err != nil {
		return nil, err
	}

	return key.Key, nil
}

func (k *keyManager) GetIndex(id int64) (uint32, error) {
	if k.masterPrivKey == nil {
		return 0, errors.New("Master key not initialized or unlocked")
	}

	_, index, err := k.GetKey(id)
	if err != nil {
		return 0, err
	}

	return index, nil
}

func (k *keyManager) GetChildrenKeys(parentId int64) ([][]byte, []uint32, error) {
	if k.masterPrivKey == nil {
		return nil, nil, errors.New("Master key not initialized or unlocked")
	}

	parentKey, _, err := k.GetKey(parentId)
	if err != nil {
		return nil, nil, err
	}

	keys, err := k.state.GetChildrenKeys(parentId)
	if err != nil {
		return nil, nil, err
	}

	childrenPrivKeys := make([][]byte, 0)
	childrenIndexes := make([]uint32, 0)

	for _, key := range keys {
		childPrivKey, err := parentKey.NewChildKey(key.Index)
		if err != nil {
			return nil, nil, err
		}

		childrenPrivKeys = append(childrenPrivKeys, childPrivKey.Key)
		childrenIndexes = append(childrenIndexes, key.Index)
	}

	return childrenPrivKeys, childrenIndexes, nil
}

func (k *keyManager) CreateNewED25519Key(identityKey int64) ([]byte, []byte, int64, uint32, error) {
	// get a new child key from the key manager
	keyId, privateBytes, keyIndex, err := k.NewChild(identityKey, 0)
	if err != nil {
		return nil, nil, 0, 0, err
	}

	public, privateKey, err := CreateED25519KeyFromSeed(privateBytes)
	if err != nil {
		return nil, nil, 0, 0, err
	}

	return []byte(public), []byte(privateKey), keyId, keyIndex, nil
}

func (k *keyManager) CreateNewSECP256K1Key(identityKey int64) (*ecdsa.PrivateKey, int64, uint32, error) {
	// get a new child key from the key manager
	keyId, privateBytes, keyIndex, err := k.NewChild(identityKey, 0)
	if err != nil {
		return nil, 0, 0, err
	}

	privateKey, _, _, _, _ := CreateSECP256K1Key(privateBytes)
	if err != nil {
		return nil, 0, 0, err
	}

	return privateKey, keyId, keyIndex, nil
}

func (k *keyManager) CreateNewP384Key(identityKey int64) (*ecdsa.PrivateKey, int64, uint32, error) {
	// get a new child key from the key manager
	keyId, privateBytes, keyIndex, err := k.NewChild(identityKey, 0)
	if err != nil {
		return nil, 0, 0, err
	}

	privateKey, _, _, _, _ := CreateP384Key(privateBytes)
	if err != nil {
		return nil, 0, 0, err
	}

	return privateKey, keyId, keyIndex, nil
}

func (k *keyManager) Decrypt(protected, ciphertext, iv, tag string) ([]byte, error) {
	// Go through all keys to see if one decrypts
	// TODO probably better to check protected field for a certain key before decrypted all
	privateKeys, err := k.getAllKeys()
	if err != nil {
		return nil, err
	}

	for _, privateKey := range privateKeys {
		// For now we only do encryption with P384 keys
		p384Key, _, _, _, _ := CreateP384Key(privateKey)
		if p384Key == nil {
			continue
		}

		// Attempt to decrypt with this key
		jweStr := fmt.Sprintf(`{"protected":"%s","iv":"%s","ciphertext":"%s","tag":"%s"}`,
			protected,
			iv,
			ciphertext,
			tag,
		)

		msgBytes, err := Decrypt(p384Key, jweStr)
		if err != nil || len(msgBytes) == 0 {
			continue
		}

		// Decryption worked with this key, pass back the message
		return msgBytes, nil
	}

	// if we got to the end here, no private key decrypted the msg
	return nil, fmt.Errorf("Could not decrypt message with any of the %d keys", len(privateKeys))
}

func (k keyManager) getAllKeys() ([][]byte, error) {
	parentKeyStates, err := k.state.GetAllParentRootKeys()
	if err != nil {
		return nil, err
	}

	keys := make([][]byte, 0)
	for _, parentKeyState := range parentKeyStates {
		childKeys, _, err := k.GetChildrenKeys(parentKeyState.Id)
		if err != nil {
			return nil, err
		}
		keys = append(keys, childKeys...)

	}

	return keys, nil
}

func encrypt(data []byte, passphrase string, preselectedSalt []byte, encryptionRounds int) ([]byte, []byte, error) {
	key, salt, err := deriveKey([]byte(passphrase), preselectedSalt, encryptionRounds)
	if err != nil {
		return nil, nil, err
	}

	blockCipher, err := aes.NewCipher(key)
	if err != nil {
		return nil, nil, err
	}

	gcm, err := cipher.NewGCM(blockCipher)
	if err != nil {
		return nil, nil, err
	}

	nonce := make([]byte, gcm.NonceSize())
	if _, err = rand.Read(nonce); err != nil {
		return nil, nil, err
	}

	ciphertext := gcm.Seal(nonce, nonce, data, nil)
	return ciphertext, salt, nil
}

func decrypt(data []byte, passphrase string, salt []byte, encryptionRounds int) ([]byte, error) {
	key, _, err := deriveKey([]byte(passphrase), salt, encryptionRounds)
	if err != nil {
		return nil, err
	}

	blockCipher, err := aes.NewCipher(key)
	if err != nil {
		return nil, err
	}

	gcm, err := cipher.NewGCM(blockCipher)
	if err != nil {
		return nil, err
	}

	nonce, ciphertext := data[:gcm.NonceSize()], data[gcm.NonceSize():]

	plaintext, err := gcm.Open(nil, nonce, ciphertext, nil)
	if err != nil {
		return nil, err
	}

	return plaintext, nil
}

func deriveKey(password, salt []byte, encryptionRounds int) ([]byte, []byte, error) {
	if salt == nil {
		salt = make([]byte, 32)
		if _, err := rand.Read(salt); err != nil {
			return nil, nil, err
		}
	}

	key, err := scrypt.Key(password, salt, encryptionRounds, 8, 1, 32)
	if err != nil {
		return nil, nil, err
	}

	return key, salt, nil
}
