import { ChatAlt2Icon } from "@heroicons/react/outline";
import React, { useEffect } from "react";
import { useFetchContacts } from "../hooks/contacts";
import ContactAvatar from "./contact/ContactAvatar";
import TwitterConnected from "./contact/TwitterConnected";

function ContactsList() {
  const { data } = useFetchContacts();

  useEffect(() => {
    if (data) {
      console.log(data.data.contacts);
    }
  }, [data]);

  return (
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
                {/* <p className="text-sm text-gray-500 truncate">{contact.did}</p> */}
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default ContactsList;
