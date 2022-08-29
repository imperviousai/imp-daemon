package ipfs

import (
	"context"

	"github.com/imperviousai/imp-daemon/core"
	ipfs_proto "github.com/imperviousai/imp-daemon/gen/go/proto/imp/api/ipfs"
	"go.uber.org/zap"
)

// GRPC server implementation

type ipfsServer struct {
	ipfs_proto.UnimplementedIPFSServer
	core core.Core
}

func NewIPFSServer(c core.Core) ipfs_proto.IPFSServer {
	return &ipfsServer{
		core: c,
	}
}

func (l *ipfsServer) AddFile(ctx context.Context, req *ipfs_proto.AddFileRequest) (*ipfs_proto.AddFileResponse, error) {
	zap.L().Info("[Server] AddFile",
		zap.String("name", req.GetName()),
	)

	cid, err := l.core.AddFile(req.GetData(), req.GetName(), req.GetUpdatable())
	if err != nil {
		zap.L().Error("[Server] AddFile failed", zap.String("error", err.Error()))
		return nil, err
	}

	zap.L().Info("[Server] AddFile success", zap.String("cid", cid))
	return &ipfs_proto.AddFileResponse{
		Cid: cid,
	}, nil
}

func (l *ipfsServer) GetFile(ctx context.Context, req *ipfs_proto.GetFileRequest) (*ipfs_proto.GetFileResponse, error) {
	zap.L().Info("[Server] GetFile",
		zap.String("protocol", req.GetProtocol()),
		zap.String("cid", req.GetCid()),
	)

	// Handle if protocol is not specified
	cid := ""
	if req.GetProtocol() != "" {
		cid = "/" + req.GetProtocol() + "/"
	}

	cid += req.GetCid()

	data, err := l.core.RetrieveFile(cid)
	if err != nil {
		zap.L().Error("[Server] GetFile failed", zap.String("error", err.Error()))
		return nil, err
	}

	zap.L().Info("[Server] GetFile success")
	return &ipfs_proto.GetFileResponse{
		Data: data,
	}, nil
}

func (l *ipfsServer) ListFiles(ctx context.Context, req *ipfs_proto.ListFilesRequest) (*ipfs_proto.ListFilesResponse, error) {
	zap.L().Info("[Server] ListFiles")

	files, err := l.core.ListFiles()
	if err != nil {
		zap.L().Error("[Server] ListFiles failed", zap.String("error", err.Error()))
		return nil, err
	}

	zap.L().Info("[Server] ListFiles success")
	return &ipfs_proto.ListFilesResponse{
		Files: files,
	}, nil
}
