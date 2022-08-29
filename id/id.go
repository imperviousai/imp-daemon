package id

import (
	"bytes"
	"crypto/ecdsa"
	"encoding/json"
	"errors"
	"fmt"
	"io"
	"net/http"
	"strings"

	"github.com/hyperledger/aries-framework-go/component/storageutil/mem"
	"github.com/hyperledger/aries-framework-go/pkg/doc/did"
	"github.com/hyperledger/aries-framework-go/pkg/framework/aries/api/vdr"
	"github.com/hyperledger/aries-framework-go/pkg/vdr/peer"
	mockable_http "github.com/imperviousai/imp-daemon/http"
	"github.com/imperviousai/imp-daemon/id/ion"
	id_state "github.com/imperviousai/imp-daemon/id/state"
	"github.com/imperviousai/imp-daemon/key"
	"github.com/imperviousai/imp-daemon/state"
	jsonpatch_create "github.com/mattbaird/jsonpatch"
	"go.uber.org/zap"
	"gopkg.in/square/go-jose.v2"
)

//go:generate mockgen --destination=./mock/identity_mock.go --package=mock github.com/imperviousai/imp-daemon/id Identity

type Identity interface {
	ResolveDID(did string) (*did.Doc, string, error)
	UpdateDID(documentPatch string) (*DIDUpdateInfo, error)
	CreateDID(didType string, serviceEndpoints []Service) (*DIDUpdateInfo, error)
	DeleteDID(did string) error
	BackupDID(did string) (*DIDUpdateInfo, error)
	RecoverDID(*DIDUpdateInfo) error
	ImportDID(document, longFormDID string) error
	ListDIDs() ([]*did.Doc, error)
	GetLastUserDID() (*did.Doc, string, error)
	GetUserDIDs() ([]did.Doc, error)

	SignWithDID(did string, msg []byte) (string, error)
	VerifyFromDID(didStr string, msg string) ([]byte, error)
}

type identity struct {
	peerIdService         vdr.VDR
	state                 id_state.IdentityState
	ion                   Ion
	keyManager            key.KeyManager
	universalResolverUrls []string
	httpClient            mockable_http.HttpClient
}

type DIDUpdateInfo struct {
	DID            string   `json:"did"`
	LongFormDID    string   `json:"longFormDID"`
	Document       *did.Doc `json:"document"`
	DIDDerivation  uint32   `json:"didDerivation"`
	KeyDerivations []uint32 `json:"keyDerivations"`
}

type Config struct {
	Db                    state.DBManager
	Ion                   Ion
	KeyManager            key.KeyManager
	UniversalResolverUrls []string
}

func New(cfg Config) (Identity, error) {
	// Init the identity state database first
	state, err := id_state.InitIdentityState(cfg.Db)
	if err != nil {
		return nil, err
	}

	// TODO a real storage provider
	storageProvider := mem.NewProvider()
	peerIdService, err := peer.New(storageProvider)
	if err != nil {
		return nil, err
	}

	return &identity{
		peerIdService: &VDR{
			childVDR:   peerIdService,
			state:      state,
			keyManager: cfg.KeyManager,
		},
		state:                 state,
		ion:                   cfg.Ion,
		keyManager:            cfg.KeyManager,
		universalResolverUrls: cfg.UniversalResolverUrls,
		httpClient:            &http.Client{},
	}, nil
}

func (i *identity) createNewIdentityKey() (int64, uint32, error) {
	// get a new child key root from the key manager
	keyId, _, keyIndex, err := i.keyManager.NewChild(0, 0)
	if err != nil {
		return 0, 0, err
	}
	return keyId, keyIndex, nil
}

