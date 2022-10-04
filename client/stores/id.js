import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

export const myDidDocumentAtom = atom();
export const myDidLongFormDocumentAtom = atom();
export const publishedDidAtom = atom("");
export const currentRegistryUserAtom = atomWithStorage(
  "currentRegisteryUser",
  ""
);
