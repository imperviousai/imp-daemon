package id

import (
	"crypto/sha256"
	"encoding/base64"
	"encoding/json"
	"errors"
	"strings"

	"github.com/hyperledger/aries-framework-go/pkg/doc/did"
	"github.com/imperviousai/imp-daemon/id/ion"
	id_state "github.com/imperviousai/imp-daemon/id/state"
	"github.com/imperviousai/imp-daemon/key"
	"github.com/imperviousai/imp-daemon/state"
	"github.com/lestrrat-go/jwx/jwa"
	"github.com/lestrrat-go/jwx/jws"
	"github.com/multiformats/go-multihash"
	"go.uber.org/zap"

	canonical "github.com/gibson042/canonicaljson-go"
)

//go:generate mockgen --destination=./mock/ion_mock.go --package=mock github.com/imperviousai/imp-daemon/id Ion

type Ion interface {
	ResolveDid(id string) (*did.Doc, error)
	CreateDid(serviceEndpoints []ion.Service) (*did.Doc, uint32, []uint32, error)
	UpdateDid(newDidUpdates *did.Doc) (*did.Doc, uint32, []uint32, error)
}

type IonConfig struct {
	IonUrl     string
	Db         state.DBManager
	KeyManager key.KeyManager
}

type ionService struct {
	client     ion.Client
	state      id_state.IdentityState
	keyManager key.KeyManager
}

func NewIon(cfg *IonConfig) (Ion, error) {
	state, err := id_state.InitIdentityState(cfg.Db)
	if err != nil {
		return nil, err
	}

	return &ionService{
		client: ion.NewClient(&ion.ClientConfig{
			Url: cfg.IonUrl,
		}),
		state:      state,
		keyManager: cfg.KeyManager,
	}, nil
}

func (i *ionService) ResolveDid(id string) (*did.Doc, error) {
	didResolution, err := i.getDIDResolution(id)
	if err != nil {
		return nil, err
	}

	return didResolution.DIDDocument, nil
}

func (i *ionService) getDIDResolution(id string) (*did.DocResolution, error) {
	didBytes, err := i.client.ResolveDid(id)
	if err != nil {
		return nil, err
	}

	return did.ParseDocumentResolution(didBytes)
}

