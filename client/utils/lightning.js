import { request } from "./axios-utils";
import { getApiKey } from "./misc";
// Utility functions for lightning services

export const checkInvoice = ({ invoice }) => {
  return request({
    url: "/v1/lightning/checkinvoice",
    method: "post",
    data: { invoice },
    headers: {
      "Grpc-Metadata-X-API-KEY": `${getApiKey()}`,
    },
  });
};

export const generateInvoice = ({ amount, memo }) => {
  return request({
    url: "/v1/lightning/generateinvoice",
    method: "post",
    data: { amount, memo },
    headers: {
      "Grpc-Metadata-X-API-KEY": `${getApiKey()}`,
    },
  });
};

export const payInvoice = ({ invoice }) => {
  return request({
    url: "/v1/lightning/payinvoice",
    method: "post",
    data: { invoice },
    headers: {
      "Grpc-Metadata-X-API-KEY": `${getApiKey()}`,
    },
  });
};
