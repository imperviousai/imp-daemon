package state

import (
	"github.com/imperviousai/imp-daemon/state"
)

//go:generate mockgen --destination=./mock/kv_state_mock.go --package=mock github.com/imperviousai/imp-daemon/contacts/kv KvState

type KvState interface {
	GetKey(key string) (string, error)
	SetKey(key string, value string) error
	DelKey(key string) error
}

type kvState struct {
	db state.DBManager
}

func Kvinit(db state.DBManager) (KvState, error) {
	return &kvState{
		db: db,
	}, nil
}

func (k *kvState) GetKey(key string) (string, error) {
	keyb := []byte(key)
	value, err := k.db.GetKey(keyb)
	if err != nil {
		return "", err
	}
	return value, nil
}

func (k *kvState) SetKey(key string, value string) error {
	keyb := []byte(key)
	valueb := []byte(value)
	err := k.db.SetKey(keyb, valueb)
	if err != nil {
		return err
	}
	return nil
}

func (k *kvState) DelKey(key string) error {
	keyb := []byte(key)
	err := k.db.DelKey(keyb)
	if err != nil {
		return err
	}
	return nil
}
