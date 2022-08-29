/**
 * @fileoverview gRPC-Web generated client stub for relay
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!


/* eslint-disable */
// @ts-nocheck


import * as grpcWeb from 'grpc-web';

import * as proto_imp_api_relay_relay_pb from '../../../../proto/imp/api/relay/relay_pb';


export class RelayClient {
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

  methodInfoRequestRelay = new grpcWeb.MethodDescriptor(
    '/relay.Relay/RequestRelay',
    grpcWeb.MethodType.UNARY,
    proto_imp_api_relay_relay_pb.RequestRelayRequest,
    proto_imp_api_relay_relay_pb.RequestRelayResponse,
    (request: proto_imp_api_relay_relay_pb.RequestRelayRequest) => {
      return request.serializeBinary();
    },
    proto_imp_api_relay_relay_pb.RequestRelayResponse.deserializeBinary
  );

  requestRelay(
    request: proto_imp_api_relay_relay_pb.RequestRelayRequest,
    metadata: grpcWeb.Metadata | null): Promise<proto_imp_api_relay_relay_pb.RequestRelayResponse>;

  requestRelay(
    request: proto_imp_api_relay_relay_pb.RequestRelayRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.RpcError,
               response: proto_imp_api_relay_relay_pb.RequestRelayResponse) => void): grpcWeb.ClientReadableStream<proto_imp_api_relay_relay_pb.RequestRelayResponse>;

  requestRelay(
    request: proto_imp_api_relay_relay_pb.RequestRelayRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.RpcError,
               response: proto_imp_api_relay_relay_pb.RequestRelayResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/relay.Relay/RequestRelay',
        request,
        metadata || {},
        this.methodInfoRequestRelay,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/relay.Relay/RequestRelay',
    request,
    metadata || {},
    this.methodInfoRequestRelay);
  }

  methodInfoRequestMailbox = new grpcWeb.MethodDescriptor(
    '/relay.Relay/RequestMailbox',
    grpcWeb.MethodType.UNARY,
    proto_imp_api_relay_relay_pb.RequestMailboxRequest,
    proto_imp_api_relay_relay_pb.RequestMailboxResponse,
    (request: proto_imp_api_relay_relay_pb.RequestMailboxRequest) => {
      return request.serializeBinary();
    },
    proto_imp_api_relay_relay_pb.RequestMailboxResponse.deserializeBinary
  );

  requestMailbox(
    request: proto_imp_api_relay_relay_pb.RequestMailboxRequest,
    metadata: grpcWeb.Metadata | null): Promise<proto_imp_api_relay_relay_pb.RequestMailboxResponse>;

  requestMailbox(
    request: proto_imp_api_relay_relay_pb.RequestMailboxRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.RpcError,
               response: proto_imp_api_relay_relay_pb.RequestMailboxResponse) => void): grpcWeb.ClientReadableStream<proto_imp_api_relay_relay_pb.RequestMailboxResponse>;

  requestMailbox(
    request: proto_imp_api_relay_relay_pb.RequestMailboxRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.RpcError,
               response: proto_imp_api_relay_relay_pb.RequestMailboxResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/relay.Relay/RequestMailbox',
        request,
        metadata || {},
        this.methodInfoRequestMailbox,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/relay.Relay/RequestMailbox',
    request,
    metadata || {},
    this.methodInfoRequestMailbox);
  }

}

