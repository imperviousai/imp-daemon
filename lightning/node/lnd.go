package node

import (
	"context"
	"crypto/rand"
	"crypto/x509"
	"encoding/binary"
	"encoding/hex"
	"errors"
	"fmt"
	"os"
	"sort"
	"strconv"
	"sync"
	"time"

	"github.com/imperviousai/imp-daemon/comm"
	"github.com/lightningnetwork/lnd/amp"
	"github.com/lightningnetwork/lnd/lnrpc"
	"github.com/lightningnetwork/lnd/lnrpc/routerrpc"
	"github.com/lightningnetwork/lnd/lnrpc/signrpc"
	"github.com/lightningnetwork/lnd/lnwire"
	"github.com/lightningnetwork/lnd/macaroons"
	"github.com/lightningnetwork/lnd/record"
	"go.uber.org/zap"
	"google.golang.org/grpc"
	"google.golang.org/grpc/credentials"
	"gopkg.in/macaroon.v2"
)

//go:generate mockgen --destination=./mock/lnd/lightningclient_mock.go --package=lnd_mock github.com/lightningnetwork/lnd/lnrpc LightningClient
//go:generate mockgen --destination=./mock/lnd/routerclient_mock.go --package=lnd_mock github.com/lightningnetwork/lnd/lnrpc/routerrpc RouterClient
//go:generate mockgen --destination=./mock/lnd/signerclient_mock.go --package=lnd_mock github.com/lightningnetwork/lnd/lnrpc/signrpc SignerClient

type LndNode interface {
	Node
}

type lndNode struct {
	cfg          *LndConfig
	grpcConn     *grpc.ClientConn
	lndClient    lnrpc.LightningClient
	routerClient routerrpc.RouterClient
	signerClient signrpc.SignerClient
	disconnected bool
}

type LndConfig struct {
	MacaroonPath string
	MacaroonHex  string
	TlsCertPath  string
	TlsCertHex   string
	Pubkey       string
	IpAddress    string
	Port         string
	ShouldListen bool
}

func NewLndNode(cfg *LndConfig) (node LndNode, err error) {
	zap.L().Debug("[LND] NewLndNode being created")

	var tlsCreds credentials.TransportCredentials
	switch {
	case cfg.TlsCertPath != "":
		tlsCreds, err = credentials.NewClientTLSFromFile(cfg.TlsCertPath, "")
		if err != nil {
			zap.L().Error("[LND] NewLndNode failed to process TLS", zap.String("error", err.Error()))
			return nil, errors.New("Cannot get node tls credentials")
		}
	case cfg.TlsCertHex != "":
		cp := x509.NewCertPool()
		cert, err := hex.DecodeString(cfg.TlsCertHex)
		if err != nil {
			zap.L().Error("[LND] NewLndNode failed to parse TLS", zap.String("error", err.Error()))
			return nil, err
		}
		cp.AppendCertsFromPEM(cert)
		tlsCreds = credentials.NewClientTLSFromCert(cp, "")
	default:
		return nil, errors.New("Node tls credentials not found")
	}

	var macaroonBytes []byte
	switch {
	case cfg.MacaroonPath != "":
		macaroonBytes, err = os.ReadFile(cfg.MacaroonPath)
		if err != nil {
			zap.L().Error("[LND] NewLndNode failed to read macaroon", zap.String("error", err.Error()))
			return nil, errors.New("Cannot read macaroon file")
		}
	case cfg.MacaroonHex != "":
		macaroonBytes, err = hex.DecodeString(cfg.MacaroonHex)
		if err != nil {
			zap.L().Error("[LND] NewLndNode failed to parse macaroon", zap.String("error", err.Error()))
			return nil, err
		}
	default:
		return nil, errors.New("Node macaroon not found")
	}

	mac := &macaroon.Macaroon{}
	if err = mac.UnmarshalBinary(macaroonBytes); err != nil {
		zap.L().Error("[LND] NewLndNode failed to process macaroon", zap.String("error", err.Error()))
		return nil, errors.New("Cannot unmarshal macaroon")
	}
	macCreds, err := macaroons.NewMacaroonCredential(mac)
	if err != nil {
		return nil, err
	}
	opts := []grpc.DialOption{
		grpc.WithTransportCredentials(tlsCreds),
		// WithBlock will not allow anything else to happen until connection establishes
		// grpc.WithBlock(),
		grpc.WithPerRPCCredentials(macCreds),
		grpc.WithDefaultCallOptions(
			grpc.MaxCallRecvMsgSize(1*1024*1024*200),
			grpc.MaxCallSendMsgSize(1*1024*1024*200),
		),
	}

	uri := cfg.IpAddress + ":" + cfg.Port
	conn, err := grpc.Dial(uri, opts...)
	if err != nil {
		zap.L().Error("[LND] NewLndNode failed to dial grpc", zap.String("error", err.Error()))
		return nil, errors.New("Cannot dial to lnd")
	}
	client := lnrpc.NewLightningClient(conn)
	router := routerrpc.NewRouterClient(conn)
	signer := signrpc.NewSignerClient(conn)

	// get the pubkey if it is not there already
	if cfg.Pubkey == "" {
		getInfoResp, err := client.GetInfo(context.Background(), &lnrpc.GetInfoRequest{})
		if err != nil {
			return nil, err
		}
		cfg.Pubkey = getInfoResp.GetIdentityPubkey()
	}

	zap.L().Debug("[LND] NewLndNode created", zap.String("pubkey", cfg.Pubkey))
	return &lndNode{
		cfg:          cfg,
		grpcConn:     conn,
		lndClient:    client,
		routerClient: router,
		signerClient: signer,
		disconnected: false,
	}, nil
}