func (i *ionService) CreateDid(serviceEndpoints []ion.Service) (*did.Doc, uint32, []uint32, error) {
	// Create a new keypair for this DID identity
	identityKeyId, keyIndex, err := i.createNewIdentityKey()
	if err != nil {
		return nil, 0, nil, err
	}

	keyDerivations := make([]uint32, 0)

	// Create a new signing keypair for this DID
	signingPrivateKey, _, signingKeyIndex, err := i.keyManager.CreateNewSECP256K1Key(identityKeyId)
	if err != nil {
		return nil, 0, nil, err
	}
	signingJwk, err := key.EllipticPubkeyToJWK(&signingPrivateKey.PublicKey)
	if err != nil {
		return nil, 0, nil, err
	}
	keyDerivations = append(keyDerivations, signingKeyIndex)

	// Create an encryption key for this DID
	// Create a P384 key for encryption
	p384PrivKey, _, p384KeyIndex, err := i.keyManager.CreateNewP384Key(identityKeyId)
	if err != nil {
		return nil, 0, nil, err
	}

	p384Jwk, err := key.EllipticPubkeyToJWK(&p384PrivKey.PublicKey)
	if err != nil {
		return nil, 0, nil, err
	}
	keyDerivations = append(keyDerivations, p384KeyIndex)

	// Create a new recovery keypair for this DID
	recoveryPrivateKey, _, recoveryKeyIndex, err := i.keyManager.CreateNewSECP256K1Key(identityKeyId)
	if err != nil {
		return nil, 0, nil, err
	}
	recoveryJwk, err := key.EllipticPubkeyToJWK(&recoveryPrivateKey.PublicKey)
	if err != nil {
		return nil, 0, nil, err
	}
	recoveryPubkeyDoubleHash, err := multihashEncode(recoveryJwk, 2)
	if err != nil {
		return nil, 0, nil, err
	}
	keyDerivations = append(keyDerivations, recoveryKeyIndex)

	// Create a new update keypair for this DID
	updatePrivateKey, _, updateKeyIndex, err := i.keyManager.CreateNewSECP256K1Key(identityKeyId)
	if err != nil {
		return nil, 0, nil, err
	}
	updateJwk, err := key.EllipticPubkeyToJWK(&updatePrivateKey.PublicKey)
	if err != nil {
		return nil, 0, nil, err
	}
	updatePubkeyDoubleHash, err := multihashEncode(updateJwk, 2)
	if err != nil {
		return nil, 0, nil, err
	}
	keyDerivations = append(keyDerivations, updateKeyIndex)

	// TODO make this more defined
	createRequest := &ion.CreateRequest{
		Type: "create",
		SuffixData: ion.SuffixData{
			RecoveryCommitment: string(recoveryPubkeyDoubleHash),
		},
		Delta: ion.Delta{
			Patches: []ion.Patches{
				{
					Action: "replace",
					Document: &ion.Document{
						PublicKeys: []ion.PublicKeys{
							{
								ID:           "key-1",
								Type:         "EcdsaSecp256k1VerificationKey2019",
								PublicKeyJwk: *signingJwk,
								Purposes: []string{
									"authentication",
								},
							},
							{
								ID:           "key-2",
								Type:         "JsonWebKey2020",
								PublicKeyJwk: *p384Jwk,
								Purposes: []string{
									"keyAgreement",
								},
							},
						},
					},
				},
			},
			UpdateCommitment: string(updatePubkeyDoubleHash),
		},
	}

	// Add all service endpoints
	// there's a length limit of 1000 bytes, make sure next service endpoint does not put it over that limit
	// TODO if it does, make another request afterwards doing an update
	// for now, immediately return an error
	// excessServiceEndpoints := make([]ion.Services, 0)
	for _, serviceEndpoint := range serviceEndpoints {
		deltaLen, err := json.Marshal(createRequest.Delta)
		if err != nil {
			return nil, 0, nil, err
		}

		//nolint
		servicePatch := ion.Services{
			ID:              serviceEndpoint.ID,
			Type:            serviceEndpoint.Type,
			ServiceEndpoint: serviceEndpoint.ServiceEndpoint,
		}
		serviceLen, err := json.Marshal(servicePatch)
		if err != nil {
			return nil, 0, nil, err
		}

		if len(deltaLen)+len(serviceLen) > 1000 {
			return nil, 0, nil, errors.New("DID document too long")
			// excessServiceEndpoints = append(excessServiceEndpoints, servicePatch)
		} else {
			createRequest.Delta.Patches[0].Document.Services = append(createRequest.Delta.Patches[0].Document.Services, servicePatch)
		}
	}

	deltaHash, err := multihashEncode(createRequest.Delta, 1)
	if err != nil {
		return nil, 0, nil, err
	}
	createRequest.SuffixData.DeltaHash = string(deltaHash)

	zap.L().Debug("Making request to create did", zap.Any("Request", createRequest))
	createdDidResp, err := i.client.UpdateDid(createRequest)
	if err != nil {
		return nil, 0, nil, err
	}
	// TODO check if this decodes to an ION error

	createdDidRes, err := did.ParseDocumentResolution(createdDidResp)
	if err != nil {
		return nil, 0, nil, err
	}
	zap.L().Debug("Created did", zap.Any("did", createdDidRes.DIDDocument))

	// Add to our local SQL database marked as belonging to user
	// Get raw doc
	rawDoc, err := json.Marshal(createdDidRes.DIDDocument)
	if err != nil {
		return nil, 0, nil, err
	}
	err = i.state.SaveID(createdDidRes.DIDDocument.ID, string(rawDoc), true, identityKeyId, "")
	if err != nil {
		// TODO this is not good if it fails here...
		return nil, 0, nil, err
	}

	return createdDidRes.DIDDocument, keyIndex, keyDerivations, nil
}

