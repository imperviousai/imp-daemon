import * as jspb from 'google-protobuf'

import * as google_api_annotations_pb from '../../../../google/api/annotations_pb';
import * as protoc$gen$openapiv2_options_annotations_pb from '../../../../protoc-gen-openapiv2/options/annotations_pb';


export class RecoveryKit extends jspb.Message {
  getDid(): string;
  setDid(value: string): RecoveryKit;

  getLongFormDid(): string;
  setLongFormDid(value: string): RecoveryKit;

  getDidDerivationPath(): number;
  setDidDerivationPath(value: number): RecoveryKit;

  getKeyDerivationsList(): Array<number>;
  setKeyDerivationsList(value: Array<number>): RecoveryKit;
  clearKeyDerivationsList(): RecoveryKit;
  addKeyDerivations(value: number, index?: number): RecoveryKit;

  getSeed(): string;
  setSeed(value: string): RecoveryKit;

  getLongFormDidCase(): RecoveryKit.LongFormDidCase;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): RecoveryKit.AsObject;
  static toObject(includeInstance: boolean, msg: RecoveryKit): RecoveryKit.AsObject;
  static serializeBinaryToWriter(message: RecoveryKit, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): RecoveryKit;
  static deserializeBinaryFromReader(message: RecoveryKit, reader: jspb.BinaryReader): RecoveryKit;
}

export namespace RecoveryKit {
  export type AsObject = {
    did: string,
    longFormDid: string,
    didDerivationPath: number,
    keyDerivationsList: Array<number>,
    seed: string,
  }

  export enum LongFormDidCase { 
    _LONG_FORM_DID_NOT_SET = 0,
    LONG_FORM_DID = 2,
  }
}

export class ResolveDIDRequest extends jspb.Message {
  getDid(): string;
  setDid(value: string): ResolveDIDRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ResolveDIDRequest.AsObject;
  static toObject(includeInstance: boolean, msg: ResolveDIDRequest): ResolveDIDRequest.AsObject;
  static serializeBinaryToWriter(message: ResolveDIDRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ResolveDIDRequest;
  static deserializeBinaryFromReader(message: ResolveDIDRequest, reader: jspb.BinaryReader): ResolveDIDRequest;
}

export namespace ResolveDIDRequest {
  export type AsObject = {
    did: string,
  }
}

export class ResolveDIDResponse extends jspb.Message {
  getDocument(): string;
  setDocument(value: string): ResolveDIDResponse;

  getLongFormDid(): string;
  setLongFormDid(value: string): ResolveDIDResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ResolveDIDResponse.AsObject;
  static toObject(includeInstance: boolean, msg: ResolveDIDResponse): ResolveDIDResponse.AsObject;
  static serializeBinaryToWriter(message: ResolveDIDResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ResolveDIDResponse;
  static deserializeBinaryFromReader(message: ResolveDIDResponse, reader: jspb.BinaryReader): ResolveDIDResponse;
}

export namespace ResolveDIDResponse {
  export type AsObject = {
    document: string,
    longFormDid: string,
  }
}

export class StoreDIDRequest extends jspb.Message {
  getDocument(): string;
  setDocument(value: string): StoreDIDRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): StoreDIDRequest.AsObject;
  static toObject(includeInstance: boolean, msg: StoreDIDRequest): StoreDIDRequest.AsObject;
  static serializeBinaryToWriter(message: StoreDIDRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): StoreDIDRequest;
  static deserializeBinaryFromReader(message: StoreDIDRequest, reader: jspb.BinaryReader): StoreDIDRequest;
}

export namespace StoreDIDRequest {
  export type AsObject = {
    document: string,
  }
}

export class StoreDIDResponse extends jspb.Message {
  getId(): string;
  setId(value: string): StoreDIDResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): StoreDIDResponse.AsObject;
  static toObject(includeInstance: boolean, msg: StoreDIDResponse): StoreDIDResponse.AsObject;
  static serializeBinaryToWriter(message: StoreDIDResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): StoreDIDResponse;
  static deserializeBinaryFromReader(message: StoreDIDResponse, reader: jspb.BinaryReader): StoreDIDResponse;
}

export namespace StoreDIDResponse {
  export type AsObject = {
    id: string,
  }
}

export class ListDIDRequest extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ListDIDRequest.AsObject;
  static toObject(includeInstance: boolean, msg: ListDIDRequest): ListDIDRequest.AsObject;
  static serializeBinaryToWriter(message: ListDIDRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ListDIDRequest;
  static deserializeBinaryFromReader(message: ListDIDRequest, reader: jspb.BinaryReader): ListDIDRequest;
}

export namespace ListDIDRequest {
  export type AsObject = {
  }
}

