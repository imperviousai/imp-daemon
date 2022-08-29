# Protocol Documentation
<a name="top"></a>

<!--
## Table of Contents

- [proto/imp/api/config/config.proto](#proto/imp/api/config/config.proto)
    - [GetIONConfigRequest](#configs.GetIONConfigRequest)
    - [GetIONConfigResponse](#configs.GetIONConfigResponse)
    - [GetLightningConfigRequest](#configs.GetLightningConfigRequest)
    - [GetLightningConfigResponse](#configs.GetLightningConfigResponse)
    - [IONConfig](#configs.IONConfig)
    - [LightningConfig](#configs.LightningConfig)
    - [SaveIONConfigRequest](#configs.SaveIONConfigRequest)
    - [SaveIONConfigResponse](#configs.SaveIONConfigResponse)
    - [SaveLightningConfigRequest](#configs.SaveLightningConfigRequest)
    - [SaveLightningConfigResponse](#configs.SaveLightningConfigResponse)
  
    - [Config](#configs.Config)
  
- [Scalar Value Types](#scalar-value-types)



<a name="proto/imp/api/config/config.proto"></a>
<p align="right"><a href="#top">Top</a></p>

-->

## proto/imp/api/config/config.proto
Allows for Config actions for Impervious nodes



<a name="configs.Config"></a>

### Config
Config service allows Config actions from the Impervious node.

| Method Name | Request Type | Response Type | Description |
| ----------- | ------------ | ------------- | ------------|
| GetLightningConfig | GetLightningConfigRequest | GetLightningConfigResponse | GetLightningConfig gets the lightning configs for the daemon. |
| SaveLightningConfig | SaveLightningConfigRequest | SaveLightningConfigResponse | SaveLightningConfig save the lightning config and restart the daemon. |
| GetIONConfig | GetIONConfigRequest | GetIONConfigResponse | GetIONConfig gets the ion configs for the daemon. |
| SaveIONConfig | SaveIONConfigRequest | SaveIONConfigResponse | SaveIONConfig will save the ion config and restart the daemon. |


#### HTTP bindings

| Method Name | Method | Pattern |
| ----------- | ------ | ------- |
| `GetLightningConfig` | `GET` | `/v1/config/lightning`
| `SaveLightningConfig` | `POST` | `/v1/config/lightning`
| `GetIONConfig` | `GET` | `/v1/config/ion`
| `SaveIONConfig` | `POST` | `/v1/config/ion` <!-- end services -->



<a name="configs.GetIONConfigRequest"></a>

### GetIONConfigRequest
Represents a request to get the ion config.






<a name="configs.GetIONConfigResponse"></a>

### GetIONConfigResponse
Represents a response containing the ion config.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| ion_config | IONConfig |  | The ion config |






<a name="configs.GetLightningConfigRequest"></a>

### GetLightningConfigRequest
Represents a request to get the lightning config.






<a name="configs.GetLightningConfigResponse"></a>

### GetLightningConfigResponse
Represents a response containing the lightning config.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| lightning_config | LightningConfig |  | The lightning config |






<a name="configs.IONConfig"></a>

### IONConfig



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| url | string |  | the lightning IP address |
| active | bool |  | the lightning admin macaroon |






<a name="configs.LightningConfig"></a>

### LightningConfig



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| ip | string |  | the lightning IP address |
| port | string |  | the lightning IP port |
| pubkey | string |  | the lightning pubkey |
| tls_cert | string |  | the lightning tls cert |
| admin_macaroon | string |  | the lightning admin macaroon file |
| listening | bool |  | the lightning admin macaroon file |
| tls_cert_hex | string |  | the lightning tls cert hex instead of file |
| admin_macaroon_hex | string |  | the lightning admin macaroon hex instead of file |






<a name="configs.SaveIONConfigRequest"></a>

### SaveIONConfigRequest
Represents a request to save the ion config.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| ion_config | IONConfig |  | The ion config |






<a name="configs.SaveIONConfigResponse"></a>

### SaveIONConfigResponse
Represents a response containing the ion save config results.






<a name="configs.SaveLightningConfigRequest"></a>

### SaveLightningConfigRequest
Represents a request to save the lightning config.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| lightning_config | LightningConfig |  | The lightning config |






<a name="configs.SaveLightningConfigResponse"></a>

### SaveLightningConfigResponse
Represents a response containing the lightning save config results.





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

