# Protocol Documentation
<a name="top"></a>

<!--
## Table of Contents

- [proto/imp/api/core/core.proto](#proto/imp/api/core/core.proto)
    - [KeyStatus](#core.KeyStatus)
    - [StatusRequest](#core.StatusRequest)
    - [StatusResponse](#core.StatusResponse)
  
    - [Core](#core.Core)
  
- [Scalar Value Types](#scalar-value-types)



<a name="proto/imp/api/core/core.proto"></a>
<p align="right"><a href="#top">Top</a></p>

-->

## proto/imp/api/core/core.proto
Allows for p2p messaging between Impervious nodes



<a name="core.Core"></a>

### Core
Core service allows general core actions on the Impervious daemon.

| Method Name | Request Type | Response Type | Description |
| ----------- | ------------ | ------------- | ------------|
| Status | StatusRequest | StatusResponse | Status gives the status of various services the daemon is running. |


#### HTTP bindings

| Method Name | Method | Pattern |
| ----------- | ------ | ------- |
| `Status` | `GET` | `/v1/core/status` <!-- end services -->



<a name="core.KeyStatus"></a>

### KeyStatus



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| status | string |  | The status of the daemon db/key. NOT_INITIALIZED means an InitSeed() is needed. LOCKED means an UnlockSeed() is needed. READY means the daemon is ready. |






<a name="core.StatusRequest"></a>

### StatusRequest
Represents a status request message.






<a name="core.StatusResponse"></a>

### StatusResponse
Represents a response back from a status request.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| key_status | KeyStatus |  | KeyStatus information |





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

