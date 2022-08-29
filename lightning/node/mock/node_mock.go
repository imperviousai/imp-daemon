// Code generated by MockGen. DO NOT EDIT.
// Source: github.com/imperviousai/freeimp/lightning/node (interfaces: Node)

// Package mock is a generated GoMock package.
package mock

import (
	reflect "reflect"

	gomock "github.com/golang/mock/gomock"
	comm "github.com/imperviousai/freeimp/comm"
)

// MockNode is a mock of Node interface.
type MockNode struct {
	ctrl     *gomock.Controller
	recorder *MockNodeMockRecorder
}

// MockNodeMockRecorder is the mock recorder for MockNode.
type MockNodeMockRecorder struct {
	mock *MockNode
}

// NewMockNode creates a new mock instance.
func NewMockNode(ctrl *gomock.Controller) *MockNode {
	mock := &MockNode{ctrl: ctrl}
	mock.recorder = &MockNodeMockRecorder{mock}
	return mock
}

// EXPECT returns an object that allows the caller to indicate expected use.
func (m *MockNode) EXPECT() *MockNodeMockRecorder {
	return m.recorder
}

// CheckInvoice mocks base method.
func (m *MockNode) CheckInvoice(arg0 string) (bool, error) {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "CheckInvoice", arg0)
	ret0, _ := ret[0].(bool)
	ret1, _ := ret[1].(error)
	return ret0, ret1
}

// CheckInvoice indicates an expected call of CheckInvoice.
func (mr *MockNodeMockRecorder) CheckInvoice(arg0 interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "CheckInvoice", reflect.TypeOf((*MockNode)(nil).CheckInvoice), arg0)
}

// Disconnect mocks base method.
func (m *MockNode) Disconnect() error {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "Disconnect")
	ret0, _ := ret[0].(error)
	return ret0
}

// Disconnect indicates an expected call of Disconnect.
func (mr *MockNodeMockRecorder) Disconnect() *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "Disconnect", reflect.TypeOf((*MockNode)(nil).Disconnect))
}

// GenerateInvoice mocks base method.
func (m *MockNode) GenerateInvoice(arg0 int64, arg1 string) (string, error) {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "GenerateInvoice", arg0, arg1)
	ret0, _ := ret[0].(string)
	ret1, _ := ret[1].(error)
	return ret0, ret1
}

// GenerateInvoice indicates an expected call of GenerateInvoice.
func (mr *MockNodeMockRecorder) GenerateInvoice(arg0, arg1 interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "GenerateInvoice", reflect.TypeOf((*MockNode)(nil).GenerateInvoice), arg0, arg1)
}

// GetPubkey mocks base method.
func (m *MockNode) GetPubkey() string {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "GetPubkey")
	ret0, _ := ret[0].(string)
	return ret0
}

// GetPubkey indicates an expected call of GetPubkey.
func (mr *MockNodeMockRecorder) GetPubkey() *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "GetPubkey", reflect.TypeOf((*MockNode)(nil).GetPubkey))
}

// Keysend mocks base method.
func (m *MockNode) Keysend(arg0 string, arg1 []byte, arg2 int64) error {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "Keysend", arg0, arg1, arg2)
	ret0, _ := ret[0].(error)
	return ret0
}

// Keysend indicates an expected call of Keysend.
func (mr *MockNodeMockRecorder) Keysend(arg0, arg1, arg2 interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "Keysend", reflect.TypeOf((*MockNode)(nil).Keysend), arg0, arg1, arg2)
}

// PayInvoice mocks base method.
func (m *MockNode) PayInvoice(arg0 string) (string, error) {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "PayInvoice", arg0)
	ret0, _ := ret[0].(string)
	ret1, _ := ret[1].(error)
	return ret0, ret1
}

// PayInvoice indicates an expected call of PayInvoice.
func (mr *MockNodeMockRecorder) PayInvoice(arg0 interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "PayInvoice", reflect.TypeOf((*MockNode)(nil).PayInvoice), arg0)
}

// ShouldListen mocks base method.
func (m *MockNode) ShouldListen() bool {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "ShouldListen")
	ret0, _ := ret[0].(bool)
	return ret0
}

// ShouldListen indicates an expected call of ShouldListen.
func (mr *MockNodeMockRecorder) ShouldListen() *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "ShouldListen", reflect.TypeOf((*MockNode)(nil).ShouldListen))
}

// SignMessage mocks base method.
func (m *MockNode) SignMessage(arg0 []byte) ([]byte, error) {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "SignMessage", arg0)
	ret0, _ := ret[0].([]byte)
	ret1, _ := ret[1].(error)
	return ret0, ret1
}

// SignMessage indicates an expected call of SignMessage.
func (mr *MockNodeMockRecorder) SignMessage(arg0 interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "SignMessage", reflect.TypeOf((*MockNode)(nil).SignMessage), arg0)
}

// Subscribe mocks base method.
func (m *MockNode) Subscribe(arg0 chan comm.IncomingDIDMessage) error {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "Subscribe", arg0)
	ret0, _ := ret[0].(error)
	return ret0
}

// Subscribe indicates an expected call of Subscribe.
func (mr *MockNodeMockRecorder) Subscribe(arg0 interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "Subscribe", reflect.TypeOf((*MockNode)(nil).Subscribe), arg0)
}

// VerifySignature mocks base method.
func (m *MockNode) VerifySignature(arg0, arg1 []byte) (bool, error) {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "VerifySignature", arg0, arg1)
	ret0, _ := ret[0].(bool)
	ret1, _ := ret[1].(error)
	return ret0, ret1
}

// VerifySignature indicates an expected call of VerifySignature.
func (mr *MockNodeMockRecorder) VerifySignature(arg0, arg1 interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "VerifySignature", reflect.TypeOf((*MockNode)(nil).VerifySignature), arg0, arg1)
}

// VerifySignatureFromPubkey mocks base method.
func (m *MockNode) VerifySignatureFromPubkey(arg0, arg1, arg2 []byte) (bool, error) {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "VerifySignatureFromPubkey", arg0, arg1, arg2)
	ret0, _ := ret[0].(bool)
	ret1, _ := ret[1].(error)
	return ret0, ret1
}

// VerifySignatureFromPubkey indicates an expected call of VerifySignatureFromPubkey.
func (mr *MockNodeMockRecorder) VerifySignatureFromPubkey(arg0, arg1, arg2 interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "VerifySignatureFromPubkey", reflect.TypeOf((*MockNode)(nil).VerifySignatureFromPubkey), arg0, arg1, arg2)
}
