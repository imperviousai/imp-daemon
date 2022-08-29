import * as jspb from 'google-protobuf'

import * as google_api_annotations_pb from '../../../../google/api/annotations_pb';
import * as protoc$gen$openapiv2_options_annotations_pb from '../../../../protoc-gen-openapiv2/options/annotations_pb';


export class AddFileRequest extends jspb.Message {
  getName(): string;
  setName(value: string): AddFileRequest;

  getData(): Uint8Array | string;
  getData_asU8(): Uint8Array;
  getData_asB64(): string;
  setData(value: Uint8Array | string): AddFileRequest;

  getUpdatable(): boolean;
  setUpdatable(value: boolean): AddFileRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): AddFileRequest.AsObject;
  static toObject(includeInstance: boolean, msg: AddFileRequest): AddFileRequest.AsObject;
  static serializeBinaryToWriter(message: AddFileRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): AddFileRequest;
  static deserializeBinaryFromReader(message: AddFileRequest, reader: jspb.BinaryReader): AddFileRequest;
}

export namespace AddFileRequest {
  export type AsObject = {
    name: string,
    data: Uint8Array | string,
    updatable: boolean,
  }
}

export class AddFileResponse extends jspb.Message {
  getCid(): string;
  setCid(value: string): AddFileResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): AddFileResponse.AsObject;
  static toObject(includeInstance: boolean, msg: AddFileResponse): AddFileResponse.AsObject;
  static serializeBinaryToWriter(message: AddFileResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): AddFileResponse;
  static deserializeBinaryFromReader(message: AddFileResponse, reader: jspb.BinaryReader): AddFileResponse;
}

export namespace AddFileResponse {
  export type AsObject = {
    cid: string,
  }
}

export class GetFileRequest extends jspb.Message {
  getProtocol(): string;
  setProtocol(value: string): GetFileRequest;

  getCid(): string;
  setCid(value: string): GetFileRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetFileRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetFileRequest): GetFileRequest.AsObject;
  static serializeBinaryToWriter(message: GetFileRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetFileRequest;
  static deserializeBinaryFromReader(message: GetFileRequest, reader: jspb.BinaryReader): GetFileRequest;
}

export namespace GetFileRequest {
  export type AsObject = {
    protocol: string,
    cid: string,
  }
}

export class GetFileResponse extends jspb.Message {
  getData(): Uint8Array | string;
  getData_asU8(): Uint8Array;
  getData_asB64(): string;
  setData(value: Uint8Array | string): GetFileResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetFileResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetFileResponse): GetFileResponse.AsObject;
  static serializeBinaryToWriter(message: GetFileResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetFileResponse;
  static deserializeBinaryFromReader(message: GetFileResponse, reader: jspb.BinaryReader): GetFileResponse;
}

export namespace GetFileResponse {
  export type AsObject = {
    data: Uint8Array | string,
  }
}

export class ListFilesRequest extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ListFilesRequest.AsObject;
  static toObject(includeInstance: boolean, msg: ListFilesRequest): ListFilesRequest.AsObject;
  static serializeBinaryToWriter(message: ListFilesRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ListFilesRequest;
  static deserializeBinaryFromReader(message: ListFilesRequest, reader: jspb.BinaryReader): ListFilesRequest;
}

export namespace ListFilesRequest {
  export type AsObject = {
  }
}

export class ListFilesResponse extends jspb.Message {
  getFilesList(): Array<string>;
  setFilesList(value: Array<string>): ListFilesResponse;
  clearFilesList(): ListFilesResponse;
  addFiles(value: string, index?: number): ListFilesResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ListFilesResponse.AsObject;
  static toObject(includeInstance: boolean, msg: ListFilesResponse): ListFilesResponse.AsObject;
  static serializeBinaryToWriter(message: ListFilesResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ListFilesResponse;
  static deserializeBinaryFromReader(message: ListFilesResponse, reader: jspb.BinaryReader): ListFilesResponse;
}

export namespace ListFilesResponse {
  export type AsObject = {
    filesList: Array<string>,
  }
}

