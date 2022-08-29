/**
 * @fileoverview gRPC-Web generated client stub for ipfs
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!


/* eslint-disable */
// @ts-nocheck


import * as grpcWeb from 'grpc-web';

import * as proto_imp_api_ipfs_ipfs_pb from '../../../../proto/imp/api/ipfs/ipfs_pb';


export class IPFSClient {
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

  methodInfoAddFile = new grpcWeb.MethodDescriptor(
    '/ipfs.IPFS/AddFile',
    grpcWeb.MethodType.UNARY,
    proto_imp_api_ipfs_ipfs_pb.AddFileRequest,
    proto_imp_api_ipfs_ipfs_pb.AddFileResponse,
    (request: proto_imp_api_ipfs_ipfs_pb.AddFileRequest) => {
      return request.serializeBinary();
    },
    proto_imp_api_ipfs_ipfs_pb.AddFileResponse.deserializeBinary
  );

  addFile(
    request: proto_imp_api_ipfs_ipfs_pb.AddFileRequest,
    metadata: grpcWeb.Metadata | null): Promise<proto_imp_api_ipfs_ipfs_pb.AddFileResponse>;

  addFile(
    request: proto_imp_api_ipfs_ipfs_pb.AddFileRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.RpcError,
               response: proto_imp_api_ipfs_ipfs_pb.AddFileResponse) => void): grpcWeb.ClientReadableStream<proto_imp_api_ipfs_ipfs_pb.AddFileResponse>;

  addFile(
    request: proto_imp_api_ipfs_ipfs_pb.AddFileRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.RpcError,
               response: proto_imp_api_ipfs_ipfs_pb.AddFileResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/ipfs.IPFS/AddFile',
        request,
        metadata || {},
        this.methodInfoAddFile,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/ipfs.IPFS/AddFile',
    request,
    metadata || {},
    this.methodInfoAddFile);
  }

  methodInfoGetFile = new grpcWeb.MethodDescriptor(
    '/ipfs.IPFS/GetFile',
    grpcWeb.MethodType.UNARY,
    proto_imp_api_ipfs_ipfs_pb.GetFileRequest,
    proto_imp_api_ipfs_ipfs_pb.GetFileResponse,
    (request: proto_imp_api_ipfs_ipfs_pb.GetFileRequest) => {
      return request.serializeBinary();
    },
    proto_imp_api_ipfs_ipfs_pb.GetFileResponse.deserializeBinary
  );

  getFile(
    request: proto_imp_api_ipfs_ipfs_pb.GetFileRequest,
    metadata: grpcWeb.Metadata | null): Promise<proto_imp_api_ipfs_ipfs_pb.GetFileResponse>;

  getFile(
    request: proto_imp_api_ipfs_ipfs_pb.GetFileRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.RpcError,
               response: proto_imp_api_ipfs_ipfs_pb.GetFileResponse) => void): grpcWeb.ClientReadableStream<proto_imp_api_ipfs_ipfs_pb.GetFileResponse>;

  getFile(
    request: proto_imp_api_ipfs_ipfs_pb.GetFileRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.RpcError,
               response: proto_imp_api_ipfs_ipfs_pb.GetFileResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/ipfs.IPFS/GetFile',
        request,
        metadata || {},
        this.methodInfoGetFile,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/ipfs.IPFS/GetFile',
    request,
    metadata || {},
    this.methodInfoGetFile);
  }

  methodInfoListFiles = new grpcWeb.MethodDescriptor(
    '/ipfs.IPFS/ListFiles',
    grpcWeb.MethodType.UNARY,
    proto_imp_api_ipfs_ipfs_pb.ListFilesRequest,
    proto_imp_api_ipfs_ipfs_pb.ListFilesResponse,
    (request: proto_imp_api_ipfs_ipfs_pb.ListFilesRequest) => {
      return request.serializeBinary();
    },
    proto_imp_api_ipfs_ipfs_pb.ListFilesResponse.deserializeBinary
  );

  listFiles(
    request: proto_imp_api_ipfs_ipfs_pb.ListFilesRequest,
    metadata: grpcWeb.Metadata | null): Promise<proto_imp_api_ipfs_ipfs_pb.ListFilesResponse>;

  listFiles(
    request: proto_imp_api_ipfs_ipfs_pb.ListFilesRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.RpcError,
               response: proto_imp_api_ipfs_ipfs_pb.ListFilesResponse) => void): grpcWeb.ClientReadableStream<proto_imp_api_ipfs_ipfs_pb.ListFilesResponse>;

  listFiles(
    request: proto_imp_api_ipfs_ipfs_pb.ListFilesRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.RpcError,
               response: proto_imp_api_ipfs_ipfs_pb.ListFilesResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/ipfs.IPFS/ListFiles',
        request,
        metadata || {},
        this.methodInfoListFiles,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/ipfs.IPFS/ListFiles',
    request,
    metadata || {},
    this.methodInfoListFiles);
  }

}

