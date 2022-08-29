package config

import (
	"testing"

	"github.com/imperviousai/imp-daemon/config"
	config_proto "github.com/imperviousai/imp-daemon/gen/go/proto/imp/api/config"
	"github.com/stretchr/testify/assert"
)

func TestConvertLndProtoToConfigSuccess(t *testing.T) {
	// should be nil if nothing is passed in
	cfg := convertLndProtoToConfig(nil)
	if cfg != nil {
		t.Error("config should be nil")
	}

	testConfig := &config_proto.LightningConfig{
		Ip:               "127.0.0.1",
		Port:             "1001",
		Pubkey:           "123",
		TlsCert:          "/path/to/file",
		TlsCertHex:       "101010",
		AdminMacaroon:    "/path/to/file",
		AdminMacaroonHex: "010101",
		Listening:        true,
	}

	expectedConfig := &config.Lnd{
		Ip:               "127.0.0.1",
		Port:             "1001",
		PubKey:           "123",
		TlsCert:          "/path/to/file",
		TlsCertHex:       "101010",
		AdminMacaroon:    "/path/to/file",
		AdminMacaroonHex: "010101",
		Listening:        true,
	}

	returnedConfig := convertLndProtoToConfig(testConfig)
	assert.Equal(t, expectedConfig, returnedConfig)
}

func TestConvertLndConfigToProto(t *testing.T) {
	// should be nil if nothing is passed in
	cfg := convertLndConfigToProto(nil)
	if cfg != nil {
		t.Error("config should be nil")
	}

	protoConfig := &config.Lnd{
		Ip:               "127.0.0.1",
		Port:             "1001",
		PubKey:           "123",
		TlsCert:          "/path/to/file",
		TlsCertHex:       "101010",
		AdminMacaroon:    "/path/to/file",
		AdminMacaroonHex: "010101",
		Listening:        true,
	}

	expectedConfig := &config_proto.LightningConfig{
		Ip:               "127.0.0.1",
		Port:             "1001",
		Pubkey:           "123",
		TlsCert:          "/path/to/file",
		TlsCertHex:       "101010",
		AdminMacaroon:    "/path/to/file",
		AdminMacaroonHex: "010101",
		Listening:        true,
	}

	returnedConfig := convertLndConfigToProto(protoConfig)
	assert.Equal(t, expectedConfig, returnedConfig)
}
