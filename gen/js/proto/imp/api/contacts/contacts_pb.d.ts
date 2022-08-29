import * as jspb from 'google-protobuf'

import * as google_api_annotations_pb from '../../../../google/api/annotations_pb';
import * as protoc$gen$openapiv2_options_annotations_pb from '../../../../protoc-gen-openapiv2/options/annotations_pb';


export class Contact extends jspb.Message {
  getId(): number;
  setId(value: number): Contact;

  getDid(): string;
  setDid(value: string): Contact;

  getDiddocument(): string;
  setDiddocument(value: string): Contact;

  getName(): string;
  setName(value: string): Contact;

  getUserdid(): string;
  setUserdid(value: string): Contact;

  getHascontacted(): boolean;
  setHascontacted(value: boolean): Contact;

  getMetadata(): string;
  setMetadata(value: string): Contact;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Contact.AsObject;
  static toObject(includeInstance: boolean, msg: Contact): Contact.AsObject;
  static serializeBinaryToWriter(message: Contact, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Contact;
  static deserializeBinaryFromReader(message: Contact, reader: jspb.BinaryReader): Contact;
}

export namespace Contact {
  export type AsObject = {
    id: number,
    did: string,
    diddocument: string,
    name: string,
    userdid: string,
    hascontacted: boolean,
    metadata: string,
  }
}

export class ContactUpdate extends jspb.Message {
  getId(): number;
  setId(value: number): ContactUpdate;

  getDid(): string;
  setDid(value: string): ContactUpdate;

  getName(): string;
  setName(value: string): ContactUpdate;

