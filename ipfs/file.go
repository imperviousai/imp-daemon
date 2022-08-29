package ipfs

import (
	"context"
	"fmt"
	"io/ioutil"
	"os"
	"path/filepath"
	"strings"

	files "github.com/ipfs/go-ipfs-files"
	core "github.com/ipfs/interface-go-ipfs-core"
	"github.com/ipfs/interface-go-ipfs-core/options"
	"github.com/ipfs/interface-go-ipfs-core/path"
	icorepath "github.com/ipfs/interface-go-ipfs-core/path"
	"go.uber.org/zap"
)

func (i *ipfs) AddFile(data []byte, name string, updatable bool) (string, error) {
	filePath := i.storageDir + name
	err := os.WriteFile(filePath, data, 0600)
	if err != nil {
		return "", fmt.Errorf("Could not save File: %s", err)
	}

	file, err := getUnixfsNode(filePath)
	if err != nil {
		return "", fmt.Errorf("Could not get File: %s", err)
	}

	cidFile, err := i.core.Unixfs().Add(context.Background(), file)
	if err != nil {
		return "", fmt.Errorf("Could not add File: %s", err)
	}

	err = i.core.Pin().Add(context.Background(), path.IpfsPath(cidFile.Cid()))
	if err != nil {
		return "", fmt.Errorf("Could not pin File: %s", err)
	}

	zap.L().Debug("Added file to IPFS", zap.String("CID", cidFile.String()))

	// Return direct IPFS reference if not updatable
	if !updatable {
		return cidFile.String(), nil
	}

	// Turn IPFS into an IPNS file and return that

	// Generate or find key for this file
	existingKeys, err := i.core.Key().List(context.Background())
	if err != nil {
		return "", err
	}

	var ipnsKey core.Key
	for _, existingKey := range existingKeys {
		if existingKey.Name() == name {
			ipnsKey = existingKey
			break
		}
	}

	if ipnsKey == nil {
		zap.L().Debug("Generating new key for IPNS file")
		ipnsKey, err = i.core.Key().Generate(context.Background(), name)
		if err != nil {
			return "", err
		}
	}

	// Use key for IPNS generation
	zap.L().Debug("Publishing IPNS file", zap.String("key", ipnsKey.Path().String()))
	ipnsFile, err := i.core.Name().Publish(context.Background(), path.IpfsPath(cidFile.Cid()), options.Name.Key(ipnsKey.Name()))
	if err != nil {
		return "", err
	}
	zap.L().Debug("Published IPNS", zap.String("key", ipnsKey.Path().String()), zap.String("ipns", ipnsFile.Value().String()))

	return ipnsKey.Path().String(), nil
}

func (i *ipfs) RetrieveFile(cid string) ([]byte, error) {
	// Get the file
	filePath := icorepath.New(cid)

	fileParts := strings.Split(filePath.String(), "/")

	rootNode, err := i.core.Unixfs().Get(context.Background(), filePath)
	if err != nil {
		return nil, fmt.Errorf("Could not get file with CID: %s", err)
	}

	// TODO Retrieve data without saving to disk?
	localFilePath := filepath.Join(i.storageDir, fileParts[len(fileParts)-1])
	err = files.WriteTo(rootNode, localFilePath)
	if err != nil {
		return nil, fmt.Errorf("Could not write out the fetched CID: %s", err)
	}

	zap.L().Debug("Wrote the file", zap.String("location", localFilePath))

	// Read from disk and return
	return ioutil.ReadFile(filepath.Clean(localFilePath))
}

func (i *ipfs) ListFiles() ([]string, error) {
	fileChan, err := i.core.Pin().Ls(context.Background())
	if err != nil {
		return nil, err
	}

	fileList := make([]string, 0)
	for file := range fileChan {
		fileList = append(fileList, file.Path().String())
	}

	return fileList, nil
}
