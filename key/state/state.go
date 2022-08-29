package state

import (
	"database/sql"
	"errors"
	"fmt"

	"github.com/imperviousai/freeimp/state"
	_ "modernc.org/sqlite"
)

//go:generate mockgen --destination=./mock/key_state_mock.go --package=mock github.com/imperviousai/freeimp/key/state KeyState

type KeyState interface {
	SaveSeed(seed, salt, mnemonic string) error
	GetSeed() (string, string, error)
	GetMnemonic() (string, string, error)
	GetLastSeedIndex(id uint32) (uint32, error)
	GetLastChildIndex(child int64) (uint32, error)
	AddChild(childIndex uint32, parentChildId int64) (int64, error)
	GetChild(childId int64) (index uint32, parentId int64, rootDerivation int64, err error)
	GetChildrenKeys(parentId int64) ([]KeyType, error)
	GetAllParentRootKeys() ([]KeyType, error)
}

type keyState struct {
	db state.DBManager
}

type KeyType struct {
	Id             int64
	Index          uint32
	ParentId       int64
	RootDerivation int64
}

func InitKeyState(db state.DBManager) (KeyState, error) {
	// create seed table that just holds the encrypted seed
	createSeedTable := fmt.Sprintf("create table if not exists seed (id integer %s, encrypted_seed TEXT, encrypted_mnemonic TEXT, salt TEXT )", state.PRIMARY_KEY(db.Type()))
	db.RegisterInitScript(createSeedTable)

	// create seed table that just holds the encrypted seed
	createKeyTable := fmt.Sprintf("create table if not exists child_keys (id integer %s, child_index integer NOT NULL, parent_child_id integer REFERENCES child_keys(id), root_derivation integer, UNIQUE(child_index, parent_child_id))", state.PRIMARY_KEY(db.Type()))
	db.RegisterInitScript(createKeyTable)

	return &keyState{
		db: db,
	}, nil
}

func (s *keyState) SaveSeed(seed, salt, mnemonic string) error {
	sqlStmt := "insert into seed(encrypted_seed, encrypted_mnemonic, salt) values(?, ?, ?)"
	_, err := s.db.SafeExec(sqlStmt, seed, mnemonic, salt)
	if err != nil {
		return err
	}
	return nil
}

func (s *keyState) GetSeed() (string, string, error) {
	var encryptedSeed string
	var salt string
	sqlStmt := "select encrypted_seed, salt from seed"
	rows, err := s.db.SafeQuery(sqlStmt)
	if err != nil {
		return "", "", err
	}
	defer rows.Close()
	if !rows.Next() {
		if rows.Err() == nil {
			return "", "", nil
		}
		// No error means there were just no results
		return "", "", rows.Err()
	}
	err = rows.Scan(&encryptedSeed, &salt)
	if err != nil {
		return "", "", err
	}
	return encryptedSeed, salt, nil
}

func (s *keyState) GetMnemonic() (string, string, error) {
	var encryptedMnemonic string
	var salt string
	sqlStmt := "select encrypted_mnemonic, salt from seed"
	rows, err := s.db.SafeQuery(sqlStmt)
	if err != nil {
		return "", "", err
	}
	defer rows.Close()
	if !rows.Next() {
		if rows.Err() == nil {
			return "", "", nil
		}
		// No error means there were just no results
		return "", "", rows.Err()
	}
	err = rows.Scan(&encryptedMnemonic, &salt)
	if err != nil {
		return "", "", err
	}
	return encryptedMnemonic, salt, nil
}

func (s *keyState) GetLastSeedIndex(id uint32) (uint32, error) {
	var max sql.NullInt32
	sqlStmt := "select MAX(child_index) as output from child_keys where parent_child_id = '0' AND root_derivation = ?"
	rows, err := s.db.SafeQuery(sqlStmt, id)
	if err != nil {
		return 0, err
	}
	defer rows.Close()
	if !rows.Next() {
		if rows.Err() == nil {
			return 0, nil
		}
		// No error means there were just no results
		return 0, rows.Err()
	}
	err = rows.Scan(&max)
	if err != nil {
		return 0, err
	}

	if max.Valid {
		return uint32(max.Int32), nil
	}

	// if NULL, that means there's none, return 0
	return 0, nil
}

