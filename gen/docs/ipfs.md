# Protocol Documentation
<a name="top"></a>

<!--
## Table of Contents

- [proto/imp/api/ipfs/ipfs.proto](#proto/imp/api/ipfs/ipfs.proto)
    - [AddFileRequest](#ipfs.AddFileRequest)
    - [AddFileResponse](#ipfs.AddFileResponse)
    - [GetFileRequest](#ipfs.GetFileRequest)
    - [GetFileResponse](#ipfs.GetFileResponse)
    - [ListFilesRequest](#ipfs.ListFilesRequest)
    - [ListFilesResponse](#ipfs.ListFilesResponse)
  
    - [IPFS](#ipfs.IPFS)
  
- [Scalar Value Types](#scalar-value-types)



<a name="proto/imp/api/ipfs/ipfs.proto"></a>
<p align="right"><a href="#top">Top</a></p>

-->

## proto/imp/api/ipfs/ipfs.proto
Allows for IPFS actions for Impervious nodes



<a name="ipfs.IPFS"></a>

### IPFS
IPFS service allows IPFS actions from the Impervious node.

| Method Name | Request Type | Response Type | Description |
| ----------- | ------------ | ------------- | ------------|
| AddFile | AddFileRequest | AddFileResponse | AddFile will add data to a file and pin to IPFS to return it's CID. |
| GetFile | GetFileRequest | GetFileResponse | RetrieveFile will retrieve a file from the IPFS network. |
| ListFiles | ListFilesRequest | ListFilesResponse | ListFiles lists all of the files pinned locally. |


#### HTTP bindings

| Method Name | Method | Pattern |
| ----------- | ------ | ------- |
| `AddFile` | `POST` | `/v1/ipfs/add`
| `GetFile` | `GET` | `/v1/ipfs/{protocol}/{cid}`
| `GetFile` | `GET` | `/v1/ipfs/{cid}`
| `ListFiles` | `GET` | `/v1/ipfs/list` <!-- end services -->



<a name="ipfs.AddFileRequest"></a>

### AddFileRequest
Represents a request to add a file to IPFS.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| name | string |  | The name of the file to add |
| data | bytes |  | The data content of the file to add |
| updatable | bool |  | Whether or not the file should be updatable |






<a name="ipfs.AddFileResponse"></a>

### AddFileResponse
Represents a response containing the content ID of the added IPFS file.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| cid | string |  | The content ID of the added file |






<a name="ipfs.GetFileRequest"></a>

### GetFileRequest
Represents a request to get a file from IPFS.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| protocol | string |  | The optional ipfs protocol to use (ex ipns or ipfs, default ipfs) |
| cid | string |  | The cid of the file to get |






<a name="ipfs.GetFileResponse"></a>

### GetFileResponse
Represents a response containing the contents of the retrieved file.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| data | bytes |  | The contents of the file |






<a name="ipfs.ListFilesRequest"></a>

### ListFilesRequest
Represents a request to list files stored locally.






<a name="ipfs.ListFilesResponse"></a>

### ListFilesResponse
Represents a response containing a list of the files.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| files | string | repeated | The stored files |





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

