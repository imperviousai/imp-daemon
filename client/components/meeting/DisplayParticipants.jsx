import { Fragment, useEffect, useState } from "react";
import { Dialog, Transition, Listbox } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";
import { PlusSmIcon, CheckIcon, SelectorIcon } from "@heroicons/react/solid";
import { useAtom } from "jotai";
import {
  addPeerAtom,
  activeVideoPeersAtom,
  activeLiveDocsPeersAtom,
  removePeerAtom,
} from "../../stores/peers";
import {
  lightningEnabledAtom,
  meetingInviteListAtom,
} from "../../stores/messages";
import { sendPeerInvitation } from "../../utils/peers";
import { useFetchMyDid } from "../../hooks/id";
import { useFetchContacts, useFetchBlocklist } from "../../hooks/contacts";
import { useSendMessage } from "../../hooks/messages";
import { toast } from "react-toastify";
import { trigger } from "../../utils/events";
import ContactAvatar from "../contact/ContactAvatar";
import { useFetchSettings } from "../../hooks/settings";
import TwitterConnected from "../contact/TwitterConnected";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export const SelectParticipants = ({
  selected,
  setSelected,
  peers,
  networkId,
}) => {
  const { data: contactsRes } = useFetchContacts();
  const { data: blocklist } = useFetchBlocklist();
  const [, removePeer] = useAtom(removePeerAtom);

  const isSelected = (contact) => selected.includes(contact);

  const toggleSelected = (contact) =>
    isSelected(contact)
      ? setSelected(() => selected.filter((c) => c !== contact))
      : setSelected((selected) => [...selected, contact]);

  const getMatchingPeer = (contact) =>
    peers.find(
      (peer) =>
        peer.metadata.contact?.did === contact?.did &&
        peer.metadata.networkId === networkId
    );

  const isConnected = (contact) => {
    const peer = getMatchingPeer(contact);
    return peer ? peer.peer._channel?.readyState === "open" : false;
  };

  const isInvited = (contact) => {
    const peer = getMatchingPeer(contact);
    return peer ? peer.peer._channel?.readyState === "connecting" : false;
  };

  const getStatus = (contact) => {
    if (isConnected(contact)) return "Connected";
    if (isInvited(contact)) return "Invited";
  };

  const resendInvitation = (contact) => {
    const peer = getMatchingPeer(contact);
    if (peer) {
      removePeer(peer);
    }
    toggleSelected(contact);
  };

  const revokeInvitation = (contact) => {
    const peer = getMatchingPeer(contact);
    if (peer) {
      removePeer(peer);
      toast.success("Invitation revoked.");
    } else {
      console.error("Error: Unable to find matching peer.");
    }
  };

  return (
    <div>
      <div className="flow-root mt-6">
        <ul role="list" className="-my-5 divide-y divide-gray-200">
          {contactsRes?.data.contacts.map((contact, i) => (
            <li key={contact.did} className="py-4">
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <ContactAvatar contact={contact} className="h-8 w-8" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-gray-900 truncate flex items-center space-x-2">
                    {contact?.name}
                    {contact && (
                      <TwitterConnected
                        contact={contact}
                        className="ml-2 h-4 w-4"
                      />
                    )}
                  </div>
                  <p className="text-sm text-gray-500 truncate">
                    {getStatus(contact)}
                  </p>
                </div>
                {blocklist?.includes(contact.did) ? (
                  <span className="ml-2 inline-flex items-center rounded-md bg-red-100 px-2.5 py-0.5 text-sm font-medium text-red-800">
                    Blocked
                  </span>
                ) : (
                  <>
                    {!isConnected(contact) && (
                      <div>
                        {!isInvited(contact) ? (
                          <button
                            onClick={() => toggleSelected(contact)}
                            className={`${
                              isSelected(contact)
                                ? "text-white bg-primary hover:bg-primary-hover"
                                : "text-gray-700 bg-white hover:bg-gray-50"
                            } inline-flex items-center shadow-sm px-2.5 py-0.5 border border-gray-300 text-sm leading-5 font-medium rounded-full `}
                          >
                            {/* TODO: need to account for invited but connected */}
                            {isSelected(contact) ? "Undo" : "Invite"}
                          </button>
                        ) : (
                          <div>
                            <button
                              onClick={() => resendInvitation(contact)}
                              className="inline-flex items-center shadow-sm px-2.5 py-0.5 border border-gray-300 text-sm leading-5 font-medium rounded-full text-gray-700 bg-white hover:bg-gray-50"
                            >
                              Try Again
                            </button>
                            <button
                              onClick={() => revokeInvitation(contact)}
                              className="inline-flex items-center shadow-sm px-2.5 py-0.5 border border-red-300 text-sm leading-5 font-medium rounded-full text-red-700 bg-white hover:bg-red-50"
                            >
                              Remove
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const RenderParticipants = ({ peers }) => {
  return (
    <div>
      <ul role="list" className="mt-2 divide-y divide-gray-200 px-4">
        {peers.map((peer, i) => (
          <li className="flex items-center justify-between py-3" key={i}>
            <div className="flex items-center">
              <ContactAvatar
                contact={peer.metadata.contact}
                className="h-8 w-8"
              />
              <div className="ml-4 text-sm font-medium text-gray-900 flex items-center space-x-2">
                {peer.metadata.contact.name}
                {peer.metadata.contact && (
                  <TwitterConnected
                    contact={peer.metadata.contact}
                    className="ml-2 h-4 w-4"
                  />
                )}
              </div>
            </div>
            <div className="ml-6 text-sm font-medium text-gray-700">
              {peer.peer._channel.readyState === "open"
                ? "Connected"
                : "Invited"}
              <span className="sr-only"> {peer.metadata.contact.name}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default function DisplayParticipants({
  open,
  setOpen,
  networkId,
  type,
  localStream,
  title,
  subtitle,
}) {
  const [selected, setSelected] = useState([]);
  const [showParty, setShowParty] = useState(false);
  const [, addPeer] = useAtom(addPeerAtom);
  const [activeVideoPeers] = useAtom(activeVideoPeersAtom);
  const [activeLiveDocsPeers] = useAtom(activeLiveDocsPeersAtom);
  const [lightningEnabled] = useAtom(lightningEnabledAtom);
  const [inviteList, setInviteList] = useAtom(meetingInviteListAtom);

  const { data: myDid } = useFetchMyDid();
  const { mutate: sendBasicMessage } = useSendMessage();
  const { data: settings } = useFetchSettings();

  const getPeersByType = (type) => {
    if (type === "video-call-invitation") return activeVideoPeers;
    if (type === "doc-collab-request") return activeLiveDocsPeers;
  };

  // check for inviteList contacts and prepopulate the list, then clear after prepolulated
  useEffect(() => {
    if (inviteList && inviteList?.length > 0) {
      inviteList.forEach((contact) => {
        setSelected((selected) => [...selected, contact]);
      });
      setInviteList([]);
    }
  }, [inviteList, setInviteList]);

  // we can probably check for pending invitations to re-populate invited[] in useEffect
  const sendInvites = () => {
    const id = networkId || currentVideoCallId;
    const peers = getPeersByType(type);
    selected.forEach((contact) => {
      // check for an existing peer connection, if exist then send the invitation over existing connection
      const currentPeer = peers.find(
        (p) => p.metadata.dest === contact.did && p.metadata.networkId === id
      );
      if (currentPeer) {
        // peer shares the same network and contact/dest...do not create a duplicate
        console.log(
          "A duplicate peer already exist on the network...skipping."
        );
        return;
      }

      // just want to grab the metadata of existing peers on network or other invited users, as it contains everything we need
      // for other invite peers will "create" the metadata for the signaling over webrtc to occur
      let existingNetworkPeers = peers.map((p) => p.metadata);

      const data = sendPeerInvitation({
        networkId: id,
        networkOwner: myDid.id,
        sendBasicMessage: sendBasicMessage,
        lightningEnabled,
        src: myDid.id,
        contact: contact,
        type,
        localStream,
        currentPeer,
        existingNetworkPeers,
        settings,
      });
      addPeer(data);
    });
    setSelected([]);
    toast.info("Invitations sent!");
    type === "doc-collab-request" && trigger("save-draft-local-state");
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 overflow-hidden z-10"
        onClose={setOpen}
      >
        <div className="absolute inset-0 overflow-hidden">
          <Transition.Child
            as={Fragment}
            enter="ease-in-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>
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
              <div className="pointer-events-auto relative w-96">
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-500"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-500"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="h-full grid grid-rows-6 grid-cols-1">
                    <div className="bg-primary py-8 px-4 sm:px-6 row-span-1">
                      <div className="flex items-center justify-between">
                        <Dialog.Title className="text-lg font-medium text-white">
                          {" "}
                          {title}{" "}
                        </Dialog.Title>
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            className="rounded-md bg-primary text-indigo-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                            onClick={() => setOpen(false)}
                          >
                            <span className="sr-only">Close panel</span>
                            <XIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>
                      <div className="mt-1">
                        <p className="text-sm text-indigo-300 pb-2">
                          {subtitle}
                        </p>
                        <p className="text-sm text-indigo-300">
                          ID: {networkId}
                        </p>
                      </div>
                    </div>
                    <div className="row-span-5 flex flex-col bg-white">
                      {/* Header */}
                      <div className="grow-0 px-4 py-4 sm:px-6">
                        <div className="flex justify-center items-center space-x-6">
                          <button
                            className={classNames(
                              !showParty
                                ? "bg-indigo-100 text-indigo-700"
                                : "text-gray-500 hover:text-gray-700",
                              "px-3 py-2 font-medium text-sm rounded-md"
                            )}
                            onClick={() => setShowParty(false)}
                          >
                            Invite
                          </button>
                          <button
                            className={classNames(
                              showParty
                                ? "bg-indigo-100 text-indigo-700"
                                : "text-gray-500 hover:text-gray-700",
                              "px-3 py-2 font-medium text-sm rounded-md"
                            )}
                            onClick={() => setShowParty(true)}
                          >
                            Participants
                          </button>
                        </div>
                      </div>
                      <div className="grow h-full max-h-full overflow-y-auto px-4">
                        {showParty ? (
                          <RenderParticipants peers={getPeersByType(type)} />
                        ) : (
                          <SelectParticipants
                            selected={selected}
                            setSelected={setSelected}
                            peers={getPeersByType(type)}
                            networkId={networkId}
                          />
                        )}
                      </div>
                      {selected.length > 0 && (
                        <div className="grow-0 px-4 py-4 sm:px-6">
                          <button
                            type="button"
                            onClick={() => sendInvites()}
                            className="w-full flex-1 rounded-md border border-transparent bg-primary py-3 px-3 text-md font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                          >
                            {selected.length > 1
                              ? `Send Invitations (${selected.length})`
                              : "Send Invitation"}
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </Transition.Child>
              </div>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
