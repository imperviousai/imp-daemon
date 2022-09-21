import { useQuery, useQueryClient, useMutation } from "react-query";
import { getLightningConfig, saveLightningConfig } from "../utils/config";
import { toast } from "react-toastify";

export const useFetchLightningConfig = (onSuccess) => {
  return useQuery("fetch-lightning-config", getLightningConfig, {
    onSuccess,
    onError: (error) => {
      console.log("Unable to fetch lightning config. Error: ", error);
      toast.error("Unable to fetch lightning config.");
    },
  });
};

export const useSaveLightningConfig = () => {
  const queryClient = useQueryClient();
  return useMutation(saveLightningConfig, {
    onSuccess: () => {
      queryClient.invalidateQueries("fetch-lightning-config");
      toast.success("Lightning Configuration Updated.");
    },
    onError: (error) => {
      console.log("Error saving lightning config. Error: ", error);
      toast.error("Unable to update lightning configuration.");
    },
  });
};
