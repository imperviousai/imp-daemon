module github.com/imperviousai/imp-daemon

require (
	github.com/decred/dcrd/lru v1.1.1 // indirect
	github.com/ethereum/go-ethereum v1.10.13
	github.com/evanphx/json-patch v0.5.2 // indirect
	github.com/evanphx/json-patch/v5 v5.6.0
	github.com/gibson042/canonicaljson-go v1.0.3
	github.com/go-openapi/loads v0.19.5
	github.com/go-openapi/runtime v0.19.29
	github.com/go-sql-driver/mysql v1.6.0
	github.com/golang-jwt/jwt v3.2.2+incompatible
	github.com/golang/mock v1.6.0
	github.com/google/tink/go v1.6.1 // indirect
	github.com/google/uuid v1.3.0
	github.com/gorilla/websocket v1.5.0
	github.com/grpc-ecosystem/grpc-gateway/v2 v2.5.0
	github.com/hyperledger/aries-framework-go v0.1.7
	github.com/hyperledger/aries-framework-go/component/storageutil v0.0.0-20210914204856-8b82016f473c
	github.com/ipfs/go-cid v0.1.0
	github.com/ipfs/go-ipfs v0.12.2
	github.com/ipfs/go-ipfs-config v0.18.0
	github.com/ipfs/go-ipfs-files v0.0.9
	github.com/ipfs/go-ipld-format v0.2.0
	github.com/ipfs/interface-go-ipfs-core v0.5.2
	github.com/kardianos/service v1.2.1 // indirect
	github.com/lestrrat-go/jwx v1.2.13
	github.com/libp2p/go-libp2p-core v0.11.0
	github.com/lightningnetwork/lnd v0.14.3-beta
	github.com/mattbaird/jsonpatch v0.0.0-20200820163806-098863c1fc24
	github.com/miekg/dns v1.1.48 // indirect
	github.com/mr-tron/base58 v1.2.0
	github.com/multiformats/go-multiaddr v0.4.1
	github.com/multiformats/go-multihash v0.1.0
	github.com/mutecomm/go-sqlcipher/v4 v4.4.2
	github.com/rs/cors v1.8.0
	github.com/square/go-jose/v3 v3.0.0-20200630053402-0a67ce9b0693
	github.com/stretchr/testify v1.7.0
	github.com/tmc/grpc-websocket-proxy v0.0.0-20201229170055-e5319fda7802
	github.com/tyler-smith/go-bip32 v1.0.0
	github.com/tyler-smith/go-bip39 v1.1.0
	github.com/urfave/cli/v2 v2.3.0
	go.uber.org/zap v1.19.1
	golang.org/x/crypto v0.0.0-20220525230936-793ad666bf5e
	golang.org/x/net v0.0.0-20220421235706-1d1ef9303861 // indirect
	golang.org/x/sys v0.0.0-20220422013727-9388b58f7150 // indirect
	golang.org/x/tools v0.1.10 // indirect
	golang.org/x/xerrors v0.0.0-20220411194840-2f41105eb62f // indirect
	google.golang.org/genproto v0.0.0-20210617175327-b9e0b3197ced
	google.golang.org/grpc v1.40.0
	google.golang.org/protobuf v1.28.0
	gopkg.in/macaroon.v2 v2.1.0
	gopkg.in/square/go-jose.v2 v2.6.0
	gopkg.in/yaml.v2 v2.4.0
	modernc.org/sqlite v1.12.0
)

go 1.16

// replace google.golang.org/grpc => google.golang.org/grpc v1.27.0

replace go.etcd.io/etcd => go.etcd.io/etcd/v3 v3.5.0

// github.com/coreos/bbolt => github.com/coreos/bbolt v1.3.2
//replace github.com/coreos/etcd => github.com/coreos/etcd v3.4.14+incompatible
