package service

import "github.com/imperviousai/freeimp/comm"

//go:generate mockgen --destination=./mock/service_mock.go --package=mock github.com/imperviousai/freeimp/service/service Service

// Service is a service that is capable
// of handling messages sent to a specific
// Custom Record Number.
type Service interface {
	Active() bool
	Type() string
	HandleData(*comm.DIDCommMsg) error
	Shutdown() error
}
