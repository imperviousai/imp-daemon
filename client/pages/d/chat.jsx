import MainNavigation from "../../components/MainNavigation";
import { Fragment, useState, useRef, useEffect } from "react";
import { Disclosure, Menu, Transition, Dialog } from "@headlessui/react";
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  VideoCameraIcon,
} from "@heroicons/react/solid";
import {
  MenuAlt1Icon,
  PencilAltIcon,
  XIcon,
  UsersIcon,
} from "@heroicons/react/outline";
import { BigHead } from "@bigheads/core";
import { BsFillLightningChargeFill } from "react-icons/bs";
import { toast } from "react-toastify";
import { ContactView } from "./contacts";
import { CopyToClipboard } from "react-copy-to-clipboard";
import moment from "moment";
import PaymentsSlideOut from "../../components/lightning/PaymentsSlideOut";
import { useFetchContacts } from "../../hooks/contacts";
import { useFetchMyDid } from "../../hooks/id";
import {
  useSendMessage,
  useFetchMessages,
  useDeleteGroupMessages,
  useSaveMessage,
} from "../../hooks/messages";
import { getContactAvatar } from "../../utils/contacts";
import {
  showMessagesAsRead,
  isNotificationExpired,
} from "../../utils/messages";
import { sendPeerInvitation, confirmPeerInvite } from "../../utils/peers";
import {
  readMessagesAtom,
  currentConversationAtom,
  lightningEnabledAtom,
} from "../../stores/messages";
import { useAtom } from "jotai";
import { v4 as uuidv4 } from "uuid";
import {
  addPeerAtom,
  currentConversationPeerAtom,
  currentVideoCallAtom,
} from "../../stores/peers";
import dynamic from "next/dynamic";
import FileUploader from "../../components/FileUploader";
import SelectedFileInput from "../../components/SelectedFileInput";
import dataUriRegex from "data-uri-regex";
import { encode } from "base64-arraybuffer";
import FileDownload from "../../components/meeting/FileDownload";
import useAutosizeTextArea from "../../components/useAutosizeTextArea";

const isJSON = (msg) => {
  try {
    JSON.parse(msg);
  } catch (e) {
    return false;
  }
  return true;
};

const EmojiPicker = dynamic(() => import("../../components/EmojiPicker"), {
  ssr: false,
});

const pageTitle = "Messaging";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const ConversationsHeader = () => {
  const tabs = [
    { name: "Messages", href: "#", current: true },
    // { name: "Message Requests", href: "#", current: false },
  ];

  return (
    <div>
      <div className="sm:hidden">
        <label htmlFor="tabs" className="sr-only">
          Select a tab
        </label>
        {/* Use an "onChange" listener to redirect the user to the selected tab URL. */}
        <select
          id="tabs"
          name="tabs"
          className="block w-full focus:ring-indigo-500 focus:border-indigo-500 border-gray-300"
          defaultValue={tabs.find((tab) => tab.current).name}
        >
          {tabs.map((tab) => (
            <option key={tab.name}>{tab.name}</option>
          ))}
        </select>
      </div>
      <div className="hidden sm:block">
        <nav
          className="relative z-0 shadow flex divide-x divide-gray-200"
          aria-label="Tabs"
        >
          {tabs.map((tab, tabIdx) => (
            <a
              key={tab.name}
              href={tab.href}
              className={classNames(
                tab.current
                  ? "text-gray-900"
                  : "text-gray-500 hover:text-gray-700",
                "group relative min-w-0 flex-1 overflow-hidden bg-white py-4 px-4 text-sm font-medium text-center hover:bg-gray-50 focus:z-10"
              )}
              aria-current={tab.current ? "page" : undefined}
            >
              <span>{tab.name}</span>
              <span
                aria-hidden="true"
                className={classNames(
                  tab.current ? "bg-indigo-500" : "bg-transparent",
                  "absolute inset-x-0 bottom-0 h-0.5"
                )}
              />
            </a>
          ))}
        </nav>
      </div>
    </div>
  );
};

