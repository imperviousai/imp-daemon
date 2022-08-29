/**
 * @fileoverview gRPC-Web generated client stub for messaging
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!


/* eslint-disable */
// @ts-nocheck


import * as grpcWeb from 'grpc-web';

import * as proto_imp_api_messaging_messaging_pb from '../../../../proto/imp/api/messaging/messaging_pb';


export class MessagingClient {
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

  methodInfoSendMessage = new grpcWeb.MethodDescriptor(
    '/messaging.Messaging/SendMessage',
    grpcWeb.MethodType.UNARY,
    proto_imp_api_messaging_messaging_pb.SendMessageRequest,
    proto_imp_api_messaging_messaging_pb.SendMessageResponse,
    (request: proto_imp_api_messaging_messaging_pb.SendMessageRequest) => {
      return request.serializeBinary();
    },
    proto_imp_api_messaging_messaging_pb.SendMessageResponse.deserializeBinary
  );

  sendMessage(
    request: proto_imp_api_messaging_messaging_pb.SendMessageRequest,
    metadata: grpcWeb.Metadata | null): Promise<proto_imp_api_messaging_messaging_pb.SendMessageResponse>;

  sendMessage(
    request: proto_imp_api_messaging_messaging_pb.SendMessageRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.RpcError,
               response: proto_imp_api_messaging_messaging_pb.SendMessageResponse) => void): grpcWeb.ClientReadableStream<proto_imp_api_messaging_messaging_pb.SendMessageResponse>;

  sendMessage(
    request: proto_imp_api_messaging_messaging_pb.SendMessageRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.RpcError,
               response: proto_imp_api_messaging_messaging_pb.SendMessageResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/messaging.Messaging/SendMessage',
        request,
        metadata || {},
        this.methodInfoSendMessage,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/messaging.Messaging/SendMessage',
    request,
    metadata || {},
    this.methodInfoSendMessage);
  }

  methodInfoSendMessageV2 = new grpcWeb.MethodDescriptor(
    '/messaging.Messaging/SendMessageV2',
    grpcWeb.MethodType.UNARY,
    proto_imp_api_messaging_messaging_pb.SendMessageV2Request,
    proto_imp_api_messaging_messaging_pb.SendMessageV2Response,
    (request: proto_imp_api_messaging_messaging_pb.SendMessageV2Request) => {
      return request.serializeBinary();
    },
    proto_imp_api_messaging_messaging_pb.SendMessageV2Response.deserializeBinary
  );

  sendMessageV2(
    request: proto_imp_api_messaging_messaging_pb.SendMessageV2Request,
    metadata: grpcWeb.Metadata | null): Promise<proto_imp_api_messaging_messaging_pb.SendMessageV2Response>;

  sendMessageV2(
    request: proto_imp_api_messaging_messaging_pb.SendMessageV2Request,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.RpcError,
               response: proto_imp_api_messaging_messaging_pb.SendMessageV2Response) => void): grpcWeb.ClientReadableStream<proto_imp_api_messaging_messaging_pb.SendMessageV2Response>;

  sendMessageV2(
    request: proto_imp_api_messaging_messaging_pb.SendMessageV2Request,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.RpcError,
               response: proto_imp_api_messaging_messaging_pb.SendMessageV2Response) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/messaging.Messaging/SendMessageV2',
        request,
        metadata || {},
        this.methodInfoSendMessageV2,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/messaging.Messaging/SendMessageV2',
    request,
    metadata || {},
    this.methodInfoSendMessageV2);
  }

  methodInfoSaveMessageV2 = new grpcWeb.MethodDescriptor(
    '/messaging.Messaging/SaveMessageV2',
    grpcWeb.MethodType.UNARY,
    proto_imp_api_messaging_messaging_pb.SaveMessageV2Request,
    proto_imp_api_messaging_messaging_pb.SaveMessageV2Response,
    (request: proto_imp_api_messaging_messaging_pb.SaveMessageV2Request) => {
      return request.serializeBinary();
    },
    proto_imp_api_messaging_messaging_pb.SaveMessageV2Response.deserializeBinary
  );

  saveMessageV2(
    request: proto_imp_api_messaging_messaging_pb.SaveMessageV2Request,
    metadata: grpcWeb.Metadata | null): Promise<proto_imp_api_messaging_messaging_pb.SaveMessageV2Response>;

  saveMessageV2(
    request: proto_imp_api_messaging_messaging_pb.SaveMessageV2Request,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.RpcError,
               response: proto_imp_api_messaging_messaging_pb.SaveMessageV2Response) => void): grpcWeb.ClientReadableStream<proto_imp_api_messaging_messaging_pb.SaveMessageV2Response>;

  saveMessageV2(
    request: proto_imp_api_messaging_messaging_pb.SaveMessageV2Request,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.RpcError,
               response: proto_imp_api_messaging_messaging_pb.SaveMessageV2Response) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/messaging.Messaging/SaveMessageV2',
        request,
        metadata || {},
        this.methodInfoSaveMessageV2,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/messaging.Messaging/SaveMessageV2',
    request,
    metadata || {},
    this.methodInfoSaveMessageV2);
  }

  methodInfoGetMessageList = new grpcWeb.MethodDescriptor(
    '/messaging.Messaging/GetMessageList',
    grpcWeb.MethodType.UNARY,
    proto_imp_api_messaging_messaging_pb.GetMessageListRequest,
    proto_imp_api_messaging_messaging_pb.GetMessageListResponse,
    (request: proto_imp_api_messaging_messaging_pb.GetMessageListRequest) => {
      return request.serializeBinary();
    },
    proto_imp_api_messaging_messaging_pb.GetMessageListResponse.deserializeBinary
  );

  getMessageList(
    request: proto_imp_api_messaging_messaging_pb.GetMessageListRequest,
    metadata: grpcWeb.Metadata | null): Promise<proto_imp_api_messaging_messaging_pb.GetMessageListResponse>;

  getMessageList(
    request: proto_imp_api_messaging_messaging_pb.GetMessageListRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.RpcError,
               response: proto_imp_api_messaging_messaging_pb.GetMessageListResponse) => void): grpcWeb.ClientReadableStream<proto_imp_api_messaging_messaging_pb.GetMessageListResponse>;

  getMessageList(
    request: proto_imp_api_messaging_messaging_pb.GetMessageListRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.RpcError,
               response: proto_imp_api_messaging_messaging_pb.GetMessageListResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/messaging.Messaging/GetMessageList',
        request,
        metadata || {},
        this.methodInfoGetMessageList,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/messaging.Messaging/GetMessageList',
    request,
    metadata || {},
    this.methodInfoGetMessageList);
  }

  methodInfoDeleteMessage = new grpcWeb.MethodDescriptor(
    '/messaging.Messaging/DeleteMessage',
    grpcWeb.MethodType.UNARY,
    proto_imp_api_messaging_messaging_pb.DeleteMessageRequest,
    proto_imp_api_messaging_messaging_pb.DeleteMessageResponse,
    (request: proto_imp_api_messaging_messaging_pb.DeleteMessageRequest) => {
      return request.serializeBinary();
    },
    proto_imp_api_messaging_messaging_pb.DeleteMessageResponse.deserializeBinary
  );

  deleteMessage(
    request: proto_imp_api_messaging_messaging_pb.DeleteMessageRequest,
    metadata: grpcWeb.Metadata | null): Promise<proto_imp_api_messaging_messaging_pb.DeleteMessageResponse>;

  deleteMessage(
    request: proto_imp_api_messaging_messaging_pb.DeleteMessageRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.RpcError,
               response: proto_imp_api_messaging_messaging_pb.DeleteMessageResponse) => void): grpcWeb.ClientReadableStream<proto_imp_api_messaging_messaging_pb.DeleteMessageResponse>;

  deleteMessage(
    request: proto_imp_api_messaging_messaging_pb.DeleteMessageRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.RpcError,
               response: proto_imp_api_messaging_messaging_pb.DeleteMessageResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/messaging.Messaging/DeleteMessage',
        request,
        metadata || {},
        this.methodInfoDeleteMessage,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/messaging.Messaging/DeleteMessage',
    request,
    metadata || {},
    this.methodInfoDeleteMessage);
  }

  methodInfoDeleteGroupMessage = new grpcWeb.MethodDescriptor(
    '/messaging.Messaging/DeleteGroupMessage',
    grpcWeb.MethodType.UNARY,
    proto_imp_api_messaging_messaging_pb.DeleteGroupMessageRequest,
    proto_imp_api_messaging_messaging_pb.DeleteGroupMessageResponse,
    (request: proto_imp_api_messaging_messaging_pb.DeleteGroupMessageRequest) => {
      return request.serializeBinary();
    },
    proto_imp_api_messaging_messaging_pb.DeleteGroupMessageResponse.deserializeBinary
  );

  deleteGroupMessage(
    request: proto_imp_api_messaging_messaging_pb.DeleteGroupMessageRequest,
    metadata: grpcWeb.Metadata | null): Promise<proto_imp_api_messaging_messaging_pb.DeleteGroupMessageResponse>;

  deleteGroupMessage(
    request: proto_imp_api_messaging_messaging_pb.DeleteGroupMessageRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.RpcError,
               response: proto_imp_api_messaging_messaging_pb.DeleteGroupMessageResponse) => void): grpcWeb.ClientReadableStream<proto_imp_api_messaging_messaging_pb.DeleteGroupMessageResponse>;

  deleteGroupMessage(
    request: proto_imp_api_messaging_messaging_pb.DeleteGroupMessageRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.RpcError,
               response: proto_imp_api_messaging_messaging_pb.DeleteGroupMessageResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/messaging.Messaging/DeleteGroupMessage',
        request,
        metadata || {},
        this.methodInfoDeleteGroupMessage,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/messaging.Messaging/DeleteGroupMessage',
    request,
    metadata || {},
    this.methodInfoDeleteGroupMessage);
  }

}

