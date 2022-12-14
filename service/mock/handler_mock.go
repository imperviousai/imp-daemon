// Code generated by MockGen. DO NOT EDIT.
// Source: github.com/imperviousai/imp-daemon/service (interfaces: Handler)

// Package mock is a generated GoMock package.
package mock

import (
	reflect "reflect"

	gomock "github.com/golang/mock/gomock"
	service "github.com/imperviousai/imp-daemon/service/service"
)

// MockHandler is a mock of Handler interface.
type MockHandler struct {
	ctrl     *gomock.Controller
	recorder *MockHandlerMockRecorder
}

// MockHandlerMockRecorder is the mock recorder for MockHandler.
type MockHandlerMockRecorder struct {
	mock *MockHandler
}

// NewMockHandler creates a new mock instance.
func NewMockHandler(ctrl *gomock.Controller) *MockHandler {
	mock := &MockHandler{ctrl: ctrl}
	mock.recorder = &MockHandlerMockRecorder{mock}
	return mock
}

// EXPECT returns an object that allows the caller to indicate expected use.
func (m *MockHandler) EXPECT() *MockHandlerMockRecorder {
	return m.recorder
}

// GetService mocks base method.
func (m *MockHandler) GetService(arg0 string) (service.Service, error) {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "GetService", arg0)
	ret0, _ := ret[0].(service.Service)
	ret1, _ := ret[1].(error)
	return ret0, ret1
}

// GetService indicates an expected call of GetService.
func (mr *MockHandlerMockRecorder) GetService(arg0 interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "GetService", reflect.TypeOf((*MockHandler)(nil).GetService), arg0)
}

// RegisterService mocks base method.
func (m *MockHandler) RegisterService(arg0 string, arg1 service.Service) error {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "RegisterService", arg0, arg1)
	ret0, _ := ret[0].(error)
	return ret0
}

// RegisterService indicates an expected call of RegisterService.
func (mr *MockHandlerMockRecorder) RegisterService(arg0, arg1 interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "RegisterService", reflect.TypeOf((*MockHandler)(nil).RegisterService), arg0, arg1)
}

// Start mocks base method.
func (m *MockHandler) Start() error {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "Start")
	ret0, _ := ret[0].(error)
	return ret0
}

// Start indicates an expected call of Start.
func (mr *MockHandlerMockRecorder) Start() *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "Start", reflect.TypeOf((*MockHandler)(nil).Start))
}

// Stop mocks base method.
func (m *MockHandler) Stop() error {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "Stop")
	ret0, _ := ret[0].(error)
	return ret0
}

// Stop indicates an expected call of Stop.
func (mr *MockHandlerMockRecorder) Stop() *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "Stop", reflect.TypeOf((*MockHandler)(nil).Stop))
}
