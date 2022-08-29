/**
 * @fileoverview gRPC-Web generated client stub for auth
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!


/* eslint-disable */
// @ts-nocheck


import * as grpcWeb from 'grpc-web';

import * as proto_imp_api_auth_auth_pb from '../../../../proto/imp/api/auth/auth_pb';


export class AuthClient {
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

  methodInfoGetAuthKeys = new grpcWeb.MethodDescriptor(
    '/auth.Auth/GetAuthKeys',
    grpcWeb.MethodType.UNARY,
    proto_imp_api_auth_auth_pb.GetAuthKeysRequest,
    proto_imp_api_auth_auth_pb.GetAuthKeysResponse,
    (request: proto_imp_api_auth_auth_pb.GetAuthKeysRequest) => {
      return request.serializeBinary();
    },
    proto_imp_api_auth_auth_pb.GetAuthKeysResponse.deserializeBinary
  );

  getAuthKeys(
    request: proto_imp_api_auth_auth_pb.GetAuthKeysRequest,
    metadata: grpcWeb.Metadata | null): Promise<proto_imp_api_auth_auth_pb.GetAuthKeysResponse>;

  getAuthKeys(
    request: proto_imp_api_auth_auth_pb.GetAuthKeysRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.RpcError,
               response: proto_imp_api_auth_auth_pb.GetAuthKeysResponse) => void): grpcWeb.ClientReadableStream<proto_imp_api_auth_auth_pb.GetAuthKeysResponse>;

  getAuthKeys(
    request: proto_imp_api_auth_auth_pb.GetAuthKeysRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.RpcError,
               response: proto_imp_api_auth_auth_pb.GetAuthKeysResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/auth.Auth/GetAuthKeys',
        request,
        metadata || {},
        this.methodInfoGetAuthKeys,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/auth.Auth/GetAuthKeys',
    request,
    metadata || {},
    this.methodInfoGetAuthKeys);
  }

  methodInfoCreateAuthKey = new grpcWeb.MethodDescriptor(
    '/auth.Auth/CreateAuthKey',
    grpcWeb.MethodType.UNARY,
    proto_imp_api_auth_auth_pb.CreateAuthKeyRequest,
    proto_imp_api_auth_auth_pb.CreateAuthKeyResponse,
    (request: proto_imp_api_auth_auth_pb.CreateAuthKeyRequest) => {
      return request.serializeBinary();
    },
    proto_imp_api_auth_auth_pb.CreateAuthKeyResponse.deserializeBinary
  );

  createAuthKey(
    request: proto_imp_api_auth_auth_pb.CreateAuthKeyRequest,
    metadata: grpcWeb.Metadata | null): Promise<proto_imp_api_auth_auth_pb.CreateAuthKeyResponse>;

  createAuthKey(
    request: proto_imp_api_auth_auth_pb.CreateAuthKeyRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.RpcError,
               response: proto_imp_api_auth_auth_pb.CreateAuthKeyResponse) => void): grpcWeb.ClientReadableStream<proto_imp_api_auth_auth_pb.CreateAuthKeyResponse>;

  createAuthKey(
    request: proto_imp_api_auth_auth_pb.CreateAuthKeyRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.RpcError,
               response: proto_imp_api_auth_auth_pb.CreateAuthKeyResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/auth.Auth/CreateAuthKey',
        request,
        metadata || {},
        this.methodInfoCreateAuthKey,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/auth.Auth/CreateAuthKey',
    request,
    metadata || {},
    this.methodInfoCreateAuthKey);
  }

  methodInfoUpdateAuthKey = new grpcWeb.MethodDescriptor(
    '/auth.Auth/UpdateAuthKey',
    grpcWeb.MethodType.UNARY,
    proto_imp_api_auth_auth_pb.UpdateAuthKeyRequest,
    proto_imp_api_auth_auth_pb.UpdateAuthKeyResponse,
    (request: proto_imp_api_auth_auth_pb.UpdateAuthKeyRequest) => {
      return request.serializeBinary();
    },
    proto_imp_api_auth_auth_pb.UpdateAuthKeyResponse.deserializeBinary
  );

  updateAuthKey(
    request: proto_imp_api_auth_auth_pb.UpdateAuthKeyRequest,
    metadata: grpcWeb.Metadata | null): Promise<proto_imp_api_auth_auth_pb.UpdateAuthKeyResponse>;

  updateAuthKey(
    request: proto_imp_api_auth_auth_pb.UpdateAuthKeyRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.RpcError,
               response: proto_imp_api_auth_auth_pb.UpdateAuthKeyResponse) => void): grpcWeb.ClientReadableStream<proto_imp_api_auth_auth_pb.UpdateAuthKeyResponse>;

  updateAuthKey(
    request: proto_imp_api_auth_auth_pb.UpdateAuthKeyRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.RpcError,
               response: proto_imp_api_auth_auth_pb.UpdateAuthKeyResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/auth.Auth/UpdateAuthKey',
        request,
        metadata || {},
        this.methodInfoUpdateAuthKey,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/auth.Auth/UpdateAuthKey',
    request,
    metadata || {},
    this.methodInfoUpdateAuthKey);
  }

  methodInfoDeleteAuthKey = new grpcWeb.MethodDescriptor(
    '/auth.Auth/DeleteAuthKey',
    grpcWeb.MethodType.UNARY,
    proto_imp_api_auth_auth_pb.DeleteAuthKeyRequest,
    proto_imp_api_auth_auth_pb.DeleteAuthKeyResponse,
    (request: proto_imp_api_auth_auth_pb.DeleteAuthKeyRequest) => {
      return request.serializeBinary();
    },
    proto_imp_api_auth_auth_pb.DeleteAuthKeyResponse.deserializeBinary
  );

  deleteAuthKey(
    request: proto_imp_api_auth_auth_pb.DeleteAuthKeyRequest,
    metadata: grpcWeb.Metadata | null): Promise<proto_imp_api_auth_auth_pb.DeleteAuthKeyResponse>;

  deleteAuthKey(
    request: proto_imp_api_auth_auth_pb.DeleteAuthKeyRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.RpcError,
               response: proto_imp_api_auth_auth_pb.DeleteAuthKeyResponse) => void): grpcWeb.ClientReadableStream<proto_imp_api_auth_auth_pb.DeleteAuthKeyResponse>;

  deleteAuthKey(
    request: proto_imp_api_auth_auth_pb.DeleteAuthKeyRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.RpcError,
               response: proto_imp_api_auth_auth_pb.DeleteAuthKeyResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/auth.Auth/DeleteAuthKey',
        request,
        metadata || {},
        this.methodInfoDeleteAuthKey,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/auth.Auth/DeleteAuthKey',
    request,
    metadata || {},
    this.methodInfoDeleteAuthKey);
  }

}