func (i *identity) CreateDID(didType string, serviceEndpoints []Service) (*DIDUpdateInfo, error) {
	if didType == "ION" {
		//  convert service endpoint for ION version
		ionServiceEndpoints := make([]ion.Service, 0, len(serviceEndpoints))
		for _, serviceEndpoint := range serviceEndpoints {
			ionServiceEndpoints = append(ionServiceEndpoints, ion.Service{
				ID:              serviceEndpoint.ID,
				Type:            serviceEndpoint.Type,
				ServiceEndpoint: serviceEndpoint.ServiceEndpoint,
			})
		}

		ionDIDDoc, didKeyId, keyDerivations, err := i.ion.CreateDid(ionServiceEndpoints)
		if err != nil {
			return nil, err
		}
		if ionDIDDoc == nil {
			return nil, errors.New("Did not created")
		}

		return &DIDUpdateInfo{
			DID:            ionDIDDoc.ID,
			LongFormDID:    ionDIDDoc.ID, // longform DIDs for ION not yet supported, return back normal ID
			Document:       ionDIDDoc,
			DIDDerivation:  didKeyId,
			KeyDerivations: keyDerivations,
		}, nil
	}

	if didType == "PEER" {
		peerDIDDoc, longform, didKeyId, keyDerivations, err := i.createPeerDID(serviceEndpoints)
		if err != nil {
			return nil, err
		}
		return &DIDUpdateInfo{
			DID:            peerDIDDoc.ID,
			LongFormDID:    longform,
			Document:       peerDIDDoc,
			DIDDerivation:  didKeyId,
			KeyDerivations: keyDerivations,
		}, nil
	}

	return nil, errors.New("Could not create DID type: " + didType)
}

func (i *identity) DeleteDID(did string) error {
	zap.L().Debug("Deleting DID", zap.Any("did", did))
	return i.state.DeleteID(did)
}

func (i *identity) BackupDID(did string) (*DIDUpdateInfo, error) {
	zap.L().Debug("Backing up DID", zap.Any("did", did))

	// Get the latest state of the did first
	didDoc, longformDid, err := i.ResolveDID(did)
	if err != nil {
		return nil, err
	}

	didDerivationId, err := i.state.GetDIDKeyId(did)
	if err != nil {
		return nil, err
	}

	didDerivationIndex, err := i.keyManager.GetIndex(didDerivationId)
	if err != nil {
		return nil, err
	}

	_, didIndexes, err := i.keyManager.GetChildrenKeys(didDerivationId)
	if err != nil {
		return nil, err
	}

	return &DIDUpdateInfo{
		DID:            did,
		LongFormDID:    longformDid,
		Document:       didDoc,
		DIDDerivation:  didDerivationIndex,
		KeyDerivations: didIndexes,
	}, nil
}

func (i *identity) RecoverDID(recoveryKit *DIDUpdateInfo) error {
	// Import the parent key that is derived directly off of seed
	parentKeyId, _, _, err := i.keyManager.NewChild(0, recoveryKit.DIDDerivation)
	if err != nil {
		return err
	}

	// Import the children keys that is derived by the parent key id just inserted
	for _, childKeyIndex := range recoveryKit.KeyDerivations {
		_, _, _, err := i.keyManager.NewChild(parentKeyId, childKeyIndex)
		if err != nil {
			return err
		}
	}

	// Import the identity itself:
	// - short form did
	// - original resolved document
	// - belongs to user flag marked true
	// - the parent identity key id inserted above
	// - any signed ietf patches if the longform DID is passed through
	// - added date as now()

	// if identity is ION, resolve the document, no patches needed
	document := ""
	patches := ""

	switch {
	case strings.HasPrefix(recoveryKit.DID, "did:ion:"):
		// parse the resolved doc
		didDoc, _, err := i.ResolveDID(recoveryKit.DID)
		if err != nil {
			return err
		}
		documentBytes, err := json.Marshal(didDoc)
		if err != nil {
			return err
		}
		document = string(documentBytes)
	case strings.HasPrefix(recoveryKit.DID, "did:peer:"):
		// parse the resolved doc
		initialDoc, err := parseInitialStateFromLongFormDID(recoveryKit.LongFormDID)
		if err != nil {
			return err
		}
		documentBytes, err := json.Marshal(initialDoc)
		if err != nil {
			return err
		}
		document = string(documentBytes)

		// now parse the patches
		longFormPatches, err := parsePatchFromLongFormDID(recoveryKit.LongFormDID)
		if err != nil {
			return err
		}
		if longFormPatches != nil {
			parsedPatches, err := jose.ParseSigned(string(longFormPatches))
			if err != nil {
				return err
			}

			patches = parsedPatches.FullSerialize()
		}

	default:
		return errors.New("can only import ion or peer dids")
	}

	return i.state.SaveID(recoveryKit.DID, document, true, parentKeyId, patches)
}

