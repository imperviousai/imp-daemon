.PHONY: proto lightning id ipfs relay key contacts config auth

### Proto Generation ###

PROTOC_GEN_GO := $(GOPATH)/bin/protoc-gen-go
PROTOC_GEN_GRPC_GATEWAY := $(GOPATH)/bin/protoc-gen-grpc-gateway
PROTOC_GEN_OPENAPIV2 := $(GOPATH)/bin/protoc-gen-openapiv2
PROTOC_GEN_GO_GRPC := $(GOPATH)/bin/protoc-gen-go-grpc
PROTOC_GEN_DOC := $(GOPATH)/bin/protoc-gen-doc
PROTOC := $(shell which protoc)

# If protoc isn't on the path, set it to a target that's never up to date, so
# the install command always runs.
ifeq ($(PROTOC),)
    PROTOC = must-rebuild
endif

# Figure out which machine we're running on.
UNAME := $(shell uname)

$(PROTOC):
# Run the right installation command for the operating system.
ifeq ($(UNAME), Darwin)
	brew install protobuf
endif
ifeq ($(UNAME), Linux)
	sudo apt-get install protobuf-compiler
endif
# You can add instructions for other operating systems here, or use different
# branching logic as appropriate.

# If $GOPATH/bin/protoc-gen-go does not exist, we'll run this command to install it.
$(PROTOC_GEN_GO):
	go get -u github.com/golang/protobuf/protoc-gen-go

$(PROTOC_GEN_GRPC_GATEWAY):
	go get -u github.com/grpc-ecosystem/grpc-gateway/v2/protoc-gen-grpc-gateway

$(PROTOC_GEN_OPENAPIV2):
	go get -u github.com/grpc-ecosystem/grpc-gateway/v2/protoc-gen-openapiv2

$(PROTOC_GEN_GO_GRPC):
	go get -u google.golang.org/grpc/cmd/protoc-gen-go-grpc

$(PROTOC_GEN_DOC):
	go get -u github.com/pseudomuto/protoc-gen-doc/cmd/protoc-gen-doc

dep: . | $(PROTOC_GEN_GO_GRPC) $(PROTOC_GEN_OPENAPIV2) $(PROTOC_GEN_GRPC_GATEWAY) $(PROTOC_GEN_GO) $(PROTOC_GEN_DOC) $(PROTOC)


messaging: proto/imp/api/messaging/messaging.proto | $(PROTOC_GEN_GO_GRPC) $(PROTOC_GEN_OPENAPIV2) $(PROTOC_GEN_GRPC_GATEWAY) $(PROTOC_GEN_GO) $(PROTOC_GEN_DOC) $(PROTOC)
	protoc -I. -I./proto \
		--grpc-gateway_out ./gen/go \
		--grpc-gateway_opt logtostderr=true \
    		--grpc-gateway_opt paths=source_relative \
		--go_out="plugins=grpc,paths=source_relative:./gen/go" \
		--js_out=import_style=commonjs,binary:./gen/js \
		--grpc-web_out=import_style=typescript,mode=grpcweb:./gen/js \
		--rust_out="./gen/rust" \
		--openapiv2_out ./gen/openapiv2 \
		--openapiv2_opt logtostderr=true \
		--doc_out=./gen/docs --doc_opt=./gen/docs/custom_markdown.tmpl,messaging.md \
		proto/imp/api/messaging/messaging.proto
	echo "package messaging\n\nvar SwaggerJSON = \`" > ./gen/openapiv2/proto/imp/api/messaging/messaging.go
	cat ./gen/openapiv2/proto/imp/api/messaging/messaging.swagger.json >> ./gen/openapiv2/proto/imp/api/messaging/messaging.go
	echo "\`" >> ./gen/openapiv2/proto/imp/api/messaging/messaging.go

