// Code generated by protoc-gen-go-grpc. DO NOT EDIT.
// versions:
// - protoc-gen-go-grpc v1.2.0
// - protoc             v3.20.1
// source: proto/imp/api/config/config.proto

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

// ConfigClient is the client API for Config service.
//
// For semantics around ctx use and closing/ending streaming RPCs, please refer to https://pkg.go.dev/google.golang.org/grpc/?tab=doc#ClientConn.NewStream.
type ConfigClient interface {
	// *
	// GetLightningConfig gets the lightning configs for the daemon.
	GetLightningConfig(ctx context.Context, in *GetLightningConfigRequest, opts ...grpc.CallOption) (*GetLightningConfigResponse, error)
	// *
	// SaveLightningConfig save the lightning config and restart the daemon.
	SaveLightningConfig(ctx context.Context, in *SaveLightningConfigRequest, opts ...grpc.CallOption) (*SaveLightningConfigResponse, error)
	// *
	// GetIONConfig gets the ion configs for the daemon.
	GetIONConfig(ctx context.Context, in *GetIONConfigRequest, opts ...grpc.CallOption) (*GetIONConfigResponse, error)
	// *
	// SaveIONConfig will save the ion config and restart the daemon.
	SaveIONConfig(ctx context.Context, in *SaveIONConfigRequest, opts ...grpc.CallOption) (*SaveIONConfigResponse, error)
}

type configClient struct {
	cc grpc.ClientConnInterface
}

func NewConfigClient(cc grpc.ClientConnInterface) ConfigClient {
	return &configClient{cc}
}

func (c *configClient) GetLightningConfig(ctx context.Context, in *GetLightningConfigRequest, opts ...grpc.CallOption) (*GetLightningConfigResponse, error) {
	out := new(GetLightningConfigResponse)
	err := c.cc.Invoke(ctx, "/configs.Config/GetLightningConfig", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *configClient) SaveLightningConfig(ctx context.Context, in *SaveLightningConfigRequest, opts ...grpc.CallOption) (*SaveLightningConfigResponse, error) {
	out := new(SaveLightningConfigResponse)
	err := c.cc.Invoke(ctx, "/configs.Config/SaveLightningConfig", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *configClient) GetIONConfig(ctx context.Context, in *GetIONConfigRequest, opts ...grpc.CallOption) (*GetIONConfigResponse, error) {
	out := new(GetIONConfigResponse)
	err := c.cc.Invoke(ctx, "/configs.Config/GetIONConfig", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *configClient) SaveIONConfig(ctx context.Context, in *SaveIONConfigRequest, opts ...grpc.CallOption) (*SaveIONConfigResponse, error) {
	out := new(SaveIONConfigResponse)
	err := c.cc.Invoke(ctx, "/configs.Config/SaveIONConfig", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

// ConfigServer is the server API for Config service.
// All implementations must embed UnimplementedConfigServer
// for forward compatibility
type ConfigServer interface {
	// *
	// GetLightningConfig gets the lightning configs for the daemon.
	GetLightningConfig(context.Context, *GetLightningConfigRequest) (*GetLightningConfigResponse, error)
	// *
	// SaveLightningConfig save the lightning config and restart the daemon.
	SaveLightningConfig(context.Context, *SaveLightningConfigRequest) (*SaveLightningConfigResponse, error)
	// *
	// GetIONConfig gets the ion configs for the daemon.
	GetIONConfig(context.Context, *GetIONConfigRequest) (*GetIONConfigResponse, error)
	// *
	// SaveIONConfig will save the ion config and restart the daemon.
	SaveIONConfig(context.Context, *SaveIONConfigRequest) (*SaveIONConfigResponse, error)
	mustEmbedUnimplementedConfigServer()
}

// UnimplementedConfigServer must be embedded to have forward compatible implementations.
type UnimplementedConfigServer struct {
}

func (UnimplementedConfigServer) GetLightningConfig(context.Context, *GetLightningConfigRequest) (*GetLightningConfigResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method GetLightningConfig not implemented")
}
func (UnimplementedConfigServer) SaveLightningConfig(context.Context, *SaveLightningConfigRequest) (*SaveLightningConfigResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method SaveLightningConfig not implemented")
}
func (UnimplementedConfigServer) GetIONConfig(context.Context, *GetIONConfigRequest) (*GetIONConfigResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method GetIONConfig not implemented")
}
func (UnimplementedConfigServer) SaveIONConfig(context.Context, *SaveIONConfigRequest) (*SaveIONConfigResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method SaveIONConfig not implemented")
}
func (UnimplementedConfigServer) mustEmbedUnimplementedConfigServer() {}

// UnsafeConfigServer may be embedded to opt out of forward compatibility for this service.
// Use of this interface is not recommended, as added methods to ConfigServer will
// result in compilation errors.
type UnsafeConfigServer interface {
	mustEmbedUnimplementedConfigServer()
}

func RegisterConfigServer(s grpc.ServiceRegistrar, srv ConfigServer) {
	s.RegisterService(&Config_ServiceDesc, srv)
}

func _Config_GetLightningConfig_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(GetLightningConfigRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(ConfigServer).GetLightningConfig(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/configs.Config/GetLightningConfig",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(ConfigServer).GetLightningConfig(ctx, req.(*GetLightningConfigRequest))
	}
	return interceptor(ctx, in, info, handler)
}

func _Config_SaveLightningConfig_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(SaveLightningConfigRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(ConfigServer).SaveLightningConfig(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/configs.Config/SaveLightningConfig",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(ConfigServer).SaveLightningConfig(ctx, req.(*SaveLightningConfigRequest))
	}
	return interceptor(ctx, in, info, handler)
}

func _Config_GetIONConfig_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(GetIONConfigRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(ConfigServer).GetIONConfig(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/configs.Config/GetIONConfig",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(ConfigServer).GetIONConfig(ctx, req.(*GetIONConfigRequest))
	}
	return interceptor(ctx, in, info, handler)
}

func _Config_SaveIONConfig_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(SaveIONConfigRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(ConfigServer).SaveIONConfig(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/configs.Config/SaveIONConfig",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(ConfigServer).SaveIONConfig(ctx, req.(*SaveIONConfigRequest))
	}
	return interceptor(ctx, in, info, handler)
}

// Config_ServiceDesc is the grpc.ServiceDesc for Config service.
// It's only intended for direct use with grpc.RegisterService,
// and not to be introspected or modified (even as a copy)
var Config_ServiceDesc = grpc.ServiceDesc{
	ServiceName: "configs.Config",
	HandlerType: (*ConfigServer)(nil),
	Methods: []grpc.MethodDesc{
		{
			MethodName: "GetLightningConfig",
			Handler:    _Config_GetLightningConfig_Handler,
		},
		{
			MethodName: "SaveLightningConfig",
			Handler:    _Config_SaveLightningConfig_Handler,
		},
		{
			MethodName: "GetIONConfig",
			Handler:    _Config_GetIONConfig_Handler,
		},
		{
			MethodName: "SaveIONConfig",
			Handler:    _Config_SaveIONConfig_Handler,
		},
	},
	Streams:  []grpc.StreamDesc{},
	Metadata: "proto/imp/api/config/config.proto",
}
