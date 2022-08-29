// Code generated by MockGen. DO NOT EDIT.
// Source: github.com/lightningnetwork/lnd/lnrpc/routerrpc (interfaces: RouterClient)

// Package lnd_mock is a generated GoMock package.
package lnd_mock

import (
	context "context"
	reflect "reflect"

	gomock "github.com/golang/mock/gomock"
	lnrpc "github.com/lightningnetwork/lnd/lnrpc"
	routerrpc "github.com/lightningnetwork/lnd/lnrpc/routerrpc"
	grpc "google.golang.org/grpc"
)

// MockRouterClient is a mock of RouterClient interface.
type MockRouterClient struct {
	ctrl     *gomock.Controller
	recorder *MockRouterClientMockRecorder
}

// MockRouterClientMockRecorder is the mock recorder for MockRouterClient.
type MockRouterClientMockRecorder struct {
	mock *MockRouterClient
}

// NewMockRouterClient creates a new mock instance.
func NewMockRouterClient(ctrl *gomock.Controller) *MockRouterClient {
	mock := &MockRouterClient{ctrl: ctrl}
	mock.recorder = &MockRouterClientMockRecorder{mock}
	return mock
}

// EXPECT returns an object that allows the caller to indicate expected use.
func (m *MockRouterClient) EXPECT() *MockRouterClientMockRecorder {
	return m.recorder
}

// BuildRoute mocks base method.
func (m *MockRouterClient) BuildRoute(arg0 context.Context, arg1 *routerrpc.BuildRouteRequest, arg2 ...grpc.CallOption) (*routerrpc.BuildRouteResponse, error) {
	m.ctrl.T.Helper()
	varargs := []interface{}{arg0, arg1}
	for _, a := range arg2 {
		varargs = append(varargs, a)
	}
	ret := m.ctrl.Call(m, "BuildRoute", varargs...)
	ret0, _ := ret[0].(*routerrpc.BuildRouteResponse)
	ret1, _ := ret[1].(error)
	return ret0, ret1
}

// BuildRoute indicates an expected call of BuildRoute.
func (mr *MockRouterClientMockRecorder) BuildRoute(arg0, arg1 interface{}, arg2 ...interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	varargs := append([]interface{}{arg0, arg1}, arg2...)
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "BuildRoute", reflect.TypeOf((*MockRouterClient)(nil).BuildRoute), varargs...)
}

// EstimateRouteFee mocks base method.
func (m *MockRouterClient) EstimateRouteFee(arg0 context.Context, arg1 *routerrpc.RouteFeeRequest, arg2 ...grpc.CallOption) (*routerrpc.RouteFeeResponse, error) {
	m.ctrl.T.Helper()
	varargs := []interface{}{arg0, arg1}
	for _, a := range arg2 {
		varargs = append(varargs, a)
	}
	ret := m.ctrl.Call(m, "EstimateRouteFee", varargs...)
	ret0, _ := ret[0].(*routerrpc.RouteFeeResponse)
	ret1, _ := ret[1].(error)
	return ret0, ret1
}

// EstimateRouteFee indicates an expected call of EstimateRouteFee.
func (mr *MockRouterClientMockRecorder) EstimateRouteFee(arg0, arg1 interface{}, arg2 ...interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	varargs := append([]interface{}{arg0, arg1}, arg2...)
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "EstimateRouteFee", reflect.TypeOf((*MockRouterClient)(nil).EstimateRouteFee), varargs...)
}

// GetMissionControlConfig mocks base method.
func (m *MockRouterClient) GetMissionControlConfig(arg0 context.Context, arg1 *routerrpc.GetMissionControlConfigRequest, arg2 ...grpc.CallOption) (*routerrpc.GetMissionControlConfigResponse, error) {
	m.ctrl.T.Helper()
	varargs := []interface{}{arg0, arg1}
	for _, a := range arg2 {
		varargs = append(varargs, a)
	}
	ret := m.ctrl.Call(m, "GetMissionControlConfig", varargs...)
	ret0, _ := ret[0].(*routerrpc.GetMissionControlConfigResponse)
	ret1, _ := ret[1].(error)
	return ret0, ret1
}

