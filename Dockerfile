FROM golang:1.16-alpine

RUN apk add --no-cache --update alpine-sdk

WORKDIR /src

COPY . .
RUN go mod download

RUN mkdir /app

RUN go build -o /app/impervious ./cmd/impd/main.go

# IMPORTANT DELETE SOURCE FILES FOR NOW #
WORKDIR /app
RUN rm -rf /src

# Config files we will pass through
Run mkdir config
RUN touch config/config.yml

RUN mkdir lnd
RUN touch lnd/tls.cert
RUN touch lnd/admin.macaroon

EXPOSE 8882
EXPOSE 8881

CMD ["./impervious", "--config=config/config.yml"]
