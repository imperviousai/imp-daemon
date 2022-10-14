import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ClipboardCopyIcon, XIcon } from "@heroicons/react/outline";
import { toast } from "react-toastify";
import { BsLightningChargeFill, BsWallet } from "react-icons/bs";
import { useFetchLightningConfig } from "../../hooks/config";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { FaFileInvoice } from "react-icons/fa";
import {
  useCreateInvoice,
  usePayInvoice,
  useFetchChannelsBalance,
} from "../../hooks/lightning";
import InvoiceModal from "./InvoiceModal";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function WalletSlideOut({ open, setOpen }) {
  const tabs = [{ name: "Info" }, { name: "Actions" }];

  const [currentTab, setCurrentTab] = useState("Info");
  const [invoice, setInvoice] = useState("");
  const [amount, setAmount] = useState("");
  const [memo, setMemo] = useState("");
  const [showPayInvoice, setShowPayInvoice] = useState(false);
  const [showCreateInvoice, setShowCreateInvoice] = useState(false);
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);

  const { data: lightningConfig } = useFetchLightningConfig();
  const { mutate: createInvoice } = useCreateInvoice();
  const { mutate: payInvoice } = usePayInvoice();
  const { data: channelsBalance } = useFetchChannelsBalance();

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
            <span className="isolate inline-flex rounded-md shadow-sm w-full">
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
                        <p className="text-indigo-300 text-md">
                          Balance (sats)
                        </p>
                        <p className="text-lg font-bold text-white">
                          {channelsBalance} Sats
                        </p>
                      </div>
                    </div>
                    <>
                      {showTabs()}
                      {currentTab === "Info" && showWalletInfo()}
                      {currentTab === "Actions" && showWalletActions()}
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
