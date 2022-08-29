package main

import (
	"github.com/imperviousai/freeimp/cmd"
	"github.com/imperviousai/freeimp/config"
	"github.com/urfave/cli/v2"
	"go.uber.org/zap"
)

var lightningCmd = &cli.Command{
	Name:     "lightning",
	Category: "lightning",
	Usage:    "manual lightning related commands",
	Subcommands: []*cli.Command{
		{
			Name:  "invoice",
			Usage: "get an invoice from your lightning node",
			Flags: []cli.Flag{
				&cli.StringFlag{Name: "config"},
				&cli.Int64Flag{Name: "amt"},
				&cli.StringFlag{Name: "memo"},
			},
			Action: lightningGenerateinvoiceAction,
		},
		{
			Name:  "pay",
			Usage: "pay an invoice from your lightning node",
			Flags: []cli.Flag{
				&cli.StringFlag{Name: "config"},
				&cli.StringFlag{Name: "invoice"},
			},
			Action: lightningPayinvoiceAction,
		},
	},
}

func lightningGenerateinvoiceAction(c *cli.Context) error {
	globalConfig, err := config.NewGlobalConfig(c.String("config"), nil)
	if err != nil {
		zap.L().Panic(err.Error())
	}
	core := cmd.ConfigureCore(globalConfig, nil).Core
	if err := core.Start(); err != nil {
		zap.L().Panic(err.Error())
	}

	zap.L().Info("[CLI] GenerateInvoice",
		zap.String("amount", c.String("amt")),
		zap.String("memo", c.String("memo")),
	)
	invoice, err := core.GenerateInvoice(c.Int64("amt"), c.String("memo"))
	if err != nil {
		zap.L().Error("[CLI] Generateinvoice failed", zap.String("error", err.Error()))
		return err
	}

	zap.L().Info("[CLI] GenerateInvoice success", zap.String("invoice", invoice))

	return nil
}

func lightningPayinvoiceAction(c *cli.Context) error {
	globalConfig, err := config.NewGlobalConfig(c.String("config"), nil)
	if err != nil {
		zap.L().Panic(err.Error())
	}
	core := cmd.ConfigureCore(globalConfig, nil).Core
	if err := core.Start(); err != nil {
		zap.L().Panic(err.Error())
	}

	zap.L().Info("[CLI] PayInvoice",
		zap.String("invoice", c.String("invoice")),
	)
	preimage, err := core.PayInvoice(c.String("invoice"))
	if err != nil {
		zap.L().Error("[CLI] PayInvoice failed", zap.String("error", err.Error()))
		return err
	}

	zap.L().Info("[CLI] PayInvoice success", zap.String("preimage", preimage))

	return nil
}
