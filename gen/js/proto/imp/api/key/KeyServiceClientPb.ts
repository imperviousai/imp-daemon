/**
 * @fileoverview gRPC-Web generated client stub for key
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!


/* eslint-disable */
// @ts-nocheck


import * as grpcWeb from 'grpc-web';

import * as proto_imp_api_key_key_pb from '../../../../proto/imp/api/key/key_pb';


export class KeyClient {
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

  methodInfoInitSeed = new grpcWeb.MethodDescriptor(
    '/key.Key/InitSeed',
    grpcWeb.MethodType.UNARY,
    proto_imp_api_key_key_pb.InitSeedRequest,
    proto_imp_api_key_key_pb.InitSeedResponse,
    (request: proto_imp_api_key_key_pb.InitSeedRequest) => {
      return request.serializeBinary();
    },
    proto_imp_api_key_key_pb.InitSeedResponse.deserializeBinary
  );

  initSeed(
    request: proto_imp_api_key_key_pb.InitSeedRequest,
    metadata: grpcWeb.Metadata | null): Promise<proto_imp_api_key_key_pb.InitSeedResponse>;

  initSeed(
    request: proto_imp_api_key_key_pb.InitSeedRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.RpcError,
               response: proto_imp_api_key_key_pb.InitSeedResponse) => void): grpcWeb.ClientReadableStream<proto_imp_api_key_key_pb.InitSeedResponse>;

  initSeed(
    request: proto_imp_api_key_key_pb.InitSeedRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.RpcError,
               response: proto_imp_api_key_key_pb.InitSeedResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/key.Key/InitSeed',
        request,
        metadata || {},
        this.methodInfoInitSeed,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/key.Key/InitSeed',
    request,
    metadata || {},
    this.methodInfoInitSeed);
  }

  methodInfoUnlockSeed = new grpcWeb.MethodDescriptor(
    '/key.Key/UnlockSeed',
    grpcWeb.MethodType.UNARY,
    proto_imp_api_key_key_pb.UnlockSeedRequest,
    proto_imp_api_key_key_pb.UnlockSeedResponse,
    (request: proto_imp_api_key_key_pb.UnlockSeedRequest) => {
      return request.serializeBinary();
    },
    proto_imp_api_key_key_pb.UnlockSeedResponse.deserializeBinary
  );

  unlockSeed(
    request: proto_imp_api_key_key_pb.UnlockSeedRequest,
    metadata: grpcWeb.Metadata | null): Promise<proto_imp_api_key_key_pb.UnlockSeedResponse>;

  unlockSeed(
    request: proto_imp_api_key_key_pb.UnlockSeedRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.RpcError,
               response: proto_imp_api_key_key_pb.UnlockSeedResponse) => void): grpcWeb.ClientReadableStream<proto_imp_api_key_key_pb.UnlockSeedResponse>;

  unlockSeed(
    request: proto_imp_api_key_key_pb.UnlockSeedRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.RpcError,
               response: proto_imp_api_key_key_pb.UnlockSeedResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/key.Key/UnlockSeed',
        request,
        metadata || {},
        this.methodInfoUnlockSeed,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/key.Key/UnlockSeed',
    request,
    metadata || {},
    this.methodInfoUnlockSeed);
  }

  methodInfoStatus = new grpcWeb.MethodDescriptor(
    '/key.Key/Status',
    grpcWeb.MethodType.UNARY,
    proto_imp_api_key_key_pb.StatusRequest,
    proto_imp_api_key_key_pb.StatusResponse,
    (request: proto_imp_api_key_key_pb.StatusRequest) => {
      return request.serializeBinary();
    },
    proto_imp_api_key_key_pb.StatusResponse.deserializeBinary
  );

  status(
    request: proto_imp_api_key_key_pb.StatusRequest,
    metadata: grpcWeb.Metadata | null): Promise<proto_imp_api_key_key_pb.StatusResponse>;

  status(
    request: proto_imp_api_key_key_pb.StatusRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.RpcError,
               response: proto_imp_api_key_key_pb.StatusResponse) => void): grpcWeb.ClientReadableStream<proto_imp_api_key_key_pb.StatusResponse>;

  status(
    request: proto_imp_api_key_key_pb.StatusRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.RpcError,
               response: proto_imp_api_key_key_pb.StatusResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/key.Key/Status',
        request,
        metadata || {},
        this.methodInfoStatus,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/key.Key/Status',
    request,
    metadata || {},
    this.methodInfoStatus);
  }

}

