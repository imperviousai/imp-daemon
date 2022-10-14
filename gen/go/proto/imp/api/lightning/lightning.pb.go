/// Allows for p2p messaging between Impervious nodes

// Code generated by protoc-gen-go. DO NOT EDIT.
// versions:
// 	protoc-gen-go v1.28.0
// 	protoc        v3.19.4
// source: proto/imp/api/lightning/lightning.proto

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
// Represents a GetChannels request toward your lightning node.
type GetChannelsRequest struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields
}

func (x *GetChannelsRequest) Reset() {
	*x = GetChannelsRequest{}
	if protoimpl.UnsafeEnabled {
		mi := &file_proto_imp_api_lightning_lightning_proto_msgTypes[0]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *GetChannelsRequest) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*GetChannelsRequest) ProtoMessage() {}

func (x *GetChannelsRequest) ProtoReflect() protoreflect.Message {
	mi := &file_proto_imp_api_lightning_lightning_proto_msgTypes[0]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use GetChannelsRequest.ProtoReflect.Descriptor instead.
func (*GetChannelsRequest) Descriptor() ([]byte, []int) {
	return file_proto_imp_api_lightning_lightning_proto_rawDescGZIP(), []int{0}
}

//*
// Represents a response back from an Getchannels generation request.
type GetChannelsResponse struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Amt int64 `protobuf:"varint,1,opt,name=amt,proto3" json:"amt,omitempty"` // The channel amount from your lightning node
}

func (x *GetChannelsResponse) Reset() {
	*x = GetChannelsResponse{}
	if protoimpl.UnsafeEnabled {
		mi := &file_proto_imp_api_lightning_lightning_proto_msgTypes[1]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *GetChannelsResponse) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*GetChannelsResponse) ProtoMessage() {}

func (x *GetChannelsResponse) ProtoReflect() protoreflect.Message {
	mi := &file_proto_imp_api_lightning_lightning_proto_msgTypes[1]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use GetChannelsResponse.ProtoReflect.Descriptor instead.
func (*GetChannelsResponse) Descriptor() ([]byte, []int) {
	return file_proto_imp_api_lightning_lightning_proto_rawDescGZIP(), []int{1}
}

func (x *GetChannelsResponse) GetAmt() int64 {
	if x != nil {
		return x.Amt
	}
	return 0
}

//*
// Represents a ListPayments request toward your lightning node.
type ListPaymentsRequest struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields
}

func (x *ListPaymentsRequest) Reset() {
	*x = ListPaymentsRequest{}
	if protoimpl.UnsafeEnabled {
		mi := &file_proto_imp_api_lightning_lightning_proto_msgTypes[2]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *ListPaymentsRequest) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*ListPaymentsRequest) ProtoMessage() {}

func (x *ListPaymentsRequest) ProtoReflect() protoreflect.Message {
	mi := &file_proto_imp_api_lightning_lightning_proto_msgTypes[2]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use ListPaymentsRequest.ProtoReflect.Descriptor instead.
func (*ListPaymentsRequest) Descriptor() ([]byte, []int) {
	return file_proto_imp_api_lightning_lightning_proto_rawDescGZIP(), []int{2}
}

//*
// Represents a response back from an ListPayments generation request.
type ListPaymentsResponse struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Payments string `protobuf:"bytes,1,opt,name=payments,proto3" json:"payments,omitempty"` // The list of payments
}

func (x *ListPaymentsResponse) Reset() {
	*x = ListPaymentsResponse{}
	if protoimpl.UnsafeEnabled {
		mi := &file_proto_imp_api_lightning_lightning_proto_msgTypes[3]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *ListPaymentsResponse) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*ListPaymentsResponse) ProtoMessage() {}

func (x *ListPaymentsResponse) ProtoReflect() protoreflect.Message {
	mi := &file_proto_imp_api_lightning_lightning_proto_msgTypes[3]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use ListPaymentsResponse.ProtoReflect.Descriptor instead.
func (*ListPaymentsResponse) Descriptor() ([]byte, []int) {
	return file_proto_imp_api_lightning_lightning_proto_rawDescGZIP(), []int{3}
}

func (x *ListPaymentsResponse) GetPayments() string {
	if x != nil {
		return x.Payments
	}
	return ""
}

//*
// Represents a ListInvoices request toward your lightning node.
type ListInvoicesRequest struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields
}

func (x *ListInvoicesRequest) Reset() {
	*x = ListInvoicesRequest{}
	if protoimpl.UnsafeEnabled {
		mi := &file_proto_imp_api_lightning_lightning_proto_msgTypes[4]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *ListInvoicesRequest) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*ListInvoicesRequest) ProtoMessage() {}

func (x *ListInvoicesRequest) ProtoReflect() protoreflect.Message {
	mi := &file_proto_imp_api_lightning_lightning_proto_msgTypes[4]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use ListInvoicesRequest.ProtoReflect.Descriptor instead.
func (*ListInvoicesRequest) Descriptor() ([]byte, []int) {
	return file_proto_imp_api_lightning_lightning_proto_rawDescGZIP(), []int{4}
}

//*
// Represents a response back from an ListInvoices generation request.
type ListInvoicesResponse struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Invoices string `protobuf:"bytes,1,opt,name=invoices,proto3" json:"invoices,omitempty"` // The list of invoices
}

