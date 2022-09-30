import { Fragment, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";
import ConversationHeader from "./ConversationHeader";
import ConversationBody from "./ConversationBody";
import ConversationFooter from "./ConversationFooter";
import { useAtom } from "jotai";
import { useFetchMyDid } from "../../hooks/id";
import {
  addPeerMessageAtom,
  activeVideoMessagesAtom,
  hasUnreadVideoMessagesAtom,
} from "../../stores/peers";
import { encode } from "base64-arraybuffer";

// Messaging Component
export default function Messaging({
  peers,
  openMessaging,
  toggleMessaging,
  id,
}) {
  const { data: myDid } = useFetchMyDid();
  const [messages] = useAtom(activeVideoMessagesAtom);
  const [, addPeerMessage] = useAtom(addPeerMessageAtom);
  const [, setHasUnreadVideoMessages] = useAtom(hasUnreadVideoMessagesAtom);

  const sendPeerMessage = (data, type) => {
    if (type === "file-transfer-chunk") {
      const payload = `${data.id}:${encode(data.data)}`;
      // console.log("FILE: ", data.id);
      // console.log("Sending payload: ", payload);
      peers.map((p) => {
        p.peer.write(payload);
      });
      return;
    }

    const message = {
      data,
      timestamp: new Date().toString(),
      from: myDid.id,
      networkId: id,
      type,
    };

    if (type === "chat-message" || type === "file-transfer-done") {
      addPeerMessage(message);
    }

    peers.map((p) => {
      p.peer.write(JSON.stringify(message));
    });
  };

  return (
    <Transition.Root show={openMessaging} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 overflow-hidden z-10"
        onClose={toggleMessaging}
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
            <Dialog.Overlay className="absolute inset-0 bg-gray-500 bg-opacity-10 transition-opacity" />
          </Transition.Child>
          <div className="fixed inset-y-0 right-0 pl-10 max-w-full flex">
            <Transition.Child
              as={Fragment}
              enter="transform transition ease-in-out duration-500 sm:duration-700"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transform transition ease-in-out duration-500 sm:duration-700"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <div className="relative w-96 max-w-full">
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-500"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-500"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute top-0 left-0 -ml-8 pt-4 pr-2 flex sm:-ml-10 sm:pr-4">
                    <button
                      type="button"
                      className="rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                      onClick={() => toggleMessaging()}
                    >
                      <span className="sr-only">Close panel</span>
                      <XIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                </Transition.Child>
                <div className="h-full flex flex-col bg-white shadow-xl overflow-y-scroll">
                  {/* Header */}
                  <div className="grow-0 px-4 py-6 bg-gray-50 sm:px-6">
                    <ConversationHeader />
                  </div>
                  <div className="grow h-full px-4 overflow-hidden">
                    <ConversationBody
                      messages={messages}
                      myDid={myDid?.id}
                      setHasUnreadVideoMessages={setHasUnreadVideoMessages}
                    />
                  </div>

                  {/* Action buttons */}
                  <div className="grow-0 px-4 border-t border-gray-200 py-4 sm:px-6">
                    <ConversationFooter
                      peers={peers}
                      sendPeerMessage={sendPeerMessage}
                    />
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
