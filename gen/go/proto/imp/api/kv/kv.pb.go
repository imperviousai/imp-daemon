/// Allows for IPFS actions for Impervious nodes

// Code generated by protoc-gen-go. DO NOT EDIT.
// versions:
// 	protoc-gen-go v1.28.0
// 	protoc        v3.19.4
// source: proto/imp/api/kv/kv.proto

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

//*
// Represents a request to get a key and value.
type GetKeyRequest struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Key string `protobuf:"bytes,1,opt,name=key,proto3" json:"key,omitempty"` // The name of the key to get
}

func (x *GetKeyRequest) Reset() {
	*x = GetKeyRequest{}
	if protoimpl.UnsafeEnabled {
		mi := &file_proto_imp_api_kv_kv_proto_msgTypes[0]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *GetKeyRequest) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*GetKeyRequest) ProtoMessage() {}

func (x *GetKeyRequest) ProtoReflect() protoreflect.Message {
	mi := &file_proto_imp_api_kv_kv_proto_msgTypes[0]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use GetKeyRequest.ProtoReflect.Descriptor instead.
func (*GetKeyRequest) Descriptor() ([]byte, []int) {
	return file_proto_imp_api_kv_kv_proto_rawDescGZIP(), []int{0}
}

func (x *GetKeyRequest) GetKey() string {
	if x != nil {
		return x.Key
	}
	return ""
}

//*
// Represents a response containing the value
type GetKeyResponse struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Value string `protobuf:"bytes,1,opt,name=value,proto3" json:"value,omitempty"` // The contents of the value
}

func (x *GetKeyResponse) Reset() {
	*x = GetKeyResponse{}
	if protoimpl.UnsafeEnabled {
		mi := &file_proto_imp_api_kv_kv_proto_msgTypes[1]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *GetKeyResponse) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*GetKeyResponse) ProtoMessage() {}

func (x *GetKeyResponse) ProtoReflect() protoreflect.Message {
	mi := &file_proto_imp_api_kv_kv_proto_msgTypes[1]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use GetKeyResponse.ProtoReflect.Descriptor instead.
func (*GetKeyResponse) Descriptor() ([]byte, []int) {
	return file_proto_imp_api_kv_kv_proto_rawDescGZIP(), []int{1}
}

func (x *GetKeyResponse) GetValue() string {
	if x != nil {
		return x.Value
	}
	return ""
}

//*
// Represents a request to get a key and value.
type SetKeyRequest struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Key   string `protobuf:"bytes,1,opt,name=key,proto3" json:"key,omitempty"`     // The name of the key to set
	Value string `protobuf:"bytes,2,opt,name=value,proto3" json:"value,omitempty"` // The value to set
}

func (x *SetKeyRequest) Reset() {
	*x = SetKeyRequest{}
	if protoimpl.UnsafeEnabled {
		mi := &file_proto_imp_api_kv_kv_proto_msgTypes[2]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *SetKeyRequest) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*SetKeyRequest) ProtoMessage() {}

func (x *SetKeyRequest) ProtoReflect() protoreflect.Message {
	mi := &file_proto_imp_api_kv_kv_proto_msgTypes[2]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use SetKeyRequest.ProtoReflect.Descriptor instead.
func (*SetKeyRequest) Descriptor() ([]byte, []int) {
	return file_proto_imp_api_kv_kv_proto_rawDescGZIP(), []int{2}
}

func (x *SetKeyRequest) GetKey() string {
	if x != nil {
		return x.Key
	}
	return ""
}

func (x *SetKeyRequest) GetValue() string {
	if x != nil {
		return x.Value
	}
	return ""
}

//*
// Represents a response for HTTP 200=Set
type SetKeyResponse struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields
}

func (x *SetKeyResponse) Reset() {
	*x = SetKeyResponse{}
	if protoimpl.UnsafeEnabled {
		mi := &file_proto_imp_api_kv_kv_proto_msgTypes[3]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *SetKeyResponse) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*SetKeyResponse) ProtoMessage() {}

func (x *SetKeyResponse) ProtoReflect() protoreflect.Message {
	mi := &file_proto_imp_api_kv_kv_proto_msgTypes[3]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use SetKeyResponse.ProtoReflect.Descriptor instead.
func (*SetKeyResponse) Descriptor() ([]byte, []int) {
	return file_proto_imp_api_kv_kv_proto_rawDescGZIP(), []int{3}
}

//*
// Represents a request to delete a key and value.
type DelKeyRequest struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Key string `protobuf:"bytes,1,opt,name=key,proto3" json:"key,omitempty"` // The name of the key to del
}

