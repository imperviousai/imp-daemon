# Protocol Documentation
<a name="top"></a>

<!--
## Table of Contents

- [proto/imp/api/id/id.proto](#proto/imp/api/id/id.proto)
    - [BackupDIDRequest](#id.BackupDIDRequest)
    - [BackupDIDResponse](#id.BackupDIDResponse)
    - [CreateDIDRequest](#id.CreateDIDRequest)
    - [CreateDIDResponse](#id.CreateDIDResponse)
    - [DeleteDIDRequest](#id.DeleteDIDRequest)
    - [DeleteDIDResponse](#id.DeleteDIDResponse)
    - [ImportDIDRequest](#id.ImportDIDRequest)
    - [ImportDIDResponse](#id.ImportDIDResponse)
    - [ListDIDRequest](#id.ListDIDRequest)
    - [ListDIDResponse](#id.ListDIDResponse)
    - [RecoverDIDRequest](#id.RecoverDIDRequest)
    - [RecoverDIDResponse](#id.RecoverDIDResponse)
    - [RecoveryKit](#id.RecoveryKit)
    - [ResolveDIDRequest](#id.ResolveDIDRequest)
    - [ResolveDIDResponse](#id.ResolveDIDResponse)
    - [ServiceEndpoint](#id.ServiceEndpoint)
    - [StoreDIDRequest](#id.StoreDIDRequest)
    - [StoreDIDResponse](#id.StoreDIDResponse)
    - [UpdateDIDRequest](#id.UpdateDIDRequest)
    - [UpdateDIDResponse](#id.UpdateDIDResponse)
  
    - [ID](#id.ID)
  
- [Scalar Value Types](#scalar-value-types)



<a name="proto/imp/api/id/id.proto"></a>
<p align="right"><a href="#top">Top</a></p>

-->

## proto/imp/api/id/id.proto
Allows for ID actions for Impervious nodes



<a name="id.ID"></a>

### ID
ID service allows ID actions from the Impervious node.

| Method Name | Request Type | Response Type | Description |
| ----------- | ------------ | ------------- | ------------|
| ResolveDID | ResolveDIDRequest | ResolveDIDResponse | ResolveDID resolves a DID URI and returns a DID document representing the identity. |
| ListDID | ListDIDRequest | ListDIDResponse | ListDID lists all of the DIDs stored locally. |
| CreateDID | CreateDIDRequest | CreateDIDResponse | CreateDID creates a DID for the user with the given information. |
| ImportDID | ImportDIDRequest | ImportDIDResponse | ImportDID imports a DID document which belongs to the user. |
| UpdateDID | UpdateDIDRequest | UpdateDIDResponse | UpdateDID updates a DID document with a patch document. |
| DeleteDID | DeleteDIDRequest | DeleteDIDResponse | DeleteDID will delete a specific did. |
| BackupDID | BackupDIDRequest | BackupDIDResponse |  |
| RecoverDID | RecoverDIDRequest | RecoverDIDResponse |  |


#### HTTP bindings

| Method Name | Method | Pattern |
| ----------- | ------ | ------- |
| `ResolveDID` | `POST` | `/v1/id/resolveDID`
| `ListDID` | `GET` | `/v1/id/listDID`
| `CreateDID` | `POST` | `/v1/id/createDID`
| `ImportDID` | `POST` | `/v1/id/importDID`
| `UpdateDID` | `POST` | `/v1/id/updateDID`
| `DeleteDID` | `DELETE` | `/v1/id/{id}`
| `BackupDID` | `POST` | `/v1/id/{id}/backup`
| `RecoverDID` | `POST` | `/v1/id/recover` <!-- end services -->



<a name="id.BackupDIDRequest"></a>

### BackupDIDRequest
Represents a request to backup a did.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| id | string |  | The ID of the did to back up |






<a name="id.BackupDIDResponse"></a>

### BackupDIDResponse
Represents a response containing the did backup recovery kit.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| recovery_kit | RecoveryKit |  | The recovery kit of the DID. |






<a name="id.CreateDIDRequest"></a>

### CreateDIDRequest
Represents a request to create a DID document.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| type | string |  | The DID type to create |
| serviceEndpoints | ServiceEndpoint | repeated | A list of service endpoints to create the DID with |






<a name="id.CreateDIDResponse"></a>

### CreateDIDResponse
Represents a response the document for the created DID.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| document | string |  | The created DID document ID. |
| long_form_did | string |  | The long form DID string with `initialState` and/or `signedIetfJsonPatch` query parameters encoded inline. |
| recovery_kit | RecoveryKit |  | The recovery kit of the created DID |






<a name="id.DeleteDIDRequest"></a>

### DeleteDIDRequest
Represents a request to delete a did.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| id | string |  | The ID of the did to delete |






<a name="id.DeleteDIDResponse"></a>

### DeleteDIDResponse
Represents a response containing the did deletion event.






<a name="id.ImportDIDRequest"></a>

### ImportDIDRequest
Represents a request to import a user's DID document.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| document | string |  | The DID document to import, optional if `long_form_did` is present. |
| long_form_did | string |  | The long form DID string with `initialState` and/or `signedIetfJsonPatch` query parameters encoded inline. |






<a name="id.ImportDIDResponse"></a>

### ImportDIDResponse
Represents a response after importing a user's DID document.






<a name="id.ListDIDRequest"></a>

### ListDIDRequest
Represents a request to list DIDs stored locally.






<a name="id.ListDIDResponse"></a>

### ListDIDResponse
Represents a response containing a list of the stored DIDs.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| documents | string | repeated | The stored DID documents |






<a name="id.RecoverDIDRequest"></a>

### RecoverDIDRequest
Represents a request to recover a did with the recovery kit.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| recovery_kit | RecoveryKit |  | The DID to recover. |
| passphrase | string | optional | If using the recovery kit to also init the seed with the passed in mnenomic, provide a passphrase to encrypt DB/seed with. Not needed if `id.InitSeed` has already ran before. |






<a name="id.RecoverDIDResponse"></a>

### RecoverDIDResponse
Represents a response containing the did recovery result.






<a name="id.RecoveryKit"></a>

### RecoveryKit
Represents a DID recovery kit to back up and restore from later.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| did | string |  | The DID this recovery kit is for |
| long_form_did | string | optional | The long form DID with the document/patches encoded into the DID. Only necessary for PEER. |
| did_derivation_path | uint32 |  | The parent derivation path for the DID |
| key_derivations | uint32 | repeated | Each key derivation path created under a DID |
| seed | string |  | The seed words backing the identity |






<a name="id.ResolveDIDRequest"></a>

### ResolveDIDRequest
Represents a request to resolve a DID into a DID document.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| did | string |  | The DID URI to resolve |






<a name="id.ResolveDIDResponse"></a>

### ResolveDIDResponse
Represents a response containing the resolved DID document of the passed in DID URI.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| document | string |  | The resolved DID document |
| long_form_did | string |  | The long form DID string with `initialState` and/or `signedIetfJsonPatch` query parameters encoded inline. |






<a name="id.ServiceEndpoint"></a>

### ServiceEndpoint



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| id | string |  | The ID of the service endpoint |
| type | string |  | The type of the service endpoint |
| serviceEndpoint | string |  | The serviceEndpoint URI |






<a name="id.StoreDIDRequest"></a>

### StoreDIDRequest
Represents a request to store a DID document.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| document | string |  | The DID document to store |






<a name="id.StoreDIDResponse"></a>

### StoreDIDResponse
Represents a response containing the resolved ID of the passed in DID document.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| id | string |  | The resolved DID document ID. |






<a name="id.UpdateDIDRequest"></a>

### UpdateDIDRequest
Represents a request to update a DID document.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| document | string |  | The DID document patch to use as the update |






<a name="id.UpdateDIDResponse"></a>

### UpdateDIDResponse
Represents a response after updating a DID document.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| document | string |  | The updated DID document ID. |
| long_form_did | string |  | The long form DID string with `initialState` and/or `signedIetfJsonPatch` query parameters encoded inline. |
| recovery_kit | RecoveryKit | optional | The recovery kit of the updated DID. Only needed on Peer DIDs. |





 <!-- end messages -->

 <!-- end enums -->

 <!-- end HasExtensions -->

## Scalar Value Types

| .proto Type | C++ | Java | Python | Go | C# | PHP | Ruby |
| ----------- | --- | ---- | ------ | -- | -- | --- | ---- |
| <a name="double" /> double | double | double | float | float64 | double | float | Float |
| <a name="float" /> float | float | float | float | float32 | float | float | Float |
| <a name="int32" /> int32 | int32 | int | int | int32 | int | integer | Bignum or Fixnum (as required) |
| <a name="int64" /> int64 | int64 | long | int/long | int64 | long | integer/string | Bignum |
| <a name="uint32" /> uint32 | uint32 | int | int/long | uint32 | uint | integer | Bignum or Fixnum (as required) |
| <a name="uint64" /> uint64 | uint64 | long | int/long | uint64 | ulong | integer/string | Bignum or Fixnum (as required) |
| <a name="sint32" /> sint32 | int32 | int | int | int32 | int | integer | Bignum or Fixnum (as required) |
| <a name="sint64" /> sint64 | int64 | long | int/long | int64 | long | integer/string | Bignum |
| <a name="fixed32" /> fixed32 | uint32 | int | int | uint32 | uint | integer | Bignum or Fixnum (as required) |
| <a name="fixed64" /> fixed64 | uint64 | long | int/long | uint64 | ulong | integer/string | Bignum |
| <a name="sfixed32" /> sfixed32 | int32 | int | int | int32 | int | integer | Bignum or Fixnum (as required) |
| <a name="sfixed64" /> sfixed64 | int64 | long | int/long | int64 | long | integer/string | Bignum |
| <a name="bool" /> bool | bool | boolean | boolean | bool | bool | boolean | TrueClass/FalseClass |
| <a name="string" /> string | string | String | str/unicode | string | string | string | String (UTF-8) |
| <a name="bytes" /> bytes | string | ByteString | str | []byte | ByteString | string | String (ASCII-8BIT) |

