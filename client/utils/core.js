import { request } from "./axios-utils";
import { getApiKey } from "./misc";

// pulls the core status API
export const getCoreStatus = async () => {
  return await request({
    url: "/v1/core/status",
    method: "get",
    headers: {
      "Grpc-Metadata-X-API-KEY": `${getApiKey()}`,
    },
  });
};

// quick function to return if lightning is enabled or not
export const lightningIsEnabled = (coreStatus) => {
  let activeNodes = coreStatus.data.lightningStatus.nodeStatusList.find(
    (node) => node.active === true
  );
  if (activeNodes) {
    return true;
  } else {
    return false;
  }
};

export const getActiveLightningNode = (coreStatus) => {
  let activeNodes = coreStatus.data.lightningStatus.nodeStatusList.find(
    (node) => node.active === true
  );
};
