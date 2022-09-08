/**
 * @fileoverview gRPC-Web generated client stub for core
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!


/* eslint-disable */
// @ts-nocheck


import * as grpcWeb from 'grpc-web';

import * as proto_imp_api_core_core_pb from '../../../../proto/imp/api/core/core_pb';


export class CoreClient {
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

  methodInfoStatus = new grpcWeb.MethodDescriptor(
    '/core.Core/Status',
    grpcWeb.MethodType.UNARY,
    proto_imp_api_core_core_pb.StatusRequest,
    proto_imp_api_core_core_pb.StatusResponse,
    (request: proto_imp_api_core_core_pb.StatusRequest) => {
      return request.serializeBinary();
    },
    proto_imp_api_core_core_pb.StatusResponse.deserializeBinary
  );

  status(
    request: proto_imp_api_core_core_pb.StatusRequest,
    metadata: grpcWeb.Metadata | null): Promise<proto_imp_api_core_core_pb.StatusResponse>;

  status(
    request: proto_imp_api_core_core_pb.StatusRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.RpcError,
               response: proto_imp_api_core_core_pb.StatusResponse) => void): grpcWeb.ClientReadableStream<proto_imp_api_core_core_pb.StatusResponse>;

  status(
    request: proto_imp_api_core_core_pb.StatusRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.RpcError,
               response: proto_imp_api_core_core_pb.StatusResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/core.Core/Status',
        request,
        metadata || {},
        this.methodInfoStatus,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/core.Core/Status',
    request,
    metadata || {},
    this.methodInfoStatus);
  }

}

