/// Allows for interacting with relay services

// Code generated by protoc-gen-go. DO NOT EDIT.
// versions:
// 	protoc-gen-go v1.28.0
// 	protoc        v3.17.3
// source: proto/imp/api/relay/relay.proto

package gen

import (
	context "context"
	_ "github.com/grpc-ecosystem/grpc-gateway/v2/protoc-gen-openapiv2/options"
	_ "google.golang.org/genproto/googleapis/api/annotations"
	grpc "google.golang.org/grpc"
	codes "google.golang.org/grpc/codes"
	status "google.golang.org/grpc/status"
	protoreflect "google.golang.org/protobuf/reflect/protoreflect"
	protoimpl "google.golang.org/protobuf/runtime/protoimpl"
	reflect "reflect"
	sync "sync"
)

const (
	// Verify that this generated code is sufficiently up-to-date.
	_ = protoimpl.EnforceVersion(20 - protoimpl.MinVersion)
	// Verify that runtime/protoimpl is sufficiently up-to-date.
	_ = protoimpl.EnforceVersion(protoimpl.MaxVersion - 20)
)

type ServiceEndpoint struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Id              string `protobuf:"bytes,1,opt,name=id,proto3" json:"id,omitempty"`                           // The ID of the service endpoint
	Type            string `protobuf:"bytes,2,opt,name=type,proto3" json:"type,omitempty"`                       // The type of the service endpoint
	ServiceEndpoint string `protobuf:"bytes,3,opt,name=serviceEndpoint,proto3" json:"serviceEndpoint,omitempty"` // The service endpoint URI
}

func (x *ServiceEndpoint) Reset() {
	*x = ServiceEndpoint{}
	if protoimpl.UnsafeEnabled {
		mi := &file_proto_imp_api_relay_relay_proto_msgTypes[0]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *ServiceEndpoint) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*ServiceEndpoint) ProtoMessage() {}

func (x *ServiceEndpoint) ProtoReflect() protoreflect.Message {
	mi := &file_proto_imp_api_relay_relay_proto_msgTypes[0]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use ServiceEndpoint.ProtoReflect.Descriptor instead.
func (*ServiceEndpoint) Descriptor() ([]byte, []int) {
	return file_proto_imp_api_relay_relay_proto_rawDescGZIP(), []int{0}
}

func (x *ServiceEndpoint) GetId() string {
	if x != nil {
		return x.Id
	}
	return ""
}

func (x *ServiceEndpoint) GetType() string {
	if x != nil {
		return x.Type
	}
	return ""
}

func (x *ServiceEndpoint) GetServiceEndpoint() string {
	if x != nil {
		return x.ServiceEndpoint
	}
	return ""
}

//*
// Represents a request to a relay node to delegate them as a relay
type RequestRelayRequest struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	ToDID                   string             `protobuf:"bytes,1,opt,name=toDID,proto3" json:"toDID,omitempty"`                                     // The DID you want to request to be a relay
	Amount                  int64              `protobuf:"varint,2,opt,name=amount,proto3" json:"amount,omitempty"`                                  // The amount of satoshis to send for the request
	PrivateServiceEndpoints []*ServiceEndpoint `protobuf:"bytes,3,rep,name=privateServiceEndpoints,proto3" json:"privateServiceEndpoints,omitempty"` // The private service endpoints to request the relay to forward messages to
}

func (x *RequestRelayRequest) Reset() {
	*x = RequestRelayRequest{}
	if protoimpl.UnsafeEnabled {
		mi := &file_proto_imp_api_relay_relay_proto_msgTypes[1]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *RequestRelayRequest) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*RequestRelayRequest) ProtoMessage() {}

