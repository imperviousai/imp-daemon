package core

import "github.com/imperviousai/freeimp/contacts"

func (c *core) GetContacts() ([]*contacts.ContactInfo, error) {
	return c.contactsManager.GetContacts()
}

func (c *core) GetContact(id int64) (*contacts.ContactInfo, error) {
	return c.contactsManager.GetContact(id)
}

func (c *core) CreateContact(contact *contacts.ContactInfo) (*contacts.ContactInfo, error) {
	return c.contactsManager.CreateContact(contact)
}

func (c *core) CreateContacts(contactsToCreate []*contacts.ContactInfo) ([]*contacts.ContactInfo, error) {
	contactsCreated := make([]*contacts.ContactInfo, 0)
	for _, contact := range contactsToCreate {
		contactCreated, err := c.contactsManager.CreateContact(contact)
		if err != nil {
			return nil, err
		}
		contactsCreated = append(contactsCreated, contactCreated)
	}
	return contactsCreated, nil
}

func (c *core) UpdateContact(contact *contacts.ContactUpdate) (*contacts.ContactInfo, error) {
	return c.contactsManager.UpdateContact(contact)
}

func (c *core) DeleteContact(id int64) error {
	return c.contactsManager.DeleteContact(id)
}
