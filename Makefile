.PHONY: proto lightning id kv relay key contacts config

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
		--go_out=./gen/go \
		--go_opt=paths=source_relative \
		--go-grpc_out=./gen/go \
		--go-grpc_opt=paths=source_relative \
		--js_out=import_style=commonjs,binary:./gen/js \
		--grpc-web_out=import_style=typescript,mode=grpcweb:./gen/js \
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
		--go_out=./gen/go \
                --go_opt=paths=source_relative \
                --go-grpc_out=./gen/go \
                --go-grpc_opt=paths=source_relative \
		--js_out=import_style=commonjs,binary:./gen/js \
		--grpc-web_out=import_style=typescript,mode=grpcweb:./gen/js \
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
                --go_out=./gen/go \
                --go_opt=paths=source_relative \
                --go-grpc_out=./gen/go \
                --go-grpc_opt=paths=source_relative \
		--js_out=import_style=commonjs,binary:./gen/js \
		--grpc-web_out=import_style=typescript,mode=grpcweb:./gen/js \
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
                --go_out=./gen/go \
                --go_opt=paths=source_relative \
                --go-grpc_out=./gen/go \
                --go-grpc_opt=paths=source_relative \
		--js_out=import_style=commonjs,binary:./gen/js \
		--grpc-web_out=import_style=typescript,mode=grpcweb:./gen/js \
		--openapiv2_out ./gen/openapiv2 \
		--openapiv2_opt logtostderr=true \
		--doc_out=./gen/docs --doc_opt=./gen/docs/custom_markdown.tmpl,id.md \
		proto/imp/api/id/id.proto
	echo "package id\n\nvar SwaggerJSON = \`" > ./gen/openapiv2/proto/imp/api/id/id.go
	cat ./gen/openapiv2/proto/imp/api/id/id.swagger.json >> ./gen/openapiv2/proto/imp/api/id/id.go
	echo "\`" >> ./gen/openapiv2/proto/imp/api/id/id.go


relay: proto/imp/api/relay/relay.proto | $(PROTOC_GEN_GO_GRPC) $(PROTOC_GEN_OPENAPIV2) $(PROTOC_GEN_GRPC_GATEWAY) $(PROTOC_GEN_GO) $(PROTOC_GEN_DOC) $(PROTOC)
	protoc -I. -I./proto \
		--grpc-gateway_out ./gen/go \
		--grpc-gateway_opt logtostderr=true \
    		--grpc-gateway_opt paths=source_relative \
                --go_out=./gen/go \
                --go_opt=paths=source_relative \
                --go-grpc_out=./gen/go \
                --go-grpc_opt=paths=source_relative \
		--js_out=import_style=commonjs,binary:./gen/js \
		--grpc-web_out=import_style=typescript,mode=grpcweb:./gen/js \
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
                --go_out=./gen/go \
                --go_opt=paths=source_relative \
                --go-grpc_out=./gen/go \
                --go-grpc_opt=paths=source_relative \
		--js_out=import_style=commonjs,binary:./gen/js \
		--grpc-web_out=import_style=typescript,mode=grpcweb:./gen/js \
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
                --go_out=./gen/go \
                --go_opt=paths=source_relative \
                --go-grpc_out=./gen/go \
                --go-grpc_opt=paths=source_relative \
		--js_out=import_style=commonjs,binary:./gen/js \
		--grpc-web_out=import_style=typescript,mode=grpcweb:./gen/js \
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
                --go_out=./gen/go \
                --go_opt=paths=source_relative \
                --go-grpc_out=./gen/go \
                --go-grpc_opt=paths=source_relative \
		--js_out=import_style=commonjs,binary:./gen/js \
		--grpc-web_out=import_style=typescript,mode=grpcweb:./gen/js \
		--openapiv2_out ./gen/openapiv2 \
		--openapiv2_opt logtostderr=true \
		--doc_out=./gen/docs --doc_opt=./gen/docs/custom_markdown.tmpl,key.md \
		proto/imp/api/key/key.proto
	echo "package key\n\nvar SwaggerJSON = \`" > ./gen/openapiv2/proto/imp/api/key/key.go
	cat ./gen/openapiv2/proto/imp/api/key/key.swagger.json >> ./gen/openapiv2/proto/imp/api/key/key.go
	echo "\`" >> ./gen/openapiv2/proto/imp/api/key/key.go

kv: proto/imp/api/kv/kv.proto | $(PROTOC_GEN_GO_GRPC) $(PROTOC_GEN_OPENAPIV2) $(PROTOC_GEN_GRPC_GATEWAY) $(PROTOC_GEN_GO) $(PROTOC_GEN_DOC) $(PROTOC)
	protoc -I. -I./proto \
		--grpc-gateway_out ./gen/go \
		--grpc-gateway_opt logtostderr=true \
    		--grpc-gateway_opt paths=source_relative \
                --go_out=./gen/go \
                --go_opt=paths=source_relative \
                --go-grpc_out=./gen/go \
                --go-grpc_opt=paths=source_relative \
		--js_out=import_style=commonjs,binary:./gen/js \
		--grpc-web_out=import_style=typescript,mode=grpcweb:./gen/js \
		--openapiv2_out ./gen/openapiv2 \
		--openapiv2_opt logtostderr=true \
		--doc_out=./gen/docs --doc_opt=./gen/docs/custom_markdown.tmpl,key.md \
		proto/imp/api/kv/kv.proto
	echo "package kv\n\nvar SwaggerJSON = \`" > ./gen/openapiv2/proto/imp/api/kv/kv.go
	cat ./gen/openapiv2/proto/imp/api/kv/kv.swagger.json >> ./gen/openapiv2/proto/imp/api/kv/kv.go
	echo "\`" >> ./gen/openapiv2/proto/imp/api/kv/kv.go

core: proto/imp/api/core/core.proto | $(PROTOC_GEN_GO_GRPC) $(PROTOC_GEN_OPENAPIV2) $(PROTOC_GEN_GRPC_GATEWAY) $(PROTOC_GEN_GO) $(PROTOC_GEN_DOC) $(PROTOC)
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
		--doc_out=./gen/docs --doc_opt=./gen/docs/custom_markdown.tmpl,core.md \
		proto/imp/api/core/core.proto
	echo "package core\n\nvar SwaggerJSON = \`" > ./gen/openapiv2/proto/imp/api/core/core.go
	cat ./gen/openapiv2/proto/imp/api/core/core.swagger.json >> ./gen/openapiv2/proto/imp/api/core/core.go
	echo "\`" >> ./gen/openapiv2/proto/imp/api/core/core.go



proto: messaging
proto: websocket
proto: lightning
proto: id
proto: relay
proto: key
proto: contacts
proto: config
proto: kv
publish:
	# Assumes release directory in ../imp-releases/
	#
	# Make sure in latest main
	git checkout main && git pull

	# Copy proto files
	find . -name '*.proto' -path '*proto/imp/api/*/*' -exec ditto \{\} ../imp-releases/proto \;

	# Copy generated code
	cp -a ./gen/. ../imp-releases/

	# Copy lateset config example
	cp ./config/config.yml ../imp-releases/config.yml

	### Now commit your changes in imp release ###