func (i *ionService) UpdateDid(newDidUpdates *did.Doc) (*did.Doc, uint32, []uint32, error) {
	// First get the latest version of the doc
	didState, err := i.state.FindID(newDidUpdates.ID)
	if err != nil {
		zap.L().Debug("Failed getting did state: " + err.Error())
		return nil, 0, nil, err
	} else if didState == nil {
		zap.L().Debug("Failed finding did to update")
		return nil, 0, nil, errors.New("Did not found")
	}

	if !didState.BelongsToUser {
		return nil, 0, nil, errors.New("Can not update an ION DID that is not yours")
	}

	// Get the latest DID resolution info, needed for updates
	didResolution, err := i.getDIDResolution(newDidUpdates.ID)
	if err != nil {
		zap.L().Debug("Failed resolving did: " + err.Error())
		return nil, 0, nil, err
	}

	// Get the private key parent for this DID
	didKeyId, err := i.state.GetDIDKeyId(newDidUpdates.ID)
	if err != nil {
		return nil, 0, nil, err
	}
	if didKeyId == 0 {
		return nil, 0, nil, errors.New("No did found")
	}
	didKeyIndex, err := i.keyManager.GetIndex(didKeyId)
	if err != nil {
		return nil, 0, nil, errors.New("No did found")
	}

	// Get the derivation from the key manager
	didPrivateKeys, didIndexes, err := i.keyManager.GetChildrenKeys(didKeyId)
	if err != nil {
		return nil, 0, nil, err
	}

	updatePubkeyDoubleHash := didResolution.DocumentMetadata.Method.UpdateCommitment

	// Search through DID private keys to look for double hashed update commitment key
	prevUpdateKey, err := matchSECP256K1KeyHashFromDID(didPrivateKeys, updatePubkeyDoubleHash, 2)
	if err != nil {
		return nil, 0, nil, err
	}
	prevKeyJWK, err := key.EllipticPubkeyToJWK(&prevUpdateKey.PublicKey)
	if err != nil {
		return nil, 0, nil, err
	}
	prevKeyJWKHash, err := multihashEncode(prevKeyJWK, 1)
	if err != nil {
		return nil, 0, nil, err
	}

	// Create a new update keypair for this DID
	zap.L().Debug("creating new update key")
	// TODO save key index for ion even on updates?
	updatePrivateKey, _, updateIndex, err := i.keyManager.CreateNewSECP256K1Key(didKeyId)
	if err != nil {
		return nil, 0, nil, err
	}
	updateJwk, err := key.EllipticPubkeyToJWK(&updatePrivateKey.PublicKey)
	if err != nil {
		return nil, 0, nil, err
	}
	newUpdatePubkeyDoubleHash, err := multihashEncode(updateJwk, 2)
	if err != nil {
		return nil, 0, nil, err
	}
	didIndexes = append(didIndexes, updateIndex)

	// Go through all the delta changes
	patches, err := createIONPatchesFromUpdates(newDidUpdates, didResolution.DIDDocument)
	if err != nil {
		return nil, 0, nil, err
	}

	// Get the DID suffix
	didParts := strings.Split(newDidUpdates.ID, ":")
	if len(didParts) < 3 {
		return nil, 0, nil, errors.New("did ID not valid")
	}
	prefix := didParts[len(didParts)-1]

	req := &ion.UpdateRequest{
		Type:        "update",
		DidSuffix:   prefix,
		RevealValue: string(prevKeyJWKHash),
		Delta: ion.Delta{
			Patches:          patches,
			UpdateCommitment: string(newUpdatePubkeyDoubleHash),
		},
	}
	deltaHash, err := multihashEncode(req.Delta, 1)
	if err != nil {
		return nil, 0, nil, err
	}
	dataToSign := &ion.UpdateDataToSign{
		DeltaHash: string(deltaHash),
		UpdateKey: prevKeyJWK,
	}
	rawData, err := json.Marshal(dataToSign)
	if err != nil {
		return nil, 0, nil, err
	}
	rawDataHash := sha256.Sum256(rawData)

	// Sign the request
	zap.L().Debug("signing request", zap.String("data", string(rawDataHash[:])))
	signedData, err := jws.Sign(rawData, jwa.ES256K, *prevUpdateKey)
	if err != nil {
		zap.L().Error("could not sign data: " + err.Error())
		return nil, 0, nil, err
	}
	req.SignedData = string(signedData)

	// Create the request
	reqJsonBytes, err := json.Marshal(req)
	if err != nil {
		return nil, 0, nil, err
	}

	zap.L().Debug("Making request to update did", zap.ByteString("Request", reqJsonBytes))
	createdDidResp, err := i.client.UpdateDid(req)
	if err != nil {
		zap.L().Error("could not make request: " + err.Error())
		return nil, 0, nil, err
	}
	zap.L().Debug("Made request to update did", zap.Any("response", createdDidResp))

	return newDidUpdates, didKeyIndex, didIndexes, nil
}