const RenderConversationSection = ({ metadata, unreadMessages, contact }) => {
  const renderContent = () => {
    if (metadata.lastMessage?.type === "https://didcomm.org/webrtc/1.0/sdp") {
      const { signal } = metadata.lastMessage.body.content;
      if (signal.type === "offer") {
        return <p>Sent an invite to connect</p>;
      }
    } else if (metadata.lastMessage?.type === "file-transfer-done") {
      return "File sent.";
    } else if (isJSON(metadata.lastMessage?.body.content)) {
      const { filename, dataUri } = JSON.parse(
        metadata.lastMessage?.body.content
      );
      if (filename && dataUri) {
        // definitely a file
        return "File sent.";
      }
    } else {
      return `${metadata.lastMessage?.body.content?.slice(0, 20)}`;
    }
  };
  return (
    <div className="flex items-center justify-between space-x-4">
      <div className="flex space-x-4">
        {contact && (
          <BigHead className="h-10 w-10" {...getContactAvatar(contact)} />
        )}

        <div className="flex flex-col">
          <p
            className={`${
              unreadMessages > 0 ? "font-bold" : "font-light"
            } text-md`}
          >
            {metadata.name}
          </p>

          {/* <p className="font-light text-xs">{contact.did}</p> */}
          <p
            className={`${unreadMessages ? "font-bold" : "font-light"} text-sm`}
          >
            {/* <span>
              {metadata.lastAuthor ? metadata.lastAuthor.name : "You"}:{" "}
            </span> */}
            {renderContent()}
          </p>
        </div>
      </div>
      <div className="flex flex-col pb-4">
        <p className="text-sm font-light">
          {moment.unix(metadata.lastUpdated).fromNow()}
        </p>
      </div>
    </div>
  );
};

const ListConversations = ({ conversations, selectConversation, contacts }) => {
  const [unreadMessages, setUnreadMessages] = useState({});

  const [readMessages] = useAtom(readMessagesAtom);

  useEffect(() => {
    let unreadMessageCount = {};
    if (conversations) {
      Object.keys(conversations).map((did, i) => {
        let c = conversations[did].messages.filter(
          (m) => readMessages.indexOf(m.id) === -1
        ).length;
        unreadMessageCount[did] = c;
      });
    }
    setUnreadMessages(unreadMessageCount);
  }, [conversations, readMessages]);

  return (
    <div className="bg-white lg:min-w-0 lg:flex-1">
      <div className="pl-4 pr-6 py-2 border-b border-t border-gray-200 sm:pl-6 lg:pl-8 xl:pl-6 xl:border-t-0">
        <div className="flex items-center">
          <h1 className="flex-1 text-md font-medium">Messages</h1>
        </div>
      </div>
      <ul
        role="list"
        className="relative z-0 divide-y divide-gray-200 border-b border-gray-200"
      >
        {conversations &&
          Object.keys(conversations).map((did, i) => (
            <li
              key={i}
              className="relative pl-4 pr-6 py-5 hover:bg-gray-50 sm:py-3 sm:pl-6 lg:pl-8 xl:pl-6 blue="
              onClick={() => selectConversation(did)}
            >
              <RenderConversationSection
                metadata={conversations[did].metadata}
                unreadMessages={unreadMessages[did]}
                contact={contacts.find((contact) => contact.did === did)}
              />
            </li>
          ))}
      </ul>
    </div>
  );
};