func (x *RequestRelayRequest) ProtoReflect() protoreflect.Message {
	mi := &file_proto_imp_api_relay_relay_proto_msgTypes[1]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use RequestRelayRequest.ProtoReflect.Descriptor instead.
func (*RequestRelayRequest) Descriptor() ([]byte, []int) {
	return file_proto_imp_api_relay_relay_proto_rawDescGZIP(), []int{1}
}

func (x *RequestRelayRequest) GetToDID() string {
	if x != nil {
		return x.ToDID
	}
	return ""
}

func (x *RequestRelayRequest) GetAmount() int64 {
	if x != nil {
		return x.Amount
	}
	return 0
}

func (x *RequestRelayRequest) GetPrivateServiceEndpoints() []*ServiceEndpoint {
	if x != nil {
		return x.PrivateServiceEndpoints
	}
	return nil
}

//*
// Represents a response back from a relay request
type RequestRelayResponse struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Id string `protobuf:"bytes,1,opt,name=id,proto3" json:"id,omitempty"` // returned message ID
}

func (x *RequestRelayResponse) Reset() {
	*x = RequestRelayResponse{}
	if protoimpl.UnsafeEnabled {
		mi := &file_proto_imp_api_relay_relay_proto_msgTypes[2]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *RequestRelayResponse) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*RequestRelayResponse) ProtoMessage() {}

func (x *RequestRelayResponse) ProtoReflect() protoreflect.Message {
	mi := &file_proto_imp_api_relay_relay_proto_msgTypes[2]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use RequestRelayResponse.ProtoReflect.Descriptor instead.
func (*RequestRelayResponse) Descriptor() ([]byte, []int) {
	return file_proto_imp_api_relay_relay_proto_rawDescGZIP(), []int{2}
}

func (x *RequestRelayResponse) GetId() string {
	if x != nil {
		return x.Id
	}
	return ""
}

//*
// Represents a request to a relay node to send over mailbox messages
type RequestMailboxRequest struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	ToDID                   string             `protobuf:"bytes,1,opt,name=toDID,proto3" json:"toDID,omitempty"`                                     // The DID you want to request to be a relay
	Amount                  int64              `protobuf:"varint,2,opt,name=amount,proto3" json:"amount,omitempty"`                                  // The amount of satoshis to send for the request
	PrivateServiceEndpoints []*ServiceEndpoint `protobuf:"bytes,3,rep,name=privateServiceEndpoints,proto3" json:"privateServiceEndpoints,omitempty"` // The private service endpoints to request the relay to forward messages to
}

func (x *RequestMailboxRequest) Reset() {
	*x = RequestMailboxRequest{}
	if protoimpl.UnsafeEnabled {
		mi := &file_proto_imp_api_relay_relay_proto_msgTypes[3]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *RequestMailboxRequest) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*RequestMailboxRequest) ProtoMessage() {}

func (x *RequestMailboxRequest) ProtoReflect() protoreflect.Message {
	mi := &file_proto_imp_api_relay_relay_proto_msgTypes[3]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use RequestMailboxRequest.ProtoReflect.Descriptor instead.
func (*RequestMailboxRequest) Descriptor() ([]byte, []int) {
	return file_proto_imp_api_relay_relay_proto_rawDescGZIP(), []int{3}
}

func (x *RequestMailboxRequest) GetToDID() string {
	if x != nil {
		return x.ToDID
	}
	return ""
}

func (x *RequestMailboxRequest) GetAmount() int64 {
	if x != nil {
		return x.Amount
	}
	return 0
}

func (x *RequestMailboxRequest) GetPrivateServiceEndpoints() []*ServiceEndpoint {
	if x != nil {
		return x.PrivateServiceEndpoints
	}
	return nil
}

//*
// Represents a response back from a relay request
type RequestMailboxResponse struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Id string `protobuf:"bytes,1,opt,name=id,proto3" json:"id,omitempty"` // returned message ID
}

func (x *RequestMailboxResponse) Reset() {
	*x = RequestMailboxResponse{}
	if protoimpl.UnsafeEnabled {
		mi := &file_proto_imp_api_relay_relay_proto_msgTypes[4]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *RequestMailboxResponse) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*RequestMailboxResponse) ProtoMessage() {}

