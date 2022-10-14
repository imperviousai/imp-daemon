import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  generateInvoice,
  payInvoice,
  getChannelsBalance,
  getTransactions,
} from "../utils/lightning";

// useCreateinvoice creates a lightning invoice
export const useCreateInvoice = () => {
  return useMutation(generateInvoice, {
    onSuccess: () => console.log("Invoice successfully generated."),
    onError: (error) => console.log("Error generating invoice: " + error),
  });
};

// usePayInvoice pays a lightning invoice
export const usePayInvoice = () => {
  const queryClient = useQueryClient();
  return useMutation(payInvoice, {
    onSuccess: () => {
      console.log("Invoice successfully paid.");
      queryClient.invalidateQueries("fetch-channels-balance");
      queryClient.invalidateQueries("fetch-transactions");
    },
    onError: (error) => console.log("Error paying invoice: " + error),
  });
};

//useFetchChannelsBalance grabs the current channel balance
export const useFetchChannelsBalance = (onSuccess, onError) => {
  return useQuery("fetch-channels-balance", getChannelsBalance, {
    onSuccess,
    onError: (err) => {
      console.log("Unable to fetch channel balance: ", err);
    },
    select: (res) => {
      if (res.data) {
        return res.data.amt;
      }
    },
  });
};

//useFetchTransactions grabs the node's transaction history
export const useFetchTransactions = (onSuccess, onError) => {
  return useQuery("fetch-transactions", getTransactions, {
    onSuccess,
    onError: (err) => {
      console.log("Unable to fetch transactions: ", err);
    },
    select: (res) => {
      if (res.data) {
        return res.data.transactions;
      }
    },
  });
};
