package id

import (
	"encoding/base64"
	"encoding/json"
	"errors"
	"fmt"
	"net/url"
	"strings"

	jsonpatch "github.com/evanphx/json-patch/v5"
	"github.com/hyperledger/aries-framework-go/pkg/doc/did"
	"github.com/hyperledger/aries-framework-go/pkg/framework/aries/api/vdr"
	"github.com/imperviousai/imp-daemon/key"
	jsonpatch_create "github.com/mattbaird/jsonpatch"
	"github.com/mr-tron/base58"
	"go.uber.org/zap"
	"gopkg.in/square/go-jose.v2"
)

func (i *identity) createPeerDID(serviceEndpoints []Service) (*did.Doc, string, uint32, []uint32, error) {
	// Create a new keypair for this DID identity
	identityKeyId, identityKeyIndex, err := i.createNewIdentityKey()
	if err != nil {
		return nil, "", 0, nil, err
	}

	keyDerivations := make([]uint32, 0)

	// Now that we have a identity key parent, create a priv/pub child from it
	// This is for signing
	public, _, _, ed25519KeyIndex, err := i.keyManager.CreateNewED25519Key(identityKeyId)
	if err != nil {
		return nil, "", 0, nil, err
	}
	verificationMethod := base58.Encode(public)
	keyDerivations = append(keyDerivations, ed25519KeyIndex)

	// Create a P384 key for encryption
	p384PrivKey, _, p384KeyIndex, err := i.keyManager.CreateNewP384Key(identityKeyId)
	if err != nil {
		return nil, "", 0, nil, err
	}
	keyDerivations = append(keyDerivations, p384KeyIndex)

	p384Jwk, err := key.EllipticPubkeyToJWK(&p384PrivKey.PublicKey)
	if err != nil {
		return nil, "", 0, nil, err
	}

	p384JwkVerificationMethod, err := did.NewVerificationMethodFromJWK("#keys-2", "JsonWebKey2020", "#ID", p384Jwk)
	if err != nil {
		return nil, "", 0, nil, err
	}

	sampleDidDoc := &did.Doc{
		Context: []string{
			"https://www.w3.org/ns/did/v1",
			"https://www.w3.org/ns/did/v2",
		},
		VerificationMethod: []did.VerificationMethod{
			{
				ID:         "#keys-1",
				Type:       "Ed25519VerificationKey2018",
				Controller: "#ID",
				Value:      []byte(verificationMethod),
			},
		},
		KeyAgreement: []did.Verification{
			{
				VerificationMethod: *p384JwkVerificationMethod,
				Relationship:       did.KeyAgreement,
				Embedded:           true,
			},
		},
	}
	// Add service endpoints
	for _, serviceEndpoint := range serviceEndpoints {
		sampleDidDoc.Service = append(sampleDidDoc.Service, did.Service{
			ID:              serviceEndpoint.ID,
			Type:            serviceEndpoint.Type,
			ServiceEndpoint: serviceEndpoint.ServiceEndpoint,
			Properties:      map[string]interface{}{},
		})
	}

	zap.L().Debug("About to create DID",
		zap.Any("did", sampleDidDoc),
	)

	createdDid, err := i.peerIdService.Create(sampleDidDoc, vdr.WithOption("store", false))
	if err != nil {
		return nil, "", 0, nil, err
	}

	zap.L().Debug("Created did", zap.Any("did", createdDid))

	// Add to our local SQL database marked as belonging to user
	// Get raw doc
	rawDoc, err := json.Marshal(createdDid.DIDDocument)
	if err != nil {
		return nil, "", 0, nil, err
	}

	// TODO integrate it with peer store
	err = i.state.SaveID(createdDid.DIDDocument.ID, string(rawDoc), true, identityKeyId, "")
	if err != nil {
		return nil, "", 0, nil, err
	}

	// Encode initial state into long form DID
	initialStateDID := createdDid.DIDDocument.ID + "?initialState=" + base64.URLEncoding.EncodeToString(rawDoc)

	return createdDid.DIDDocument, initialStateDID, identityKeyIndex, keyDerivations, nil
}