func (l *lndNode) GetInfo() (*lnrpc.GetInfoResponse, error) {
	zap.L().Debug("[LND] GetInfo attempting to get info")

	getInfoResponse, err := l.lndClient.GetInfo(context.Background(), &lnrpc.GetInfoRequest{})
	if err != nil {
		zap.L().Error("[LND] GetInfo failed", zap.String("error", err.Error()))
		return nil, err
	}

	zap.L().Debug("[LND] GetInfo success", zap.Any("info", getInfoResponse))
	return getInfoResponse, nil
}

func (l *lndNode) SignMessage(msg []byte) ([]byte, error) {
	zap.L().Debug("[LND] SignMessage attempting to sign message")

	signedMessageResponse, err := l.lndClient.SignMessage(context.Background(), &lnrpc.SignMessageRequest{
		Msg: msg,
	})
	if err != nil {
		zap.L().Error("[LND] SignMessage failed", zap.String("error", err.Error()))
		return nil, err
	}

	zap.L().Debug("[LND] SignMessage success", zap.String("signature", signedMessageResponse.Signature))
	return []byte(signedMessageResponse.Signature), nil
}

func (l *lndNode) VerifySignature(msg, signature []byte) (bool, error) {
	zap.L().Debug("[LND] VerifySignature",
		zap.ByteString("message", msg),
		zap.ByteString("signature", signature),
	)

	resp, err := l.verifySignatureRequest(msg, signature)
	if err != nil {
		zap.L().Error("[LND] VerifySignature failed", zap.String("error", err.Error()))
		return false, err
	}

	zap.L().Debug("[LND] VerifySignature success", zap.Bool("valid", resp.Valid))
	return resp.Valid, nil
}

func (l *lndNode) VerifySignatureFromPubkey(msg, signature, pubkey []byte) (bool, error) {
	zap.L().Debug("[LND] VerifySignatureFromPubkey",
		// zap.ByteString("message", msg),
		zap.ByteString("signature", signature),
		zap.ByteString("pubkey", pubkey),
	)

	resp, err := l.verifySignatureRequest(msg, signature)
	if err != nil {
		zap.L().Error("[LND] VerifySignatureFromPubkey failed", zap.String("error", err.Error()))
		return false, err
	}

	if !resp.Valid {
		zap.L().Debug("[LND] VerifySignature success but invalid")
		return false, nil
	}

	match := resp.Pubkey == string(pubkey)

	zap.L().Debug("[LND] VerifySignature success", zap.Bool("valid", match))
	return match, nil
}

func (l *lndNode) verifySignatureRequest(msg, signature []byte) (*lnrpc.VerifyMessageResponse, error) {
	return l.lndClient.VerifyMessage(context.Background(), &lnrpc.VerifyMessageRequest{
		Msg:       msg,
		Signature: string(signature),
	})
}