func (s *keyState) GetLastChildIndex(child int64) (uint32, error) {
	var max sql.NullInt32
	sqlStmt := "select MAX(child_index) as output from child_keys where parent_child_id = ? AND root_derivation = 0"
	rows, err := s.db.SafeQuery(sqlStmt, child)
	if err != nil {
		return 0, err
	}
	defer rows.Close()
	if !rows.Next() {
		if rows.Err() == nil {
			return 0, nil
		}
		// No error means there were just no results
		return 0, rows.Err()
	}
	err = rows.Scan(&max)
	if err != nil {
		return 0, err
	}
	if max.Valid {
		return uint32(max.Int32), nil
	}

	// if NULL, that means there's none, return 0
	return 0, nil
}

func (s *keyState) AddChild(childIndex uint32, parentChildId int64) (int64, error) {
	root_derivation := int64(0)
	if parentChildId == 0 {
		// Right now, only should have one seed
		// Lack of a parent child index means root is the parent
		root_derivation = 1
	}

	sqlStmt := "insert into child_keys(child_index, parent_child_id, root_derivation) values(?, ?, ?)"
	res, err := s.db.SafeExec(sqlStmt, childIndex, parentChildId, root_derivation)
	if err != nil {
		return 0, err
	}
	resultId, err := res.LastInsertId()
	if err != nil {
		return 0, err
	}

	return resultId, nil
}

func (s *keyState) GetChild(childId int64) (index uint32, parentId int64, rootDerivation int64, err error) {
	sqlStmt := "select child_index, parent_child_id, root_derivation from child_keys where id = ?"
	rows, err := s.db.SafeQuery(sqlStmt, childId)
	if err != nil {
		return 0, 0, 0, err
	}
	defer rows.Close()
	if !rows.Next() {
		if rows.Err() == nil {
			return 0, 0, 0, errors.New("Could not find child id")
		}
		// No error means there were just no results
		return 0, 0, 0, rows.Err()
	}

	err = rows.Scan(&index, &parentId, &rootDerivation)
	if err != nil {
		return 0, 0, 0, err
	}
	return index, parentId, rootDerivation, nil
}

func (s *keyState) GetChildrenKeys(parentId int64) ([]KeyType, error) {
	childrenKeys := make([]KeyType, 0)
	sqlStmt := "select id, child_index, parent_child_id, root_derivation from child_keys where parent_child_id = ?"
	rows, err := s.db.SafeQuery(sqlStmt, parentId)
	if err != nil {
		return nil, err
	}

	defer rows.Close()
	for rows.Next() {
		childKey := KeyType{}
		err = rows.Scan(&childKey.Id, &childKey.Index, &childKey.ParentId, &childKey.RootDerivation)
		if err != nil {
			return nil, err
		}
		childrenKeys = append(childrenKeys, childKey)
	}

	err = rows.Err()
	if err != nil {
		return childrenKeys, err
	}
	return childrenKeys, err
}

func (s *keyState) GetAllParentRootKeys() ([]KeyType, error) {
	childrenKeys := make([]KeyType, 0)
	// Right now master seed root_derivation is always 1
	sqlStmt := "select id, child_index, parent_child_id, root_derivation from child_keys where root_derivation = '1'"
	rows, err := s.db.SafeQuery(sqlStmt)
	if err != nil {
		return nil, err
	}

	defer rows.Close()
	for rows.Next() {
		childKey := KeyType{}
		err = rows.Scan(&childKey.Id, &childKey.Index, &childKey.ParentId, &childKey.RootDerivation)
		if err != nil {
			return nil, err
		}
		childrenKeys = append(childrenKeys, childKey)
	}

	err = rows.Err()
	if err != nil {
		return childrenKeys, err
	}
	return childrenKeys, err
}
