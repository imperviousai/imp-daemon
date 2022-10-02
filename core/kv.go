package core

import (
	"go.uber.org/zap"
)

func (c *core) GetKey(key string) (string, error) {
	zap.L().Debug("[Core] GetKey")
	value, err := c.kvManager.GetKey(key)
	if err != nil {
		zap.L().Error("[Core] GetKey failed", zap.String("error", err.Error()))
	}
	return value, nil
}

func (c *core) SetKey(key string, value string) error {
	zap.L().Debug("[Core] SetKey")
	err := c.kvManager.SetKey(key, value)
	if err != nil {
		zap.L().Error("[Core] SetKey failed", zap.String("error", err.Error()))
	}
	return nil
}

func (c *core) DelKey(key string) error {
	zap.L().Debug("[Core] DelKey")
	err := c.kvManager.DelKey(key)
	if err != nil {
		zap.L().Error("[Core] DelKey failed", zap.String("error", err.Error()))
	}
	return nil
}
