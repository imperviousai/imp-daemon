package main

import (
	"os"

	"github.com/imperviousai/imp-daemon/cmd"
	"github.com/urfave/cli/v2"
	"go.uber.org/zap"
)

func main() {
	app := &cli.App{
		Name:  "impcli",
		Usage: "A CLI for interacting with imp nodes",
		Commands: []*cli.Command{
			messageCmd,
			lightningCmd,
			keyCmd,
		},
	}

	// Start up the logger
	logger, err := cmd.ConfigureLogger(nil)
	if err != nil {
		zap.L().Panic(err.Error())
	}
	zap.ReplaceGlobals(logger)

	err = app.Run(os.Args)
	if err != nil {
		zap.L().Panic(err.Error())
	}

	err = zap.L().Sync()
	if err != nil {
		return
	}
}
