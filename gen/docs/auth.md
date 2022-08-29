# Protocol Documentation
<a name="top"></a>

<!--
## Table of Contents

- [proto/imp/api/auth/auth.proto](#proto/imp/api/auth/auth.proto)
    - [AuthAPIKey](#auth.AuthAPIKey)
    - [CreateAuthKeyRequest](#auth.CreateAuthKeyRequest)
    - [CreateAuthKeyResponse](#auth.CreateAuthKeyResponse)
    - [DeleteAuthKeyRequest](#auth.DeleteAuthKeyRequest)
    - [DeleteAuthKeyResponse](#auth.DeleteAuthKeyResponse)
    - [GetAuthKeysRequest](#auth.GetAuthKeysRequest)
    - [GetAuthKeysResponse](#auth.GetAuthKeysResponse)
    - [UpdateAuthKeyRequest](#auth.UpdateAuthKeyRequest)
    - [UpdateAuthKeyResponse](#auth.UpdateAuthKeyResponse)
  
    - [Auth](#auth.Auth)
  
- [Scalar Value Types](#scalar-value-types)



<a name="proto/imp/api/auth/auth.proto"></a>
<p align="right"><a href="#top">Top</a></p>

-->

## proto/imp/api/auth/auth.proto
Allows for Auth actions for Impervious nodes



<a name="auth.Auth"></a>

### Auth
Auth service allows Auth actions from the Impervious node.

| Method Name | Request Type | Response Type | Description |
| ----------- | ------------ | ------------- | ------------|
| GetAuthKeys | GetAuthKeysRequest | GetAuthKeysResponse | GetAuthKeys gets a list of auth api keys for the daemon. |
| CreateAuthKey | CreateAuthKeyRequest | CreateAuthKeyResponse | CreateAuthKey creates a new api key for authentication into the daemon. |
| UpdateAuthKey | UpdateAuthKeyRequest | UpdateAuthKeyResponse | UpdateAuthKey updates api key details. |
| DeleteAuthKey | DeleteAuthKeyRequest | DeleteAuthKeyResponse | DeleteAuthKey will delete a specific api key. |


#### HTTP bindings

| Method Name | Method | Pattern |
| ----------- | ------ | ------- |
| `GetAuthKeys` | `GET` | `/v1/auth`
| `CreateAuthKey` | `POST` | `/v1/auth`
| `UpdateAuthKey` | `PUT` | `/v1/auth/{id}`
| `DeleteAuthKey` | `DELETE` | `/v1/auth/{id}` <!-- end services -->



<a name="auth.AuthAPIKey"></a>

### AuthAPIKey



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| id | int64 |  | the ID of the API key |
| name | string |  | the name of the API key |
| description | string |  | the description of the API key |






<a name="auth.CreateAuthKeyRequest"></a>

### CreateAuthKeyRequest
Represents a request to create a new auth API key.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| name | string |  | the name of the API key |
| description | string |  | the description of the API key |






<a name="auth.CreateAuthKeyResponse"></a>

### CreateAuthKeyResponse
Represents a response containing the new auth API key.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| key | string |  | the API key itself in UUID string formation |






<a name="auth.DeleteAuthKeyRequest"></a>

### DeleteAuthKeyRequest
Represents a request to delete an auth API key.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| id | int64 |  | the id of the API key to delete |






<a name="auth.DeleteAuthKeyResponse"></a>

### DeleteAuthKeyResponse
Represents a response containing the deletion results.






<a name="auth.GetAuthKeysRequest"></a>

### GetAuthKeysRequest
Represents a request to get a list of the auth API keys.






<a name="auth.GetAuthKeysResponse"></a>

### GetAuthKeysResponse
Represents a response the list of auth API keys.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| keys | AuthAPIKey | repeated | the list of API keys |






<a name="auth.UpdateAuthKeyRequest"></a>

### UpdateAuthKeyRequest
Represents a request to update an auth API key.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| id | int64 |  | the id of the API key to update |
| name | string |  | the name of the API key |
| description | string |  | the description of the API key |






<a name="auth.UpdateAuthKeyResponse"></a>

### UpdateAuthKeyResponse
Represents a response containing the update results.





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

