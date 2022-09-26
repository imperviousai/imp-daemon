import { useQuery, useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { fetchFiles, uploadFile, fetchFileById } from "../utils/files";

// useFetchFiles returns a list of files uplaoded to IPFS and listed in the database
export const useFetchFiles = (onSuccess, onError) => {
  return useQuery("fetch-files", fetchFiles, {
    onSuccess: (data) => {
      onSuccess(data);
    },
    onError: (error) => {
      toast.error("Unable to fetch files. Please try again.");
      console.log("Unable to fetch files. Error: ", error);
      onError();
    },
  });
};

// useUploadFile uploads a file to IPFS and list the content ID in the database (additional metadata is needed eventually)
export const useUploadFile = (onSuccess, onError) => {
  const queryClient = useQueryClient();
  return useMutation(uploadFile, {
    onSuccess: () => {
      onSuccess();
      queryClient.invalidateQueries("fetch-files");
    },
    onError: (error) => {
      console.log("Error uploading file: ", error);
      onError();
    },
  });
};

// useFetchFileById returns a specific file uploaded to IPFS that matches the provided content id
export const useFetchFileById = (id, onSuccess, onError) => {
  return useQuery("fetch-file-by-id", () => fetchFileById(id), {
    onSuccess,
    onError,
  });
};