// GetMissionControlConfig indicates an expected call of GetMissionControlConfig.
func (mr *MockRouterClientMockRecorder) GetMissionControlConfig(arg0, arg1 interface{}, arg2 ...interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	varargs := append([]interface{}{arg0, arg1}, arg2...)
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "GetMissionControlConfig", reflect.TypeOf((*MockRouterClient)(nil).GetMissionControlConfig), varargs...)
}

// HtlcInterceptor mocks base method.
func (m *MockRouterClient) HtlcInterceptor(arg0 context.Context, arg1 ...grpc.CallOption) (routerrpc.Router_HtlcInterceptorClient, error) {
	m.ctrl.T.Helper()
	varargs := []interface{}{arg0}
	for _, a := range arg1 {
		varargs = append(varargs, a)
	}
	ret := m.ctrl.Call(m, "HtlcInterceptor", varargs...)
	ret0, _ := ret[0].(routerrpc.Router_HtlcInterceptorClient)
	ret1, _ := ret[1].(error)
	return ret0, ret1
}

// HtlcInterceptor indicates an expected call of HtlcInterceptor.
func (mr *MockRouterClientMockRecorder) HtlcInterceptor(arg0 interface{}, arg1 ...interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	varargs := append([]interface{}{arg0}, arg1...)
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "HtlcInterceptor", reflect.TypeOf((*MockRouterClient)(nil).HtlcInterceptor), varargs...)
}

// QueryMissionControl mocks base method.
func (m *MockRouterClient) QueryMissionControl(arg0 context.Context, arg1 *routerrpc.QueryMissionControlRequest, arg2 ...grpc.CallOption) (*routerrpc.QueryMissionControlResponse, error) {
	m.ctrl.T.Helper()
	varargs := []interface{}{arg0, arg1}
	for _, a := range arg2 {
		varargs = append(varargs, a)
	}
	ret := m.ctrl.Call(m, "QueryMissionControl", varargs...)
	ret0, _ := ret[0].(*routerrpc.QueryMissionControlResponse)
	ret1, _ := ret[1].(error)
	return ret0, ret1
}

// QueryMissionControl indicates an expected call of QueryMissionControl.
func (mr *MockRouterClientMockRecorder) QueryMissionControl(arg0, arg1 interface{}, arg2 ...interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	varargs := append([]interface{}{arg0, arg1}, arg2...)
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "QueryMissionControl", reflect.TypeOf((*MockRouterClient)(nil).QueryMissionControl), varargs...)
}

// QueryProbability mocks base method.
func (m *MockRouterClient) QueryProbability(arg0 context.Context, arg1 *routerrpc.QueryProbabilityRequest, arg2 ...grpc.CallOption) (*routerrpc.QueryProbabilityResponse, error) {
	m.ctrl.T.Helper()
	varargs := []interface{}{arg0, arg1}
	for _, a := range arg2 {
		varargs = append(varargs, a)
	}
	ret := m.ctrl.Call(m, "QueryProbability", varargs...)
	ret0, _ := ret[0].(*routerrpc.QueryProbabilityResponse)
	ret1, _ := ret[1].(error)
	return ret0, ret1
}

// QueryProbability indicates an expected call of QueryProbability.
func (mr *MockRouterClientMockRecorder) QueryProbability(arg0, arg1 interface{}, arg2 ...interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	varargs := append([]interface{}{arg0, arg1}, arg2...)
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "QueryProbability", reflect.TypeOf((*MockRouterClient)(nil).QueryProbability), varargs...)
}

