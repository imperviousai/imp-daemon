# Protocol Documentation
<a name="top"></a>

<!--
## Table of Contents

- [proto/imp/api/kv/kv.proto](#proto/imp/api/kv/kv.proto)
    - [DelKeyRequest](#kv.DelKeyRequest)
    - [DelKeyResponse](#kv.DelKeyResponse)
    - [GetKeyRequest](#kv.GetKeyRequest)
    - [GetKeyResponse](#kv.GetKeyResponse)
    - [SetKeyRequest](#kv.SetKeyRequest)
    - [SetKeyResponse](#kv.SetKeyResponse)
  
    - [KV](#kv.KV)
  
- [Scalar Value Types](#scalar-value-types)



<a name="proto/imp/api/kv/kv.proto"></a>
<p align="right"><a href="#top">Top</a></p>

-->

## proto/imp/api/kv/kv.proto
Allows for IPFS actions for Impervious nodes



<a name="kv.KV"></a>

### KV
KV service allows KV actions from the Impervious node.

| Method Name | Request Type | Response Type | Description |
| ----------- | ------------ | ------------- | ------------|
| GetKey | GetKeyRequest | GetKeyResponse | GetKey will retrieve a key |
| SetKey | SetKeyRequest | SetKeyResponse | SetKey will set a key |
| DelKey | DelKeyRequest | DelKeyResponse | DelKey will delete a key |


#### HTTP bindings

| Method Name | Method | Pattern |
| ----------- | ------ | ------- |
| `GetKey` | `POST` | `/v1/kv/getkey`
| `SetKey` | `POST` | `/v1/kv/setkey`
| `DelKey` | `POST` | `/v1/kv/delkey` <!-- end services -->



<a name="kv.DelKeyRequest"></a>

### DelKeyRequest
Represents a request to delete a key and value.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| key | string |  | The name of the key to del |






<a name="kv.DelKeyResponse"></a>

### DelKeyResponse
Represents a response for deletion HTTP 200=Deleted






<a name="kv.GetKeyRequest"></a>

### GetKeyRequest
Represents a request to get a key and value.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| key | string |  | The name of the key to get |






<a name="kv.GetKeyResponse"></a>

### GetKeyResponse
Represents a response containing the value


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| value | string |  | The contents of the value |






<a name="kv.SetKeyRequest"></a>

### SetKeyRequest
Represents a request to get a key and value.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| key | string |  | The name of the key to set |
| value | string |  | The value to set |






<a name="kv.SetKeyResponse"></a>

### SetKeyResponse
Represents a response for HTTP 200=Set





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

