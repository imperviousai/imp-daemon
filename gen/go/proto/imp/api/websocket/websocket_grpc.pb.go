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

// WebsocketClient is the client API for Websocket service.
//
// For semantics around ctx use and closing/ending streaming RPCs, please refer to https://pkg.go.dev/google.golang.org/grpc/?tab=doc#ClientConn.NewStream.
type WebsocketClient interface {
	//*
	// Subscribe opens up a stream/websocket to receive all messages received on your Impervious node.
	Subscribe(ctx context.Context, in *SubscribeRequest, opts ...grpc.CallOption) (Websocket_SubscribeClient, error)
}

type websocketClient struct {
	cc grpc.ClientConnInterface
}

func NewWebsocketClient(cc grpc.ClientConnInterface) WebsocketClient {
	return &websocketClient{cc}
}

func (c *websocketClient) Subscribe(ctx context.Context, in *SubscribeRequest, opts ...grpc.CallOption) (Websocket_SubscribeClient, error) {
	stream, err := c.cc.NewStream(ctx, &Websocket_ServiceDesc.Streams[0], "/websocket.Websocket/Subscribe", opts...)
	if err != nil {
		return nil, err
	}
	x := &websocketSubscribeClient{stream}
	if err := x.ClientStream.SendMsg(in); err != nil {
		return nil, err
	}
	if err := x.ClientStream.CloseSend(); err != nil {
		return nil, err
	}
	return x, nil
}

type Websocket_SubscribeClient interface {
	Recv() (*SubscribeResponse, error)
	grpc.ClientStream
}

type websocketSubscribeClient struct {
	grpc.ClientStream
}

func (x *websocketSubscribeClient) Recv() (*SubscribeResponse, error) {
	m := new(SubscribeResponse)
	if err := x.ClientStream.RecvMsg(m); err != nil {
		return nil, err
	}
	return m, nil
}

// WebsocketServer is the server API for Websocket service.
// All implementations must embed UnimplementedWebsocketServer
// for forward compatibility
type WebsocketServer interface {
	//*
	// Subscribe opens up a stream/websocket to receive all messages received on your Impervious node.
	Subscribe(*SubscribeRequest, Websocket_SubscribeServer) error
	mustEmbedUnimplementedWebsocketServer()
}

// UnimplementedWebsocketServer must be embedded to have forward compatible implementations.
type UnimplementedWebsocketServer struct {
}

func (UnimplementedWebsocketServer) Subscribe(*SubscribeRequest, Websocket_SubscribeServer) error {
	return status.Errorf(codes.Unimplemented, "method Subscribe not implemented")
}
func (UnimplementedWebsocketServer) mustEmbedUnimplementedWebsocketServer() {}

// UnsafeWebsocketServer may be embedded to opt out of forward compatibility for this service.
// Use of this interface is not recommended, as added methods to WebsocketServer will
// result in compilation errors.
type UnsafeWebsocketServer interface {
	mustEmbedUnimplementedWebsocketServer()
}

func RegisterWebsocketServer(s grpc.ServiceRegistrar, srv WebsocketServer) {
	s.RegisterService(&Websocket_ServiceDesc, srv)
}

func _Websocket_Subscribe_Handler(srv interface{}, stream grpc.ServerStream) error {
	m := new(SubscribeRequest)
	if err := stream.RecvMsg(m); err != nil {
		return err
	}
	return srv.(WebsocketServer).Subscribe(m, &websocketSubscribeServer{stream})
}

type Websocket_SubscribeServer interface {
	Send(*SubscribeResponse) error
	grpc.ServerStream
}

type websocketSubscribeServer struct {
	grpc.ServerStream
}

func (x *websocketSubscribeServer) Send(m *SubscribeResponse) error {
	return x.ServerStream.SendMsg(m)
}

// Websocket_ServiceDesc is the grpc.ServiceDesc for Websocket service.
// It's only intended for direct use with grpc.RegisterService,
// and not to be introspected or modified (even as a copy)
var Websocket_ServiceDesc = grpc.ServiceDesc{
	ServiceName: "websocket.Websocket",
	HandlerType: (*WebsocketServer)(nil),
	Methods:     []grpc.MethodDesc{},
	Streams: []grpc.StreamDesc{
		{
			StreamName:    "Subscribe",
			Handler:       _Websocket_Subscribe_Handler,
			ServerStreams: true,
		},
	},
	Metadata: "proto/imp/api/websocket/websocket.proto",
}
