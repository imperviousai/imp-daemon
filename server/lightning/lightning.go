package lightning

import (
	"context"
	"github.com/imperviousai/imp-daemon/core"
	lightning_proto "github.com/imperviousai/imp-daemon/gen/go/proto/imp/api/lightning"
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

// GetChannels Get the channels from the connected LND node
func (l *lightningServer) GetChannels(ctx context.Context, req *lightning_proto.GetChannelsRequest) (*lightning_proto.GetChannelsResponse, error) {
	zap.L().Info("[Server] Getchannels")
	status, lerr := l.core.CheckLightningStatus() //check to see if we have a Lightning node
	if lerr != nil {
		zap.L().Error("[Server] Status failed", zap.String("error", lerr.Error()))
		return &lightning_proto.GetChannelsResponse{
			Amt: -1,
		}, lerr
	} else if len(status) == 0 {
		return &lightning_proto.GetChannelsResponse{
			Amt: -1,
		}, lerr
	} else {
		resp, err := l.core.GetChannels()
		if err != nil {
			zap.L().Error("[Server] Getchannels failed", zap.String("error", err.Error()))
			return &lightning_proto.GetChannelsResponse{
				Amt: -1,
			}, err
		}

		zap.L().Info("[Server] Getchannels success")
		return &lightning_proto.GetChannelsResponse{
			Amt: resp,
		}, nil
	}

}

// ListPayments Get the transactions from the connected LND node
func (l *lightningServer) ListPayments(ctx context.Context, req *lightning_proto.ListPaymentsRequest) (*lightning_proto.ListPaymentsResponse, error) {
	zap.L().Info("[Server] ListPayments")
	status, lerr := l.core.CheckLightningStatus() //check to see if we have a Lightning node
	if lerr != nil {
		zap.L().Error("[Server] Status failed", zap.String("error", lerr.Error()))
		return &lightning_proto.ListPaymentsResponse{
			Payments: "",
		}, lerr
	} else if len(status) == 0 {
		return &lightning_proto.ListPaymentsResponse{
			Payments: "",
		}, lerr
	} else {
		var resp string
		resp, err := l.core.ListPayments()
		if err != nil {
			zap.L().Error("[Server] GetTransactions failed", zap.String("error", err.Error()))
			return &lightning_proto.ListPaymentsResponse{
				Payments: "",
			}, err
		}

		zap.L().Info("[Server] ListPayments success")
		return &lightning_proto.ListPaymentsResponse{
			Payments: resp,
		}, nil
	}
}

// ListInvoices Get the invoices from the connected LND node
func (l *lightningServer) ListInvoices(ctx context.Context, req *lightning_proto.ListInvoicesRequest) (*lightning_proto.ListInvoicesResponse, error) {
	zap.L().Info("[Server] ListInvoices")
	status, lerr := l.core.CheckLightningStatus() //check to see if we have a Lightning node
	if lerr != nil {
		zap.L().Error("[Server] Status failed", zap.String("error", lerr.Error()))
		return &lightning_proto.ListInvoicesResponse{
			Invoices: "",
		}, nil
	} else if len(status) == 0 {
		return &lightning_proto.ListInvoicesResponse{
			Invoices: "",
		}, nil
	} else {
		resp, err := l.core.ListInvoices()
		if err != nil {
			zap.L().Error("[Server] ListInvoices failed", zap.String("error", err.Error()))
			return &lightning_proto.ListInvoicesResponse{
				Invoices: "",
			}, err
		}

		zap.L().Info("[Server] ListInvoices success")
		return &lightning_proto.ListInvoicesResponse{
			Invoices: resp,
		}, nil
	}

}