func (i *identity) resolvePeerDID(id string) (*did.Doc, string, error) {
	// check to first see if we have it locally
	mainDIDStr := strings.Split(id, "?")[0]
	idState, err := i.state.FindID(mainDIDStr)
	if err != nil {
		return nil, "", err
	}

	var initialDoc *did.Doc
	if idState != nil && idState.Document != "" {
		// Found stored did locally, return what we have
		didDoc, err := did.ParseDocument([]byte(idState.Document))
		if err != nil {
			return nil, "", err
		}
		initialDoc = didDoc
	} else {
		// check if did has an initial state to load from
		initialStateDID, err := parseInitialStateFromLongFormDID(id)
		if err != nil || initialStateDID == nil {
			// return error because no internal state for did
			// and could not load initial state from ID
			return nil, "", errors.New("Did not found")
		}

		// save this DID into the DB now
		jsonBytes, err := initialStateDID.JSONBytes()
		if err != nil {
			return nil, "", err
		}
		err = i.state.SaveID(initialStateDID.ID, string(jsonBytes), false, 0, "")
		if err != nil {
			return nil, "", err
		}

		initialDoc = initialStateDID
	}

	if initialDoc == nil {
		return nil, "", errors.New("DID not found")
	}

	// Whether the DID was in DB or loaded from long form,
	// check if there are any patches to apply on top of
	// initial/current state
	initialPatches := ""
	currentDocWithPatches := initialDoc
	longFormPatches, err := parsePatchFromLongFormDID(id)
	if err != nil {
		return nil, "", err
	}
	if idState != nil {
		// We might have already saved some patches,
		// so catch up initial document with saved patches.
		initialPatches = idState.Patches
		currentDocWithPatches, err = i.applyPatches(initialDoc, initialPatches)
		if err != nil {
			return nil, "", err
		}
	}

	// if there are no additional long form patches to apply, then return current doc with saved patches
	if longFormPatches == nil {
		longForm, err := didDocToLongForm(initialDoc, []byte(initialPatches))
		if err != nil {
			return nil, "", err
		}
		return currentDocWithPatches, longForm, nil
	}

	// Apply the new long form patches to current doc
	newDocWithPatches, err := i.applyPatches(currentDocWithPatches, string(longFormPatches))
	if err != nil {
		return nil, "", err
	}

	// if long form patches is different than initial patches already saved,
	// then save new long form patches
	if initialPatches != string(longFormPatches) {
		zap.L().Debug("About to save current did with new long form patches",
			zap.Any("currentDocWithPatches", currentDocWithPatches),
			zap.Any("newDocWithPatches", newDocWithPatches),
			zap.String("initialPatches", initialPatches),
			zap.ByteString("longFormPatches", longFormPatches),
		)
		// convert patches to seriailzied patches
		parsedPatches, err := jose.ParseSigned(string(longFormPatches))
		if err != nil {
			return nil, "", err
		}

		err = i.state.UpdateID(currentDocWithPatches.ID, parsedPatches.FullSerialize())
		if err != nil {
			return nil, "", err
		}
	}

	longForm, err := didDocToLongForm(initialDoc, longFormPatches)
	if err != nil {
		return nil, "", err
	}

	return newDocWithPatches, longForm, nil

}

func parseInitialStateFromLongFormDID(longFormDID string) (*did.Doc, error) {
	u, err := url.Parse(longFormDID)
	if err != nil {
		return nil, err
	}
	q, err := url.ParseQuery(u.RawQuery)
	if err != nil {
		return nil, err
	}

	initialStateStr := q.Get("initialState")
	if initialStateStr == "" {
		return nil, errors.New("Initial State query parameter is not present")
	}
	initialStateBytes, err := base64.URLEncoding.DecodeString(initialStateStr)
	if err != nil {
		zap.L().Debug(initialStateStr)
		return nil, err
	}
	return did.ParseDocument(initialStateBytes)
}

func parsePatchFromLongFormDID(longFormDID string) ([]byte, error) {
	u, err := url.Parse(longFormDID)
	if err != nil {
		return nil, err
	}
	q, err := url.ParseQuery(u.RawQuery)
	if err != nil {
		return nil, err
	}

	signedPatch := q.Get("signedIetfJsonPatch")
	if signedPatch == "" {
		return nil, nil
	}
	// return []byte(signedPatch), nil
	return base64.URLEncoding.DecodeString(signedPatch)
}

