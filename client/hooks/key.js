import { useQuery, useMutation, useQueryClient } from "react-query";
import { initSeed, unlockSeed, getKeyStatus } from "../utils/key";
import { getItem } from "../utils/kv";

// useGetKeyStatus fetches the current status of the daemon db/key
export const useGetKeyStatus = (onSuccess, onError) => {
  return useQuery("fetch-key-status", getKeyStatus, {
    onSuccess,
    onError,
  });
};

// useInitSeed initializes the master seed for the daemon
export const useInitSeed = () => {
  return useMutation(initSeed, {
    onSuccess: () => console.log("Seed initialized."),
    onError: (error) => console.log("Error initializing seed: ", error),
  });
};

// useUnlockSeed unlocks the master seed for the daemon
export const useUnlockSeed = () => {
  const queryClient = useQueryClient();
  return useMutation(unlockSeed, {
    onSuccess: () => {
      queryClient.invalidateQueries("fetch-key-status");
    },
    onError: (error) => console.log("Error unlocking seed: ", error),
  });
};

// useGetCompletedSetup returns the value of completedSetup in the dameon's KV for initialization
export const useGetCompletedSetup = (onSuccess, onError) => {
  return useQuery("fetch-completed-setup", () =>
    getItem("completedSetup", {
      onSuccess,
      onError,
    })
  );
};
