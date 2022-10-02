// Code generated by protoc-gen-go-grpc. DO NOT EDIT.

package gen

import (
	context "context"
	grpc "google.golang.org/grpc"
	codes "google.golang.org/grpc/codes"
	status "google.golang.org/grpc/status"
)

// This is a compile-time assertion to ensure that this generated file
// is compatible with the grpc package it is being compiled against.
// Requires gRPC-Go v1.32.0 or later.
const _ = grpc.SupportPackageIsVersion7

// MessagingClient is the client API for Messaging service.
//
// For semantics around ctx use and closing/ending streaming RPCs, please refer to https://pkg.go.dev/google.golang.org/grpc/?tab=doc#ClientConn.NewStream.
type MessagingClient interface {
	//*
	// SendMessage sends a text message to another node.
	SendMessage(ctx context.Context, in *SendMessageRequest, opts ...grpc.CallOption) (*SendMessageResponse, error)
	//*
	// SendMessageV2 sends a byte-encoded json DIDComm message to another DID.
	SendMessageV2(ctx context.Context, in *SendMessageV2Request, opts ...grpc.CallOption) (*SendMessageV2Response, error)
	//*
	// SaveMessageV2 saves a byte-encoded json DIDComm message locally.
	SaveMessageV2(ctx context.Context, in *SaveMessageV2Request, opts ...grpc.CallOption) (*SaveMessageV2Response, error)
	//*
	// GetMessageList gets messages from the daemon.
	GetMessageList(ctx context.Context, in *GetMessageListRequest, opts ...grpc.CallOption) (*GetMessageListResponse, error)
	//*
	// DeleteMessage will delete a specific message.
	DeleteMessage(ctx context.Context, in *DeleteMessageRequest, opts ...grpc.CallOption) (*DeleteMessageResponse, error)
	//*
	// DeleteGroupMessage will delete all messages from the same group.
	DeleteGroupMessage(ctx context.Context, in *DeleteGroupMessageRequest, opts ...grpc.CallOption) (*DeleteGroupMessageResponse, error)
}

type messagingClient struct {
	cc grpc.ClientConnInterface
}

func NewMessagingClient(cc grpc.ClientConnInterface) MessagingClient {
	return &messagingClient{cc}
}

