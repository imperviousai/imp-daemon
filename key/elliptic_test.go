package key

import (
	"bytes"
	"crypto/rand"
	"fmt"
	"testing"

	"github.com/square/go-jose/v3"
)

func TestJWKConversion(t *testing.T) {
	// create private key bytes
	privBytes := make([]byte, 32)
	if _, err := rand.Read(privBytes); err != nil {
		t.Error(err)
		return
	}

	// create an Elliptic P-384 key
	p384PrivateKey, _, _, _, _ := CreateP384Key(privBytes)
	if p384PrivateKey == nil {
		t.Error("no private key created")
		return
	}

	// convert key to jwk
	p384JWK, err := EllipticPubkeyToJWK(&p384PrivateKey.PublicKey)
	if err != nil {
		t.Error(err)
		return
	}
	if p384JWK == nil {
		t.Error("no jwk created")
		return
	}

	// turn jwk back to elliptic pubkey
	convertedP384PublicKey, err := JWKToElliptic(p384JWK)
	if err != nil {
		t.Error(err)
		return
	}
	if convertedP384PublicKey == nil {
		t.Error("no converted p384 key created")
		return
	}

	// Compare the values manually
	if convertedP384PublicKey.Curve != p384PrivateKey.PublicKey.Curve {
		t.Error("Converted P384 curve doesnt match original")
		return
	}
	if convertedP384PublicKey.X.Cmp(p384PrivateKey.PublicKey.X) != 0 {
		t.Errorf("Converted P384 X (%d) doesnt match original (%d)", convertedP384PublicKey.X, p384PrivateKey.PublicKey.X)
		return
	}
	if convertedP384PublicKey.Y.Cmp(p384PrivateKey.PublicKey.Y) != 0 {
		t.Errorf("Converted P384 Y (%d) doesnt match original (%d)", convertedP384PublicKey.X, p384PrivateKey.PublicKey.X)
		return
	}
}

func TestEncryptionDecryption(t *testing.T) {
	// create private key bytes
	privBytes := make([]byte, 32)
	if _, err := rand.Read(privBytes); err != nil {
		t.Error(err)
		return
	}

	// create an Elliptic P-384 key
	p384PrivateKey, _, _, _, _ := CreateP384Key(privBytes)
	if p384PrivateKey == nil {
		t.Error("no private key created")
		return
	}

	msg := []byte("hello world")

	encryptionStr, err := EncryptToEllipticPubkey(&p384PrivateKey.PublicKey, msg)
	if err != nil {
		t.Error(err)
		return
	}
	if encryptionStr == "" {
		t.Error("no encryption string created")
		return
	}

	decryptedBytes, err := Decrypt(p384PrivateKey, encryptionStr)
	if err != nil {
		t.Error(err)
		return
	}

	if !bytes.Equal(msg, decryptedBytes) {
		t.Error("Decrypted message is not the same as the encrypted message")
	}
}

func TestP384Sign(t *testing.T) {
	// create private key bytes
	privBytes := make([]byte, 32)
	if _, err := rand.Read(privBytes); err != nil {
		t.Error(err)
		return
	}

	// create an Elliptic P-384 key
	p384PrivateKey, _, _, _, _ := CreateP384Key(privBytes)
	if p384PrivateKey == nil {
		t.Error("no private key created")
		return
	}

	// put private key inside a json web key
	jsonWebKey := jose.JSONWebKey{
		KeyID:     "did:example:alice#key-1",
		Algorithm: string(jose.ES384),
		Key:       p384PrivateKey,
	}

	signer, err := jose.NewSigner(jose.SigningKey{Algorithm: jose.ES384, Key: jsonWebKey}, &jose.SignerOptions{
		ExtraHeaders: map[jose.HeaderKey]interface{}{
			jose.HeaderType: "application/didcomm-signed+json",
		},
	})
	if err != nil {
		t.Error("no signer created")
		return
	}

	msg := "hello world"

	object, err := signer.Sign([]byte(msg))
	if err != nil {
		t.Error("sign failure")
		return
	}
	serialized := object.FullSerialize()
	fmt.Println(serialized)

	parsedObject, err := jose.ParseSigned(serialized)
	if err != nil {
		t.Error("serialize error")
		return
	}

	publicJWK := jose.JSONWebKey{
		KeyID:     "did:example:alice#key-1",
		Algorithm: string(jose.ES384),
		Key:       p384PrivateKey.Public(),
	}

	output, err := parsedObject.Verify(publicJWK)
	if err != nil {
		t.Error("verify error")
		return
	}

	if string(output) != msg {
		t.Error("Signature does not match")
		return
	}
}