// GetPubkey will get the node's public key.
func (l *lndNode) GetPubkey() string {
	return l.cfg.Pubkey
}

// Disconnect will disconnect safely from the node.
func (l *lndNode) Disconnect() error {
	zap.L().Debug("[LND] Disconnect")

	// TODO, this will probably also end up including
	// channel, subscription shutdown, payment finishing, etc.
	err := l.grpcConn.Close()
	if err != nil {
		zap.L().Error("[LND] Disconnect failed", zap.String("error", err.Error()))
		return errors.New("Disconnect failed")
	}
	l.disconnected = true

	zap.L().Debug("[LND] Disconnect success")
	return nil
}

// ShouldListen indicates if this node should listen to messages
func (l *lndNode) ShouldListen() bool {
	return l.cfg.ShouldListen
}

func (l *lndNode) Subscribe(keysendChan chan comm.IncomingDIDMessage) error {
	zap.L().Debug("[LND] Subscribe")

	go func() {
		for {
			err := l.startInvoiceStream(keysendChan)
			if err != nil {
				if l.disconnected {
					zap.L().Debug("[LND] Invoice stream stopping due to disconnection")
					return
				}
				// Sleep for a little bit and restart stream
				time.Sleep(5 * time.Second)
				continue
			}
			return
		}
	}()

	zap.L().Debug("[LND] Subscribe started")
	return nil
}

func (l *lndNode) startInvoiceStream(keysendChan chan comm.IncomingDIDMessage) error {
	zap.L().Debug("[LND] Starting up lightning invoice stream")

	invoiceStream, err := l.lndClient.SubscribeInvoices(context.Background(), &lnrpc.InvoiceSubscription{})
	if err != nil {
		zap.L().Error(err.Error())
		return err
	}

	zap.L().Debug("[LND] Started invoice stream")
	for {
		invoice, err := invoiceStream.Recv()
		if err != nil {
			zap.L().Error("[LND] Problem reading from invoice stream, restarting...",
				zap.String("error", err.Error()),
			)
			return errors.New("Stream error")
		}
		err = l.processInvoice(invoice, keysendChan)
		if err != nil {
			zap.L().Error("[LND] Failed to process invoice", zap.String("error", err.Error()))
			continue
		}
	}
}

func (l *lndNode) processInvoice(invoice *lnrpc.Invoice, keysendChan chan comm.IncomingDIDMessage) error {
	// We only care about settled invoices
	if invoice.State != lnrpc.Invoice_SETTLED {
		return nil
	}

	zap.L().Debug("[LND] New Invoice update", zap.Uint64("add_invoice", invoice.AddIndex))

	// Parse custom records
	zap.L().Debug("[LND] Grouping up HTLC's",
		// zap.String("htlcs", fmt.Sprintf("%v", invoice.Htlcs)),
		zap.Int("amount", len(invoice.Htlcs)),
	)
	customRecords := groupHtlcCustomRecords(invoice.Htlcs)
	zap.L().Debug("[LND] Grouped up HTLC records",
		// zap.String("custom_records", fmt.Sprintf("%v", customRecords)),
		zap.Int("amount", len(customRecords)),
	)

	for key, msg := range customRecords {
		// Don't process individual known records
		switch key {
		case record.KeySendType:
			continue
		case NodePubkeyKeysendType:
			continue
		case MessageOrderKeysendType:
			continue
		}

		zap.L().Debug("[LND] Keysend received")

		simpleMsg, err := comm.ParseMsgFromBytes(msg, invoice.Value)
		if err != nil {
			return err
		}

		keysendChan <- comm.IncomingDIDMessage{Message: simpleMsg}
	}

	return nil
}

