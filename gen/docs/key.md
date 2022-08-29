# Protocol Documentation
<a name="top"></a>

<!--
## Table of Contents

- [proto/imp/api/key/key.proto](#proto/imp/api/key/key.proto)
    - [InitSeedRequest](#key.InitSeedRequest)
    - [InitSeedResponse](#key.InitSeedResponse)
    - [StatusRequest](#key.StatusRequest)
    - [StatusResponse](#key.StatusResponse)
    - [UnlockSeedRequest](#key.UnlockSeedRequest)
    - [UnlockSeedResponse](#key.UnlockSeedResponse)
  
    - [Key](#key.Key)
  
- [Scalar Value Types](#scalar-value-types)



<a name="proto/imp/api/key/key.proto"></a>
<p align="right"><a href="#top">Top</a></p>

-->

## proto/imp/api/key/key.proto
Allows for p2p messaging between Impervious nodes



<a name="key.Key"></a>

### Key
Key service allows key manager actions on the Impervious daemon.

| Method Name | Request Type | Response Type | Description |
| ----------- | ------------ | ------------- | ------------|
| InitSeed | InitSeedRequest | InitSeedResponse | InitSeed initializes the master seed for the daemon, and encrypts using the passphrase. |
| UnlockSeed | UnlockSeedRequest | UnlockSeedResponse | UnlockSeed unlocks the master seed for the daemon, and decrypts using the passphrase. |
| Status | StatusRequest | StatusResponse | Status gives the status of the daemon db/key. |


#### HTTP bindings

| Method Name | Method | Pattern |
| ----------- | ------ | ------- |
| `InitSeed` | `POST` | `/v1/key/initSeed`
| `UnlockSeed` | `POST` | `/v1/key/unlockSeed`
| `Status` | `GET` | `/v1/key/status` <!-- end services -->



<a name="key.InitSeedRequest"></a>

### InitSeedRequest
Represents an init seed request to initialize the master seed.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| mnenomic | string |  | The optional mnenomic to set if you already have a seed you want to use with this daemon |
| passphrase | string |  | The passphrase to encrypt the mnenomic, necessary for unlocking the daemon on restarts |






<a name="key.InitSeedResponse"></a>

### InitSeedResponse
Represents a response back from an init seed request.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| mnenomic | string |  | The mnenomic that the seed was generated from, should be the same if one was passed in |
| api_key | string |  | The api key for the user to send authenticated requests |






<a name="key.StatusRequest"></a>

### StatusRequest
Represents an status request message.






<a name="key.StatusResponse"></a>

### StatusResponse
Represents a response back from a status request.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| status | string |  | The status of the daemon db/key. NOT_INITIALIZED means an InitSeed() is needed. LOCKED means an UnlockSeed() is needed. READY means the daemon is ready. |






<a name="key.UnlockSeedRequest"></a>

### UnlockSeedRequest
Represents an unlock seed request to unlock the master seed.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| passphrase | string |  | The passphrase to decrypt the seed, necessary for unlocking the daemon on restarts |






<a name="key.UnlockSeedResponse"></a>

### UnlockSeedResponse
Represents a response back from an unlock seed request.





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

