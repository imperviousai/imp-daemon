package id

import (
	"errors"
	"fmt"
	"time"

	"github.com/google/uuid"
	"github.com/hyperledger/aries-framework-go/pkg/doc/did"
	"github.com/hyperledger/aries-framework-go/pkg/framework/aries/api/vdr"
	vdrapi "github.com/hyperledger/aries-framework-go/pkg/framework/aries/api/vdr"
	"github.com/hyperledger/aries-framework-go/pkg/vdr/fingerprint"
	"github.com/hyperledger/aries-framework-go/pkg/vdr/peer"
	id_state "github.com/imperviousai/freeimp/id/state"
	"github.com/imperviousai/freeimp/key"
)

const (
	// StoreNamespace store name space for DID Store.
	StoreNamespace = "peer"
	// DefaultServiceType default service type.
	DefaultServiceType = "defaultServiceType"
	// DefaultServiceEndpoint default service endpoint.
	DefaultServiceEndpoint = "defaultServiceEndpoint"

	schemaResV1                = "https://w3id.org/did-resolution/v1"
	ed25519VerificationKey2018 = "Ed25519VerificationKey2018"
	jsonWebKey2020             = "JsonWebKey2020"
	x25519KeyAgreementKey2019  = "X25519KeyAgreementKey2019"
)

// VDR is a overridden implementation of the Peer DID Storage API used
// to implement things not yet implemented by the library (ie, updates).
type VDR struct {
	childVDR   vdr.VDR
	state      id_state.IdentityState
	keyManager key.KeyManager
}

func (v *VDR) Read(didStr string, opts ...vdrapi.DIDMethodOption) (*did.DocResolution, error) {
	return nil, errors.New("Unimplemented")
}

func (v *VDR) Create(didDoc *did.Doc, opts ...vdrapi.DIDMethodOption) (*did.DocResolution, error) {
	// Using the underlying code for Peer VDR Create because of their heavy
	// refactoring and bugs that need to be fixed, instead of forking.
	docOpts := &vdrapi.DIDMethodOpts{Values: make(map[string]interface{})}
	// Apply options
	for _, opt := range opts {
		opt(docOpts)
	}

	store := false

	storeOpt := docOpts.Values["store"]
	if storeOpt != nil {
		var ok bool

		store, ok = storeOpt.(bool)
		if !ok {
			return nil, fmt.Errorf("store opt not boolean")
		}
	}

	if !store {
		docResolution, err := build(didDoc, docOpts)
		if err != nil {
			return nil, fmt.Errorf("create peer DID : %w", err)
		}

		didDoc = docResolution.DIDDocument
	}

	return &did.DocResolution{Context: []string{schemaResV1}, DIDDocument: didDoc}, nil
}

func (v *VDR) Accept(method string) bool {
	return v.childVDR.Accept(method)
}

func (v *VDR) Update(doc *did.Doc, opts ...vdrapi.DIDMethodOption) error {
	return errors.New("Unimplemented")
}

func (v *VDR) Deactivate(did string, opts ...vdrapi.DIDMethodOption) error {
	return v.childVDR.Deactivate(did, opts...)
}

func (v *VDR) Close() error {
	return v.childVDR.Close()
}

