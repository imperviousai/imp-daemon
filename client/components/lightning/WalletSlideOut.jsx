import { Fragment, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ClipboardCopyIcon, XIcon } from "@heroicons/react/outline";
import { toast } from "react-toastify";
import { BsLightningChargeFill, BsWallet } from "react-icons/bs";
import { useFetchLightningConfig } from "../../hooks/config";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { FaBitcoin, FaFileInvoice } from "react-icons/fa";
import {
  useCreateInvoice,
  usePayInvoice,
  useFetchChannelsBalance,
  useFetchInvoices,
  useFetchPayments,
} from "../../hooks/lightning";
import InvoiceModal from "./InvoiceModal";
import moment from "moment";
import sb from "satoshi-bitcoin";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function WalletSlideOut({ open, setOpen, setQuickSend }) {
  const tabs = [{ name: "Actions" }, { name: "History" }, { name: "Info" }];

  const [parsedPayments, setParsedPayments] = useState([]);
  const [parsedInvoices, setParsedInvoices] = useState([]);

  const [currentTab, setCurrentTab] = useState("Actions");
  const [invoice, setInvoice] = useState("");
  const [amount, setAmount] = useState("");
  const [memo, setMemo] = useState("");
  const [showPayInvoice, setShowPayInvoice] = useState(true);
  const [showCreateInvoice, setShowCreateInvoice] = useState(false);
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);
  const [showInvoiceHistory, setShowInvoiceHistory] = useState(false);
  const [showPaymentHistory, setShowPaymentHistory] = useState(true);

  const { data: lightningConfig } = useFetchLightningConfig();
  const { mutate: createInvoice } = useCreateInvoice();
  const { mutate: payInvoice } = usePayInvoice();
  const { data: channelsBalance } = useFetchChannelsBalance();
  const { data: invoices } = useFetchInvoices();
  const { data: payments } = useFetchPayments();

  useEffect(() => {
    if (payments) {
      // really funky parsing logic because the API returns malformed data
      // TODO: make sure the daemon returns valid JSON going forward. parse this
      // data in the DB itself
      let transactions = payments
        .split("$_$")
        .filter((t) => t.length)
        .map((t) => {
          let x = t.split(" ");
          let transaction = {
            creation_date: x
              .find((s) => s.includes("creation_date"))
              ?.split(":")[1],
            value_sat: x.find((s) => s.includes("value_sat"))?.split(":")[1],
            payment_hash: x
              .find((s) => s.includes("payment_hash"))
              ?.split(":")[1],
            fee_sat: x.find((s) => s.includes("fee_sat"))?.split(":")[1],
          };
          return transaction;
        });
      if (transactions.length) {
        setParsedPayments(transactions);
      }
    }
  }, [payments]);

  useEffect(() => {
    if (invoices) {
      // really funky parsing logic because the API returns malformed data
      // TODO: make sure the daemon returns valid JSON going forward. parse this
      // data in the DB itself
      let transactions = invoices
        .split("$_$")
        .filter((t) => t.length)
        .map((t) => {
          let x = t.split(" ");
          let transaction = {
            amt_paid_sat: x
              .find((s) => s.includes("amt_paid_sat"))
              ?.split(":")[1],
            creation_date: x
              .find((s) => s.includes("creation_date"))
              ?.split(":")[1],
            settled: x.find((s) => s.includes("settled"))?.split(":")[1],
          };
          return transaction;
        });
      if (transactions.length) {
        setParsedInvoices(transactions);
      }
    }
  }, [invoices]);

  const createInvoiceConfirm = () => {
    createInvoice(
      { amount, memo },
      {
        // here is where you want to show the invoice to the user to copy
        onSuccess: (res) => {
          if (res.data.invoice) {
            setInvoice(res.data.invoice);
            setShowInvoiceModal(true);
          } else {
            toast.error("Unable to create invoice. Please try again.");
          }
        },
        onError: () =>
          toast.error("Unable to create invoice. Please try again."),
      }
    );
  };

  const payInvoiceConfirm = () => {
    toast(
      ({ closeToast }) => (
        <div>
          <p className="pb-4">Are you sure you want to pay this invoice?</p>
          <div className="flex space-x-4">
            <button
              type="button"
              onClick={() => {
                payInvoice(
                  { invoice },
                  {
                    onSuccess: (res) => {
                      console.log("Invoice paid: ", res);
                      toast.info("Invoice successfully paid.");
                    },
                    onError: () =>
                      toast.error("Unable to pay invoice. Please try again."),
                  }
                );
                closeToast();
              }}
              className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Pay Invoice
            </button>
            <button
              type="button"
              onClick={closeToast}
              className="inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Cancel
            </button>
          </div>
        </div>
      ),
      { autoClose: false }
    );
  };

  const showTabs = () => {
    return (
      <div>
        <div className="sm:hidden">
          <label htmlFor="tabs" className="sr-only">
            Select a tab
          </label>
          <select
            id="tabs"
            name="tabs"
            className="block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
          >
            {tabs.map((tab) => (
              <option key={tab.name}>{tab.name}</option>
            ))}
          </select>
        </div>
        <div className="hidden sm:block">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex justify-center" aria-label="Tabs">
              {tabs.map((tab) => (
                <p
                  key={tab.name}
                  onClick={() => setCurrentTab(tab.name)}
                  className={classNames(
                    currentTab === tab.name
                      ? "border-indigo-500 text-indigo-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300",
                    "w-1/4 py-4 px-1 text-center border-b-2 font-medium text-sm"
                  )}
                >
                  {tab.name}
                </p>
              ))}
            </nav>
          </div>
        </div>
      </div>
    );
  };

  const showWalletInfo = () => {
    return (
      <>
        <div className="py-8 px-16 w-full flex flex-col space-y-3">
          {lightningConfig?.data.lightningConfig.pubkey && (
            <>
              <p className="font-semibold text-sm">Public Key</p>
              <div className="flex w-full">
                <CopyToClipboard
                  text={lightningConfig?.data.lightningConfig.pubkey}
                  onCopy={() => toast.success("Copied")}
                >
                  <div className="flex">
                    <p className="text-sm">
                      {`${lightningConfig?.data.lightningConfig.pubkey.substring(
                        0,
                        16
                      )}...${lightningConfig?.data.lightningConfig.pubkey.substring(
                        lightningConfig?.data.lightningConfig.pubkey.length - 16
                      )}`}
                    </p>
                    <ClipboardCopyIcon className="text-gray-500 hover:text-gray-900 h-5 w-5 ml-3" />
                  </div>
                </CopyToClipboard>
              </div>
            </>
          )}
        </div>
      </>
    );
  };

  const openQuickSend = () => {
    return (
      <>
        <p className="text-md text-gray-700 font-semibold">
          Lightning Quick Send
        </p>
        <p className="text-sm text-gray-500">
          Instantly send sats to anyone via the Lightning Network.
        </p>
        <div>
          <button
            type="button"
            onClick={() => setQuickSend(true)}
            className="w-full justify-center my-2 inline-flex items-center rounded-md border border-transparent bg-primary px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          >
            <BsLightningChargeFill
              className="-ml-1 mr-2 h-4 w-4"
              aria-hidden="true"
            />
            Open Quick Send
          </button>
        </div>
      </>
    );
  };

  const payInvoiceForm = () => {
    return (
      <>
        <p className="text-md text-gray-700 font-semibold">Pay Invoice</p>
        <div>
          <label
            htmlFor="invoice"
            className="block text-sm font-medium text-gray-700"
          >
            Invoice
          </label>
          <div className="mt-3">
            <input
              type="text"
              name="invoice"
              id="invoice"
              onChange={(e) => setInvoice(e.target.value)}
              className="p-2 block w-full rounded-md border-gray-300 border focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="Paste Invoice"
            />
          </div>
          {invoice.length > 0 && (
            <button
              type="button"
              onClick={() => payInvoiceConfirm()}
              className="w-full justify-center my-3 inline-flex items-center rounded-md border border-transparent bg-primary px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              <BsLightningChargeFill
                className="-ml-1 mr-2 h-4 w-4"
                aria-hidden="true"
              />
              Pay Invoice
            </button>
          )}
        </div>
      </>
    );
  };

  const createInvoiceForm = () => {
    return (
      <>
        <p className="text-md text-gray-700 font-semibold">Create Invoice</p>
        <div>
          <label
            htmlFor="amount"
            className="block text-sm font-medium text-gray-700"
          >
            Amount (sats)
          </label>
          <div className="my-3">
            <input
              type="number"
              name="amount"
              id="amount"
              onChange={(e) => setAmount(e.target.value)}
              className="p-2 block w-full rounded-md border-gray-300 border focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="100"
            />
          </div>
          <label
            htmlFor="memo"
            className="block text-sm font-medium text-gray-700"
          >
            Memo (optional)
          </label>
          <div className="mt-3">
            <input
              type="text"
              name="memo"
              id="memo"
              onChange={(e) => setMemo(e.target.value)}
              className="p-2 block w-full rounded-md border-gray-300 border focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="100"
            />
          </div>
          {amount.length > 0 && (
            <button
              type="button"
              onClick={() => createInvoiceConfirm()}
              className="w-full justify-center my-3 inline-flex items-center rounded-md border border-transparent bg-primary px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              <FaFileInvoice
                className="-ml-1 mr-2 h-4 w-4"
                aria-hidden="true"
              />
              Create Invoice
            </button>
          )}
        </div>
      </>
    );
  };

  const showWalletActions = () => {
    return (
      <>
        <div className="py-8 px-16 w-full flex flex-col space-y-3">
          <>
            <p className="font-semibold text-sm">Payments</p>
            <span className="isolate inline-flex rounded-md w-full">
              <button
                type="button"
                onClick={() => {
                  setShowCreateInvoice(false);
                  setShowPayInvoice(true);
                }}
                className="relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              >
                <BsLightningChargeFill className="text-gray-700 h-4 w-4 mr-2" />
                Pay Invoice
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowCreateInvoice(true);
                  setShowPayInvoice(false);
                }}
                className="relative -ml-px inline-flex items-center rounded-r-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              >
                <FaFileInvoice className="text-gray-700 h-4 w-4 mr-2" />
                Create Invoice
              </button>
            </span>
          </>
          <>
            {showCreateInvoice && createInvoiceForm()}
            {showPayInvoice && payInvoiceForm()}
            {openQuickSend()}
          </>
        </div>
      </>
    );
  };

  const invoiceHistory = () => {
    return (
      <>
        {" "}
        <ul role="list" className="divide-y divide-gray-200">
          {parsedInvoices.map((invoice, i) => (
            <li
              key={i}
              className="flex py-2 items-center border-b border-gray-20 justify-between"
            >
              <div className="flex items-center">
                <FaFileInvoice className="text-primary h-5 w-5 mr-2" />
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">
                    {moment.unix(invoice.creation_date).fromNow()}
                  </p>
                  <p className="text-sm text-gray-500">Invoice</p>
                </div>
              </div>
              <div>
                <p className="text-sm font-bold text-green-600">
                  {invoice.amt_paid_sat} sats
                </p>
              </div>
            </li>
          ))}
        </ul>
      </>
    );
  };

  const paymentHistory = () => {
    return (
      <>
        {" "}
        <ul role="list" className="divide-y divide-gray-200">
          {parsedPayments.map((payment, i) => (
            <li
              key={i}
              className="flex py-2 items-center border-b border-gray-20 justify-between"
            >
              <div className="flex items-center">
                <BsLightningChargeFill className="text-primary h-4 w-4 mr-2" />
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">
                    {moment.unix(payment.creation_date).fromNow()}
                  </p>
                  <p className="text-sm text-gray-500">Payments</p>
                </div>
              </div>
              <div>
                <p className="text-sm font-bold text-gray-600">
                  {payment.value_sat} sats
                </p>
              </div>
            </li>
          ))}
        </ul>
      </>
    );
  };

  const showWalletHistory = () => {
    return (
      <>
        <div className="py-8 px-16 w-full flex flex-col space-y-3">
          <>
            <p className="font-semibold text-sm">History</p>
            <span className="isolate inline-flex rounded-md w-full">
              <button
                type="button"
                onClick={() => {
                  setShowPaymentHistory(true);
                  setShowInvoiceHistory(false);
                }}
                className="relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              >
                <BsLightningChargeFill className="text-gray-700 h-4 w-4 mr-2" />
                Payment
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowPaymentHistory(false);
                  setShowInvoiceHistory(true);
                }}
                className="relative -ml-px inline-flex items-center rounded-r-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              >
                <FaFileInvoice className="text-gray-700 h-4 w-4 mr-2" />
                Invoices
              </button>
            </span>
          </>
          <>
            {showInvoiceHistory && invoiceHistory()}
            {showPaymentHistory && paymentHistory()}
          </>
        </div>
      </>
    );
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="absolute fixed overflow-hidden z-10"
        onClose={setOpen}
      >
        <div className="absolute inset-0 overflow-hidden">
          <Dialog.Overlay className="absolute inset-0" />
          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16">
            <Transition.Child
              as={Fragment}
              enter="transform transition ease-in-out duration-500 sm:duration-700"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transform transition ease-in-out duration-500 sm:duration-700"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <div className="pointer-events-auto w-screen max-w-md">
                <InvoiceModal
                  open={showInvoiceModal}
                  setOpen={setShowInvoiceModal}
                  amount={amount}
                  memo={memo}
                  invoice={invoice}
                />
                <div className="flex h-full flex-col divide-y divide-gray-200 bg-white shadow-xl">
                  <div className="h-0 flex-1 overflow-y-auto">
                    <div className="bg-primary py-6 px-4 sm:px-6">
                      <div className="flex items-center justify-between">
                        <Dialog.Title className="text-lg font-medium text-white inline-flex items-center">
                          Wallet <BsWallet className="w-5 h-5 ml-2 mb-0.5" />
                        </Dialog.Title>
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            className="rounded-md bg-indigo-700 text-indigo-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                            onClick={() => setOpen(false)}
                          >
                            <span className="sr-only">Close panel</span>
                            <XIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>
                      <div className="mt-1">
                        <p className="text-indigo-300 text-md">Your Balance</p>
                        <div className="flex items-center">
                          <p className="text-lg font-bold text-white">
                            {Number(channelsBalance).toLocaleString()} Sats (
                            {channelsBalance && sb.toBitcoin(channelsBalance)}{" "}
                            BTC)
                          </p>
                          <span>
                            <FaBitcoin className="ml-2 h-5 w-5 text-white" />
                          </span>
                        </div>
                      </div>
                    </div>
                    <>
                      {showTabs()}
                      {currentTab === "Info" && showWalletInfo()}
                      {currentTab === "Actions" && showWalletActions()}
                      {currentTab === "History" && showWalletHistory()}
                    </>
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
