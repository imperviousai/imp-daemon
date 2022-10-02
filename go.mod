module github.com/imperviousai/imp-daemon

require (
	github.com/Masterminds/goutils v1.1.1 // indirect
	github.com/Masterminds/semver v1.5.0 // indirect
	github.com/Masterminds/sprig v2.22.0+incompatible // indirect
	github.com/aokoli/goutils v1.1.1 // indirect
	github.com/boltdb/bolt v1.3.1 // indirect
	github.com/decred/dcrd/lru v1.1.1 // indirect
	github.com/envoyproxy/protoc-gen-validate v0.6.11 // indirect
	github.com/ethereum/go-ethereum v1.10.13
	github.com/evanphx/json-patch v0.5.2 // indirect
	github.com/evanphx/json-patch/v5 v5.6.0
	github.com/frankban/quicktest v1.14.0 // indirect
	github.com/gibson042/canonicaljson-go v1.0.3
	github.com/go-openapi/loads v0.19.5
	github.com/go-openapi/runtime v0.19.29
	github.com/go-sql-driver/mysql v1.6.0
	github.com/gobuffalo/packr/v2 v2.2.0
	github.com/golang-jwt/jwt v3.2.2+incompatible
	github.com/golang/mock v1.6.0
	github.com/golang/protobuf v1.5.2 // indirect
	github.com/google/tink/go v1.6.1 // indirect
	github.com/google/uuid v1.3.0
	github.com/gorilla/mux v1.8.0
	github.com/gorilla/websocket v1.5.0
	github.com/grpc-ecosystem/grpc-gateway/v2 v2.11.3
	github.com/huandu/xstrings v1.3.2 // indirect
	github.com/hyperledger/aries-framework-go v0.1.7
	github.com/hyperledger/aries-framework-go/component/storageutil v0.0.0-20210914204856-8b82016f473c
	github.com/imdario/mergo v0.3.13 // indirect
	github.com/lestrrat-go/jwx v1.2.13
	github.com/lightningnetwork/lnd v0.14.3-beta
	github.com/mattbaird/jsonpatch v0.0.0-20200820163806-098863c1fc24
	github.com/mattn/go-isatty v0.0.13 // indirect
	github.com/miekg/dns v1.1.48 // indirect
	github.com/mitchellh/copystructure v1.2.0 // indirect
	github.com/mr-tron/base58 v1.2.0
	github.com/multiformats/go-multibase v0.0.3 // indirect
	github.com/multiformats/go-multihash v0.1.0
	github.com/mutecomm/go-sqlcipher/v4 v4.4.2
	github.com/mwitkow/go-proto-validators v0.3.2 // indirect
	github.com/prometheus/common v0.30.0 // indirect
	github.com/prometheus/procfs v0.7.3 // indirect
	github.com/pseudomuto/protoc-gen-doc v1.5.1 // indirect
	github.com/pseudomuto/protokit v0.2.1 // indirect
	github.com/rs/cors v1.8.0
	github.com/square/go-jose/v3 v3.0.0-20200630053402-0a67ce9b0693
	github.com/stretchr/testify v1.7.0
	github.com/tmc/grpc-websocket-proxy v0.0.0-20201229170055-e5319fda7802
	github.com/tyler-smith/go-bip32 v1.0.0
	github.com/tyler-smith/go-bip39 v1.1.0
	github.com/urfave/cli v1.22.4 // indirect
	github.com/urfave/cli/v2 v2.3.0
	go.etcd.io/bbolt v1.3.6 // indirect
	go.uber.org/atomic v1.9.0 // indirect
	go.uber.org/goleak v1.1.11 // indirect
	go.uber.org/multierr v1.7.0 // indirect
	go.uber.org/zap v1.19.1
	golang.org/x/crypto v0.0.0-20220926161630-eccd6366d1be
	google.golang.org/genproto v0.0.0-20220930163606-c98284e70a91
	google.golang.org/grpc v1.49.0
	google.golang.org/grpc/cmd/protoc-gen-go-grpc v1.2.0 // indirect
	google.golang.org/protobuf v1.28.1
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