export class ListDIDResponse extends jspb.Message {
  getDocumentsList(): Array<string>;
  setDocumentsList(value: Array<string>): ListDIDResponse;
  clearDocumentsList(): ListDIDResponse;
  addDocuments(value: string, index?: number): ListDIDResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ListDIDResponse.AsObject;
  static toObject(includeInstance: boolean, msg: ListDIDResponse): ListDIDResponse.AsObject;
  static serializeBinaryToWriter(message: ListDIDResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ListDIDResponse;
  static deserializeBinaryFromReader(message: ListDIDResponse, reader: jspb.BinaryReader): ListDIDResponse;
}

export namespace ListDIDResponse {
  export type AsObject = {
    documentsList: Array<string>,
  }
}

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

export class CreateDIDRequest extends jspb.Message {
  getType(): string;
  setType(value: string): CreateDIDRequest;

  getServiceendpointsList(): Array<ServiceEndpoint>;
  setServiceendpointsList(value: Array<ServiceEndpoint>): CreateDIDRequest;
  clearServiceendpointsList(): CreateDIDRequest;
  addServiceendpoints(value?: ServiceEndpoint, index?: number): ServiceEndpoint;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CreateDIDRequest.AsObject;
  static toObject(includeInstance: boolean, msg: CreateDIDRequest): CreateDIDRequest.AsObject;
  static serializeBinaryToWriter(message: CreateDIDRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CreateDIDRequest;
  static deserializeBinaryFromReader(message: CreateDIDRequest, reader: jspb.BinaryReader): CreateDIDRequest;
}

export namespace CreateDIDRequest {
  export type AsObject = {
    type: string,
    serviceendpointsList: Array<ServiceEndpoint.AsObject>,
  }
}

export class CreateDIDResponse extends jspb.Message {
  getDocument(): string;
  setDocument(value: string): CreateDIDResponse;

  getLongFormDid(): string;
  setLongFormDid(value: string): CreateDIDResponse;

  getRecoveryKit(): RecoveryKit | undefined;
  setRecoveryKit(value?: RecoveryKit): CreateDIDResponse;
  hasRecoveryKit(): boolean;
  clearRecoveryKit(): CreateDIDResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CreateDIDResponse.AsObject;
  static toObject(includeInstance: boolean, msg: CreateDIDResponse): CreateDIDResponse.AsObject;
  static serializeBinaryToWriter(message: CreateDIDResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CreateDIDResponse;
  static deserializeBinaryFromReader(message: CreateDIDResponse, reader: jspb.BinaryReader): CreateDIDResponse;
}

export namespace CreateDIDResponse {
  export type AsObject = {
    document: string,
    longFormDid: string,
    recoveryKit?: RecoveryKit.AsObject,
  }
}

export class ImportDIDRequest extends jspb.Message {
  getDocument(): string;
  setDocument(value: string): ImportDIDRequest;

  getLongFormDid(): string;
  setLongFormDid(value: string): ImportDIDRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ImportDIDRequest.AsObject;
  static toObject(includeInstance: boolean, msg: ImportDIDRequest): ImportDIDRequest.AsObject;
  static serializeBinaryToWriter(message: ImportDIDRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ImportDIDRequest;
  static deserializeBinaryFromReader(message: ImportDIDRequest, reader: jspb.BinaryReader): ImportDIDRequest;
}

export namespace ImportDIDRequest {
  export type AsObject = {
    document: string,
    longFormDid: string,
  }
}

export class ImportDIDResponse extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ImportDIDResponse.AsObject;
  static toObject(includeInstance: boolean, msg: ImportDIDResponse): ImportDIDResponse.AsObject;
  static serializeBinaryToWriter(message: ImportDIDResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ImportDIDResponse;
  static deserializeBinaryFromReader(message: ImportDIDResponse, reader: jspb.BinaryReader): ImportDIDResponse;
}

export namespace ImportDIDResponse {
  export type AsObject = {
  }
}

export class UpdateDIDRequest extends jspb.Message {
  getDocument(): string;
  setDocument(value: string): UpdateDIDRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UpdateDIDRequest.AsObject;
  static toObject(includeInstance: boolean, msg: UpdateDIDRequest): UpdateDIDRequest.AsObject;
  static serializeBinaryToWriter(message: UpdateDIDRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UpdateDIDRequest;
  static deserializeBinaryFromReader(message: UpdateDIDRequest, reader: jspb.BinaryReader): UpdateDIDRequest;
}

export namespace UpdateDIDRequest {
  export type AsObject = {
    document: string,
  }
}

export class UpdateDIDResponse extends jspb.Message {
  getDocument(): string;
  setDocument(value: string): UpdateDIDResponse;

  getLongFormDid(): string;
  setLongFormDid(value: string): UpdateDIDResponse;

  getRecoveryKit(): RecoveryKit | undefined;
  setRecoveryKit(value?: RecoveryKit): UpdateDIDResponse;
  hasRecoveryKit(): boolean;
  clearRecoveryKit(): UpdateDIDResponse;