websocket: proto/imp/api/websocket/websocket.proto | $(PROTOC_GEN_GO_GRPC) $(PROTOC_GEN_OPENAPIV2) $(PROTOC_GEN_GRPC_GATEWAY) $(PROTOC_GEN_GO) $(PROTOC_GEN_DOC) $(PROTOC)
	protoc -I. -I./proto \
		--grpc-gateway_out ./gen/go \
		--grpc-gateway_opt logtostderr=true \
    		--grpc-gateway_opt paths=source_relative \
		--go_out="plugins=grpc,paths=source_relative:./gen/go" \
		--js_out=import_style=commonjs,binary:./gen/js \
		--grpc-web_out=import_style=typescript,mode=grpcweb:./gen/js \
		--rust_out="./gen/rust" \
		--openapiv2_out ./gen/openapiv2 \
		--openapiv2_opt logtostderr=true \
		--doc_out=./gen/docs --doc_opt=./gen/docs/custom_markdown.tmpl,websocket.md \
		proto/imp/api/websocket/websocket.proto
	echo "package websocket\n\nvar SwaggerJSON = \`" > ./gen/openapiv2/proto/imp/api/websocket/websocket.go
	cat ./gen/openapiv2/proto/imp/api/websocket/websocket.swagger.json >> ./gen/openapiv2/proto/imp/api/websocket/websocket.go
	echo "\`" >> ./gen/openapiv2/proto/imp/api/websocket/websocket.go

lightning: proto/imp/api/lightning/lightning.proto | $(PROTOC_GEN_GO_GRPC) $(PROTOC_GEN_OPENAPIV2) $(PROTOC_GEN_GRPC_GATEWAY) $(PROTOC_GEN_GO) $(PROTOC_GEN_DOC) $(PROTOC)
	protoc -I. -I./proto \
		--grpc-gateway_out ./gen/go \
		--grpc-gateway_opt logtostderr=true \
    		--grpc-gateway_opt paths=source_relative \
		--go_out="plugins=grpc,paths=source_relative:./gen/go" \
		--js_out=import_style=commonjs,binary:./gen/js \
		--grpc-web_out=import_style=typescript,mode=grpcweb:./gen/js \
		--rust_out="./gen/rust" \
		--openapiv2_out ./gen/openapiv2 \
		--openapiv2_opt logtostderr=true \
		--doc_out=./gen/docs --doc_opt=./gen/docs/custom_markdown.tmpl,lightning.md \
		proto/imp/api/lightning/lightning.proto
	echo "package lightning\n\nvar SwaggerJSON = \`" > ./gen/openapiv2/proto/imp/api/lightning/lightning.go
	cat ./gen/openapiv2/proto/imp/api/lightning/lightning.swagger.json >> ./gen/openapiv2/proto/imp/api/lightning/lightning.go
	echo "\`" >> ./gen/openapiv2/proto/imp/api/lightning/lightning.go

id: proto/imp/api/id/id.proto | $(PROTOC_GEN_GO_GRPC) $(PROTOC_GEN_OPENAPIV2) $(PROTOC_GEN_GRPC_GATEWAY) $(PROTOC_GEN_GO) $(PROTOC_GEN_DOC) $(PROTOC)
	protoc -I. -I./proto \
		--grpc-gateway_out ./gen/go \
		--grpc-gateway_opt logtostderr=true \
    		--grpc-gateway_opt paths=source_relative \
		--go_out="plugins=grpc,paths=source_relative:./gen/go" \
		--js_out=import_style=commonjs,binary:./gen/js \
		--grpc-web_out=import_style=typescript,mode=grpcweb:./gen/js \
		--rust_out="./gen/rust" \
		--openapiv2_out ./gen/openapiv2 \
		--openapiv2_opt logtostderr=true \
		--doc_out=./gen/docs --doc_opt=./gen/docs/custom_markdown.tmpl,id.md \
		proto/imp/api/id/id.proto
	echo "package id\n\nvar SwaggerJSON = \`" > ./gen/openapiv2/proto/imp/api/id/id.go
	cat ./gen/openapiv2/proto/imp/api/id/id.swagger.json >> ./gen/openapiv2/proto/imp/api/id/id.go
	echo "\`" >> ./gen/openapiv2/proto/imp/api/id/id.go