func (c *messagingClient) SendMessage(ctx context.Context, in *SendMessageRequest, opts ...grpc.CallOption) (*SendMessageResponse, error) {
	out := new(SendMessageResponse)
	err := c.cc.Invoke(ctx, "/messaging.Messaging/SendMessage", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *messagingClient) SendMessageV2(ctx context.Context, in *SendMessageV2Request, opts ...grpc.CallOption) (*SendMessageV2Response, error) {
	out := new(SendMessageV2Response)
	err := c.cc.Invoke(ctx, "/messaging.Messaging/SendMessageV2", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *messagingClient) SaveMessageV2(ctx context.Context, in *SaveMessageV2Request, opts ...grpc.CallOption) (*SaveMessageV2Response, error) {
	out := new(SaveMessageV2Response)
	err := c.cc.Invoke(ctx, "/messaging.Messaging/SaveMessageV2", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *messagingClient) GetMessageList(ctx context.Context, in *GetMessageListRequest, opts ...grpc.CallOption) (*GetMessageListResponse, error) {
	out := new(GetMessageListResponse)
	err := c.cc.Invoke(ctx, "/messaging.Messaging/GetMessageList", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *messagingClient) DeleteMessage(ctx context.Context, in *DeleteMessageRequest, opts ...grpc.CallOption) (*DeleteMessageResponse, error) {
	out := new(DeleteMessageResponse)
	err := c.cc.Invoke(ctx, "/messaging.Messaging/DeleteMessage", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *messagingClient) DeleteGroupMessage(ctx context.Context, in *DeleteGroupMessageRequest, opts ...grpc.CallOption) (*DeleteGroupMessageResponse, error) {
	out := new(DeleteGroupMessageResponse)
	err := c.cc.Invoke(ctx, "/messaging.Messaging/DeleteGroupMessage", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

// MessagingServer is the server API for Messaging service.
// All implementations must embed UnimplementedMessagingServer
// for forward compatibility
type MessagingServer interface {
	//*
	// SendMessage sends a text message to another node.
	SendMessage(context.Context, *SendMessageRequest) (*SendMessageResponse, error)
	//*
	// SendMessageV2 sends a byte-encoded json DIDComm message to another DID.
	SendMessageV2(context.Context, *SendMessageV2Request) (*SendMessageV2Response, error)
	//*
	// SaveMessageV2 saves a byte-encoded json DIDComm message locally.
	SaveMessageV2(context.Context, *SaveMessageV2Request) (*SaveMessageV2Response, error)
	//*
	// GetMessageList gets messages from the daemon.
	GetMessageList(context.Context, *GetMessageListRequest) (*GetMessageListResponse, error)
	//*
	// DeleteMessage will delete a specific message.
	DeleteMessage(context.Context, *DeleteMessageRequest) (*DeleteMessageResponse, error)
	//*
	// DeleteGroupMessage will delete all messages from the same group.
	DeleteGroupMessage(context.Context, *DeleteGroupMessageRequest) (*DeleteGroupMessageResponse, error)
	mustEmbedUnimplementedMessagingServer()
}

// UnimplementedMessagingServer must be embedded to have forward compatible implementations.
type UnimplementedMessagingServer struct {
}

func (UnimplementedMessagingServer) SendMessage(context.Context, *SendMessageRequest) (*SendMessageResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method SendMessage not implemented")
}
func (UnimplementedMessagingServer) SendMessageV2(context.Context, *SendMessageV2Request) (*SendMessageV2Response, error) {
	return nil, status.Errorf(codes.Unimplemented, "method SendMessageV2 not implemented")
}
func (UnimplementedMessagingServer) SaveMessageV2(context.Context, *SaveMessageV2Request) (*SaveMessageV2Response, error) {
	return nil, status.Errorf(codes.Unimplemented, "method SaveMessageV2 not implemented")
}
func (UnimplementedMessagingServer) GetMessageList(context.Context, *GetMessageListRequest) (*GetMessageListResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method GetMessageList not implemented")
}
func (UnimplementedMessagingServer) DeleteMessage(context.Context, *DeleteMessageRequest) (*DeleteMessageResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method DeleteMessage not implemented")
}
func (UnimplementedMessagingServer) DeleteGroupMessage(context.Context, *DeleteGroupMessageRequest) (*DeleteGroupMessageResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method DeleteGroupMessage not implemented")
}
func (UnimplementedMessagingServer) mustEmbedUnimplementedMessagingServer() {}

// UnsafeMessagingServer may be embedded to opt out of forward compatibility for this service.
// Use of this interface is not recommended, as added methods to MessagingServer will
// result in compilation errors.
type UnsafeMessagingServer interface {
	mustEmbedUnimplementedMessagingServer()
}

func RegisterMessagingServer(s grpc.ServiceRegistrar, srv MessagingServer) {
	s.RegisterService(&Messaging_ServiceDesc, srv)
}

func _Messaging_SendMessage_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(SendMessageRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(MessagingServer).SendMessage(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/messaging.Messaging/SendMessage",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(MessagingServer).SendMessage(ctx, req.(*SendMessageRequest))
	}
	return interceptor(ctx, in, info, handler)
}

func _Messaging_SendMessageV2_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(SendMessageV2Request)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(MessagingServer).SendMessageV2(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/messaging.Messaging/SendMessageV2",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(MessagingServer).SendMessageV2(ctx, req.(*SendMessageV2Request))
	}
	return interceptor(ctx, in, info, handler)
}

func _Messaging_SaveMessageV2_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(SaveMessageV2Request)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(MessagingServer).SaveMessageV2(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/messaging.Messaging/SaveMessageV2",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(MessagingServer).SaveMessageV2(ctx, req.(*SaveMessageV2Request))
	}
	return interceptor(ctx, in, info, handler)
}

func _Messaging_GetMessageList_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(GetMessageListRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(MessagingServer).GetMessageList(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/messaging.Messaging/GetMessageList",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(MessagingServer).GetMessageList(ctx, req.(*GetMessageListRequest))
	}
	return interceptor(ctx, in, info, handler)
}

func _Messaging_DeleteMessage_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(DeleteMessageRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(MessagingServer).DeleteMessage(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/messaging.Messaging/DeleteMessage",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(MessagingServer).DeleteMessage(ctx, req.(*DeleteMessageRequest))
	}
	return interceptor(ctx, in, info, handler)
}

func _Messaging_DeleteGroupMessage_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(DeleteGroupMessageRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(MessagingServer).DeleteGroupMessage(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/messaging.Messaging/DeleteGroupMessage",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(MessagingServer).DeleteGroupMessage(ctx, req.(*DeleteGroupMessageRequest))
	}
	return interceptor(ctx, in, info, handler)
}

// Messaging_ServiceDesc is the grpc.ServiceDesc for Messaging service.
// It's only intended for direct use with grpc.RegisterService,
// and not to be introspected or modified (even as a copy)
var Messaging_ServiceDesc = grpc.ServiceDesc{
	ServiceName: "messaging.Messaging",
	HandlerType: (*MessagingServer)(nil),
	Methods: []grpc.MethodDesc{
		{
			MethodName: "SendMessage",
			Handler:    _Messaging_SendMessage_Handler,
		},
		{
			MethodName: "SendMessageV2",
			Handler:    _Messaging_SendMessageV2_Handler,
		},
		{
			MethodName: "SaveMessageV2",
			Handler:    _Messaging_SaveMessageV2_Handler,
		},
		{
			MethodName: "GetMessageList",
			Handler:    _Messaging_GetMessageList_Handler,
		},
		{
			MethodName: "DeleteMessage",
			Handler:    _Messaging_DeleteMessage_Handler,
		},
		{
			MethodName: "DeleteGroupMessage",
			Handler:    _Messaging_DeleteGroupMessage_Handler,
		},
	},
	Streams:  []grpc.StreamDesc{},
	Metadata: "proto/imp/api/messaging/messaging.proto",
}