func (x *RequestMailboxResponse) ProtoReflect() protoreflect.Message {
	mi := &file_proto_imp_api_relay_relay_proto_msgTypes[4]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use RequestMailboxResponse.ProtoReflect.Descriptor instead.
func (*RequestMailboxResponse) Descriptor() ([]byte, []int) {
	return file_proto_imp_api_relay_relay_proto_rawDescGZIP(), []int{4}
}

func (x *RequestMailboxResponse) GetId() string {
	if x != nil {
		return x.Id
	}
	return ""
}

var File_proto_imp_api_relay_relay_proto protoreflect.FileDescriptor

var file_proto_imp_api_relay_relay_proto_rawDesc = []byte{
	0x0a, 0x1f, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x2f, 0x69, 0x6d, 0x70, 0x2f, 0x61, 0x70, 0x69, 0x2f,
	0x72, 0x65, 0x6c, 0x61, 0x79, 0x2f, 0x72, 0x65, 0x6c, 0x61, 0x79, 0x2e, 0x70, 0x72, 0x6f, 0x74,
	0x6f, 0x12, 0x05, 0x72, 0x65, 0x6c, 0x61, 0x79, 0x1a, 0x1c, 0x67, 0x6f, 0x6f, 0x67, 0x6c, 0x65,
	0x2f, 0x61, 0x70, 0x69, 0x2f, 0x61, 0x6e, 0x6e, 0x6f, 0x74, 0x61, 0x74, 0x69, 0x6f, 0x6e, 0x73,
	0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x1a, 0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x63, 0x2d, 0x67,
	0x65, 0x6e, 0x2d, 0x6f, 0x70, 0x65, 0x6e, 0x61, 0x70, 0x69, 0x76, 0x32, 0x2f, 0x6f, 0x70, 0x74,
	0x69, 0x6f, 0x6e, 0x73, 0x2f, 0x61, 0x6e, 0x6e, 0x6f, 0x74, 0x61, 0x74, 0x69, 0x6f, 0x6e, 0x73,
	0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x22, 0x5f, 0x0a, 0x0f, 0x53, 0x65, 0x72, 0x76, 0x69, 0x63,
	0x65, 0x45, 0x6e, 0x64, 0x70, 0x6f, 0x69, 0x6e, 0x74, 0x12, 0x0e, 0x0a, 0x02, 0x69, 0x64, 0x18,
	0x01, 0x20, 0x01, 0x28, 0x09, 0x52, 0x02, 0x69, 0x64, 0x12, 0x12, 0x0a, 0x04, 0x74, 0x79, 0x70,
	0x65, 0x18, 0x02, 0x20, 0x01, 0x28, 0x09, 0x52, 0x04, 0x74, 0x79, 0x70, 0x65, 0x12, 0x28, 0x0a,
	0x0f, 0x73, 0x65, 0x72, 0x76, 0x69, 0x63, 0x65, 0x45, 0x6e, 0x64, 0x70, 0x6f, 0x69, 0x6e, 0x74,
	0x18, 0x03, 0x20, 0x01, 0x28, 0x09, 0x52, 0x0f, 0x73, 0x65, 0x72, 0x76, 0x69, 0x63, 0x65, 0x45,
	0x6e, 0x64, 0x70, 0x6f, 0x69, 0x6e, 0x74, 0x22, 0x95, 0x01, 0x0a, 0x13, 0x52, 0x65, 0x71, 0x75,
	0x65, 0x73, 0x74, 0x52, 0x65, 0x6c, 0x61, 0x79, 0x52, 0x65, 0x71, 0x75, 0x65, 0x73, 0x74, 0x12,
	0x14, 0x0a, 0x05, 0x74, 0x6f, 0x44, 0x49, 0x44, 0x18, 0x01, 0x20, 0x01, 0x28, 0x09, 0x52, 0x05,
	0x74, 0x6f, 0x44, 0x49, 0x44, 0x12, 0x16, 0x0a, 0x06, 0x61, 0x6d, 0x6f, 0x75, 0x6e, 0x74, 0x18,
	0x02, 0x20, 0x01, 0x28, 0x03, 0x52, 0x06, 0x61, 0x6d, 0x6f, 0x75, 0x6e, 0x74, 0x12, 0x50, 0x0a,
	0x17, 0x70, 0x72, 0x69, 0x76, 0x61, 0x74, 0x65, 0x53, 0x65, 0x72, 0x76, 0x69, 0x63, 0x65, 0x45,
	0x6e, 0x64, 0x70, 0x6f, 0x69, 0x6e, 0x74, 0x73, 0x18, 0x03, 0x20, 0x03, 0x28, 0x0b, 0x32, 0x16,
	0x2e, 0x72, 0x65, 0x6c, 0x61, 0x79, 0x2e, 0x53, 0x65, 0x72, 0x76, 0x69, 0x63, 0x65, 0x45, 0x6e,
	0x64, 0x70, 0x6f, 0x69, 0x6e, 0x74, 0x52, 0x17, 0x70, 0x72, 0x69, 0x76, 0x61, 0x74, 0x65, 0x53,
	0x65, 0x72, 0x76, 0x69, 0x63, 0x65, 0x45, 0x6e, 0x64, 0x70, 0x6f, 0x69, 0x6e, 0x74, 0x73, 0x22,
	0x26, 0x0a, 0x14, 0x52, 0x65, 0x71, 0x75, 0x65, 0x73, 0x74, 0x52, 0x65, 0x6c, 0x61, 0x79, 0x52,
	0x65, 0x73, 0x70, 0x6f, 0x6e, 0x73, 0x65, 0x12, 0x0e, 0x0a, 0x02, 0x69, 0x64, 0x18, 0x01, 0x20,
	0x01, 0x28, 0x09, 0x52, 0x02, 0x69, 0x64, 0x22, 0x97, 0x01, 0x0a, 0x15, 0x52, 0x65, 0x71, 0x75,
	0x65, 0x73, 0x74, 0x4d, 0x61, 0x69, 0x6c, 0x62, 0x6f, 0x78, 0x52, 0x65, 0x71, 0x75, 0x65, 0x73,
	0x74, 0x12, 0x14, 0x0a, 0x05, 0x74, 0x6f, 0x44, 0x49, 0x44, 0x18, 0x01, 0x20, 0x01, 0x28, 0x09,
	0x52, 0x05, 0x74, 0x6f, 0x44, 0x49, 0x44, 0x12, 0x16, 0x0a, 0x06, 0x61, 0x6d, 0x6f, 0x75, 0x6e,
	0x74, 0x18, 0x02, 0x20, 0x01, 0x28, 0x03, 0x52, 0x06, 0x61, 0x6d, 0x6f, 0x75, 0x6e, 0x74, 0x12,
	0x50, 0x0a, 0x17, 0x70, 0x72, 0x69, 0x76, 0x61, 0x74, 0x65, 0x53, 0x65, 0x72, 0x76, 0x69, 0x63,
	0x65, 0x45, 0x6e, 0x64, 0x70, 0x6f, 0x69, 0x6e, 0x74, 0x73, 0x18, 0x03, 0x20, 0x03, 0x28, 0x0b,
	0x32, 0x16, 0x2e, 0x72, 0x65, 0x6c, 0x61, 0x79, 0x2e, 0x53, 0x65, 0x72, 0x76, 0x69, 0x63, 0x65,
	0x45, 0x6e, 0x64, 0x70, 0x6f, 0x69, 0x6e, 0x74, 0x52, 0x17, 0x70, 0x72, 0x69, 0x76, 0x61, 0x74,
	0x65, 0x53, 0x65, 0x72, 0x76, 0x69, 0x63, 0x65, 0x45, 0x6e, 0x64, 0x70, 0x6f, 0x69, 0x6e, 0x74,
	0x73, 0x22, 0x28, 0x0a, 0x16, 0x52, 0x65, 0x71, 0x75, 0x65, 0x73, 0x74, 0x4d, 0x61, 0x69, 0x6c,
	0x62, 0x6f, 0x78, 0x52, 0x65, 0x73, 0x70, 0x6f, 0x6e, 0x73, 0x65, 0x12, 0x0e, 0x0a, 0x02, 0x69,
	0x64, 0x18, 0x01, 0x20, 0x01, 0x28, 0x09, 0x52, 0x02, 0x69, 0x64, 0x32, 0xdb, 0x01, 0x0a, 0x05,
	0x52, 0x65, 0x6c, 0x61, 0x79, 0x12, 0x65, 0x0a, 0x0c, 0x52, 0x65, 0x71, 0x75, 0x65, 0x73, 0x74,
	0x52, 0x65, 0x6c, 0x61, 0x79, 0x12, 0x1a, 0x2e, 0x72, 0x65, 0x6c, 0x61, 0x79, 0x2e, 0x52, 0x65,
	0x71, 0x75, 0x65, 0x73, 0x74, 0x52, 0x65, 0x6c, 0x61, 0x79, 0x52, 0x65, 0x71, 0x75, 0x65, 0x73,
	0x74, 0x1a, 0x1b, 0x2e, 0x72, 0x65, 0x6c, 0x61, 0x79, 0x2e, 0x52, 0x65, 0x71, 0x75, 0x65, 0x73,
	0x74, 0x52, 0x65, 0x6c, 0x61, 0x79, 0x52, 0x65, 0x73, 0x70, 0x6f, 0x6e, 0x73, 0x65, 0x22, 0x1c,
	0x82, 0xd3, 0xe4, 0x93, 0x02, 0x16, 0x22, 0x11, 0x2f, 0x76, 0x31, 0x2f, 0x72, 0x65, 0x6c, 0x61,
	0x79, 0x2f, 0x72, 0x65, 0x71, 0x75, 0x65, 0x73, 0x74, 0x3a, 0x01, 0x2a, 0x12, 0x6b, 0x0a, 0x0e,
	0x52, 0x65, 0x71, 0x75, 0x65, 0x73, 0x74, 0x4d, 0x61, 0x69, 0x6c, 0x62, 0x6f, 0x78, 0x12, 0x1c,
	0x2e, 0x72, 0x65, 0x6c, 0x61, 0x79, 0x2e, 0x52, 0x65, 0x71, 0x75, 0x65, 0x73, 0x74, 0x4d, 0x61,
	0x69, 0x6c, 0x62, 0x6f, 0x78, 0x52, 0x65, 0x71, 0x75, 0x65, 0x73, 0x74, 0x1a, 0x1d, 0x2e, 0x72,
	0x65, 0x6c, 0x61, 0x79, 0x2e, 0x52, 0x65, 0x71, 0x75, 0x65, 0x73, 0x74, 0x4d, 0x61, 0x69, 0x6c,
	0x62, 0x6f, 0x78, 0x52, 0x65, 0x73, 0x70, 0x6f, 0x6e, 0x73, 0x65, 0x22, 0x1c, 0x82, 0xd3, 0xe4,
	0x93, 0x02, 0x16, 0x22, 0x11, 0x2f, 0x76, 0x31, 0x2f, 0x72, 0x65, 0x6c, 0x61, 0x79, 0x2f, 0x6d,
	0x61, 0x69, 0x6c, 0x62, 0x6f, 0x78, 0x3a, 0x01, 0x2a, 0x42, 0xba, 0x02, 0x5a, 0x26, 0x67, 0x69,
	0x74, 0x68, 0x75, 0x62, 0x2e, 0x63, 0x6f, 0x6d, 0x2f, 0x69, 0x6d, 0x70, 0x65, 0x72, 0x76, 0x69,
	0x6f, 0x75, 0x73, 0x61, 0x69, 0x2f, 0x69, 0x6d, 0x70, 0x2d, 0x64, 0x61, 0x65, 0x6d, 0x6f, 0x6e,
	0x2f, 0x67, 0x65, 0x6e, 0x92, 0x41, 0x8e, 0x02, 0x12, 0x3d, 0x0a, 0x0e, 0x52, 0x65, 0x6c, 0x61,
	0x79, 0x20, 0x53, 0x65, 0x72, 0x76, 0x69, 0x63, 0x65, 0x73, 0x22, 0x26, 0x0a, 0x0d, 0x49, 0x6d,
	0x70, 0x65, 0x72, 0x76, 0x69, 0x6f, 0x75, 0x73, 0x20, 0x41, 0x49, 0x12, 0x15, 0x68, 0x74, 0x74,
	0x70, 0x73, 0x3a, 0x2f, 0x2f, 0x69, 0x6d, 0x70, 0x65, 0x72, 0x76, 0x69, 0x6f, 0x75, 0x73, 0x2e,
	0x61, 0x69, 0x32, 0x03, 0x31, 0x2e, 0x30, 0x2a, 0x03, 0x01, 0x02, 0x04, 0x32, 0x10, 0x61, 0x70,
	0x70, 0x6c, 0x69, 0x63, 0x61, 0x74, 0x69, 0x6f, 0x6e, 0x2f, 0x6a, 0x73, 0x6f, 0x6e, 0x3a, 0x10,
	0x61, 0x70, 0x70, 0x6c, 0x69, 0x63, 0x61, 0x74, 0x69, 0x6f, 0x6e, 0x2f, 0x6a, 0x73, 0x6f, 0x6e,
	0x5a, 0x61, 0x0a, 0x5f, 0x0a, 0x07, 0x61, 0x70, 0x69, 0x5f, 0x6b, 0x65, 0x79, 0x12, 0x54, 0x08,
	0x02, 0x12, 0x35, 0x41, 0x6e, 0x20, 0x41, 0x50, 0x49, 0x20, 0x6b, 0x65, 0x79, 0x20, 0x67, 0x65,
	0x6e, 0x65, 0x72, 0x61, 0x74, 0x65, 0x64, 0x20, 0x62, 0x79, 0x20, 0x74, 0x68, 0x65, 0x20, 0x64,
	0x61, 0x65, 0x6d, 0x6f, 0x6e, 0x20, 0x66, 0x6f, 0x72, 0x20, 0x61, 0x75, 0x74, 0x68, 0x65, 0x6e,
	0x74, 0x69, 0x63, 0x61, 0x74, 0x69, 0x6f, 0x6e, 0x1a, 0x17, 0x47, 0x72, 0x70, 0x63, 0x2d, 0x4d,
	0x65, 0x74, 0x61, 0x64, 0x61, 0x74, 0x61, 0x2d, 0x58, 0x2d, 0x41, 0x50, 0x49, 0x2d, 0x4b, 0x45,
	0x59, 0x20, 0x03, 0x62, 0x0d, 0x0a, 0x0b, 0x0a, 0x07, 0x61, 0x70, 0x69, 0x5f, 0x6b, 0x65, 0x79,
	0x12, 0x00, 0x72, 0x32, 0x0a, 0x14, 0x44, 0x6f, 0x63, 0x75, 0x6d, 0x65, 0x6e, 0x74, 0x61, 0x74,
	0x69, 0x6f, 0x6e, 0x20, 0x6f, 0x6e, 0x20, 0x49, 0x4d, 0x50, 0x12, 0x1a, 0x68, 0x74, 0x74, 0x70,
	0x73, 0x3a, 0x2f, 0x2f, 0x64, 0x6f, 0x63, 0x73, 0x2e, 0x69, 0x6d, 0x70, 0x65, 0x72, 0x76, 0x69,
	0x6f, 0x75, 0x73, 0x2e, 0x61, 0x69, 0x62, 0x06, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x33,
}

var (
	file_proto_imp_api_relay_relay_proto_rawDescOnce sync.Once
	file_proto_imp_api_relay_relay_proto_rawDescData = file_proto_imp_api_relay_relay_proto_rawDesc
)

func file_proto_imp_api_relay_relay_proto_rawDescGZIP() []byte {
	file_proto_imp_api_relay_relay_proto_rawDescOnce.Do(func() {
		file_proto_imp_api_relay_relay_proto_rawDescData = protoimpl.X.CompressGZIP(file_proto_imp_api_relay_relay_proto_rawDescData)
	})
	return file_proto_imp_api_relay_relay_proto_rawDescData
}

var file_proto_imp_api_relay_relay_proto_msgTypes = make([]protoimpl.MessageInfo, 5)
var file_proto_imp_api_relay_relay_proto_goTypes = []interface{}{
	(*ServiceEndpoint)(nil),        // 0: relay.ServiceEndpoint
	(*RequestRelayRequest)(nil),    // 1: relay.RequestRelayRequest
	(*RequestRelayResponse)(nil),   // 2: relay.RequestRelayResponse
	(*RequestMailboxRequest)(nil),  // 3: relay.RequestMailboxRequest
	(*RequestMailboxResponse)(nil), // 4: relay.RequestMailboxResponse
}
var file_proto_imp_api_relay_relay_proto_depIdxs = []int32{
	0, // 0: relay.RequestRelayRequest.privateServiceEndpoints:type_name -> relay.ServiceEndpoint
	0, // 1: relay.RequestMailboxRequest.privateServiceEndpoints:type_name -> relay.ServiceEndpoint
	1, // 2: relay.Relay.RequestRelay:input_type -> relay.RequestRelayRequest
	3, // 3: relay.Relay.RequestMailbox:input_type -> relay.RequestMailboxRequest
	2, // 4: relay.Relay.RequestRelay:output_type -> relay.RequestRelayResponse
	4, // 5: relay.Relay.RequestMailbox:output_type -> relay.RequestMailboxResponse
	4, // [4:6] is the sub-list for method output_type
	2, // [2:4] is the sub-list for method input_type
	2, // [2:2] is the sub-list for extension type_name
	2, // [2:2] is the sub-list for extension extendee
	0, // [0:2] is the sub-list for field type_name
}

func init() { file_proto_imp_api_relay_relay_proto_init() }
func file_proto_imp_api_relay_relay_proto_init() {
	if File_proto_imp_api_relay_relay_proto != nil {
		return
	}
	if !protoimpl.UnsafeEnabled {
		file_proto_imp_api_relay_relay_proto_msgTypes[0].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*ServiceEndpoint); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
		file_proto_imp_api_relay_relay_proto_msgTypes[1].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*RequestRelayRequest); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
		file_proto_imp_api_relay_relay_proto_msgTypes[2].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*RequestRelayResponse); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
		file_proto_imp_api_relay_relay_proto_msgTypes[3].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*RequestMailboxRequest); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
		file_proto_imp_api_relay_relay_proto_msgTypes[4].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*RequestMailboxResponse); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
	}
	type x struct{}
	out := protoimpl.TypeBuilder{
		File: protoimpl.DescBuilder{
			GoPackagePath: reflect.TypeOf(x{}).PkgPath(),
			RawDescriptor: file_proto_imp_api_relay_relay_proto_rawDesc,
			NumEnums:      0,
			NumMessages:   5,
			NumExtensions: 0,
			NumServices:   1,
		},
		GoTypes:           file_proto_imp_api_relay_relay_proto_goTypes,
		DependencyIndexes: file_proto_imp_api_relay_relay_proto_depIdxs,
		MessageInfos:      file_proto_imp_api_relay_relay_proto_msgTypes,
	}.Build()
	File_proto_imp_api_relay_relay_proto = out.File
	file_proto_imp_api_relay_relay_proto_rawDesc = nil
	file_proto_imp_api_relay_relay_proto_goTypes = nil
	file_proto_imp_api_relay_relay_proto_depIdxs = nil
}