func (x *ListInvoicesResponse) Reset() {
	*x = ListInvoicesResponse{}
	if protoimpl.UnsafeEnabled {
		mi := &file_proto_imp_api_lightning_lightning_proto_msgTypes[5]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *ListInvoicesResponse) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*ListInvoicesResponse) ProtoMessage() {}

func (x *ListInvoicesResponse) ProtoReflect() protoreflect.Message {
	mi := &file_proto_imp_api_lightning_lightning_proto_msgTypes[5]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use ListInvoicesResponse.ProtoReflect.Descriptor instead.
func (*ListInvoicesResponse) Descriptor() ([]byte, []int) {
	return file_proto_imp_api_lightning_lightning_proto_rawDescGZIP(), []int{5}
}

func (x *ListInvoicesResponse) GetInvoices() string {
	if x != nil {
		return x.Invoices
	}
	return ""
}

//*
// Represents an invoice creation request from your lightning node.
type GenerateInvoiceRequest struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Amount int64  `protobuf:"varint,1,opt,name=amount,proto3" json:"amount,omitempty"` // The amount of satoshis you want to receive
	Memo   string `protobuf:"bytes,2,opt,name=memo,proto3" json:"memo,omitempty"`      // The human readable memo you want the sender to see
}

func (x *GenerateInvoiceRequest) Reset() {
	*x = GenerateInvoiceRequest{}
	if protoimpl.UnsafeEnabled {
		mi := &file_proto_imp_api_lightning_lightning_proto_msgTypes[6]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *GenerateInvoiceRequest) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*GenerateInvoiceRequest) ProtoMessage() {}

func (x *GenerateInvoiceRequest) ProtoReflect() protoreflect.Message {
	mi := &file_proto_imp_api_lightning_lightning_proto_msgTypes[6]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use GenerateInvoiceRequest.ProtoReflect.Descriptor instead.
func (*GenerateInvoiceRequest) Descriptor() ([]byte, []int) {
	return file_proto_imp_api_lightning_lightning_proto_rawDescGZIP(), []int{6}
}

func (x *GenerateInvoiceRequest) GetAmount() int64 {
	if x != nil {
		return x.Amount
	}
	return 0
}

func (x *GenerateInvoiceRequest) GetMemo() string {
	if x != nil {
		return x.Memo
	}
	return ""
}

//*
// Represents a response back from an invoice generation request.
type GenerateInvoiceResponse struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Invoice string `protobuf:"bytes,1,opt,name=invoice,proto3" json:"invoice,omitempty"` // The invoice from your lightning node
}

func (x *GenerateInvoiceResponse) Reset() {
	*x = GenerateInvoiceResponse{}
	if protoimpl.UnsafeEnabled {
		mi := &file_proto_imp_api_lightning_lightning_proto_msgTypes[7]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *GenerateInvoiceResponse) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*GenerateInvoiceResponse) ProtoMessage() {}

func (x *GenerateInvoiceResponse) ProtoReflect() protoreflect.Message {
	mi := &file_proto_imp_api_lightning_lightning_proto_msgTypes[7]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use GenerateInvoiceResponse.ProtoReflect.Descriptor instead.
func (*GenerateInvoiceResponse) Descriptor() ([]byte, []int) {
	return file_proto_imp_api_lightning_lightning_proto_rawDescGZIP(), []int{7}
}

func (x *GenerateInvoiceResponse) GetInvoice() string {
	if x != nil {
		return x.Invoice
	}
	return ""
}

//*
// Represents an invoice that will be paid by your lightning node.
type PayInvoiceRequest struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Invoice string `protobuf:"bytes,1,opt,name=invoice,proto3" json:"invoice,omitempty"` // The invoice to pay
}

func (x *PayInvoiceRequest) Reset() {
	*x = PayInvoiceRequest{}
	if protoimpl.UnsafeEnabled {
		mi := &file_proto_imp_api_lightning_lightning_proto_msgTypes[8]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *PayInvoiceRequest) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*PayInvoiceRequest) ProtoMessage() {}

func (x *PayInvoiceRequest) ProtoReflect() protoreflect.Message {
	mi := &file_proto_imp_api_lightning_lightning_proto_msgTypes[8]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use PayInvoiceRequest.ProtoReflect.Descriptor instead.
func (*PayInvoiceRequest) Descriptor() ([]byte, []int) {
	return file_proto_imp_api_lightning_lightning_proto_rawDescGZIP(), []int{8}
}

func (x *PayInvoiceRequest) GetInvoice() string {
	if x != nil {
		return x.Invoice
	}
	return ""
}

//*
// Represents a response back from the payment result.
type PayInvoiceResponse struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Preimage string `protobuf:"bytes,1,opt,name=preimage,proto3" json:"preimage,omitempty"` // The preimage from the payment result, if successful
}

func (x *PayInvoiceResponse) Reset() {
	*x = PayInvoiceResponse{}
	if protoimpl.UnsafeEnabled {
		mi := &file_proto_imp_api_lightning_lightning_proto_msgTypes[9]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *PayInvoiceResponse) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*PayInvoiceResponse) ProtoMessage() {}

