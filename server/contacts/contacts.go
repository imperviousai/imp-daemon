package contacts

import (
	"context"

	"github.com/imperviousai/freeimp/contacts"
	"github.com/imperviousai/freeimp/core"
	contacts_proto "github.com/imperviousai/freeimp/gen/go/proto/imp/api/contacts"
	"go.uber.org/zap"
)

// GRPC server implementation

type contactsServer struct {
	contacts_proto.UnimplementedContactsServer
	core core.Core
}

func NewContactsServer(c core.Core) contacts_proto.ContactsServer {
	return &contactsServer{
		core: c,
	}
}

func (m *contactsServer) GetContactsList(ctx context.Context, req *contacts_proto.GetContactsListRequest) (*contacts_proto.GetContactsListResponse, error) {
	zap.L().Info("[Server] GetContactsList")

	contacts, err := m.core.GetContacts()
	if err != nil {
		zap.L().Error("[Server] GetContactsList failed", zap.String("error", err.Error()))
		return nil, err
	}
	zap.L().Info("[Server] GetContactsList success")

	contactsList := make([]*contacts_proto.Contact, 0)
	for _, internalContact := range contacts {
		contactsList = append(contactsList, convertContactToProto(internalContact))
	}

	return &contacts_proto.GetContactsListResponse{
		Contacts: contactsList,
	}, nil
}

func (m *contactsServer) GetContact(ctx context.Context, req *contacts_proto.GetContactRequest) (*contacts_proto.GetContactResponse, error) {
	zap.L().Info("[Server] GetContact")

	contact, err := m.core.GetContact(req.GetId())
	if err != nil {
		zap.L().Error("[Server] GetContact failed", zap.String("error", err.Error()))
		return nil, err
	}
	zap.L().Info("[Server] GetContact success")

	return &contacts_proto.GetContactResponse{
		Contact: convertContactToProto(contact),
	}, nil
}

func (m *contactsServer) CreateContact(ctx context.Context, req *contacts_proto.CreateContactRequest) (*contacts_proto.CreateContactResponse, error) {
	zap.L().Info("[Server] CreateContact")

	contact, err := m.core.CreateContact(convertProtoToContact(req.GetContact()))
	if err != nil {
		zap.L().Error("[Server] CreateContact failed", zap.String("error", err.Error()))
		return nil, err
	}
	zap.L().Info("[Server] CreateContact success")

	return &contacts_proto.CreateContactResponse{
		Contact: convertContactToProto(contact),
	}, nil
}

func (m *contactsServer) CreateContacts(ctx context.Context, req *contacts_proto.CreateContactsRequest) (*contacts_proto.CreateContactsResponse, error) {
	zap.L().Info("[Server] CreateContacts", zap.Any("contacts", req.GetContacts()))

	convertedContacts := convertProtosToContacts(req.GetContacts())
	contacts, err := m.core.CreateContacts(convertedContacts)
	if err != nil {
		zap.L().Error("[Server] CreateContacts failed", zap.String("error", err.Error()))
		return nil, err
	}
	zap.L().Info("[Server] CreateContacts success")

	return &contacts_proto.CreateContactsResponse{
		Contacts: convertContactsToProtos(contacts),
	}, nil
}

func (m *contactsServer) UpdateContact(ctx context.Context, req *contacts_proto.UpdateContactRequest) (*contacts_proto.UpdateContactResponse, error) {
	zap.L().Info("[Server] UpdateContact")

	contact, err := m.core.UpdateContact(convertProtoToUpdateContact(req.GetContact()))
	if err != nil {
		zap.L().Error("[Server] UpdateContact failed", zap.String("error", err.Error()))
		return nil, err
	}
	zap.L().Info("[Server] UpdateContact success")

	return &contacts_proto.UpdateContactResponse{
		Contact: convertContactToProto(contact),
	}, nil
}

func (m *contactsServer) DeleteContact(ctx context.Context, req *contacts_proto.DeleteContactRequest) (*contacts_proto.DeleteContactResponse, error) {
	zap.L().Info("[Server] DeleteContact")

	err := m.core.DeleteContact(req.GetId())
	if err != nil {
		zap.L().Error("[Server] DeleteContact failed", zap.String("error", err.Error()))
		return nil, err
	}
	zap.L().Info("[Server] DeleteContact success")

	return &contacts_proto.DeleteContactResponse{}, nil
}

func convertContactsToProtos(internal []*contacts.ContactInfo) []*contacts_proto.Contact {
	if len(internal) == 0 {
		return nil
	}

	contactsConverted := make([]*contacts_proto.Contact, 0, len(internal))
	for _, contact := range internal {
		contactConverted := convertContactToProto(contact)
		contactsConverted = append(contactsConverted, contactConverted)
	}

	return contactsConverted
}

func convertContactToProto(internal *contacts.ContactInfo) *contacts_proto.Contact {
	if internal == nil {
		return nil
	}
	return &contacts_proto.Contact{
		Id:           internal.Id,
		Did:          internal.DID,
		DidDocument:  internal.DIDDocument,
		Name:         internal.Name,
		UserDID:      internal.UserDID,
		HasContacted: internal.HasContacted,
		Metadata:     internal.Metadata,
	}
}

func convertProtosToContacts(internal []*contacts_proto.Contact) []*contacts.ContactInfo {
	if len(internal) == 0 {
		return nil
	}
	contactsConverted := make([]*contacts.ContactInfo, 0, len(internal))
	for _, contact := range internal {
		contactConverted := convertProtoToContact(contact)
		contactsConverted = append(contactsConverted, contactConverted)
	}

	return contactsConverted
}

func convertProtoToContact(internal *contacts_proto.Contact) *contacts.ContactInfo {
	if internal == nil {
		return nil
	}
	return &contacts.ContactInfo{
		Id:           internal.Id,
		DID:          internal.Did,
		DIDDocument:  internal.DidDocument,
		Name:         internal.Name,
		UserDID:      internal.UserDID,
		HasContacted: internal.HasContacted,
		Metadata:     internal.Metadata,
	}
}

func convertProtoToUpdateContact(internal *contacts_proto.ContactUpdate) *contacts.ContactUpdate {
	if internal == nil {
		return nil
	}
	return &contacts.ContactUpdate{
		Id:       internal.Id,
		DID:      internal.Did,
		Name:     internal.Name,
		Metadata: internal.Metadata,
	}
}
