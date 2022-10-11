/// Allows for p2p messaging between Impervious nodes

// Code generated by protoc-gen-go. DO NOT EDIT.
// versions:
// 	protoc-gen-go v1.28.1
// 	protoc        v3.20.1
// source: proto/imp/api/key/key.proto

package gen

import (
	_ "github.com/grpc-ecosystem/grpc-gateway/v2/protoc-gen-openapiv2/options"
	_ "google.golang.org/genproto/googleapis/api/annotations"
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

// *
// Represents an init seed request to initialize the master seed.
type InitSeedRequest struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Mnenomic   string `protobuf:"bytes,1,opt,name=mnenomic,proto3" json:"mnenomic,omitempty"`     // The optional mnenomic to set if you already have a seed you want to use with this daemon
	Passphrase string `protobuf:"bytes,2,opt,name=passphrase,proto3" json:"passphrase,omitempty"` // The passphrase to encrypt the mnenomic, necessary for unlocking the daemon on restarts
}

func (x *InitSeedRequest) Reset() {
	*x = InitSeedRequest{}
	if protoimpl.UnsafeEnabled {
		mi := &file_proto_imp_api_key_key_proto_msgTypes[0]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *InitSeedRequest) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*InitSeedRequest) ProtoMessage() {}

func (x *InitSeedRequest) ProtoReflect() protoreflect.Message {
	mi := &file_proto_imp_api_key_key_proto_msgTypes[0]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use InitSeedRequest.ProtoReflect.Descriptor instead.
func (*InitSeedRequest) Descriptor() ([]byte, []int) {
	return file_proto_imp_api_key_key_proto_rawDescGZIP(), []int{0}
}

func (x *InitSeedRequest) GetMnenomic() string {
	if x != nil {
		return x.Mnenomic
	}
	return ""
}

func (x *InitSeedRequest) GetPassphrase() string {
	if x != nil {
		return x.Passphrase
	}
	return ""
}

// *
// Represents a response back from an init seed request.
type InitSeedResponse struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Mnenomic string `protobuf:"bytes,1,opt,name=mnenomic,proto3" json:"mnenomic,omitempty"`           // The mnenomic that the seed was generated from, should be the same if one was passed in
	ApiKey   string `protobuf:"bytes,2,opt,name=api_key,json=apiKey,proto3" json:"api_key,omitempty"` // The api key for the user to send authenticated requests
}

func (x *InitSeedResponse) Reset() {
	*x = InitSeedResponse{}
	if protoimpl.UnsafeEnabled {
		mi := &file_proto_imp_api_key_key_proto_msgTypes[1]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *InitSeedResponse) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*InitSeedResponse) ProtoMessage() {}

func (x *InitSeedResponse) ProtoReflect() protoreflect.Message {
	mi := &file_proto_imp_api_key_key_proto_msgTypes[1]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use InitSeedResponse.ProtoReflect.Descriptor instead.
func (*InitSeedResponse) Descriptor() ([]byte, []int) {
	return file_proto_imp_api_key_key_proto_rawDescGZIP(), []int{1}
}

func (x *InitSeedResponse) GetMnenomic() string {
	if x != nil {
		return x.Mnenomic
	}
	return ""
}

func (x *InitSeedResponse) GetApiKey() string {
	if x != nil {
		return x.ApiKey
	}
	return ""
}

// *
// Represents an unlock seed request to unlock the master seed.
type UnlockSeedRequest struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Passphrase string `protobuf:"bytes,1,opt,name=passphrase,proto3" json:"passphrase,omitempty"` // The passphrase to decrypt the seed, necessary for unlocking the daemon on restarts
}

func (x *UnlockSeedRequest) Reset() {
	*x = UnlockSeedRequest{}
	if protoimpl.UnsafeEnabled {
		mi := &file_proto_imp_api_key_key_proto_msgTypes[2]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *UnlockSeedRequest) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*UnlockSeedRequest) ProtoMessage() {}