func groupHtlcCustomRecords(htlcList []*lnrpc.InvoiceHTLC) map[uint64][]byte {
	customRecordMaster := make(map[uint64][]byte)

	// First order htlc list correctly
	if len(htlcList) > 1 {
		// TODO Ensure first that nothing here can return an error
		sort.Slice(htlcList, func(i, j int) bool {
			hI := htlcList[i]
			hJ := htlcList[j]

			hIOrderByte, ok := hI.GetCustomRecords()[MessageOrderKeysendType]
			if !ok {
				return false
			}
			hIOrder, err := strconv.Atoi(string(hIOrderByte))
			if err != nil {
				return false
			}

			hJOrderByte, ok := hJ.GetCustomRecords()[MessageOrderKeysendType]
			if !ok {
				return false
			}
			hJOrder, err := strconv.Atoi(string(hJOrderByte))
			if err != nil {
				return false
			}

			return hIOrder < hJOrder
		})
	}

	for _, htlc := range htlcList {
		for key, msg := range htlc.GetCustomRecords() {
			if existingData, ok := customRecordMaster[key]; ok {
				customRecordMaster[key] = append(existingData, msg...)
			} else {
				customRecordMaster[key] = msg
			}
		}
	}

	return customRecordMaster
}

const MAX_CUST_SIZE = 900

func splitHtlcCustomRecords(customRecords map[uint64][]byte) []map[uint64][]byte {
	splitCustomRecords := make([]map[uint64][]byte, 0)
	splitCustomRecords = append(splitCustomRecords, make(map[uint64][]byte))
	splitCustomRecords[0] = make(map[uint64][]byte)

	i := 0
	runningSize := 0
	needNewSplit := false
	for key, msg := range customRecords {
		for {
			if len(msg) == 0 {
				break
			}

			if needNewSplit {
				i++
				splitCustomRecords = append(splitCustomRecords, make(map[uint64][]byte))
				splitCustomRecords[i] = make(map[uint64][]byte)
				runningSize = 0
			}

			originalMessageLength := len(msg)
			possibleRunningSize := runningSize + originalMessageLength
			if possibleRunningSize > MAX_CUST_SIZE {
				// Find cut size for the first part
				cutSize := MAX_CUST_SIZE - runningSize
				splitCustomRecords[i][key] = msg[:cutSize]
				runningSize += len(msg)

				// Cut the msg
				if originalMessageLength != cutSize {
					msg = msg[cutSize:]
				} else {
					msg = []byte{}
				}

				// Increment to a new custom record
				needNewSplit = true
			} else {
				splitCustomRecords[i][key] = msg
				runningSize += len(msg)
				msg = []byte{}
			}
		}
	}

	// Now that we have the order generated, write the iterations
	// into a custom record as well.
	for i := range splitCustomRecords {
		splitCustomRecords[i][MessageOrderKeysendType] = []byte(strconv.Itoa(i))
	}

	return splitCustomRecords
}

