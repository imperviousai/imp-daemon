/**
 * @fileoverview gRPC-Web generated client stub for configs
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!


/* eslint-disable */
// @ts-nocheck


import * as grpcWeb from 'grpc-web';

import * as proto_imp_api_config_config_pb from '../../../../proto/imp/api/config/config_pb';


export class ConfigClient {
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

  methodInfoGetLightningConfig = new grpcWeb.MethodDescriptor(
    '/configs.Config/GetLightningConfig',
    grpcWeb.MethodType.UNARY,
    proto_imp_api_config_config_pb.GetLightningConfigRequest,
    proto_imp_api_config_config_pb.GetLightningConfigResponse,
    (request: proto_imp_api_config_config_pb.GetLightningConfigRequest) => {
      return request.serializeBinary();
    },
    proto_imp_api_config_config_pb.GetLightningConfigResponse.deserializeBinary
  );

  getLightningConfig(
    request: proto_imp_api_config_config_pb.GetLightningConfigRequest,
    metadata: grpcWeb.Metadata | null): Promise<proto_imp_api_config_config_pb.GetLightningConfigResponse>;

  getLightningConfig(
    request: proto_imp_api_config_config_pb.GetLightningConfigRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.RpcError,
               response: proto_imp_api_config_config_pb.GetLightningConfigResponse) => void): grpcWeb.ClientReadableStream<proto_imp_api_config_config_pb.GetLightningConfigResponse>;

  getLightningConfig(
    request: proto_imp_api_config_config_pb.GetLightningConfigRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.RpcError,
               response: proto_imp_api_config_config_pb.GetLightningConfigResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/configs.Config/GetLightningConfig',
        request,
        metadata || {},
        this.methodInfoGetLightningConfig,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/configs.Config/GetLightningConfig',
    request,
    metadata || {},
    this.methodInfoGetLightningConfig);
  }

  methodInfoSaveLightningConfig = new grpcWeb.MethodDescriptor(
    '/configs.Config/SaveLightningConfig',
    grpcWeb.MethodType.UNARY,
    proto_imp_api_config_config_pb.SaveLightningConfigRequest,
    proto_imp_api_config_config_pb.SaveLightningConfigResponse,
    (request: proto_imp_api_config_config_pb.SaveLightningConfigRequest) => {
      return request.serializeBinary();
    },
    proto_imp_api_config_config_pb.SaveLightningConfigResponse.deserializeBinary
  );

  saveLightningConfig(
    request: proto_imp_api_config_config_pb.SaveLightningConfigRequest,
    metadata: grpcWeb.Metadata | null): Promise<proto_imp_api_config_config_pb.SaveLightningConfigResponse>;

  saveLightningConfig(
    request: proto_imp_api_config_config_pb.SaveLightningConfigRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.RpcError,
               response: proto_imp_api_config_config_pb.SaveLightningConfigResponse) => void): grpcWeb.ClientReadableStream<proto_imp_api_config_config_pb.SaveLightningConfigResponse>;

  saveLightningConfig(
    request: proto_imp_api_config_config_pb.SaveLightningConfigRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.RpcError,
               response: proto_imp_api_config_config_pb.SaveLightningConfigResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/configs.Config/SaveLightningConfig',
        request,
        metadata || {},
        this.methodInfoSaveLightningConfig,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/configs.Config/SaveLightningConfig',
    request,
    metadata || {},
    this.methodInfoSaveLightningConfig);
  }

  methodInfoGetIONConfig = new grpcWeb.MethodDescriptor(
    '/configs.Config/GetIONConfig',
    grpcWeb.MethodType.UNARY,
    proto_imp_api_config_config_pb.GetIONConfigRequest,
    proto_imp_api_config_config_pb.GetIONConfigResponse,
    (request: proto_imp_api_config_config_pb.GetIONConfigRequest) => {
      return request.serializeBinary();
    },
    proto_imp_api_config_config_pb.GetIONConfigResponse.deserializeBinary
  );

  getIONConfig(
    request: proto_imp_api_config_config_pb.GetIONConfigRequest,
    metadata: grpcWeb.Metadata | null): Promise<proto_imp_api_config_config_pb.GetIONConfigResponse>;

  getIONConfig(
    request: proto_imp_api_config_config_pb.GetIONConfigRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.RpcError,
               response: proto_imp_api_config_config_pb.GetIONConfigResponse) => void): grpcWeb.ClientReadableStream<proto_imp_api_config_config_pb.GetIONConfigResponse>;

  getIONConfig(
    request: proto_imp_api_config_config_pb.GetIONConfigRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.RpcError,
               response: proto_imp_api_config_config_pb.GetIONConfigResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/configs.Config/GetIONConfig',
        request,
        metadata || {},
        this.methodInfoGetIONConfig,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/configs.Config/GetIONConfig',
    request,
    metadata || {},
    this.methodInfoGetIONConfig);
  }

  methodInfoSaveIONConfig = new grpcWeb.MethodDescriptor(
    '/configs.Config/SaveIONConfig',
    grpcWeb.MethodType.UNARY,
    proto_imp_api_config_config_pb.SaveIONConfigRequest,
    proto_imp_api_config_config_pb.SaveIONConfigResponse,
    (request: proto_imp_api_config_config_pb.SaveIONConfigRequest) => {
      return request.serializeBinary();
    },
    proto_imp_api_config_config_pb.SaveIONConfigResponse.deserializeBinary
  );

  saveIONConfig(
    request: proto_imp_api_config_config_pb.SaveIONConfigRequest,
    metadata: grpcWeb.Metadata | null): Promise<proto_imp_api_config_config_pb.SaveIONConfigResponse>;

  saveIONConfig(
    request: proto_imp_api_config_config_pb.SaveIONConfigRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.RpcError,
               response: proto_imp_api_config_config_pb.SaveIONConfigResponse) => void): grpcWeb.ClientReadableStream<proto_imp_api_config_config_pb.SaveIONConfigResponse>;

  saveIONConfig(
    request: proto_imp_api_config_config_pb.SaveIONConfigRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.RpcError,
               response: proto_imp_api_config_config_pb.SaveIONConfigResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/configs.Config/SaveIONConfig',
        request,
        metadata || {},
        this.methodInfoSaveIONConfig,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/configs.Config/SaveIONConfig',
    request,
    metadata || {},
    this.methodInfoSaveIONConfig);
  }

}

