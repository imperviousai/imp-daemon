package ipfs

import (
	"context"
	"fmt"
	"io/ioutil"
	"log"
	"os"
	"path/filepath"
	"runtime"
	"strings"
	"sync"

	config "github.com/ipfs/go-ipfs-config"
	files "github.com/ipfs/go-ipfs-files"
	icore "github.com/ipfs/interface-go-ipfs-core"
	ma "github.com/multiformats/go-multiaddr"
	"go.uber.org/zap"

	"github.com/ipfs/go-ipfs/core"
	"github.com/ipfs/go-ipfs/core/coreapi"
	"github.com/ipfs/go-ipfs/core/node/libp2p"
	"github.com/ipfs/go-ipfs/plugin/loader" // This package is needed so that all the preloaded plugins are loaded automatically
	"github.com/ipfs/go-ipfs/repo/fsrepo"
	"github.com/libp2p/go-libp2p-core/peer"
)

//go:generate mockgen --destination=./mock/ipfs_mock.go --package=mock github.com/imperviousai/freeimp/ipfs IPFS

//go:generate mockgen --destination=./mock/ipfs/coreapi_mock.go --package=ipfs_mock github.com/ipfs/interface-go-ipfs-core CoreAPI
//go:generate mockgen --destination=./mock/ipfs/pinapi_mock.go --package=ipfs_mock github.com/ipfs/interface-go-ipfs-core PinAPI
//go:generate mockgen --destination=./mock/ipfs/pin_mock.go --package=ipfs_mock github.com/ipfs/interface-go-ipfs-core Pin
//go:generate mockgen --destination=./mock/ipfs/path/resolved_mock.go --package=resolved_mock github.com/ipfs/interface-go-ipfs-core/path Resolved

// IPFS node as library code: https://github.com/ipfs/go-ipfs/tree/master/docs/examples/go-ipfs-as-a-library

type IPFS interface {
	// AddFile will add data to a file and pin to IPFS to return it's CID
	AddFile(data []byte, name string, updatable bool) (string, error)

	// RetrieveFile will retrieve a file from IPFS
	RetrieveFile(cid string) ([]byte, error)

	// ListFiles will retrieve a list of files from IPFS
	ListFiles() ([]string, error)

	// Stop will stop IPFS
	Stop() error
}

type ipfs struct {
	core       icore.CoreAPI
	storageDir string
	plugins    *loader.PluginLoader
}

type Config struct {
	DirectoryPath string
}

