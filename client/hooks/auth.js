import { useQuery, useMutation, useQueryClient } from "react-query";
import { setItem, getItem } from "../utils/kv";

const getCompletedSetup = () => getItem("completedSetup");

export const useFetchCompletedSetup = (onSuccess) => {
  return useQuery("fetch-completed-setup", getCompletedSetup, {
    onSuccess,
    onError: (e) => {
      console.error("Unable to fetch completedSetup status: ", e);
    },
    select: (res) => res.data.value,
  });
};

export const useUpdateCompletedSetup = () => {
  const queryClient = useQueryClient();
  return useMutation(setItem, {
    onSuccess: () => {
      console.log("Successfully updated completedSetup!");
      queryClient.invalidateQueries("fetch-completed-setup");
    },
    onError: (error) => {
      console.error("Error updating completed setup ", error);
    },
  });
};