  getMetadata(): string;
  setMetadata(value: string): ContactUpdate;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ContactUpdate.AsObject;
  static toObject(includeInstance: boolean, msg: ContactUpdate): ContactUpdate.AsObject;
  static serializeBinaryToWriter(message: ContactUpdate, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ContactUpdate;
  static deserializeBinaryFromReader(message: ContactUpdate, reader: jspb.BinaryReader): ContactUpdate;
}

export namespace ContactUpdate {
  export type AsObject = {
    id: number,
    did: string,
    name: string,
    metadata: string,
  }
}

export class GetContactsListRequest extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetContactsListRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetContactsListRequest): GetContactsListRequest.AsObject;
  static serializeBinaryToWriter(message: GetContactsListRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetContactsListRequest;
  static deserializeBinaryFromReader(message: GetContactsListRequest, reader: jspb.BinaryReader): GetContactsListRequest;
}

export namespace GetContactsListRequest {
  export type AsObject = {
  }
}

export class GetContactsListResponse extends jspb.Message {
  getContactsList(): Array<Contact>;
  setContactsList(value: Array<Contact>): GetContactsListResponse;
  clearContactsList(): GetContactsListResponse;
  addContacts(value?: Contact, index?: number): Contact;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetContactsListResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetContactsListResponse): GetContactsListResponse.AsObject;
  static serializeBinaryToWriter(message: GetContactsListResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetContactsListResponse;
  static deserializeBinaryFromReader(message: GetContactsListResponse, reader: jspb.BinaryReader): GetContactsListResponse;
}

export namespace GetContactsListResponse {
  export type AsObject = {
    contactsList: Array<Contact.AsObject>,
  }
}

export class GetContactRequest extends jspb.Message {
  getId(): number;
  setId(value: number): GetContactRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetContactRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetContactRequest): GetContactRequest.AsObject;
  static serializeBinaryToWriter(message: GetContactRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetContactRequest;
  static deserializeBinaryFromReader(message: GetContactRequest, reader: jspb.BinaryReader): GetContactRequest;
}

export namespace GetContactRequest {
  export type AsObject = {
    id: number,
  }
}

export class GetContactResponse extends jspb.Message {
  getContact(): Contact | undefined;
  setContact(value?: Contact): GetContactResponse;
  hasContact(): boolean;
  clearContact(): GetContactResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetContactResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetContactResponse): GetContactResponse.AsObject;
  static serializeBinaryToWriter(message: GetContactResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetContactResponse;
  static deserializeBinaryFromReader(message: GetContactResponse, reader: jspb.BinaryReader): GetContactResponse;
}

export namespace GetContactResponse {
  export type AsObject = {
    contact?: Contact.AsObject,
  }
}

export class CreateContactRequest extends jspb.Message {
  getContact(): Contact | undefined;
  setContact(value?: Contact): CreateContactRequest;
  hasContact(): boolean;
  clearContact(): CreateContactRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CreateContactRequest.AsObject;
  static toObject(includeInstance: boolean, msg: CreateContactRequest): CreateContactRequest.AsObject;
  static serializeBinaryToWriter(message: CreateContactRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CreateContactRequest;
  static deserializeBinaryFromReader(message: CreateContactRequest, reader: jspb.BinaryReader): CreateContactRequest;
}

export namespace CreateContactRequest {
  export type AsObject = {
    contact?: Contact.AsObject,
  }
}

export class CreateContactResponse extends jspb.Message {
  getContact(): Contact | undefined;
  setContact(value?: Contact): CreateContactResponse;
  hasContact(): boolean;
  clearContact(): CreateContactResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CreateContactResponse.AsObject;
  static toObject(includeInstance: boolean, msg: CreateContactResponse): CreateContactResponse.AsObject;
  static serializeBinaryToWriter(message: CreateContactResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CreateContactResponse;
  static deserializeBinaryFromReader(message: CreateContactResponse, reader: jspb.BinaryReader): CreateContactResponse;
}

export namespace CreateContactResponse {
  export type AsObject = {
    contact?: Contact.AsObject,
  }
}

export class CreateContactsRequest extends jspb.Message {
  getContactsList(): Array<Contact>;
  setContactsList(value: Array<Contact>): CreateContactsRequest;
  clearContactsList(): CreateContactsRequest;
  addContacts(value?: Contact, index?: number): Contact;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CreateContactsRequest.AsObject;
  static toObject(includeInstance: boolean, msg: CreateContactsRequest): CreateContactsRequest.AsObject;
  static serializeBinaryToWriter(message: CreateContactsRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CreateContactsRequest;
  static deserializeBinaryFromReader(message: CreateContactsRequest, reader: jspb.BinaryReader): CreateContactsRequest;
}

export namespace CreateContactsRequest {
  export type AsObject = {
    contactsList: Array<Contact.AsObject>,
  }
}

export class CreateContactsResponse extends jspb.Message {
  getContactsList(): Array<Contact>;
  setContactsList(value: Array<Contact>): CreateContactsResponse;
  clearContactsList(): CreateContactsResponse;
  addContacts(value?: Contact, index?: number): Contact;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CreateContactsResponse.AsObject;
  static toObject(includeInstance: boolean, msg: CreateContactsResponse): CreateContactsResponse.AsObject;
  static serializeBinaryToWriter(message: CreateContactsResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CreateContactsResponse;
  static deserializeBinaryFromReader(message: CreateContactsResponse, reader: jspb.BinaryReader): CreateContactsResponse;
}

export namespace CreateContactsResponse {
  export type AsObject = {
    contactsList: Array<Contact.AsObject>,
  }
}

export class UpdateContactRequest extends jspb.Message {
  getContact(): ContactUpdate | undefined;
  setContact(value?: ContactUpdate): UpdateContactRequest;
  hasContact(): boolean;
  clearContact(): UpdateContactRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UpdateContactRequest.AsObject;
  static toObject(includeInstance: boolean, msg: UpdateContactRequest): UpdateContactRequest.AsObject;
  static serializeBinaryToWriter(message: UpdateContactRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UpdateContactRequest;
  static deserializeBinaryFromReader(message: UpdateContactRequest, reader: jspb.BinaryReader): UpdateContactRequest;
}

export namespace UpdateContactRequest {
  export type AsObject = {
    contact?: ContactUpdate.AsObject,
  }
}

export class UpdateContactResponse extends jspb.Message {
  getContact(): Contact | undefined;
  setContact(value?: Contact): UpdateContactResponse;
  hasContact(): boolean;
  clearContact(): UpdateContactResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UpdateContactResponse.AsObject;
  static toObject(includeInstance: boolean, msg: UpdateContactResponse): UpdateContactResponse.AsObject;
  static serializeBinaryToWriter(message: UpdateContactResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UpdateContactResponse;
  static deserializeBinaryFromReader(message: UpdateContactResponse, reader: jspb.BinaryReader): UpdateContactResponse;
}

export namespace UpdateContactResponse {
  export type AsObject = {
    contact?: Contact.AsObject,
  }
}

export class DeleteContactRequest extends jspb.Message {
  getId(): number;
  setId(value: number): DeleteContactRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DeleteContactRequest.AsObject;
  static toObject(includeInstance: boolean, msg: DeleteContactRequest): DeleteContactRequest.AsObject;
  static serializeBinaryToWriter(message: DeleteContactRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DeleteContactRequest;
  static deserializeBinaryFromReader(message: DeleteContactRequest, reader: jspb.BinaryReader): DeleteContactRequest;
}

export namespace DeleteContactRequest {
  export type AsObject = {
    id: number,
  }
}

export class DeleteContactResponse extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DeleteContactResponse.AsObject;
  static toObject(includeInstance: boolean, msg: DeleteContactResponse): DeleteContactResponse.AsObject;
  static serializeBinaryToWriter(message: DeleteContactResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DeleteContactResponse;
  static deserializeBinaryFromReader(message: DeleteContactResponse, reader: jspb.BinaryReader): DeleteContactResponse;
}

export namespace DeleteContactResponse {
  export type AsObject = {
  }
}

