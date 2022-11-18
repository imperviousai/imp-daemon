import { atomWithStorage } from "jotai/utils";
import { atom } from "jotai";

// primitive atom that represents the current viewable conversation, expects input to be a groupId
export const currentConversationAtom = atom();

export const currentConversationContactAtom = atom();

export const readMessagesAtom = atomWithStorage("readMessages", []);

export const lightningEnabledAtom = atom(false);

export const meetingInviteListAtom = atom([]);
