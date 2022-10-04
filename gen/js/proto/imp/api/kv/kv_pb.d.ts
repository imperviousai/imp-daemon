import * as jspb from 'google-protobuf'

import * as google_api_annotations_pb from '../../../../google/api/annotations_pb';
import * as protoc$gen$openapiv2_options_annotations_pb from '../../../../protoc-gen-openapiv2/options/annotations_pb';


export class GetKeyRequest extends jspb.Message {
  getKey(): string;
  setKey(value: string): GetKeyRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetKeyRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetKeyRequest): GetKeyRequest.AsObject;
  static serializeBinaryToWriter(message: GetKeyRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetKeyRequest;
  static deserializeBinaryFromReader(message: GetKeyRequest, reader: jspb.BinaryReader): GetKeyRequest;
}

export namespace GetKeyRequest {
  export type AsObject = {
    key: string,
  }
}

export class GetKeyResponse extends jspb.Message {
  getValue(): string;
  setValue(value: string): GetKeyResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetKeyResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetKeyResponse): GetKeyResponse.AsObject;
  static serializeBinaryToWriter(message: GetKeyResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetKeyResponse;
  static deserializeBinaryFromReader(message: GetKeyResponse, reader: jspb.BinaryReader): GetKeyResponse;
}

export namespace GetKeyResponse {
  export type AsObject = {
    value: string,
  }
}

export class SetKeyRequest extends jspb.Message {
  getKey(): string;
  setKey(value: string): SetKeyRequest;

  getValue(): string;
  setValue(value: string): SetKeyRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SetKeyRequest.AsObject;
  static toObject(includeInstance: boolean, msg: SetKeyRequest): SetKeyRequest.AsObject;
  static serializeBinaryToWriter(message: SetKeyRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SetKeyRequest;
  static deserializeBinaryFromReader(message: SetKeyRequest, reader: jspb.BinaryReader): SetKeyRequest;
}

export namespace SetKeyRequest {
  export type AsObject = {
    key: string,
    value: string,
  }
}

export class SetKeyResponse extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SetKeyResponse.AsObject;
  static toObject(includeInstance: boolean, msg: SetKeyResponse): SetKeyResponse.AsObject;
  static serializeBinaryToWriter(message: SetKeyResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SetKeyResponse;
  static deserializeBinaryFromReader(message: SetKeyResponse, reader: jspb.BinaryReader): SetKeyResponse;
}

export namespace SetKeyResponse {
  export type AsObject = {
  }
}

export class DelKeyRequest extends jspb.Message {
  getKey(): string;
  setKey(value: string): DelKeyRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DelKeyRequest.AsObject;
  static toObject(includeInstance: boolean, msg: DelKeyRequest): DelKeyRequest.AsObject;
  static serializeBinaryToWriter(message: DelKeyRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DelKeyRequest;
  static deserializeBinaryFromReader(message: DelKeyRequest, reader: jspb.BinaryReader): DelKeyRequest;
}

export namespace DelKeyRequest {
  export type AsObject = {
    key: string,
  }
}

export class DelKeyResponse extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DelKeyResponse.AsObject;
  static toObject(includeInstance: boolean, msg: DelKeyResponse): DelKeyResponse.AsObject;
  static serializeBinaryToWriter(message: DelKeyResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DelKeyResponse;
  static deserializeBinaryFromReader(message: DelKeyResponse, reader: jspb.BinaryReader): DelKeyResponse;
}

export namespace DelKeyResponse {
  export type AsObject = {
  }
}