// ResetMissionControl mocks base method.
func (m *MockRouterClient) ResetMissionControl(arg0 context.Context, arg1 *routerrpc.ResetMissionControlRequest, arg2 ...grpc.CallOption) (*routerrpc.ResetMissionControlResponse, error) {
	m.ctrl.T.Helper()
	varargs := []interface{}{arg0, arg1}
	for _, a := range arg2 {
		varargs = append(varargs, a)
	}
	ret := m.ctrl.Call(m, "ResetMissionControl", varargs...)
	ret0, _ := ret[0].(*routerrpc.ResetMissionControlResponse)
	ret1, _ := ret[1].(error)
	return ret0, ret1
}

// ResetMissionControl indicates an expected call of ResetMissionControl.
func (mr *MockRouterClientMockRecorder) ResetMissionControl(arg0, arg1 interface{}, arg2 ...interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	varargs := append([]interface{}{arg0, arg1}, arg2...)
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "ResetMissionControl", reflect.TypeOf((*MockRouterClient)(nil).ResetMissionControl), varargs...)
}

// SendPayment mocks base method.
func (m *MockRouterClient) SendPayment(arg0 context.Context, arg1 *routerrpc.SendPaymentRequest, arg2 ...grpc.CallOption) (routerrpc.Router_SendPaymentClient, error) {
	m.ctrl.T.Helper()
	varargs := []interface{}{arg0, arg1}
	for _, a := range arg2 {
		varargs = append(varargs, a)
	}
	ret := m.ctrl.Call(m, "SendPayment", varargs...)
	ret0, _ := ret[0].(routerrpc.Router_SendPaymentClient)
	ret1, _ := ret[1].(error)
	return ret0, ret1
}

// SendPayment indicates an expected call of SendPayment.
func (mr *MockRouterClientMockRecorder) SendPayment(arg0, arg1 interface{}, arg2 ...interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	varargs := append([]interface{}{arg0, arg1}, arg2...)
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "SendPayment", reflect.TypeOf((*MockRouterClient)(nil).SendPayment), varargs...)
}

// SendPaymentV2 mocks base method.
func (m *MockRouterClient) SendPaymentV2(arg0 context.Context, arg1 *routerrpc.SendPaymentRequest, arg2 ...grpc.CallOption) (routerrpc.Router_SendPaymentV2Client, error) {
	m.ctrl.T.Helper()
	varargs := []interface{}{arg0, arg1}
	for _, a := range arg2 {
		varargs = append(varargs, a)
	}
	ret := m.ctrl.Call(m, "SendPaymentV2", varargs...)
	ret0, _ := ret[0].(routerrpc.Router_SendPaymentV2Client)
	ret1, _ := ret[1].(error)
	return ret0, ret1
}

// SendPaymentV2 indicates an expected call of SendPaymentV2.
func (mr *MockRouterClientMockRecorder) SendPaymentV2(arg0, arg1 interface{}, arg2 ...interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	varargs := append([]interface{}{arg0, arg1}, arg2...)
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "SendPaymentV2", reflect.TypeOf((*MockRouterClient)(nil).SendPaymentV2), varargs...)
}

// SendToRoute mocks base method.
func (m *MockRouterClient) SendToRoute(arg0 context.Context, arg1 *routerrpc.SendToRouteRequest, arg2 ...grpc.CallOption) (*routerrpc.SendToRouteResponse, error) {
	m.ctrl.T.Helper()
	varargs := []interface{}{arg0, arg1}
	for _, a := range arg2 {
		varargs = append(varargs, a)
	}
	ret := m.ctrl.Call(m, "SendToRoute", varargs...)
	ret0, _ := ret[0].(*routerrpc.SendToRouteResponse)
	ret1, _ := ret[1].(error)
	return ret0, ret1
}

// SendToRoute indicates an expected call of SendToRoute.
func (mr *MockRouterClientMockRecorder) SendToRoute(arg0, arg1 interface{}, arg2 ...interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	varargs := append([]interface{}{arg0, arg1}, arg2...)
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "SendToRoute", reflect.TypeOf((*MockRouterClient)(nil).SendToRoute), varargs...)
}

