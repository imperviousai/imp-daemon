# imp-daemon

## Running

Install go libaries you might not have

```
go get ./...
```

### Daemon

This starts the deamon/server and all the services. Go into `config/config.yml` to tweak settings or copy that into your own `config/local.config.yml` or any other location. You can pass the flag `--config=config/myconfigname.config.yml` to have a daemon loaded up with custom configs.

```
go run cmd/impd/main.go
```

### UI

This builds and exports the UI into a static SPA so that the daemon can serve it. Be sure to run the follow prior to `go run cmd/impd/main.go` if you want it.

```
cd client && yarn && yarn export
```

### CLI

This is where various one off imp interactions take place. Type out the `help` command in order to see available actions.

```
go run cmd/impcli/*.go help
```

## Docker

You can create the Dockerfile for this app to release the binary built into the docker image for others to get started quickly. For now it's a simple binary install, but later it might be able to do things like LND built in, socket/vpn setup, etc.

To build a new docker image:

```
docker build -t teamimp/imp-daemon . --progress=plain
```

For configs, there's a couple fields required as is for working with docker:

```
server:
  grpc_addr: 0.0.0.0:8881 # LEAVE ALONE FOR DOCKER
  http_addr: 0.0.0.0:8882 # LEAVE ALONE FOR DOCKER
  http_did_addr: 0.0.0.0:8883 # LEAVE ALONE FOR DOCKER

...

sql:
  connection_string: "file:/app/db/imp.db?_auth&_auth_user=admin&_auth_pass=supersecretpassword&_auth_crypt=sha256"  # LEAVE ALONE FOR DOCKER
  type: sqlite3

...

ipfs:
  directory: /app/ipfs/ # LEAVE ALONE FOR DOCKER

...

lightning:
  lnd_node:
    tls_cert: /app/lnd/tls.cert # LEAVE ALONE FOR DOCKER
    admin_macaroon: /app/lnd/admin.macaroon # LEAVE ALONE FOR DOCKER
```

To run the built docker image:

```
docker run \
 -p8881:8881 \
 -p8882:8882 \
 -p8883:8883 \
 -v {REPLACE_WITH_CONFIG_PATH}:/app/config/config.yml \
 -v {REPLACE_WITH_TLS_PATH}:/app/lnd/tls.cert \
 -v {REPLACE_WITH_MACAROON_PATH}:/app/lnd/admin.macaroon \
 -it teamimp/imp-daemon
```

You may also change the host port number (ie `-p8891:8881`) if you are running multiple.

For publishing the docker image:

```
docker tag teamimp/imp-daemon:latest teamimp/imp-daemon:{version}
docker push teamimp/imp-daemon:{version}
```

## Development

### Dependencies

A few additional dependencies needed for day to day development. Mostly around protobuf. The Makefile attempts to install a few things but some additional things are needed.

Run the makefile dependencies installation

```
make dep
```

This will install some things but not all. Figuring out how to put some of these into the makefile would be a nice to have.

Install protoc-gen-grpc-web:

```
npm install -g protoc-gen-grpc-web
```

Install rust:

```
curl https://sh.rustup.rs -sSf | sh
```

Install protoc-gen-rust

```
cargo install protoc-gen-rust
```

You may have to install nightly to have the latest version of protoc-gen-rust:

```
rustup default nightly && rustup update
```

Install protobuf-codegen

```
cargo install protobuf-codegen
```

Add rust executables to your environment path (zsh,bash, etc):

```
PATH="$HOME/.cargo/bin:$PATH"
```

### Config

Copy default config file into a local file and customize to your dev setup. The local file will be read first if present, and will be ingored by git.

```
cp config/config.yml config/local.config.yml
```

### Design

An explanation of the code design can be found [here](./docs/design.md)

Everything is subject to change based on requirements, but this is a good first attempt at abstracting, confining roles, and submodule level interactions.

## Testing

Test every package with:

```
go test ./...
```

Code coverage test with:

```
go test -race -covermode=atomic -coverprofile=coverage.out ./...
```

View code coverage results:

```
go tool cover -html=coverage.out
```

### Testing Tools

Use `mockgen` to generate interface mocks to make testing easier. If interfaces ever change with any of our internal submodules then generation needs to happen or else compile time errors will occur with the tests.

Install `mockgen`:

```
go get github.com/golang/mock/mockgen
```

Generate a fresh batch of mocks. This will be needed if you change any interfaces currently being mocked.

```
go generate ./...
```

## Release

1. Make sure the proto files and generated code are up to date:

```
make proto
```

2. Push the PR and merge into master:

```
git push -u origin {branch-name}
```

3. Create the release on github, tag it with the next version number.

4. Create & push the docker image:

Instructions [here](#docker).
