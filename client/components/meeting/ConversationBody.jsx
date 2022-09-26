import React, { useEffect, useRef } from "react";
import moment from "moment";
import FileDownload from "./FileDownload";
import { useFetchContacts } from "../../hooks/contacts";

const ConversationBody = ({ myDid, messages, setHasUnreadVideoMessages }) => {
  const bottomRef = useRef(null);

  const { data: contactsRes } = useFetchContacts();

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (messages.length) {
      setHasUnreadVideoMessages(false);
    }
  }, [messages, setHasUnreadVideoMessages]);

  const getContactName = (did) => {
    const contact = contactsRes?.data.contacts.find(
      (contact) => contact.did === did
    );
    return contact ? `${contact.name}: ` : "";
  };

  return (
    <div className="flex flex-col w-full h-full overflow-y-auto">
      {messages.map((message, i) => (
        <div key={i}>
          {message.type === "file-transfer-done" ? (
            <FileDownload message={message} myDid={myDid} />
          ) : (
            <div
              key={i}
              className={`flex py-1 ${
                message.from === myDid ? "pl-4 flex-row-reverse" : "pr-4"
              }`}
            >
              <div className="flex flex-col">
                <span
                  className={`px-4 py-2 rounded-lg inline-block rounded-br-none whitespace-pre-line ${
                    message.from === myDid
                      ? "bg-primary bg-opacity-10 text-primary text-sm"
                      : "bg-secondary text-white text-sm"
                  }`}
                >
                  {message.data}
                </span>
                <div
                  className={`flex ${
                    message.from === myDid && "flex-row-reverse"
                  }`}
                >
                  <p className="text-primary opacity-80 text-xs">
                    {`${getContactName(message.from)}${moment(
                      message.timestamp
                    ).fromNow()}`}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
      <div ref={bottomRef} />
      {/* <FileDownload file={null} isDownloading={false} /> */}
    </div>
  );
};

export default ConversationBody;
