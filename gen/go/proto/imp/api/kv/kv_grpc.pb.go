// Code generated by protoc-gen-go-grpc. DO NOT EDIT.
// versions:
// - protoc-gen-go-grpc v1.2.0
// - protoc             v3.20.1
// source: proto/imp/api/kv/kv.proto

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

// KVClient is the client API for KV service.
//
// For semantics around ctx use and closing/ending streaming RPCs, please refer to https://pkg.go.dev/google.golang.org/grpc/?tab=doc#ClientConn.NewStream.
type KVClient interface {
	// *
	// GetKey will retrieve a key
	GetKey(ctx context.Context, in *GetKeyRequest, opts ...grpc.CallOption) (*GetKeyResponse, error)
	// *
	// SetKey will set a key
	SetKey(ctx context.Context, in *SetKeyRequest, opts ...grpc.CallOption) (*SetKeyResponse, error)
	// *
	// DelKey will delete a key
	DelKey(ctx context.Context, in *DelKeyRequest, opts ...grpc.CallOption) (*DelKeyResponse, error)
}

type kVClient struct {
	cc grpc.ClientConnInterface
}

func NewKVClient(cc grpc.ClientConnInterface) KVClient {
	return &kVClient{cc}
}

func (c *kVClient) GetKey(ctx context.Context, in *GetKeyRequest, opts ...grpc.CallOption) (*GetKeyResponse, error) {
	out := new(GetKeyResponse)
	err := c.cc.Invoke(ctx, "/kv.KV/GetKey", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *kVClient) SetKey(ctx context.Context, in *SetKeyRequest, opts ...grpc.CallOption) (*SetKeyResponse, error) {
	out := new(SetKeyResponse)
	err := c.cc.Invoke(ctx, "/kv.KV/SetKey", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *kVClient) DelKey(ctx context.Context, in *DelKeyRequest, opts ...grpc.CallOption) (*DelKeyResponse, error) {
	out := new(DelKeyResponse)
	err := c.cc.Invoke(ctx, "/kv.KV/DelKey", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

// KVServer is the server API for KV service.
// All implementations must embed UnimplementedKVServer
// for forward compatibility
type KVServer interface {
	// *
	// GetKey will retrieve a key
	GetKey(context.Context, *GetKeyRequest) (*GetKeyResponse, error)
	// *
	// SetKey will set a key
	SetKey(context.Context, *SetKeyRequest) (*SetKeyResponse, error)
	// *
	// DelKey will delete a key
	DelKey(context.Context, *DelKeyRequest) (*DelKeyResponse, error)
	mustEmbedUnimplementedKVServer()
}

// UnimplementedKVServer must be embedded to have forward compatible implementations.
type UnimplementedKVServer struct {
}

func (UnimplementedKVServer) GetKey(context.Context, *GetKeyRequest) (*GetKeyResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method GetKey not implemented")
}
func (UnimplementedKVServer) SetKey(context.Context, *SetKeyRequest) (*SetKeyResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method SetKey not implemented")
}
func (UnimplementedKVServer) DelKey(context.Context, *DelKeyRequest) (*DelKeyResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method DelKey not implemented")
}
func (UnimplementedKVServer) mustEmbedUnimplementedKVServer() {}

// UnsafeKVServer may be embedded to opt out of forward compatibility for this service.
// Use of this interface is not recommended, as added methods to KVServer will
// result in compilation errors.
type UnsafeKVServer interface {
	mustEmbedUnimplementedKVServer()
}

func RegisterKVServer(s grpc.ServiceRegistrar, srv KVServer) {
	s.RegisterService(&KV_ServiceDesc, srv)
}

func _KV_GetKey_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(GetKeyRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(KVServer).GetKey(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/kv.KV/GetKey",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(KVServer).GetKey(ctx, req.(*GetKeyRequest))
	}
	return interceptor(ctx, in, info, handler)
}

func _KV_SetKey_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(SetKeyRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(KVServer).SetKey(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/kv.KV/SetKey",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(KVServer).SetKey(ctx, req.(*SetKeyRequest))
	}
	return interceptor(ctx, in, info, handler)
}

func _KV_DelKey_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(DelKeyRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(KVServer).DelKey(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/kv.KV/DelKey",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(KVServer).DelKey(ctx, req.(*DelKeyRequest))
	}
	return interceptor(ctx, in, info, handler)
}

// KV_ServiceDesc is the grpc.ServiceDesc for KV service.
// It's only intended for direct use with grpc.RegisterService,
// and not to be introspected or modified (even as a copy)
var KV_ServiceDesc = grpc.ServiceDesc{
	ServiceName: "kv.KV",
	HandlerType: (*KVServer)(nil),
	Methods: []grpc.MethodDesc{
		{
			MethodName: "GetKey",
			Handler:    _KV_GetKey_Handler,
		},
		{
			MethodName: "SetKey",
			Handler:    _KV_SetKey_Handler,
		},
		{
			MethodName: "DelKey",
			Handler:    _KV_DelKey_Handler,
		},
	},
	Streams:  []grpc.StreamDesc{},
	Metadata: "proto/imp/api/kv/kv.proto",
}