func (x *UnlockSeedRequest) ProtoReflect() protoreflect.Message {
	mi := &file_proto_imp_api_key_key_proto_msgTypes[2]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use UnlockSeedRequest.ProtoReflect.Descriptor instead.
func (*UnlockSeedRequest) Descriptor() ([]byte, []int) {
	return file_proto_imp_api_key_key_proto_rawDescGZIP(), []int{2}
}

func (x *UnlockSeedRequest) GetPassphrase() string {
	if x != nil {
		return x.Passphrase
	}
	return ""
}

// *
// Represents a response back from an unlock seed request.
type UnlockSeedResponse struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	ApiKey string `protobuf:"bytes,1,opt,name=api_key,json=apiKey,proto3" json:"api_key,omitempty"` // The api key for the user to send authenticated requests
}

func (x *UnlockSeedResponse) Reset() {
	*x = UnlockSeedResponse{}
	if protoimpl.UnsafeEnabled {
		mi := &file_proto_imp_api_key_key_proto_msgTypes[3]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *UnlockSeedResponse) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*UnlockSeedResponse) ProtoMessage() {}

func (x *UnlockSeedResponse) ProtoReflect() protoreflect.Message {
	mi := &file_proto_imp_api_key_key_proto_msgTypes[3]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use UnlockSeedResponse.ProtoReflect.Descriptor instead.
func (*UnlockSeedResponse) Descriptor() ([]byte, []int) {
	return file_proto_imp_api_key_key_proto_rawDescGZIP(), []int{3}
}

func (x *UnlockSeedResponse) GetApiKey() string {
	if x != nil {
		return x.ApiKey
	}
	return ""
}

// *
// Represents an status request message.
type StatusRequest struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields
}

func (x *StatusRequest) Reset() {
	*x = StatusRequest{}
	if protoimpl.UnsafeEnabled {
		mi := &file_proto_imp_api_key_key_proto_msgTypes[4]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *StatusRequest) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*StatusRequest) ProtoMessage() {}

func (x *StatusRequest) ProtoReflect() protoreflect.Message {
	mi := &file_proto_imp_api_key_key_proto_msgTypes[4]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use StatusRequest.ProtoReflect.Descriptor instead.
func (*StatusRequest) Descriptor() ([]byte, []int) {
	return file_proto_imp_api_key_key_proto_rawDescGZIP(), []int{4}
}

// *
// Represents a response back from a status request.
type StatusResponse struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Status string `protobuf:"bytes,1,opt,name=status,proto3" json:"status,omitempty"` // The status of the daemon db/key. NOT_INITIALIZED means an InitSeed() is needed. LOCKED means an UnlockSeed() is needed. READY means the daemon is ready.
}

func (x *StatusResponse) Reset() {
	*x = StatusResponse{}
	if protoimpl.UnsafeEnabled {
		mi := &file_proto_imp_api_key_key_proto_msgTypes[5]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *StatusResponse) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*StatusResponse) ProtoMessage() {}

