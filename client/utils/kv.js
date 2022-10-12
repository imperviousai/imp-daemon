import { request } from "./axios-utils";
import { getApiKey } from "./misc";
// Utility functions for the Key/Value store management in the daemon

// sets a key/value pair in the daemon with a supplied key and value
export const setItem = async ({ key, value }) => {
  return await request({
    url: "/v1/kv/setkey",
    method: "post",
    data: { key, value },
    headers: {
      "Grpc-Metadata-X-API-KEY": `${getApiKey()}`,
    },
  });
};

// retrieves a key/value pair in the daemon with a supplied key
export const getItem = async (key) => {
  return await request({
    url: "/v1/kv/getkey",
    method: "post",
    data: { key },
    headers: {
      "Grpc-Metadata-X-API-KEY": `${getApiKey()}`,
    },
  });
};

// deletes a key/value pair in the daemon with a supplied key
export const removeItem = async (key) => {
  return await request({
    url: "/v1/kv/delkey",
    method: "post",
    data: { key },
    headers: {
      "Grpc-Metadata-X-API-KEY": `${getApiKey()}`,
    },
  });
};
