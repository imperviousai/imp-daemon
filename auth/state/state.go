package state

import (
	"database/sql"
	"fmt"
	"time"

	"github.com/google/uuid"
	"github.com/imperviousai/imp-daemon/state"
)

//go:generate mockgen --destination=./mock/auth_state_mock.go --package=mock github.com/imperviousai/imp-daemon/auth/state AuthState

type AuthState interface {
	SaveAuth(authModel *AuthStateModel) (int64, error)
	UpdateAuth(authUpdate *AuthStateModel) error
	ListAuth() ([]*AuthStateModel, error)
	DeleteAuth(id int64) error
}

type authState struct {
	db state.DBManager
}

type authStateInternal struct {
	Id          int64          `json:"id"`
	Name        sql.NullString `json:"name"`
	Description sql.NullString `json:"description"`
	Key         sql.NullString `json:"key"`
	Added       sql.NullTime   `json:"added"`
}

type AuthStateModel struct {
	Id          int64     `json:"id"`
	Name        string    `json:"name"`
	Description string    `json:"description"`
	Key         string    `json:"key"`
	Added       time.Time `json:"added"`
}

func convertAuthStateInternal(internal *authStateInternal) *AuthStateModel {
	var nullableName string
	var nullableDescription string
	var nullableKey string
	var nullableAdded time.Time

	if internal.Name.Valid {
		nullableName = internal.Name.String
	}
	if internal.Description.Valid {
		nullableDescription = internal.Description.String
	}
	if internal.Key.Valid {
		nullableKey = internal.Key.String
	}
	if internal.Added.Valid {
		nullableAdded = internal.Added.Time
	}

	return &AuthStateModel{
		Id:          internal.Id,
		Name:        nullableName,
		Description: nullableDescription,
		Key:         nullableKey,
		Added:       nullableAdded,
	}
}

func InitAuthState(db state.DBManager) (AuthState, error) {
	createAuthTable := fmt.Sprintf("create table if not exists auth (id integer %s, name VARCHAR(255), description VARCHAR(255), apikey VARCHAR(36) NOT NULL, added datetime default %s)", state.PRIMARY_KEY(db.Type()), state.DEFAULT_TIMESTAMP(db.Type()))
	db.RegisterInitScript(createAuthTable)

	keyStr := uuid.New().String()
	firstAuthRow := fmt.Sprintf("insert %s into auth(id, name, description, apikey) values(1, 'Initial', 'Description', '%s')", state.IGNORE(db.Type()), keyStr)
	db.RegisterInitScript(firstAuthRow)

	authState := &authState{
		db: db,
	}

	return authState, nil
}

func (a *authState) SaveAuth(authModel *AuthStateModel) (int64, error) {
	sqlStmt := "insert into auth(name, description, apikey) values(?, ?, ?)"
	result, err := a.db.SafeExec(sqlStmt, authModel.Name, authModel.Description, authModel.Key)
	if err != nil {
		return 0, err
	}
	return result.LastInsertId()
}

func (a *authState) UpdateAuth(authUpdate *AuthStateModel) error {
	sqlStmt := "update auth set name = ?, description = ? where id = ?"
	_, err := a.db.SafeExec(sqlStmt, authUpdate.Name, authUpdate.Description, authUpdate.Id)
	if err != nil {
		return err
	}
	return nil
}

func (a *authState) ListAuth() ([]*AuthStateModel, error) {
	authList := make([]*AuthStateModel, 0)
	sqlStmt := "select id, name, description, apikey, added from auth"
	rows, err := a.db.SafeQuery(sqlStmt)
	if err != nil {
		return nil, err
	}

	defer rows.Close()
	for rows.Next() {
		authInfo := &authStateInternal{}
		err = rows.Scan(&authInfo.Id, &authInfo.Name, &authInfo.Description, &authInfo.Key, &authInfo.Added)
		if err != nil {
			return nil, err
		}
		convertedAuth := convertAuthStateInternal(authInfo)
		authList = append(authList, convertedAuth)
	}

	err = rows.Err()
	if err != nil {
		return nil, err
	}
	return authList, err
}

func (a *authState) DeleteAuth(id int64) error {
	sqlStmt := "delete from auth where id = ?"
	_, err := a.db.SafeExec(sqlStmt, id)
	if err != nil {
		return err
	}
	return nil
}
