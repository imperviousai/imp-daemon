import { useState, useEffect } from "react";
import MainNavigation from "../../components/MainNavigation";
import {
  ChatAlt2Icon,
  ChevronRightIcon,
  BellIcon,
  UsersIcon,
  VideoCameraIcon,
  ChatIcon,
  UserIcon,
} from "@heroicons/react/solid";
import uniqBy from "lodash/uniqBy";
import { BsFillLightningChargeFill } from "react-icons/bs";
import { RiUserSharedFill } from "react-icons/ri";
import { useRouter } from "next/router";
import { BigHead } from "@bigheads/core";
import moment from "moment";
import PaymentsSlideOut from "../../components/lightning/PaymentsSlideOut";
import { useFetchContacts } from "../../hooks/contacts";
import { useFetchMessages, useDeleteGroupMessages } from "../../hooks/messages";
import { useFetchMyDid } from "../../hooks/id";
import { useAtom } from "jotai";
import {
  readMessagesAtom,
  currentConversationAtom,
} from "../../stores/messages";
import { myAvatarAtom } from "../../stores/settings";
import { peersAtom } from "../../stores/peers.js";
import { XIcon } from "@heroicons/react/outline";
import { isNotificationExpired } from "../../utils/messages";
import { confirmPeerInvite } from "../../utils/peers";
import { getContactAvatar } from "../../utils/contacts";
import { toast } from "react-toastify";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { myDidLongFormDocumentAtom } from "../../stores/id";

const pageTitle = "Dashboard";

// duplicate function, should go in a helper file
const isJSON = (msg) => {
  try {
    JSON.parse(msg);
  } catch (e) {
    return false;
  }
  return true;
};