// verifyPatches will return the patch json if it verifies
func (i *identity) verifyPatches(originalDid *did.Doc, patches []byte) (*PatchJson, error) {
	signedObj, err := jose.ParseSigned(string(patches))
	if err != nil {
		zap.L().Error("[ServiceHandler] Could not parse signed message",
			zap.String("patches", string(patches)),
			zap.Error(err),
		)
		return nil, errors.New("Could not parse signed message")
	}

	sigs := signedObj.Signatures
	if len(sigs) != 1 {
		zap.L().Error("[ServiceHandler] Could not parse signed message",
			zap.Error(err),
		)
		return nil, errors.New("Could not parse signed message")
	}
	singleSigHeaderKID := sigs[0].Protected.KeyID
	if singleSigHeaderKID == "" {
		zap.L().Error("[ServiceHandler] Could not parse signed message",
			zap.Error(err),
		)
		return nil, errors.New("Could not parse signed message")
	}
	// Take the first part of the DID string as the DID (minus #ID)
	fromDIDSigned := strings.Split(singleSigHeaderKID, "#")[0]

	if originalDid.ID != fromDIDSigned {
		return nil, errors.New("DID Patch not signed by correct DID")
	}

	// Verify with that
	signedMessage, err := i.verifyFromDIDDoc(originalDid, string(patches))
	if err != nil {
		zap.L().Error("[ServiceHandler] Could not verify signed message",
			zap.Error(err),
		)
		return nil, errors.New("Could not parse verify message")
	}
	if signedMessage == nil {
		zap.L().Error("[ServiceHandler] Signed message is empty",
			zap.Error(err),
		)
		return nil, errors.New("Signed message is empty")
	}

	// After verifying, parse the signed message as a json patch
	var patch PatchJson
	err = json.Unmarshal(signedMessage, &patch)
	if err != nil {
		return nil, err
	}

	return &patch, nil
}

func (i *identity) applyPatches(doc *did.Doc, patches string) (*did.Doc, error) {
	if patches == "" {
		return doc, nil
	}
	currentPatch, err := i.verifyPatches(doc, []byte(patches))
	if err != nil {
		zap.L().Error("Could not verify patches",
			zap.Any("document", doc),
			zap.String("patches", patches),
			zap.Error(err),
		)
		return nil, err
	}
	if currentPatch == nil {
		return nil, errors.New("Current patches could not be verified")
	}

	ietfJsonPatchBytes, err := json.Marshal(currentPatch.IetfJsonPatch)
	if err != nil {
		zap.L().Error("Could not marshal ietfJsonPatch",
			zap.Any("document", doc),
			zap.Any("currentPatch", currentPatch),
			zap.Error(err),
		)
		return nil, err
	}
	patch, err := jsonpatch.DecodePatch(ietfJsonPatchBytes)
	if err != nil {
		zap.L().Error("Could not decode ietfJsonPatchBytes",
			zap.Any("document", doc),
			zap.ByteString("ietfJsonPatchBytes", ietfJsonPatchBytes),
			zap.Error(err),
		)
		return nil, err
	}

	document, err := doc.JSONBytes()
	if err != nil {
		return nil, err
	}

	currentPatchedDocBytes, err := patch.Apply(document)
	if err != nil {
		zap.L().Error("Could not apply patch to document",
			zap.Any("document", doc),
			zap.Any("patch", patch),
			zap.Error(err),
		)
		return nil, err
	}

	currentPatchedDoc, err := did.ParseDocument(currentPatchedDocBytes)
	if err != nil {
		zap.L().Error("Could not parse did document",
			zap.Any("document", doc),
			zap.Any("patch", currentPatchedDocBytes),
			zap.Error(err),
		)
		return nil, err
	}

	return currentPatchedDoc, nil
}

