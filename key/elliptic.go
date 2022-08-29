package key

import (
	"crypto/ecdsa"
	"crypto/elliptic"
	"encoding/base64"
	"encoding/hex"
	"encoding/json"
	"errors"
	"fmt"
	"math/big"

	"github.com/ethereum/go-ethereum/crypto/secp256k1"
	"github.com/hyperledger/aries-framework-go/pkg/doc/jose/jwk"
	"gopkg.in/square/go-jose.v2"
)

func CreateSECP256K1Key(privateBytes []byte) (*ecdsa.PrivateKey, []byte, []byte, string, string) {
	priv := hex.EncodeToString(privateBytes)

	var e ecdsa.PrivateKey
	e.D, _ = new(big.Int).SetString(priv, 16)
	e.PublicKey.Curve = secp256k1.S256()
	e.PublicKey.X, e.PublicKey.Y = e.PublicKey.Curve.ScalarBaseMult(e.D.Bytes())
	pub := fmt.Sprintf("%x", elliptic.Marshal(secp256k1.S256(), e.X, e.Y))

	return &e, []byte(priv), []byte(pub), base64.RawURLEncoding.EncodeToString(e.PublicKey.X.Bytes()), base64.RawURLEncoding.EncodeToString(e.PublicKey.Y.Bytes())
}

func CreateP384Key(privateBytes []byte) (*ecdsa.PrivateKey, []byte, []byte, string, string) {
	priv := hex.EncodeToString(privateBytes)

	var e ecdsa.PrivateKey
	e.D, _ = new(big.Int).SetString(priv, 16)
	e.PublicKey.Curve = elliptic.P384()
	e.PublicKey.X, e.PublicKey.Y = e.PublicKey.Curve.ScalarBaseMult(e.D.Bytes())
	pub := fmt.Sprintf("%x", elliptic.Marshal(elliptic.P384(), e.X, e.Y))

	return &e, []byte(priv), []byte(pub), base64.RawURLEncoding.EncodeToString(e.PublicKey.X.Bytes()), base64.RawURLEncoding.EncodeToString(e.PublicKey.Y.Bytes())
}

type EllipticJwk struct {
	Crv string `json:"crv"`
	Kty string `json:"kty"`
	X   string `json:"x"`
	Y   string `json:"y"`
}

func EllipticPubkeyToJWK(pub *ecdsa.PublicKey) (*jwk.JWK, error) {
	curve := pub.Curve.Params().Name
	if curve == "" && pub.Curve == secp256k1.S256() {
		// for some reason, secp256k1 package doesn't include name
		curve = "secp256k1"
	}

	return EllipticParamsToJWK(curve, "EC", pub.X.Bytes(), pub.Y.Bytes())
}

func EllipticParamsToJWK(crv string, kty string, x []byte, y []byte) (*jwk.JWK, error) {
	// We use jwk.JWK instead of jose.JWK because of lack of secp256k1 support in jose
	var jsonWebKey jwk.JWK

	jwtStr := fmt.Sprintf(`{"crv":"%s","kty":"%s","x":"%s","y":"%s"}`,
		crv,
		kty,
		base64.RawURLEncoding.EncodeToString(x),
		base64.RawURLEncoding.EncodeToString(y),
	)

	err := jsonWebKey.UnmarshalJSON([]byte(jwtStr))
	if err != nil {
		return nil, err
	}

	return &jsonWebKey, nil
}

func JWKToElliptic(jsonWebKey *jwk.JWK) (*ecdsa.PublicKey, error) {
	pubKeyBytes, err := jsonWebKey.MarshalJSON()
	if err != nil {
		return nil, err
	}
	var ellipticJwk EllipticJwk
	err = json.Unmarshal(pubKeyBytes, &ellipticJwk)
	if err != nil {
		return nil, err
	}

	var ellipticPub ecdsa.PublicKey

	switch ellipticJwk.Crv {
	case "P-384":
		ellipticPub.Curve = elliptic.P384()
	case "SECP256K1":
		ellipticPub.Curve = secp256k1.S256()
	default:
		return nil, errors.New("Can not support converting this jwk to elliptic public key")
	}

	xBytes, err := base64.RawURLEncoding.DecodeString(ellipticJwk.X)
	if err != nil {
		return nil, err
	}

	yBytes, err := base64.RawURLEncoding.DecodeString(ellipticJwk.Y)
	if err != nil {
		return nil, err
	}

	x := new(big.Int)
	ellipticPub.X = x.SetBytes(xBytes)

	y := new(big.Int)
	ellipticPub.Y = y.SetBytes(yBytes)

	return &ellipticPub, nil
}

func EncryptToEllipticPubkey(pub *ecdsa.PublicKey, msg []byte) (string, error) {
	encrypter, err := jose.NewEncrypter(jose.A256GCM, jose.Recipient{Algorithm: jose.ECDH_ES, Key: pub}, nil)
	if err != nil {
		return "", err
	}
	object, err := encrypter.Encrypt(msg)
	if err != nil {
		return "", err
	}

	serialized := object.FullSerialize()
	return serialized, nil
}

func Decrypt(priv *ecdsa.PrivateKey, encryptedObject string) ([]byte, error) {
	object, err := jose.ParseEncrypted(encryptedObject)
	if err != nil {
		return nil, err
	}

	// Now we can decrypt and get back our original plaintext. An error here
	// would indicate that the message failed to decrypt, e.g. because the auth
	// tag was broken or the message was tampered with.
	return object.Decrypt(priv)
}

func SignElliptic(priv *ecdsa.PrivateKey, keyId string, header string, msg []byte) (string, error) {
	var algorithm string
	switch priv.PublicKey.Curve {
	case elliptic.P384():
		algorithm = string(jose.ES384)
	default:
		return "", errors.New("Can not support signing with this elliptic key")
	}

	jsonWebKey := jose.JSONWebKey{
		KeyID:     keyId,
		Algorithm: algorithm,
		Key:       priv,
	}

	signer, err := jose.NewSigner(jose.SigningKey{Algorithm: jose.ES384, Key: jsonWebKey}, &jose.SignerOptions{
		ExtraHeaders: map[jose.HeaderKey]interface{}{
			jose.HeaderType: header,
		},
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

func VerifyElliptic(pub *ecdsa.PublicKey, signature string) ([]byte, string, error) {
	parsedObject, err := jose.ParseSigned(signature)
	if err != nil {
		return nil, "", err
	}

	var algorithm string
	switch pub.Curve {
	case elliptic.P384():
		algorithm = string(jose.ES384)
	default:
		return nil, "", errors.New("Can not support signing with this elliptic key")
	}
	publicJWK := jose.JSONWebKey{
		Algorithm: algorithm,
		Key:       pub,
	}

	signedMsg, err := parsedObject.Verify(publicJWK)
	if err != nil {
		return nil, "", err
	}

	// Get the signed KID and pass that back
	sigs := parsedObject.Signatures
	if len(sigs) != 1 {
		return nil, "", errors.New("Cannot validate signatures")
	}

	singleSigHeader := sigs[0].Protected
	if singleSigHeader.KeyID == "" {
		return nil, "", errors.New("Cannot validate signature header")
	}

	return signedMsg, singleSigHeader.KeyID, nil

}
