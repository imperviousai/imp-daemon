/**
 * @fileoverview gRPC-Web generated client stub for id
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!


/* eslint-disable */
// @ts-nocheck


import * as grpcWeb from 'grpc-web';

import * as proto_imp_api_id_id_pb from '../../../../proto/imp/api/id/id_pb';


export class IDClient {
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

  methodInfoResolveDID = new grpcWeb.MethodDescriptor(
    '/id.ID/ResolveDID',
    grpcWeb.MethodType.UNARY,
    proto_imp_api_id_id_pb.ResolveDIDRequest,
    proto_imp_api_id_id_pb.ResolveDIDResponse,
    (request: proto_imp_api_id_id_pb.ResolveDIDRequest) => {
      return request.serializeBinary();
    },
    proto_imp_api_id_id_pb.ResolveDIDResponse.deserializeBinary
  );

  resolveDID(
    request: proto_imp_api_id_id_pb.ResolveDIDRequest,
    metadata: grpcWeb.Metadata | null): Promise<proto_imp_api_id_id_pb.ResolveDIDResponse>;

  resolveDID(
    request: proto_imp_api_id_id_pb.ResolveDIDRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.RpcError,
               response: proto_imp_api_id_id_pb.ResolveDIDResponse) => void): grpcWeb.ClientReadableStream<proto_imp_api_id_id_pb.ResolveDIDResponse>;

  resolveDID(
    request: proto_imp_api_id_id_pb.ResolveDIDRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.RpcError,
               response: proto_imp_api_id_id_pb.ResolveDIDResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/id.ID/ResolveDID',
        request,
        metadata || {},
        this.methodInfoResolveDID,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/id.ID/ResolveDID',
    request,
    metadata || {},
    this.methodInfoResolveDID);
  }

  methodInfoListDID = new grpcWeb.MethodDescriptor(
    '/id.ID/ListDID',
    grpcWeb.MethodType.UNARY,
    proto_imp_api_id_id_pb.ListDIDRequest,
    proto_imp_api_id_id_pb.ListDIDResponse,
    (request: proto_imp_api_id_id_pb.ListDIDRequest) => {
      return request.serializeBinary();
    },
    proto_imp_api_id_id_pb.ListDIDResponse.deserializeBinary
  );

  listDID(
    request: proto_imp_api_id_id_pb.ListDIDRequest,
    metadata: grpcWeb.Metadata | null): Promise<proto_imp_api_id_id_pb.ListDIDResponse>;

  listDID(
    request: proto_imp_api_id_id_pb.ListDIDRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.RpcError,
               response: proto_imp_api_id_id_pb.ListDIDResponse) => void): grpcWeb.ClientReadableStream<proto_imp_api_id_id_pb.ListDIDResponse>;

  listDID(
    request: proto_imp_api_id_id_pb.ListDIDRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.RpcError,
               response: proto_imp_api_id_id_pb.ListDIDResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/id.ID/ListDID',
        request,
        metadata || {},
        this.methodInfoListDID,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/id.ID/ListDID',
    request,
    metadata || {},
    this.methodInfoListDID);
  }

  methodInfoCreateDID = new grpcWeb.MethodDescriptor(
    '/id.ID/CreateDID',
    grpcWeb.MethodType.UNARY,
    proto_imp_api_id_id_pb.CreateDIDRequest,
    proto_imp_api_id_id_pb.CreateDIDResponse,
    (request: proto_imp_api_id_id_pb.CreateDIDRequest) => {
      return request.serializeBinary();
    },
    proto_imp_api_id_id_pb.CreateDIDResponse.deserializeBinary
  );

  createDID(
    request: proto_imp_api_id_id_pb.CreateDIDRequest,
    metadata: grpcWeb.Metadata | null): Promise<proto_imp_api_id_id_pb.CreateDIDResponse>;

  createDID(
    request: proto_imp_api_id_id_pb.CreateDIDRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.RpcError,
               response: proto_imp_api_id_id_pb.CreateDIDResponse) => void): grpcWeb.ClientReadableStream<proto_imp_api_id_id_pb.CreateDIDResponse>;

  createDID(
    request: proto_imp_api_id_id_pb.CreateDIDRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.RpcError,
               response: proto_imp_api_id_id_pb.CreateDIDResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/id.ID/CreateDID',
        request,
        metadata || {},
        this.methodInfoCreateDID,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/id.ID/CreateDID',
    request,
    metadata || {},
    this.methodInfoCreateDID);
  }

  methodInfoImportDID = new grpcWeb.MethodDescriptor(
    '/id.ID/ImportDID',
    grpcWeb.MethodType.UNARY,
    proto_imp_api_id_id_pb.ImportDIDRequest,
    proto_imp_api_id_id_pb.ImportDIDResponse,
    (request: proto_imp_api_id_id_pb.ImportDIDRequest) => {
      return request.serializeBinary();
    },
    proto_imp_api_id_id_pb.ImportDIDResponse.deserializeBinary
  );

  importDID(
    request: proto_imp_api_id_id_pb.ImportDIDRequest,
    metadata: grpcWeb.Metadata | null): Promise<proto_imp_api_id_id_pb.ImportDIDResponse>;

  importDID(
    request: proto_imp_api_id_id_pb.ImportDIDRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.RpcError,
               response: proto_imp_api_id_id_pb.ImportDIDResponse) => void): grpcWeb.ClientReadableStream<proto_imp_api_id_id_pb.ImportDIDResponse>;

  importDID(
    request: proto_imp_api_id_id_pb.ImportDIDRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.RpcError,
               response: proto_imp_api_id_id_pb.ImportDIDResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/id.ID/ImportDID',
        request,
        metadata || {},
        this.methodInfoImportDID,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/id.ID/ImportDID',
    request,
    metadata || {},
    this.methodInfoImportDID);
  }

  methodInfoUpdateDID = new grpcWeb.MethodDescriptor(
    '/id.ID/UpdateDID',
    grpcWeb.MethodType.UNARY,
    proto_imp_api_id_id_pb.UpdateDIDRequest,
    proto_imp_api_id_id_pb.UpdateDIDResponse,
    (request: proto_imp_api_id_id_pb.UpdateDIDRequest) => {
      return request.serializeBinary();
    },
    proto_imp_api_id_id_pb.UpdateDIDResponse.deserializeBinary
  );

  updateDID(
    request: proto_imp_api_id_id_pb.UpdateDIDRequest,
    metadata: grpcWeb.Metadata | null): Promise<proto_imp_api_id_id_pb.UpdateDIDResponse>;

  updateDID(
    request: proto_imp_api_id_id_pb.UpdateDIDRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.RpcError,
               response: proto_imp_api_id_id_pb.UpdateDIDResponse) => void): grpcWeb.ClientReadableStream<proto_imp_api_id_id_pb.UpdateDIDResponse>;

  updateDID(
    request: proto_imp_api_id_id_pb.UpdateDIDRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.RpcError,
               response: proto_imp_api_id_id_pb.UpdateDIDResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/id.ID/UpdateDID',
        request,
        metadata || {},
        this.methodInfoUpdateDID,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/id.ID/UpdateDID',
    request,
    metadata || {},
    this.methodInfoUpdateDID);
  }

  methodInfoDeleteDID = new grpcWeb.MethodDescriptor(
    '/id.ID/DeleteDID',
    grpcWeb.MethodType.UNARY,
    proto_imp_api_id_id_pb.DeleteDIDRequest,
    proto_imp_api_id_id_pb.DeleteDIDResponse,
    (request: proto_imp_api_id_id_pb.DeleteDIDRequest) => {
      return request.serializeBinary();
    },
    proto_imp_api_id_id_pb.DeleteDIDResponse.deserializeBinary
  );

  deleteDID(
    request: proto_imp_api_id_id_pb.DeleteDIDRequest,
    metadata: grpcWeb.Metadata | null): Promise<proto_imp_api_id_id_pb.DeleteDIDResponse>;

  deleteDID(
    request: proto_imp_api_id_id_pb.DeleteDIDRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.RpcError,
               response: proto_imp_api_id_id_pb.DeleteDIDResponse) => void): grpcWeb.ClientReadableStream<proto_imp_api_id_id_pb.DeleteDIDResponse>;

  deleteDID(
    request: proto_imp_api_id_id_pb.DeleteDIDRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.RpcError,
               response: proto_imp_api_id_id_pb.DeleteDIDResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/id.ID/DeleteDID',
        request,
        metadata || {},
        this.methodInfoDeleteDID,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/id.ID/DeleteDID',
    request,
    metadata || {},
    this.methodInfoDeleteDID);
  }

  methodInfoBackupDID = new grpcWeb.MethodDescriptor(
    '/id.ID/BackupDID',
    grpcWeb.MethodType.UNARY,
    proto_imp_api_id_id_pb.BackupDIDRequest,
    proto_imp_api_id_id_pb.BackupDIDResponse,
    (request: proto_imp_api_id_id_pb.BackupDIDRequest) => {
      return request.serializeBinary();
    },
    proto_imp_api_id_id_pb.BackupDIDResponse.deserializeBinary
  );

  backupDID(
    request: proto_imp_api_id_id_pb.BackupDIDRequest,
    metadata: grpcWeb.Metadata | null): Promise<proto_imp_api_id_id_pb.BackupDIDResponse>;

  backupDID(
    request: proto_imp_api_id_id_pb.BackupDIDRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.RpcError,
               response: proto_imp_api_id_id_pb.BackupDIDResponse) => void): grpcWeb.ClientReadableStream<proto_imp_api_id_id_pb.BackupDIDResponse>;

  backupDID(
    request: proto_imp_api_id_id_pb.BackupDIDRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.RpcError,
               response: proto_imp_api_id_id_pb.BackupDIDResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/id.ID/BackupDID',
        request,
        metadata || {},
        this.methodInfoBackupDID,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/id.ID/BackupDID',
    request,
    metadata || {},
    this.methodInfoBackupDID);
  }

  methodInfoRecoverDID = new grpcWeb.MethodDescriptor(
    '/id.ID/RecoverDID',
    grpcWeb.MethodType.UNARY,
    proto_imp_api_id_id_pb.RecoverDIDRequest,
    proto_imp_api_id_id_pb.RecoverDIDResponse,
    (request: proto_imp_api_id_id_pb.RecoverDIDRequest) => {
      return request.serializeBinary();
    },
    proto_imp_api_id_id_pb.RecoverDIDResponse.deserializeBinary
  );

  recoverDID(
    request: proto_imp_api_id_id_pb.RecoverDIDRequest,
    metadata: grpcWeb.Metadata | null): Promise<proto_imp_api_id_id_pb.RecoverDIDResponse>;

  recoverDID(
    request: proto_imp_api_id_id_pb.RecoverDIDRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.RpcError,
               response: proto_imp_api_id_id_pb.RecoverDIDResponse) => void): grpcWeb.ClientReadableStream<proto_imp_api_id_id_pb.RecoverDIDResponse>;

  recoverDID(
    request: proto_imp_api_id_id_pb.RecoverDIDRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.RpcError,
               response: proto_imp_api_id_id_pb.RecoverDIDResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/id.ID/RecoverDID',
        request,
        metadata || {},
        this.methodInfoRecoverDID,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/id.ID/RecoverDID',
    request,
    metadata || {},
    this.methodInfoRecoverDID);
  }

}

