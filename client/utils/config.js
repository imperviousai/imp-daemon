import { request } from "./axios-utils";
import { getApiKey } from "./misc";

// Utility functions for handling the daemon's config

// retrieves the current lightning configuration
export const getLightningConfig = () => {
  return request({
    url: "/v1/config/lightning",
    method: "get",
    headers: {
      "Grpc-Metadata-X-API-KEY": `${getApiKey()}`,
    },
  });
};

export const saveLightningConfig = ({ config }) => {
  return request({
    url: "/v1/config/lightning",
    method: "post",
    data: { lightningConfig: { ...config } },
    headers: {
      "Grpc-Metadata-X-API-KEY": `${getApiKey()}`,
    },
  });
};