// Keysend will send a message through Lightning from the node.
func (l *lndNode) Keysend(pubKey string, msgData []byte, amt int64) error {
	zap.L().Debug("[LND] Amp",
		zap.String("pubkey", pubKey),
		// zap.Any("messages", msgData),
		zap.Int64("amount", amt),
	)

	var feeLimit int64 = 10000
	customRecords := make(map[uint64][]byte)

	// Insert custom message data
	customRecords[MessageKeysendType] = msgData

	// insert pubkey sent from
	customRecords[NodePubkeyKeysendType] = []byte(l.cfg.Pubkey)

	// Payment address for MPP
	var paymentAddr [32]byte
	if _, err := rand.Read(paymentAddr[:]); err != nil {
		zap.L().Error("[LND] Amp failed to create random payment addr", zap.String("error", err.Error()))
		return err
	}
	// Generate random SetID and root share.
	var setID [32]byte
	_, err := rand.Read(setID[:])
	if err != nil {
		return err
	}
	var rootShare [32]byte
	_, err = rand.Read(rootShare[:])
	if err != nil {
		return err
	}

	// Find routes that we can send down
	ctxRoute, cancel := context.WithCancel(context.Background())
	defer cancel()

	// Split the data amongst MPP parts if data is big
	customRecordSplits := splitHtlcCustomRecords(customRecords)
	splits := len(customRecordSplits)

	// Temp limit until we can understand why LND fails if sending payments too fast
	if splits >= 60*8 {
		return fmt.Errorf("Data size not currently supported, max: ~%d bytes", 60*8*MAX_CUST_SIZE)
	}

	if amt < int64(splits) {
		return fmt.Errorf("Need more sats for this message, have: %d, want: %d", amt, splits)
	}
	amtMsat := amt * 1000
	splitAmtMsat := amtMsat / int64(splits)
	remainderAmtMsat := amtMsat % int64(splits)

	// Get routes for the evenly split payments
	routeReq := &lnrpc.QueryRoutesRequest{
		PubKey:  pubKey,
		AmtMsat: splitAmtMsat,
		FeeLimit: &lnrpc.FeeLimit{
			Limit: &lnrpc.FeeLimit_Fixed{
				Fixed: feeLimit,
			},
		},
	}
	zap.L().Debug("[LND] Amp requesting routes")
	routeResp, err := l.lndClient.QueryRoutes(ctxRoute, routeReq)
	if err != nil {
		zap.L().Error("[LND] Amp failed to request route", zap.String("error", err.Error()))
		return err
	}
	if routeResp.GetRoutes() == nil || len(routeResp.GetRoutes()) == 0 {
		zap.L().Error("[LND] Amp failed to find a route", zap.String("error", err.Error()))
		return err
	}
	routes := routeResp.GetRoutes()

	// Now get just one for the last split route
	routeReq = &lnrpc.QueryRoutesRequest{
		PubKey:  pubKey,
		AmtMsat: splitAmtMsat + remainderAmtMsat,
		FeeLimit: &lnrpc.FeeLimit{
			Limit: &lnrpc.FeeLimit_Fixed{
				Fixed: feeLimit,
			},
		},
	}
	zap.L().Debug("[LND] Amp requesting last route")
	routeResp, err = l.lndClient.QueryRoutes(ctxRoute, routeReq)
	if err != nil {
		zap.L().Error("[LND] Amp failed to request last route", zap.String("error", err.Error()))
		return err
	}
	if routeResp.GetRoutes() == nil || len(routeResp.GetRoutes()) == 0 {
		zap.L().Error("[LND] Amp failed to find a route", zap.String("error", err.Error()))
		return err
	}
	lastRoutes := routeResp.GetRoutes()

	zap.L().Debug("[LND] Amp retrieved last split routes")

	// Create the shard tracker
	wireAmt := lnwire.MilliSatoshi(amtMsat)
	shardTracker := amp.NewShardTracker(rootShare, setID, paymentAddr, wireAmt)

	zap.L().Debug("[LND] Amp splitting up payments")
	success := false
	var wg sync.WaitGroup
	for i, customRecordSplit := range customRecordSplits {
		last := i == splits-1

		// If this is the last payment, use routes for it
		splitRoutes := routes
		if last {
			splitRoutes = lastRoutes
		}

		// Create the individual share
		shareId := RandomUint64()
		shareShard, err := shardTracker.NewShard(shareId, last)
		if err != nil {
			return err
		}

		// 60 second MPP context deadline
		ctxDeadline := time.Now().Add(60 * time.Second)

		wg.Add(1)
		go func(i int, wg *sync.WaitGroup, splitRoutes []*lnrpc.Route, customRecordSplit map[uint64][]byte) {
			defer wg.Done()

			// Go through each route, make new attempts if individual share fails
			for attempt, route := range splitRoutes {
				// Stick custom records into route
				if len(route.Hops) == 0 {
					zap.L().Error("[LND] Amp route hops not filled in, trying next route...")
					continue
				}
				lastHop := route.Hops[len(route.Hops)-1]

				// Our records
				// TODO this is deprecated but still required?
				// nolint:staticcheck
				lastHop.TlvPayload = true
				lastHop.CustomRecords = customRecordSplit

				// MPP
				paymentAddr := shareShard.MPP().PaymentAddr()
				lastHop.MppRecord = &lnrpc.MPPRecord{
					TotalAmtMsat: int64(shareShard.MPP().TotalMsat()),
					PaymentAddr:  paymentAddr[:],
				}

				// AMP
				setId := shareShard.AMP().SetID()
				rootShare := shareShard.AMP().RootShare()
				lastHop.AmpRecord = &lnrpc.AMPRecord{
					RootShare:  rootShare[:],
					SetId:      setId[:],
					ChildIndex: shareShard.AMP().ChildIndex(),
				}
				/*
					zap.L().Debug("[LND] lastHop records",
						zap.String("payment_addr", hex.EncodeToString(lastHop.MppRecord.PaymentAddr)),
						zap.String("root_share", hex.EncodeToString(lastHop.AmpRecord.RootShare)),
						zap.String("set_id", hex.EncodeToString(lastHop.AmpRecord.SetId)),
						zap.Uint32("child_index", lastHop.AmpRecord.ChildIndex),
					)
				*/

				route.Hops[len(route.Hops)-1] = lastHop

				// Try to send payment down each route until success
				shareHash := shareShard.Hash()
				sendReq := &routerrpc.SendToRouteRequest{
					PaymentHash: shareHash[:],
					Route:       route,
				}

				ctxSend, cancel := context.WithDeadline(context.Background(), ctxDeadline)
				defer cancel()

				zap.L().Debug("[LND] Amp sending split payment", zap.Int("split", i), zap.Int("attempt", attempt))
				sendResp, err := l.routerClient.SendToRouteV2(ctxSend, sendReq)
				if err != nil {
					zap.L().Error("[LND] Amp failed to initiate send route request, trying next..", zap.String("error", err.Error()))
					return
				}
				zap.L().Debug("[LND] Amp sent split payment, waiting..", zap.Int("split", i), zap.Int("attempt", attempt))

				switch sendResp.Status {

				// Payment succeeded, return
				case lnrpc.HTLCAttempt_SUCCEEDED:
					zap.L().Debug("[LND] Amp split payment succeeded",
						zap.Int("split", i),
						zap.Int("total", splits),
					)
					success = true

					// TODO, we might want to pass back preimage
					// or something to reference the payment.
					// continue
					return

				// Payment failed, try next
				case lnrpc.HTLCAttempt_FAILED:
					zap.L().Error("[LND] Amp failed split payment, trying next route", zap.String("error", sendResp.GetFailure().GetCode().String()))
					continue

				// Payment stuck in flight, TODO track it now
				case lnrpc.HTLCAttempt_IN_FLIGHT:
					zap.L().Error("[LND] Amp in flight still...")
					return

				// Unknown status, continue
				default:
					zap.L().Error("[LND] Amp unknown state")
					return
				}
			}
		}(i, &wg, splitRoutes, customRecordSplit)

		// Seems to be some sort of race condition with LND
		time.Sleep(1 * time.Second / 8)
	}

	// Wait for all the splits or the timeout deadline
	wg.Wait()

	if success {
		zap.L().Debug("[LND] Amp succeeded")
		return nil
	}
	zap.L().Error("[LND] Amp failed payment, no more routes")
	return errors.New("Could not find route")
}

