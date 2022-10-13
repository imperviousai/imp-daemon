package core

import (
	"github.com/imperviousai/imp-daemon/lightning"
	"go.uber.org/zap"
)

func (c *core) SignMessage(msg []byte) ([]byte, error) {
	zap.L().Debug("[Core] SignMessage",
		zap.ByteString("message", msg),
	)

	signature, err := c.lightningManager.SignMessage(msg)
	if err != nil {
		zap.L().Error("[Core] SignMessage failed", zap.String("error", err.Error()))
		return nil, err
	}

	zap.L().Debug("[Core] SignMessage success", zap.ByteString("signature", signature))
	return signature, nil
}

func (c *core) GenerateInvoice(amt int64, memo string) (string, error) {
	zap.L().Debug("[Core] GenerateInvoice",
		zap.String("memo", memo),
		zap.Int64("amount", amt),
	)

	invoice, err := c.lightningManager.GenerateInvoice(amt, memo)
	if err != nil {
		zap.L().Error("[Core] GenerateInvoice failed", zap.String("error", err.Error()))
		return "", err
	}

	zap.L().Debug("[Core] GenerateInvoice success", zap.String("invoice", invoice))
	return invoice, nil
}

func (c *core) PayInvoice(invoice string) (string, error) {
	zap.L().Debug("[Core] PayInvoice",
		zap.String("invoice", invoice),
	)

	preimage, err := c.lightningManager.PayInvoice(invoice)
	if err != nil {
		zap.L().Error("[Core] GenerateInvoice failed", zap.String("error", err.Error()))
		return "", err
	}

	zap.L().Debug("[Core] PayInvoice success", zap.String("preimage", preimage))
	return preimage, nil
}

func (c *core) CheckInvoice(invoice string) (bool, error) {
	zap.L().Debug("[Core] CheckInvoice",
		zap.String("invoice", invoice),
	)

	paid, err := c.lightningManager.CheckInvoice(invoice)
	if err != nil {
		zap.L().Error("[Core] CheckInvoice failed", zap.String("error", err.Error()))
		return false, err
	}

	zap.L().Debug("[Core] CheckInvoice success", zap.Bool("paid", paid))
	return paid, nil
}

func (c *core) CheckLightningStatus() ([]lightning.NodeStatus, error) {
	zap.L().Debug("[Core] CheckStatus")

	status, err := c.lightningManager.Status()
	if err != nil {
		zap.L().Error("[Core] CheckStatus failed", zap.String("error", err.Error()))
		return nil, err
	}

	zap.L().Debug("[Core] CheckStatus success", zap.Any("status", status))
	return status, nil
}

// GetChannels Get the channels from the connected LND node
func (c *core) GetChannels() (int64, error) {
	zap.L().Debug("[Core] Getchannels")

	resp, err := c.lightningManager.GetChannels()
	if err != nil {
		zap.L().Error("[Core] GetChannels failed", zap.String("error", err.Error()))
		return resp, err
	}
	zap.L().Debug("[Core] GetChannels success")
	return resp, nil

}

// GetTransactions Get the transactions from the connected LND node
func (c *core) GetTransactions() (string, error) {
	zap.L().Debug("[Core] Getchannels")

	resp, err := c.lightningManager.GetTransactions()
	if err != nil {
		zap.L().Error("[Core] GetTransactions failed", zap.String("error", err.Error()))
		return resp, err
	}
	zap.L().Debug("[Core] GetTransactions success")
	return resp, nil

}
