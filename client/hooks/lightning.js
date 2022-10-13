import { useMutation } from "react-query";
import { generateInvoice, payInvoice } from "../utils/lightning";

// useCreateinvoice creates a lightning invoice
export const useCreateInvoice = () => {
  return useMutation(generateInvoice, {
    onSuccess: () => console.log("Invoice successfully generated."),
    onError: (error) => console.log("Error generating invoice: " + error),
  });
};

// usePayInvoice pays a lightning invoice
export const usePayInvoice = () => {
  return useMutation(payInvoice, {
    onSuccess: () => console.log("Invoice successfully paid."),
    onError: (error) => console.log("Error paying invoice: " + error),
  });
};
