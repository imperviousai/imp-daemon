/**
 * @fileoverview gRPC-Web generated client stub for websocket
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!


/* eslint-disable */
// @ts-nocheck


import * as grpcWeb from 'grpc-web';

import * as proto_imp_api_websocket_websocket_pb from '../../../../proto/imp/api/websocket/websocket_pb';


export class WebsocketClient {
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

  methodInfoSubscribe = new grpcWeb.MethodDescriptor(
    '/websocket.Websocket/Subscribe',
    grpcWeb.MethodType.SERVER_STREAMING,
    proto_imp_api_websocket_websocket_pb.SubscribeRequest,
    proto_imp_api_websocket_websocket_pb.SubscribeResponse,
    (request: proto_imp_api_websocket_websocket_pb.SubscribeRequest) => {
      return request.serializeBinary();
    },
    proto_imp_api_websocket_websocket_pb.SubscribeResponse.deserializeBinary
  );

  subscribe(
    request: proto_imp_api_websocket_websocket_pb.SubscribeRequest,
    metadata?: grpcWeb.Metadata) {
    return this.client_.serverStreaming(
      this.hostname_ +
        '/websocket.Websocket/Subscribe',
      request,
      metadata || {},
      this.methodInfoSubscribe);
  }

}

