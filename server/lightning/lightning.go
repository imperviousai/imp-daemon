package lightning

import (
	"context"

	"github.com/imperviousai/freeimp/core"
	lightning_proto "github.com/imperviousai/freeimp/gen/go/proto/imp/api/lightning"
	"go.uber.org/zap"
)

// GRPC server implementation

type lightningServer struct {
	lightning_proto.UnimplementedLightningServer
	core core.Core
}

func NewLightningServer(c core.Core) lightning_proto.LightningServer {
	return &lightningServer{
		core: c,
	}
}

func (l *lightningServer) GenerateInvoice(ctx context.Context, req *lightning_proto.GenerateInvoiceRequest) (*lightning_proto.GenerateInvoiceResponse, error) {
	zap.L().Info("[Server] GenerateInvoice",
		zap.Int64("amount", req.GetAmount()),
		zap.String("memo", req.GetMemo()),
	)

	invoice, err := l.core.GenerateInvoice(req.GetAmount(), req.GetMemo())
	if err != nil {
		zap.L().Error("[Server] GenerateInvoice failed", zap.String("error", err.Error()))
		return nil, err
	}

	zap.L().Info("[Server] GenerateInvoice success", zap.String("invoice", invoice))
	return &lightning_proto.GenerateInvoiceResponse{
		Invoice: invoice,
	}, nil
}

func (l *lightningServer) PayInvoice(ctx context.Context, req *lightning_proto.PayInvoiceRequest) (*lightning_proto.PayInvoiceResponse, error) {
	zap.L().Info("[Server] PayInvoice",
		zap.String("invoice", req.GetInvoice()),
	)

	preimage, err := l.core.PayInvoice(req.GetInvoice())
	if err != nil {
		zap.L().Error("[Server] PayInvoice failed", zap.String("error", err.Error()))
		return nil, err
	}

	zap.L().Info("[Server] PayInvoice success", zap.String("invoice", ""))
	return &lightning_proto.PayInvoiceResponse{
		Preimage: preimage,
	}, nil
}

func (l *lightningServer) CheckInvoice(ctx context.Context, req *lightning_proto.CheckInvoiceRequest) (*lightning_proto.CheckInvoiceResponse, error) {
	zap.L().Info("[Server] CheckInvoice",
		zap.String("invoice", req.GetInvoice()),
	)

	paid, err := l.core.CheckInvoice(req.GetInvoice())
	if err != nil {
		zap.L().Error("[Server] CheckInvoice failed", zap.String("error", err.Error()))
		return nil, err
	}

	zap.L().Info("[Server] CheckInvoice success", zap.Bool("paid", paid))
	return &lightning_proto.CheckInvoiceResponse{
		Paid: paid,
	}, nil
}
