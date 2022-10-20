package main

import (
	"github.com/imperviousai/imp-daemon/cmd"
	"github.com/imperviousai/imp-daemon/config"
	"github.com/urfave/cli/v2"
	"go.uber.org/zap"
)

var keyCmd = &cli.Command{
	Name:     "key",
	Category: "key",
	Usage:    "key manager related commands",
	Subcommands: []*cli.Command{
		{
			Name:  "init",
			Usage: "Initialize the master seed",
			Flags: []cli.Flag{
				&cli.StringFlag{Name: "config"},
				&cli.StringFlag{Name: "mnemonic"},
				&cli.StringFlag{Name: "passphrase"},
			},
			Action: keyInitAction,
		},
		{
			Name:  "unlock",
			Usage: "Unlocks the master seed",
			Flags: []cli.Flag{
				&cli.StringFlag{Name: "config"},
				&cli.StringFlag{Name: "passphrase"},
			},
			Action: keyUnlockAction,
		},
	},
}

func keyInitAction(c *cli.Context) error {
	globalConfig, err := config.NewGlobalConfig(c.String("config"), nil)
	if err != nil {
		zap.L().Panic(err.Error())
	}
	core := cmd.ConfigureCore(globalConfig, nil).Core
	if err := core.Start(); err != nil {
		zap.L().Panic(err.Error())
	}

	zap.L().Info("[CLI] InitSeed")
	mnemonic, apiKey, err := core.InitSeed(c.String("mnemonic"), c.String("passphrase"))
	if err != nil {
		zap.L().Error("[CLI] InitSeed failed", zap.String("error", err.Error()))
		return err
	}

	zap.L().Info("[CLI] InitSeed success, BACK THIS UP!", zap.String("mnemonic", mnemonic), zap.String("apiKey", apiKey))

	return nil
}

func keyUnlockAction(c *cli.Context) error {
	globalConfig, err := config.NewGlobalConfig(c.String("config"), nil)
	if err != nil {
		zap.L().Panic(err.Error())
	}
	core := cmd.ConfigureCore(globalConfig, nil).Core
	if err := core.Start(); err != nil {
		zap.L().Panic(err.Error())
	}

	zap.L().Info("[CLI] UnlockSeed")
	_, err = core.UnlockSeed(c.String("passphrase"))
	if err != nil {
		zap.L().Error("[CLI] UnlockSeed failed", zap.String("error", err.Error()))
		return err
	}

	zap.L().Info("[CLI] UnlockSeed success")

	return nil
}