func (i *ionService) createNewIdentityKey() (int64, uint32, error) {
	// get a new child key root from the key manager
	keyId, _, keyIndex, err := i.keyManager.NewChild(0, 0)
	if err != nil {
		return 0, 0, err
	}
	return keyId, keyIndex, nil
}

func createIONPatchesFromUpdates(newDidUpdates *did.Doc, oldDidUpdates *did.Doc) ([]ion.Patches, error) {
	patches := make([]ion.Patches, 0)

	// Create a map of services to remove and services to add
	servicesToRemove := make(map[string]did.Service)
	servicesToAdd := make(map[string]did.Service)

	// On the old doc, add to services to remove map
	for _, service := range oldDidUpdates.Service {
		servicesToRemove[service.ID] = service
	}

	// Go through all the new doc services
	// If same service is on the new one, remove from map of services to remove
	// If service is new and not in the services to remove list, then must go in
	// the services to add list.
	for _, newService := range newDidUpdates.Service {
		if existingService, ok := servicesToRemove[newService.ID]; ok {
			// check that all the parameters match, otherwise this is a replacement
			if newService.Type == existingService.Type && newService.ServiceEndpoint == existingService.ServiceEndpoint {
				// remove from list, this is exactly the same
				delete(servicesToRemove, newService.ID)
			} else {
				// leave on services to remove, but add to services to add list
				// this is effectively a replacement of a service ID
				servicesToAdd[newService.ID] = newService
			}
		} else {
			// service was not already existing, add as new service
			servicesToAdd[newService.ID] = newService
		}
	}

	// Add a patch for each service to remove
	// This should happen first chronologically
	// in case there's an addition with the same ID.
	if len(servicesToRemove) > 0 {
		zap.L().Debug("removing services")
		patchesToRemove := make([]string, 0, len(servicesToRemove))
		for _, removeService := range servicesToRemove {
			patchesToRemove = append(patchesToRemove, didShortId(removeService.ID))
		}

		patches = append(patches, ion.Patches{
			Action: "remove-services",
			Ids:    patchesToRemove,
		})
	}

	// Add a patch for each service to add
	if len(servicesToAdd) > 0 {
		zap.L().Debug("adding services")
		patchesToAdd := make([]ion.Services, 0, len(servicesToAdd))
		for _, newService := range servicesToAdd {
			patchesToAdd = append(patchesToAdd, ion.Services{
				ID:              didShortId(newService.ID),
				Type:            newService.Type,
				ServiceEndpoint: newService.ServiceEndpoint,
			})
		}

		patches = append(patches, ion.Patches{
			Action:   "add-services",
			Services: patchesToAdd,
		})
	}

	// TODO have the same algorithm happen to public keys too
	// TODO we have to make sure that the patch is not too big

	return patches, nil
}

func didShortId(longId string) string {
	idShort := ""
	idSplit := strings.Split(longId, "#")
	if len(idSplit) == 1 {
		idShort = idSplit[0]
	} else {
		idShort = idSplit[len(idSplit)-1]
	}
	return idShort
}

func multihashEncode(data interface{}, hashTimes int) ([]byte, error) {
	canonicalData, err := canonical.Marshal(data)
	if err != nil {
		return nil, err
	}
	// Second double hash it as non multihash bytes
	hashedCanonical := canonicalData
	for i := 0; i < hashTimes; i++ {
		shaHash := sha256.Sum256(hashedCanonical)
		hashedCanonical = shaHash[:]
	}

	// Third hash again as multihash sha256
	multiHash, err := multihash.EncodeName(hashedCanonical, "sha2-256")
	if err != nil {
		return nil, err
	}

	// Final base64 url safe encode from bytes
	encodedPubkey := make([]byte, base64.RawURLEncoding.EncodedLen(len(multiHash)))
	base64.RawURLEncoding.Encode(encodedPubkey, multiHash)

	return encodedPubkey, nil
}