//nolint: funlen,gocyclo
func build(didDoc *did.Doc, docOpts *vdrapi.DIDMethodOpts) (*did.DocResolution, error) {
	if len(didDoc.VerificationMethod) == 0 && len(didDoc.KeyAgreement) == 0 {
		return nil, fmt.Errorf("verification method and key agreement are empty, at least one should be set")
	}

	mainVM, keyAgreementVM, err := buildDIDVMs(didDoc)
	if err != nil {
		return nil, err
	}

	// Service model to be included only if service type is provided through opts
	var service []did.Service

	for i := range didDoc.Service {
		if didDoc.Service[i].ID == "" {
			didDoc.Service[i].ID = uuid.New().String()
		}

		if didDoc.Service[i].Type == "" && docOpts.Values[DefaultServiceType] != nil {
			v, ok := docOpts.Values[DefaultServiceType].(string)
			if !ok {
				return nil, fmt.Errorf("defaultServiceType not string")
			}

			didDoc.Service[i].Type = v
		}

		if didDoc.Service[i].ServiceEndpoint == "" && docOpts.Values[DefaultServiceEndpoint] != nil {
			v, ok := docOpts.Values[DefaultServiceEndpoint].(string)
			if !ok {
				return nil, fmt.Errorf("defaultServiceEndpoint not string")
			}

			didDoc.Service[i].ServiceEndpoint = v
		}

		applyDIDCommKeys(i, didDoc)
		applyDIDCommV2Keys(i, didDoc)

		service = append(service, didDoc.Service[i])
	}

	// Created/Updated time
	t := time.Now()

	assertion := []did.Verification{{
		VerificationMethod: mainVM[0],
		Relationship:       did.AssertionMethod,
	}}

	authentication := []did.Verification{{
		VerificationMethod: mainVM[0],
		Relationship:       did.Authentication,
	}}

	var keyAgreement []did.Verification

	verificationMethods := mainVM

	if keyAgreementVM != nil {
		verificationMethods = append(verificationMethods, keyAgreementVM...)

		for _, ka := range keyAgreementVM {
			keyAgreement = append(keyAgreement, did.Verification{
				VerificationMethod: ka,
				Relationship:       did.KeyAgreement,
			})
		}
	}

	didDoc, err = peer.NewDoc(
		verificationMethods,
		did.WithService(service),
		did.WithCreatedTime(t),
		did.WithUpdatedTime(t),
		did.WithAuthentication(authentication),
		did.WithAssertion(assertion),
		did.WithKeyAgreement(keyAgreement),
	)
	if err != nil {
		return nil, err
	}

	return &did.DocResolution{DIDDocument: didDoc}, nil
}

func applyDIDCommKeys(i int, didDoc *did.Doc) {
	if didDoc.Service[i].Type == vdrapi.DIDCommServiceType {
		didKey, _ := fingerprint.CreateDIDKey(didDoc.VerificationMethod[0].Value)
		didDoc.Service[i].RecipientKeys = []string{didKey}
		didDoc.Service[i].Priority = 0
	}
}

func applyDIDCommV2Keys(i int, didDoc *did.Doc) {
	if didDoc.Service[i].Type == vdrapi.DIDCommV2ServiceType {
		didDoc.Service[i].RecipientKeys = []string{}
		didDoc.Service[i].Priority = 0

		for _, ka := range didDoc.KeyAgreement {
			kaID := ka.VerificationMethod.ID

			didDoc.Service[i].RecipientKeys = append(didDoc.Service[i].RecipientKeys, kaID)
		}
	}
}

func buildDIDVMs(didDoc *did.Doc) ([]did.VerificationMethod, []did.VerificationMethod, error) {
	var mainVM, keyAgreementVM []did.VerificationMethod

	// add all VMs, not only the first one.
	for i, vm := range didDoc.VerificationMethod {
		switch vm.Type {
		case ed25519VerificationKey2018:
			mainVM = append(mainVM, *did.NewVerificationMethodFromBytes(vm.ID, ed25519VerificationKey2018,
				"#id", didDoc.VerificationMethod[i].Value))
		case jsonWebKey2020:
			publicKey1, err := did.NewVerificationMethodFromJWK(vm.ID, jsonWebKey2020, "#id",
				didDoc.VerificationMethod[i].JSONWebKey())
			if err != nil {
				return nil, nil, err
			}

			mainVM = append(mainVM, *publicKey1)
		default:
			return nil, nil, fmt.Errorf("not supported VerificationMethod public key type: %s",
				didDoc.VerificationMethod[i].Type)
		}
	}

	for i, vm := range didDoc.KeyAgreement {
		switch vm.VerificationMethod.Type {
		case x25519KeyAgreementKey2019:
			keyAgreementVM = append(keyAgreementVM, *did.NewVerificationMethodFromBytes(
				didDoc.KeyAgreement[i].VerificationMethod.ID, x25519KeyAgreementKey2019, "",
				didDoc.KeyAgreement[i].VerificationMethod.Value))

		case jsonWebKey2020:
			ka, err := did.NewVerificationMethodFromJWK(didDoc.KeyAgreement[i].VerificationMethod.ID, jsonWebKey2020, "",
				didDoc.KeyAgreement[i].VerificationMethod.JSONWebKey())
			if err != nil {
				return nil, nil, err
			}

			keyAgreementVM = append(keyAgreementVM, *ka)
		default:
			return nil, nil, fmt.Errorf("not supported KeyAgreement public key type: %s", didDoc.KeyAgreement[i].VerificationMethod.Type)
		}
	}

	return mainVM, keyAgreementVM, nil
}
