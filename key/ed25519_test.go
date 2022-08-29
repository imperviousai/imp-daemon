package key

import (
	"crypto/ed25519"
	"crypto/rand"
	"encoding/hex"
	"fmt"
	"testing"

	"github.com/golang-jwt/jwt"
	"github.com/square/go-jose/v3"
)

func TestED25519Sign(t *testing.T) {
	// create private key bytes
	privBytes := make([]byte, 32)
	if _, err := rand.Read(privBytes); err != nil {
		t.Error(err)
		return
	}

	privateKey := ed25519.NewKeyFromSeed(privBytes)
	_, ok := privateKey.Public().(ed25519.PublicKey)
	if !ok {
		t.Error("no public key created")
	}

	msg := "hello world"
	signature := ed25519.Sign(privateKey, []byte(msg))

	fmt.Println(string(signature))
	fmt.Println(hex.EncodeToString(signature))

	fmt.Println(jwt.EncodeSegment(signature))

	// put private key inside a json web key
	jsonWebKey := jose.JSONWebKey{
		KeyID:     "did:example:alice#key-1",
		Algorithm: string(jose.EdDSA),
		Key:       privateKey,
	}

	signer, err := jose.NewSigner(jose.SigningKey{Algorithm: jose.EdDSA, Key: jsonWebKey}, &jose.SignerOptions{
		ExtraHeaders: map[jose.HeaderKey]interface{}{
			jose.HeaderType: "application/didcomm-signed+json",
		},
	})
	if err != nil {
		t.Error("no signer created")
	}

	object, err := signer.Sign([]byte(msg))
	if err != nil {
		t.Error("sign failure")
	}
	serialized := object.FullSerialize()
	fmt.Println(serialized)

	parsedObject, err := jose.ParseSigned(serialized)
	if err != nil {
		t.Error("serialize error")
	}

	publicJWK := jose.JSONWebKey{
		KeyID:     "did:example:alice#key-1",
		Algorithm: string(jose.EdDSA),
		Key:       privateKey.Public(),
	}

	output, err := parsedObject.Verify(publicJWK)
	if err != nil {
		t.Error("verify error")
	}

	if string(output) != msg {
		t.Error("Signature does not match")
	}
}