// SendToRouteV2 mocks base method.
func (m *MockRouterClient) SendToRouteV2(arg0 context.Context, arg1 *routerrpc.SendToRouteRequest, arg2 ...grpc.CallOption) (*lnrpc.HTLCAttempt, error) {
	m.ctrl.T.Helper()
	varargs := []interface{}{arg0, arg1}
	for _, a := range arg2 {
		varargs = append(varargs, a)
	}
	ret := m.ctrl.Call(m, "SendToRouteV2", varargs...)
	ret0, _ := ret[0].(*lnrpc.HTLCAttempt)
	ret1, _ := ret[1].(error)
	return ret0, ret1
}

// SendToRouteV2 indicates an expected call of SendToRouteV2.
func (mr *MockRouterClientMockRecorder) SendToRouteV2(arg0, arg1 interface{}, arg2 ...interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	varargs := append([]interface{}{arg0, arg1}, arg2...)
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "SendToRouteV2", reflect.TypeOf((*MockRouterClient)(nil).SendToRouteV2), varargs...)
}

// SetMissionControlConfig mocks base method.
func (m *MockRouterClient) SetMissionControlConfig(arg0 context.Context, arg1 *routerrpc.SetMissionControlConfigRequest, arg2 ...grpc.CallOption) (*routerrpc.SetMissionControlConfigResponse, error) {
	m.ctrl.T.Helper()
	varargs := []interface{}{arg0, arg1}
	for _, a := range arg2 {
		varargs = append(varargs, a)
	}
	ret := m.ctrl.Call(m, "SetMissionControlConfig", varargs...)
	ret0, _ := ret[0].(*routerrpc.SetMissionControlConfigResponse)
	ret1, _ := ret[1].(error)
	return ret0, ret1
}

// SetMissionControlConfig indicates an expected call of SetMissionControlConfig.
func (mr *MockRouterClientMockRecorder) SetMissionControlConfig(arg0, arg1 interface{}, arg2 ...interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	varargs := append([]interface{}{arg0, arg1}, arg2...)
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "SetMissionControlConfig", reflect.TypeOf((*MockRouterClient)(nil).SetMissionControlConfig), varargs...)
}

// SubscribeHtlcEvents mocks base method.
func (m *MockRouterClient) SubscribeHtlcEvents(arg0 context.Context, arg1 *routerrpc.SubscribeHtlcEventsRequest, arg2 ...grpc.CallOption) (routerrpc.Router_SubscribeHtlcEventsClient, error) {
	m.ctrl.T.Helper()
	varargs := []interface{}{arg0, arg1}
	for _, a := range arg2 {
		varargs = append(varargs, a)
	}
	ret := m.ctrl.Call(m, "SubscribeHtlcEvents", varargs...)
	ret0, _ := ret[0].(routerrpc.Router_SubscribeHtlcEventsClient)
	ret1, _ := ret[1].(error)
	return ret0, ret1
}

// SubscribeHtlcEvents indicates an expected call of SubscribeHtlcEvents.
func (mr *MockRouterClientMockRecorder) SubscribeHtlcEvents(arg0, arg1 interface{}, arg2 ...interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	varargs := append([]interface{}{arg0, arg1}, arg2...)
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "SubscribeHtlcEvents", reflect.TypeOf((*MockRouterClient)(nil).SubscribeHtlcEvents), varargs...)
}

// TrackPayment mocks base method.
func (m *MockRouterClient) TrackPayment(arg0 context.Context, arg1 *routerrpc.TrackPaymentRequest, arg2 ...grpc.CallOption) (routerrpc.Router_TrackPaymentClient, error) {
	m.ctrl.T.Helper()
	varargs := []interface{}{arg0, arg1}
	for _, a := range arg2 {
		varargs = append(varargs, a)
	}
	ret := m.ctrl.Call(m, "TrackPayment", varargs...)
	ret0, _ := ret[0].(routerrpc.Router_TrackPaymentClient)
	ret1, _ := ret[1].(error)
	return ret0, ret1
}

