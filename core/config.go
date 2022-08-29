package core

import "github.com/imperviousai/imp-daemon/config"

func (c *core) SaveLightningNodeConfig(node config.Lnd) error {
	cfg := c.globalConfig.GetConfig()
	cfg.Lightning.LndNode = node
	c.globalConfig.SaveConfig(cfg)
	return c.globalConfig.WriteConfig()
}

func (c *core) SaveIONConfig(ionNode config.ION) error {
	cfg := c.globalConfig.GetConfig()
	cfg.ION = ionNode
	c.globalConfig.SaveConfig(cfg)
	return c.globalConfig.WriteConfig()
}

func (c *core) GetLightningNodeConfig() (config.Lnd, error) {
	return c.globalConfig.GetConfig().Lightning.LndNode, nil
}

func (c *core) GetIONConfig() (config.ION, error) {
	return c.globalConfig.GetConfig().ION, nil
}