  getRecoveryKitCase(): UpdateDIDResponse.RecoveryKitCase;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UpdateDIDResponse.AsObject;
  static toObject(includeInstance: boolean, msg: UpdateDIDResponse): UpdateDIDResponse.AsObject;
  static serializeBinaryToWriter(message: UpdateDIDResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UpdateDIDResponse;
  static deserializeBinaryFromReader(message: UpdateDIDResponse, reader: jspb.BinaryReader): UpdateDIDResponse;
}

export namespace UpdateDIDResponse {
  export type AsObject = {
    document: string,
    longFormDid: string,
    recoveryKit?: RecoveryKit.AsObject,
  }

  export enum RecoveryKitCase { 
    _RECOVERY_KIT_NOT_SET = 0,
    RECOVERY_KIT = 3,
  }
}

export class DeleteDIDRequest extends jspb.Message {
  getId(): string;
  setId(value: string): DeleteDIDRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DeleteDIDRequest.AsObject;
  static toObject(includeInstance: boolean, msg: DeleteDIDRequest): DeleteDIDRequest.AsObject;
  static serializeBinaryToWriter(message: DeleteDIDRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DeleteDIDRequest;
  static deserializeBinaryFromReader(message: DeleteDIDRequest, reader: jspb.BinaryReader): DeleteDIDRequest;
}

export namespace DeleteDIDRequest {
  export type AsObject = {
    id: string,
  }
}

export class DeleteDIDResponse extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DeleteDIDResponse.AsObject;
  static toObject(includeInstance: boolean, msg: DeleteDIDResponse): DeleteDIDResponse.AsObject;
  static serializeBinaryToWriter(message: DeleteDIDResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DeleteDIDResponse;
  static deserializeBinaryFromReader(message: DeleteDIDResponse, reader: jspb.BinaryReader): DeleteDIDResponse;
}

export namespace DeleteDIDResponse {
  export type AsObject = {
  }
}

export class BackupDIDRequest extends jspb.Message {
  getId(): string;
  setId(value: string): BackupDIDRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): BackupDIDRequest.AsObject;
  static toObject(includeInstance: boolean, msg: BackupDIDRequest): BackupDIDRequest.AsObject;
  static serializeBinaryToWriter(message: BackupDIDRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): BackupDIDRequest;
  static deserializeBinaryFromReader(message: BackupDIDRequest, reader: jspb.BinaryReader): BackupDIDRequest;
}

export namespace BackupDIDRequest {
  export type AsObject = {
    id: string,
  }
}

export class BackupDIDResponse extends jspb.Message {
  getRecoveryKit(): RecoveryKit | undefined;
  setRecoveryKit(value?: RecoveryKit): BackupDIDResponse;
  hasRecoveryKit(): boolean;
  clearRecoveryKit(): BackupDIDResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): BackupDIDResponse.AsObject;
  static toObject(includeInstance: boolean, msg: BackupDIDResponse): BackupDIDResponse.AsObject;
  static serializeBinaryToWriter(message: BackupDIDResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): BackupDIDResponse;
  static deserializeBinaryFromReader(message: BackupDIDResponse, reader: jspb.BinaryReader): BackupDIDResponse;
}

export namespace BackupDIDResponse {
  export type AsObject = {
    recoveryKit?: RecoveryKit.AsObject,
  }
}

export class RecoverDIDRequest extends jspb.Message {
  getRecoveryKit(): RecoveryKit | undefined;
  setRecoveryKit(value?: RecoveryKit): RecoverDIDRequest;
  hasRecoveryKit(): boolean;
  clearRecoveryKit(): RecoverDIDRequest;

  getPassphrase(): string;
  setPassphrase(value: string): RecoverDIDRequest;

  getPassphraseCase(): RecoverDIDRequest.PassphraseCase;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): RecoverDIDRequest.AsObject;
  static toObject(includeInstance: boolean, msg: RecoverDIDRequest): RecoverDIDRequest.AsObject;
  static serializeBinaryToWriter(message: RecoverDIDRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): RecoverDIDRequest;
  static deserializeBinaryFromReader(message: RecoverDIDRequest, reader: jspb.BinaryReader): RecoverDIDRequest;
}

export namespace RecoverDIDRequest {
  export type AsObject = {
    recoveryKit?: RecoveryKit.AsObject,
    passphrase: string,
  }

  export enum PassphraseCase { 
    _PASSPHRASE_NOT_SET = 0,
    PASSPHRASE = 2,
  }
}

export class RecoverDIDResponse extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): RecoverDIDResponse.AsObject;
  static toObject(includeInstance: boolean, msg: RecoverDIDResponse): RecoverDIDResponse.AsObject;
  static serializeBinaryToWriter(message: RecoverDIDResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): RecoverDIDResponse;
  static deserializeBinaryFromReader(message: RecoverDIDResponse, reader: jspb.BinaryReader): RecoverDIDResponse;
}

export namespace RecoverDIDResponse {
  export type AsObject = {
  }
}

