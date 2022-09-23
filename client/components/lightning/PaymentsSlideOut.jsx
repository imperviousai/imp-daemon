import { Fragment, useState, useContext, useEffect } from "react";
import { Dialog, Transition, Listbox, Switch } from "@headlessui/react";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  XIcon,
} from "@heroicons/react/outline";
import { toast } from "react-toastify";
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid";
import { BsLightningChargeFill } from "react-icons/bs";
import { FaBitcoin } from "react-icons/fa";
import { useSendMessage } from "../../hooks/messages";
import { useFetchContacts } from "../../hooks/contacts";
import ContactAvatar from "../contact/ContactAvatar";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export const SelectContact = ({ selected, setSelected }) => {
  const { data: contactsRes } = useFetchContacts();

  const isSelected = (contact) => selected === contact;

  return (
    <Listbox value={selected} onChange={(contact) => setSelected(contact)}>
      {({ open }) => (
        <>
          <div className="mt-1 relative w-full">
            <Listbox.Button className="relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
              <div className="flex items-center">
                <span className="ml-3 block truncate">
                  {selected ? selected.name : "Select Peer"}
                </span>
              </div>
              <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <SelectorIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </span>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                {contactsRes?.data.contacts.map((contact, i) => (
                  <Listbox.Option
                    key={i}
                    className={({ active }) =>
                      classNames(
                        active ? "text-white bg-indigo-600" : "text-gray-900",
                        "cursor-default select-none relative py-2 pl-3 pr-9"
                      )
                    }
                    value={contact}
                  >
                    {({ selected, active }) => (
                      <>
                        <div className="flex items-center">
                          <ContactAvatar
                            contact={contact}
                            className="h-4 w-4"
                          />
                          <span
                            className={classNames(
                              isSelected(contact)
                                ? "font-semibold"
                                : "font-normal",
                              "ml-3 block truncate"
                            )}
                          >
                            {contact.name}
                            <span className="sr-only">
                              {" "}
                              is {false ? "online" : "offline"}
                            </span>
                          </span>
                        </div>

                        {isSelected(contact) ? (
                          <span
                            className={classNames(
                              active ? "text-white" : "text-indigo-600",
                              "absolute inset-y-0 right-0 flex items-center pr-4"
                            )}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  );
};

export default function PaymentsSlideOut({ open, setOpen, selectedContact }) {
  const [selected, setSelected] = useState("");
  const [sats, setSats] = useState(100);
  const [message, setMessage] = useState("");
  const [quickSend, setQuickSend] = useState(false);
  const { mutate: sendBasicMessage } = useSendMessage();

  const onErrorSendMessage = () => {
    toast.error("Error sending message. Please try again.");
  };

  useEffect(() => {
    if (selectedContact) {
      setSelected(selectedContact);
    }
  }, [selectedContact]);

  const sendPayment = () => {
    if (quickSend) {
      sendBasicMessage(
        {
          msg: message,
          did: selected.did,
          type: "https://didcomm.org/basicmessage/2.0/message",
          amount: parseInt(sats),
          reply_to_id: "",
          isPayment: true,
        },
        { onError: onErrorSendMessage }
      );
      toast.success("You've just send sats!");
    } else {
      confirmPayment();
    }
  };

  const confirmPayment = () => {
    toast(
      ({ closeToast }) => (
        <div>
          <p className="pb-4">Send these sats to this user?</p>
          <div className="flex space-x-4">
            <button
              type="button"
              onClick={() => {
                sendBasicMessage({
                  msg: message,
                  did: selected.did,
                  type: "https://didcomm.org/basicmessage/2.0/message",
                  amount: parseInt(sats),
                  reply_to_id: "",
                  isPayment: true,
                });
                setMessage("");
                toast.success("You've just send sats!");
                closeToast();
              }}
              className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Confirm
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

  const quickAdd = () => setSats(sats + 100);
  const quickRemove = () => {
    if (sats >= 100) {
      setSats(sats - 100);
    } else if (sats < 100 && sats > 0) {
      setSats(0);
    }
  };
  const setCustomNumber = (sats) => {
    if (sats === "") {
      setSats();
      return;
    }
    try {
      sats = parseInt(sats);
      if (sats > 0) {
        setSats(sats);
      }
    } catch (e) {
      console.log("Invalid input: ", e);
    }
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
                <form className="flex h-full flex-col divide-y divide-gray-200 bg-white shadow-xl">
                  <div className="h-0 flex-1 overflow-y-auto">
                    <div className="bg-primary py-6 px-4 sm:px-6">
                      <div className="flex items-center justify-between">
                        <Dialog.Title className="text-lg font-medium text-white inline-flex items-center">
                          Send <FaBitcoin className="w-5 h-5 ml-1 mb-0.5" />
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
                        <p className="text-sm text-indigo-300">
                          Instantly send sats to anyone via the Lightning
                          Network.
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-1 flex-col justify-between">
                      <div className="divide-y divide-gray-200 px-4 sm:px-6">
                        <div className="space-y-6 pt-6 pb-5">
                          <label
                            htmlFor="sats"
                            className="block text-sm font-medium text-gray-900"
                          >
                            {" "}
                            Select Contact{" "}
                          </label>
                          <SelectContact
                            selected={selected}
                            setSelected={setSelected}
                          />
                          <div className="pt-2">
                            <label
                              htmlFor="sats"
                              className="block text-sm font-medium text-gray-900"
                            >
                              {" "}
                              Amount (Satoshis){" "}
                            </label>
                            <div className="mt-1 flex">
                              <input
                                type="number"
                                name="name"
                                value={sats}
                                onChange={(e) =>
                                  setCustomNumber(e.target.value)
                                }
                                id="name"
                                className="block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                              />
                              <div className="flex pl-4 space-x-2">
                                <button
                                  type="button"
                                  onClick={() => quickAdd()}
                                  className="inline-flex items-center p-2 border border-transparent rounded-full shadow-sm text-white bg-primary hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                  <ChevronUpIcon
                                    className="h-3 w-3"
                                    aria-hidden="true"
                                  />
                                </button>
                                <button
                                  type="button"
                                  onClick={() => quickRemove()}
                                  className="inline-flex items-center p-2 border border-transparent rounded-full shadow-sm text-white bg-primary hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                  <ChevronDownIcon
                                    className="h-3 w-3"
                                    aria-hidden="true"
                                  />
                                </button>
                              </div>
                            </div>
                          </div>
                          <div>
                            <label
                              htmlFor="sats"
                              className="block text-sm font-medium text-gray-900 pb-4"
                            >
                              {" "}
                              Add a Message{" "}
                            </label>
                            <textarea
                              id="message"
                              name="message"
                              onChange={(e) => setMessage(e.target.value)}
                              rows={4}
                              className="block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="px-8 py-4">
                    <Switch.Group
                      as="div"
                      className="flex items-center justify-between"
                    >
                      <span className="flex-grow flex flex-col">
                        <Switch.Label
                          as="span"
                          className="text-sm font-medium text-gray-900"
                          passive
                        >
                          Quick Send
                        </Switch.Label>
                        <Switch.Description
                          as="span"
                          className="text-sm text-gray-500"
                        >
                          Enable one-click lightning payments!
                        </Switch.Description>
                      </span>
                      <Switch
                        checked={quickSend}
                        onChange={setQuickSend}
                        className={classNames(
                          quickSend ? "bg-indigo-600" : "bg-gray-200",
                          "relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        )}
                      >
                        <span
                          aria-hidden="true"
                          className={classNames(
                            quickSend ? "translate-x-5" : "translate-x-0",
                            "pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"
                          )}
                        />
                      </Switch>
                    </Switch.Group>
                  </div>
                  <div className="flex flex-shrink-0 justify-end px-4 py-4">
                    <button
                      type="button"
                      className="w-full inline-flex text-center justify-center ml-4 rounded-md border border-gray-300 bg-primary py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      onClick={() => sendPayment()}
                    >
                      Send Bitcoin{" "}
                      <BsLightningChargeFill className="w-4 h-4 ml-1 mt-0.5" />
                    </button>
                  </div>
                </form>
              </div>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
