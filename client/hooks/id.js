import { useQuery, useMutation, useQueryClient } from "react-query";
import { fetchDids, createDid, updateDid, recoverDid } from "../utils/id";
import { toast } from "react-toastify";
import { setItem, getItem } from "../utils/kv";
// useFetchMyDid returns the first did in the database, as the first entry is created
// during onboarding, and is going to be your did. We should likely have a better way to
// determine did ownership at some point (i.e. DID switching)
export const useFetchMyDid = (onSuccess) => {
  return useQuery("fetch-my-did", fetchDids, {
    onSuccess,
    onError: () => {
      toast.error("Unable to fetch current profile (ID).");
    },
    select: (data) => {
      // for now we assume the first created did in the database is yours
      // due to the onboarding flow creating the first did
      return JSON.parse(data.data.documents[0]);
    },
  });
};

// useCreateDid creates a did (primarily used during onboarding), invalidates fetch-my-did
export const useCreateDid = () => {
  const queryClient = useQueryClient();
  return useMutation(createDid, {
    onSuccess: () => {
      queryClient.invalidateQueries("fetch-my-did");
    },
    onError: (error) => console.log("Error creating did: ", error),
  });
};

// useRecoverDid restores a did from a provided recovery kit and the passphrase (also in the recovery kit)
export const useRecoverDid = () => {
  const queryClient = useQueryClient();
  return useMutation(recoverDid, {
    onSuccess: () => {
      console.log("Successfully recovered DID");
      queryClient.invalidateQueries("fetch-key-status");
    },
    onError: (error) => console.log("Error recovering DID: ", error),
  });
};

// useUpdate did updates a user's primarily did and sets myDid as the updated did
export const useUpdateDid = () => {
  const queryClient = useQueryClient();
  return useMutation(updateDid, {
    onSuccess: () => {
      toast.success("DID Successfully updated!");
      queryClient.invalidateQueries("fetch-my-did");
    },
    onError: (error) => console.log("Error updating did: ", error),
  });
};

// For now, we won't do a fetchDids because it's a bit duplicative with fetchContacts given
// contacts already contains the dids within them

// We will need to create a mutation to update your own did contents, and then invalidate the
// the above query upon a mutation.

const getMyAvatar = () => getItem("myAvatar");

export const useFetchMyAvatar = (onSuccess) => {
  return useQuery("fetch-my-avatar", getMyAvatar, {
    onSuccess,
    onError: (e) => {
      console.error("Unable to fetch my avatar: ", e);
    },
    select: (res) => res.data.value,
  });
};

export const useUpdateMyAvatar = () => {
  const queryClient = useQueryClient();
  return useMutation(setItem, {
    onSuccess: () => {
      console.log("Successfully updated my avatar!");
      queryClient.invalidateQueries("fetch-my-avatar");
    },
    onError: (error) => {
      toast.error("Error saving avatar. Please try again.");
      console.error("Error updated my avatar: ", error);
    },
  });
};

const getCurrentRegisteryUser = () => getItem("currentRegistryUser");

export const useFetchCurrentRegistryUser = (onSuccess) => {
  return useQuery("fetch-current-registry-user", getCurrentRegisteryUser, {
    onSuccess,
    onError: (e) => {
      console.log("Unable to fetch current registry user: ", e);
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

export const useUpdateCurrentRegistryUser = () => {
  const queryClient = useQueryClient();
  return useMutation(setItem, {
    onSuccess: () => {
      console.log("Set new current registry user!");
      queryClient.invalidateQueries("fetch-current-registry-user");
    },
    onError: (error) => {
      console.error("Error updating current registry user: ", error);
    },
  });
};
