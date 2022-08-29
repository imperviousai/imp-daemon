package core

import auth_state "github.com/imperviousai/imp-daemon/auth/state"

func (c *core) GenerateNewKey(name, description string) (*auth_state.AuthStateModel, error) {
	return c.auth.GenerateNewKey(name, description)
}

func (c *core) ListKeys() ([]*auth_state.AuthStateModel, error) {
	return c.auth.ListKeys()
}

func (c *core) UpdateKey(id int64, name, description string) error {
	return c.auth.UpdateKey(id, name, description)
}

func (c *core) DeleteKey(id int64) error {
	return c.auth.DeleteKey(id)
}
