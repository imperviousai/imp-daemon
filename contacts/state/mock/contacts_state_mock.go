// Code generated by MockGen. DO NOT EDIT.
// Source: github.com/imperviousai/imp-daemon/contacts/state (interfaces: ContactsState)

// Package mock is a generated GoMock package.
package mock

import (
	reflect "reflect"

	gomock "github.com/golang/mock/gomock"
	state "github.com/imperviousai/imp-daemon/contacts/state"
)

// MockContactsState is a mock of ContactsState interface.
type MockContactsState struct {
	ctrl     *gomock.Controller
	recorder *MockContactsStateMockRecorder
}

// MockContactsStateMockRecorder is the mock recorder for MockContactsState.
type MockContactsStateMockRecorder struct {
	mock *MockContactsState
}

// NewMockContactsState creates a new mock instance.
func NewMockContactsState(ctrl *gomock.Controller) *MockContactsState {
	mock := &MockContactsState{ctrl: ctrl}
	mock.recorder = &MockContactsStateMockRecorder{mock}
	return mock
}

// EXPECT returns an object that allows the caller to indicate expected use.
func (m *MockContactsState) EXPECT() *MockContactsStateMockRecorder {
	return m.recorder
}

// DeleteContact mocks base method.
func (m *MockContactsState) DeleteContact(arg0 int64) error {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "DeleteContact", arg0)
	ret0, _ := ret[0].(error)
	return ret0
}

// DeleteContact indicates an expected call of DeleteContact.
func (mr *MockContactsStateMockRecorder) DeleteContact(arg0 interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "DeleteContact", reflect.TypeOf((*MockContactsState)(nil).DeleteContact), arg0)
}

// FindContact mocks base method.
func (m *MockContactsState) FindContact(arg0 int64) (*state.ContactState, error) {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "FindContact", arg0)
	ret0, _ := ret[0].(*state.ContactState)
	ret1, _ := ret[1].(error)
	return ret0, ret1
}

// FindContact indicates an expected call of FindContact.
func (mr *MockContactsStateMockRecorder) FindContact(arg0 interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "FindContact", reflect.TypeOf((*MockContactsState)(nil).FindContact), arg0)
}

// ListContacts mocks base method.
func (m *MockContactsState) ListContacts() ([]*state.ContactState, error) {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "ListContacts")
	ret0, _ := ret[0].([]*state.ContactState)
	ret1, _ := ret[1].(error)
	return ret0, ret1
}

// ListContacts indicates an expected call of ListContacts.
func (mr *MockContactsStateMockRecorder) ListContacts() *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "ListContacts", reflect.TypeOf((*MockContactsState)(nil).ListContacts))
}

// SaveContact mocks base method.
func (m *MockContactsState) SaveContact(arg0 *state.ContactState) (int64, error) {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "SaveContact", arg0)
	ret0, _ := ret[0].(int64)
	ret1, _ := ret[1].(error)
	return ret0, ret1
}

// SaveContact indicates an expected call of SaveContact.
func (mr *MockContactsStateMockRecorder) SaveContact(arg0 interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "SaveContact", reflect.TypeOf((*MockContactsState)(nil).SaveContact), arg0)
}

// UpdateContact mocks base method.
func (m *MockContactsState) UpdateContact(arg0 *state.ContactState) error {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "UpdateContact", arg0)
	ret0, _ := ret[0].(error)
	return ret0
}

// UpdateContact indicates an expected call of UpdateContact.
func (mr *MockContactsStateMockRecorder) UpdateContact(arg0 interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "UpdateContact", reflect.TypeOf((*MockContactsState)(nil).UpdateContact), arg0)
}
