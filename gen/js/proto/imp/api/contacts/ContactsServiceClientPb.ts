/**
 * @fileoverview gRPC-Web generated client stub for contacts
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!


/* eslint-disable */
// @ts-nocheck


import * as grpcWeb from 'grpc-web';

import * as proto_imp_api_contacts_contacts_pb from '../../../../proto/imp/api/contacts/contacts_pb';


export class ContactsClient {
  client_: grpcWeb.AbstractClientBase;
  hostname_: string;
  credentials_: null | { [index: string]: string; };
  options_: null | { [index: string]: any; };

  constructor (hostname: string,
               credentials?: null | { [index: string]: string; },
               options?: null | { [index: string]: any; }) {
    if (!options) options = {};
    if (!credentials) credentials = {};
    options['format'] = 'binary';

    this.client_ = new grpcWeb.GrpcWebClientBase(options);
    this.hostname_ = hostname;
    this.credentials_ = credentials;
    this.options_ = options;
  }

  methodInfoGetContactsList = new grpcWeb.MethodDescriptor(
    '/contacts.Contacts/GetContactsList',
    grpcWeb.MethodType.UNARY,
    proto_imp_api_contacts_contacts_pb.GetContactsListRequest,
    proto_imp_api_contacts_contacts_pb.GetContactsListResponse,
    (request: proto_imp_api_contacts_contacts_pb.GetContactsListRequest) => {
      return request.serializeBinary();
    },
    proto_imp_api_contacts_contacts_pb.GetContactsListResponse.deserializeBinary
  );

  getContactsList(
    request: proto_imp_api_contacts_contacts_pb.GetContactsListRequest,
    metadata: grpcWeb.Metadata | null): Promise<proto_imp_api_contacts_contacts_pb.GetContactsListResponse>;