func (i *identity) updateUserPeerDID(docUpdate *did.Doc) (*did.Doc, string, uint32, []uint32, error) {
	// First get the latest version of the doc
	currentDidState, err := i.state.FindID(docUpdate.ID)
	if err != nil {
		return nil, "", 0, nil, err
	}
	if currentDidState == nil {
		return nil, "", 0, nil, errors.New("Could not find DID")
	}
	// Original delta
	originalDoc, err := did.ParseDocument([]byte(currentDidState.Document))
	if err != nil {
		zap.L().Debug("Failed to parse document", zap.Any("original", docUpdate))
		return nil, "", 0, nil, err
	}

	// apply the current patch onto the original did doc
	currentPatchedDoc, err := i.applyPatches(originalDoc, currentDidState.Patches)
	if err != nil {
		return nil, "", 0, nil, err
	}

	// Get the private key for this DID
	didKeyId, err := i.state.GetDIDKeyId(docUpdate.ID)
	if err != nil {
		return nil, "", 0, nil, err
	}
	if didKeyId == 0 {
		return nil, "", 0, nil, errors.New("No did found")
	}
	didKeyIndex, err := i.keyManager.GetIndex(didKeyId)
	if err != nil {
		return nil, "", 0, nil, errors.New("No did found")
	}

	// Get the derivation from the key manager
	didPrivateKeys, didIndexes, err := i.keyManager.GetChildrenKeys(didKeyId)
	if err != nil {
		return nil, "", 0, nil, err
	}

	// Look for a public key reference in the DID document that matches
	foundKey, foundPrivKey, err := matchP384KeyFromDID(didPrivateKeys, currentPatchedDoc)
	if err != nil {
		return nil, "", 0, nil, err
	}

	// Create the NEW patch document from the ORIGINAL did
	// TODO aggregate all patches to keep all history of DID changes
	originalJsonDoc, err := originalDoc.JSONBytes()
	if err != nil {
		return nil, "", 0, nil, fmt.Errorf("JSON marshalling of document failed: %w", err)
	}
	patchJsonDoc, err := docUpdate.JSONBytes()
	if err != nil {
		return nil, "", 0, nil, fmt.Errorf("JSON marshalling of document failed: %w", err)
	}

	newPatchJson, err := jsonpatch_create.CreatePatch(originalJsonDoc, patchJsonDoc)
	if err != nil {
		return nil, "", 0, nil, err
	}
	newPatch := &PatchJson{
		IetfJsonPatch: newPatchJson,
	}

	newPatchBytes, err := json.Marshal(newPatch)
	if err != nil {
		return nil, "", 0, nil, err
	}
	zap.L().Debug("Created new patch bytes", zap.ByteString("new patch bytes", newPatchBytes))
	signedPatch, err := key.SignElliptic(foundPrivKey, foundKey, "", newPatchBytes)
	if err != nil {
		return nil, "", 0, nil, err
	}

	// TODO save this signed patch with the other aggregate patches that exist
	err = i.state.UpdateID(docUpdate.ID, signedPatch)
	if err != nil {
		return nil, "", 0, nil, err
	}

	// parse the doc to get the latest resolution
	didUpdate, longFormDID, err := i.resolvePeerDID(docUpdate.ID)
	if err != nil {
		return nil, "", 0, nil, err
	}

	return didUpdate, longFormDID, didKeyIndex, didIndexes, nil
}

// didDocToLongForm turns a did doc into it's long form did
// this MUST be done with the initial doc
func didDocToLongForm(didDoc *did.Doc, signedPatches []byte) (string, error) {
	originalRawDoc, err := json.Marshal(didDoc)
	if err != nil {
		return "", err
	}
	return formatLongFormDID(didDoc.ID, originalRawDoc, signedPatches), nil
}

func formatLongFormDID(id string, originalRawDoc []byte, signedPatch []byte) string {
	// not yet supporting ION long form DIDs
	if strings.HasPrefix(id, "did:ion:") {
		return id
	}

	if len(originalRawDoc) == 0 && len(signedPatch) == 0 {
		return id
	}

	longForm := id + "?"

	if originalRawDoc != nil {
		longForm = fmt.Sprintf("%sinitialState=%s", longForm, base64.URLEncoding.EncodeToString(originalRawDoc))
		if len(signedPatch) != 0 {
			longForm += "&"
		}
	}
	if len(signedPatch) != 0 {
		longForm = fmt.Sprintf("%ssignedIetfJsonPatch=%s", longForm, base64.URLEncoding.EncodeToString([]byte(signedPatch)))
	}

	return longForm
}
