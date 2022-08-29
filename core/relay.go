package core

import (
	"errors"

	"github.com/imperviousai/freeimp/service/relay"
	"go.uber.org/zap"
)

func (c *core) SendRegistrationRequest(toDID string, amt int64, data *relay.RelayRegistrationRequestData) (string, error) {
	relayRegistrationService, err := c.findAndCastRelayService()
	if err != nil {
		zap.L().Error("[Core] RequestFederation failed", zap.String("error", err.Error()))
		return "", err
	}

	return relayRegistrationService.SendRegistrationRequest(toDID, amt, data)
}

func (c *core) SendMailboxRequest(toDID string, amt int64, data *relay.RelayMailboxRequestData) (string, error) {

	relayRegistrationService, err := c.findAndCastRelayService()
	if err != nil {
		zap.L().Error("[Core] RequestFederation failed", zap.String("error", err.Error()))
		return "", err
	}

	return relayRegistrationService.SendMailboxRequest(toDID, amt, data)
}

func (c *core) findAndCastRelayService() (relay.RelayRegistrationService, error) {
	// find the active internal federation service
	s, err := c.serviceHandler.GetService("relay-registration")
	if err != nil {
		return nil, err
	}

	relayRegistrationService, ok := s.(relay.RelayRegistrationService)
	if !ok {
		return nil, errors.New("Service isn't a federation service")
	}

	return relayRegistrationService, nil
}
