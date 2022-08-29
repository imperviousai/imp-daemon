// Code generated by MockGen. DO NOT EDIT.
// Source: github.com/ipfs/interface-go-ipfs-core/path (interfaces: Resolved)

// Package resolved_mock is a generated GoMock package.
package resolved_mock

import (
	reflect "reflect"

	gomock "github.com/golang/mock/gomock"
	cid "github.com/ipfs/go-cid"
)

// MockResolved is a mock of Resolved interface.
type MockResolved struct {
	ctrl     *gomock.Controller
	recorder *MockResolvedMockRecorder
}

// MockResolvedMockRecorder is the mock recorder for MockResolved.
type MockResolvedMockRecorder struct {
	mock *MockResolved
}

// NewMockResolved creates a new mock instance.
func NewMockResolved(ctrl *gomock.Controller) *MockResolved {
	mock := &MockResolved{ctrl: ctrl}
	mock.recorder = &MockResolvedMockRecorder{mock}
	return mock
}

// EXPECT returns an object that allows the caller to indicate expected use.
func (m *MockResolved) EXPECT() *MockResolvedMockRecorder {
	return m.recorder
}

// Cid mocks base method.
func (m *MockResolved) Cid() cid.Cid {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "Cid")
	ret0, _ := ret[0].(cid.Cid)
	return ret0
}

// Cid indicates an expected call of Cid.
func (mr *MockResolvedMockRecorder) Cid() *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "Cid", reflect.TypeOf((*MockResolved)(nil).Cid))
}

// IsValid mocks base method.
func (m *MockResolved) IsValid() error {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "IsValid")
	ret0, _ := ret[0].(error)
	return ret0
}

// IsValid indicates an expected call of IsValid.
func (mr *MockResolvedMockRecorder) IsValid() *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "IsValid", reflect.TypeOf((*MockResolved)(nil).IsValid))
}

// Mutable mocks base method.
func (m *MockResolved) Mutable() bool {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "Mutable")
	ret0, _ := ret[0].(bool)
	return ret0
}

// Mutable indicates an expected call of Mutable.
func (mr *MockResolvedMockRecorder) Mutable() *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "Mutable", reflect.TypeOf((*MockResolved)(nil).Mutable))
}

// Namespace mocks base method.
func (m *MockResolved) Namespace() string {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "Namespace")
	ret0, _ := ret[0].(string)
	return ret0
}

// Namespace indicates an expected call of Namespace.
func (mr *MockResolvedMockRecorder) Namespace() *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "Namespace", reflect.TypeOf((*MockResolved)(nil).Namespace))
}

// Remainder mocks base method.
func (m *MockResolved) Remainder() string {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "Remainder")
	ret0, _ := ret[0].(string)
	return ret0
}

// Remainder indicates an expected call of Remainder.
func (mr *MockResolvedMockRecorder) Remainder() *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "Remainder", reflect.TypeOf((*MockResolved)(nil).Remainder))
}

// Root mocks base method.
func (m *MockResolved) Root() cid.Cid {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "Root")
	ret0, _ := ret[0].(cid.Cid)
	return ret0
}

// Root indicates an expected call of Root.
func (mr *MockResolvedMockRecorder) Root() *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "Root", reflect.TypeOf((*MockResolved)(nil).Root))
}

// String mocks base method.
func (m *MockResolved) String() string {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "String")
	ret0, _ := ret[0].(string)
	return ret0
}

// String indicates an expected call of String.
func (mr *MockResolvedMockRecorder) String() *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "String", reflect.TypeOf((*MockResolved)(nil).String))
}