const ConversationHeader = ({
  setOpenContactPreview,
  setOpenPayment,
  deleteConversation,
  sendInvite,
}) => {
  const [currentConversationPeer] = useAtom(currentConversationPeerAtom);
  const [currentConversation] = useAtom(currentConversationAtom);
  const disconnectPeer = () => {
    currentConversationPeer.peer.destroy();
  };

  const addVideo = () => {
    navigator.mediaDevices
      .getUserMedia({
        video: true,
        audio: true,
      })
      .then((stream) => {
        stream
          .getTracks()
          .forEach((track) =>
            currentConversationPeer.peer.addTrack(track, stream)
          );
      })
      .catch((err) => {
        toast.error("Unable to add video. Please try again.");
        console.log(err);
      });
  };

  return (
    <div className="bg-white shadow">
      <div className="px-4 sm:px-6 lg:max-w-6xl lg:mx-auto lg:px-8">
        <div className="py-2 md:flex md:items-center md:justify-between lg:border-t lg:border-gray-200">
          <div className="flex-1 min-w-0">
            {/* Profile */}
            <div className="flex items-center">
              <div>
                <div
                  className="flex items-center"
                  onClick={() => setOpenContactPreview(true)}
                >
                  <BigHead
                    {...getContactAvatar(currentConversation)}
                    className="w-10 h-10"
                  />
                  <div className="flex flex-col ml-3">
                    <h1 className="text-lg font-semibold leading-7 text-gray-900 sm:leading-9 sm:truncate">
                      {currentConversation.name}{" "}
                    </h1>
                    {/* <CopyToClipboard
                      text={currentConversation.did}
                      onCopy={() => toast.info("Copied!")}
                    >
                      <h2 className="text-xs font-light hover:bg-gray-100 ">
                        {currentConversation.did.slice(0, 20)}...
                        {currentConversation.did.slice(-20)}
                      </h2>
                    </CopyToClipboard> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-6 flex space-x-3 md:mt-0 md:ml-4 space-x-4">
            {currentConversationPeer?.peer && (
              <>
                {currentConversationPeer?.peer.connected ? (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium text-blue-400">
                    Connected
                  </span>
                ) : (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium text-gray-400">
                    Connecting ...
                  </span>
                )}
              </>
            )}

            {currentConversationPeer?.peer ? (
              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={() => disconnectPeer()}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
                >
                  <UsersIcon
                    className="-ml-0.5 mr-2 h-4 w-4"
                    aria-hidden="true"
                  />
                  {currentConversationPeer?.peer.connected
                    ? "Disconnect"
                    : "Cancel"}
                </button>
                {/* <button
                  type="button"
                  onClick={() => addVideo()}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
                >
                  <VideoCameraIcon className="h-6 w-6" aria-hidden="true" />
                </button> */}
              </div>
            ) : (
              <button
                type="button"
                onClick={() => sendInvite()}
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-400 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <UsersIcon
                  className="-ml-0.5 mr-2 h-4 w-4"
                  aria-hidden="true"
                />
                Connect
              </button>
            )}

            <div className="flex items-center">
              <button
                type="button"
                onClick={() => setOpenPayment(true)}
                className="inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <BsFillLightningChargeFill
                  className="-ml-0.5 mr-2 h-4 w-4"
                  aria-hidden="true"
                />
                Send
              </button>
            </div>

            <div className="flex items-center">
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button className="flex items-center text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500">
                    <span className="sr-only">Open options</span>
                    <ChevronDownIcon className="h-8 w-8" aria-hidden="true" />
                  </Menu.Button>
                </div>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                    <div className="py-1">
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            onClick={() => deleteConversation()}
                            className={classNames(
                              active
                                ? "bg-gray-100 text-red-900"
                                : "text-red-700",
                              "block px-4 py-2 text-sm"
                            )}
                          >
                            Delete
                          </a>
                        )}
                      </Menu.Item>
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const NewConversationHeader = ({ setToggleNewContact, toggleNewContact }) => {
  return (
    <div className="bg-white shadow">
      <div className="px-4 sm:px-6 py-2 lg:max-w-6xl lg:mx-auto lg:px-8 flex justify-end">
        {/* <div
          className="py-2  lg:border-t lg:border-gray-200"
          onClick={() => setToggleNewContact(true)}
        >
          <PencilAltIcon className="h-7 w-7 text-gray-900" />
        </div> */}
        <button
          type="button"
          onClick={() => setToggleNewContact(!toggleNewContact)}
          className="inline-flex items-center px-3 py-2 my-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
        >
          {toggleNewContact ? (
            <div className="flex items-center">
              <ChevronLeftIcon className="w-4 h-4" />
              Back
            </div>
          ) : (
            <div className="flex items-center">
              <PencilAltIcon className="w-4 h-4" />
              New Message
            </div>
          )}
        </button>
      </div>
    </div>
  );
};

