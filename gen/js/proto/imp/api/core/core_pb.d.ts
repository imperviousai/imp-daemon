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

export class NodeStatus extends jspb.Message {
  getPubkey(): string;
  setPubkey(value: string): NodeStatus;

  getActive(): boolean;
  setActive(value: boolean): NodeStatus;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): NodeStatus.AsObject;
  static toObject(includeInstance: boolean, msg: NodeStatus): NodeStatus.AsObject;
  static serializeBinaryToWriter(message: NodeStatus, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): NodeStatus;
  static deserializeBinaryFromReader(message: NodeStatus, reader: jspb.BinaryReader): NodeStatus;
}

export namespace NodeStatus {
  export type AsObject = {
    pubkey: string,
    active: boolean,
  }
}

export class LightningStatus extends jspb.Message {
  getNodeStatusListList(): Array<NodeStatus>;
  setNodeStatusListList(value: Array<NodeStatus>): LightningStatus;
  clearNodeStatusListList(): LightningStatus;
  addNodeStatusList(value?: NodeStatus, index?: number): NodeStatus;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): LightningStatus.AsObject;
  static toObject(includeInstance: boolean, msg: LightningStatus): LightningStatus.AsObject;
  static serializeBinaryToWriter(message: LightningStatus, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): LightningStatus;
  static deserializeBinaryFromReader(message: LightningStatus, reader: jspb.BinaryReader): LightningStatus;
}

export namespace LightningStatus {
  export type AsObject = {
    nodeStatusListList: Array<NodeStatus.AsObject>,
  }
}

export class CommunicationStatus extends jspb.Message {
  getWebsocketConnectionsList(): Array<string>;
  setWebsocketConnectionsList(value: Array<string>): CommunicationStatus;
  clearWebsocketConnectionsList(): CommunicationStatus;
  addWebsocketConnections(value: string, index?: number): CommunicationStatus;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CommunicationStatus.AsObject;
  static toObject(includeInstance: boolean, msg: CommunicationStatus): CommunicationStatus.AsObject;
  static serializeBinaryToWriter(message: CommunicationStatus, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CommunicationStatus;
  static deserializeBinaryFromReader(message: CommunicationStatus, reader: jspb.BinaryReader): CommunicationStatus;
}

export namespace CommunicationStatus {
  export type AsObject = {
    websocketConnectionsList: Array<string>,
  }
}

export class StatusResponse extends jspb.Message {
  getKeyStatus(): KeyStatus | undefined;
  setKeyStatus(value?: KeyStatus): StatusResponse;
  hasKeyStatus(): boolean;
  clearKeyStatus(): StatusResponse;

  getLightningStatus(): LightningStatus | undefined;
  setLightningStatus(value?: LightningStatus): StatusResponse;
  hasLightningStatus(): boolean;
  clearLightningStatus(): StatusResponse;

  getCommunicationStatus(): CommunicationStatus | undefined;
  setCommunicationStatus(value?: CommunicationStatus): StatusResponse;
  hasCommunicationStatus(): boolean;
  clearCommunicationStatus(): StatusResponse;

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
    lightningStatus?: LightningStatus.AsObject,
    communicationStatus?: CommunicationStatus.AsObject,
  }
}

