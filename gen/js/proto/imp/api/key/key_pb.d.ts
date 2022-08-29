import * as jspb from 'google-protobuf'

import * as google_api_annotations_pb from '../../../../google/api/annotations_pb';
import * as protoc$gen$openapiv2_options_annotations_pb from '../../../../protoc-gen-openapiv2/options/annotations_pb';


export class InitSeedRequest extends jspb.Message {
  getMnenomic(): string;
  setMnenomic(value: string): InitSeedRequest;

  getPassphrase(): string;
  setPassphrase(value: string): InitSeedRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): InitSeedRequest.AsObject;
  static toObject(includeInstance: boolean, msg: InitSeedRequest): InitSeedRequest.AsObject;
  static serializeBinaryToWriter(message: InitSeedRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): InitSeedRequest;
  static deserializeBinaryFromReader(message: InitSeedRequest, reader: jspb.BinaryReader): InitSeedRequest;
}

export namespace InitSeedRequest {
  export type AsObject = {
    mnenomic: string,
    passphrase: string,
  }
}

export class InitSeedResponse extends jspb.Message {
  getMnenomic(): string;
  setMnenomic(value: string): InitSeedResponse;

  getApiKey(): string;
  setApiKey(value: string): InitSeedResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): InitSeedResponse.AsObject;
  static toObject(includeInstance: boolean, msg: InitSeedResponse): InitSeedResponse.AsObject;
  static serializeBinaryToWriter(message: InitSeedResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): InitSeedResponse;
  static deserializeBinaryFromReader(message: InitSeedResponse, reader: jspb.BinaryReader): InitSeedResponse;
}

export namespace InitSeedResponse {
  export type AsObject = {
    mnenomic: string,
    apiKey: string,
  }
}

export class UnlockSeedRequest extends jspb.Message {
  getPassphrase(): string;
  setPassphrase(value: string): UnlockSeedRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UnlockSeedRequest.AsObject;
  static toObject(includeInstance: boolean, msg: UnlockSeedRequest): UnlockSeedRequest.AsObject;
  static serializeBinaryToWriter(message: UnlockSeedRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UnlockSeedRequest;
  static deserializeBinaryFromReader(message: UnlockSeedRequest, reader: jspb.BinaryReader): UnlockSeedRequest;
}

export namespace UnlockSeedRequest {
  export type AsObject = {
    passphrase: string,
  }
}

export class UnlockSeedResponse extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UnlockSeedResponse.AsObject;
  static toObject(includeInstance: boolean, msg: UnlockSeedResponse): UnlockSeedResponse.AsObject;
  static serializeBinaryToWriter(message: UnlockSeedResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UnlockSeedResponse;
  static deserializeBinaryFromReader(message: UnlockSeedResponse, reader: jspb.BinaryReader): UnlockSeedResponse;
}

export namespace UnlockSeedResponse {
  export type AsObject = {
  }
}

export class StatusRequest extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): StatusRequest.AsObject;
  static toObject(includeInstance: boolean, msg: StatusRequest): StatusRequest.AsObject;
  static serializeBinaryToWriter(message: StatusRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): StatusRequest;
  static deserializeBinaryFromReader(message: StatusRequest, reader: jspb.BinaryReader): StatusRequest;
}

export namespace StatusRequest {
  export type AsObject = {
  }
}

export class StatusResponse extends jspb.Message {
  getStatus(): string;
  setStatus(value: string): StatusResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): StatusResponse.AsObject;
  static toObject(includeInstance: boolean, msg: StatusResponse): StatusResponse.AsObject;
  static serializeBinaryToWriter(message: StatusResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): StatusResponse;
  static deserializeBinaryFromReader(message: StatusResponse, reader: jspb.BinaryReader): StatusResponse;
}

export namespace StatusResponse {
  export type AsObject = {
    status: string,
  }
}