ipfs: proto/imp/api/ipfs/ipfs.proto | $(PROTOC_GEN_GO_GRPC) $(PROTOC_GEN_OPENAPIV2) $(PROTOC_GEN_GRPC_GATEWAY) $(PROTOC_GEN_GO) $(PROTOC_GEN_DOC) $(PROTOC)
	protoc -I. -I./proto \
		--grpc-gateway_out ./gen/go \
		--grpc-gateway_opt logtostderr=true \
    		--grpc-gateway_opt paths=source_relative \
		--go_out="plugins=grpc,paths=source_relative:./gen/go" \
		--js_out=import_style=commonjs,binary:./gen/js \
		--grpc-web_out=import_style=typescript,mode=grpcweb:./gen/js \
		--rust_out="./gen/rust" \
		--openapiv2_out ./gen/openapiv2 \
		--openapiv2_opt logtostderr=true \
		--doc_out=./gen/docs --doc_opt=./gen/docs/custom_markdown.tmpl,ipfs.md \
		proto/imp/api/ipfs/ipfs.proto
	echo "package ipfs\n\nvar SwaggerJSON = \`" > ./gen/openapiv2/proto/imp/api/ipfs/ipfs.go
	cat ./gen/openapiv2/proto/imp/api/ipfs/ipfs.swagger.json >> ./gen/openapiv2/proto/imp/api/ipfs/ipfs.go
	echo "\`" >> ./gen/openapiv2/proto/imp/api/ipfs/ipfs.go

relay: proto/imp/api/relay/relay.proto | $(PROTOC_GEN_GO_GRPC) $(PROTOC_GEN_OPENAPIV2) $(PROTOC_GEN_GRPC_GATEWAY) $(PROTOC_GEN_GO) $(PROTOC_GEN_DOC) $(PROTOC)
	protoc -I. -I./proto \
		--grpc-gateway_out ./gen/go \
		--grpc-gateway_opt logtostderr=true \
    		--grpc-gateway_opt paths=source_relative \
		--go_out="plugins=grpc,paths=source_relative:./gen/go" \
		--js_out=import_style=commonjs,binary:./gen/js \
		--grpc-web_out=import_style=typescript,mode=grpcweb:./gen/js \
		--rust_out="./gen/rust" \
		--openapiv2_out ./gen/openapiv2 \
		--openapiv2_opt logtostderr=true \
		--doc_out=./gen/docs --doc_opt=./gen/docs/custom_markdown.tmpl,relay.md \
		proto/imp/api/relay/relay.proto
	echo "package relay\n\nvar SwaggerJSON = \`" > ./gen/openapiv2/proto/imp/api/relay/relay.go
	cat ./gen/openapiv2/proto/imp/api/relay/relay.swagger.json >> ./gen/openapiv2/proto/imp/api/relay/relay.go
	echo "\`" >> ./gen/openapiv2/proto/imp/api/relay/relay.go

contacts: proto/imp/api/contacts/contacts.proto | $(PROTOC_GEN_GO_GRPC) $(PROTOC_GEN_OPENAPIV2) $(PROTOC_GEN_GRPC_GATEWAY) $(PROTOC_GEN_GO) $(PROTOC_GEN_DOC) $(PROTOC)
	protoc -I. -I./proto \
		--grpc-gateway_out ./gen/go \
		--grpc-gateway_opt logtostderr=true \
    		--grpc-gateway_opt paths=source_relative \
		--go_out="plugins=grpc,paths=source_relative:./gen/go" \
		--js_out=import_style=commonjs,binary:./gen/js \
		--grpc-web_out=import_style=typescript,mode=grpcweb:./gen/js \
		--rust_out="./gen/rust" \
		--openapiv2_out ./gen/openapiv2 \
		--openapiv2_opt logtostderr=true \
		--doc_out=./gen/docs --doc_opt=./gen/docs/custom_markdown.tmpl,contacts.md \
		proto/imp/api/contacts/contacts.proto
	echo "package contacts\n\nvar SwaggerJSON = \`" > ./gen/openapiv2/proto/imp/api/contacts/contacts.go
	cat ./gen/openapiv2/proto/imp/api/contacts/contacts.swagger.json >> ./gen/openapiv2/proto/imp/api/contacts/contacts.go
	echo "\`" >> ./gen/openapiv2/proto/imp/api/contacts/contacts.go

