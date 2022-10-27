import { useState, useEffect, Fragment } from "react";
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
import moment from "moment";
import PaymentsSlideOut from "../../components/lightning/PaymentsSlideOut";
import { useFetchBlocklist, useFetchContacts } from "../../hooks/contacts";
import { useFetchMessages, useDeleteGroupMessages } from "../../hooks/messages";
import { useFetchMyDid } from "../../hooks/id";
import { useAtom } from "jotai";
import {
  readMessagesAtom,
  currentConversationAtom,
} from "../../stores/messages";
import { peersAtom } from "../../stores/peers.js";
import { XIcon } from "@heroicons/react/outline";
import {
  isNotificationExpired,
  deleteConversation,
} from "../../utils/messages";
import { isJSON } from "../../utils/misc";
import { confirmPeerInvite } from "../../utils/peers";
import { toast } from "react-toastify";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { myDidLongFormDocumentAtom } from "../../stores/id";
import ContactAvatar from "../../components/contact/ContactAvatar";
import { getShortFormId, resolveDid } from "../../utils/id";
import {
  getContactsByMessage,
  getContactByDid,
  getNicknameFromConvo,
} from "../../utils/contacts";
import { useFetchSettings } from "../../hooks/settings";
import { useFetchLightningConfig } from "../../hooks/config";
import TwitterConnected from "../../components/contact/TwitterConnected";

const pageTitle = "Dashboard";

