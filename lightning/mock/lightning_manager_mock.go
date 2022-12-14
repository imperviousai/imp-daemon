// Code generated by MockGen. DO NOT EDIT.
// Source: github.com/imperviousai/imp-daemon/lightning (interfaces: LightningManager)

// Package mock is a generated GoMock package.
package mock

import (
	reflect "reflect"

	gomock "github.com/golang/mock/gomock"
	comm "github.com/imperviousai/imp-daemon/comm"
	lightning "github.com/imperviousai/imp-daemon/lightning"
	node "github.com/imperviousai/imp-daemon/lightning/node"
)

// MockLightningManager is a mock of LightningManager interface.
type MockLightningManager struct {
	ctrl     *gomock.Controller
	recorder *MockLightningManagerMockRecorder
}

// MockLightningManagerMockRecorder is the mock recorder for MockLightningManager.
type MockLightningManagerMockRecorder struct {
	mock *MockLightningManager
}

// NewMockLightningManager creates a new mock instance.
func NewMockLightningManager(ctrl *gomock.Controller) *MockLightningManager {
	mock := &MockLightningManager{ctrl: ctrl}
	mock.recorder = &MockLightningManagerMockRecorder{mock}
	return mock
}

// EXPECT returns an object that allows the caller to indicate expected use.
func (m *MockLightningManager) EXPECT() *MockLightningManagerMockRecorder {
	return m.recorder
}

// AddNode mocks base method.
func (m *MockLightningManager) AddNode(arg0 node.Node) error {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "AddNode", arg0)
	ret0, _ := ret[0].(error)
	return ret0
}

// AddNode indicates an expected call of AddNode.
func (mr *MockLightningManagerMockRecorder) AddNode(arg0 interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "AddNode", reflect.TypeOf((*MockLightningManager)(nil).AddNode), arg0)
}

// CheckInvoice mocks base method.
func (m *MockLightningManager) CheckInvoice(arg0 string) (bool, error) {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "CheckInvoice", arg0)
	ret0, _ := ret[0].(bool)
	ret1, _ := ret[1].(error)
	return ret0, ret1
}

// CheckInvoice indicates an expected call of CheckInvoice.
func (mr *MockLightningManagerMockRecorder) CheckInvoice(arg0 interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "CheckInvoice", reflect.TypeOf((*MockLightningManager)(nil).CheckInvoice), arg0)
}

// CheckMsg mocks base method.
func (m *MockLightningManager) CheckMsg(arg0 string, arg1 *comm.DIDCommMsg) bool {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "CheckMsg", arg0, arg1)
	ret0, _ := ret[0].(bool)
	return ret0
}

// CheckMsg indicates an expected call of CheckMsg.
func (mr *MockLightningManagerMockRecorder) CheckMsg(arg0, arg1 interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "CheckMsg", reflect.TypeOf((*MockLightningManager)(nil).CheckMsg), arg0, arg1)
}

// GenerateInvoice mocks base method.
func (m *MockLightningManager) GenerateInvoice(arg0 int64, arg1 string) (string, error) {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "GenerateInvoice", arg0, arg1)
	ret0, _ := ret[0].(string)
	ret1, _ := ret[1].(error)
	return ret0, ret1
}

// GenerateInvoice indicates an expected call of GenerateInvoice.
func (mr *MockLightningManagerMockRecorder) GenerateInvoice(arg0, arg1 interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "GenerateInvoice", reflect.TypeOf((*MockLightningManager)(nil).GenerateInvoice), arg0, arg1)
}

// PayInvoice mocks base method.
func (m *MockLightningManager) PayInvoice(arg0 string) (string, error) {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "PayInvoice", arg0)
	ret0, _ := ret[0].(string)
	ret1, _ := ret[1].(error)
	return ret0, ret1
}

// PayInvoice indicates an expected call of PayInvoice.
func (mr *MockLightningManagerMockRecorder) PayInvoice(arg0 interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "PayInvoice", reflect.TypeOf((*MockLightningManager)(nil).PayInvoice), arg0)
}

// RemoveNode mocks base method.
func (m *MockLightningManager) RemoveNode(arg0 string) error {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "RemoveNode", arg0)
	ret0, _ := ret[0].(error)
	return ret0
}

// RemoveNode indicates an expected call of RemoveNode.
func (mr *MockLightningManagerMockRecorder) RemoveNode(arg0 interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "RemoveNode", reflect.TypeOf((*MockLightningManager)(nil).RemoveNode), arg0)
}

// SendData mocks base method.
func (m *MockLightningManager) SendData(arg0 string, arg1 *comm.DIDCommMsg) error {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "SendData", arg0, arg1)
	ret0, _ := ret[0].(error)
	return ret0
}

// SendData indicates an expected call of SendData.
func (mr *MockLightningManagerMockRecorder) SendData(arg0, arg1 interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "SendData", reflect.TypeOf((*MockLightningManager)(nil).SendData), arg0, arg1)
}

// SignMessage mocks base method.
func (m *MockLightningManager) SignMessage(arg0 []byte) ([]byte, error) {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "SignMessage", arg0)
	ret0, _ := ret[0].([]byte)
	ret1, _ := ret[1].(error)
	return ret0, ret1
}

// SignMessage indicates an expected call of SignMessage.
func (mr *MockLightningManagerMockRecorder) SignMessage(arg0 interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "SignMessage", reflect.TypeOf((*MockLightningManager)(nil).SignMessage), arg0)
}

// Status mocks base method.
func (m *MockLightningManager) Status() ([]lightning.NodeStatus, error) {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "Status")
	ret0, _ := ret[0].([]lightning.NodeStatus)
	ret1, _ := ret[1].(error)
	return ret0, ret1
}

// Status indicates an expected call of Status.
func (mr *MockLightningManagerMockRecorder) Status() *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "Status", reflect.TypeOf((*MockLightningManager)(nil).Status))
}

// Stop mocks base method.
func (m *MockLightningManager) Stop() {
	m.ctrl.T.Helper()
	m.ctrl.Call(m, "Stop")
}

// Stop indicates an expected call of Stop.
func (mr *MockLightningManagerMockRecorder) Stop() *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "Stop", reflect.TypeOf((*MockLightningManager)(nil).Stop))
}

// Subscribe mocks base method.
func (m *MockLightningManager) Subscribe() error {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "Subscribe")
	ret0, _ := ret[0].(error)
	return ret0
}

// Subscribe indicates an expected call of Subscribe.
func (mr *MockLightningManagerMockRecorder) Subscribe() *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "Subscribe", reflect.TypeOf((*MockLightningManager)(nil).Subscribe))
}

// VerifySignature mocks base method.
func (m *MockLightningManager) VerifySignature(arg0, arg1 []byte) (bool, error) {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "VerifySignature", arg0, arg1)
	ret0, _ := ret[0].(bool)
	ret1, _ := ret[1].(error)
	return ret0, ret1
}

// VerifySignature indicates an expected call of VerifySignature.
func (mr *MockLightningManagerMockRecorder) VerifySignature(arg0, arg1 interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "VerifySignature", reflect.TypeOf((*MockLightningManager)(nil).VerifySignature), arg0, arg1)
}
