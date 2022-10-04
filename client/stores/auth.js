import { atomWithStorage } from "jotai/utils";
import { atom } from "jotai";

export const recoverySeedSavedAtom = atom("recoverySeedSaved", false);

export const completedSetupAtom = atomWithStorage("completedSetup", false);

export const passwordSetAtom = atomWithStorage("passwordSet", false);

export const recoverySeedAtom = atomWithStorage("recoverySeed", "");

export const voltageApiKeyAtom = atomWithStorage("voltageApiKey", "");

export const newBrowserAtom = atomWithStorage("newBrowser", false);

export const voltageNodePasswordAtom = atom("");

export const voltageNodeAtom = atom("");

export const auth0TokenAtom = atom("");

export const auth0UserAtom = atom();