func SetupIPFS(cfg *Config) (IPFS, error) {
	// --- Part I: Getting a IPFS node running

	zap.L().Debug("Getting an IPFS node running")

	ctx := context.Background()

	// Spawn a node using the default path (~/.ipfs), assuming that a repo exists there already
	// Fix the ~ pathing not working properly
	if strings.HasPrefix(cfg.DirectoryPath, "~/") {
		cfg.DirectoryPath = filepath.Join(userHomeDir(), cfg.DirectoryPath[2:])
	}

	zap.L().Debug("Spawning node on default repo")
	ipfsCore, plugins, err := spawnDefault(ctx, cfg.DirectoryPath)
	if err != nil {
		panic(fmt.Errorf("failed to spawnDefault node: %s", err))
	}

	zap.L().Debug("IPFS node is running")

	// --- Part IV: Getting a file from the IPFS Network

	zap.L().Debug("Going to connect to a few nodes in the Network as bootstrappers")

	bootstrapNodes := []string{
		// IPFS Bootstrapper nodes.
		"/dnsaddr/bootstrap.libp2p.io/p2p/QmNnooDu7bfjPFoTZYxMNLWUQJyrVwtbZg5gBMjTezGAJN",
		"/dnsaddr/bootstrap.libp2p.io/p2p/QmQCU2EcMqAqQPR2i9bChDtGNJchTbq5TbXJJ16u19uLTa",
		"/dnsaddr/bootstrap.libp2p.io/p2p/QmbLHAnMoJPWSCR5Zhtx6BHJX9KiKNN6tpvbUcqanj75Nb",
		"/dnsaddr/bootstrap.libp2p.io/p2p/QmcZf59bWwK5XFi76CZX8cbJ4BhTzzA3gU1ZjYZcYW3dwt",

		// IPFS Cluster Pinning nodes
		"/ip4/138.201.67.219/tcp/4001/p2p/QmUd6zHcbkbcs7SMxwLs48qZVX3vpcM8errYS7xEczwRMA",
		"/ip4/138.201.67.219/udp/4001/quic/p2p/QmUd6zHcbkbcs7SMxwLs48qZVX3vpcM8errYS7xEczwRMA",
		"/ip4/138.201.67.220/tcp/4001/p2p/QmNSYxZAiJHeLdkBg38roksAR9So7Y5eojks1yjEcUtZ7i",
		"/ip4/138.201.67.220/udp/4001/quic/p2p/QmNSYxZAiJHeLdkBg38roksAR9So7Y5eojks1yjEcUtZ7i",
		"/ip4/138.201.68.74/tcp/4001/p2p/QmdnXwLrC8p1ueiq2Qya8joNvk3TVVDAut7PrikmZwubtR",
		"/ip4/138.201.68.74/udp/4001/quic/p2p/QmdnXwLrC8p1ueiq2Qya8joNvk3TVVDAut7PrikmZwubtR",
		"/ip4/94.130.135.167/tcp/4001/p2p/QmUEMvxS2e7iDrereVYc5SWPauXPyNwxcy9BXZrC1QTcHE",
		"/ip4/94.130.135.167/udp/4001/quic/p2p/QmUEMvxS2e7iDrereVYc5SWPauXPyNwxcy9BXZrC1QTcHE",

		// You can add more nodes here, for example, another IPFS node you might have running locally, mine was:
		// "/ip4/127.0.0.1/tcp/4010/p2p/QmZp2fhDLxjYue2RiUvLwT9MWdnbDxam32qYFnGmxZDh5L",
		// "/ip4/127.0.0.1/udp/4010/quic/p2p/QmZp2fhDLxjYue2RiUvLwT9MWdnbDxam32qYFnGmxZDh5L",
	}

	go func() {
		err := connectToPeers(context.Background(), ipfsCore, bootstrapNodes)
		if err != nil {
			log.Printf("failed connect to peers: %s", err)
		}
	}()

	zap.L().Debug("IPFS node initialzed successfully")

	return &ipfs{
		core:       ipfsCore,
		plugins:    plugins,
		storageDir: cfg.DirectoryPath + "storage/",
	}, nil
}

func (i *ipfs) Stop() error {
	return i.plugins.Close()
}

func setupPlugins(externalPluginsPath string) (*loader.PluginLoader, error) {
	// Load any external plugins if available on externalPluginsPath
	plugins, err := loader.NewPluginLoader(filepath.Join(externalPluginsPath, "plugins"))
	if err != nil {
		return nil, fmt.Errorf("error loading plugins: %s", err)
	}

	// Load preloaded and external plugins
	if err := plugins.Initialize(); err != nil {
		return nil, fmt.Errorf("error initializing plugins: %s", err)
	}

	if err := plugins.Inject(); err != nil {
		return nil, fmt.Errorf("error initializing plugins: %s", err)
	}

	return plugins, nil
}

func createIPFSRepo(dir string) error {
	// Create IPFS directory
	err := os.Mkdir(dir, 0700)
	if os.IsExist(err) {
		return nil
	}
	if os.IsNotExist(err) {
		if _, err := os.Stat(dir); os.IsNotExist(err) {
			return err
		}
	}
	if err != nil {
		return err
	}

	// Create storage directory
	storageDir := dir + "storage" // TODO magic string
	err = os.Mkdir(storageDir, 0700)
	if os.IsExist(err) {
		return nil
	}
	if os.IsNotExist(err) {
		if _, err := os.Stat(storageDir); os.IsNotExist(err) {
			return err
		}
	}
	if err != nil {
		return err
	}

	// Create a config with default options and a 2048 bit key
	cfg, err := config.Init(ioutil.Discard, 2048)
	if err != nil {
		return err
	}

	// When creating the repository, you can define custom settings on the repository, such as enabling experimental
	// features (See experimental-features.md) or customizing the gateway endpoint.
	// To do such things, you should modify the variable `cfg`. For example:
	if true {
		// https://github.com/ipfs/go-ipfs/blob/master/docs/experimental-features.md#ipfs-filestore
		cfg.Experimental.FilestoreEnabled = true
		// https://github.com/ipfs/go-ipfs/blob/master/docs/experimental-features.md#ipfs-urlstore
		cfg.Experimental.UrlstoreEnabled = true
		// https://github.com/ipfs/go-ipfs/blob/master/docs/experimental-features.md#ipfs-p2p
		cfg.Experimental.Libp2pStreamMounting = true
		// https://github.com/ipfs/go-ipfs/blob/master/docs/experimental-features.md#p2p-http-proxy
		cfg.Experimental.P2pHttpProxy = true
		// https://github.com/ipfs/go-ipfs/blob/master/docs/experimental-features.md#strategic-providing
		cfg.Experimental.StrategicProviding = true
	}

	// Create the repo with the config
	zap.L().Debug("Initializing fsrepo")
	err = fsrepo.Init(dir, cfg)
	if err != nil {
		return fmt.Errorf("failed to init ephemeral node: %s", err)
	}
	zap.L().Debug("Initialized fsrepo")

	return nil
}

