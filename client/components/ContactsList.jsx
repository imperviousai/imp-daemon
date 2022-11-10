import {
  CameraIcon,
  ChatAlt2Icon,
  VideoCameraIcon,
} from "@heroicons/react/outline";
import React, { useState } from "react";
import { useFetchContacts } from "../hooks/contacts";
import ContactAvatar from "./contact/ContactAvatar";
import TwitterConnected from "./contact/TwitterConnected";
import { useRouter } from "next/router";
import {
  currentConversationContactAtom,
  meetingInviteListAtom,
} from "../stores/messages";
import { useAtom } from "jotai";
import PaymentsSlideOut from "./lightning/PaymentsSlideOut";
import { BsLightning } from "react-icons/bs";
import { useFetchLightningConfig } from "../hooks/config";
import { toast } from "react-toastify";

function ContactsList() {
  const { data } = useFetchContacts();
  const router = useRouter();
  const [, setCurrentConversationContact] = useAtom(
    currentConversationContactAtom
  );
  const [selectedContact, setSelectedContact] = useState();
  const [openPayment, setOpenPayment] = useState(false);
  const { data: lightningConfig } = useFetchLightningConfig();
  const [, setInviteList] = useAtom(meetingInviteListAtom);

  const message = (contact) => {
    setCurrentConversationContact(contact);
    router.push("/d/chat");
  };
  const pay = (contact) => {
    if (!lightningConfig?.data.lightningConfig.listening) {
      toast.info("Connect to a lightning node to use this action.");
      return;
    }
    setSelectedContact(contact);
    setOpenPayment(true);
  };

  const call = (contact) => {
    setInviteList((invited) => [...invited, contact]);
    router.push("/d/meeting");
  };

  return (
    <>
      <PaymentsSlideOut
        open={openPayment}
        setOpen={setOpenPayment}
        selectedContact={selectedContact}
      />
      <ul role="list" className="relative divide-y divide-gray-200">
        {data?.data.contacts.map((contact, i) => (
          <li key={i}>
            <div className="px-6 py-2 flex items-center space-x-3 hover:bg-gray-50">
              <ContactAvatar contact={contact} className="h-10 w-10" />
              <div className="flex flex-col">
                <span className="flex items-center space-x-2">
                  <p className="text-sm font-medium text-gray-900">
                    {contact.name}
                  </p>
                  <TwitterConnected contact={contact} className="h-4 w-4" />
                </span>
                <div className="flex space-x-2">
                  <button
                    type="button"
                    className="inline-flex items-center border border-1 border-gray-300 rounded-full p-1 text-gray-400"
                    onClick={() => message(contact)}
                  >
                    <ChatAlt2Icon className="h-5 w-5" aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    className="inline-flex items-center border border-1 border-gray-300 rounded-full p-1 text-gray-400"
                    onClick={() => pay(contact)}
                  >
                    <BsLightning className="h-5 w-5" aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    className="inline-flex items-center border border-1 border-gray-300 rounded-full p-1 text-gray-400"
                    onClick={() => call(contact)}
                  >
                    <VideoCameraIcon className="h-5 w-5" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}

export default ContactsList;
