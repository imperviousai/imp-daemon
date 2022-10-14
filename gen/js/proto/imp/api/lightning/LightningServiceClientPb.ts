/**
 * @fileoverview gRPC-Web generated client stub for lightning
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!


/* eslint-disable */
// @ts-nocheck


import * as grpcWeb from 'grpc-web';

import * as proto_imp_api_lightning_lightning_pb from '../../../../proto/imp/api/lightning/lightning_pb';


export class LightningClient {
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

  methodInfoGetChannels = new grpcWeb.MethodDescriptor(
    '/lightning.Lightning/GetChannels',
    grpcWeb.MethodType.UNARY,
    proto_imp_api_lightning_lightning_pb.GetChannelsRequest,
    proto_imp_api_lightning_lightning_pb.GetChannelsResponse,
    (request: proto_imp_api_lightning_lightning_pb.GetChannelsRequest) => {
      return request.serializeBinary();
    },
    proto_imp_api_lightning_lightning_pb.GetChannelsResponse.deserializeBinary
  );

  getChannels(
    request: proto_imp_api_lightning_lightning_pb.GetChannelsRequest,
    metadata: grpcWeb.Metadata | null): Promise<proto_imp_api_lightning_lightning_pb.GetChannelsResponse>;

  getChannels(
    request: proto_imp_api_lightning_lightning_pb.GetChannelsRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.RpcError,
               response: proto_imp_api_lightning_lightning_pb.GetChannelsResponse) => void): grpcWeb.ClientReadableStream<proto_imp_api_lightning_lightning_pb.GetChannelsResponse>;

  getChannels(
    request: proto_imp_api_lightning_lightning_pb.GetChannelsRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.RpcError,
               response: proto_imp_api_lightning_lightning_pb.GetChannelsResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/lightning.Lightning/GetChannels',
        request,
        metadata || {},
        this.methodInfoGetChannels,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/lightning.Lightning/GetChannels',
    request,
    metadata || {},
    this.methodInfoGetChannels);
  }

  methodInfoListPayments = new grpcWeb.MethodDescriptor(
    '/lightning.Lightning/ListPayments',
    grpcWeb.MethodType.UNARY,
    proto_imp_api_lightning_lightning_pb.ListPaymentsRequest,
    proto_imp_api_lightning_lightning_pb.ListPaymentsResponse,
    (request: proto_imp_api_lightning_lightning_pb.ListPaymentsRequest) => {
      return request.serializeBinary();
    },
    proto_imp_api_lightning_lightning_pb.ListPaymentsResponse.deserializeBinary
  );

  listPayments(
    request: proto_imp_api_lightning_lightning_pb.ListPaymentsRequest,
    metadata: grpcWeb.Metadata | null): Promise<proto_imp_api_lightning_lightning_pb.ListPaymentsResponse>;

  listPayments(
    request: proto_imp_api_lightning_lightning_pb.ListPaymentsRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.RpcError,
               response: proto_imp_api_lightning_lightning_pb.ListPaymentsResponse) => void): grpcWeb.ClientReadableStream<proto_imp_api_lightning_lightning_pb.ListPaymentsResponse>;

  listPayments(
    request: proto_imp_api_lightning_lightning_pb.ListPaymentsRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.RpcError,
               response: proto_imp_api_lightning_lightning_pb.ListPaymentsResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/lightning.Lightning/ListPayments',
        request,
        metadata || {},
        this.methodInfoListPayments,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/lightning.Lightning/ListPayments',
    request,
    metadata || {},
    this.methodInfoListPayments);
  }

  methodInfoListInvoices = new grpcWeb.MethodDescriptor(
    '/lightning.Lightning/ListInvoices',
    grpcWeb.MethodType.UNARY,
    proto_imp_api_lightning_lightning_pb.ListInvoicesRequest,
    proto_imp_api_lightning_lightning_pb.ListInvoicesResponse,
    (request: proto_imp_api_lightning_lightning_pb.ListInvoicesRequest) => {
      return request.serializeBinary();
    },
    proto_imp_api_lightning_lightning_pb.ListInvoicesResponse.deserializeBinary
  );

  listInvoices(
    request: proto_imp_api_lightning_lightning_pb.ListInvoicesRequest,
    metadata: grpcWeb.Metadata | null): Promise<proto_imp_api_lightning_lightning_pb.ListInvoicesResponse>;

  listInvoices(
    request: proto_imp_api_lightning_lightning_pb.ListInvoicesRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.RpcError,
               response: proto_imp_api_lightning_lightning_pb.ListInvoicesResponse) => void): grpcWeb.ClientReadableStream<proto_imp_api_lightning_lightning_pb.ListInvoicesResponse>;

  listInvoices(
    request: proto_imp_api_lightning_lightning_pb.ListInvoicesRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.RpcError,
               response: proto_imp_api_lightning_lightning_pb.ListInvoicesResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/lightning.Lightning/ListInvoices',
        request,
        metadata || {},
        this.methodInfoListInvoices,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/lightning.Lightning/ListInvoices',
    request,
    metadata || {},
    this.methodInfoListInvoices);
  }

  methodInfoGenerateInvoice = new grpcWeb.MethodDescriptor(
    '/lightning.Lightning/GenerateInvoice',
    grpcWeb.MethodType.UNARY,
    proto_imp_api_lightning_lightning_pb.GenerateInvoiceRequest,
    proto_imp_api_lightning_lightning_pb.GenerateInvoiceResponse,
    (request: proto_imp_api_lightning_lightning_pb.GenerateInvoiceRequest) => {
      return request.serializeBinary();
    },
    proto_imp_api_lightning_lightning_pb.GenerateInvoiceResponse.deserializeBinary
  );

  generateInvoice(
    request: proto_imp_api_lightning_lightning_pb.GenerateInvoiceRequest,
    metadata: grpcWeb.Metadata | null): Promise<proto_imp_api_lightning_lightning_pb.GenerateInvoiceResponse>;

  generateInvoice(
    request: proto_imp_api_lightning_lightning_pb.GenerateInvoiceRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.RpcError,
               response: proto_imp_api_lightning_lightning_pb.GenerateInvoiceResponse) => void): grpcWeb.ClientReadableStream<proto_imp_api_lightning_lightning_pb.GenerateInvoiceResponse>;

  generateInvoice(
    request: proto_imp_api_lightning_lightning_pb.GenerateInvoiceRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.RpcError,
               response: proto_imp_api_lightning_lightning_pb.GenerateInvoiceResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/lightning.Lightning/GenerateInvoice',
        request,
        metadata || {},
        this.methodInfoGenerateInvoice,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/lightning.Lightning/GenerateInvoice',
    request,
    metadata || {},
    this.methodInfoGenerateInvoice);
  }

  methodInfoPayInvoice = new grpcWeb.MethodDescriptor(
    '/lightning.Lightning/PayInvoice',
    grpcWeb.MethodType.UNARY,
    proto_imp_api_lightning_lightning_pb.PayInvoiceRequest,
    proto_imp_api_lightning_lightning_pb.PayInvoiceResponse,
    (request: proto_imp_api_lightning_lightning_pb.PayInvoiceRequest) => {
      return request.serializeBinary();
    },
    proto_imp_api_lightning_lightning_pb.PayInvoiceResponse.deserializeBinary
  );

  payInvoice(
    request: proto_imp_api_lightning_lightning_pb.PayInvoiceRequest,
    metadata: grpcWeb.Metadata | null): Promise<proto_imp_api_lightning_lightning_pb.PayInvoiceResponse>;

  payInvoice(
    request: proto_imp_api_lightning_lightning_pb.PayInvoiceRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.RpcError,
               response: proto_imp_api_lightning_lightning_pb.PayInvoiceResponse) => void): grpcWeb.ClientReadableStream<proto_imp_api_lightning_lightning_pb.PayInvoiceResponse>;

  payInvoice(
    request: proto_imp_api_lightning_lightning_pb.PayInvoiceRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.RpcError,
               response: proto_imp_api_lightning_lightning_pb.PayInvoiceResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/lightning.Lightning/PayInvoice',
        request,
        metadata || {},
        this.methodInfoPayInvoice,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/lightning.Lightning/PayInvoice',
    request,
    metadata || {},
    this.methodInfoPayInvoice);
  }

  methodInfoCheckInvoice = new grpcWeb.MethodDescriptor(
    '/lightning.Lightning/CheckInvoice',
    grpcWeb.MethodType.UNARY,
    proto_imp_api_lightning_lightning_pb.CheckInvoiceRequest,
    proto_imp_api_lightning_lightning_pb.CheckInvoiceResponse,
    (request: proto_imp_api_lightning_lightning_pb.CheckInvoiceRequest) => {
      return request.serializeBinary();
    },
    proto_imp_api_lightning_lightning_pb.CheckInvoiceResponse.deserializeBinary
  );

  checkInvoice(
    request: proto_imp_api_lightning_lightning_pb.CheckInvoiceRequest,
    metadata: grpcWeb.Metadata | null): Promise<proto_imp_api_lightning_lightning_pb.CheckInvoiceResponse>;

  checkInvoice(
    request: proto_imp_api_lightning_lightning_pb.CheckInvoiceRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.RpcError,
               response: proto_imp_api_lightning_lightning_pb.CheckInvoiceResponse) => void): grpcWeb.ClientReadableStream<proto_imp_api_lightning_lightning_pb.CheckInvoiceResponse>;

  checkInvoice(
    request: proto_imp_api_lightning_lightning_pb.CheckInvoiceRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.RpcError,
               response: proto_imp_api_lightning_lightning_pb.CheckInvoiceResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/lightning.Lightning/CheckInvoice',
        request,
        metadata || {},
        this.methodInfoCheckInvoice,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/lightning.Lightning/CheckInvoice',
    request,
    metadata || {},
    this.methodInfoCheckInvoice);
  }

}

