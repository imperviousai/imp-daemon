import { atomWithStorage } from "jotai/utils";
import { atom } from "jotai";

export const recoverySeedSavedAtom = atomWithStorage(
  "recoverySeedSaved",
  false
);

export const passwordSetAtom = atomWithStorage("passwordSet", false);

export const recoverySeedAtom = atom("");

export const voltageNodePasswordAtom = atom("");

export const voltageNodeAtom = atom("");

export const auth0TokenAtom = atom("");

export const auth0UserAtom = atom();
