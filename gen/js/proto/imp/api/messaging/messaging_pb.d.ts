import * as jspb from 'google-protobuf'

import * as google_api_annotations_pb from '../../../../google/api/annotations_pb';
import * as protoc$gen$openapiv2_options_annotations_pb from '../../../../protoc-gen-openapiv2/options/annotations_pb';
import * as google_protobuf_timestamp_pb from 'google-protobuf/google/protobuf/timestamp_pb';


export class SendMessageRequest extends jspb.Message {
  getMsg(): string;
  setMsg(value: string): SendMessageRequest;

  getDid(): string;
  setDid(value: string): SendMessageRequest;

  getAmount(): number;
  setAmount(value: number): SendMessageRequest;

  getReplyToId(): string;
  setReplyToId(value: string): SendMessageRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SendMessageRequest.AsObject;
  static toObject(includeInstance: boolean, msg: SendMessageRequest): SendMessageRequest.AsObject;
  static serializeBinaryToWriter(message: SendMessageRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SendMessageRequest;
  static deserializeBinaryFromReader(message: SendMessageRequest, reader: jspb.BinaryReader): SendMessageRequest;
}

export namespace SendMessageRequest {
  export type AsObject = {
    msg: string,
    did: string,
    amount: number,
    replyToId: string,
  }
}

export class SendMessageResponse extends jspb.Message {
  getId(): string;
  setId(value: string): SendMessageResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SendMessageResponse.AsObject;
  static toObject(includeInstance: boolean, msg: SendMessageResponse): SendMessageResponse.AsObject;
  static serializeBinaryToWriter(message: SendMessageResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SendMessageResponse;
  static deserializeBinaryFromReader(message: SendMessageResponse, reader: jspb.BinaryReader): SendMessageResponse;
}

export namespace SendMessageResponse {
  export type AsObject = {
    id: string,
  }
}

export class MessageSettings extends jspb.Message {
  getProtocolPreferencesList(): Array<string>;
  setProtocolPreferencesList(value: Array<string>): MessageSettings;
  clearProtocolPreferencesList(): MessageSettings;
  addProtocolPreferences(value: string, index?: number): MessageSettings;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): MessageSettings.AsObject;
  static toObject(includeInstance: boolean, msg: MessageSettings): MessageSettings.AsObject;
  static serializeBinaryToWriter(message: MessageSettings, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): MessageSettings;
  static deserializeBinaryFromReader(message: MessageSettings, reader: jspb.BinaryReader): MessageSettings;
}

export namespace MessageSettings {
  export type AsObject = {
    protocolPreferencesList: Array<string>,
  }
}

export class SendMessageV2Request extends jspb.Message {
  getBody(): string;
  setBody(value: string): SendMessageV2Request;

  getType(): string;
  setType(value: string): SendMessageV2Request;

  getDid(): string;
  setDid(value: string): SendMessageV2Request;

  getAmount(): number;
  setAmount(value: number): SendMessageV2Request;

  getReplyToId(): string;
  setReplyToId(value: string): SendMessageV2Request;

  getMessageSettings(): MessageSettings | undefined;
  setMessageSettings(value?: MessageSettings): SendMessageV2Request;
  hasMessageSettings(): boolean;
  clearMessageSettings(): SendMessageV2Request;

  getRecipientListList(): Array<string>;
  setRecipientListList(value: Array<string>): SendMessageV2Request;
  clearRecipientListList(): SendMessageV2Request;
  addRecipientList(value: string, index?: number): SendMessageV2Request;

  getGroupId(): string;
  setGroupId(value: string): SendMessageV2Request;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SendMessageV2Request.AsObject;
  static toObject(includeInstance: boolean, msg: SendMessageV2Request): SendMessageV2Request.AsObject;
  static serializeBinaryToWriter(message: SendMessageV2Request, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SendMessageV2Request;
  static deserializeBinaryFromReader(message: SendMessageV2Request, reader: jspb.BinaryReader): SendMessageV2Request;
}

export namespace SendMessageV2Request {
  export type AsObject = {
    body: string,
    type: string,
    did: string,
    amount: number,
    replyToId: string,
    messageSettings?: MessageSettings.AsObject,
    recipientListList: Array<string>,
    groupId: string,
  }
}

export class SendMessageV2Response extends jspb.Message {
  getId(): string;
  setId(value: string): SendMessageV2Response;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SendMessageV2Response.AsObject;
  static toObject(includeInstance: boolean, msg: SendMessageV2Response): SendMessageV2Response.AsObject;
  static serializeBinaryToWriter(message: SendMessageV2Response, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SendMessageV2Response;
  static deserializeBinaryFromReader(message: SendMessageV2Response, reader: jspb.BinaryReader): SendMessageV2Response;
}

export namespace SendMessageV2Response {
  export type AsObject = {
    id: string,
  }
}

export class SaveMessageV2Request extends jspb.Message {
  getBody(): string;
  setBody(value: string): SaveMessageV2Request;