func (x *PayInvoiceResponse) ProtoReflect() protoreflect.Message {
	mi := &file_proto_imp_api_lightning_lightning_proto_msgTypes[9]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use PayInvoiceResponse.ProtoReflect.Descriptor instead.
func (*PayInvoiceResponse) Descriptor() ([]byte, []int) {
	return file_proto_imp_api_lightning_lightning_proto_rawDescGZIP(), []int{9}
}

func (x *PayInvoiceResponse) GetPreimage() string {
	if x != nil {
		return x.Preimage
	}
	return ""
}

//*
// Represents an request to check an invoice.
type CheckInvoiceRequest struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Invoice string `protobuf:"bytes,1,opt,name=invoice,proto3" json:"invoice,omitempty"` // The invoice to check
}

func (x *CheckInvoiceRequest) Reset() {
	*x = CheckInvoiceRequest{}
	if protoimpl.UnsafeEnabled {
		mi := &file_proto_imp_api_lightning_lightning_proto_msgTypes[10]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *CheckInvoiceRequest) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*CheckInvoiceRequest) ProtoMessage() {}

func (x *CheckInvoiceRequest) ProtoReflect() protoreflect.Message {
	mi := &file_proto_imp_api_lightning_lightning_proto_msgTypes[10]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use CheckInvoiceRequest.ProtoReflect.Descriptor instead.
func (*CheckInvoiceRequest) Descriptor() ([]byte, []int) {
	return file_proto_imp_api_lightning_lightning_proto_rawDescGZIP(), []int{10}
}

func (x *CheckInvoiceRequest) GetInvoice() string {
	if x != nil {
		return x.Invoice
	}
	return ""
}

//*
// Represents a response back from the invoice check.
type CheckInvoiceResponse struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Paid bool `protobuf:"varint,1,opt,name=paid,proto3" json:"paid,omitempty"` // The boolean result representing whether or not the invoice was paid
}

func (x *CheckInvoiceResponse) Reset() {
	*x = CheckInvoiceResponse{}
	if protoimpl.UnsafeEnabled {
		mi := &file_proto_imp_api_lightning_lightning_proto_msgTypes[11]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *CheckInvoiceResponse) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*CheckInvoiceResponse) ProtoMessage() {}

