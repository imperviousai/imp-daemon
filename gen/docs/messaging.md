# Protocol Documentation
<a name="top"></a>

<!--
## Table of Contents

- [proto/imp/api/messaging/messaging.proto](#proto/imp/api/messaging/messaging.proto)
    - [DeleteGroupMessageRequest](#messaging.DeleteGroupMessageRequest)
    - [DeleteGroupMessageResponse](#messaging.DeleteGroupMessageResponse)
    - [DeleteMessageRequest](#messaging.DeleteMessageRequest)
    - [DeleteMessageResponse](#messaging.DeleteMessageResponse)
    - [GetMessageListRequest](#messaging.GetMessageListRequest)
    - [GetMessageListResponse](#messaging.GetMessageListResponse)
    - [Message](#messaging.Message)
    - [MessageEvent](#messaging.MessageEvent)
    - [MessageSettings](#messaging.MessageSettings)
    - [SaveMessageV2Request](#messaging.SaveMessageV2Request)
    - [SaveMessageV2Response](#messaging.SaveMessageV2Response)
    - [SendMessageRequest](#messaging.SendMessageRequest)
    - [SendMessageResponse](#messaging.SendMessageResponse)
    - [SendMessageV2Request](#messaging.SendMessageV2Request)
    - [SendMessageV2Response](#messaging.SendMessageV2Response)
  
    - [Messaging](#messaging.Messaging)
  
- [Scalar Value Types](#scalar-value-types)



<a name="proto/imp/api/messaging/messaging.proto"></a>
<p align="right"><a href="#top">Top</a></p>

-->

## proto/imp/api/messaging/messaging.proto
Allows for p2p messaging between Impervious nodes



<a name="messaging.Messaging"></a>

### Messaging
Messaging service allows for p2p messaging between Impervious nodes.

| Method Name | Request Type | Response Type | Description |
| ----------- | ------------ | ------------- | ------------|
| SendMessage | SendMessageRequest | SendMessageResponse | SendMessage sends a text message to another node. |
| SendMessageV2 | SendMessageV2Request | SendMessageV2Response | SendMessageV2 sends a byte-encoded json DIDComm message to another DID. |
| SaveMessageV2 | SaveMessageV2Request | SaveMessageV2Response | SaveMessageV2 saves a byte-encoded json DIDComm message locally. |
| GetMessageList | GetMessageListRequest | GetMessageListResponse | GetMessageList gets messages from the daemon. |
| DeleteMessage | DeleteMessageRequest | DeleteMessageResponse | DeleteMessage will delete a specific message. |
| DeleteGroupMessage | DeleteGroupMessageRequest | DeleteGroupMessageResponse | DeleteGroupMessage will delete all messages from the same group. |


#### HTTP bindings

| Method Name | Method | Pattern |
| ----------- | ------ | ------- |
| `SendMessage` | `POST` | `/v1/message/send`
| `SendMessageV2` | `POST` | `/v2/message/send`
| `SaveMessageV2` | `POST` | `/v2/message/save`
| `GetMessageList` | `GET` | `/v1/message`
| `DeleteMessage` | `DELETE` | `/v1/message/{id}`
| `DeleteGroupMessage` | `DELETE` | `/v1/message_group/{group_id}` <!-- end services -->



<a name="messaging.DeleteGroupMessageRequest"></a>

### DeleteGroupMessageRequest
Represents a request to delete a group message.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| group_id | string |  | The group ID of the messages to delete |






<a name="messaging.DeleteGroupMessageResponse"></a>

### DeleteGroupMessageResponse
Represents a response containing the message deletion event.






<a name="messaging.DeleteMessageRequest"></a>

### DeleteMessageRequest
Represents a request to delete a message.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| id | string |  | The ID of the message to delete |






<a name="messaging.DeleteMessageResponse"></a>

### DeleteMessageResponse
Represents a response containing the message deletion event.






<a name="messaging.GetMessageListRequest"></a>

### GetMessageListRequest
Represents a message get a message list


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| id | string |  | The ID of the message |
| type | string |  | The type of the message |






<a name="messaging.GetMessageListResponse"></a>

### GetMessageListResponse
Represents a response back containing a message list


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| messages | Message | repeated | The message list |






<a name="messaging.Message"></a>

### Message



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| id | string |  | The ID of the message |
| type | string |  | The DIDComm type of message |
| recipients | string | repeated | The recipients the message is for |
| data | string |  | The JSON encoded DIDComm data message |
| transport | string |  | The transport type (https/lightning) |
| group_id | string |  | The group id for the recipients |
| events | MessageEvent | repeated | The events for the message |






<a name="messaging.MessageEvent"></a>

### MessageEvent



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| id | string |  | The ID of the message event |
| MessageId | string |  | The ID of the message this event represents |
| DID | string |  | The ID of the message this event represents |
| Type | string |  | The ID of the message this event represents |
| EventTime | google.protobuf.Timestamp |  | The time the event took place |






<a name="messaging.MessageSettings"></a>

### MessageSettings
Represents the preferences for sending messages


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| protocol_preferences | string | repeated | ordered list of protocol preferences to send messages down |






<a name="messaging.SaveMessageV2Request"></a>

### SaveMessageV2Request
Represents a message to save locally. Useful if it was sent out of band.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| body | string |  | the body of the DIDcomm message, json structure depends on `type` field. |
| type | string |  | the type of the DIDcomm message, will determine body json structure |
| did | string |  | The DID this message sent to. It may be the user's if it was received (instead of sent) out of band. Deprecated for `recipient_list` / `group_id`. |
| from | string |  | The DID this sent from. It may be the other DID if it was received out of band. |
| reply_to_id | string |  | Optional ID of the message that this message is replying to. |
| recipient_list | string | repeated | The list of recipient dids the message sent from. Cannot use with `group_id` / `did` parameters. |
| group_id | string |  | The `group_id` the message sent from. Cannot use with `recipient_list` or `did` parameters. |






<a name="messaging.SaveMessageV2Response"></a>

### SaveMessageV2Response
Represents a response back from a saved message


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| id | string |  | returned message ID. |






<a name="messaging.SendMessageRequest"></a>

### SendMessageRequest
Represents a message send to another DID


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| msg | string |  | the simple string message to be sent |
| did | string |  | The other DID |
| amount | int64 |  | Optional satoshi amount to send along with the message, defaults to 1 sat. |
| reply_to_id | string |  | Optional ID of the message that this message is replying to. |






<a name="messaging.SendMessageResponse"></a>

### SendMessageResponse
Represents a response back from a sent message


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| id | string |  | returned message ID |






<a name="messaging.SendMessageV2Request"></a>

### SendMessageV2Request
Represents a message send to another DID


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| body | string |  | the body of the DIDcomm message, json structure depends on `type` field. |
| type | string |  | the type of the DIDcomm message, will determine body json structure |
| did | string |  | The other DID to send the message to. Deprecated for `recipient_list` / `group_id`. |
| amount | int64 |  | Optional satoshi amount to send along with the message, defaults to 1 sat. |
| reply_to_id | string |  | Optional ID of the message that this message is replying to. |
| message_settings | MessageSettings |  | Optional message settings when sending |
| recipient_list | string | repeated | The list of recipient dids to send the message to. Cannot use with `group_id` / `did` parameters. |
| group_id | string |  | The `group_id` to send the message to, instead of a list of recipient dids. Cannot use with `recipient_list` or `did` parameters. |






<a name="messaging.SendMessageV2Response"></a>

### SendMessageV2Response
Represents a response back from a sent message


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| id | string |  | returned message ID. |





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

