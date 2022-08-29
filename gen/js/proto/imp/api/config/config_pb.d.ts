import * as jspb from 'google-protobuf'

import * as google_api_annotations_pb from '../../../../google/api/annotations_pb';
import * as protoc$gen$openapiv2_options_annotations_pb from '../../../../protoc-gen-openapiv2/options/annotations_pb';


export class LightningConfig extends jspb.Message {
  getIp(): string;
  setIp(value: string): LightningConfig;

  getPort(): string;
  setPort(value: string): LightningConfig;

  getPubkey(): string;
  setPubkey(value: string): LightningConfig;

  getTlsCert(): string;
  setTlsCert(value: string): LightningConfig;

  getAdminMacaroon(): string;
  setAdminMacaroon(value: string): LightningConfig;

  getListening(): boolean;
  setListening(value: boolean): LightningConfig;

  getTlsCertHex(): string;
  setTlsCertHex(value: string): LightningConfig;

  getAdminMacaroonHex(): string;
  setAdminMacaroonHex(value: string): LightningConfig;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): LightningConfig.AsObject;
  static toObject(includeInstance: boolean, msg: LightningConfig): LightningConfig.AsObject;
  static serializeBinaryToWriter(message: LightningConfig, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): LightningConfig;
  static deserializeBinaryFromReader(message: LightningConfig, reader: jspb.BinaryReader): LightningConfig;
}

export namespace LightningConfig {
  export type AsObject = {
    ip: string,
    port: string,
    pubkey: string,
    tlsCert: string,
    adminMacaroon: string,
    listening: boolean,
    tlsCertHex: string,
    adminMacaroonHex: string,
  }
}

export class GetLightningConfigRequest extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetLightningConfigRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetLightningConfigRequest): GetLightningConfigRequest.AsObject;
  static serializeBinaryToWriter(message: GetLightningConfigRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetLightningConfigRequest;
  static deserializeBinaryFromReader(message: GetLightningConfigRequest, reader: jspb.BinaryReader): GetLightningConfigRequest;
}

export namespace GetLightningConfigRequest {
  export type AsObject = {
  }
}

export class GetLightningConfigResponse extends jspb.Message {
  getLightningConfig(): LightningConfig | undefined;
  setLightningConfig(value?: LightningConfig): GetLightningConfigResponse;
  hasLightningConfig(): boolean;
  clearLightningConfig(): GetLightningConfigResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetLightningConfigResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetLightningConfigResponse): GetLightningConfigResponse.AsObject;
  static serializeBinaryToWriter(message: GetLightningConfigResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetLightningConfigResponse;
  static deserializeBinaryFromReader(message: GetLightningConfigResponse, reader: jspb.BinaryReader): GetLightningConfigResponse;
}

export namespace GetLightningConfigResponse {
  export type AsObject = {
    lightningConfig?: LightningConfig.AsObject,
  }
}

export class SaveLightningConfigRequest extends jspb.Message {
  getLightningConfig(): LightningConfig | undefined;
  setLightningConfig(value?: LightningConfig): SaveLightningConfigRequest;
  hasLightningConfig(): boolean;
  clearLightningConfig(): SaveLightningConfigRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SaveLightningConfigRequest.AsObject;
  static toObject(includeInstance: boolean, msg: SaveLightningConfigRequest): SaveLightningConfigRequest.AsObject;
  static serializeBinaryToWriter(message: SaveLightningConfigRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SaveLightningConfigRequest;
  static deserializeBinaryFromReader(message: SaveLightningConfigRequest, reader: jspb.BinaryReader): SaveLightningConfigRequest;
}

export namespace SaveLightningConfigRequest {
  export type AsObject = {
    lightningConfig?: LightningConfig.AsObject,
  }
}

export class SaveLightningConfigResponse extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SaveLightningConfigResponse.AsObject;
  static toObject(includeInstance: boolean, msg: SaveLightningConfigResponse): SaveLightningConfigResponse.AsObject;
  static serializeBinaryToWriter(message: SaveLightningConfigResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SaveLightningConfigResponse;
  static deserializeBinaryFromReader(message: SaveLightningConfigResponse, reader: jspb.BinaryReader): SaveLightningConfigResponse;
}

export namespace SaveLightningConfigResponse {
  export type AsObject = {
  }
}

export class IONConfig extends jspb.Message {
  getUrl(): string;
  setUrl(value: string): IONConfig;

  getActive(): boolean;
  setActive(value: boolean): IONConfig;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): IONConfig.AsObject;
  static toObject(includeInstance: boolean, msg: IONConfig): IONConfig.AsObject;
  static serializeBinaryToWriter(message: IONConfig, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): IONConfig;
  static deserializeBinaryFromReader(message: IONConfig, reader: jspb.BinaryReader): IONConfig;
}

export namespace IONConfig {
  export type AsObject = {
    url: string,
    active: boolean,
  }
}

export class GetIONConfigRequest extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetIONConfigRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetIONConfigRequest): GetIONConfigRequest.AsObject;
  static serializeBinaryToWriter(message: GetIONConfigRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetIONConfigRequest;
  static deserializeBinaryFromReader(message: GetIONConfigRequest, reader: jspb.BinaryReader): GetIONConfigRequest;
}

export namespace GetIONConfigRequest {
  export type AsObject = {
  }
}

export class GetIONConfigResponse extends jspb.Message {
  getIonConfig(): IONConfig | undefined;
  setIonConfig(value?: IONConfig): GetIONConfigResponse;
  hasIonConfig(): boolean;
  clearIonConfig(): GetIONConfigResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetIONConfigResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetIONConfigResponse): GetIONConfigResponse.AsObject;
  static serializeBinaryToWriter(message: GetIONConfigResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetIONConfigResponse;
  static deserializeBinaryFromReader(message: GetIONConfigResponse, reader: jspb.BinaryReader): GetIONConfigResponse;
}

export namespace GetIONConfigResponse {
  export type AsObject = {
    ionConfig?: IONConfig.AsObject,
  }
}

export class SaveIONConfigRequest extends jspb.Message {
  getIonConfig(): IONConfig | undefined;
  setIonConfig(value?: IONConfig): SaveIONConfigRequest;
  hasIonConfig(): boolean;
  clearIonConfig(): SaveIONConfigRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SaveIONConfigRequest.AsObject;
  static toObject(includeInstance: boolean, msg: SaveIONConfigRequest): SaveIONConfigRequest.AsObject;
  static serializeBinaryToWriter(message: SaveIONConfigRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SaveIONConfigRequest;
  static deserializeBinaryFromReader(message: SaveIONConfigRequest, reader: jspb.BinaryReader): SaveIONConfigRequest;
}

export namespace SaveIONConfigRequest {
  export type AsObject = {
    ionConfig?: IONConfig.AsObject,
  }
}

export class SaveIONConfigResponse extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SaveIONConfigResponse.AsObject;
  static toObject(includeInstance: boolean, msg: SaveIONConfigResponse): SaveIONConfigResponse.AsObject;
  static serializeBinaryToWriter(message: SaveIONConfigResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SaveIONConfigResponse;
  static deserializeBinaryFromReader(message: SaveIONConfigResponse, reader: jspb.BinaryReader): SaveIONConfigResponse;
}

export namespace SaveIONConfigResponse {
  export type AsObject = {
  }
}

