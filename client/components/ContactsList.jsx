import { ChatAlt2Icon } from "@heroicons/react/outline";
import React, { useState } from "react";
import { useFetchContacts } from "../hooks/contacts";
import ContactAvatar from "./contact/ContactAvatar";
import TwitterConnected from "./contact/TwitterConnected";
import { useRouter } from "next/router";
import { currentConversationContactAtom } from "../stores/messages";
import { useAtom } from "jotai";
import PaymentsSlideOut from "./lightning/PaymentsSlideOut";
import { BsLightning } from "react-icons/bs";

function ContactsList() {
  const { data } = useFetchContacts();
  const router = useRouter();
  const [, setCurrentConversationContact] = useAtom(
    currentConversationContactAtom
  );
  const [selectedContact, setSelectedContact] = useState();
  const [openPayment, setOpenPayment] = useState(false);

  const message = (contact) => {
    setCurrentConversationContact(contact);
    router.push("/d/chat");
  };
  const pay = (contact) => {
    setSelectedContact(contact);
    setOpenPayment(true);
    alert("Done");
  };

  const click = () => alert("hello");

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
            <div className="relative px-6 py-2 flex items-center space-x-3 hover:bg-gray-50 focus-within:ring-2 focus-within:ring-inset focus-within:ring-primary">
              <div className="flex-shrink-0">
                <ContactAvatar contact={contact} className="h-10 w-10" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="focus:outline-none">
                  <span className="absolute inset-0" aria-hidden="true" />
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
                  </div>

                  {/* <p className="text-sm text-gray-500 truncate">{contact.did}</p> */}
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