func (l *lndNode) GenerateInvoice(amt int64, memo string) (string, error) {
	zap.L().Debug("[LND] GenerateInvoice",
		zap.String("memo", memo),
		zap.Int64("amount", amt),
	)

	resp, err := l.lndClient.AddInvoice(context.Background(), &lnrpc.Invoice{
		Memo:  memo,
		Value: amt,
	})
	if err != nil {
		zap.L().Error("[LND] GenerateInvoice failed", zap.String("error", err.Error()))
		return "", err
	}

	zap.L().Debug("[LND] GenerateInvoice successful",
		zap.String("invoice", resp.GetPaymentRequest()),
	)
	return resp.GetPaymentRequest(), nil
}

func (l *lndNode) PayInvoice(inv string) (string, error) {
	zap.L().Debug("[LND] PayInvoice",
		zap.String("invoice", inv),
	)

	// TODO track it in case payment was already sent and connection was cut off

	ctx, cancel := context.WithCancel(context.Background())
	defer cancel()

	resp, err := l.routerClient.SendPaymentV2(ctx, &routerrpc.SendPaymentRequest{
		PaymentRequest: inv,
		TimeoutSeconds: 3 * 60, // 3 minutes, TODO make this variable somewhere
		FeeLimitSat:    10000,  // TODO a more reasonable fee limit
	})
	if err != nil {
		zap.L().Error("[LND] PayInvoice failed send", zap.String("error", err.Error()))
		return "", err
	}

	for {
		result, err := resp.Recv()
		if err != nil {
			zap.L().Error("[LND] PayInvoice failed stream", zap.String("error", err.Error()))
			return "", err
		}

		switch result.GetStatus() {

		// Payment succeeded, return
		case lnrpc.Payment_SUCCEEDED:
			zap.L().Debug("[LND] PayInvoice successful",
				zap.String("preimage", result.PaymentPreimage),
			)
			return result.GetPaymentPreimage(), nil

		case lnrpc.Payment_FAILED:
			zap.L().Error("[LND] PayInvoice failed payment", zap.String("error", result.GetFailureReason().String()))
			return "", errors.New("Failed payment")

		default:
			continue
		}
	}

}

