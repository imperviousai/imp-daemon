import * as jspb from 'google-protobuf'

import * as google_api_annotations_pb from '../../../../google/api/annotations_pb';
import * as protoc$gen$openapiv2_options_annotations_pb from '../../../../protoc-gen-openapiv2/options/annotations_pb';


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

export class KeyStatus extends jspb.Message {
  getStatus(): string;
  setStatus(value: string): KeyStatus;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): KeyStatus.AsObject;
  static toObject(includeInstance: boolean, msg: KeyStatus): KeyStatus.AsObject;
  static serializeBinaryToWriter(message: KeyStatus, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): KeyStatus;
  static deserializeBinaryFromReader(message: KeyStatus, reader: jspb.BinaryReader): KeyStatus;
}

export namespace KeyStatus {
  export type AsObject = {
    status: string,
  }
}

export class StatusResponse extends jspb.Message {
  getKeyStatus(): KeyStatus | undefined;
  setKeyStatus(value?: KeyStatus): StatusResponse;
  hasKeyStatus(): boolean;
  clearKeyStatus(): StatusResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): StatusResponse.AsObject;
  static toObject(includeInstance: boolean, msg: StatusResponse): StatusResponse.AsObject;
  static serializeBinaryToWriter(message: StatusResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): StatusResponse;
  static deserializeBinaryFromReader(message: StatusResponse, reader: jspb.BinaryReader): StatusResponse;
}

export namespace StatusResponse {
  export type AsObject = {
    keyStatus?: KeyStatus.AsObject,
  }
}

