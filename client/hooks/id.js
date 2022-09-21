import { useQuery, useMutation, useQueryClient } from "react-query";
import { fetchDids, createDid, updateDid, recoverDid } from "../utils/id";
import { toast } from "react-toastify";
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