// ------ Spawning the node

// Creates an IPFS node and returns its coreAPI
func createNode(ctx context.Context, repoPath string) (icore.CoreAPI, error) {
	// Open the repo
	zap.L().Debug("Creating node")
	repo, err := fsrepo.Open(repoPath)
	if err != nil {
		zap.L().Error(err.Error())
		return nil, err
	}
	zap.L().Debug("Opened node repo")

	// Construct the node

	nodeOptions := &core.BuildCfg{
		Online:  true,
		Routing: libp2p.DHTOption, // This option sets the node to be a full DHT node (both fetching and storing DHT Records)
		// Routing: libp2p.DHTClientOption, // This option sets the node to be a client DHT node (only fetching records)
		Repo: repo,
	}

	node, err := core.NewNode(ctx, nodeOptions)
	if err != nil {
		return nil, err
	}

	// Attach the Core API to the constructed node
	return coreapi.NewCoreAPI(node)
}

// Spawns a node on the default repo location, if the repo exists
func spawnDefault(ctx context.Context, dir string) (icore.CoreAPI, *loader.PluginLoader, error) {
	plugins, err := setupPlugins(dir)
	if err != nil {
		return nil, nil, err
	}
	zap.L().Debug("Set up plugins")

	// Create a Temporary Repo
	err = createIPFSRepo(dir)
	if err != nil {
		return nil, nil, fmt.Errorf("failed to create ipfs repo: %s", err)
	}
	zap.L().Debug("Created IPFS Repo")

	node, err := createNode(ctx, dir)
	if err != nil {
		return nil, nil, err
	}

	return node, plugins, nil
}

func connectToPeers(ctx context.Context, ipfs icore.CoreAPI, peers []string) error {
	var wg sync.WaitGroup
	peerInfos := make(map[peer.ID]*peer.AddrInfo, len(peers))
	for _, addrStr := range peers {
		addr, err := ma.NewMultiaddr(addrStr)
		if err != nil {
			return err
		}
		pii, err := peer.AddrInfoFromP2pAddr(addr)
		if err != nil {
			return err
		}
		pi, ok := peerInfos[pii.ID]
		if !ok {
			pi = &peer.AddrInfo{ID: pii.ID}
			peerInfos[pi.ID] = pi
		}
		pi.Addrs = append(pi.Addrs, pii.Addrs...)
	}

	wg.Add(len(peerInfos))
	for _, peerInfo := range peerInfos {
		go func(peerInfo *peer.AddrInfo) {
			defer wg.Done()
			err := ipfs.Swarm().Connect(ctx, *peerInfo)
			if err != nil {
				log.Printf("failed to connect to %s: %s", peerInfo.ID, err)
			}
		}(peerInfo)
	}
	wg.Wait()

	connections, err := ipfs.Swarm().Peers(ctx)
	if err != nil {
		return err
	}

	for _, connection := range connections {
		zap.L().Debug("connected to a node", zap.String("node", connection.ID().Pretty()))
	}
	return nil
}

func getUnixfsNode(path string) (files.Node, error) {
	st, err := os.Stat(path)
	if err != nil {
		return nil, err
	}

	f, err := files.NewSerialFile(path, false, st)
	if err != nil {
		return nil, err
	}

	return f, nil
}
func userHomeDir() string {
	if runtime.GOOS == "windows" {
		home := os.Getenv("HOMEDRIVE") + os.Getenv("HOMEPATH")
		if home == "" {
			home = os.Getenv("USERPROFILE")
		}
		return home
	} else if runtime.GOOS == "linux" {
		home := os.Getenv("XDG_CONFIG_HOME")
		if home != "" {
			return home
		}
	}
	return os.Getenv("HOME")
}
