import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  generateInvoice,
  payInvoice,
  getChannelsBalance,
  listInvoices,
  listPayments,
} from "../utils/lightning";

// useCreateinvoice creates a lightning invoice
export const useCreateInvoice = () => {
  const queryClient = useQueryClient();
  return useMutation(generateInvoice, {
    onSuccess: () => {
      console.log("Invoice successfully generated.");
      queryClient.invalidateQueries("fetch-invoices");
    },
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
      queryClient.invalidateQueries("fetch-payments");
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

//useFetchInvoices grabs the node's invoice history
export const useFetchInvoices = (onSuccess, onError) => {
  return useQuery("fetch-invoices", listInvoices, {
    onSuccess,
    onError: (err) => {
      console.log("Unable to fetch invoices: ", err);
    },
    select: (res) => {
      if (res.data) {
        return res.data.invoices;
      }
    },
  });
};

//useFetchPayments grabs the node's payment history
export const useFetchPayments = (onSuccess, onError) => {
  return useQuery("fetch-payments", listPayments, {
    onSuccess,
    onError: (err) => {
      console.log("Unable to fetch payments: ", err);
    },
    select: (res) => {
      if (res.data) {
        return res.data.payments;
      }
    },
  });
};
