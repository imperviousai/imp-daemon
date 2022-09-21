import { atomWithStorage } from "jotai/utils";
import { getRandomAvatar } from "../utils/contacts";
import localforage from "localforage";

export const myAvatarAtom = atomWithStorage("myAvatar", getRandomAvatar());
