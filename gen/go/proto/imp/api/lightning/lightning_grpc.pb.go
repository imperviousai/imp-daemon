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

// LightningClient is the client API for Lightning service.
//
// For semantics around ctx use and closing/ending streaming RPCs, please refer to https://pkg.go.dev/google.golang.org/grpc/?tab=doc#ClientConn.NewStream.
type LightningClient interface {
	//*
	// GenerateInvoice allows you to generate an invoice for a specific payment amount from your lightning node.
	GenerateInvoice(ctx context.Context, in *GenerateInvoiceRequest, opts ...grpc.CallOption) (*GenerateInvoiceResponse, error)
	//*
	// PayInvoice allows you to pay a specific invoice with your lightning node.
	PayInvoice(ctx context.Context, in *PayInvoiceRequest, opts ...grpc.CallOption) (*PayInvoiceResponse, error)
	//*
	// CheckInvoice allows you to check a specific invoice to see if it was paid.
	CheckInvoice(ctx context.Context, in *CheckInvoiceRequest, opts ...grpc.CallOption) (*CheckInvoiceResponse, error)
}

type lightningClient struct {
	cc grpc.ClientConnInterface
}

func NewLightningClient(cc grpc.ClientConnInterface) LightningClient {
	return &lightningClient{cc}
}

func (c *lightningClient) GenerateInvoice(ctx context.Context, in *GenerateInvoiceRequest, opts ...grpc.CallOption) (*GenerateInvoiceResponse, error) {
	out := new(GenerateInvoiceResponse)
	err := c.cc.Invoke(ctx, "/lightning.Lightning/GenerateInvoice", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *lightningClient) PayInvoice(ctx context.Context, in *PayInvoiceRequest, opts ...grpc.CallOption) (*PayInvoiceResponse, error) {
	out := new(PayInvoiceResponse)
	err := c.cc.Invoke(ctx, "/lightning.Lightning/PayInvoice", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *lightningClient) CheckInvoice(ctx context.Context, in *CheckInvoiceRequest, opts ...grpc.CallOption) (*CheckInvoiceResponse, error) {
	out := new(CheckInvoiceResponse)
	err := c.cc.Invoke(ctx, "/lightning.Lightning/CheckInvoice", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

// LightningServer is the server API for Lightning service.
// All implementations must embed UnimplementedLightningServer
// for forward compatibility
type LightningServer interface {
	//*
	// GenerateInvoice allows you to generate an invoice for a specific payment amount from your lightning node.
	GenerateInvoice(context.Context, *GenerateInvoiceRequest) (*GenerateInvoiceResponse, error)
	//*
	// PayInvoice allows you to pay a specific invoice with your lightning node.
	PayInvoice(context.Context, *PayInvoiceRequest) (*PayInvoiceResponse, error)
	//*
	// CheckInvoice allows you to check a specific invoice to see if it was paid.
	CheckInvoice(context.Context, *CheckInvoiceRequest) (*CheckInvoiceResponse, error)
	mustEmbedUnimplementedLightningServer()
}

// UnimplementedLightningServer must be embedded to have forward compatible implementations.
type UnimplementedLightningServer struct {
}

func (UnimplementedLightningServer) GenerateInvoice(context.Context, *GenerateInvoiceRequest) (*GenerateInvoiceResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method GenerateInvoice not implemented")
}
func (UnimplementedLightningServer) PayInvoice(context.Context, *PayInvoiceRequest) (*PayInvoiceResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method PayInvoice not implemented")
}
func (UnimplementedLightningServer) CheckInvoice(context.Context, *CheckInvoiceRequest) (*CheckInvoiceResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method CheckInvoice not implemented")
}
func (UnimplementedLightningServer) mustEmbedUnimplementedLightningServer() {}

// UnsafeLightningServer may be embedded to opt out of forward compatibility for this service.
// Use of this interface is not recommended, as added methods to LightningServer will
// result in compilation errors.
type UnsafeLightningServer interface {
	mustEmbedUnimplementedLightningServer()
}

func RegisterLightningServer(s grpc.ServiceRegistrar, srv LightningServer) {
	s.RegisterService(&Lightning_ServiceDesc, srv)
}

func _Lightning_GenerateInvoice_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(GenerateInvoiceRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(LightningServer).GenerateInvoice(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/lightning.Lightning/GenerateInvoice",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(LightningServer).GenerateInvoice(ctx, req.(*GenerateInvoiceRequest))
	}
	return interceptor(ctx, in, info, handler)
}

func _Lightning_PayInvoice_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(PayInvoiceRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(LightningServer).PayInvoice(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/lightning.Lightning/PayInvoice",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(LightningServer).PayInvoice(ctx, req.(*PayInvoiceRequest))
	}
	return interceptor(ctx, in, info, handler)
}

func _Lightning_CheckInvoice_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(CheckInvoiceRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(LightningServer).CheckInvoice(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/lightning.Lightning/CheckInvoice",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(LightningServer).CheckInvoice(ctx, req.(*CheckInvoiceRequest))
	}
	return interceptor(ctx, in, info, handler)
}

// Lightning_ServiceDesc is the grpc.ServiceDesc for Lightning service.
// It's only intended for direct use with grpc.RegisterService,
// and not to be introspected or modified (even as a copy)
var Lightning_ServiceDesc = grpc.ServiceDesc{
	ServiceName: "lightning.Lightning",
	HandlerType: (*LightningServer)(nil),
	Methods: []grpc.MethodDesc{
		{
			MethodName: "GenerateInvoice",
			Handler:    _Lightning_GenerateInvoice_Handler,
		},
		{
			MethodName: "PayInvoice",
			Handler:    _Lightning_PayInvoice_Handler,
		},
		{
			MethodName: "CheckInvoice",
			Handler:    _Lightning_CheckInvoice_Handler,
		},
	},
	Streams:  []grpc.StreamDesc{},
	Metadata: "proto/imp/api/lightning/lightning.proto",
}