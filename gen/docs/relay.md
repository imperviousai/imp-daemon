# Protocol Documentation
<a name="top"></a>

<!--
## Table of Contents

- [proto/imp/api/relay/relay.proto](#proto/imp/api/relay/relay.proto)
    - [RequestMailboxRequest](#relay.RequestMailboxRequest)
    - [RequestMailboxResponse](#relay.RequestMailboxResponse)
    - [RequestRelayRequest](#relay.RequestRelayRequest)
    - [RequestRelayResponse](#relay.RequestRelayResponse)
    - [ServiceEndpoint](#relay.ServiceEndpoint)
  
    - [Relay](#relay.Relay)
  
- [Scalar Value Types](#scalar-value-types)



<a name="proto/imp/api/relay/relay.proto"></a>
<p align="right"><a href="#top">Top</a></p>

-->

## proto/imp/api/relay/relay.proto
Allows for interacting with relay services



<a name="relay.Relay"></a>

### Relay
Relay service allows for interacting with relay services.

| Method Name | Request Type | Response Type | Description |
| ----------- | ------------ | ------------- | ------------|
| RequestRelay | RequestRelayRequest | RequestRelayResponse | RequestRelay requests a relay to a specific node. |
| RequestMailbox | RequestMailboxRequest | RequestMailboxResponse | RequestMailbox requests a relay to send over stored mailbox messages. |


#### HTTP bindings

| Method Name | Method | Pattern |
| ----------- | ------ | ------- |
| `RequestRelay` | `POST` | `/v1/relay/request`
| `RequestMailbox` | `POST` | `/v1/relay/mailbox` <!-- end services -->



<a name="relay.RequestMailboxRequest"></a>

### RequestMailboxRequest
Represents a request to a relay node to send over mailbox messages


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| toDID | string |  | The DID you want to request to be a relay |
| amount | int64 |  | The amount of satoshis to send for the request |
| privateServiceEndpoints | ServiceEndpoint | repeated | The private service endpoints to request the relay to forward messages to |






<a name="relay.RequestMailboxResponse"></a>

### RequestMailboxResponse
Represents a response back from a relay request


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| id | string |  | returned message ID |






<a name="relay.RequestRelayRequest"></a>

### RequestRelayRequest
Represents a request to a relay node to delegate them as a relay


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| toDID | string |  | The DID you want to request to be a relay |
| amount | int64 |  | The amount of satoshis to send for the request |
| privateServiceEndpoints | ServiceEndpoint | repeated | The private service endpoints to request the relay to forward messages to |






<a name="relay.RequestRelayResponse"></a>

### RequestRelayResponse
Represents a response back from a relay request


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| id | string |  | returned message ID |






<a name="relay.ServiceEndpoint"></a>

### ServiceEndpoint



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| id | string |  | The ID of the service endpoint |
| type | string |  | The type of the service endpoint |
| serviceEndpoint | string |  | The service endpoint URI |





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

