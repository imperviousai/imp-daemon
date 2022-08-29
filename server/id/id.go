package id

import (
	"context"
	"encoding/json"

	"github.com/imperviousai/freeimp/core"
	id_proto "github.com/imperviousai/freeimp/gen/go/proto/imp/api/id"
	"github.com/imperviousai/freeimp/id"
	"go.uber.org/zap"
)

// GRPC server implementation

type idServer struct {
	id_proto.UnimplementedIDServer
	core core.Core
}

func NewIDServer(c core.Core) id_proto.IDServer {
	return &idServer{
		core: c,
	}
}

func (l *idServer) ResolveDID(ctx context.Context, req *id_proto.ResolveDIDRequest) (*id_proto.ResolveDIDResponse, error) {
	zap.L().Info("[Server] ResolveDID",
		zap.String("did", req.GetDid()),
	)

	didDocument, longFormDID, err := l.core.ResolveDID(req.GetDid())
	if err != nil {
		zap.L().Error("[Server] ResolveDID failed", zap.String("error", err.Error()))
		return nil, err
	}

	bytes, err := json.Marshal(didDocument)
	if err != nil {
		zap.L().Error("[Server] ResolveDID parsing error", zap.String("error", err.Error()))
		return nil, err
	}

	zap.L().Info("[Server] ResolveDID success", zap.String("did_document", string(bytes)))
	return &id_proto.ResolveDIDResponse{
		Document:    string(bytes),
		LongFormDid: longFormDID,
	}, nil
}

func (l *idServer) ListDID(ctx context.Context, req *id_proto.ListDIDRequest) (*id_proto.ListDIDResponse, error) {
	zap.L().Info("[Server] ListDID")

	didDocuments, err := l.core.ListDID()
	if err != nil {
		zap.L().Error("[Server] ListDID failed", zap.String("error", err.Error()))
		return nil, err
	}

	dids := make([]string, 0)
	for _, didDocument := range didDocuments {
		bytes, err := json.Marshal(didDocument)
		if err != nil {
			zap.L().Error("[Server] ListDID parsing error", zap.String("error", err.Error()))
			return nil, err
		}
		dids = append(dids, string(bytes))
	}

	zap.L().Info("[Server] ListDID success", zap.Strings("did_documents", dids))
	return &id_proto.ListDIDResponse{
		Documents: dids,
	}, nil
}

func (l *idServer) CreateDID(ctx context.Context, req *id_proto.CreateDIDRequest) (*id_proto.CreateDIDResponse, error) {
	zap.L().Info("[Server] CreateDID")

	// convert service endpoint request
	serviceEndpoints := make([]id.Service, 0, len(req.GetServiceEndpoints()))
	for _, serviceEndpoint := range req.GetServiceEndpoints() {
		serviceEndpoints = append(serviceEndpoints, id.Service{
			ID:              serviceEndpoint.Id,
			Type:            serviceEndpoint.Type,
			ServiceEndpoint: serviceEndpoint.ServiceEndpoint,
		})
	}

	didUpdateInfo, err := l.core.CreateDID(req.GetType(), serviceEndpoints)
	if err != nil {
		zap.L().Error("[Server] CreateDID failed", zap.String("error", err.Error()))
		return nil, err
	}

	bytes, err := json.Marshal(didUpdateInfo.Document)
	if err != nil {
		zap.L().Error("[Server] CreateDID parsing error", zap.String("error", err.Error()))
		return nil, err
	}

	// Get the seed phrase if available
	seedPhrase, err := l.core.GetSeed()
	if err != nil {
		// do not return error
		// they may have seed phrase already
		// or it's on an old client that did not save this information before
		zap.L().Error("[Server] GetSeed error", zap.String("error", err.Error()))

	}

	zap.L().Info("[Server] CreateDID success",
		zap.String("did_document", string(bytes)),
	)
	return &id_proto.CreateDIDResponse{
		Document:    string(bytes),
		LongFormDid: didUpdateInfo.LongFormDID,
		RecoveryKit: &id_proto.RecoveryKit{
			Did:               didUpdateInfo.DID,
			LongFormDid:       &didUpdateInfo.LongFormDID,
			DidDerivationPath: didUpdateInfo.DIDDerivation,
			KeyDerivations:    didUpdateInfo.KeyDerivations,
			Seed:              seedPhrase,
		},
	}, nil
}

