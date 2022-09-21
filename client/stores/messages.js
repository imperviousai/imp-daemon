import { atomWithStorage } from "jotai/utils";
import { atom } from "jotai";

// primitive atom that represents the current viewable conversation, expects input to be a contact object
export const currentConversationAtom = atom();

export const readMessagesAtom = atomWithStorage("readMessages", []);

export const lightningEnabledAtom = atom(false);