  getType(): string;
  setType(value: string): SaveMessageV2Request;

  getDid(): string;
  setDid(value: string): SaveMessageV2Request;

  getFrom(): string;
  setFrom(value: string): SaveMessageV2Request;

  getReplyToId(): string;
  setReplyToId(value: string): SaveMessageV2Request;

  getRecipientListList(): Array<string>;
  setRecipientListList(value: Array<string>): SaveMessageV2Request;
  clearRecipientListList(): SaveMessageV2Request;
  addRecipientList(value: string, index?: number): SaveMessageV2Request;

  getGroupId(): string;
  setGroupId(value: string): SaveMessageV2Request;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SaveMessageV2Request.AsObject;
  static toObject(includeInstance: boolean, msg: SaveMessageV2Request): SaveMessageV2Request.AsObject;
  static serializeBinaryToWriter(message: SaveMessageV2Request, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SaveMessageV2Request;
  static deserializeBinaryFromReader(message: SaveMessageV2Request, reader: jspb.BinaryReader): SaveMessageV2Request;
}

export namespace SaveMessageV2Request {
  export type AsObject = {
    body: string,
    type: string,
    did: string,
    from: string,
    replyToId: string,
    recipientListList: Array<string>,
    groupId: string,
  }
}

export class SaveMessageV2Response extends jspb.Message {
  getId(): string;
  setId(value: string): SaveMessageV2Response;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SaveMessageV2Response.AsObject;
  static toObject(includeInstance: boolean, msg: SaveMessageV2Response): SaveMessageV2Response.AsObject;
  static serializeBinaryToWriter(message: SaveMessageV2Response, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SaveMessageV2Response;
  static deserializeBinaryFromReader(message: SaveMessageV2Response, reader: jspb.BinaryReader): SaveMessageV2Response;
}

export namespace SaveMessageV2Response {
  export type AsObject = {
    id: string,
  }
}

export class Message extends jspb.Message {
  getId(): string;
  setId(value: string): Message;

  getType(): string;
  setType(value: string): Message;

  getRecipientsList(): Array<string>;
  setRecipientsList(value: Array<string>): Message;
  clearRecipientsList(): Message;
  addRecipients(value: string, index?: number): Message;

  getData(): string;
  setData(value: string): Message;

  getTransport(): string;
  setTransport(value: string): Message;

  getGroupId(): string;
  setGroupId(value: string): Message;

  getEventsList(): Array<MessageEvent>;
  setEventsList(value: Array<MessageEvent>): Message;
  clearEventsList(): Message;
  addEvents(value?: MessageEvent, index?: number): MessageEvent;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Message.AsObject;
  static toObject(includeInstance: boolean, msg: Message): Message.AsObject;
  static serializeBinaryToWriter(message: Message, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Message;
  static deserializeBinaryFromReader(message: Message, reader: jspb.BinaryReader): Message;
}

export namespace Message {
  export type AsObject = {
    id: string,
    type: string,
    recipientsList: Array<string>,
    data: string,
    transport: string,
    groupId: string,
    eventsList: Array<MessageEvent.AsObject>,
  }
}

export class MessageEvent extends jspb.Message {
  getId(): string;
  setId(value: string): MessageEvent;

  getMessageid(): string;
  setMessageid(value: string): MessageEvent;

  getDid(): string;
  setDid(value: string): MessageEvent;

  getType(): string;
  setType(value: string): MessageEvent;

