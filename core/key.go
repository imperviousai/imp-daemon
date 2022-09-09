package core

import (
	"errors"

	"go.uber.org/zap"
)

func (c *core) KeyStatus() (string, error) {
	zap.L().Debug("[Core] KeyStatus")
	defer zap.L().Debug("[Core] KeyStatus success")

	// First check DB status
	if !c.dbManager.IsInitialized() {
		return "NOT_INITIALIZED", nil
	}
	if c.dbManager.IsLocked() || c.keyManager.IsLocked() {
		return "LOCKED", nil
	}

	return "READY", nil
}

func (c *core) InitSeed(seedImport string, passphrase string) (string, string, error) {
	zap.L().Debug("[Core] InitSeed")

	// First open the DB with this seed as the passphrase
	err := c.dbManager.Unlock(passphrase)
	if err != nil {
		zap.L().Error("[Core] InitSeed failed to unlock DB with passphrase", zap.String("error", err.Error()))
		return "", "", err
	}

	mnemonic, err := c.keyManager.InitSeed(seedImport, passphrase)
	if err != nil {
		zap.L().Error("[Core] InitSeed failed to create seed with passphrase", zap.String("error", err.Error()))
		return "", "", err
	}

	// After seed is initialized, find the first API created and pass back
	keys, err := c.auth.ListKeys()
	if err != nil {
		return "", "", err
	}
	if len(keys) == 0 {
		return "", "", errors.New("No API Keys, need reinitialization")
	}

	zap.L().Debug("[Core] InitSeed success")
	return mnemonic, keys[0].Key, nil
}

func (c *core) UnlockSeed(passphrase string) error {
	zap.L().Debug("[Core] UnlockSeed")

	// Don't unlock the seed unless it has been initialized first
	if !c.dbManager.IsInitialized() {
		return errors.New("DB not initialized")
	}

	// First open the DB with this seed as the passphrase
	err := c.dbManager.Unlock(passphrase)
	if err != nil {
		zap.L().Error("[Core] UnlockSeed failed to unlock DB with passphrase", zap.String("error", err.Error()))
		return err
	}

	err = c.keyManager.UnlockSeed(passphrase)
	if err != nil {
		zap.L().Error("[Core] UnlockSeed failed to unlock seed with passphrase", zap.String("error", err.Error()))
		return err
	}

	zap.L().Debug("[Core] UnlockSeed success")
	return nil
}

func (c *core) GetSeed() (string, error) {
	zap.L().Debug("[Core] GetSeed")
	return c.keyManager.GetSeed()
}
