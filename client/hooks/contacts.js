import { useQuery, useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import {
  fetchContacts,
  addContact,
  updateContact,
  fetchContactById,
  deleteContactById,
} from "../utils/contacts";
import { getItem, setItem } from "../utils/kv";

// useFetchContacts will return a list of all of the contacts known in the database
export const useFetchContacts = (onSuccess) => {
  return useQuery("fetch-contacts", fetchContacts, {
    onSuccess,
    onError: (error) => {
      toast.error("Unable to fetch contacts. Please try again.");
      console.log("Unable to fetch contacts. Error: ", error);
    },
  });
};

// useFetchContactById by id will return the specific contact from the database who's id matches the supplied id
export const useFetchContactById = (id, onSuccess, onError) => {
  return useQuery("fetch-contact-by-id", () => fetchContactById(id), {
    onSuccess,
    onError,
  });
};

// useAddContact will handle saving a contact into the database, invalidating the useFetchContact query.
// It may also invalidate the useFetchContactById as well. We shall see.
// NOTE: requires myDID as parameter so assign contact to the current user profile (for did switching)
export const useAddContact = () => {
  const queryClient = useQueryClient();
  return useMutation(addContact, {
    onSuccess: () => {
      queryClient.invalidateQueries("fetch-contacts");
      toast.success("Contact added successfully!");
    },
    onError: (error) => {
      toast.error("Error adding contact. Please try again.");
      console.log("Error adding contact: ", error);
    },
  });
};

// useDeleteContact will handling deletion of a contact from the database, it will also invalidate the useFetchContact query
export const useDeleteContactById = () => {
  const queryClient = useQueryClient();
  return useMutation(deleteContactById, {
    onSuccess: () => {
      queryClient.invalidateQueries("fetch-contacts");
    },
    onError: (error) => {
      ß;
      console.log("Error deleting contact: ", error);
    },
  });
};

// useUpdateContact will update a contact in the database, invalidating the useFetchContact query
export const useUpdateContact = () => {
  const queryClient = useQueryClient();
  return useMutation(updateContact, {
    onSuccess: () => {
      queryClient.invalidateQueries("fetch-contacts");
      toast.success("Contact updated successfully!");
    },
    onError: (error) => {
      console.log("Error updating contact: ", error);
      toast.error("Unable to update contact: ", error);
    },
  });
};

// implementing a blocklist feature to stop recieving messages from certain contacts/dids
const getBlocklist = () => getItem("blocklist");

export const useFetchBlocklist = (onSuccess) => {
  return useQuery("fetch-blocklist", getBlocklist, {
    onSuccess,
    onError: (e) => {
      console.log("Unable to fetch blocklist: ", e);
    },
    select: (res) => {
      if (res.data.value) {
        return JSON.parse(res.data.value);
      } else {
        return res.data.value;
      }
    },
  });
};

export const useUpdateBlocklist = () => {
  const queryClient = useQueryClient();
  return useMutation(setItem, {
    onSuccess: () => {
      console.log("Blocklist successfully updated");
      queryClient.invalidateQueries("fetch-blocklist");
    },
    onError: (error) => {
      console.error("Error updating the blocklist: ", error);
    },
  });
};
