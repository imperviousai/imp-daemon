package kv

import (
	kv_state "github.com/imperviousai/imp-daemon/kv/state"
	"github.com/imperviousai/imp-daemon/state"
	"go.uber.org/zap"
)

//go:generate mockgen --destination=./mock/kv_mock.go --package=mock github.com/imperviousai/imp-daemon/kv Kv

type KvManager interface {
	GetKey(key string) (string, error)
	SetKey(key string, value string) error
	DelKey(key string) error
}

type kvManager struct {
	state kv_state.KvState
}

type Config struct {
	Kvdb state.DBManager
}

func New(cfg *Config) (KvManager, error) {
	kvstate, err := kv_state.Kvinit(cfg.Kvdb)
	if err != nil {
		return nil, err
	}
	return &kvManager{
		state: kvstate,
	}, nil

}

func (k *kvManager) GetKey(key string) (string, error) {
	zap.L().Debug("[kv/kv] GetKey")
	value, err := k.state.GetKey(key)
	if err != nil {
		return "", err
	}
	return value, nil
}

func (k *kvManager) SetKey(key string, value string) error {
	zap.L().Debug("[kv/kv] SetKey")
	err := k.state.SetKey(key, value)
	if err != nil {
		return err
	}
	return nil
}

func (k *kvManager) DelKey(key string) error {
	zap.L().Debug("[kv/kv] DelKey")
	err := k.state.DelKey(key)
	if err != nil {
		return err
	}
	return nil
}
