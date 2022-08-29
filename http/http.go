package http

import "net/http"

//go:generate mockgen --destination=./mock/http_client_mock.go --package=mock github.com/imperviousai/imp-daemon/http HttpClient

type HttpClient interface {
	Do(req *http.Request) (*http.Response, error)
	Get(url string) (resp *http.Response, err error)
}