  getContactsList(
    request: proto_imp_api_contacts_contacts_pb.GetContactsListRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.RpcError,
               response: proto_imp_api_contacts_contacts_pb.GetContactsListResponse) => void): grpcWeb.ClientReadableStream<proto_imp_api_contacts_contacts_pb.GetContactsListResponse>;

  getContactsList(
    request: proto_imp_api_contacts_contacts_pb.GetContactsListRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.RpcError,
               response: proto_imp_api_contacts_contacts_pb.GetContactsListResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/contacts.Contacts/GetContactsList',
        request,
        metadata || {},
        this.methodInfoGetContactsList,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/contacts.Contacts/GetContactsList',
    request,
    metadata || {},
    this.methodInfoGetContactsList);
  }

  methodInfoGetContact = new grpcWeb.MethodDescriptor(
    '/contacts.Contacts/GetContact',
    grpcWeb.MethodType.UNARY,
    proto_imp_api_contacts_contacts_pb.GetContactRequest,
    proto_imp_api_contacts_contacts_pb.GetContactResponse,
    (request: proto_imp_api_contacts_contacts_pb.GetContactRequest) => {
      return request.serializeBinary();
    },
    proto_imp_api_contacts_contacts_pb.GetContactResponse.deserializeBinary
  );

  getContact(
    request: proto_imp_api_contacts_contacts_pb.GetContactRequest,
    metadata: grpcWeb.Metadata | null): Promise<proto_imp_api_contacts_contacts_pb.GetContactResponse>;

  getContact(
    request: proto_imp_api_contacts_contacts_pb.GetContactRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.RpcError,
               response: proto_imp_api_contacts_contacts_pb.GetContactResponse) => void): grpcWeb.ClientReadableStream<proto_imp_api_contacts_contacts_pb.GetContactResponse>;

  getContact(
    request: proto_imp_api_contacts_contacts_pb.GetContactRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.RpcError,
               response: proto_imp_api_contacts_contacts_pb.GetContactResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/contacts.Contacts/GetContact',
        request,
        metadata || {},
        this.methodInfoGetContact,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/contacts.Contacts/GetContact',
    request,
    metadata || {},
    this.methodInfoGetContact);
  }

  methodInfoCreateContact = new grpcWeb.MethodDescriptor(
    '/contacts.Contacts/CreateContact',
    grpcWeb.MethodType.UNARY,
    proto_imp_api_contacts_contacts_pb.CreateContactRequest,
    proto_imp_api_contacts_contacts_pb.CreateContactResponse,
    (request: proto_imp_api_contacts_contacts_pb.CreateContactRequest) => {
      return request.serializeBinary();
    },
    proto_imp_api_contacts_contacts_pb.CreateContactResponse.deserializeBinary
  );

  createContact(
    request: proto_imp_api_contacts_contacts_pb.CreateContactRequest,
    metadata: grpcWeb.Metadata | null): Promise<proto_imp_api_contacts_contacts_pb.CreateContactResponse>;

  createContact(
    request: proto_imp_api_contacts_contacts_pb.CreateContactRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.RpcError,
               response: proto_imp_api_contacts_contacts_pb.CreateContactResponse) => void): grpcWeb.ClientReadableStream<proto_imp_api_contacts_contacts_pb.CreateContactResponse>;

  createContact(
    request: proto_imp_api_contacts_contacts_pb.CreateContactRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.RpcError,
               response: proto_imp_api_contacts_contacts_pb.CreateContactResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/contacts.Contacts/CreateContact',
        request,
        metadata || {},
        this.methodInfoCreateContact,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/contacts.Contacts/CreateContact',
    request,
    metadata || {},
    this.methodInfoCreateContact);
  }

  methodInfoCreateContacts = new grpcWeb.MethodDescriptor(
    '/contacts.Contacts/CreateContacts',
    grpcWeb.MethodType.UNARY,
    proto_imp_api_contacts_contacts_pb.CreateContactsRequest,
    proto_imp_api_contacts_contacts_pb.CreateContactsResponse,
    (request: proto_imp_api_contacts_contacts_pb.CreateContactsRequest) => {
      return request.serializeBinary();
    },
    proto_imp_api_contacts_contacts_pb.CreateContactsResponse.deserializeBinary
  );

  createContacts(
    request: proto_imp_api_contacts_contacts_pb.CreateContactsRequest,
    metadata: grpcWeb.Metadata | null): Promise<proto_imp_api_contacts_contacts_pb.CreateContactsResponse>;

  createContacts(
    request: proto_imp_api_contacts_contacts_pb.CreateContactsRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.RpcError,
               response: proto_imp_api_contacts_contacts_pb.CreateContactsResponse) => void): grpcWeb.ClientReadableStream<proto_imp_api_contacts_contacts_pb.CreateContactsResponse>;

  createContacts(
    request: proto_imp_api_contacts_contacts_pb.CreateContactsRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.RpcError,
               response: proto_imp_api_contacts_contacts_pb.CreateContactsResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/contacts.Contacts/CreateContacts',
        request,
        metadata || {},
        this.methodInfoCreateContacts,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/contacts.Contacts/CreateContacts',
    request,
    metadata || {},
    this.methodInfoCreateContacts);
  }

  methodInfoUpdateContact = new grpcWeb.MethodDescriptor(
    '/contacts.Contacts/UpdateContact',
    grpcWeb.MethodType.UNARY,
    proto_imp_api_contacts_contacts_pb.UpdateContactRequest,
    proto_imp_api_contacts_contacts_pb.UpdateContactResponse,
    (request: proto_imp_api_contacts_contacts_pb.UpdateContactRequest) => {
      return request.serializeBinary();
    },
    proto_imp_api_contacts_contacts_pb.UpdateContactResponse.deserializeBinary
  );

  updateContact(
    request: proto_imp_api_contacts_contacts_pb.UpdateContactRequest,
    metadata: grpcWeb.Metadata | null): Promise<proto_imp_api_contacts_contacts_pb.UpdateContactResponse>;

  updateContact(
    request: proto_imp_api_contacts_contacts_pb.UpdateContactRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.RpcError,
               response: proto_imp_api_contacts_contacts_pb.UpdateContactResponse) => void): grpcWeb.ClientReadableStream<proto_imp_api_contacts_contacts_pb.UpdateContactResponse>;

  updateContact(
    request: proto_imp_api_contacts_contacts_pb.UpdateContactRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.RpcError,
               response: proto_imp_api_contacts_contacts_pb.UpdateContactResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/contacts.Contacts/UpdateContact',
        request,
        metadata || {},
        this.methodInfoUpdateContact,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/contacts.Contacts/UpdateContact',
    request,
    metadata || {},
    this.methodInfoUpdateContact);
  }

  methodInfoDeleteContact = new grpcWeb.MethodDescriptor(
    '/contacts.Contacts/DeleteContact',
    grpcWeb.MethodType.UNARY,
    proto_imp_api_contacts_contacts_pb.DeleteContactRequest,
    proto_imp_api_contacts_contacts_pb.DeleteContactResponse,
    (request: proto_imp_api_contacts_contacts_pb.DeleteContactRequest) => {
      return request.serializeBinary();
    },
    proto_imp_api_contacts_contacts_pb.DeleteContactResponse.deserializeBinary
  );

  deleteContact(
    request: proto_imp_api_contacts_contacts_pb.DeleteContactRequest,
    metadata: grpcWeb.Metadata | null): Promise<proto_imp_api_contacts_contacts_pb.DeleteContactResponse>;

  deleteContact(
    request: proto_imp_api_contacts_contacts_pb.DeleteContactRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.RpcError,
               response: proto_imp_api_contacts_contacts_pb.DeleteContactResponse) => void): grpcWeb.ClientReadableStream<proto_imp_api_contacts_contacts_pb.DeleteContactResponse>;

  deleteContact(
    request: proto_imp_api_contacts_contacts_pb.DeleteContactRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.RpcError,
               response: proto_imp_api_contacts_contacts_pb.DeleteContactResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/contacts.Contacts/DeleteContact',
        request,
        metadata || {},
        this.methodInfoDeleteContact,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/contacts.Contacts/DeleteContact',
    request,
    metadata || {},
    this.methodInfoDeleteContact);
  }

}