func (i *identity) ResolveDID(id string) (*did.Doc, string, error) {
	if strings.HasPrefix(id, "did:peer:") {
		return i.resolvePeerDID(id)
	}

	// If an ION did and the user has ion configured
	if strings.HasPrefix(id, "did:ion:") && i.ion != nil {
		didResp, err := i.ion.ResolveDid(id)
		if err != nil {
			return nil, "", err
		}
		zap.L().Debug("Got an ion DID back from node", zap.Any("document", didResp))
		// ION dids do not have longform for now
		return didResp, "", nil
	}

	// not a peer did, try to resolve it with the global resolver API
	zap.L().Debug("Could not check DID locally, fetching globally",
		zap.String("did", id),
	)
	didResponse, err := i.universalResolver(id)
	if err != nil {
		return nil, "", err
	}

	// for globally resolved dids, do not pass back long form did for now
	return didResponse.Document, "", nil
}

func (i *identity) universalResolver(id string) (*ResolveDIDResponse, error) {
	for _, resolverUrl := range i.universalResolverUrls {
		req, err := http.NewRequest("GET", resolverUrl+id, nil)
		if err != nil {
			continue
		}
		req.Header.Add("Accept", "application/ld+json;profile=\"https://w3id.org/did-resolution\"")
		resp, err := i.httpClient.Do(req)
		if err != nil {
			continue
		}
		defer resp.Body.Close()

		bodyBytes, err := io.ReadAll(resp.Body)
		if err != nil {
			continue
		}
		parsedDocRes, err := tryParseDIDResolution(bodyBytes)
		if err != nil {
			zap.L().Error("could not decode did resolution body",
				zap.Error(err),
				zap.String("did", string(bodyBytes)),
			)
			continue
		}

		// didResponse.Document = &didDoc
		return &ResolveDIDResponse{
			Document: parsedDocRes.DIDDocument,
		}, nil
	}
	return nil, errors.New("could not resolve ID")
}

func (i *identity) ImportDID(document, longFormDID string) error {
	var didDoc *did.Doc
	var err error
	if document == "" {
		// parse the document from the long form DID if `initialState` is present
		// TODO parse json patches to if present
		if longFormDID == "" {
			return errors.New("DID Document or longFormDID must be present")
		}
		didDoc, err = parseInitialStateFromLongFormDID(longFormDID)
		if err != nil {
			return err
		}
		documentJson, err := didDoc.JSONBytes()
		if err != nil {
			return err
		}
		document = string(documentJson)
	} else {
		didDoc, err = did.ParseDocument([]byte(document))
		if err != nil {
			return err
		}
	}

	// store the did
	// default imports are not belonging to the user
	return i.state.SaveID(didDoc.ID, document, false, 0, "")
}

func (i *identity) ListDIDs() ([]*did.Doc, error) {
	didStrings, err := i.state.ListIDs()
	if err != nil {
		return nil, err
	}

	didDocs := make([]*did.Doc, 0)
	for _, didString := range didStrings {
		// TODO with patches
		didDoc, err := did.ParseDocument([]byte(didString.Document))
		if err != nil {
			return nil, err
		}

		didDocs = append(didDocs, didDoc)
	}

	return didDocs, nil
}

func (i *identity) GetLastUserDID() (*did.Doc, string, error) {
	userDids, err := i.state.FindOwnDID()
	if err != nil {
		return nil, "", err
	}
	if len(userDids) < 1 {
		return nil, "", errors.New("no dids found")
	}

	userDidString := userDids[0].Document

	didDoc, err := did.ParseDocument([]byte(userDidString))
	if err != nil {
		return nil, "", err
	}

	originalRawDoc, err := json.Marshal(didDoc)
	if err != nil {
		return nil, "", err
	}
	longFormDID := formatLongFormDID(didDoc.ID, originalRawDoc, []byte(userDids[0].Patches))

	return didDoc, longFormDID, nil
}

func (i *identity) GetUserDIDs() ([]did.Doc, error) {
	userDidStates, err := i.state.FindOwnDID()
	if err != nil {
		return nil, err
	}
	if len(userDidStates) < 1 {
		return nil, errors.New("no dids found")
	}

	userDIDs := make([]did.Doc, 0)
	for _, userDidState := range userDidStates {
		didDoc, err := did.ParseDocument([]byte(userDidState.Document))
		if err != nil {
			return nil, err
		}
		userDIDs = append(userDIDs, *didDoc)
	}

	return userDIDs, nil
}

