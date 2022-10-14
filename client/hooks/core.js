import { useQuery } from "react-query";
import { getCoreStatus } from "../utils/core";

// useGetCoreStatus fetches the core status of the daemon
export const useGetCoreStatus = (onSuccess) => {
  return useQuery("fetch-core-status", getCoreStatus, {
    onSuccess,
    onError: (e) => {
      console.log("Unable to fetch core status: ", e);
    },
  });
};