func (x *StatusResponse) ProtoReflect() protoreflect.Message {
	mi := &file_proto_imp_api_key_key_proto_msgTypes[5]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use StatusResponse.ProtoReflect.Descriptor instead.
func (*StatusResponse) Descriptor() ([]byte, []int) {
	return file_proto_imp_api_key_key_proto_rawDescGZIP(), []int{5}
}

func (x *StatusResponse) GetStatus() string {
	if x != nil {
		return x.Status
	}
	return ""
}

var File_proto_imp_api_key_key_proto protoreflect.FileDescriptor

var file_proto_imp_api_key_key_proto_rawDesc = []byte{
	0x0a, 0x1b, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x2f, 0x69, 0x6d, 0x70, 0x2f, 0x61, 0x70, 0x69, 0x2f,
	0x6b, 0x65, 0x79, 0x2f, 0x6b, 0x65, 0x79, 0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x12, 0x03, 0x6b,
	0x65, 0x79, 0x1a, 0x1c, 0x67, 0x6f, 0x6f, 0x67, 0x6c, 0x65, 0x2f, 0x61, 0x70, 0x69, 0x2f, 0x61,
	0x6e, 0x6e, 0x6f, 0x74, 0x61, 0x74, 0x69, 0x6f, 0x6e, 0x73, 0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f,
	0x1a, 0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x63, 0x2d, 0x67, 0x65, 0x6e, 0x2d, 0x6f, 0x70, 0x65,
	0x6e, 0x61, 0x70, 0x69, 0x76, 0x32, 0x2f, 0x6f, 0x70, 0x74, 0x69, 0x6f, 0x6e, 0x73, 0x2f, 0x61,
	0x6e, 0x6e, 0x6f, 0x74, 0x61, 0x74, 0x69, 0x6f, 0x6e, 0x73, 0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f,
	0x22, 0x4d, 0x0a, 0x0f, 0x49, 0x6e, 0x69, 0x74, 0x53, 0x65, 0x65, 0x64, 0x52, 0x65, 0x71, 0x75,
	0x65, 0x73, 0x74, 0x12, 0x1a, 0x0a, 0x08, 0x6d, 0x6e, 0x65, 0x6e, 0x6f, 0x6d, 0x69, 0x63, 0x18,
	0x01, 0x20, 0x01, 0x28, 0x09, 0x52, 0x08, 0x6d, 0x6e, 0x65, 0x6e, 0x6f, 0x6d, 0x69, 0x63, 0x12,
	0x1e, 0x0a, 0x0a, 0x70, 0x61, 0x73, 0x73, 0x70, 0x68, 0x72, 0x61, 0x73, 0x65, 0x18, 0x02, 0x20,
	0x01, 0x28, 0x09, 0x52, 0x0a, 0x70, 0x61, 0x73, 0x73, 0x70, 0x68, 0x72, 0x61, 0x73, 0x65, 0x22,
	0x47, 0x0a, 0x10, 0x49, 0x6e, 0x69, 0x74, 0x53, 0x65, 0x65, 0x64, 0x52, 0x65, 0x73, 0x70, 0x6f,
	0x6e, 0x73, 0x65, 0x12, 0x1a, 0x0a, 0x08, 0x6d, 0x6e, 0x65, 0x6e, 0x6f, 0x6d, 0x69, 0x63, 0x18,
	0x01, 0x20, 0x01, 0x28, 0x09, 0x52, 0x08, 0x6d, 0x6e, 0x65, 0x6e, 0x6f, 0x6d, 0x69, 0x63, 0x12,
	0x17, 0x0a, 0x07, 0x61, 0x70, 0x69, 0x5f, 0x6b, 0x65, 0x79, 0x18, 0x02, 0x20, 0x01, 0x28, 0x09,
	0x52, 0x06, 0x61, 0x70, 0x69, 0x4b, 0x65, 0x79, 0x22, 0x33, 0x0a, 0x11, 0x55, 0x6e, 0x6c, 0x6f,
	0x63, 0x6b, 0x53, 0x65, 0x65, 0x64, 0x52, 0x65, 0x71, 0x75, 0x65, 0x73, 0x74, 0x12, 0x1e, 0x0a,
	0x0a, 0x70, 0x61, 0x73, 0x73, 0x70, 0x68, 0x72, 0x61, 0x73, 0x65, 0x18, 0x01, 0x20, 0x01, 0x28,
	0x09, 0x52, 0x0a, 0x70, 0x61, 0x73, 0x73, 0x70, 0x68, 0x72, 0x61, 0x73, 0x65, 0x22, 0x2d, 0x0a,
	0x12, 0x55, 0x6e, 0x6c, 0x6f, 0x63, 0x6b, 0x53, 0x65, 0x65, 0x64, 0x52, 0x65, 0x73, 0x70, 0x6f,
	0x6e, 0x73, 0x65, 0x12, 0x17, 0x0a, 0x07, 0x61, 0x70, 0x69, 0x5f, 0x6b, 0x65, 0x79, 0x18, 0x01,
	0x20, 0x01, 0x28, 0x09, 0x52, 0x06, 0x61, 0x70, 0x69, 0x4b, 0x65, 0x79, 0x22, 0x0f, 0x0a, 0x0d,
	0x53, 0x74, 0x61, 0x74, 0x75, 0x73, 0x52, 0x65, 0x71, 0x75, 0x65, 0x73, 0x74, 0x22, 0x28, 0x0a,
	0x0e, 0x53, 0x74, 0x61, 0x74, 0x75, 0x73, 0x52, 0x65, 0x73, 0x70, 0x6f, 0x6e, 0x73, 0x65, 0x12,
	0x16, 0x0a, 0x06, 0x73, 0x74, 0x61, 0x74, 0x75, 0x73, 0x18, 0x01, 0x20, 0x01, 0x28, 0x09, 0x52,
	0x06, 0x73, 0x74, 0x61, 0x74, 0x75, 0x73, 0x32, 0x84, 0x02, 0x0a, 0x03, 0x4b, 0x65, 0x79, 0x12,
	0x54, 0x0a, 0x08, 0x49, 0x6e, 0x69, 0x74, 0x53, 0x65, 0x65, 0x64, 0x12, 0x14, 0x2e, 0x6b, 0x65,
	0x79, 0x2e, 0x49, 0x6e, 0x69, 0x74, 0x53, 0x65, 0x65, 0x64, 0x52, 0x65, 0x71, 0x75, 0x65, 0x73,
	0x74, 0x1a, 0x15, 0x2e, 0x6b, 0x65, 0x79, 0x2e, 0x49, 0x6e, 0x69, 0x74, 0x53, 0x65, 0x65, 0x64,
	0x52, 0x65, 0x73, 0x70, 0x6f, 0x6e, 0x73, 0x65, 0x22, 0x1b, 0x82, 0xd3, 0xe4, 0x93, 0x02, 0x15,
	0x22, 0x10, 0x2f, 0x76, 0x31, 0x2f, 0x6b, 0x65, 0x79, 0x2f, 0x69, 0x6e, 0x69, 0x74, 0x53, 0x65,
	0x65, 0x64, 0x3a, 0x01, 0x2a, 0x12, 0x5c, 0x0a, 0x0a, 0x55, 0x6e, 0x6c, 0x6f, 0x63, 0x6b, 0x53,
	0x65, 0x65, 0x64, 0x12, 0x16, 0x2e, 0x6b, 0x65, 0x79, 0x2e, 0x55, 0x6e, 0x6c, 0x6f, 0x63, 0x6b,
	0x53, 0x65, 0x65, 0x64, 0x52, 0x65, 0x71, 0x75, 0x65, 0x73, 0x74, 0x1a, 0x17, 0x2e, 0x6b, 0x65,
	0x79, 0x2e, 0x55, 0x6e, 0x6c, 0x6f, 0x63, 0x6b, 0x53, 0x65, 0x65, 0x64, 0x52, 0x65, 0x73, 0x70,
	0x6f, 0x6e, 0x73, 0x65, 0x22, 0x1d, 0x82, 0xd3, 0xe4, 0x93, 0x02, 0x17, 0x22, 0x12, 0x2f, 0x76,
	0x31, 0x2f, 0x6b, 0x65, 0x79, 0x2f, 0x75, 0x6e, 0x6c, 0x6f, 0x63, 0x6b, 0x53, 0x65, 0x65, 0x64,
	0x3a, 0x01, 0x2a, 0x12, 0x49, 0x0a, 0x06, 0x53, 0x74, 0x61, 0x74, 0x75, 0x73, 0x12, 0x12, 0x2e,
	0x6b, 0x65, 0x79, 0x2e, 0x53, 0x74, 0x61, 0x74, 0x75, 0x73, 0x52, 0x65, 0x71, 0x75, 0x65, 0x73,
	0x74, 0x1a, 0x13, 0x2e, 0x6b, 0x65, 0x79, 0x2e, 0x53, 0x74, 0x61, 0x74, 0x75, 0x73, 0x52, 0x65,
	0x73, 0x70, 0x6f, 0x6e, 0x73, 0x65, 0x22, 0x16, 0x82, 0xd3, 0xe4, 0x93, 0x02, 0x10, 0x12, 0x0e,
	0x2f, 0x76, 0x31, 0x2f, 0x6b, 0x65, 0x79, 0x2f, 0x73, 0x74, 0x61, 0x74, 0x75, 0x73, 0x42, 0xb8,
	0x02, 0x5a, 0x26, 0x67, 0x69, 0x74, 0x68, 0x75, 0x62, 0x2e, 0x63, 0x6f, 0x6d, 0x2f, 0x69, 0x6d,
	0x70, 0x65, 0x72, 0x76, 0x69, 0x6f, 0x75, 0x73, 0x61, 0x69, 0x2f, 0x69, 0x6d, 0x70, 0x2d, 0x64,
	0x61, 0x65, 0x6d, 0x6f, 0x6e, 0x2f, 0x67, 0x65, 0x6e, 0x92, 0x41, 0x8c, 0x02, 0x12, 0x3b, 0x0a,
	0x0c, 0x4b, 0x65, 0x79, 0x20, 0x53, 0x65, 0x72, 0x76, 0x69, 0x63, 0x65, 0x73, 0x22, 0x26, 0x0a,
	0x0d, 0x49, 0x6d, 0x70, 0x65, 0x72, 0x76, 0x69, 0x6f, 0x75, 0x73, 0x20, 0x41, 0x49, 0x12, 0x15,
	0x68, 0x74, 0x74, 0x70, 0x73, 0x3a, 0x2f, 0x2f, 0x69, 0x6d, 0x70, 0x65, 0x72, 0x76, 0x69, 0x6f,
	0x75, 0x73, 0x2e, 0x61, 0x69, 0x32, 0x03, 0x31, 0x2e, 0x30, 0x2a, 0x03, 0x01, 0x02, 0x04, 0x32,
	0x10, 0x61, 0x70, 0x70, 0x6c, 0x69, 0x63, 0x61, 0x74, 0x69, 0x6f, 0x6e, 0x2f, 0x6a, 0x73, 0x6f,
	0x6e, 0x3a, 0x10, 0x61, 0x70, 0x70, 0x6c, 0x69, 0x63, 0x61, 0x74, 0x69, 0x6f, 0x6e, 0x2f, 0x6a,
	0x73, 0x6f, 0x6e, 0x5a, 0x61, 0x0a, 0x5f, 0x0a, 0x07, 0x61, 0x70, 0x69, 0x5f, 0x6b, 0x65, 0x79,
	0x12, 0x54, 0x08, 0x02, 0x12, 0x35, 0x41, 0x6e, 0x20, 0x41, 0x50, 0x49, 0x20, 0x6b, 0x65, 0x79,
	0x20, 0x67, 0x65, 0x6e, 0x65, 0x72, 0x61, 0x74, 0x65, 0x64, 0x20, 0x62, 0x79, 0x20, 0x74, 0x68,
	0x65, 0x20, 0x64, 0x61, 0x65, 0x6d, 0x6f, 0x6e, 0x20, 0x66, 0x6f, 0x72, 0x20, 0x61, 0x75, 0x74,
	0x68, 0x65, 0x6e, 0x74, 0x69, 0x63, 0x61, 0x74, 0x69, 0x6f, 0x6e, 0x1a, 0x17, 0x47, 0x72, 0x70,
	0x63, 0x2d, 0x4d, 0x65, 0x74, 0x61, 0x64, 0x61, 0x74, 0x61, 0x2d, 0x58, 0x2d, 0x41, 0x50, 0x49,
	0x2d, 0x4b, 0x45, 0x59, 0x20, 0x03, 0x62, 0x0d, 0x0a, 0x0b, 0x0a, 0x07, 0x61, 0x70, 0x69, 0x5f,
	0x6b, 0x65, 0x79, 0x12, 0x00, 0x72, 0x32, 0x0a, 0x14, 0x44, 0x6f, 0x63, 0x75, 0x6d, 0x65, 0x6e,
	0x74, 0x61, 0x74, 0x69, 0x6f, 0x6e, 0x20, 0x6f, 0x6e, 0x20, 0x49, 0x4d, 0x50, 0x12, 0x1a, 0x68,
	0x74, 0x74, 0x70, 0x73, 0x3a, 0x2f, 0x2f, 0x64, 0x6f, 0x63, 0x73, 0x2e, 0x69, 0x6d, 0x70, 0x65,
	0x72, 0x76, 0x69, 0x6f, 0x75, 0x73, 0x2e, 0x61, 0x69, 0x62, 0x06, 0x70, 0x72, 0x6f, 0x74, 0x6f,
	0x33,
}

var (
	file_proto_imp_api_key_key_proto_rawDescOnce sync.Once
	file_proto_imp_api_key_key_proto_rawDescData = file_proto_imp_api_key_key_proto_rawDesc
)

func file_proto_imp_api_key_key_proto_rawDescGZIP() []byte {
	file_proto_imp_api_key_key_proto_rawDescOnce.Do(func() {
		file_proto_imp_api_key_key_proto_rawDescData = protoimpl.X.CompressGZIP(file_proto_imp_api_key_key_proto_rawDescData)
	})
	return file_proto_imp_api_key_key_proto_rawDescData
}

var file_proto_imp_api_key_key_proto_msgTypes = make([]protoimpl.MessageInfo, 6)
var file_proto_imp_api_key_key_proto_goTypes = []interface{}{
	(*InitSeedRequest)(nil),    // 0: key.InitSeedRequest
	(*InitSeedResponse)(nil),   // 1: key.InitSeedResponse
	(*UnlockSeedRequest)(nil),  // 2: key.UnlockSeedRequest
	(*UnlockSeedResponse)(nil), // 3: key.UnlockSeedResponse
	(*StatusRequest)(nil),      // 4: key.StatusRequest
	(*StatusResponse)(nil),     // 5: key.StatusResponse
}
var file_proto_imp_api_key_key_proto_depIdxs = []int32{
	0, // 0: key.Key.InitSeed:input_type -> key.InitSeedRequest
	2, // 1: key.Key.UnlockSeed:input_type -> key.UnlockSeedRequest
	4, // 2: key.Key.Status:input_type -> key.StatusRequest
	1, // 3: key.Key.InitSeed:output_type -> key.InitSeedResponse
	3, // 4: key.Key.UnlockSeed:output_type -> key.UnlockSeedResponse
	5, // 5: key.Key.Status:output_type -> key.StatusResponse
	3, // [3:6] is the sub-list for method output_type
	0, // [0:3] is the sub-list for method input_type
	0, // [0:0] is the sub-list for extension type_name
	0, // [0:0] is the sub-list for extension extendee
	0, // [0:0] is the sub-list for field type_name
}

func init() { file_proto_imp_api_key_key_proto_init() }
func file_proto_imp_api_key_key_proto_init() {
	if File_proto_imp_api_key_key_proto != nil {
		return
	}
	if !protoimpl.UnsafeEnabled {
		file_proto_imp_api_key_key_proto_msgTypes[0].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*InitSeedRequest); i {
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
		file_proto_imp_api_key_key_proto_msgTypes[1].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*InitSeedResponse); i {
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
		file_proto_imp_api_key_key_proto_msgTypes[2].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*UnlockSeedRequest); i {
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
		file_proto_imp_api_key_key_proto_msgTypes[3].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*UnlockSeedResponse); i {
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
		file_proto_imp_api_key_key_proto_msgTypes[4].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*StatusRequest); i {
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
		file_proto_imp_api_key_key_proto_msgTypes[5].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*StatusResponse); i {
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
			RawDescriptor: file_proto_imp_api_key_key_proto_rawDesc,
			NumEnums:      0,
			NumMessages:   6,
			NumExtensions: 0,
			NumServices:   1,
		},
		GoTypes:           file_proto_imp_api_key_key_proto_goTypes,
		DependencyIndexes: file_proto_imp_api_key_key_proto_depIdxs,
		MessageInfos:      file_proto_imp_api_key_key_proto_msgTypes,
	}.Build()
	File_proto_imp_api_key_key_proto = out.File
	file_proto_imp_api_key_key_proto_rawDesc = nil
	file_proto_imp_api_key_key_proto_goTypes = nil
	file_proto_imp_api_key_key_proto_depIdxs = nil
}
