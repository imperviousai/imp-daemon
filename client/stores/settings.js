import { atomWithStorage } from "jotai/utils";
import { getRandomAvatar } from "../utils/contacts";

export const myAvatarAtom = atomWithStorage("myAvatar", getRandomAvatar());