func (l *idServer) ImportDID(ctx context.Context, req *id_proto.ImportDIDRequest) (*id_proto.ImportDIDResponse, error) {
	zap.L().Info("[Server] ImportDID",
		zap.String("document", req.GetDocument()),
		zap.String("longFormDID", req.GetLongFormDid()),
	)

	err := l.core.ImportDID(req.GetDocument(), req.GetLongFormDid())
	if err != nil {
		zap.L().Error("[Server] ImportDID failed", zap.String("error", err.Error()))
		return nil, err
	}

	zap.L().Info("[Server] ImportDID success")
	return &id_proto.ImportDIDResponse{}, nil
}

func (l *idServer) UpdateDID(ctx context.Context, req *id_proto.UpdateDIDRequest) (*id_proto.UpdateDIDResponse, error) {
	zap.L().Info("[Server] UpdateDID",
		zap.String("document", req.GetDocument()),
	)

	didUpdateInfo, err := l.core.UpdateDID(req.GetDocument())
	if err != nil {
		zap.L().Error("[Server] UpdateDID failed", zap.String("error", err.Error()))
		return nil, err
	}

	updatedDidBytes, err := json.Marshal(didUpdateInfo.Document)
	if err != nil {
		zap.L().Error("[Server] CreateDID parsing error", zap.String("error", err.Error()))
		return nil, err
	}

	// Get the seed phrase if available
	seedPhrase, err := l.core.GetSeed()
	if err != nil {
		// do not return error
		// they may have seed phrase already
		// or it's on an old client that did not save this information before
		zap.L().Error("[Server] GetSeed error", zap.String("error", err.Error()))
	}

	zap.L().Info("[Server] UpdateDID success")
	return &id_proto.UpdateDIDResponse{
		Document:    string(updatedDidBytes),
		LongFormDid: didUpdateInfo.LongFormDID,
		RecoveryKit: &id_proto.RecoveryKit{
			Did:               didUpdateInfo.DID,
			LongFormDid:       &didUpdateInfo.LongFormDID,
			DidDerivationPath: didUpdateInfo.DIDDerivation,
			KeyDerivations:    didUpdateInfo.KeyDerivations,
			Seed:              seedPhrase,
		},
	}, nil
}

func (i *idServer) DeleteDID(ctx context.Context, req *id_proto.DeleteDIDRequest) (*id_proto.DeleteDIDResponse, error) {
	zap.L().Info("[Server] DeleteDID",
		zap.String("did", req.GetId()),
	)
	err := i.core.DeleteDID(req.GetId())
	if err != nil {
		return nil, err
	}

	zap.L().Info("[Server] DeleteDID success")
	return &id_proto.DeleteDIDResponse{}, nil
}

func (l *idServer) BackupDID(ctx context.Context, req *id_proto.BackupDIDRequest) (*id_proto.BackupDIDResponse, error) {
	zap.L().Info("[Server] BackupDID",
		zap.String("did", req.GetId()),
	)

	didUpdateInfo, err := l.core.BackupDID(req.GetId())
	if err != nil {
		zap.L().Error("[Server] BackupDID failed", zap.String("error", err.Error()))
		return nil, err
	}

	// Get the seed phrase if available
	seedPhrase, err := l.core.GetSeed()
	if err != nil {
		// do not return error
		// they may have seed phrase already
		// or it's on an old client that did not save this information before
		zap.L().Error("[Server] GetSeed error", zap.String("error", err.Error()))
	}

	zap.L().Info("[Server] BackupDID success")
	return &id_proto.BackupDIDResponse{
		RecoveryKit: &id_proto.RecoveryKit{
			Did:               didUpdateInfo.DID,
			LongFormDid:       &didUpdateInfo.LongFormDID,
			DidDerivationPath: didUpdateInfo.DIDDerivation,
			KeyDerivations:    didUpdateInfo.KeyDerivations,
			Seed:              seedPhrase,
		},
	}, nil
}

func (l *idServer) RecoverDID(ctx context.Context, req *id_proto.RecoverDIDRequest) (*id_proto.RecoverDIDResponse, error) {
	zap.L().Info("[Server] RecoverDID",
		zap.String("did", req.GetRecoveryKit().Did),
	)

	err := l.core.RecoverDID(&id.DIDUpdateInfo{
		DID:            req.GetRecoveryKit().GetDid(),
		LongFormDID:    req.GetRecoveryKit().GetLongFormDid(),
		DIDDerivation:  req.GetRecoveryKit().GetDidDerivationPath(),
		KeyDerivations: req.GetRecoveryKit().GetKeyDerivations(),
	},
		req.GetRecoveryKit().GetSeed(),
		req.GetPassphrase(),
	)
	if err != nil {
		zap.L().Error("[Server] RecoverDID failed", zap.String("error", err.Error()))
		return nil, err
	}

	zap.L().Info("[Server] RecoverDID success")
	return &id_proto.RecoverDIDResponse{}, nil
}