func (i *identity) UpdateDID(documentPatch string) (*DIDUpdateInfo, error) {
	patchDoc, err := did.ParseDocument([]byte(documentPatch))
	if err != nil {
		return nil, err
	}

	if strings.Split(patchDoc.ID, ":")[1] == "ion" {
		// ION ID
		updatedDid, didDerivation, keyDerivations, err := i.ion.UpdateDid(patchDoc)
		if err != nil {
			return nil, err
		}
		return &DIDUpdateInfo{
			DID:            updatedDid.ID,
			Document:       updatedDid,
			DIDDerivation:  didDerivation,
			KeyDerivations: keyDerivations,
		}, nil
	} else {
		// Peer ID
		updatedDid, longform, didDerivation, keyDerivations, err := i.updateUserPeerDID(patchDoc)
		if err != nil {
			return nil, err
		}

		return &DIDUpdateInfo{
			DID:            updatedDid.ID,
			LongFormDID:    longform,
			Document:       updatedDid,
			DIDDerivation:  didDerivation,
			KeyDerivations: keyDerivations,
		}, nil
	}
}

func (i *identity) SignWithDID(didStr string, msg []byte) (string, error) {
	// Get the latest DID resolution info, needed for updates
	didDoc, _, err := i.ResolveDID(didStr)
	if err != nil {
		zap.L().Debug("Failed resolving did: " + err.Error())
		return "", err
	}

	// Get the private key parent for this DID
	didKeyId, err := i.state.GetDIDKeyId(didDoc.ID)
	if err != nil {
		return "", err
	}
	if didKeyId == 0 {
		return "", errors.New("No did found")
	}

	// Get the derivation from the key manager
	didPrivateKeys, didKeyIndexes, err := i.keyManager.GetChildrenKeys(didKeyId)
	if err != nil {
		return "", err
	}

	// find a p384 signing key for this DID
	keyId, p384SigningKey, err := matchP384KeyFromDID(didPrivateKeys, didDoc)
	if err != nil {
		zap.L().Debug("could not find signing key",
			zap.String("did", didStr),
			zap.Int64("did_key", didKeyId),
			zap.Uint32s("didKeyIndexes", didKeyIndexes),
		)
		return "", err
	}

	return key.SignElliptic(p384SigningKey, keyId, "application/didcomm-signed+json", msg)
}

func (i *identity) VerifyFromDID(didStr string, msg string) ([]byte, error) {
	// Get the latest DID resolution info, needed for updates
	didDoc, _, err := i.ResolveDID(didStr)
	if err != nil {
		zap.L().Debug(fmt.Sprintf("Failed resolving did %s: %s", didStr, err.Error()))
		return nil, err
	}

	return i.verifyFromDIDDoc(didDoc, msg)
}

func (i *identity) verifyFromDIDDoc(didDoc *did.Doc, msg string) ([]byte, error) {
	for _, verification := range didDoc.VerificationMethod {
		pubKey := verification.JSONWebKey()
		if pubKey == nil {
			continue
		}

		ellipticKey, err := key.JWKToElliptic(pubKey)
		if err != nil {
			continue
		}

		verifiedMessage, kid, err := key.VerifyElliptic(ellipticKey, msg)
		if err != nil {
			continue
		}
		// KID has to equal this verification key ID
		if kid != verification.ID {
			continue
		}

		return verifiedMessage, nil
	}

	return nil, errors.New("Could not verify signature")
}

/*
func matchED25519KeyFromDID(storedPrivateKeys [][]byte, didDocument *did.Doc) (string, ed25519.PrivateKey, error) {
	for _, storedPrivateKey := range storedPrivateKeys {
		pubKey, privKey, err := key.CreateED25519KeyFromSeed(storedPrivateKey)
		if err != nil {
			return "", nil, err
		}
		pubKeyBase58 := base58.Encode(pubKey)

		for _, verification := range didDocument.VerificationMethod {
			zap.L().Debug("Checked verification key",
				zap.String("verification", string(verification.Value)),
			)
			if pubKeyBase58 == string(verification.Value) {
				return verification.ID, privKey, nil
			}
		}
	}

	return "", nil, errors.New("Could not find private key for DID")
}
*/

func matchP384KeyFromDID(storedPrivateKeys [][]byte, didDocument *did.Doc) (string, *ecdsa.PrivateKey, error) {
	for _, storedPrivateKey := range storedPrivateKeys {
		privKey, _, _, _, _ := key.CreateP384Key(storedPrivateKey)
		storedKeyJWK, err := key.EllipticParamsToJWK("P-384", "EC", privKey.PublicKey.X.Bytes(), privKey.PublicKey.Y.Bytes())
		if err != nil {
			return "", nil, err
		}
		storedKeyBytes, err := json.Marshal(storedKeyJWK)
		if err != nil {
			return "", nil, err
		}

		for _, auth := range didDocument.VerificationMethod {
			authKeyBytes, err := json.Marshal(auth.JSONWebKey())
			if err != nil {
				continue
			}

			// TODO only auth keys
			if bytes.Equal(storedKeyBytes, authKeyBytes) {
				return auth.ID, privKey, nil
			}
		}
	}

	return "", nil, errors.New("Could not find p384 private key for DID")
}

