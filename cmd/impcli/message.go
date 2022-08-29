package main

import (
	"github.com/imperviousai/imp-daemon/cmd"
	"github.com/imperviousai/imp-daemon/config"
	"github.com/urfave/cli/v2"
	"go.uber.org/zap"
)

var messageCmd = &cli.Command{
	Name:     "message",
	Category: "message",
	Usage:    "messaging with another imp node",
	Flags: []cli.Flag{
		&cli.StringFlag{Name: "config"},
		&cli.StringFlag{Name: "to_pubkey"},
		&cli.Int64Flag{Name: "amount"},
		&cli.StringFlag{Name: "msg"},
		&cli.StringFlag{Name: "reply_to_id"},
	},
	Action: messageAction,
}

func messageAction(c *cli.Context) error {
	globalConfig, err := config.NewGlobalConfig(c.String("config"), nil)
	if err != nil {
		zap.L().Panic(err.Error())
	}
	core := cmd.ConfigureCore(globalConfig, nil).Core
	if err := core.Start(); err != nil {
		zap.L().Panic(err.Error())
	}

	zap.L().Info("[CLI] SendMessage",
		zap.String("pubkey", c.String("to_pubkey")),
		zap.String("msg", c.String("msg")),
		zap.String("reply_to_id", c.String("reply_to_id")),
	)
	msgId, err := core.SendMessage(c.String("msg"), c.String("to_pubkey"), c.Int64("amount"), c.String("reply_to_id"))
	if err != nil {
		zap.L().Error("[CLI] SendMessage failed", zap.String("error", err.Error()))
		return err
	}

	zap.L().Info("[CLI] SendMessage success", zap.String("message_id", msgId))
	return nil
}
