FROM golang:1.16.15-alpine as buildStage

RUN apk add --no-cache --update alpine-sdk

WORKDIR /src

RUN mkdir /lib64 && ln -s /lib/libc.musl-x86_64.so.1 /lib64/ld-linux-x86-64.so.2

COPY ./go.mod ./go.mod
RUN go mod download

COPY . .

RUN GOOS=linux GOARCH=amd64 CGO_ENABLED=0 go build -o /app/impervious /src/cmd/impd/main.go


FROM alpine
COPY --from=buildStage /app/impervious /app/impervious

WORKDIR /app

# Config files we will pass through
Run mkdir config
RUN touch config/config.yml

RUN mkdir lnd
RUN touch lnd/tls.cert
RUN touch lnd/admin.macaroon

RUN mkdir db

EXPOSE 8881
EXPOSE 8882
EXPOSE 8883

CMD ["./impervious", "--config=config/config.yml"]
