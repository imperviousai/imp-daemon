package core

func (c *core) GetWebsocketConnections() ([]string, error) {
	return c.didComm.CheckWebsocketConnections()
}