func (l *lndNode) CheckInvoice(inv string) (bool, error) {
	zap.L().Debug("[LND] CheckInvoice",
		zap.String("invoice", inv),
	)

	// TODO check invoice amongst those node SENT too

	resp, err := l.lndClient.ListInvoices(context.Background(), &lnrpc.ListInvoiceRequest{
		NumMaxInvoices: 10000, // TODO paging
	})
	if err != nil {
		zap.L().Error("[LND] CheckInvoice failed list", zap.String("error", err.Error()))
		return false, err
	}

	for _, invoice := range resp.Invoices {
		if invoice.PaymentRequest == inv {
			zap.L().Debug("[LND] CheckInvoice found invoice",
				zap.String("invoice", inv),
				zap.Bool("paid", invoice.State == lnrpc.Invoice_SETTLED),
			)
			return invoice.State == lnrpc.Invoice_SETTLED, nil
		}
	}

	zap.L().Error("[LND] CheckInvoice failed, no invoice found")
	return false, errors.New("No invoice found")
}

func (l *lndNode) signCustomRecords(records map[uint64][]byte) ([]byte, error) {
	// order and concatenate the msg bytes first
	concatenatedRecords := concatenateSortedCustomRecords(records)

	// sign the result of that
	return l.SignMessage(concatenatedRecords)
}

// concatenateSortedCustomRecords will concatenate custom records
// in a lightning payment. It will ignore reserved and known records.
func concatenateSortedCustomRecords(records map[uint64][]byte) []byte {
	keys := make([]uint64, 0, len(records))
	concatenatedData := make([]byte, 0)

	for k := range records {

		switch k {

		// Skip records we know about
		case record.KeySendType:
			fallthrough
		case NodePubkeyKeysendType:
			fallthrough
		case MessageOrderKeysendType:
			continue

		// Add record numbers to concat messages for
		default:
			keys = append(keys, k)
		}
	}

	sort.Slice(keys, func(i, j int) bool { return keys[i] < keys[j] })

	for _, k := range keys {
		concatenatedData = append(concatenatedData, records[k]...)
	}

	return concatenatedData
}

func RandomUint64() uint64 {
	buf := make([]byte, 8)
	_, _ = rand.Read(buf) // Always succeeds, no need to check error
	return binary.LittleEndian.Uint64(buf)
}

// GetChannels Get the channels from the connected LND node
func (l *lndNode) GetChannels() (int64, error) {
	resp, err := l.lndClient.ListChannels(context.Background(), &lnrpc.ListChannelsRequest{ActiveOnly: true})
	fmt.Println("GETCHANNELS, number of channels: ", len(resp.Channels))
	var total int64 = 0
	for _, v := range resp.Channels {
		fmt.Println("Each chan local balance: ", v.LocalBalance)
		total += v.LocalBalance
	}
	return total, err
}

// ListPayments Get the payments from the connected LND node
func (l *lndNode) ListPayments() (string, error) {
	var out string
	resp, err := l.lndClient.ListPayments(context.Background(), &lnrpc.ListPaymentsRequest{})
	if err != nil {
		return "", err
	}
	fmt.Println("GetTransactions, number of Transactions: ", len(resp.GetPayments()))

	// t, err := l.lndClient.ListInvoices(context.Background(), &lnrpc.ListInvoiceRequest{}) //

	for _, y := range resp.GetPayments() {
		out += "$_$" + y.String()
	}
	return out, err
}

// ListInvoices Get the invoices from the connected LND node
func (l *lndNode) ListInvoices() (string, error) {
	var out string
	resp, err := l.lndClient.ListInvoices(context.Background(), &lnrpc.ListInvoiceRequest{})
	fmt.Println("GetTransactions, number of Transactions: ", len(resp.Invoices))

	for _, y := range resp.Invoices {
		out += "$_$" + y.String()
	}
	return out, err
}
