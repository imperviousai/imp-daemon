package core

func (c *core) AddFile(data []byte, name string, updatable bool) (string, error) {
	return c.ipfs.AddFile(data, name, updatable)
}

func (c *core) RetrieveFile(cid string) ([]byte, error) {

	return c.ipfs.RetrieveFile(cid)
}

func (c *core) ListFiles() ([]string, error) {
	return c.ipfs.ListFiles()
}
