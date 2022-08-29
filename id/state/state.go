package state

import (
	"database/sql"
	"fmt"
	"time"

	"github.com/imperviousai/freeimp/state"
	_ "modernc.org/sqlite"
)

//go:generate mockgen --destination=./mock/identity_state_mock.go --package=mock github.com/imperviousai/freeimp/id/state IdentityState

type IdentityState interface {
	SaveID(id, document string, belongsToUser bool, identityKeyId int64, patches string) error
	UpdateID(id, patches string) error
	ListIDs() ([]*IdState, error)
	FindID(id string) (*IdState, error)
	FindOwnDID() ([]*IdState, error)
	DeleteID(id string) error
	GetDIDKeyId(id string) (int64, error)
}

type identityState struct {
	db state.DBManager
}

type idStateInternal struct {
	Id            int64          `json:"id"`
	Did           string         `json:"did"`
	Document      sql.NullString `json:"document"`
	BelongsToUser bool           `json:"belongsToUser"`
	IdentityKeyId uint32         `json:"identityKeyId"`
	Patches       sql.NullString `json:"patches"`
	Added         sql.NullTime   `json:"added"`
}

type IdState struct {
	Id            int64     `json:"id"`
	Did           string    `json:"did"`
	Document      string    `json:"document"`
	BelongsToUser bool      `json:"belongsToUser"`
	IdentityKeyId uint32    `json:"identityKeyId"`
	Patches       string    `json:"patches"`
	Added         time.Time `json:"added"`
}

func convertIdStateInternal(internal *idStateInternal) *IdState {
	var nullableDoc string
	var nullablePatches string
	var nullableAdded time.Time

	if internal.Document.Valid {
		// for json strings, check if empty json, then just return empty string
		if internal.Document.String != "{}" {
			nullableDoc = internal.Document.String
		}
	}
	if internal.Patches.Valid {
		if internal.Patches.String != "{}" {
			nullablePatches = internal.Patches.String
		}
	}
	if internal.Added.Valid {
		nullableAdded = internal.Added.Time
	}

	return &IdState{
		Id:            internal.Id,
		Did:           internal.Did,
		Document:      nullableDoc,
		BelongsToUser: internal.BelongsToUser,
		IdentityKeyId: internal.IdentityKeyId,
		Patches:       nullablePatches,
		Added:         nullableAdded,
	}
}

func InitIdentityState(db state.DBManager) (IdentityState, error) {
	// create Identity Table where id has to be unique, essentially a primary key
	createIdentityTable := fmt.Sprintf("create table if not exists identity (id integer %s, did VARCHAR(255) not null, document json, belongsToUser bool, identityKeyId integer, patches json, added datetime default %s, unique(id))", state.PRIMARY_KEY(db.Type()), state.DEFAULT_TIMESTAMP(db.Type()))
	db.RegisterInitScript(createIdentityTable)

	return &identityState{
		db: db,
	}, nil
}

func (i *identityState) SaveID(id, document string, belongsToUser bool, identityKeyId int64, patches string) error {
	sqlStmt := "insert into identity(did, document, belongsToUser, identityKeyId, patches) values(?, ?, ?, ?, ?)"
	_, err := i.db.SafeExec(sqlStmt, id, state.JSON(i.db.Type(), document), state.BOOL(i.db.Type(), belongsToUser), identityKeyId, state.JSON(i.db.Type(), patches))
	if err != nil {
		return err
	}
	return nil
}

func (i *identityState) UpdateID(did, patches string) error {
	sqlStmt := "update identity set patches = ? where did = ?"
	_, err := i.db.SafeExec(sqlStmt, state.JSON(i.db.Type(), patches), did)
	if err != nil {
		return err
	}
	return nil
}

func (i *identityState) ListIDs() ([]*IdState, error) {
	outputList := make([]*IdState, 0)
	sqlStmt := "select document, patches from identity"
	rows, err := i.db.SafeQuery(sqlStmt)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	for rows.Next() {
		output := &idStateInternal{}
		err = rows.Scan(&output.Document, &output.Patches)
		if err != nil {
			return nil, err
		}
		outputList = append(outputList, convertIdStateInternal(output))
	}
	err = rows.Err()
	if err != nil {
		return nil, err
	}
	return outputList, nil
}

func (i *identityState) FindID(did string) (*IdState, error) {
	output := &idStateInternal{}
	sqlStmt := "select document, patches, belongsToUser from identity where did = ?"
	rows, err := i.db.SafeQuery(sqlStmt, did)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	if !rows.Next() {
		if rows.Err() == nil {
			return nil, nil
		}
		// No error means there were just no results
		return nil, rows.Err()
	}

	err = rows.Scan(&output.Document, &output.Patches, &output.BelongsToUser)
	if err != nil {
		return nil, err
	}
	return convertIdStateInternal(output), nil
}

func (i *identityState) DeleteID(did string) error {
	sqlStmt := "delete from identity where did = ?"
	_, err := i.db.SafeExec(sqlStmt, did)
	if err != nil {
		return err
	}
	return nil
}

func (i *identityState) GetDIDKeyId(did string) (int64, error) {
	var output int64
	sqlStmt := "select identityKeyId from identity where did = ?"
	rows, err := i.db.SafeQuery(sqlStmt, did)
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

	err = rows.Scan(&output)
	if err != nil {
		return 0, err
	}
	return output, nil
}

func (i *identityState) FindOwnDID() ([]*IdState, error) {
	outputList := make([]*IdState, 0)
	sqlStmt := "select document, patches from identity where belongsToUser = ? ORDER BY added DESC"
	rows, err := i.db.SafeQuery(sqlStmt, state.BOOL(i.db.Type(), true))
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	for rows.Next() {
		output := &idStateInternal{}
		err = rows.Scan(&output.Document, &output.Patches)
		if err != nil {
			return nil, err
		}
		outputList = append(outputList, convertIdStateInternal(output))
	}
	err = rows.Err()
	if err != nil {
		return nil, err
	}
	return outputList, nil
}