func (x *DelKeyRequest) Reset() {
	*x = DelKeyRequest{}
	if protoimpl.UnsafeEnabled {
		mi := &file_proto_imp_api_kv_kv_proto_msgTypes[4]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *DelKeyRequest) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*DelKeyRequest) ProtoMessage() {}

func (x *DelKeyRequest) ProtoReflect() protoreflect.Message {
	mi := &file_proto_imp_api_kv_kv_proto_msgTypes[4]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use DelKeyRequest.ProtoReflect.Descriptor instead.
func (*DelKeyRequest) Descriptor() ([]byte, []int) {
	return file_proto_imp_api_kv_kv_proto_rawDescGZIP(), []int{4}
}

func (x *DelKeyRequest) GetKey() string {
	if x != nil {
		return x.Key
	}
	return ""
}

//*
// Represents a response for deletion HTTP 200=Deleted
type DelKeyResponse struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields
}

func (x *DelKeyResponse) Reset() {
	*x = DelKeyResponse{}
	if protoimpl.UnsafeEnabled {
		mi := &file_proto_imp_api_kv_kv_proto_msgTypes[5]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *DelKeyResponse) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*DelKeyResponse) ProtoMessage() {}

func (x *DelKeyResponse) ProtoReflect() protoreflect.Message {
	mi := &file_proto_imp_api_kv_kv_proto_msgTypes[5]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use DelKeyResponse.ProtoReflect.Descriptor instead.
func (*DelKeyResponse) Descriptor() ([]byte, []int) {
	return file_proto_imp_api_kv_kv_proto_rawDescGZIP(), []int{5}
}

var File_proto_imp_api_kv_kv_proto protoreflect.FileDescriptor

var file_proto_imp_api_kv_kv_proto_rawDesc = []byte{
	0x0a, 0x19, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x2f, 0x69, 0x6d, 0x70, 0x2f, 0x61, 0x70, 0x69, 0x2f,
	0x6b, 0x76, 0x2f, 0x6b, 0x76, 0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x12, 0x02, 0x6b, 0x76, 0x1a,
	0x1c, 0x67, 0x6f, 0x6f, 0x67, 0x6c, 0x65, 0x2f, 0x61, 0x70, 0x69, 0x2f, 0x61, 0x6e, 0x6e, 0x6f,
	0x74, 0x61, 0x74, 0x69, 0x6f, 0x6e, 0x73, 0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x1a, 0x2e, 0x70,
	0x72, 0x6f, 0x74, 0x6f, 0x63, 0x2d, 0x67, 0x65, 0x6e, 0x2d, 0x6f, 0x70, 0x65, 0x6e, 0x61, 0x70,
	0x69, 0x76, 0x32, 0x2f, 0x6f, 0x70, 0x74, 0x69, 0x6f, 0x6e, 0x73, 0x2f, 0x61, 0x6e, 0x6e, 0x6f,
	0x74, 0x61, 0x74, 0x69, 0x6f, 0x6e, 0x73, 0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x22, 0x21, 0x0a,
	0x0d, 0x47, 0x65, 0x74, 0x4b, 0x65, 0x79, 0x52, 0x65, 0x71, 0x75, 0x65, 0x73, 0x74, 0x12, 0x10,
	0x0a, 0x03, 0x6b, 0x65, 0x79, 0x18, 0x01, 0x20, 0x01, 0x28, 0x09, 0x52, 0x03, 0x6b, 0x65, 0x79,
	0x22, 0x26, 0x0a, 0x0e, 0x47, 0x65, 0x74, 0x4b, 0x65, 0x79, 0x52, 0x65, 0x73, 0x70, 0x6f, 0x6e,
	0x73, 0x65, 0x12, 0x14, 0x0a, 0x05, 0x76, 0x61, 0x6c, 0x75, 0x65, 0x18, 0x01, 0x20, 0x01, 0x28,
	0x09, 0x52, 0x05, 0x76, 0x61, 0x6c, 0x75, 0x65, 0x22, 0x37, 0x0a, 0x0d, 0x53, 0x65, 0x74, 0x4b,
	0x65, 0x79, 0x52, 0x65, 0x71, 0x75, 0x65, 0x73, 0x74, 0x12, 0x10, 0x0a, 0x03, 0x6b, 0x65, 0x79,
	0x18, 0x01, 0x20, 0x01, 0x28, 0x09, 0x52, 0x03, 0x6b, 0x65, 0x79, 0x12, 0x14, 0x0a, 0x05, 0x76,
	0x61, 0x6c, 0x75, 0x65, 0x18, 0x02, 0x20, 0x01, 0x28, 0x09, 0x52, 0x05, 0x76, 0x61, 0x6c, 0x75,
	0x65, 0x22, 0x10, 0x0a, 0x0e, 0x53, 0x65, 0x74, 0x4b, 0x65, 0x79, 0x52, 0x65, 0x73, 0x70, 0x6f,
	0x6e, 0x73, 0x65, 0x22, 0x21, 0x0a, 0x0d, 0x44, 0x65, 0x6c, 0x4b, 0x65, 0x79, 0x52, 0x65, 0x71,
	0x75, 0x65, 0x73, 0x74, 0x12, 0x10, 0x0a, 0x03, 0x6b, 0x65, 0x79, 0x18, 0x01, 0x20, 0x01, 0x28,
	0x09, 0x52, 0x03, 0x6b, 0x65, 0x79, 0x22, 0x10, 0x0a, 0x0e, 0x44, 0x65, 0x6c, 0x4b, 0x65, 0x79,
	0x52, 0x65, 0x73, 0x70, 0x6f, 0x6e, 0x73, 0x65, 0x32, 0xe5, 0x01, 0x0a, 0x02, 0x4b, 0x56, 0x12,
	0x49, 0x0a, 0x06, 0x47, 0x65, 0x74, 0x4b, 0x65, 0x79, 0x12, 0x11, 0x2e, 0x6b, 0x76, 0x2e, 0x47,
	0x65, 0x74, 0x4b, 0x65, 0x79, 0x52, 0x65, 0x71, 0x75, 0x65, 0x73, 0x74, 0x1a, 0x12, 0x2e, 0x6b,
	0x76, 0x2e, 0x47, 0x65, 0x74, 0x4b, 0x65, 0x79, 0x52, 0x65, 0x73, 0x70, 0x6f, 0x6e, 0x73, 0x65,
	0x22, 0x18, 0x82, 0xd3, 0xe4, 0x93, 0x02, 0x12, 0x22, 0x0d, 0x2f, 0x76, 0x31, 0x2f, 0x6b, 0x76,
	0x2f, 0x67, 0x65, 0x74, 0x6b, 0x65, 0x79, 0x3a, 0x01, 0x2a, 0x12, 0x49, 0x0a, 0x06, 0x53, 0x65,
	0x74, 0x4b, 0x65, 0x79, 0x12, 0x11, 0x2e, 0x6b, 0x76, 0x2e, 0x53, 0x65, 0x74, 0x4b, 0x65, 0x79,
	0x52, 0x65, 0x71, 0x75, 0x65, 0x73, 0x74, 0x1a, 0x12, 0x2e, 0x6b, 0x76, 0x2e, 0x53, 0x65, 0x74,
	0x4b, 0x65, 0x79, 0x52, 0x65, 0x73, 0x70, 0x6f, 0x6e, 0x73, 0x65, 0x22, 0x18, 0x82, 0xd3, 0xe4,
	0x93, 0x02, 0x12, 0x22, 0x0d, 0x2f, 0x76, 0x31, 0x2f, 0x6b, 0x76, 0x2f, 0x73, 0x65, 0x74, 0x6b,
	0x65, 0x79, 0x3a, 0x01, 0x2a, 0x12, 0x49, 0x0a, 0x06, 0x44, 0x65, 0x6c, 0x4b, 0x65, 0x79, 0x12,
	0x11, 0x2e, 0x6b, 0x76, 0x2e, 0x44, 0x65, 0x6c, 0x4b, 0x65, 0x79, 0x52, 0x65, 0x71, 0x75, 0x65,
	0x73, 0x74, 0x1a, 0x12, 0x2e, 0x6b, 0x76, 0x2e, 0x44, 0x65, 0x6c, 0x4b, 0x65, 0x79, 0x52, 0x65,
	0x73, 0x70, 0x6f, 0x6e, 0x73, 0x65, 0x22, 0x18, 0x82, 0xd3, 0xe4, 0x93, 0x02, 0x12, 0x22, 0x0d,
	0x2f, 0x76, 0x31, 0x2f, 0x6b, 0x76, 0x2f, 0x64, 0x65, 0x6c, 0x6b, 0x65, 0x79, 0x3a, 0x01, 0x2a,
	0x42, 0xb7, 0x02, 0x5a, 0x26, 0x67, 0x69, 0x74, 0x68, 0x75, 0x62, 0x2e, 0x63, 0x6f, 0x6d, 0x2f,
	0x69, 0x6d, 0x70, 0x65, 0x72, 0x76, 0x69, 0x6f, 0x75, 0x73, 0x61, 0x69, 0x2f, 0x69, 0x6d, 0x70,
	0x2d, 0x64, 0x61, 0x65, 0x6d, 0x6f, 0x6e, 0x2f, 0x67, 0x65, 0x6e, 0x92, 0x41, 0x8b, 0x02, 0x12,
	0x3a, 0x0a, 0x0b, 0x4b, 0x56, 0x20, 0x53, 0x65, 0x72, 0x76, 0x69, 0x63, 0x65, 0x73, 0x22, 0x26,
	0x0a, 0x0d, 0x49, 0x6d, 0x70, 0x65, 0x72, 0x76, 0x69, 0x6f, 0x75, 0x73, 0x20, 0x41, 0x49, 0x12,
	0x15, 0x68, 0x74, 0x74, 0x70, 0x73, 0x3a, 0x2f, 0x2f, 0x69, 0x6d, 0x70, 0x65, 0x72, 0x76, 0x69,
	0x6f, 0x75, 0x73, 0x2e, 0x61, 0x69, 0x32, 0x03, 0x31, 0x2e, 0x30, 0x2a, 0x03, 0x01, 0x02, 0x04,
	0x32, 0x10, 0x61, 0x70, 0x70, 0x6c, 0x69, 0x63, 0x61, 0x74, 0x69, 0x6f, 0x6e, 0x2f, 0x6a, 0x73,
	0x6f, 0x6e, 0x3a, 0x10, 0x61, 0x70, 0x70, 0x6c, 0x69, 0x63, 0x61, 0x74, 0x69, 0x6f, 0x6e, 0x2f,
	0x6a, 0x73, 0x6f, 0x6e, 0x5a, 0x61, 0x0a, 0x5f, 0x0a, 0x07, 0x61, 0x70, 0x69, 0x5f, 0x6b, 0x65,
	0x79, 0x12, 0x54, 0x08, 0x02, 0x12, 0x35, 0x41, 0x6e, 0x20, 0x41, 0x50, 0x49, 0x20, 0x6b, 0x65,
	0x79, 0x20, 0x67, 0x65, 0x6e, 0x65, 0x72, 0x61, 0x74, 0x65, 0x64, 0x20, 0x62, 0x79, 0x20, 0x74,
	0x68, 0x65, 0x20, 0x64, 0x61, 0x65, 0x6d, 0x6f, 0x6e, 0x20, 0x66, 0x6f, 0x72, 0x20, 0x61, 0x75,
	0x74, 0x68, 0x65, 0x6e, 0x74, 0x69, 0x63, 0x61, 0x74, 0x69, 0x6f, 0x6e, 0x1a, 0x17, 0x47, 0x72,
	0x70, 0x63, 0x2d, 0x4d, 0x65, 0x74, 0x61, 0x64, 0x61, 0x74, 0x61, 0x2d, 0x58, 0x2d, 0x41, 0x50,
	0x49, 0x2d, 0x4b, 0x45, 0x59, 0x20, 0x03, 0x62, 0x0d, 0x0a, 0x0b, 0x0a, 0x07, 0x61, 0x70, 0x69,
	0x5f, 0x6b, 0x65, 0x79, 0x12, 0x00, 0x72, 0x32, 0x0a, 0x14, 0x44, 0x6f, 0x63, 0x75, 0x6d, 0x65,
	0x6e, 0x74, 0x61, 0x74, 0x69, 0x6f, 0x6e, 0x20, 0x6f, 0x6e, 0x20, 0x49, 0x4d, 0x50, 0x12, 0x1a,
	0x68, 0x74, 0x74, 0x70, 0x73, 0x3a, 0x2f, 0x2f, 0x64, 0x6f, 0x63, 0x73, 0x2e, 0x69, 0x6d, 0x70,
	0x65, 0x72, 0x76, 0x69, 0x6f, 0x75, 0x73, 0x2e, 0x61, 0x69, 0x62, 0x06, 0x70, 0x72, 0x6f, 0x74,
	0x6f, 0x33,
}

var (
	file_proto_imp_api_kv_kv_proto_rawDescOnce sync.Once
	file_proto_imp_api_kv_kv_proto_rawDescData = file_proto_imp_api_kv_kv_proto_rawDesc
)

func file_proto_imp_api_kv_kv_proto_rawDescGZIP() []byte {
	file_proto_imp_api_kv_kv_proto_rawDescOnce.Do(func() {
		file_proto_imp_api_kv_kv_proto_rawDescData = protoimpl.X.CompressGZIP(file_proto_imp_api_kv_kv_proto_rawDescData)
	})
	return file_proto_imp_api_kv_kv_proto_rawDescData
}

var file_proto_imp_api_kv_kv_proto_msgTypes = make([]protoimpl.MessageInfo, 6)
var file_proto_imp_api_kv_kv_proto_goTypes = []interface{}{
	(*GetKeyRequest)(nil),  // 0: kv.GetKeyRequest
	(*GetKeyResponse)(nil), // 1: kv.GetKeyResponse
	(*SetKeyRequest)(nil),  // 2: kv.SetKeyRequest
	(*SetKeyResponse)(nil), // 3: kv.SetKeyResponse
	(*DelKeyRequest)(nil),  // 4: kv.DelKeyRequest
	(*DelKeyResponse)(nil), // 5: kv.DelKeyResponse
}
var file_proto_imp_api_kv_kv_proto_depIdxs = []int32{
	0, // 0: kv.KV.GetKey:input_type -> kv.GetKeyRequest
	2, // 1: kv.KV.SetKey:input_type -> kv.SetKeyRequest
	4, // 2: kv.KV.DelKey:input_type -> kv.DelKeyRequest
	1, // 3: kv.KV.GetKey:output_type -> kv.GetKeyResponse
	3, // 4: kv.KV.SetKey:output_type -> kv.SetKeyResponse
	5, // 5: kv.KV.DelKey:output_type -> kv.DelKeyResponse
	3, // [3:6] is the sub-list for method output_type
	0, // [0:3] is the sub-list for method input_type
	0, // [0:0] is the sub-list for extension type_name
	0, // [0:0] is the sub-list for extension extendee
	0, // [0:0] is the sub-list for field type_name
}

func init() { file_proto_imp_api_kv_kv_proto_init() }
func file_proto_imp_api_kv_kv_proto_init() {
	if File_proto_imp_api_kv_kv_proto != nil {
		return
	}
	if !protoimpl.UnsafeEnabled {
		file_proto_imp_api_kv_kv_proto_msgTypes[0].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*GetKeyRequest); i {
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
		file_proto_imp_api_kv_kv_proto_msgTypes[1].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*GetKeyResponse); i {
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
		file_proto_imp_api_kv_kv_proto_msgTypes[2].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*SetKeyRequest); i {
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
		file_proto_imp_api_kv_kv_proto_msgTypes[3].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*SetKeyResponse); i {
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
		file_proto_imp_api_kv_kv_proto_msgTypes[4].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*DelKeyRequest); i {
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
		file_proto_imp_api_kv_kv_proto_msgTypes[5].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*DelKeyResponse); i {
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
			RawDescriptor: file_proto_imp_api_kv_kv_proto_rawDesc,
			NumEnums:      0,
			NumMessages:   6,
			NumExtensions: 0,
			NumServices:   1,
		},
		GoTypes:           file_proto_imp_api_kv_kv_proto_goTypes,
		DependencyIndexes: file_proto_imp_api_kv_kv_proto_depIdxs,
		MessageInfos:      file_proto_imp_api_kv_kv_proto_msgTypes,
	}.Build()
	File_proto_imp_api_kv_kv_proto = out.File
	file_proto_imp_api_kv_kv_proto_rawDesc = nil
	file_proto_imp_api_kv_kv_proto_goTypes = nil
	file_proto_imp_api_kv_kv_proto_depIdxs = nil
}
