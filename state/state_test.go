package state

import (
	"fmt"
	"strings"
	"testing"
)

func TestGetStringInBetweenTwoString(t *testing.T) {
	stringBeginning := "this"
	stringEnd := "that"
	stringInBetween := "inbetween"

	stringToTest := fmt.Sprintf("%s%s%s", stringBeginning, stringInBetween, stringEnd)

	result := getStringInBetweenTwoString(stringToTest, stringBeginning, stringEnd)
	if strings.Compare(result, stringInBetween) != 0 {
		t.Error("string in between does not match")
		return
	}
}