  getEventtime(): google_protobuf_timestamp_pb.Timestamp | undefined;
  setEventtime(value?: google_protobuf_timestamp_pb.Timestamp): MessageEvent;
  hasEventtime(): boolean;
  clearEventtime(): MessageEvent;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): MessageEvent.AsObject;
  static toObject(includeInstance: boolean, msg: MessageEvent): MessageEvent.AsObject;
  static serializeBinaryToWriter(message: MessageEvent, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): MessageEvent;
  static deserializeBinaryFromReader(message: MessageEvent, reader: jspb.BinaryReader): MessageEvent;
}

export namespace MessageEvent {
  export type AsObject = {
    id: string,
    messageid: string,
    did: string,
    type: string,
    eventtime?: google_protobuf_timestamp_pb.Timestamp.AsObject,
  }
}

export class GetMessageListRequest extends jspb.Message {
  getId(): string;
  setId(value: string): GetMessageListRequest;

  getType(): string;
  setType(value: string): GetMessageListRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetMessageListRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetMessageListRequest): GetMessageListRequest.AsObject;
  static serializeBinaryToWriter(message: GetMessageListRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetMessageListRequest;
  static deserializeBinaryFromReader(message: GetMessageListRequest, reader: jspb.BinaryReader): GetMessageListRequest;
}

export namespace GetMessageListRequest {
  export type AsObject = {
    id: string,
    type: string,
  }
}

export class GetMessageListResponse extends jspb.Message {
  getMessagesList(): Array<Message>;
  setMessagesList(value: Array<Message>): GetMessageListResponse;
  clearMessagesList(): GetMessageListResponse;
  addMessages(value?: Message, index?: number): Message;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetMessageListResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetMessageListResponse): GetMessageListResponse.AsObject;
  static serializeBinaryToWriter(message: GetMessageListResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetMessageListResponse;
  static deserializeBinaryFromReader(message: GetMessageListResponse, reader: jspb.BinaryReader): GetMessageListResponse;
}

export namespace GetMessageListResponse {
  export type AsObject = {
    messagesList: Array<Message.AsObject>,
  }
}

export class DeleteMessageRequest extends jspb.Message {
  getId(): string;
  setId(value: string): DeleteMessageRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DeleteMessageRequest.AsObject;
  static toObject(includeInstance: boolean, msg: DeleteMessageRequest): DeleteMessageRequest.AsObject;
  static serializeBinaryToWriter(message: DeleteMessageRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DeleteMessageRequest;
  static deserializeBinaryFromReader(message: DeleteMessageRequest, reader: jspb.BinaryReader): DeleteMessageRequest;
}

export namespace DeleteMessageRequest {
  export type AsObject = {
    id: string,
  }
}

export class DeleteMessageResponse extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DeleteMessageResponse.AsObject;
  static toObject(includeInstance: boolean, msg: DeleteMessageResponse): DeleteMessageResponse.AsObject;
  static serializeBinaryToWriter(message: DeleteMessageResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DeleteMessageResponse;
  static deserializeBinaryFromReader(message: DeleteMessageResponse, reader: jspb.BinaryReader): DeleteMessageResponse;
}

export namespace DeleteMessageResponse {
  export type AsObject = {
  }
}

export class DeleteGroupMessageRequest extends jspb.Message {
  getGroupId(): string;
  setGroupId(value: string): DeleteGroupMessageRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DeleteGroupMessageRequest.AsObject;
  static toObject(includeInstance: boolean, msg: DeleteGroupMessageRequest): DeleteGroupMessageRequest.AsObject;
  static serializeBinaryToWriter(message: DeleteGroupMessageRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DeleteGroupMessageRequest;
  static deserializeBinaryFromReader(message: DeleteGroupMessageRequest, reader: jspb.BinaryReader): DeleteGroupMessageRequest;
}

export namespace DeleteGroupMessageRequest {
  export type AsObject = {
    groupId: string,
  }
}

export class DeleteGroupMessageResponse extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DeleteGroupMessageResponse.AsObject;
  static toObject(includeInstance: boolean, msg: DeleteGroupMessageResponse): DeleteGroupMessageResponse.AsObject;
  static serializeBinaryToWriter(message: DeleteGroupMessageResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DeleteGroupMessageResponse;
  static deserializeBinaryFromReader(message: DeleteGroupMessageResponse, reader: jspb.BinaryReader): DeleteGroupMessageResponse;
}

export namespace DeleteGroupMessageResponse {
  export type AsObject = {
  }
}