config: proto/imp/api/config/config.proto | $(PROTOC_GEN_GO_GRPC) $(PROTOC_GEN_OPENAPIV2) $(PROTOC_GEN_GRPC_GATEWAY) $(PROTOC_GEN_GO) $(PROTOC_GEN_DOC) $(PROTOC)
	protoc -I. -I./proto \
		--grpc-gateway_out ./gen/go \
		--grpc-gateway_opt logtostderr=true \
    		--grpc-gateway_opt paths=source_relative \
		--go_out="plugins=grpc,paths=source_relative:./gen/go" \
		--js_out=import_style=commonjs,binary:./gen/js \
		--grpc-web_out=import_style=typescript,mode=grpcweb:./gen/js \
		--rust_out="./gen/rust" \
		--openapiv2_out ./gen/openapiv2 \
		--openapiv2_opt logtostderr=true \
		--doc_out=./gen/docs --doc_opt=./gen/docs/custom_markdown.tmpl,config.md \
		proto/imp/api/config/config.proto
	echo "package config\n\nvar SwaggerJSON = \`" > ./gen/openapiv2/proto/imp/api/config/config.go
	cat ./gen/openapiv2/proto/imp/api/config/config.swagger.json >> ./gen/openapiv2/proto/imp/api/config/config.go
	echo "\`" >> ./gen/openapiv2/proto/imp/api/config/config.go


key: proto/imp/api/key/key.proto | $(PROTOC_GEN_GO_GRPC) $(PROTOC_GEN_OPENAPIV2) $(PROTOC_GEN_GRPC_GATEWAY) $(PROTOC_GEN_GO) $(PROTOC_GEN_DOC) $(PROTOC)
	protoc -I. -I./proto \
		--grpc-gateway_out ./gen/go \
		--grpc-gateway_opt logtostderr=true \
    		--grpc-gateway_opt paths=source_relative \
		--go_out="plugins=grpc,paths=source_relative:./gen/go" \
		--js_out=import_style=commonjs,binary:./gen/js \
		--grpc-web_out=import_style=typescript,mode=grpcweb:./gen/js \
		--rust_out="./gen/rust" \
		--openapiv2_out ./gen/openapiv2 \
		--openapiv2_opt logtostderr=true \
		--doc_out=./gen/docs --doc_opt=./gen/docs/custom_markdown.tmpl,key.md \
		proto/imp/api/key/key.proto
	echo "package key\n\nvar SwaggerJSON = \`" > ./gen/openapiv2/proto/imp/api/key/key.go
	cat ./gen/openapiv2/proto/imp/api/key/key.swagger.json >> ./gen/openapiv2/proto/imp/api/key/key.go
	echo "\`" >> ./gen/openapiv2/proto/imp/api/key/key.go

auth: proto/imp/api/auth/auth.proto | $(PROTOC_GEN_GO_GRPC) $(PROTOC_GEN_OPENAPIV2) $(PROTOC_GEN_GRPC_GATEWAY) $(PROTOC_GEN_GO) $(PROTOC_GEN_DOC) $(PROTOC)
	protoc -I. -I./proto \
		--grpc-gateway_out ./gen/go \
		--grpc-gateway_opt logtostderr=true \
    		--grpc-gateway_opt paths=source_relative \
		--go_out="plugins=grpc,paths=source_relative:./gen/go" \
		--js_out=import_style=commonjs,binary:./gen/js \
		--grpc-web_out=import_style=typescript,mode=grpcweb:./gen/js \
		--rust_out="./gen/rust" \
		--openapiv2_out ./gen/openapiv2 \
		--openapiv2_opt logtostderr=true \
		--doc_out=./gen/docs --doc_opt=./gen/docs/custom_markdown.tmpl,auth.md \
		proto/imp/api/auth/auth.proto
	echo "package auth\n\nvar SwaggerJSON = \`" > ./gen/openapiv2/proto/imp/api/auth/auth.go
	cat ./gen/openapiv2/proto/imp/api/auth/auth.swagger.json >> ./gen/openapiv2/proto/imp/api/auth/auth.go
	echo "\`" >> ./gen/openapiv2/proto/imp/api/auth/auth.go


proto: messaging
proto: websocket
proto: lightning
proto: id
proto: ipfs
proto: relay
proto: key
proto: contacts
proto: config
proto: auth
