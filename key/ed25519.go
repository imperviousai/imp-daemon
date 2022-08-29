package key

import (
	"crypto/ed25519"
	"errors"

	"github.com/square/go-jose/v3"
)

func CreateED25519KeyFromSeed(privateBytes []byte) ([]byte, []byte, error) {
	privateKey := ed25519.NewKeyFromSeed(privateBytes)
	public, ok := privateKey.Public().(ed25519.PublicKey)
	if !ok {
		return nil, nil, errors.New("Error parsing public key")
	}
	return []byte(public), []byte(privateKey), nil
}

func SignED25519(priv *ed25519.PrivateKey, keyId string, header string, msg []byte) (string, error) {
	jsonWebKey := jose.JSONWebKey{
		KeyID:     keyId,
		Algorithm: string(jose.EdDSA),
		Key:       priv,
	}

	var extraHeaders map[jose.HeaderKey]interface{}
	if header != "" {
		extraHeaders = map[jose.HeaderKey]interface{}{
			jose.HeaderType: header,
		}
	}

	signer, err := jose.NewSigner(jose.SigningKey{Algorithm: jose.EdDSA, Key: jsonWebKey}, &jose.SignerOptions{
		ExtraHeaders: extraHeaders,
	})
	if err != nil {
		return "", err
	}

	object, err := signer.Sign([]byte(msg))
	if err != nil {
		return "", err
	}
	serialized := object.FullSerialize()
	return serialized, nil
}

func VerifyED25519(pub *ed25519.PublicKey, signature string) ([]byte, error) {
	parsedObject, err := jose.ParseSigned(signature)
	if err != nil {
		return nil, err
	}

	publicJWK := jose.JSONWebKey{
		Algorithm: string(jose.EdDSA),
		Key:       pub,
	}

	return parsedObject.Verify(publicJWK)
}