// TrackPayment indicates an expected call of TrackPayment.
func (mr *MockRouterClientMockRecorder) TrackPayment(arg0, arg1 interface{}, arg2 ...interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	varargs := append([]interface{}{arg0, arg1}, arg2...)
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "TrackPayment", reflect.TypeOf((*MockRouterClient)(nil).TrackPayment), varargs...)
}

// TrackPaymentV2 mocks base method.
func (m *MockRouterClient) TrackPaymentV2(arg0 context.Context, arg1 *routerrpc.TrackPaymentRequest, arg2 ...grpc.CallOption) (routerrpc.Router_TrackPaymentV2Client, error) {
	m.ctrl.T.Helper()
	varargs := []interface{}{arg0, arg1}
	for _, a := range arg2 {
		varargs = append(varargs, a)
	}
	ret := m.ctrl.Call(m, "TrackPaymentV2", varargs...)
	ret0, _ := ret[0].(routerrpc.Router_TrackPaymentV2Client)
	ret1, _ := ret[1].(error)
	return ret0, ret1
}

// TrackPaymentV2 indicates an expected call of TrackPaymentV2.
func (mr *MockRouterClientMockRecorder) TrackPaymentV2(arg0, arg1 interface{}, arg2 ...interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	varargs := append([]interface{}{arg0, arg1}, arg2...)
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "TrackPaymentV2", reflect.TypeOf((*MockRouterClient)(nil).TrackPaymentV2), varargs...)
}

// UpdateChanStatus mocks base method.
func (m *MockRouterClient) UpdateChanStatus(arg0 context.Context, arg1 *routerrpc.UpdateChanStatusRequest, arg2 ...grpc.CallOption) (*routerrpc.UpdateChanStatusResponse, error) {
	m.ctrl.T.Helper()
	varargs := []interface{}{arg0, arg1}
	for _, a := range arg2 {
		varargs = append(varargs, a)
	}
	ret := m.ctrl.Call(m, "UpdateChanStatus", varargs...)
	ret0, _ := ret[0].(*routerrpc.UpdateChanStatusResponse)
	ret1, _ := ret[1].(error)
	return ret0, ret1
}

// UpdateChanStatus indicates an expected call of UpdateChanStatus.
func (mr *MockRouterClientMockRecorder) UpdateChanStatus(arg0, arg1 interface{}, arg2 ...interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	varargs := append([]interface{}{arg0, arg1}, arg2...)
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "UpdateChanStatus", reflect.TypeOf((*MockRouterClient)(nil).UpdateChanStatus), varargs...)
}

// XImportMissionControl mocks base method.
func (m *MockRouterClient) XImportMissionControl(arg0 context.Context, arg1 *routerrpc.XImportMissionControlRequest, arg2 ...grpc.CallOption) (*routerrpc.XImportMissionControlResponse, error) {
	m.ctrl.T.Helper()
	varargs := []interface{}{arg0, arg1}
	for _, a := range arg2 {
		varargs = append(varargs, a)
	}
	ret := m.ctrl.Call(m, "XImportMissionControl", varargs...)
	ret0, _ := ret[0].(*routerrpc.XImportMissionControlResponse)
	ret1, _ := ret[1].(error)
	return ret0, ret1
}

// XImportMissionControl indicates an expected call of XImportMissionControl.
func (mr *MockRouterClientMockRecorder) XImportMissionControl(arg0, arg1 interface{}, arg2 ...interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	varargs := append([]interface{}{arg0, arg1}, arg2...)
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "XImportMissionControl", reflect.TypeOf((*MockRouterClient)(nil).XImportMissionControl), varargs...)
}
