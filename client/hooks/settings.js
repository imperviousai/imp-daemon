import { setItem, getItem } from "../utils/kv";
import { useQuery, useMutation, useQueryClient } from "react-query";

const getSettings = () => getItem("settings");

export const useFetchSettings = (onSuccess) => {
  return useQuery("fetch-settings", getSettings, {
    onSuccess,
    onError: (e) => {
      console.log("Unable to fetch settings: ", e);
    },
    select: (res) => {
      if (res.data.value) {
        return JSON.parse(res.data.value);
      } else {
        return res.data.value; // likely ""
      }
    },
  });
};

export const useUpdateSettings = () => {
  const queryClient = useQueryClient();
  return useMutation(setItem, {
    onSuccess: () => {
      console.log("Settings Updated!");
      queryClient.invalidateQueries("fetch-settings");
    },
    onError: (error) => {
      toast.error("Unable to save settings. Please try again.");
      console.error("Error updating current registry user: ", error);
    },
  });
};
