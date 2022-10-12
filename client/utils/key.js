import { request } from "./axios-utils";
import { getApiKey } from "./misc";
// Utility functions for the Key management
// Initializes the daemon
export const initSeed = async ({ passphrase, mnemonic }) => {
  let data = { passphrase };
  if (mnemonic) {
    // typo in the daemon
    data = { passphrase, mnenomic: mnemonic };
  }
  return await request({
    url: "/v1/key/initSeed",
    method: "post",
    data,
    headers: {
      "Grpc-Metadata-X-API-KEY": `${getApiKey()}`,
    },
  });
};

// unlocks the daemon using the passphrase
export const unlockSeed = async (passphrase) => {
  return await request({
    url: "/v1/key/unlockSeed",
    method: "post",
    data: { passphrase },
    headers: {
      "Grpc-Metadata-X-API-KEY": `${getApiKey()}`,
    },
  });
};

// check on the key status of the daemon (UNLOCKED, NOT_INITIALIZED, LOCKED)
export const getKeyStatus = async () => {
  return await request({
    url: "/v1/key/status",
    method: "get",
    headers: {
      "Grpc-Metadata-X-API-KEY": `${getApiKey()}`,
    },
  });
};