const ListContacts = ({
  contacts,
  setToggleNewContact,
  selectConversation,
}) => {
  // maybe we need to set current Conversation upon click, and then quickly createa new conversation
  return (
    <div className="bg-white lg:min-w-0 lg:flex-1">
      <div className="pl-4 pr-6 py-4 border-b flex items-center justify-center border-primary sm:pl-6 lg:pl-8 xl:pl-6">
        <h4 className="font-semibold text-sm">Select a Contact</h4>
      </div>
      <ul
        role="list"
        className="relative z-0 divide-y divide-gray-200 border-b border-gray-200"
      >
        {contacts.map((contact, i) => (
          <li
            key={i}
            onClick={() => {
              selectConversation(contact.did);
              setToggleNewContact(false);
            }}
            className="relative pl-4 pr-6 py-5 hover:bg-gray-50 sm:py-3 sm:pl-6 lg:pl-8 xl:pl-6 blue="
          >
            {/* probably should be a separate renderContactSection */}
            <div className="flex items-center">
              <div className="flex space-x-4">
                <BigHead className="h-10 w-10" {...getContactAvatar(contact)} />
                <div className="flex flex-col justify-center">
                  <p className="font-base">{contact.name}</p>
                  {/* <p className="font-light text-xs">{contact.did}</p> */}
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

const ConversationFooter = ({ sendBasicMessage, myDid }) => {
  const [msg, setMsg] = useState("");
  const [lightningEnabled] = useAtom(lightningEnabledAtom);
  const [currentConversationPeer] = useAtom(currentConversationPeerAtom);
  const [currentConversation] = useAtom(currentConversationAtom);
  const [currentVideoCallId] = useAtom(currentVideoCallAtom);
  const { mutate: saveBasicMessage } = useSaveMessage();
  const textAreaRef = useRef(null);

  useAutosizeTextArea(textAreaRef.current, msg);

  const [fileInput, setFileInput] = useState([]);

  const onErrorSendMessage = () => {
    toast.error("Error sending message. Please try again.");
  };

  const onEmojiSelect = (emoji) => {
    setMsg((msg) => msg.concat(` ${emoji.native} `));
  };

  const sendDidComm = (file) => {
    sendBasicMessage(
      {
        msg: file ? file : msg,
        did: currentConversation.did,
        type: "https://didcomm.org/basicmessage/2.0/message",
        amount: lightningEnabled ? 50 : 0,
        reply_to_id: "",
        isPayment: false,
      },
      { onError: onErrorSendMessage }
    );
  };

  const sendWebRTC = (data, type) => {
    const networkId =
      currentConversationPeer.metadata.networkId !== currentVideoCallId
        ? currentConversationPeer.metadata.networkId
        : null;
    const header = {
      timestamp: new Date().toString(),
      from: myDid.id,
      did: currentConversation.did,
      networkId,
      type,
    };
    const payload =
      type === "live-message" ? { msg: data, ...header } : { data, ...header };
    currentConversationPeer.peer.write(JSON.stringify(payload));
  };

  const setFileState = (id, state) => {
    setFileInput((prev) =>
      prev.map((f) => {
        return f.id === id ? { ...f, isUploading: state } : f;
      })
    );
  };

  const removeFile = (id) => {
    setFileInput((prev) => prev.filter((f) => f.id !== id));
  };

  const completeFileSending = (f) => {
    // id references the file that the other peer has locally to download from the worker
    console.log("File transfer is complete: ", f);
    const {
      file: { name, type, size },
      id,
    } = f;
    sendWebRTC({ name, type, size, id }, "file-transfer-done");
    if (type.split("/")[0] === "image") {
      // grab the dataurl from the image and include it in the message
      const reader = new FileReader();
      reader.readAsDataURL(f.file);
      reader.onloadend = () => {
        saveBasicMessage({
          msg: { name, type, size, id, image: reader.result },
          type: "file-transfer-done",
          from: myDid.id,
          did: currentConversation.did,
        });
      };
    } else {
      saveBasicMessage({
        msg: { name, type, size, id, image: "" },
        type: "file-transfer-done",
        from: myDid.id,
        did: currentConversation.did,
      });
    }
    setFileState(f.id, false);
    removeFile(f.id);
  };

  const sendFile = (f) => {
    const { name, type } = f.file;
    console.log("Sending file: ", name);
    setFileState(f.id, true);

    f.file.arrayBuffer().then((buffer) => {
      const chunkSize = 16 * 1024;
      while (buffer.byteLength) {
        const chunk = buffer.slice(0, chunkSize);
        buffer = buffer.slice(chunkSize, buffer.byteLength);
        // turn ArrayBuffer to string to fit inside JSON object
        const base64chunk = encode(chunk);
        sendWebRTC(
          { name, type, id: f.id, data: base64chunk },
          "file-transfer-chunk"
        );
      }
      completeFileSending(f);
    });
  };

  const sendFiles = () => {
    fileInput.forEach((f) => {
      if (!currentConversationPeer && f.file.size > 2000000) {
        toast.error(
          "File size is too large to send. (Max 2MB). Please connect with user to send larger files."
        );
      } else {
        if (currentConversationPeer) {
          // send over webrtc chunked
          sendFile(f);
          return;
        } else {
          // otherwise, send file chunked over didcomm given it is a small file
          const reader = new FileReader();
          reader.readAsDataURL(f.file);
          reader.onloadend = () => {
            sendDidComm(
              JSON.stringify({
                data: { name: f.file.name },
                dataUri: reader.result,
              })
            );
            removeFile(f.id);
          };
        }
      }
    });
  };

  const sendMessage = () => {
    if (fileInput) sendFiles();
    if (msg.length > 0 && currentConversation) {
      if (currentConversationPeer) {
        // send the message over webrtc
        sendWebRTC(msg, "live-message");
        // also save the message locally for the conversation
        saveBasicMessage({
          msg,
          type: "live-message",
          from: myDid.id,
          did: currentConversation.did,
        });
        setMsg("");
        return;
      }
      sendDidComm();
    }
    setMsg("");
  };

  const handleKeyDown = (e) => {
    if (e.shiftKey && e.key === "Enter") {
      setMsg(`${msg}`);
      return;
    }
    if (e.key === "Enter") {
      sendMessage();
      return;
    }
  };

  // BUG: setMsg("") when using a <textarea> seems to instead set state to "\n"
  // even in a default CRA application. For now, this will do.
  const handleChange = (e) => {
    if (e.target.value !== "\n") {
      setMsg(e.target.value);
    }
  };

  return (
    <div className="bg-white shadow">
      <SelectedFileInput fileInput={fileInput} setFileInput={setFileInput} />
      <div className="px-4 sm:px-6 lg:max-w-6xl lg:mx-auto lg:px-8">
        <div className="py-2 md:flex md:items-center md:justify-between lg:border-t lg:border-gray-200">
          <div className="mt-6 flex space-x-3 md:mt-0 md:ml-4 w-full items-end">
            <EmojiPicker onEmojiSelect={onEmojiSelect} />
            <FileUploader setFile={setFileInput} />
            <textarea
              name="name"
              id="name"
              ref={textAreaRef}
              value={msg}
              onKeyPress={handleKeyDown}
              onChange={handleChange}
              className="tracking-wide shadow-sm focus:ring-primary focus:border-primary border-primary border block w-full sm:text-sm border-gray-300 px-4 rounded-md pt-2"
              placeholder="Start a new message"
            />
            <button
              type="button"
              onClick={() => sendMessage()}
              className="max-h-10 inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const ConversationBody = ({ messages, myDid }) => {
  const [convo, setConvo] = useState([]);

  const { data: contactsRes } = useFetchContacts();
  const [readMessages, setReadMessages] = useAtom(readMessagesAtom);
  const [currentConversation] = useAtom(currentConversationAtom);
  const [currentConversationPeer] = useAtom(currentConversationPeerAtom);

  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  });

  useEffect(() => {
    if (messages?.conversations && currentConversation) {
      const msgs = messages?.conversations[currentConversation.did]?.messages;
      if (msgs) {
        setConvo(msgs);
        // set these messages as read messages within Jotai state as well...
        setReadMessages(showMessagesAsRead(readMessages, msgs));
      } else {
        setConvo([]);
      }
    }
  }, [messages, currentConversation, readMessages, setReadMessages]);

  const getTextBodyColor = (from) => {
    if (from === myDid.id) {
      return currentConversationPeer?.peer.connected
        ? "bg-blue-600 text-white"
        : "bg-secondary text-white";
    } else {
      return "bg-gray-200 text-gray-800";
    }
  };

  const renderContent = (message) => {
    if (message.data.type === "https://didcomm.org/webrtc/1.0/sdp") {
      const knownContact = contactsRes?.data.contacts.find(
        (contact) => contact.did === message.data.from
      );
      const { signal } = message.data.body.content;
      if (signal.type === "offer") {
        return (
          <p>
            Sent an invitiation to connect.{" "}
            {isNotificationExpired(message.data.created_time) &&
              message.data.from !== myDid.id && (
                <a
                  className="font-bold underline"
                  onClick={() =>
                    confirmPeerInvite({
                      detail: {
                        message: message.data.body.content,
                        knownContact: knownContact || null,
                        sourceType: "didcomm",
                      },
                    })
                  }
                >
                  Show
                </a>
              )}
          </p>
        );
      }
      return "Sent you an invite to connect.";
    }

    if (message.data.type === "file-transfer-done") {
      if (message.data.body.content.image) {
        return (
          <img
            src={message.data.body.content.image}
            alt=""
            width={500}
            height={500}
          />
        );
      } else {
        return (
          <FileDownload
            message={{
              data: message.data.body.content,
              from: message.data.from,
            }}
            myDid={myDid.id}
          />
        );
      }
    }

    // lastly check for images over didcomm (standard is different)
    const msg = message.data.body.content;
    if (isJSON(msg)) {
      // check if file from did comm
      const {
        data: { name },
        dataUri,
      } = JSON.parse(msg);
      if (name && dataUriRegex().test(dataUri)) {
        const byteString = atob(dataUri.split(",")[1]);
        const mimeString = dataUri.split(",")[0].split(":")[1].split(";")[0];

        if (mimeString.split("/")[0] === "image") {
          return <img src={dataUri} alt="" width={500} height={500} />;
        } else {
          // give them the generic download UI
          let bytes = new Uint8Array(byteString.length);
          for (let i = 0; i < byteString.length; i++) {
            bytes[i] = byteString.charCodeAt(i);
          }
          let file = new File([bytes], name, { type: mimeString });
          return (
            <FileDownload
              message={{
                data: { name, type: mimeString, size: file.size, id: null },
                from: message.data.from,
              }}
              fileObj={file}
              myDid={myDid.id}
            />
          );
        }
      } else {
        return msg;
      }
    } else {
      return msg;
    }
  };

  // will need to show messages as read

  return (
    <div className="flex flex-col w-full h-full pt-6 overflow-y-auto">
      {convo.map((message, i) => (
        <div
          key={i}
          className={`flex py-1 ${
            message.data.from === myDid.id ? "pl-4 flex-row-reverse" : "pr-4"
          }`}
        >
          <div className="flex flex-col">
            <span
              className={`px-4 py-2 rounded-lg inline-block rounded-br-none text-sm whitespace-pre-line ${getTextBodyColor(
                message.data.from
              )}`}
            >
              {renderContent(message)}
            </span>
            {message.data.body.payment && (
              <p className="text-sm inline-flex text-center">
                {message.data.from === myDid.id ? "Sent" : "Received"}: +
                {parseInt(message.data.body.payment).toLocaleString()} sats{" "}
                <BsFillLightningChargeFill className="w-3 h-3 mt-1.5 ml-0.5" />
              </p>
            )}
            <div
              className={`flex ${
                message.data.from === myDid.id && "flex-row-reverse"
              }`}
            >
              <p className="text-primary opacity-30 text-xs">
                {moment.unix(message.data.created_time).fromNow()}
              </p>
            </div>
          </div>
        </div>
      ))}
      <div ref={bottomRef} />
    </div>
  );
};

const ContactQuickView = ({
  openContactPreview,
  setOpenContactPreview,
  currentConversation,
}) => {
  return (
    <Transition.Root show={openContactPreview} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 overflow-hidden z-30"
        onClose={setOpenContactPreview}
      >
        <div className="absolute inset-0 overflow-hidden">
          <Dialog.Overlay className="absolute inset-0" />

          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
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
                <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                  <div className="px-4 sm:px-6">
                    <div className="flex items-start justify-between">
                      <Dialog.Title className="text-lg font-medium text-gray-900">
                        {" "}
                        Contact{" "}
                      </Dialog.Title>
                      <div className="ml-3 flex h-7 items-center">
                        <button
                          type="button"
                          className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                          onClick={() => setOpenContactPreview(false)}
                        >
                          <span className="sr-only">Close panel</span>
                          <XIcon className="h-6 w-6" aria-hidden="true" />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="relative mt-6 flex-1 px-4 sm:px-6">
                    {/* Replace with your content */}
                    {/* <div className="absolute inset-0 px-4 sm:px-6">check</div> */}
                    <ContactView selectedContact={currentConversation} />
                    {/* /End replace */}
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default function Chat() {
  const [openContactPreview, setOpenContactPreview] = useState(false);
  const [openPayment, setOpenPayment] = useState(false);
  const [toggleNewContact, setToggleNewContact] = useState(false);

  const [currentConversation, setCurrentConversation] = useAtom(
    currentConversationAtom
  );

  const [, addPeer] = useAtom(addPeerAtom);
  const [lightningEnabled] = useAtom(lightningEnabledAtom);

  const { data: contactsRes } = useFetchContacts();
  const { data: myDid } = useFetchMyDid();
  const { data: messages } = useFetchMessages({
    myDid: myDid,
    contacts: contactsRes?.data.contacts,
  });
  const { mutate: sendBasicMessage } = useSendMessage();
  const { mutate: deleteGroupMessage } = useDeleteGroupMessages();

  const selectConversation = (did) => {
    const contact = contactsRes?.data.contacts.find(
      (contact) => contact.did === did
    );
    setCurrentConversation(contact);
  };

  const deleteConversation = () => {
    // this function will change later down the road.
    currentConversation &&
      toast(
        ({ closeToast }) => (
          <div>
            <p className="pb-4">Delete this conversation?</p>
            <div className="flex space-x-4">
              <button
                type="button"
                onClick={() => {
                  const groupId =
                    messages.conversations[currentConversation.did]?.metadata
                      .groupId;
                  if (groupId) {
                    deleteGroupMessage({ groupId });
                    setCurrentConversation();
                  }
                  closeToast();
                }}
                className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Delete
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

  const sendInvite = () => {
    // assuming a new network creation is needed
    const id = uuidv4();
    const data = sendPeerInvitation({
      networkId: id,
      networkOwner: myDid.id,
      sendBasicMessage: sendBasicMessage,
      lightningEnabled,
      src: myDid.id,
      contact: currentConversation,
      type: "live-messaging-invitation",
      localStream: false,
    });
    toast.success("Invite Sent");
    addPeer(data);
  };

  return (
    <MainNavigation currentPage={pageTitle}>
      <PaymentsSlideOut
        open={openPayment}
        setOpen={setOpenPayment}
        selectedContact={currentConversation ? currentConversation : null}
      />
      <div className="z-20">
        {/* this needs to be fixed as it isn't adhering to the z index for some weird reason */}
        <ContactQuickView
          openContactPreview={openContactPreview}
          setOpenContactPreview={setOpenContactPreview}
          currentConversation={currentConversation}
        />
      </div>
      <div className="flex-1 relative z-0 flex overflow-hidden h-full lg:pr-96 lg:mr-16">
        <main className="flex-1 relative z-0 overflow-y-auto focus:outline-none xl:order-last bg-white border-r">
          {/* Start main area*/}
          {currentConversation && (
            <>
              <div className="flex flex-col h-full">
                <div className="flex-none">
                  <ConversationHeader
                    setOpenContactPreview={setOpenContactPreview}
                    setOpenPayment={setOpenPayment}
                    sendInvite={sendInvite}
                    deleteConversation={deleteConversation}
                  />
                </div>
                <div className="grow flex-1 pl-8 pr-4 overflow-hidden">
                  <ConversationBody messages={messages} myDid={myDid} />
                </div>
                <div className="flex-none">
                  <ConversationFooter
                    sendBasicMessage={sendBasicMessage}
                    myDid={myDid}
                  />
                </div>
              </div>
            </>
          )}

          {/* End main area */}
        </main>
        <aside className="hidden relative xl:order-first xl:flex xl:flex-col flex-shrink-0 w-96 border-r border-gray-200 overflow-y-auto">
          {/* Start secondary column (hidden on smaller screens) */}
          <NewConversationHeader
            setToggleNewContact={setToggleNewContact}
            toggleNewContact={toggleNewContact}
          />
          {!toggleNewContact ? (
            <>
              <ConversationsHeader />
              <ListConversations
                selectConversation={selectConversation}
                myDid={myDid}
                conversations={messages?.conversations}
                contacts={contactsRes?.data.contacts}
              />
            </>
          ) : (
            <ListContacts
              setToggleNewContact={setToggleNewContact}
              contacts={contactsRes?.data.contacts}
              selectConversation={selectConversation}
            />
          )}
          {/* End secondary column */}
        </aside>
      </div>
    </MainNavigation>
  );
}