const MessagesTable = ({ conversations, unreadMessages }) => {
  const [, setCurrentConversation] = useAtom(currentConversationAtom);
  const { data: contactsRes } = useFetchContacts();
  const { mutate: deleteGroupMessage } = useDeleteGroupMessages();
  const router = useRouter();
  const { data: myDid } = useFetchMyDid();

  const goToConversation = (groupId) => {
    setCurrentConversation(groupId);
    router.push("/d/chat");
  };

  const renderContent = (lastMessage) => {
    if (lastMessage?.data.type === "https://didcomm.org/webrtc/1.0/sdp") {
      return "Sent you an invite to connect.";
    } else if (lastMessage?.data.type === "file-transfer-done") {
      return "File transfer.";
    } else if (isJSON(lastMessage?.data.body.content)) {
      const data = JSON.parse(lastMessage?.data.body.content);
      if (data.data) {
        const {
          data: { name },
          dataUri,
        } = data;
        if (name && dataUri) {
          // definitely a file
          return "File transfer.";
        }
      }
    } else {
      return `${lastMessage?.data.body.content?.slice(0, 50).toString()} ${
        lastMessage?.data.body.content?.length > 50 ? "..." : ""
      }`;
    }
  };

  const displayNickname = (messages) => {
    return getNicknameFromConvo({ messages });
  };

  return (
    <>
      <table className="min-w-full">
        <thead>
          <tr className="border-t border-gray-200">
            <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Contact
            </th>
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
            conversations.map(({ groupId, messages }, i) => (
              <tr
                key={i}
                className={`${
                  unreadMessages[groupId] > 0 ? "bg-white" : "bg-gray-100"
                }`}
              >
                <td
                  className="px-6 py-3 text-sm text-gray-500 font-medium"
                  onClick={() => goToConversation(groupId)}
                >
                  <div className="flex items-center space-x-2 justify-center lg:pl-2">
                    <div className="flex flex-shrink-0 -space-x-1 items-center">
                      {getContactsByMessage({
                        message: messages.slice(-1)[0],
                        contacts: contactsRes?.data.contacts,
                        myDid,
                      }).map((contact, i) => (
                        <Fragment key={i}>
                          <ContactAvatar
                            contact={contact}
                            className="h-8 w-8"
                          />
                          <div className="flex flex-col pl-2">
                            <div className="pl-2 text-gray-900 text-md font-semibold pr-5 flex items-center space-x-2">
                              {contact?.name}
                              {contact && (
                                <TwitterConnected
                                  contact={contact}
                                  className="ml-2 h-4 w-4"
                                />
                              )}
                            </div>
                            {contact?.name === "Unknown" &&
                              displayNickname(messages) && (
                                <span className="text-gray-500 font-normal text-xs">
                                  (Maybe: {displayNickname(messages)})
                                </span>
                              )}
                            {contact?.metadata &&
                              JSON.parse(contact?.metadata)?.username && (
                                <a
                                  target="_blank"
                                  rel="noreferrer"
                                  href={`https://twitter.com/${
                                    JSON.parse(contact?.metadata)?.username
                                  }`}
                                  className="pl-2 text-blue-500 text-sm hover:underline font-normal"
                                >{`(@${
                                  JSON.parse(contact?.metadata)?.username
                                })`}</a>
                              )}
                          </div>
                        </Fragment>
                      ))}
                    </div>
                    {/* <span className="flex-shrink-0 text-xs leading-5 font-medium">
                      +{messages.slice(-1)[0]?.recipients.length}
                    </span> */}
                  </div>
                </td>
                <td
                  onClick={() => goToConversation(groupId)}
                  className="px-6 py-3 max-w-0 w-full whitespace-nowrap text-sm font-medium text-gray-900"
                >
                  <div className="flex items-center space-x-3">
                    <div className="truncate hover:text-gray-600 flex items-center">
                      {unreadMessages[groupId] > 0 && (
                        <div className="flex items-center space-x-4 pr-4">
                          <div
                            className="bg-primary flex-shrink-0 w-2.5 h-2.5 rounded-full"
                            aria-hidden="true"
                          />
                          <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800">
                            {unreadMessages[groupId]}
                          </span>
                        </div>
                      )}
                      <span
                        className={`${
                          unreadMessages[groupId] > 0
                            ? "font-semibold"
                            : "font-normal"
                        }`}
                      >
                        {renderContent(messages.slice(-1)[0])}
                      </span>
                    </div>
                  </div>
                </td>
                <td
                  className="px-6 py-3 text-sm text-gray-500 font-medium"
                  onClick={() => goToConversation(groupId)}
                >
                  <div className="flex items-center space-x-2 justify-center">
                    <div className="flex flex-shrink-0 -space-x-1 items-center">
                      {getContactsByMessage({
                        message: messages.slice(-1)[0],
                        contacts: contactsRes?.data.contacts,
                        myDid,
                      }).map((contact, i) => (
                        <Fragment key={i}>
                          <ContactAvatar
                            key={i}
                            contact={contact}
                            className="h-6 w-6"
                          />
                        </Fragment>
                      ))}
                    </div>
                    {/* <span className="flex-shrink-0 text-xs leading-5 font-medium">
                      +{messages.slice(-1)[0]?.recipients.length}
                    </span> */}
                  </div>
                </td>
                <td
                  className="hidden md:table-cell px-6 py-3 whitespace-nowrap text-sm text-gray-500 text-right"
                  onClick={() => goToConversation(groupId)}
                >
                  {moment
                    .unix(messages.slice(-1)[0]?.data.created_time)
                    .fromNow()}
                </td>
                <td className="px-6 py-3 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex space-x-2">
                    <button onClick={() => goToConversation(groupId)}>
                      <div className="text-indigo-800 hover:text-indigo-900">
                        View
                      </div>
                    </button>
                    <button
                      onClick={() =>
                        deleteConversation({
                          groupId,
                          deleteGroupMessage,
                        })
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

const NotificationsTable = ({ notifications }) => {
  const { data: contactsRes } = useFetchContacts();
  const { data: myDid } = useFetchMyDid();

  return (
    <>
      <table className="min-w-full">
        <thead>
          <tr className="border-t border-gray-200">
            <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Contact
            </th>
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
          {notifications?.map((notification, i) => (
            <tr
              key={i}
              className={`${
                isNotificationExpired(notification.data.created_time)
                  ? "bg-white"
                  : "bg-gray-100"
              } `}
            >
              <td
                className="px-6 py-3 text-sm text-gray-500 font-medium"
                onClick={() => goToConversation(groupId)}
              >
                <div className="flex items-center space-x-2 justify-center lg:pl-2">
                  <div className="flex flex-shrink-0 -space-x-1 items-center">
                    {getContactsByMessage({
                      message: notification,
                      contacts: contactsRes?.data.contacts,
                      myDid,
                    }).map((contact, i) => (
                      <Fragment key={i}>
                        <ContactAvatar contact={contact} className="h-8 w-8" />
                        <div className="flex flex-col pl-2">
                          <div className="pl-2 text-gray-900 text-md font-semibold pr-5 flex items-center space-x-2">
                            {contact?.name}
                            {contact && (
                              <TwitterConnected
                                contact={contact}
                                className="ml-2 h-4 w-4"
                              />
                            )}
                          </div>
                          {contact?.metadata &&
                            JSON.parse(contact?.metadata)?.username && (
                              <a
                                target="_blank"
                                rel="noreferrer"
                                href={`https://twitter.com/${
                                  JSON.parse(contact?.metadata)?.username
                                }`}
                                className="pl-2 text-blue-500 text-sm hover:underline font-normal"
                              >{`(@${
                                JSON.parse(contact?.metadata)?.username
                              })`}</a>
                            )}
                        </div>
                      </Fragment>
                    ))}
                  </div>
                  {/* <span className="flex-shrink-0 text-xs leading-5 font-medium">
                      +{messages.slice(-1)[0]?.recipients.length}
                    </span> */}
                </div>
              </td>
              <td className="px-6 py-3 max-w-0 w-full whitespace-nowrap text-sm font-medium text-gray-900">
                <div className="flex items-center space-x-3 lg:pl-2">
                  <div href="#" className="truncate hover:text-gray-600">
                    <span
                      className={`${
                        isNotificationExpired(notification.data.created_time)
                          ? "font-bold"
                          : "font-normal"
                      }`}
                    >
                      <span className="text-gray-500 font-normal">
                        {`${
                          getContactByDid({
                            shortFormDid: getShortFormId(
                              notification.data.from
                            ),
                            contacts: contactsRes.data.contacts,
                          }).name
                        } invited you to connect`}
                      </span>
                    </span>
                  </div>
                </div>
              </td>
              <td className="hidden md:table-cell px-6 py-3 whitespace-nowrap text-sm text-gray-500 text-right">
                {moment.unix(notification.data.created_time).fromNow()}
              </td>
              <td className="px-6 py-3 whitespace-nowrap text-right text-sm font-medium">
                <>
                  {/* For now let's set a 5 minute expiration data on invitations */}
                  {isNotificationExpired(notification.data.created_time) ? (
                    <button
                      onClick={() =>
                        confirmPeerInvite({
                          detail: {
                            message: notification.data.body.content,
                            knownContact: getContactByDid({
                              shortFormDid: getShortFormId(
                                notification.data.from
                              ),
                              contacts: contactsRes.data.contacts,
                            }),
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
                  <ContactAvatar
                    key={i}
                    contact={peer.metadata.contact}
                    className="h-6 w-6"
                  />
                  <div className="truncate hover:text-gray-600">
                    <div className="flex items-center space-x-2">
                      {peer.metadata.contact
                        ? peer.metadata.contact.name
                        : "Unknown User"}
                      {peer.metadata.contact && (
                        <TwitterConnected
                          contact={peer.metadata.contact}
                          className="ml-2 h-4 w-4"
                        />
                      )}
                    </div>
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
  const [peers] = useAtom(peersAtom);
  const [myDidLongFormDocument] = useAtom(myDidLongFormDocumentAtom);
  const { data: myDid } = useFetchMyDid();
  const { data: blocklist } = useFetchBlocklist();
  const { data: contactsRes } = useFetchContacts();
  const { data: settings } = useFetchSettings();
  const { data: messages } = useFetchMessages({
    contacts: contactsRes?.data.contacts,
    myDid: myDid,
    blocklist,
    settings,
  });
  const { data: lightningConfig } = useFetchLightningConfig();

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
        conversations.forEach((conversation) => {
          let count = conversation.messages.filter(
            (m) => readMessages.indexOf(m.id) === -1
          ).length;
          unreadMessageCount[conversation.groupId] = count;
          unreadMessageCount["total"] += count;
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

  const togglePayment = () => {
    if (!lightningConfig?.data.lightningConfig.listening) {
      toast.info("Connect to a lightning node to use this action.");
      return;
    }
    setOpenPayment(true);
  };

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
                className="grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2 xl:grid-cols-4 mt-3 "
              >
                <li>
                  <div className="flex-1 flex items-center pt-2 truncate space-x-6">
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
                        onClick={() => togglePayment()}
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
                    unreadMessages={unreadMessages}
                    conversations={messages?.conversations}
                  />
                )}
                {currentTable === "Notifications" && (
                  <NotificationsTable
                    notifications={messages?.notifications.slice(-20)}
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
