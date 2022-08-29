package state

import (
	"database/sql"
	"errors"
	"fmt"
	"net/url"
	"os"
	"strings"
	"sync"
	"time"

	_ "github.com/go-sql-driver/mysql"
	_ "github.com/mutecomm/go-sqlcipher/v4"
	"go.uber.org/zap"
	_ "modernc.org/sqlite"
)

//go:generate mockgen --destination=./mock/db_mock.go --package=mock github.com/imperviousai/freeimp/state DBManager

type DBManager interface {
	/// IsReady will indicate if the SQL connection is ready
	IsReady() bool

	// IsLocked returns if the DB is available but locked
	IsLocked() bool

	// IsInitialized returns if the DB has ever been created
	IsInitialized() bool

	Type() string

	// Unlock will unlock an SQL database with a key/passphrase
	Unlock(string) error

	// RegisterInitScript will register initialization scripts
	// WILL PANIC IF ANY OF THESE SCRIPTS DO NOT RUN
	RegisterInitScript(string)

	// SafeQuery will query safely if the DB is ready
	SafeQuery(query string, args ...interface{}) (Rows, error)
	// SafeExec will query safely if the DB is ready
	SafeExec(query string, args ...interface{}) (Result, error)
}

type dbManager struct {
	db         *sql.DB
	dbType     string
	connection string

	isReady     bool
	initScripts []string
	initLock    sync.RWMutex
}

func NewDB(dbType, connection string) (DBManager, error) {
	// because time is hard to process...
	connection += "?parseTime=true"

	isReady := false
	var db *sql.DB
	var err error

	switch dbType {
	case "sqlite":
	case "sqlite3":
		// If sqlite and connection does contain
		// pragma key, then opening immediately.
		// Otherwise postpone until unlock.
		if strings.Contains(connection, "_pragma_key") {
			db, err = sql.Open(dbType, connection)
			if err != nil {
				return nil, err
			}
		}
	case "mysql":
		db, err = sql.Open(dbType, connection)
		if err != nil {
			return nil, err
		}
		if dbType == "mysql" {
			db.SetConnMaxLifetime(time.Minute * 3)
			db.SetMaxOpenConns(500)
			db.SetMaxIdleConns(500)
		}
		isReady = true

	}
	return &dbManager{
		db:         db,
		dbType:     dbType,
		connection: connection,
		isReady:    isReady,
		initLock:   sync.RWMutex{},
	}, nil
}

func (d *dbManager) DB() *sql.DB {
	return d.db
}

func (d *dbManager) IsReady() bool {
	d.initLock.RLock()
	defer d.initLock.RUnlock()
	return d.isReady
}

func (d *dbManager) Type() string {
	return d.dbType
}

func (d *dbManager) RegisterInitScript(script string) {
	d.initLock.Lock()
	defer d.initLock.Unlock()

	// if already ready then run now
	if d.isReady {
		_, err := d.db.Exec(script)
		if err != nil {
			panic(err)
		}
	} else {
		d.initScripts = append(d.initScripts, script)
	}
}

func (d *dbManager) Unlock(passphrase string) error {
	d.initLock.Lock()
	defer d.initLock.Unlock()
	if !d.isSQLITE() {
		// Others do not need to be unlocked first
		return nil
	}

	if d.isReady {
		// do nothing if already ready
		return errors.New("Already unlocked")
	}

	// The unlock
	key := url.QueryEscape(passphrase)
	pragmaConn := d.connection + fmt.Sprintf("&_pragma_key=%s&_pragma_cipher_page_size=4096", key)
	db, err := sql.Open(d.dbType, pragmaConn)
	if err != nil {
		return err
	}

	// test if the encryption worked, return err if not
	res, err := db.Query("SELECT count(*) FROM sqlite_master")
	if err != nil {
		d.db = nil
		d.isReady = false
		zap.L().Error(err.Error())
		return errors.New("Passphrase incorrect")
	}
	if err = res.Close(); err != nil {
		zap.L().Error(err.Error())
	}

	// Run through init scripts in order
	for _, script := range d.initScripts {
		zap.L().Debug(script)
		_, err := db.Exec(script)
		if err != nil {
			panic(err)
		}
	}

	d.db = db
	d.isReady = true
	d.connection = pragmaConn
	return nil
}

func (d *dbManager) IsInitialized() bool {
	d.initLock.RLock()
	defer d.initLock.RUnlock()

	if !d.isSQLITE() {
		// No additional initialization needed at all for mysql
		return true
	}

	// Check if file exists already
	dbPath := getStringInBetweenTwoString(d.connection, "file:", ".db?") + ".db"
	if _, err := os.Stat(dbPath); err == nil {
		return true
	} else if errors.Is(err, os.ErrNotExist) {
		return false
	}
	zap.L().Debug("Unsure of DB initialization, returning false")
	return false
}

func (d *dbManager) IsLocked() bool {
	d.initLock.RLock()
	defer d.initLock.RUnlock()

	if !d.isSQLITE() {
		// No additional initialization needed at all for mysql
		return false
	}

	// Check if file exists already
	isInitialized := d.IsInitialized()
	if isInitialized {
		return !d.isReady
	}
	return true
}

func (d *dbManager) SafeQuery(query string, args ...interface{}) (Rows, error) {
	if d.db == nil || !d.isReady {
		return nil, errors.New("DB not initialized")
	}
	return d.db.Query(query, args...)
}

func (d *dbManager) SafeExec(query string, args ...interface{}) (Result, error) {
	if d.db == nil || !d.isReady {
		return nil, errors.New("DB not initialized")
	}
	return d.db.Exec(query, args...)
}

func (d *dbManager) isSQLITE() bool {
	switch d.dbType {
	case "sqlite", "sqlite3":
		return true
	default:
		return false
	}
}

func PRIMARY_KEY(dbType string) string {
	switch dbType {
	case "mysql":
		return "PRIMARY KEY AUTO_INCREMENT"
	default:
		return "PRIMARY KEY"
	}
}

func DEFAULT_TIMESTAMP(dbType string) string {
	switch dbType {
	case "mysql":
		return "now()"
	default:
		return "CURRENT_TIMESTAMP"
	}
}

// interval must be minute, hour, second
// TODO support more
func DATE_SINCE(dbType string, value int, interval string) string {
	switch dbType {
	case "mysql":
		return fmt.Sprintf("now() - INTERVAL %d %s", value, interval)
	default:
		return fmt.Sprintf("datetime('now', '-%d %ss)", value, interval)
	}
}

func BOOL(dbType string, value bool) string {
	switch dbType {
	case "mysql":
		if value {
			return "1"
		} else {
			return "0"
		}

	default:
		if value {
			return "true"
		} else {
			return "false"
		}
	}
}

// Important, in JSON entries, must not have surrounding `'`
// because need to be able to stick in NULL with no `'`
func JSON(dbType string, value string) string {
	switch dbType {
	case "mysql":
		if value == "" {
			return "{}"
		} else {
			return value
		}

	default:
		return value
	}
}

func IGNORE(dbType string) string {
	switch dbType {
	case "mysql":
		return "IGNORE"
	default:
		return "OR IGNORE"
	}
}

func getStringInBetweenTwoString(str string, startS string, endS string) (result string) {
	s := strings.Index(str, startS)
	if s == -1 {
		return str
	}
	newS := str[s+len(startS):]
	e := strings.Index(newS, endS)
	if e == -1 {
		return str
	}
	result = newS[:e]
	return result
}
