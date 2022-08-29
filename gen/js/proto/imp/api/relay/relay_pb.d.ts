import * as jspb from 'google-protobuf'

import * as google_api_annotations_pb from '../../../../google/api/annotations_pb';
import * as protoc$gen$openapiv2_options_annotations_pb from '../../../../protoc-gen-openapiv2/options/annotations_pb';


export class ServiceEndpoint extends jspb.Message {
  getId(): string;
  setId(value: string): ServiceEndpoint;

  getType(): string;
  setType(value: string): ServiceEndpoint;

  getServiceendpoint(): string;
  setServiceendpoint(value: string): ServiceEndpoint;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ServiceEndpoint.AsObject;
  static toObject(includeInstance: boolean, msg: ServiceEndpoint): ServiceEndpoint.AsObject;
  static serializeBinaryToWriter(message: ServiceEndpoint, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ServiceEndpoint;
  static deserializeBinaryFromReader(message: ServiceEndpoint, reader: jspb.BinaryReader): ServiceEndpoint;
}

export namespace ServiceEndpoint {
  export type AsObject = {
    id: string,
    type: string,
    serviceendpoint: string,
  }
}

export class RequestRelayRequest extends jspb.Message {
  getTodid(): string;
  setTodid(value: string): RequestRelayRequest;

  getAmount(): number;
  setAmount(value: number): RequestRelayRequest;

  getPrivateserviceendpointsList(): Array<ServiceEndpoint>;
  setPrivateserviceendpointsList(value: Array<ServiceEndpoint>): RequestRelayRequest;
  clearPrivateserviceendpointsList(): RequestRelayRequest;
  addPrivateserviceendpoints(value?: ServiceEndpoint, index?: number): ServiceEndpoint;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): RequestRelayRequest.AsObject;
  static toObject(includeInstance: boolean, msg: RequestRelayRequest): RequestRelayRequest.AsObject;
  static serializeBinaryToWriter(message: RequestRelayRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): RequestRelayRequest;
  static deserializeBinaryFromReader(message: RequestRelayRequest, reader: jspb.BinaryReader): RequestRelayRequest;
}

export namespace RequestRelayRequest {
  export type AsObject = {
    todid: string,
    amount: number,
    privateserviceendpointsList: Array<ServiceEndpoint.AsObject>,
  }
}

export class RequestRelayResponse extends jspb.Message {
  getId(): string;
  setId(value: string): RequestRelayResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): RequestRelayResponse.AsObject;
  static toObject(includeInstance: boolean, msg: RequestRelayResponse): RequestRelayResponse.AsObject;
  static serializeBinaryToWriter(message: RequestRelayResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): RequestRelayResponse;
  static deserializeBinaryFromReader(message: RequestRelayResponse, reader: jspb.BinaryReader): RequestRelayResponse;
}

export namespace RequestRelayResponse {
  export type AsObject = {
    id: string,
  }
}

export class RequestMailboxRequest extends jspb.Message {
  getTodid(): string;
  setTodid(value: string): RequestMailboxRequest;

  getAmount(): number;
  setAmount(value: number): RequestMailboxRequest;

  getPrivateserviceendpointsList(): Array<ServiceEndpoint>;
  setPrivateserviceendpointsList(value: Array<ServiceEndpoint>): RequestMailboxRequest;
  clearPrivateserviceendpointsList(): RequestMailboxRequest;
  addPrivateserviceendpoints(value?: ServiceEndpoint, index?: number): ServiceEndpoint;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): RequestMailboxRequest.AsObject;
  static toObject(includeInstance: boolean, msg: RequestMailboxRequest): RequestMailboxRequest.AsObject;
  static serializeBinaryToWriter(message: RequestMailboxRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): RequestMailboxRequest;
  static deserializeBinaryFromReader(message: RequestMailboxRequest, reader: jspb.BinaryReader): RequestMailboxRequest;
}

export namespace RequestMailboxRequest {
  export type AsObject = {
    todid: string,
    amount: number,
    privateserviceendpointsList: Array<ServiceEndpoint.AsObject>,
  }
}

export class RequestMailboxResponse extends jspb.Message {
  getId(): string;
  setId(value: string): RequestMailboxResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): RequestMailboxResponse.AsObject;
  static toObject(includeInstance: boolean, msg: RequestMailboxResponse): RequestMailboxResponse.AsObject;
  static serializeBinaryToWriter(message: RequestMailboxResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): RequestMailboxResponse;
  static deserializeBinaryFromReader(message: RequestMailboxResponse, reader: jspb.BinaryReader): RequestMailboxResponse;
}

export namespace RequestMailboxResponse {
  export type AsObject = {
    id: string,
  }
}

