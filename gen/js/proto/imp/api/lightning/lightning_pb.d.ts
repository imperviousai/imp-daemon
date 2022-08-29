import * as jspb from 'google-protobuf'

import * as google_api_annotations_pb from '../../../../google/api/annotations_pb';
import * as protoc$gen$openapiv2_options_annotations_pb from '../../../../protoc-gen-openapiv2/options/annotations_pb';


export class GenerateInvoiceRequest extends jspb.Message {
  getAmount(): number;
  setAmount(value: number): GenerateInvoiceRequest;

  getMemo(): string;
  setMemo(value: string): GenerateInvoiceRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GenerateInvoiceRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GenerateInvoiceRequest): GenerateInvoiceRequest.AsObject;
  static serializeBinaryToWriter(message: GenerateInvoiceRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GenerateInvoiceRequest;
  static deserializeBinaryFromReader(message: GenerateInvoiceRequest, reader: jspb.BinaryReader): GenerateInvoiceRequest;
}

export namespace GenerateInvoiceRequest {
  export type AsObject = {
    amount: number,
    memo: string,
  }
}

export class GenerateInvoiceResponse extends jspb.Message {
  getInvoice(): string;
  setInvoice(value: string): GenerateInvoiceResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GenerateInvoiceResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GenerateInvoiceResponse): GenerateInvoiceResponse.AsObject;
  static serializeBinaryToWriter(message: GenerateInvoiceResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GenerateInvoiceResponse;
  static deserializeBinaryFromReader(message: GenerateInvoiceResponse, reader: jspb.BinaryReader): GenerateInvoiceResponse;
}

export namespace GenerateInvoiceResponse {
  export type AsObject = {
    invoice: string,
  }
}

export class PayInvoiceRequest extends jspb.Message {
  getInvoice(): string;
  setInvoice(value: string): PayInvoiceRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): PayInvoiceRequest.AsObject;
  static toObject(includeInstance: boolean, msg: PayInvoiceRequest): PayInvoiceRequest.AsObject;
  static serializeBinaryToWriter(message: PayInvoiceRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): PayInvoiceRequest;
  static deserializeBinaryFromReader(message: PayInvoiceRequest, reader: jspb.BinaryReader): PayInvoiceRequest;
}

export namespace PayInvoiceRequest {
  export type AsObject = {
    invoice: string,
  }
}

export class PayInvoiceResponse extends jspb.Message {
  getPreimage(): string;
  setPreimage(value: string): PayInvoiceResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): PayInvoiceResponse.AsObject;
  static toObject(includeInstance: boolean, msg: PayInvoiceResponse): PayInvoiceResponse.AsObject;
  static serializeBinaryToWriter(message: PayInvoiceResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): PayInvoiceResponse;
  static deserializeBinaryFromReader(message: PayInvoiceResponse, reader: jspb.BinaryReader): PayInvoiceResponse;
}

export namespace PayInvoiceResponse {
  export type AsObject = {
    preimage: string,
  }
}

export class CheckInvoiceRequest extends jspb.Message {
  getInvoice(): string;
  setInvoice(value: string): CheckInvoiceRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CheckInvoiceRequest.AsObject;
  static toObject(includeInstance: boolean, msg: CheckInvoiceRequest): CheckInvoiceRequest.AsObject;
  static serializeBinaryToWriter(message: CheckInvoiceRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CheckInvoiceRequest;
  static deserializeBinaryFromReader(message: CheckInvoiceRequest, reader: jspb.BinaryReader): CheckInvoiceRequest;
}

export namespace CheckInvoiceRequest {
  export type AsObject = {
    invoice: string,
  }
}

export class CheckInvoiceResponse extends jspb.Message {
  getPaid(): boolean;
  setPaid(value: boolean): CheckInvoiceResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CheckInvoiceResponse.AsObject;
  static toObject(includeInstance: boolean, msg: CheckInvoiceResponse): CheckInvoiceResponse.AsObject;
  static serializeBinaryToWriter(message: CheckInvoiceResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CheckInvoiceResponse;
  static deserializeBinaryFromReader(message: CheckInvoiceResponse, reader: jspb.BinaryReader): CheckInvoiceResponse;
}

export namespace CheckInvoiceResponse {
  export type AsObject = {
    paid: boolean,
  }
}