// Reference imports to suppress errors if they are not otherwise used.
var _ context.Context
var _ grpc.ClientConnInterface

// This is a compile-time assertion to ensure that this generated file
// is compatible with the grpc package it is being compiled against.
const _ = grpc.SupportPackageIsVersion6

// RelayClient is the client API for Relay service.
//
// For semantics around ctx use and closing/ending streaming RPCs, please refer to https://godoc.org/google.golang.org/grpc#ClientConn.NewStream.
type RelayClient interface {
	//*
	// RequestRelay requests a relay to a specific node.
	RequestRelay(ctx context.Context, in *RequestRelayRequest, opts ...grpc.CallOption) (*RequestRelayResponse, error)
	//*
	// RequestMailbox requests a relay to send over stored mailbox messages.
	RequestMailbox(ctx context.Context, in *RequestMailboxRequest, opts ...grpc.CallOption) (*RequestMailboxResponse, error)
}

type relayClient struct {
	cc grpc.ClientConnInterface
}

func NewRelayClient(cc grpc.ClientConnInterface) RelayClient {
	return &relayClient{cc}
}

func (c *relayClient) RequestRelay(ctx context.Context, in *RequestRelayRequest, opts ...grpc.CallOption) (*RequestRelayResponse, error) {
	out := new(RequestRelayResponse)
	err := c.cc.Invoke(ctx, "/relay.Relay/RequestRelay", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *relayClient) RequestMailbox(ctx context.Context, in *RequestMailboxRequest, opts ...grpc.CallOption) (*RequestMailboxResponse, error) {
	out := new(RequestMailboxResponse)
	err := c.cc.Invoke(ctx, "/relay.Relay/RequestMailbox", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

// RelayServer is the server API for Relay service.
type RelayServer interface {
	//*
	// RequestRelay requests a relay to a specific node.
	RequestRelay(context.Context, *RequestRelayRequest) (*RequestRelayResponse, error)
	//*
	// RequestMailbox requests a relay to send over stored mailbox messages.
	RequestMailbox(context.Context, *RequestMailboxRequest) (*RequestMailboxResponse, error)
}

// UnimplementedRelayServer can be embedded to have forward compatible implementations.
type UnimplementedRelayServer struct {
}

func (*UnimplementedRelayServer) RequestRelay(context.Context, *RequestRelayRequest) (*RequestRelayResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method RequestRelay not implemented")
}
func (*UnimplementedRelayServer) RequestMailbox(context.Context, *RequestMailboxRequest) (*RequestMailboxResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method RequestMailbox not implemented")
}

func RegisterRelayServer(s *grpc.Server, srv RelayServer) {
	s.RegisterService(&_Relay_serviceDesc, srv)
}

func _Relay_RequestRelay_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(RequestRelayRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(RelayServer).RequestRelay(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/relay.Relay/RequestRelay",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(RelayServer).RequestRelay(ctx, req.(*RequestRelayRequest))
	}
	return interceptor(ctx, in, info, handler)
}

func _Relay_RequestMailbox_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(RequestMailboxRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(RelayServer).RequestMailbox(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/relay.Relay/RequestMailbox",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(RelayServer).RequestMailbox(ctx, req.(*RequestMailboxRequest))
	}
	return interceptor(ctx, in, info, handler)
}

var _Relay_serviceDesc = grpc.ServiceDesc{
	ServiceName: "relay.Relay",
	HandlerType: (*RelayServer)(nil),
	Methods: []grpc.MethodDesc{
		{
			MethodName: "RequestRelay",
			Handler:    _Relay_RequestRelay_Handler,
		},
		{
			MethodName: "RequestMailbox",
			Handler:    _Relay_RequestMailbox_Handler,
		},
	},
	Streams:  []grpc.StreamDesc{},
	Metadata: "proto/imp/api/relay/relay.proto",
}
