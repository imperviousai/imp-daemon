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
import { BsFillLightningChargeFill } from "react-icons/bs";
import { toast } from "react-toastify";
import { ContactView } from "./contacts";
import { TailSpin } from "react-loader-spinner";
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
import {
  showMessagesAsRead,
  isNotificationExpired,
  deleteConversation,
} from "../../utils/messages";
import { getShortFormId } from "../../utils/id";
import { sendPeerInvitation, confirmPeerInvite } from "../../utils/peers";
import {
  readMessagesAtom,
  currentConversationAtom,
  currentConversationContactAtom,
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
import ContactAvatar from "../../components/contact/ContactAvatar";
import { getContactByDid, getContactsByMessage } from "../../utils/contacts";
import FileSharingModal from "../../components/meeting/FileSharingModal";

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

const RenderConversationSection = ({ unreadMessages, message }) => {
  const [contact, setContact] = useState();
  const { data: contactsRes } = useFetchContacts();
  const { data: myDid } = useFetchMyDid();

  useEffect(() => {
    const contacts = getContactsByMessage({
      message,
      contacts: contactsRes?.data.contacts,
      myDid,
    });
    // TODO: handle group messages here too
    setContact(contacts[0]);
  }, [message, contactsRes?.data.contacts, myDid]);

  const renderContent = () => {
    if (message?.data.type === "https://didcomm.org/webrtc/1.0/sdp") {
      const { signal } = message?.data.body.content;
      if (signal.type === "offer") {
        return <span>Sent an invite to connect</span>;
      }
    } else if (message?.data.type === "file-transfer-done") {
      return "File sent.";
    } else if (isJSON(message?.data.body.content)) {
      const { filename, dataUri } = JSON.parse(message?.data.body.content);
      if (filename && dataUri) {
        // definitely a file
        return "File sent.";
      }
    } else {
      return `${message?.data.body.content?.slice(0, 20)}`;
    }
  };
  return (
    <div className="flex items-center justify-between space-x-4">
      <div className="flex space-x-4">
        {contact && <ContactAvatar contact={contact} className="w-10 h-10" />}

        <div className="flex flex-col">
          <p
            className={`${
              unreadMessages > 0 ? "font-bold" : "font-light"
            } text-md`}
          >
            {contact?.name}
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
          {moment.unix(message?.data.created_time).fromNow()}
        </p>
      </div>
    </div>
  );
};

const ListConversations = () => {
  const [unreadMessages, setUnreadMessages] = useState({});
  const { data: contactsRes } = useFetchContacts();
  const { data: myDid } = useFetchMyDid();
  const { data: messages } = useFetchMessages({
    myDid: myDid,
    contacts: contactsRes?.data.contacts,
  });
  const [, setCurrentConversation] = useAtom(currentConversationAtom);

  const [readMessages] = useAtom(readMessagesAtom);

  useEffect(() => {
    let unreadMessageCount = {};
    if (messages?.conversations) {
      messages?.conversations.forEach((conversation) => {
        let count = conversation.messages.filter(
          (m) => readMessages.indexOf(m.id) === -1
        ).length;
        unreadMessageCount[conversation.groupId] = count;
      });
    }
    setUnreadMessages(unreadMessageCount);
  }, [readMessages, messages]);

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
        {messages?.conversations.map(({ groupId, messages }, i) => (
          <li
            key={i}
            className="relative pl-4 pr-6 py-5 hover:bg-gray-50 sm:py-3 sm:pl-6 lg:pl-8 xl:pl-6 blue="
            onClick={() => setCurrentConversation(groupId)}
          >
            <RenderConversationSection
              unreadMessages={unreadMessages[groupId]}
              message={messages.slice(-1)[0]}
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
  sendInvite,
  activeConversation,
}) => {
  const [currentConversationPeer] = useAtom(currentConversationPeerAtom);
  const [, setCurrentConversation] = useAtom(currentConversationAtom);
  const [currentConversationContact, setCurrentConversationContact] = useAtom(
    currentConversationContactAtom
  );
  const { mutate: deleteGroupMessage } = useDeleteGroupMessages();
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
                  <ContactAvatar
                    contact={currentConversationContact}
                    className="w-10 h-10"
                  />
                  <div className="flex flex-col ml-3">
                    <h1 className="text-lg font-semibold leading-7 text-gray-900 sm:leading-9 sm:truncate">
                      {currentConversationContact?.name}{" "}
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
                  <Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
                    <div className="py-1">
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            onClick={() => {
                              if (activeConversation) {
                                deleteConversation({
                                  groupId: activeConversation.groupId,
                                  deleteGroupMessage,
                                  callback: () => {
                                    setCurrentConversation();
                                    setCurrentConversationContact();
                                  },
                                });
                              }
                            }}
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
  setToggleNewContact,
  setCurrentConversationContact,
}) => {
  const { data: contactsRes } = useFetchContacts();
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
        {contactsRes.data.contacts.map((contact, i) => (
          <li
            key={i}
            onClick={() => {
              setCurrentConversationContact(contact);
              setToggleNewContact(false);
            }}
            className="relative pl-4 pr-6 py-5 hover:bg-gray-50 sm:py-3 sm:pl-6 lg:pl-8 xl:pl-6 blue="
          >
            {/* probably should be a separate renderContactSection */}
            <div className="flex items-center">
              <div className="flex space-x-4">
                <ContactAvatar contact={contact} className="h-10 w-10" />
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

// TODO: this component needs to merge with client/components/meeting/ConversationFooter. DRY
const ConversationFooter = ({ sendBasicMessage, myDid }) => {
  const MAXIMUM_MESSAGE_SIZE = 65535;
  const [msg, setMsg] = useState("");
  const [fileInput, setFileInput] = useState();
  const [counter, setCounter] = useState(1);
  const [sendingFile, setSendingFile] = useState();
  const [startingChunk, setStartingChunk] = useState(0);
  const [endingChunk, setEndingChunk] = useState(MAXIMUM_MESSAGE_SIZE);
  const [progress, setProgress] = useState(0);
  const [fileId, setFileId] = useState("");
  const [fileSize, setFileSize] = useState(0);
  const [chunkCount, setChunkCount] = useState(0);
  const [openFileSharingModal, setOpenFileSharingModal] = useState(false);

  const [lightningEnabled] = useAtom(lightningEnabledAtom);
  const [currentConversationPeer] = useAtom(currentConversationPeerAtom);
  const [currentConversation] = useAtom(currentConversationAtom);
  const [currentVideoCallId] = useAtom(currentVideoCallAtom);
  const [currentConversationContact] = useAtom(currentConversationContactAtom);
  const { mutate: saveBasicMessage } = useSaveMessage();
  const textAreaRef = useRef(null);

  useAutosizeTextArea(textAreaRef.current, msg);

  const onErrorSendMessage = () => {
    toast.error("Error sending message. Please try again.");
  };

  const onEmojiSelect = (emoji) => {
    setMsg((msg) => msg.concat(` ${emoji.native} `));
  };

  useEffect(() => {
    if (fileSize > 0) {
      fileUpload(counter);
    }
  }, [sendingFile, progress]);

  const startWebRTCFileTransfer = async () => {
    resetChunkProperties();
    setOpenFileSharingModal(true);
    setFileId(uuidv4());
    const arrayBuffer = await fileInput.arrayBuffer();
    setFileSize(arrayBuffer.byteLength);
    const _totalCount =
      arrayBuffer.byteLength % MAXIMUM_MESSAGE_SIZE == 0
        ? arrayBuffer.byteLength / MAXIMUM_MESSAGE_SIZE
        : Math.floor(arrayBuffer.byteLength / MAXIMUM_MESSAGE_SIZE) + 1; // Total count of chunks will have been upload to finish the file
    setChunkCount(_totalCount);
    setSendingFile(arrayBuffer);
    // shareFile(fileInput);
  };

  const fileUpload = () => {
    setCounter(counter + 1);
    if (counter <= chunkCount) {
      var chunk = sendingFile.slice(startingChunk, endingChunk);
      sendWebRTC({ id: fileId, data: chunk }, "file-transfer-chunk");
      setStartingChunk(endingChunk);
      setEndingChunk(endingChunk + MAXIMUM_MESSAGE_SIZE);
      if (counter == chunkCount) {
        console.log("Process is complete, counter", counter);
        setProgress(100);
        completeFileSending();
      } else {
        var percentage = (counter / chunkCount) * 100;
        setProgress(percentage);
        // console.log("SENDING FILE TRANSFER, PERCENTILE", percentage);
        // console.log("CHUNK: ", chunk);
      }
    }
  };

  const resetChunkProperties = () => {
    setProgress(0);
    setCounter(1);
    setStartingChunk(0);
    setEndingChunk(MAXIMUM_MESSAGE_SIZE);
  };

  const sendDidComm = (file) => {
    sendBasicMessage(
      {
        msg: file ? file : msg,
        did: currentConversationContact.did,
        type: "https://didcomm.org/basicmessage/2.0/message",
        amount: lightningEnabled ? 50 : 0,
        reply_to_id: "",
        isPayment: false,
      },
      { onError: onErrorSendMessage }
    );
  };

  const sendWebRTC = (data, type) => {
    if (type === "file-transfer-chunk") {
      const payload = `${data.id}:${encode(data.data)}`;
      // console.log("FILE: ", data.id);
      // console.log("Sending payload: ", payload);
      currentConversationPeer?.peer.write(payload);
      return;
    }
    const networkId =
      currentConversationPeer?.metadata.networkId !== currentVideoCallId
        ? currentConversationPeer?.metadata.networkId
        : null;
    const header = {
      timestamp: new Date().toString(),
      from: myDid.id,
      did: currentConversationContact.did,
      networkId,
      type,
    };
    const payload =
      type === "live-message" ? { msg: data, ...header } : { data, ...header };

    currentConversationPeer?.peer.write(JSON.stringify(payload));
  };

  const completeFileSending = () => {
    // id references the file that the other peer has locally to download from the worker
    const { name, type, size } = fileInput;
    console.log("File transfer is complete: ", name);
    sendWebRTC({ name, type, size, id: fileId }, "file-transfer-done");
    if (type.split("/")[0] === "image") {
      // grab the dataurl from the image and include it in the message
      const reader = new FileReader();
      reader.readAsDataURL(fileInput);
      reader.onloadend = () => {
        saveBasicMessage({
          msg: { name, type, size, id: fileId, image: reader.result },
          type: "file-transfer-done",
          from: myDid.id,
          did: currentConversationContact.did,
        });
      };
    } else {
      saveBasicMessage({
        msg: { name, type, size, id: fileId, image: "" },
        type: "file-transfer-done",
        from: myDid.id,
        did: currentConversationContact.did,
      });
    }
    setFileInput();
    setSendingFile();
    setOpenFileSharingModal(false);
    setProgress(0);
  };

  const sendFile = () => {
    if (currentConversationPeer) {
      startWebRTCFileTransfer();
      return;
    }
    if (!currentConversationPeer && fileInput.size > 2000000) {
      toast.error(
        "File size is too large to send. (Max 2MB). Please connect with user to send larger files."
      );
    } else {
      // otherwise, send file chunked over didcomm given it is a small file
      const reader = new FileReader();
      reader.readAsDataURL(fileInput);
      reader.onloadend = () => {
        sendDidComm(
          JSON.stringify({
            data: { name: fileInput.name },
            dataUri: reader.result,
          })
        );
        setFileInput();
      };
    }
  };

  const sendMessage = () => {
    if (fileInput) sendFile();
    if (msg.length > 0 && (currentConversation || currentConversationContact)) {
      if (currentConversationPeer) {
        // send the message over webrtc
        sendWebRTC(msg, "live-message");
        // also save the message locally for the conversation
        saveBasicMessage({
          msg,
          type: "live-message",
          from: myDid.id,
          did: currentConversationContact.did,
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
    <div className="bg-white shadow px-4">
      {fileInput && (
        <SelectedFileInput
          fileInput={fileInput}
          setFileInput={setFileInput}
          progress={progress}
        />
      )}
      <div className="px-2 sm:px-6 lg:max-w-6xl lg:mx-auto lg:px-8">
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
        <FileSharingModal
          open={openFileSharingModal}
          setOpen={setOpenFileSharingModal}
          progress={progress}
        />
      </div>
    </div>
  );
};

const ConversationBody = ({ activeConversation }) => {
  const [convo, setConvo] = useState([]);

  const { data: contactsRes } = useFetchContacts();
  const { data: myDid } = useFetchMyDid();
  const [readMessages, setReadMessages] = useAtom(readMessagesAtom);
  const [currentConversationPeer] = useAtom(currentConversationPeerAtom);

  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  });

  useEffect(() => {
    if (activeConversation) {
      setConvo(activeConversation.messages);
      setReadMessages(
        showMessagesAsRead(readMessages, activeConversation.messages)
      );
    } else {
      setConvo([]);
    }
  }, [readMessages, setReadMessages, activeConversation]);

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
      const { signal } = message.data.body.content;
      if (signal.type === "offer") {
        return (
          <p>
            Sent an invitiation to connect.{" "}
            {isNotificationExpired(message.data.created_time) &&
              getShortFormId(message.data.from) !== myDid.id && (
                <a
                  className="font-bold underline"
                  onClick={() =>
                    confirmPeerInvite({
                      detail: {
                        message: message.data.body.content,
                        knownContact: getContactByDid({
                          shortFormDid: getShortFormId(message.data.from),
                          contacts: contactsRes.data.contacts,
                        }),
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
              from: getShortFormId(message.data.from),
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
            getShortFormId(message.data.from) === myDid.id
              ? "pl-4 flex-row-reverse"
              : "pr-4"
          }`}
        >
          <div className="flex flex-col">
            <span
              className={`px-4 py-2 rounded-lg inline-block rounded-br-none text-sm whitespace-pre-line ${getTextBodyColor(
                getShortFormId(message.data.from)
              )}`}
            >
              {renderContent(message)}
            </span>
            {message.data.body.payment && (
              <p className="text-sm inline-flex text-center">
                {getShortFormId(message.data.from) === myDid.id
                  ? "Sent"
                  : "Received"}
                : +{parseInt(message.data.body.payment).toLocaleString()} sats{" "}
                <BsFillLightningChargeFill className="w-3 h-3 mt-1.5 ml-0.5" />
              </p>
            )}
            <div
              className={`flex ${
                getShortFormId(message.data.from) === myDid.id &&
                "flex-row-reverse"
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
  currentConversationContact,
}) => {
  return (
    <Transition.Root show={openContactPreview} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 overflow-hidden z-10"
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
                    <ContactView selectedContact={currentConversationContact} />
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
  const [activeConversation, setActiveConversation] = useState();

  const [currentConversation, setCurrentConversation] = useAtom(
    currentConversationAtom
  );
  const [currentConversationContact, setCurrentConversationContact] = useAtom(
    currentConversationContactAtom
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

  // TODO: rework these two useEffecfts, but for now they work
  useEffect(() => {
    if (currentConversation) {
      const conversation = messages?.conversations.find(
        (c) => c.groupId === currentConversation
      );
      if (conversation) {
        const contacts = getContactsByMessage({
          message: conversation.messages[0],
          contacts: contactsRes?.data.contacts,
          myDid,
        });
        setActiveConversation(conversation);
        // TODO: support group messages
        setCurrentConversationContact(contacts[0]);
      }
    }
  }, [
    contactsRes?.data.contacts,
    currentConversation,
    messages?.conversations,
    myDid,
    setCurrentConversationContact,
  ]);

  useEffect(() => {
    if (currentConversationContact) {
      //attempt to grab relevant conversation
      let conversation = messages?.conversations.find((c) =>
        c.messages.find((m) =>
          m.recipients.includes(currentConversationContact.did)
        )
      );
      if (conversation) {
        setActiveConversation(conversation);
      } else {
        setActiveConversation();
        setCurrentConversation();
      }
    }
  }, [
    currentConversation,
    setCurrentConversationContact,
    contactsRes?.data.contacts,
    myDid,
    messages,
    currentConversationContact,
    setCurrentConversation,
  ]);

  const sendInvite = () => {
    // assuming a new network creation is needed
    const id = uuidv4();
    const data = sendPeerInvitation({
      networkId: id,
      networkOwner: myDid.id,
      sendBasicMessage: sendBasicMessage,
      lightningEnabled,
      src: myDid.id,
      contact: currentConversationContact,
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
        selectedContact={
          currentConversationContact ? currentConversationContact : null
        }
      />
      <div className="z-20">
        {/* this needs to be fixed as it isn't adhering to the z index for some weird reason */}
        <ContactQuickView
          openContactPreview={openContactPreview}
          setOpenContactPreview={setOpenContactPreview}
          currentConversationContact={currentConversationContact}
        />
      </div>
      <div className="flex-1 relative z-0 flex overflow-hidden h-full lg:pr-52 lg:mr-16">
        <main className="flex-1 relative z-0 overflow-y-auto focus:outline-none xl:order-last bg-white border-r">
          {/* Start main area*/}
          {(currentConversation || currentConversationContact) && (
            <>
              <div className="flex flex-col h-full">
                <div className="flex-none">
                  <ConversationHeader
                    setOpenContactPreview={setOpenContactPreview}
                    setOpenPayment={setOpenPayment}
                    sendInvite={sendInvite}
                    activeConversation={activeConversation}
                  />
                </div>
                <div className="grow flex-1 pl-8 pr-4 overflow-hidden">
                  <ConversationBody activeConversation={activeConversation} />
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
        <aside className="hidden relative xl:order-first xl:flex xl:flex-col flex-shrink-0 w-80 border-r border-gray-200 overflow-y-auto">
          {/* Start secondary column (hidden on smaller screens) */}
          <NewConversationHeader
            setToggleNewContact={setToggleNewContact}
            toggleNewContact={toggleNewContact}
          />
          {!toggleNewContact ? (
            <>
              <ConversationsHeader />
              <ListConversations />
            </>
          ) : (
            <ListContacts
              setToggleNewContact={setToggleNewContact}
              setCurrentConversationContact={setCurrentConversationContact}
            />
          )}
          {/* End secondary column */}
        </aside>
      </div>
    </MainNavigation>
  );
}
