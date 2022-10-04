/**
 * @fileoverview gRPC-Web generated client stub for kv
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!


/* eslint-disable */
// @ts-nocheck


import * as grpcWeb from 'grpc-web';

import * as proto_imp_api_kv_kv_pb from '../../../../proto/imp/api/kv/kv_pb';


export class KVClient {
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

  methodInfoGetKey = new grpcWeb.MethodDescriptor(
    '/kv.KV/GetKey',
    grpcWeb.MethodType.UNARY,
    proto_imp_api_kv_kv_pb.GetKeyRequest,
    proto_imp_api_kv_kv_pb.GetKeyResponse,
    (request: proto_imp_api_kv_kv_pb.GetKeyRequest) => {
      return request.serializeBinary();
    },
    proto_imp_api_kv_kv_pb.GetKeyResponse.deserializeBinary
  );

  getKey(
    request: proto_imp_api_kv_kv_pb.GetKeyRequest,
    metadata: grpcWeb.Metadata | null): Promise<proto_imp_api_kv_kv_pb.GetKeyResponse>;

  getKey(
    request: proto_imp_api_kv_kv_pb.GetKeyRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.RpcError,
               response: proto_imp_api_kv_kv_pb.GetKeyResponse) => void): grpcWeb.ClientReadableStream<proto_imp_api_kv_kv_pb.GetKeyResponse>;

  getKey(
    request: proto_imp_api_kv_kv_pb.GetKeyRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.RpcError,
               response: proto_imp_api_kv_kv_pb.GetKeyResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/kv.KV/GetKey',
        request,
        metadata || {},
        this.methodInfoGetKey,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/kv.KV/GetKey',
    request,
    metadata || {},
    this.methodInfoGetKey);
  }

  methodInfoSetKey = new grpcWeb.MethodDescriptor(
    '/kv.KV/SetKey',
    grpcWeb.MethodType.UNARY,
    proto_imp_api_kv_kv_pb.SetKeyRequest,
    proto_imp_api_kv_kv_pb.SetKeyResponse,
    (request: proto_imp_api_kv_kv_pb.SetKeyRequest) => {
      return request.serializeBinary();
    },
    proto_imp_api_kv_kv_pb.SetKeyResponse.deserializeBinary
  );

  setKey(
    request: proto_imp_api_kv_kv_pb.SetKeyRequest,
    metadata: grpcWeb.Metadata | null): Promise<proto_imp_api_kv_kv_pb.SetKeyResponse>;

  setKey(
    request: proto_imp_api_kv_kv_pb.SetKeyRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.RpcError,
               response: proto_imp_api_kv_kv_pb.SetKeyResponse) => void): grpcWeb.ClientReadableStream<proto_imp_api_kv_kv_pb.SetKeyResponse>;

  setKey(
    request: proto_imp_api_kv_kv_pb.SetKeyRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.RpcError,
               response: proto_imp_api_kv_kv_pb.SetKeyResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/kv.KV/SetKey',
        request,
        metadata || {},
        this.methodInfoSetKey,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/kv.KV/SetKey',
    request,
    metadata || {},
    this.methodInfoSetKey);
  }

  methodInfoDelKey = new grpcWeb.MethodDescriptor(
    '/kv.KV/DelKey',
    grpcWeb.MethodType.UNARY,
    proto_imp_api_kv_kv_pb.DelKeyRequest,
    proto_imp_api_kv_kv_pb.DelKeyResponse,
    (request: proto_imp_api_kv_kv_pb.DelKeyRequest) => {
      return request.serializeBinary();
    },
    proto_imp_api_kv_kv_pb.DelKeyResponse.deserializeBinary
  );

  delKey(
    request: proto_imp_api_kv_kv_pb.DelKeyRequest,
    metadata: grpcWeb.Metadata | null): Promise<proto_imp_api_kv_kv_pb.DelKeyResponse>;

  delKey(
    request: proto_imp_api_kv_kv_pb.DelKeyRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.RpcError,
               response: proto_imp_api_kv_kv_pb.DelKeyResponse) => void): grpcWeb.ClientReadableStream<proto_imp_api_kv_kv_pb.DelKeyResponse>;

  delKey(
    request: proto_imp_api_kv_kv_pb.DelKeyRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.RpcError,
               response: proto_imp_api_kv_kv_pb.DelKeyResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/kv.KV/DelKey',
        request,
        metadata || {},
        this.methodInfoDelKey,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/kv.KV/DelKey',
    request,
    metadata || {},
    this.methodInfoDelKey);
  }

}

