# Protocol Documentation
<a name="top"></a>

<!--
## Table of Contents

- [proto/imp/api/contacts/contacts.proto](#proto/imp/api/contacts/contacts.proto)
    - [Contact](#contacts.Contact)
    - [ContactUpdate](#contacts.ContactUpdate)
    - [CreateContactRequest](#contacts.CreateContactRequest)
    - [CreateContactResponse](#contacts.CreateContactResponse)
    - [CreateContactsRequest](#contacts.CreateContactsRequest)
    - [CreateContactsResponse](#contacts.CreateContactsResponse)
    - [DeleteContactRequest](#contacts.DeleteContactRequest)
    - [DeleteContactResponse](#contacts.DeleteContactResponse)
    - [GetContactRequest](#contacts.GetContactRequest)
    - [GetContactResponse](#contacts.GetContactResponse)
    - [GetContactsListRequest](#contacts.GetContactsListRequest)
    - [GetContactsListResponse](#contacts.GetContactsListResponse)
    - [UpdateContactRequest](#contacts.UpdateContactRequest)
    - [UpdateContactResponse](#contacts.UpdateContactResponse)
  
    - [Contacts](#contacts.Contacts)
  
- [Scalar Value Types](#scalar-value-types)



<a name="proto/imp/api/contacts/contacts.proto"></a>
<p align="right"><a href="#top">Top</a></p>

-->

## proto/imp/api/contacts/contacts.proto
Allows for Contacts actions for Impervious nodes



<a name="contacts.Contacts"></a>

### Contacts
Contacts service allows Contacts actions from the Impervious node.

| Method Name | Request Type | Response Type | Description |
| ----------- | ------------ | ------------- | ------------|
| GetContactsList | GetContactsListRequest | GetContactsListResponse | GetContactsList gets all of the contacts the user has saved. |
| GetContact | GetContactRequest | GetContactResponse | GetContact gets a specific contact the user has saved. |
| CreateContact | CreateContactRequest | CreateContactResponse | CreateContact will create a specific contact. If the contact DID has not been added to the ID database, it will be added first. |
| CreateContacts | CreateContactsRequest | CreateContactsResponse | CreateContacts will create multiple contacts passed in. A batch version of CreateContact. |
| UpdateContact | UpdateContactRequest | UpdateContactResponse | UpdateContact will update a specific contact. |
| DeleteContact | DeleteContactRequest | DeleteContactResponse | DeleteContact will delete a specific contact. |


#### HTTP bindings

| Method Name | Method | Pattern |
| ----------- | ------ | ------- |
| `GetContactsList` | `GET` | `/v1/contacts`
| `GetContact` | `GET` | `/v1/contacts/{id}`
| `CreateContact` | `POST` | `/v1/contacts/create`
| `CreateContacts` | `POST` | `/v1/contacts/createMulti`
| `UpdateContact` | `POST` | `/v1/contacts/update`
| `DeleteContact` | `DELETE` | `/v1/contacts/{id}` <!-- end services -->



<a name="contacts.Contact"></a>

### Contact



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| id | int64 |  | The ID of the contact |
| did | string |  | The DID of the contact |
| didDocument | string |  | The DID document json of the contact |
| name | string |  | The name of the contact |
| userDID | string |  | The user DID that this contact has been saved to |
| hasContacted | bool |  | Whether or not this contact has been contacted before |
| metadata | string |  | The application specific metadata json for this contact |






<a name="contacts.ContactUpdate"></a>

### ContactUpdate



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| id | int64 |  | The ID of the contact |
| did | string |  | The DID of the contact |
| name | string |  | The name of the contact |
| metadata | string |  | The application specific metadata json for this contact |






<a name="contacts.CreateContactRequest"></a>

### CreateContactRequest
Represents a request to create a contact.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| contact | Contact |  | The contact to created |






<a name="contacts.CreateContactResponse"></a>

### CreateContactResponse
Represents a response containing the contact created.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| contact | Contact |  | The contact created |






<a name="contacts.CreateContactsRequest"></a>

### CreateContactsRequest
Represents a request to create multiple contacts.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| contacts | Contact | repeated | The contacts to created |






<a name="contacts.CreateContactsResponse"></a>

### CreateContactsResponse
Represents a response containing the contacts created.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| contacts | Contact | repeated | The contacts created |






<a name="contacts.DeleteContactRequest"></a>

### DeleteContactRequest
Represents a request to delete a contact.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| id | int64 |  | The ID of the contact to delete |






<a name="contacts.DeleteContactResponse"></a>

### DeleteContactResponse
Represents a response containing the contact deletion event.






<a name="contacts.GetContactRequest"></a>

### GetContactRequest
Represents a request to get a contact.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| id | int64 |  | The ID of the contact to retrieve |






<a name="contacts.GetContactResponse"></a>

### GetContactResponse
Represents a response containing the contact.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| contact | Contact |  | The contact retrieved |






<a name="contacts.GetContactsListRequest"></a>

### GetContactsListRequest
Represents a request to get a contact list.






<a name="contacts.GetContactsListResponse"></a>

### GetContactsListResponse
Represents a response containing the contact list.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| contacts | Contact | repeated | The contact list |






<a name="contacts.UpdateContactRequest"></a>

### UpdateContactRequest
Represents a request to update a contact.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| contact | ContactUpdate |  | The contact to update |






<a name="contacts.UpdateContactResponse"></a>

### UpdateContactResponse
Represents a response containing the contact updated.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| contact | Contact |  | The contact update |





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

