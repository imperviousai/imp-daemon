import * as jspb from 'google-protobuf'

import * as google_api_annotations_pb from '../../../../google/api/annotations_pb';
import * as protoc$gen$openapiv2_options_annotations_pb from '../../../../protoc-gen-openapiv2/options/annotations_pb';


export class AuthAPIKey extends jspb.Message {
  getId(): number;
  setId(value: number): AuthAPIKey;

  getName(): string;
  setName(value: string): AuthAPIKey;

  getDescription(): string;
  setDescription(value: string): AuthAPIKey;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): AuthAPIKey.AsObject;
  static toObject(includeInstance: boolean, msg: AuthAPIKey): AuthAPIKey.AsObject;
  static serializeBinaryToWriter(message: AuthAPIKey, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): AuthAPIKey;
  static deserializeBinaryFromReader(message: AuthAPIKey, reader: jspb.BinaryReader): AuthAPIKey;
}

export namespace AuthAPIKey {
  export type AsObject = {
    id: number,
    name: string,
    description: string,
  }
}

export class GetAuthKeysRequest extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetAuthKeysRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetAuthKeysRequest): GetAuthKeysRequest.AsObject;
  static serializeBinaryToWriter(message: GetAuthKeysRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetAuthKeysRequest;
  static deserializeBinaryFromReader(message: GetAuthKeysRequest, reader: jspb.BinaryReader): GetAuthKeysRequest;
}

export namespace GetAuthKeysRequest {
  export type AsObject = {
  }
}

export class GetAuthKeysResponse extends jspb.Message {
  getKeysList(): Array<AuthAPIKey>;
  setKeysList(value: Array<AuthAPIKey>): GetAuthKeysResponse;
  clearKeysList(): GetAuthKeysResponse;
  addKeys(value?: AuthAPIKey, index?: number): AuthAPIKey;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetAuthKeysResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetAuthKeysResponse): GetAuthKeysResponse.AsObject;
  static serializeBinaryToWriter(message: GetAuthKeysResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetAuthKeysResponse;
  static deserializeBinaryFromReader(message: GetAuthKeysResponse, reader: jspb.BinaryReader): GetAuthKeysResponse;
}

export namespace GetAuthKeysResponse {
  export type AsObject = {
    keysList: Array<AuthAPIKey.AsObject>,
  }
}

export class CreateAuthKeyRequest extends jspb.Message {
  getName(): string;
  setName(value: string): CreateAuthKeyRequest;

  getDescription(): string;
  setDescription(value: string): CreateAuthKeyRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CreateAuthKeyRequest.AsObject;
  static toObject(includeInstance: boolean, msg: CreateAuthKeyRequest): CreateAuthKeyRequest.AsObject;
  static serializeBinaryToWriter(message: CreateAuthKeyRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CreateAuthKeyRequest;
  static deserializeBinaryFromReader(message: CreateAuthKeyRequest, reader: jspb.BinaryReader): CreateAuthKeyRequest;
}

export namespace CreateAuthKeyRequest {
  export type AsObject = {
    name: string,
    description: string,
  }
}

export class CreateAuthKeyResponse extends jspb.Message {
  getKey(): string;
  setKey(value: string): CreateAuthKeyResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CreateAuthKeyResponse.AsObject;
  static toObject(includeInstance: boolean, msg: CreateAuthKeyResponse): CreateAuthKeyResponse.AsObject;
  static serializeBinaryToWriter(message: CreateAuthKeyResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CreateAuthKeyResponse;
  static deserializeBinaryFromReader(message: CreateAuthKeyResponse, reader: jspb.BinaryReader): CreateAuthKeyResponse;
}

export namespace CreateAuthKeyResponse {
  export type AsObject = {
    key: string,
  }
}

export class UpdateAuthKeyRequest extends jspb.Message {
  getId(): number;
  setId(value: number): UpdateAuthKeyRequest;

  getName(): string;
  setName(value: string): UpdateAuthKeyRequest;

  getDescription(): string;
  setDescription(value: string): UpdateAuthKeyRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UpdateAuthKeyRequest.AsObject;
  static toObject(includeInstance: boolean, msg: UpdateAuthKeyRequest): UpdateAuthKeyRequest.AsObject;
  static serializeBinaryToWriter(message: UpdateAuthKeyRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UpdateAuthKeyRequest;
  static deserializeBinaryFromReader(message: UpdateAuthKeyRequest, reader: jspb.BinaryReader): UpdateAuthKeyRequest;
}

export namespace UpdateAuthKeyRequest {
  export type AsObject = {
    id: number,
    name: string,
    description: string,
  }
}

export class UpdateAuthKeyResponse extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UpdateAuthKeyResponse.AsObject;
  static toObject(includeInstance: boolean, msg: UpdateAuthKeyResponse): UpdateAuthKeyResponse.AsObject;
  static serializeBinaryToWriter(message: UpdateAuthKeyResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UpdateAuthKeyResponse;
  static deserializeBinaryFromReader(message: UpdateAuthKeyResponse, reader: jspb.BinaryReader): UpdateAuthKeyResponse;
}

export namespace UpdateAuthKeyResponse {
  export type AsObject = {
  }
}

export class DeleteAuthKeyRequest extends jspb.Message {
  getId(): number;
  setId(value: number): DeleteAuthKeyRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DeleteAuthKeyRequest.AsObject;
  static toObject(includeInstance: boolean, msg: DeleteAuthKeyRequest): DeleteAuthKeyRequest.AsObject;
  static serializeBinaryToWriter(message: DeleteAuthKeyRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DeleteAuthKeyRequest;
  static deserializeBinaryFromReader(message: DeleteAuthKeyRequest, reader: jspb.BinaryReader): DeleteAuthKeyRequest;
}

export namespace DeleteAuthKeyRequest {
  export type AsObject = {
    id: number,
  }
}

export class DeleteAuthKeyResponse extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DeleteAuthKeyResponse.AsObject;
  static toObject(includeInstance: boolean, msg: DeleteAuthKeyResponse): DeleteAuthKeyResponse.AsObject;
  static serializeBinaryToWriter(message: DeleteAuthKeyResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DeleteAuthKeyResponse;
  static deserializeBinaryFromReader(message: DeleteAuthKeyResponse, reader: jspb.BinaryReader): DeleteAuthKeyResponse;
}

export namespace DeleteAuthKeyResponse {
  export type AsObject = {
  }
}