func matchSECP256K1KeyHashFromDID(storedPrivateKeys [][]byte, updateCommitment string, hashTimes int) (privateKey *ecdsa.PrivateKey, err error) {
	for _, storedPrivateKey := range storedPrivateKeys {
		privKey, _, _, x, y := key.CreateSECP256K1Key(storedPrivateKey)
		if err != nil {
			return nil, err
		}

		storedKeyJWK := &ion.PublicKeyJwk{
			Kty: "EC",
			Crv: "secp256k1",
			X:   x,
			Y:   y,
		}
		storedKeyHash, err := multihashEncode(storedKeyJWK, hashTimes)
		if err != nil {
			return nil, err
		}

		if string(storedKeyHash) == updateCommitment {
			return privKey, nil
		}
	}

	return nil, errors.New("Could not find private key for DID")
}

func tryParseDIDResolution(preRes []byte) (*did.DocResolution, error) {
	var relaxedDoc RelaxedDoc
	err := json.Unmarshal(preRes, &relaxedDoc)
	if err != nil {
		return nil, err
	}

	if len(relaxedDoc.DidDocument.Context) == 0 {
		relaxedDoc.DidDocument.Context = []string{
			"https://www.w3.org/ns/did/v1",
		}
	}
	relaxedDocBytes, err := json.Marshal(relaxedDoc)
	if err != nil {
		return nil, err
	}

	parsedRelaxedDocRes, err := did.ParseDocumentResolution(relaxedDocBytes)
	if err != nil {
		return nil, err
	}

	return parsedRelaxedDocRes, nil
}

type ResolveDIDResponse struct {
	ResolutionMetadata *DidResolutionMetadata `json:"didResolutionMetadata"`
	Document           *did.Doc               `json:"didDocument"`
	DocumentMetadata   *DidDocumentMetadata   `json:"didDocumentMetadata"`
}

type RelaxedDoc struct {
	Context     string `json:"@context"`
	DidDocument struct {
		Context            []string    `json:"@context"`
		ID                 string      `json:"id"`
		VerificationMethod interface{} `json:"verificationMethod"`
		Service            interface{} `json:"service"`
		Authentication     interface{} `json:"authentication"`
		KeyAgreement       interface{} `json:"keyAgreement"`
		AssertionMethod    interface{} `json:"assertionMethod"`
	} `json:"didDocument"`
	DidResolutionMetadata interface{} `json:"didResolutionMetadata"`
	DidDocumentMetadata   interface{} `json:"didDocumentMetadata"`
}

type DidResolutionMetadata struct {
	Pattern   string `json:"pattern"`
	DriverURL string `json:"driverUrl"`
	Duration  int    `json:"duration"`
	Did       struct {
		DidString        string `json:"didString"`
		MethodSpecificID string `json:"methodSpecificId"`
		Method           string `json:"method"`
	} `json:"did"`
	ContentType   string `json:"contentType"`
	ConvertedFrom string `json:"convertedFrom"`
	ConvertedTo   string `json:"convertedTo"`
}

type VerificationMethod struct {
	ID           string `json:"id"`
	Controller   string `json:"controller"`
	Type         string `json:"type"`
	PublicKeyJwk struct {
		Kty string `json:"kty"`
		Crv string `json:"crv"`
		X   string `json:"x"`
		Y   string `json:"y"`
	} `json:"publicKeyJwk"`
}

type Service struct {
	ID              string `json:"id"`
	Type            string `json:"type"`
	ServiceEndpoint string `json:"serviceEndpoint"`
}

type DidDocumentMetadata struct {
	Method struct {
		Published          bool   `json:"published"`
		RecoveryCommitment string `json:"recoveryCommitment"`
		UpdateCommitment   string `json:"updateCommitment"`
	} `json:"method"`
	CanonicalID string `json:"canonicalId"`
}

type PatchJson struct {
	IetfJsonPatch []jsonpatch_create.JsonPatchOperation `json:"ietf-json-patch"`
}