const MessagesTable = ({
  router,
  conversations,
  unreadMessages,
  contacts,
  myDid,
  myAvatar,
  deleteGroupMessage,
}) => {
  const [, setCurrentConversation] = useAtom(currentConversationAtom);
  // TODO: perhaps export the below function, but for now it will work
  const renderAvatar = (did) => {
    let c = contacts.find((contact) => contact.did === did);
    if (c) {
      return getContactAvatar(c);
    } else if (did === myDid.id) {
      return myAvatar;
    } else {
      return {};
    }
  };

  const goToConversation = (did) => {
    const c = contacts.find((contact) => contact.did === did);
    if (c) {
      setCurrentConversation(c);
      router.push("/d/chat");
    }
  };

  const deleteConversation = (groupId) => {
    // this function will change later down the road.
    groupId &&
      toast(
        ({ closeToast }) => (
          <div>
            <p className="pb-4">Delete this conversation?</p>
            <div className="flex space-x-4">
              <button
                type="button"
                onClick={() => {
                  deleteGroupMessage({ groupId });
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

  const renderContent = (metadata) => {
    if (metadata.lastMessage?.type === "https://didcomm.org/webrtc/1.0/sdp") {
      return "Sent you an invite to connect.";
    } else if (metadata.lastMessage?.type === "file-transfer-done") {
      return "File transfer.";
    } else if (isJSON(metadata.lastMessage?.body.content)) {
      const { filename, dataUri } = JSON.parse(
        metadata.lastMessage?.body.content
      );
      if (filename && dataUri) {
        // definitely a file
        return "File transfer.";
      }
    } else {
      return `${metadata.lastMessage?.body.content?.slice(0, 50)} ${
        metadata.lastMessage?.body.content.length > 50 ? "..." : ""
      }`;
    }
  };

  return (
    <>
      <table className="min-w-full">
        <thead>
          <tr className="border-t border-gray-200">
            <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              <span className="lg:pl-2">Conversations</span>
            </th>
            <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Participants
            </th>
            <th className="hidden md:table-cell px-6 py-3 border-b border-gray-200 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Latest
            </th>
            <th className="pr-6 py-3 border-b border-gray-200 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider" />
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-100">
          {conversations &&
            Object.keys(conversations).map((did, i) => (
              <tr
                key={i}
                className={`${
                  unreadMessages[did] > 0 ? "bg-white" : "bg-gray-100"
                }`}
              >
                <td
                  onClick={() => goToConversation(did)}
                  className="px-6 py-3 max-w-0 w-full whitespace-nowrap text-sm font-medium text-gray-900"
                >
                  <div className="flex items-center space-x-3 lg:pl-2">
                    <div className="truncate hover:text-gray-600 flex items-center">
                      <BigHead
                        key={i}
                        className="h-10 w-10 pb-2"
                        {...renderAvatar(did)}
                      />
                      <span className="text-gray-900 text-md font-semibold pr-5">
                        {conversations[did].metadata.name || "Unknown"}
                      </span>
                      {unreadMessages[did] > 0 && (
                        <div className="flex items-center space-x-4 pr-4">
                          <div
                            className="bg-primary flex-shrink-0 w-2.5 h-2.5 rounded-full"
                            aria-hidden="true"
                          />
                          <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800">
                            {unreadMessages[did]}
                          </span>
                        </div>
                      )}
                      <span
                        className={`${
                          unreadMessages[did] > 0
                            ? "font-semibold"
                            : "font-normal"
                        }`}
                      >
                        {renderContent(conversations[did].metadata)}
                      </span>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-3 text-sm text-gray-500 font-medium">
                  <div className="flex items-center space-x-2">
                    <div className="flex flex-shrink-0 -space-x-1">
                      {conversations[did].metadata.participants.map(
                        (did, i) => (
                          <div key={i}>
                            {did && (
                              <BigHead
                                key={i}
                                className="h-6 w-6"
                                {...renderAvatar(did)}
                              />
                            )}
                          </div>
                        )
                      )}
                    </div>
                    <span className="flex-shrink-0 text-xs leading-5 font-medium">
                      +{conversations[did].metadata.participants.length}
                    </span>
                  </div>
                </td>
                <td className="hidden md:table-cell px-6 py-3 whitespace-nowrap text-sm text-gray-500 text-right">
                  {moment
                    .unix(conversations[did].metadata.lastUpdated)
                    .fromNow()}
                </td>
                <td className="px-6 py-3 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex space-x-2">
                    <button onClick={() => goToConversation(did)}>
                      <div className="text-indigo-800 hover:text-indigo-900">
                        View
                      </div>
                    </button>
                    <button
                      onClick={() =>
                        deleteConversation(conversations[did].metadata.groupId)
                      }
                    >
                      <div className="text-red-800 hover:text-red-900">
                        Delete
                      </div>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
};

const RequestsTable = ({ requests }) => {
  return (
    <>
      <table className="min-w-full">
        <thead>
          <tr className="border-t border-gray-200">
            <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              <span className="lg:pl-2">Notifications</span>
            </th>
            <th className="hidden md:table-cell px-6 py-3 border-b border-gray-200 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Timestamp
            </th>
            <th className="pr-6 py-3 border-b border-gray-200 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider" />
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-100">
          {requests.map((request, i) => (
            <tr
              key={i}
              className={`${
                isNotificationExpired(JSON.parse(request.data).created_time)
                  ? "bg-white"
                  : "bg-gray-100"
              } `}
            >
              <td className="px-6 py-3 max-w-0 w-full whitespace-nowrap text-sm font-medium text-gray-900">
                <div className="flex items-center space-x-3 lg:pl-2">
                  <div className="flex flex-shrink-0 -space-x-1">
                    <BigHead
                      className="w-8 h-8"
                      {...getContactAvatar(request.metadata.contact)}
                    />
                  </div>
                  <div href="#" className="truncate hover:text-gray-600">
                    <span
                      className={`${
                        isNotificationExpired(
                          JSON.parse(request.data).created_time
                        )
                          ? "font-bold"
                          : "font-normal"
                      }`}
                    >
                      <span className="text-gray-500 font-normal">
                        {request.metadata.contact &&
                          request.metadata.contact.name}{" "}
                        {`invited you to connect.`}
                      </span>
                    </span>
                  </div>
                </div>
              </td>
              <td className="hidden md:table-cell px-6 py-3 whitespace-nowrap text-sm text-gray-500 text-right">
                {moment.unix(JSON.parse(request.data).created_time).fromNow()}
              </td>
              <td className="px-6 py-3 whitespace-nowrap text-right text-sm font-medium">
                <>
                  {/* For now let's set a 5 minute expiration data on invitations */}
                  {isNotificationExpired(
                    JSON.parse(request.data).created_time
                  ) ? (
                    <button
                      onClick={() =>
                        confirmPeerInvite({
                          detail: {
                            message: JSON.parse(request.data).body.content,
                            knownContact: request.metadata.contact,
                            sourceType: "didcomm",
                          },
                        })
                      }
                    >
                      <div className="text-indigo-800 hover:text-indigo-900 pr-2 ">
                        Show
                      </div>
                    </button>
                  ) : (
                    <div className="text-gray-600">Expired</div>
                  )}
                </>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
const UsersTable = ({ peers, router }) => {
  const isUserOnline = true;

  return (
    <>
      <table className="min-w-full">
        <thead>
          <tr className="border-t border-gray-200">
            <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              <span className="lg:pl-2">Connected Users</span>
            </th>
            <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              DID
            </th>
            <th className="pr-6 py-3 border-b border-gray-200 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider" />
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-100">
          {peers.map((peer, i) => (
            <tr
              key={i}
              className={`${!isUserOnline ? "bg-gray-100" : "bg-white"}`}
            >
              <td className="px-6 py-3 max-w-0 w-full whitespace-nowrap text-sm font-medium text-gray-900">
                <div className="flex items-center space-x-3 lg:pl-2">
                  {true ? (
                    <div
                      className={`flex-shrink-0 w-3 h-3 rounded-full flex items-center justify-center ${
                        isUserOnline
                          ? "border-2 border-green-400"
                          : "border-2 border-gray-300"
                      }`}
                      aria-hidden="true"
                    >
                      <div
                        className={`flex-shrink-0 w-2 h-2 rounded-full bg-green-400 border-2 border-green-400 `}
                        aria-hidden="true"
                      />
                    </div>
                  ) : (
                    <div
                      className={`flex-shrink-0 w-3 h-3 rounded-full border-2 border-gray-300`}
                      aria-hidden="true"
                    />
                  )}
                  <BigHead
                    key={i}
                    className="h-6 w-6"
                    {...getContactAvatar(peer.metadata.contact)}
                  />
                  <div className="truncate hover:text-gray-600">
                    <span>
                      {peer.metadata.contact
                        ? peer.metadata.contact.name
                        : "Unknown User"}
                    </span>
                  </div>
                </div>
              </td>
              <td className="px-6 py-3 text-sm text-gray-500 font-medium">
                <div className="flex items-center space-x-2">
                  <div className="flex flex-shrink-0 -space-x-1">
                    {peer.metadata.dest}
                  </div>
                </div>
              </td>
              <td className="hidden md:table-cell px-6 py-3 whitespace-nowrap text-sm text-gray-500 text-right">
                Online
              </td>
              <td className="px-6 py-3 whitespace-nowrap text-right text-sm font-medium">
                <button type="button" className="inline-flex items-center p-1">
                  <VideoCameraIcon
                    className="h-5 w-5 text-indigo-800 hover:text-primary-hover"
                    aria-hidden="true"
                  />
                </button>
                <button type="button" className="inline-flex items-center p-1">
                  <ChatAlt2Icon
                    className="h-5 w-5 text-indigo-800 hover:text-primary-hover"
                    aria-hidden="true"
                  />
                </button>
                <button type="button" className="inline-flex items-center p-1">
                  <BsFillLightningChargeFill
                    className="h-5 w-5 text-indigo-800 hover:text-primary-hover"
                    aria-hidden="true"
                  />
                </button>
                <button
                  type="button"
                  className="inline-flex items-center p-1"
                  onClick={() => peer.peer.destroy()}
                >
                  <XIcon
                    className="h-5 w-5 text-indigo-800 hover:text-primary-hover"
                    aria-hidden="true"
                  />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

const Overview = ({
  title,
  subtitle,
  notificationCount,
  setCurrentTable,
  icon,
}) => {
  return (
    <li
      key={title}
      className="relative col-span-1 flex shadow-sm rounded-md"
      onClick={() => setCurrentTable(title)}
    >
      <div className="bg-primary flex-shrink-0 flex items-center justify-center w-16 text-white text-sm font-medium rounded-l-md px-4">
        <div
          className={`${
            notificationCount > 0 ? "bg-green-500" : "bg-opacity-100"
          } flex-shrink-0 w-3 h-3 rounded-full absolute top-0 right-0`}
          aria-hidden="true"
        />
        {icon}
      </div>
      <div className="flex-1 flex items-center justify-between border-t border-r border-b border-gray-200 bg-white rounded-r-md truncate">
        <div className="flex-1 px-4 py-2 text-sm truncate">
          <div
            href="#"
            className="text-gray-900 font-medium hover:text-gray-600"
          >
            {title}
          </div>
          <p className="text-gray-500">
            {notificationCount} {subtitle}
          </p>
        </div>
      </div>
    </li>
  );
};

export default function Dashboard() {
  const [currentTable, setCurrentTable] = useState("Messages");
  const [openPayment, setOpenPayment] = useState(false);
  const [unreadMessages, setUnreadMessages] = useState({});
  const [unreadRequest, setUnreadRequests] = useState([]);
  const [connectedPeers, setConnectedPeers] = useState([]);
  const router = useRouter();

  const [readMessages] = useAtom(readMessagesAtom);
  const [myAvatar] = useAtom(myAvatarAtom);
  const [peers] = useAtom(peersAtom);
  const [myDidLongFormDocument] = useAtom(myDidLongFormDocumentAtom);

  const { data: contactsRes } = useFetchContacts();
  const { data: myDid } = useFetchMyDid();
  const { data: messages } = useFetchMessages({
    myDid: myDid,
    contacts: contactsRes?.data.contacts,
  });
  const { mutate: deleteGroupMessage } = useDeleteGroupMessages();

  useEffect(() => {
    if (peers) {
      const connections = peers.filter((p) => p.peer._connected);
      setConnectedPeers(uniqBy(connections, "metadata.dest"));
    }
  }, [peers]);

  // handle unread messages for both messages, and requests
  useEffect(() => {
    let unreadRequestCount = 0;
    let unreadMessageCount = { total: 0 };
    if (messages) {
      const { conversations, notifications } = messages;
      if (conversations) {
        Object.keys(conversations).map((did, i) => {
          let c = conversations[did].messages.filter(
            (m) => readMessages.indexOf(m.id) === -1
          ).length;
          unreadMessageCount[did] = c;
          unreadMessageCount["total"] += c;
        });
      }
      if (notifications) {
        unreadRequestCount = notifications.filter(
          (m) => readMessages.indexOf(m.id) === -1
        ).length;
      }
    }
    setUnreadMessages(unreadMessageCount);
    setUnreadRequests(unreadRequestCount);
  }, [readMessages, messages]);

  return (
    <MainNavigation currentPage={pageTitle}>
      <>
        <PaymentsSlideOut
          open={openPayment}
          setOpen={setOpenPayment}
          selectedContact={null}
        />
        <div className="flex flex-col">
          <main className="flex-1">
            {/* Pinned projects */}
            <div className="px-4 mt-6 sm:px-6 lg:px-8">
              <h2 className="text-gray-500 text-xs font-medium uppercase tracking-wide">
                Quick Actions
              </h2>
              <ul
                role="list"
                className="grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2 xl:grid-cols-4 mt-3"
              >
                <li>
                  <div className="flex-1 flex items-center px-10 pt-2 truncate space-x-6">
                    <div className="flex flex-col items-center pr-2">
                      <button
                        type="button"
                        onClick={() => router.push("/d/meeting")}
                        className="inline-flex items-center p-2 border border-transparent rounded-full shadow-sm text-white bg-primary hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        <VideoCameraIcon
                          className="h-5 w-5"
                          aria-hidden="true"
                        />
                      </button>
                      <p className="text-gray-900 font-medium hover:text-gray-600 text-sm pt-1">
                        Meet
                      </p>
                    </div>
                    <div className="flex flex-col items-center">
                      <button
                        type="button"
                        onClick={() => router.push("/d/chat")}
                        className="inline-flex items-center p-2 border border-transparent rounded-full shadow-sm text-white bg-primary hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        <ChatIcon className="h-5 w-5" aria-hidden="true" />
                      </button>
                      <p className="text-gray-900 font-medium hover:text-gray-600 text-sm pt-1">
                        Message
                      </p>
                    </div>
                    <div className="flex flex-col items-center">
                      <button
                        type="button"
                        onClick={() => setOpenPayment(true)}
                        className="inline-flex items-center p-2 border border-transparent rounded-full shadow-sm text-white bg-primary hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        <BsFillLightningChargeFill
                          className="h-5 w-5"
                          aria-hidden="true"
                        />
                      </button>
                      <p className="text-gray-900 font-medium hover:text-gray-600 text-sm pt-1">
                        Lightning
                      </p>
                    </div>
                    <div className="flex flex-col items-center">
                      <CopyToClipboard
                        text={myDidLongFormDocument}
                        onCopy={() =>
                          toast.info(
                            "Copied to clipboard! Share this document!"
                          )
                        }
                      >
                        <button
                          type="button"
                          className="inline-flex items-center p-2 border border-transparent rounded-full shadow-sm text-white bg-primary hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                          <RiUserSharedFill
                            className="h-5 w-5"
                            aria-hidden="true"
                          />
                        </button>
                      </CopyToClipboard>
                      <p className="text-gray-900 font-medium hover:text-gray-600 text-sm pt-1">
                        Share
                      </p>
                    </div>
                  </div>
                </li>
                <Overview
                  title="Messages"
                  subtitle="Unread Messages"
                  notificationCount={unreadMessages.total}
                  setCurrentTable={setCurrentTable}
                  icon={<ChatAlt2Icon />}
                />
                <Overview
                  title="Notifications"
                  subtitle="New Notifications"
                  notificationCount={unreadRequest}
                  setCurrentTable={setCurrentTable}
                  icon={<BellIcon />}
                />
                <Overview
                  title="Connected Users"
                  subtitle="Connected Users"
                  notificationCount={connectedPeers.length}
                  setCurrentTable={setCurrentTable}
                  icon={<UsersIcon />}
                />
              </ul>
            </div>

            {/* Projects table (small breakpoint and up) */}
            <div className="mt-8 ">
              <div className="align-middle inline-block min-w-full border-b border-gray-200">
                {currentTable === "Messages" && (
                  <MessagesTable
                    router={router}
                    conversations={messages?.conversations}
                    unreadMessages={unreadMessages}
                    contacts={contactsRes?.data.contacts}
                    myDid={myDid}
                    myAvatar={myAvatar}
                    deleteGroupMessage={deleteGroupMessage}
                  />
                )}
                {currentTable === "Notifications" && (
                  <RequestsTable
                    requests={messages?.notifications.slice(-20)}
                    contacts={contactsRes?.data.contacts}
                  />
                )}
                {currentTable === "Connected Users" && (
                  <UsersTable peers={connectedPeers} router={router} />
                )}
              </div>
            </div>
          </main>
        </div>
      </>
    </MainNavigation>
  );
}
