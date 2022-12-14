import { request } from "./axios-utils";
import { getApiKey } from "./misc";

export const getShortFormId = (did) => did.split("?")[0];

// Utility functions for ID management
export const fetchDids = () => {
  return request({
    url: "/v1/id/listDID",
    method: "get",
    headers: {
      "Grpc-Metadata-X-API-KEY": `${getApiKey()}`,
    },
  });
};

export const createDid = (didDocument) => {
  return request({
    url: "/v1/id/createDID",
    method: "post",
    data: didDocument,
    headers: {
      "Grpc-Metadata-X-API-KEY": `${getApiKey()}`,
    },
  });
};

export const resolveDid = (didId) => {
  return request({
    url: "/v1/id/resolveDID",
    method: "post",
    data: { did: didId },
    headers: {
      "Grpc-Metadata-X-API-KEY": `${getApiKey()}`,
    },
  });
};

export const recoverDid = (recoveryKit) => {
  const { passphrase } = recoveryKit;
  delete recoveryKit.passphrase;
  const data = { recoveryKit, passphrase };
  return request({
    url: "/v1/id/recover",
    method: "post",
    data,
    headers: {
      "Grpc-Metadata-X-API-KEY": `${getApiKey()}`,
    },
  });
};

export const importDid = (document) => {
  return request({
    url: "/v1/id/importDID",
    method: "post",
    data: { document },
    headers: {
      "Grpc-Metadata-X-API-KEY": `${getApiKey()}`,
    },
  });
};

export const updateDid = (document) => {
  return request({
    url: "v1/id/updateDID",
    method: "post",
    data: { document, signature: "" },
    headers: {
      "Grpc-Metadata-X-API-KEY": `${getApiKey()}`,
    },
  });
};