func (x *CheckInvoiceResponse) ProtoReflect() protoreflect.Message {
	mi := &file_proto_imp_api_lightning_lightning_proto_msgTypes[11]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use CheckInvoiceResponse.ProtoReflect.Descriptor instead.
func (*CheckInvoiceResponse) Descriptor() ([]byte, []int) {
	return file_proto_imp_api_lightning_lightning_proto_rawDescGZIP(), []int{11}
}

func (x *CheckInvoiceResponse) GetPaid() bool {
	if x != nil {
		return x.Paid
	}
	return false
}

var File_proto_imp_api_lightning_lightning_proto protoreflect.FileDescriptor

var file_proto_imp_api_lightning_lightning_proto_rawDesc = []byte{
	0x0a, 0x27, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x2f, 0x69, 0x6d, 0x70, 0x2f, 0x61, 0x70, 0x69, 0x2f,
	0x6c, 0x69, 0x67, 0x68, 0x74, 0x6e, 0x69, 0x6e, 0x67, 0x2f, 0x6c, 0x69, 0x67, 0x68, 0x74, 0x6e,
	0x69, 0x6e, 0x67, 0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x12, 0x09, 0x6c, 0x69, 0x67, 0x68, 0x74,
	0x6e, 0x69, 0x6e, 0x67, 0x1a, 0x1c, 0x67, 0x6f, 0x6f, 0x67, 0x6c, 0x65, 0x2f, 0x61, 0x70, 0x69,
	0x2f, 0x61, 0x6e, 0x6e, 0x6f, 0x74, 0x61, 0x74, 0x69, 0x6f, 0x6e, 0x73, 0x2e, 0x70, 0x72, 0x6f,
	0x74, 0x6f, 0x1a, 0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x63, 0x2d, 0x67, 0x65, 0x6e, 0x2d, 0x6f,
	0x70, 0x65, 0x6e, 0x61, 0x70, 0x69, 0x76, 0x32, 0x2f, 0x6f, 0x70, 0x74, 0x69, 0x6f, 0x6e, 0x73,
	0x2f, 0x61, 0x6e, 0x6e, 0x6f, 0x74, 0x61, 0x74, 0x69, 0x6f, 0x6e, 0x73, 0x2e, 0x70, 0x72, 0x6f,
	0x74, 0x6f, 0x22, 0x14, 0x0a, 0x12, 0x47, 0x65, 0x74, 0x43, 0x68, 0x61, 0x6e, 0x6e, 0x65, 0x6c,
	0x73, 0x52, 0x65, 0x71, 0x75, 0x65, 0x73, 0x74, 0x22, 0x27, 0x0a, 0x13, 0x47, 0x65, 0x74, 0x43,
	0x68, 0x61, 0x6e, 0x6e, 0x65, 0x6c, 0x73, 0x52, 0x65, 0x73, 0x70, 0x6f, 0x6e, 0x73, 0x65, 0x12,
	0x10, 0x0a, 0x03, 0x61, 0x6d, 0x74, 0x18, 0x01, 0x20, 0x01, 0x28, 0x03, 0x52, 0x03, 0x61, 0x6d,
	0x74, 0x22, 0x15, 0x0a, 0x13, 0x4c, 0x69, 0x73, 0x74, 0x50, 0x61, 0x79, 0x6d, 0x65, 0x6e, 0x74,
	0x73, 0x52, 0x65, 0x71, 0x75, 0x65, 0x73, 0x74, 0x22, 0x32, 0x0a, 0x14, 0x4c, 0x69, 0x73, 0x74,
	0x50, 0x61, 0x79, 0x6d, 0x65, 0x6e, 0x74, 0x73, 0x52, 0x65, 0x73, 0x70, 0x6f, 0x6e, 0x73, 0x65,
	0x12, 0x1a, 0x0a, 0x08, 0x70, 0x61, 0x79, 0x6d, 0x65, 0x6e, 0x74, 0x73, 0x18, 0x01, 0x20, 0x01,
	0x28, 0x09, 0x52, 0x08, 0x70, 0x61, 0x79, 0x6d, 0x65, 0x6e, 0x74, 0x73, 0x22, 0x15, 0x0a, 0x13,
	0x4c, 0x69, 0x73, 0x74, 0x49, 0x6e, 0x76, 0x6f, 0x69, 0x63, 0x65, 0x73, 0x52, 0x65, 0x71, 0x75,
	0x65, 0x73, 0x74, 0x22, 0x32, 0x0a, 0x14, 0x4c, 0x69, 0x73, 0x74, 0x49, 0x6e, 0x76, 0x6f, 0x69,
	0x63, 0x65, 0x73, 0x52, 0x65, 0x73, 0x70, 0x6f, 0x6e, 0x73, 0x65, 0x12, 0x1a, 0x0a, 0x08, 0x69,
	0x6e, 0x76, 0x6f, 0x69, 0x63, 0x65, 0x73, 0x18, 0x01, 0x20, 0x01, 0x28, 0x09, 0x52, 0x08, 0x69,
	0x6e, 0x76, 0x6f, 0x69, 0x63, 0x65, 0x73, 0x22, 0x44, 0x0a, 0x16, 0x47, 0x65, 0x6e, 0x65, 0x72,
	0x61, 0x74, 0x65, 0x49, 0x6e, 0x76, 0x6f, 0x69, 0x63, 0x65, 0x52, 0x65, 0x71, 0x75, 0x65, 0x73,
	0x74, 0x12, 0x16, 0x0a, 0x06, 0x61, 0x6d, 0x6f, 0x75, 0x6e, 0x74, 0x18, 0x01, 0x20, 0x01, 0x28,
	0x03, 0x52, 0x06, 0x61, 0x6d, 0x6f, 0x75, 0x6e, 0x74, 0x12, 0x12, 0x0a, 0x04, 0x6d, 0x65, 0x6d,
	0x6f, 0x18, 0x02, 0x20, 0x01, 0x28, 0x09, 0x52, 0x04, 0x6d, 0x65, 0x6d, 0x6f, 0x22, 0x33, 0x0a,
	0x17, 0x47, 0x65, 0x6e, 0x65, 0x72, 0x61, 0x74, 0x65, 0x49, 0x6e, 0x76, 0x6f, 0x69, 0x63, 0x65,
	0x52, 0x65, 0x73, 0x70, 0x6f, 0x6e, 0x73, 0x65, 0x12, 0x18, 0x0a, 0x07, 0x69, 0x6e, 0x76, 0x6f,
	0x69, 0x63, 0x65, 0x18, 0x01, 0x20, 0x01, 0x28, 0x09, 0x52, 0x07, 0x69, 0x6e, 0x76, 0x6f, 0x69,
	0x63, 0x65, 0x22, 0x2d, 0x0a, 0x11, 0x50, 0x61, 0x79, 0x49, 0x6e, 0x76, 0x6f, 0x69, 0x63, 0x65,
	0x52, 0x65, 0x71, 0x75, 0x65, 0x73, 0x74, 0x12, 0x18, 0x0a, 0x07, 0x69, 0x6e, 0x76, 0x6f, 0x69,
	0x63, 0x65, 0x18, 0x01, 0x20, 0x01, 0x28, 0x09, 0x52, 0x07, 0x69, 0x6e, 0x76, 0x6f, 0x69, 0x63,
	0x65, 0x22, 0x30, 0x0a, 0x12, 0x50, 0x61, 0x79, 0x49, 0x6e, 0x76, 0x6f, 0x69, 0x63, 0x65, 0x52,
	0x65, 0x73, 0x70, 0x6f, 0x6e, 0x73, 0x65, 0x12, 0x1a, 0x0a, 0x08, 0x70, 0x72, 0x65, 0x69, 0x6d,
	0x61, 0x67, 0x65, 0x18, 0x01, 0x20, 0x01, 0x28, 0x09, 0x52, 0x08, 0x70, 0x72, 0x65, 0x69, 0x6d,
	0x61, 0x67, 0x65, 0x22, 0x2f, 0x0a, 0x13, 0x43, 0x68, 0x65, 0x63, 0x6b, 0x49, 0x6e, 0x76, 0x6f,
	0x69, 0x63, 0x65, 0x52, 0x65, 0x71, 0x75, 0x65, 0x73, 0x74, 0x12, 0x18, 0x0a, 0x07, 0x69, 0x6e,
	0x76, 0x6f, 0x69, 0x63, 0x65, 0x18, 0x01, 0x20, 0x01, 0x28, 0x09, 0x52, 0x07, 0x69, 0x6e, 0x76,
	0x6f, 0x69, 0x63, 0x65, 0x22, 0x2a, 0x0a, 0x14, 0x43, 0x68, 0x65, 0x63, 0x6b, 0x49, 0x6e, 0x76,
	0x6f, 0x69, 0x63, 0x65, 0x52, 0x65, 0x73, 0x70, 0x6f, 0x6e, 0x73, 0x65, 0x12, 0x12, 0x0a, 0x04,
	0x70, 0x61, 0x69, 0x64, 0x18, 0x01, 0x20, 0x01, 0x28, 0x08, 0x52, 0x04, 0x70, 0x61, 0x69, 0x64,
	0x32, 0xdc, 0x05, 0x0a, 0x09, 0x4c, 0x69, 0x67, 0x68, 0x74, 0x6e, 0x69, 0x6e, 0x67, 0x12, 0x72,
	0x0a, 0x0b, 0x47, 0x65, 0x74, 0x43, 0x68, 0x61, 0x6e, 0x6e, 0x65, 0x6c, 0x73, 0x12, 0x1d, 0x2e,
	0x6c, 0x69, 0x67, 0x68, 0x74, 0x6e, 0x69, 0x6e, 0x67, 0x2e, 0x47, 0x65, 0x74, 0x43, 0x68, 0x61,
	0x6e, 0x6e, 0x65, 0x6c, 0x73, 0x52, 0x65, 0x71, 0x75, 0x65, 0x73, 0x74, 0x1a, 0x1e, 0x2e, 0x6c,
	0x69, 0x67, 0x68, 0x74, 0x6e, 0x69, 0x6e, 0x67, 0x2e, 0x47, 0x65, 0x74, 0x43, 0x68, 0x61, 0x6e,
	0x6e, 0x65, 0x6c, 0x73, 0x52, 0x65, 0x73, 0x70, 0x6f, 0x6e, 0x73, 0x65, 0x22, 0x24, 0x82, 0xd3,
	0xe4, 0x93, 0x02, 0x1e, 0x22, 0x19, 0x2f, 0x76, 0x31, 0x2f, 0x6c, 0x69, 0x67, 0x68, 0x74, 0x6e,
	0x69, 0x6e, 0x67, 0x2f, 0x67, 0x65, 0x74, 0x63, 0x68, 0x61, 0x6e, 0x6e, 0x65, 0x6c, 0x73, 0x3a,
	0x01, 0x2a, 0x12, 0x76, 0x0a, 0x0c, 0x4c, 0x69, 0x73, 0x74, 0x50, 0x61, 0x79, 0x6d, 0x65, 0x6e,
	0x74, 0x73, 0x12, 0x1e, 0x2e, 0x6c, 0x69, 0x67, 0x68, 0x74, 0x6e, 0x69, 0x6e, 0x67, 0x2e, 0x4c,
	0x69, 0x73, 0x74, 0x50, 0x61, 0x79, 0x6d, 0x65, 0x6e, 0x74, 0x73, 0x52, 0x65, 0x71, 0x75, 0x65,
	0x73, 0x74, 0x1a, 0x1f, 0x2e, 0x6c, 0x69, 0x67, 0x68, 0x74, 0x6e, 0x69, 0x6e, 0x67, 0x2e, 0x4c,
	0x69, 0x73, 0x74, 0x50, 0x61, 0x79, 0x6d, 0x65, 0x6e, 0x74, 0x73, 0x52, 0x65, 0x73, 0x70, 0x6f,
	0x6e, 0x73, 0x65, 0x22, 0x25, 0x82, 0xd3, 0xe4, 0x93, 0x02, 0x1f, 0x22, 0x1a, 0x2f, 0x76, 0x31,
	0x2f, 0x6c, 0x69, 0x67, 0x68, 0x74, 0x6e, 0x69, 0x6e, 0x67, 0x2f, 0x6c, 0x69, 0x73, 0x74, 0x70,
	0x61, 0x79, 0x6d, 0x65, 0x6e, 0x74, 0x73, 0x3a, 0x01, 0x2a, 0x12, 0x76, 0x0a, 0x0c, 0x4c, 0x69,
	0x73, 0x74, 0x49, 0x6e, 0x76, 0x6f, 0x69, 0x63, 0x65, 0x73, 0x12, 0x1e, 0x2e, 0x6c, 0x69, 0x67,
	0x68, 0x74, 0x6e, 0x69, 0x6e, 0x67, 0x2e, 0x4c, 0x69, 0x73, 0x74, 0x49, 0x6e, 0x76, 0x6f, 0x69,
	0x63, 0x65, 0x73, 0x52, 0x65, 0x71, 0x75, 0x65, 0x73, 0x74, 0x1a, 0x1f, 0x2e, 0x6c, 0x69, 0x67,
	0x68, 0x74, 0x6e, 0x69, 0x6e, 0x67, 0x2e, 0x4c, 0x69, 0x73, 0x74, 0x49, 0x6e, 0x76, 0x6f, 0x69,
	0x63, 0x65, 0x73, 0x52, 0x65, 0x73, 0x70, 0x6f, 0x6e, 0x73, 0x65, 0x22, 0x25, 0x82, 0xd3, 0xe4,
	0x93, 0x02, 0x1f, 0x22, 0x1a, 0x2f, 0x76, 0x31, 0x2f, 0x6c, 0x69, 0x67, 0x68, 0x74, 0x6e, 0x69,
	0x6e, 0x67, 0x2f, 0x6c, 0x69, 0x73, 0x74, 0x69, 0x6e, 0x76, 0x6f, 0x69, 0x63, 0x65, 0x73, 0x3a,
	0x01, 0x2a, 0x12, 0x82, 0x01, 0x0a, 0x0f, 0x47, 0x65, 0x6e, 0x65, 0x72, 0x61, 0x74, 0x65, 0x49,
	0x6e, 0x76, 0x6f, 0x69, 0x63, 0x65, 0x12, 0x21, 0x2e, 0x6c, 0x69, 0x67, 0x68, 0x74, 0x6e, 0x69,
	0x6e, 0x67, 0x2e, 0x47, 0x65, 0x6e, 0x65, 0x72, 0x61, 0x74, 0x65, 0x49, 0x6e, 0x76, 0x6f, 0x69,
	0x63, 0x65, 0x52, 0x65, 0x71, 0x75, 0x65, 0x73, 0x74, 0x1a, 0x22, 0x2e, 0x6c, 0x69, 0x67, 0x68,
	0x74, 0x6e, 0x69, 0x6e, 0x67, 0x2e, 0x47, 0x65, 0x6e, 0x65, 0x72, 0x61, 0x74, 0x65, 0x49, 0x6e,
	0x76, 0x6f, 0x69, 0x63, 0x65, 0x52, 0x65, 0x73, 0x70, 0x6f, 0x6e, 0x73, 0x65, 0x22, 0x28, 0x82,
	0xd3, 0xe4, 0x93, 0x02, 0x22, 0x22, 0x1d, 0x2f, 0x76, 0x31, 0x2f, 0x6c, 0x69, 0x67, 0x68, 0x74,
	0x6e, 0x69, 0x6e, 0x67, 0x2f, 0x67, 0x65, 0x6e, 0x65, 0x72, 0x61, 0x74, 0x65, 0x69, 0x6e, 0x76,
	0x6f, 0x69, 0x63, 0x65, 0x3a, 0x01, 0x2a, 0x12, 0x6e, 0x0a, 0x0a, 0x50, 0x61, 0x79, 0x49, 0x6e,
	0x76, 0x6f, 0x69, 0x63, 0x65, 0x12, 0x1c, 0x2e, 0x6c, 0x69, 0x67, 0x68, 0x74, 0x6e, 0x69, 0x6e,
	0x67, 0x2e, 0x50, 0x61, 0x79, 0x49, 0x6e, 0x76, 0x6f, 0x69, 0x63, 0x65, 0x52, 0x65, 0x71, 0x75,
	0x65, 0x73, 0x74, 0x1a, 0x1d, 0x2e, 0x6c, 0x69, 0x67, 0x68, 0x74, 0x6e, 0x69, 0x6e, 0x67, 0x2e,
	0x50, 0x61, 0x79, 0x49, 0x6e, 0x76, 0x6f, 0x69, 0x63, 0x65, 0x52, 0x65, 0x73, 0x70, 0x6f, 0x6e,
	0x73, 0x65, 0x22, 0x23, 0x82, 0xd3, 0xe4, 0x93, 0x02, 0x1d, 0x22, 0x18, 0x2f, 0x76, 0x31, 0x2f,
	0x6c, 0x69, 0x67, 0x68, 0x74, 0x6e, 0x69, 0x6e, 0x67, 0x2f, 0x70, 0x61, 0x79, 0x69, 0x6e, 0x76,
	0x6f, 0x69, 0x63, 0x65, 0x3a, 0x01, 0x2a, 0x12, 0x76, 0x0a, 0x0c, 0x43, 0x68, 0x65, 0x63, 0x6b,
	0x49, 0x6e, 0x76, 0x6f, 0x69, 0x63, 0x65, 0x12, 0x1e, 0x2e, 0x6c, 0x69, 0x67, 0x68, 0x74, 0x6e,
	0x69, 0x6e, 0x67, 0x2e, 0x43, 0x68, 0x65, 0x63, 0x6b, 0x49, 0x6e, 0x76, 0x6f, 0x69, 0x63, 0x65,
	0x52, 0x65, 0x71, 0x75, 0x65, 0x73, 0x74, 0x1a, 0x1f, 0x2e, 0x6c, 0x69, 0x67, 0x68, 0x74, 0x6e,
	0x69, 0x6e, 0x67, 0x2e, 0x43, 0x68, 0x65, 0x63, 0x6b, 0x49, 0x6e, 0x76, 0x6f, 0x69, 0x63, 0x65,
	0x52, 0x65, 0x73, 0x70, 0x6f, 0x6e, 0x73, 0x65, 0x22, 0x25, 0x82, 0xd3, 0xe4, 0x93, 0x02, 0x1f,
	0x22, 0x1a, 0x2f, 0x76, 0x31, 0x2f, 0x6c, 0x69, 0x67, 0x68, 0x74, 0x6e, 0x69, 0x6e, 0x67, 0x2f,
	0x63, 0x68, 0x65, 0x63, 0x6b, 0x69, 0x6e, 0x76, 0x6f, 0x69, 0x63, 0x65, 0x3a, 0x01, 0x2a, 0x42,
	0xbe, 0x02, 0x5a, 0x26, 0x67, 0x69, 0x74, 0x68, 0x75, 0x62, 0x2e, 0x63, 0x6f, 0x6d, 0x2f, 0x69,
	0x6d, 0x70, 0x65, 0x72, 0x76, 0x69, 0x6f, 0x75, 0x73, 0x61, 0x69, 0x2f, 0x69, 0x6d, 0x70, 0x2d,
	0x64, 0x61, 0x65, 0x6d, 0x6f, 0x6e, 0x2f, 0x67, 0x65, 0x6e, 0x92, 0x41, 0x92, 0x02, 0x12, 0x41,
	0x0a, 0x12, 0x4c, 0x69, 0x67, 0x68, 0x74, 0x6e, 0x69, 0x6e, 0x67, 0x20, 0x53, 0x65, 0x72, 0x76,
	0x69, 0x63, 0x65, 0x73, 0x22, 0x26, 0x0a, 0x0d, 0x49, 0x6d, 0x70, 0x65, 0x72, 0x76, 0x69, 0x6f,
	0x75, 0x73, 0x20, 0x41, 0x49, 0x12, 0x15, 0x68, 0x74, 0x74, 0x70, 0x73, 0x3a, 0x2f, 0x2f, 0x69,
	0x6d, 0x70, 0x65, 0x72, 0x76, 0x69, 0x6f, 0x75, 0x73, 0x2e, 0x61, 0x69, 0x32, 0x03, 0x31, 0x2e,
	0x30, 0x2a, 0x03, 0x01, 0x02, 0x04, 0x32, 0x10, 0x61, 0x70, 0x70, 0x6c, 0x69, 0x63, 0x61, 0x74,
	0x69, 0x6f, 0x6e, 0x2f, 0x6a, 0x73, 0x6f, 0x6e, 0x3a, 0x10, 0x61, 0x70, 0x70, 0x6c, 0x69, 0x63,
	0x61, 0x74, 0x69, 0x6f, 0x6e, 0x2f, 0x6a, 0x73, 0x6f, 0x6e, 0x5a, 0x61, 0x0a, 0x5f, 0x0a, 0x07,
	0x61, 0x70, 0x69, 0x5f, 0x6b, 0x65, 0x79, 0x12, 0x54, 0x08, 0x02, 0x12, 0x35, 0x41, 0x6e, 0x20,
	0x41, 0x50, 0x49, 0x20, 0x6b, 0x65, 0x79, 0x20, 0x67, 0x65, 0x6e, 0x65, 0x72, 0x61, 0x74, 0x65,
	0x64, 0x20, 0x62, 0x79, 0x20, 0x74, 0x68, 0x65, 0x20, 0x64, 0x61, 0x65, 0x6d, 0x6f, 0x6e, 0x20,
	0x66, 0x6f, 0x72, 0x20, 0x61, 0x75, 0x74, 0x68, 0x65, 0x6e, 0x74, 0x69, 0x63, 0x61, 0x74, 0x69,
	0x6f, 0x6e, 0x1a, 0x17, 0x47, 0x72, 0x70, 0x63, 0x2d, 0x4d, 0x65, 0x74, 0x61, 0x64, 0x61, 0x74,
	0x61, 0x2d, 0x58, 0x2d, 0x41, 0x50, 0x49, 0x2d, 0x4b, 0x45, 0x59, 0x20, 0x03, 0x62, 0x0d, 0x0a,
	0x0b, 0x0a, 0x07, 0x61, 0x70, 0x69, 0x5f, 0x6b, 0x65, 0x79, 0x12, 0x00, 0x72, 0x32, 0x0a, 0x14,
	0x44, 0x6f, 0x63, 0x75, 0x6d, 0x65, 0x6e, 0x74, 0x61, 0x74, 0x69, 0x6f, 0x6e, 0x20, 0x6f, 0x6e,
	0x20, 0x49, 0x4d, 0x50, 0x12, 0x1a, 0x68, 0x74, 0x74, 0x70, 0x73, 0x3a, 0x2f, 0x2f, 0x64, 0x6f,
	0x63, 0x73, 0x2e, 0x69, 0x6d, 0x70, 0x65, 0x72, 0x76, 0x69, 0x6f, 0x75, 0x73, 0x2e, 0x61, 0x69,
	0x62, 0x06, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x33,
}

var (
	file_proto_imp_api_lightning_lightning_proto_rawDescOnce sync.Once
	file_proto_imp_api_lightning_lightning_proto_rawDescData = file_proto_imp_api_lightning_lightning_proto_rawDesc
)

func file_proto_imp_api_lightning_lightning_proto_rawDescGZIP() []byte {
	file_proto_imp_api_lightning_lightning_proto_rawDescOnce.Do(func() {
		file_proto_imp_api_lightning_lightning_proto_rawDescData = protoimpl.X.CompressGZIP(file_proto_imp_api_lightning_lightning_proto_rawDescData)
	})
	return file_proto_imp_api_lightning_lightning_proto_rawDescData
}

var file_proto_imp_api_lightning_lightning_proto_msgTypes = make([]protoimpl.MessageInfo, 12)
var file_proto_imp_api_lightning_lightning_proto_goTypes = []interface{}{
	(*GetChannelsRequest)(nil),      // 0: lightning.GetChannelsRequest
	(*GetChannelsResponse)(nil),     // 1: lightning.GetChannelsResponse
	(*ListPaymentsRequest)(nil),     // 2: lightning.ListPaymentsRequest
	(*ListPaymentsResponse)(nil),    // 3: lightning.ListPaymentsResponse
	(*ListInvoicesRequest)(nil),     // 4: lightning.ListInvoicesRequest
	(*ListInvoicesResponse)(nil),    // 5: lightning.ListInvoicesResponse
	(*GenerateInvoiceRequest)(nil),  // 6: lightning.GenerateInvoiceRequest
	(*GenerateInvoiceResponse)(nil), // 7: lightning.GenerateInvoiceResponse
	(*PayInvoiceRequest)(nil),       // 8: lightning.PayInvoiceRequest
	(*PayInvoiceResponse)(nil),      // 9: lightning.PayInvoiceResponse
	(*CheckInvoiceRequest)(nil),     // 10: lightning.CheckInvoiceRequest
	(*CheckInvoiceResponse)(nil),    // 11: lightning.CheckInvoiceResponse
}
var file_proto_imp_api_lightning_lightning_proto_depIdxs = []int32{
	0,  // 0: lightning.Lightning.GetChannels:input_type -> lightning.GetChannelsRequest
	2,  // 1: lightning.Lightning.ListPayments:input_type -> lightning.ListPaymentsRequest
	4,  // 2: lightning.Lightning.ListInvoices:input_type -> lightning.ListInvoicesRequest
	6,  // 3: lightning.Lightning.GenerateInvoice:input_type -> lightning.GenerateInvoiceRequest
	8,  // 4: lightning.Lightning.PayInvoice:input_type -> lightning.PayInvoiceRequest
	10, // 5: lightning.Lightning.CheckInvoice:input_type -> lightning.CheckInvoiceRequest
	1,  // 6: lightning.Lightning.GetChannels:output_type -> lightning.GetChannelsResponse
	3,  // 7: lightning.Lightning.ListPayments:output_type -> lightning.ListPaymentsResponse
	5,  // 8: lightning.Lightning.ListInvoices:output_type -> lightning.ListInvoicesResponse
	7,  // 9: lightning.Lightning.GenerateInvoice:output_type -> lightning.GenerateInvoiceResponse
	9,  // 10: lightning.Lightning.PayInvoice:output_type -> lightning.PayInvoiceResponse
	11, // 11: lightning.Lightning.CheckInvoice:output_type -> lightning.CheckInvoiceResponse
	6,  // [6:12] is the sub-list for method output_type
	0,  // [0:6] is the sub-list for method input_type
	0,  // [0:0] is the sub-list for extension type_name
	0,  // [0:0] is the sub-list for extension extendee
	0,  // [0:0] is the sub-list for field type_name
}

func init() { file_proto_imp_api_lightning_lightning_proto_init() }
func file_proto_imp_api_lightning_lightning_proto_init() {
	if File_proto_imp_api_lightning_lightning_proto != nil {
		return
	}
	if !protoimpl.UnsafeEnabled {
		file_proto_imp_api_lightning_lightning_proto_msgTypes[0].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*GetChannelsRequest); i {
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
		file_proto_imp_api_lightning_lightning_proto_msgTypes[1].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*GetChannelsResponse); i {
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
		file_proto_imp_api_lightning_lightning_proto_msgTypes[2].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*ListPaymentsRequest); i {
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
		file_proto_imp_api_lightning_lightning_proto_msgTypes[3].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*ListPaymentsResponse); i {
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
		file_proto_imp_api_lightning_lightning_proto_msgTypes[4].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*ListInvoicesRequest); i {
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
		file_proto_imp_api_lightning_lightning_proto_msgTypes[5].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*ListInvoicesResponse); i {
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
		file_proto_imp_api_lightning_lightning_proto_msgTypes[6].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*GenerateInvoiceRequest); i {
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
		file_proto_imp_api_lightning_lightning_proto_msgTypes[7].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*GenerateInvoiceResponse); i {
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
		file_proto_imp_api_lightning_lightning_proto_msgTypes[8].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*PayInvoiceRequest); i {
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
		file_proto_imp_api_lightning_lightning_proto_msgTypes[9].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*PayInvoiceResponse); i {
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
		file_proto_imp_api_lightning_lightning_proto_msgTypes[10].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*CheckInvoiceRequest); i {
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
		file_proto_imp_api_lightning_lightning_proto_msgTypes[11].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*CheckInvoiceResponse); i {
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
			RawDescriptor: file_proto_imp_api_lightning_lightning_proto_rawDesc,
			NumEnums:      0,
			NumMessages:   12,
			NumExtensions: 0,
			NumServices:   1,
		},
		GoTypes:           file_proto_imp_api_lightning_lightning_proto_goTypes,
		DependencyIndexes: file_proto_imp_api_lightning_lightning_proto_depIdxs,
		MessageInfos:      file_proto_imp_api_lightning_lightning_proto_msgTypes,
	}.Build()
	File_proto_imp_api_lightning_lightning_proto = out.File
	file_proto_imp_api_lightning_lightning_proto_rawDesc = nil
	file_proto_imp_api_lightning_lightning_proto_goTypes = nil
	file_proto_imp_api_lightning_lightning_proto_depIdxs = nil
}
