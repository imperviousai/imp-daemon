import React, { useCallback, useEffect, useRef, useState } from "react";
import { IP, PORT } from "../utils/axios-utils";
import {
  handleDidCommMessage,
  showPaymentNotification,
} from "../utils/messages";
import { on, off, trigger } from "../utils/events";
import { useQueryClient } from "react-query";
import { useWorker } from "react-hooks-worker";
import {
  confirmPeerInvite,
  acceptPeerInvitation,
  createPeerFromPeersUpdate,
  forwardSignal,
  handleForwardedSignal,
  peers,
} from "../utils/peers";
import {
  useSendMessage,
  useSaveMessage,
  useFetchMessages,
} from "../hooks/messages";
import { useAtom } from "jotai";
import {
  peersAtom,
  addPeerAtom,
  addPeerMessageAtom,
  currentVideoCallAtom,
  currentLiveDocsAtom,
  localStreamAtom,
  peerFilesAtom,
  draftStore,
} from "../stores/peers";
import {
  currentConversationAtom,
  lightningEnabledAtom,
} from "../stores/messages";
import { useFetchContacts } from "../hooks/contacts.js";
import { useFetchMyDid } from "../hooks/id";
import { useRouter } from "next/router";
import { defaultRelayShortForm } from "../utils/onboard";
import { updateDocTitle } from "../utils/content";
import { decode } from "base64-arraybuffer";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "../components/ErrorFallback";
import { toast } from "react-toastify";
import { saveAs } from "file-saver";

// subscribe to a certain events for push notifications
const createMailboxWorker = () =>
  new Worker(new URL("../workers/mailbox.worker.js", import.meta.url));

const SubscribeProvider = ({ children }) => {
  const socketRef = useRef();
  const queryClient = useQueryClient();
  const filesWorker = useRef();

  const [peers] = useAtom(peersAtom);
  const [, addPeer] = useAtom(addPeerAtom);
  const [, addPeerMessage] = useAtom(addPeerMessageAtom);
  const [currentVideoCallId, setCurrentVideoCallId] =
    useAtom(currentVideoCallAtom);
  const [, setCurrentLiveDocId] = useAtom(currentLiveDocsAtom);
  const [localStream, setLocalStream] = useAtom(localStreamAtom);
  const [, setCurrentConversation] = useAtom(currentConversationAtom);
  const [lightningEnabled] = useAtom(lightningEnabledAtom);
  const [peerFiles, setPeerFiles] = useAtom(peerFilesAtom);

  const { mutate: sendBasicMessage } = useSendMessage();
  const { mutate: saveBasicMessage } = useSaveMessage();
  const { data: contactsRes } = useFetchContacts();
  const { data: myDid } = useFetchMyDid();
  const { data: messages } = useFetchMessages({
    myDid: myDid,
    contacts: contactsRes?.data.contacts,
  });

  const router = useRouter();
  // adding router to useCallback triggers infinite loop, using ref instead
  const routerRef = useRef(router);

  const relayInput = `${defaultRelayShortForm}%${localStorage.getItem(
    "apiKey"
  )}`;

  // relay mailbox worker
  const { result: mailboxWorkerResult, error: mailboxWorkerError } = useWorker(
    createMailboxWorker,
    relayInput
  );

  // handle unforeseen errors and clean up peers
  const handleErrors = () => {
    console.log(
      "Uncaught error located in SubscribeProvider Error Boundary. Resetting State."
    );
    // destroy all peers so none are lingering
    peers.forEach((peer) => peer.peer.destroy());
  };

  const addFileChunk = useCallback(
    (data) => {
      const payload = String.fromCharCode(...data).split(":");
      filesWorker.current.postMessage({
        id: payload[0],
        chunk: decode(payload[1]),
      });
      // if (type.split("/")[0] === "image") {
      //   // handle images chunk differently
      //   setPeerFiles((prev) => {
      //     if (prev.find((f) => f?.id === id)) {
      //       return prev.map((f) => {
      //         if (f?.id === id) {
      //           f.chunks.push(chunk);
      //           return f;
      //         }
      //       });
      //     } else {
      //       prev.push({ type, id, name, chunks: [chunk] });
      //       return prev;
      //     }
      //   });
      // } else {
      //   filesWorker.current.postMessage({ name, type, id, chunk });
      // }
    },
    [setPeerFiles]
  );

  // acceptInvite is a handler function to create and send peer responses (SDP offers) back to accepted invitations
  const acceptInvite = useCallback(
    ({ detail: { message, knownContact, stream, sourceType } }) => {
      const {
        networkId,
        networkOwner,
        signal,
        src,
        type,
        currentConversation,
      } = message;
      const currentPeer = peers.find(
        (peer) =>
          peer.metadata.dest === knownContact.did &&
          peer.metadata.networkId === networkId
      );

      const getGroupIdFromContact = (contact) => {
        // TODO: get rid of this function to support group messages
        if (messages) {
          let message = messages?.conversations.find((convo) =>
            convo.messages.find((m) => m.recipients?.includes(contact.did))
          );
          if (message) {
            return message.groupId;
          }
        }
      };

      // there cannot be a duplicate peer on the same network, prevents duplicate webrtc answers clashing
      if (currentPeer && sourceType !== "webrtc") {
        console.log("Found a duplicate peer on the same network!");
        return;
      }

      console.log("Accepting peer invitation!!! ", message);
      if (stream) {
        setLocalStream(stream);
      }

      console.log("Peers: ", peers);
      const data = acceptPeerInvitation({
        from: src,
        incomingSignal: signal,
        network: { id: networkId, owner: networkOwner },
        sendBasicMessage: sendBasicMessage,
        lightningEnabled,
        knownContact,
        type,
        localStream: stream,
        currentPeer,
        sourceType,
      });
      addPeer(data);
      if (type === "video-call-invitation") {
        setCurrentVideoCallId(networkId);
        routerRef.current.push("/d/meeting");
      }
      if (type === "doc-collab-request") {
        setCurrentLiveDocId(networkId);
        routerRef.current.push(`/d/content/${networkId}`);
      }
      if (type === "live-messaging-invitation") {
        // setcurrent converssation

        setCurrentConversation(getGroupIdFromContact(knownContact));
        if (router.pathname !== "/d/chat") {
          routerRef.current.push("/d/chat");
        }
      }
    },
    [
      addPeer,
      lightningEnabled,
      peers,
      sendBasicMessage,
      setCurrentConversation,
      setCurrentLiveDocId,
      setLocalStream,
      setCurrentVideoCallId,
      messages,
      router.pathname,
    ]
  );

  const relaySignal = useCallback(
    ({ msg, peerId }) => {
      // check if msg is destined for myDid, otherwise pass it on
      const { from, dest, data } = msg;
      const srcPeer = peers.find((p) => p.peer._id === peerId);
      console.log("Captured Signal from srcPeer: ", srcPeer);
      if (dest === myDid?.id) {
        //looks like it was destined for me, handle the signal accordingly
        console.log(
          "Forwarded Signal was destined for us. Consuming now: ",
          msg
        );

        if (data.signal.type === "offer") {
          // if message is offer, create peer & send forward signal back through the srcPeer
          console.log("Consumed signal type is offer.");
          const { peer, metadata } = handleForwardedSignal({
            msg,
            srcPeer,
            stream: data.type === "video-call-invitation" ? localStream : false,
          });
          addPeer({ peer, metadata });
          return;
        }
        if (data.signal.type === "answer") {
          // if message is answer, find existing peer and signal the answer to start the connection
          console.log(
            "Checking for existing/matching peer to signal the inbound answer. Connection expected."
          );
          const existingPeer = peers.find(
            (peer) => peer.metadata.dest === from && !peer.peer._connected
          );
          if (existingPeer) {
            console.log(
              "Found an existing peer. Signaling the inbound answer. Connection Expected."
            );
            existingPeer.peer.signal(data.signal);
            return;
          }
        }
      } else {
        // pass it on to it's destination
        const destPeer = peers.find((p) => p.metadata.dest === dest);
        if (destPeer) {
          console.log("Found a peer that matches the forward destination.");
          console.log("Forwarding Signal to destPeer: ", destPeer);
          // attach the contact information along with the forward
          // should change since can't we probably can't trust the forwards contact metadata. A can modify C's identity in flight?
          msg.data = { ...data, metadata: srcPeer.metadata };
          forwardSignal({ srcPeer: destPeer, msg });
        } else {
          console.log(
            "Unable to find a peer that matches the forward destination."
          );
        }
      }
    },
    [myDid?.id, peers, localStream, addPeer]
  );

  const handlePeersUpdateMessage = useCallback(
    ({ msg, peerId }) => {
      // need to grab the srcPeer from here
      const srcPeer = peers.find((p) => p.peer._id === peerId);

      // only process peers we do not already have a connection with
      // TODO: here we will check if the metadata.contact.did is on the blocked list
      msg.data.forEach((metadata) => {
        const existingPeer = peers.find(
          (p) => p.metadata.dest === metadata.dest
        );
        // ignore if peer already exists
        if (existingPeer) return;
        const peer = createPeerFromPeersUpdate({
          metadata,
          srcPeer,
          myDid: myDid?.id,
          localStream,
        });
        addPeer({ peer, metadata });
      });
    },
    [addPeer, myDid?.id, localStream, peers]
  );

  const handleQuillTitleUpdate = (msg) => {
    const { title, id } = msg.data;
    updateDocTitle(title, id);
    //  in case live docs component is mounted, allow it to listen for updates
    trigger("quill-delta-title-update", { title, docId: id });
  };

  const handleLiveMessage = useCallback(
    ({ from, did, msg, networkId, type }) => {
      let knownContact =
        contactsRes?.data.contacts.find((contact) => contact.did === from) ||
        null;
      if (router.pathname !== "/d/chat") {
        toast.info(
          `${knownContact?.name || "An unknown user"} just messaged you.`
        );
      }
      saveBasicMessage({ msg, type, did, from });
    },
    [saveBasicMessage, contactsRes, router.pathname]
  );

  const handleFileTransfer = useCallback(
    (msg) => {
      console.log("A file transfer has been completed: ", msg);
      toast.success("A file has been sent to you.");
      if (msg.networkId === currentVideoCallId) {
        // only save messages in ephemeral chat if the ids match
        addPeerMessage(msg);
      } else {
        // we want to save the message as a receipt in the daemon for chat persistence
        const { data, type, did, from } = msg;
        if (data.type.split("/")[0] === "image") {
          // turn images to dataUrl and save them into db
          handleFileDownload({
            detail: {
              id: data.id,
              name: data.name,
              type: data.type,
              msgType: type,
              did,
              from,
            },
          });
        } else {
          saveBasicMessage({ msg: data, type, did, from });
        }
      }
    },
    [addPeerMessage, currentVideoCallId, saveBasicMessage, peerFiles]
  );

  const handleFileDownload = useCallback(
    ({ detail: { id, name, type, msgType, did, from } }) => {
      filesWorker.current.postMessage({
        action: "download",
        id,
        name,
        type,
        msgType,
        did,
        from,
      });
    },
    []
  );

  const handleReceivedPeerMessage = useCallback(
    ({ detail: { msg, peerId } }) => {
      switch (msg.type) {
        case "chat-message":
          addPeerMessage(msg);
          break;
        case "quill-delta-update":
          trigger("quill-delta-update", msg);
          // console.log("Received quill update", msg);
          break;
        case "quill-delta-title-update":
          handleQuillTitleUpdate(msg);
          break;
        case "file-transfer-done":
          // console.log("received file transfer complete", msg);
          handleFileTransfer(msg);
          break;
        case "file-transfer-chunk":
          // console.log("received a file chunk: ", msg);
          addFileChunk(msg.data);
          break;
        case "live-message":
          handleLiveMessage(msg);
          break;
        case "peers-update":
          console.log("Received a peers-update message: ", msg);
          handlePeersUpdateMessage({ msg, peerId });
          break;
        case "signal-forward":
          console.log("Received a signal-forward message: ", msg);
          relaySignal({ msg, peerId });
          break;
      }
    },
    [
      addPeerMessage,
      addFileChunk,
      handleLiveMessage,
      handlePeersUpdateMessage,
      relaySignal,
      handleFileTransfer,
    ]
  );

  const handleNewPeerConnection = useCallback(
    ({ detail: { peerId } }) => {
      const peer = peers.find((p) => p.peer._id === peerId);
      // look for duplicate peers waiting for a connection during mesh signal exchange
      const duplicatePeer = peers.find(
        (p) => p.metadata.dest === peer.metadata.dest && !p.peer._connected
      );
      if (duplicatePeer) {
        console.log("destroying duplicate peer on network that was waiting");
        duplicatePeer.peer.destroy();
      }
      // find existing network peers, and send them to the user
      const existingNetworkPeers = peers
        .filter(
          (p) =>
            p.metadata.networkId === peer.metadata.networkId &&
            p.metadata.dest !== peer.metadata.dest
        )
        .map((p) => p.metadata);

      if (existingNetworkPeers.length) {
        console.log("Found existing network peers:", existingNetworkPeers);
        const msg = {
          type: "peers-update",
          from: peer.metadata.networkOwner,
          data: existingNetworkPeers,
          timestamp: new Date().toString(),
        };
        peer.peer.write(JSON.stringify(msg));
      }
    },
    [peers]
  );

  // setup the file transfer web worker
  useEffect(() => {
    filesWorker.current = new Worker(
      new URL("../workers/files.worker.js", import.meta.url)
    );
    filesWorker.current.onmessage = ({
      data: { id, file, msgType, did, from },
    }) => {
      // console.log("MESSAGE TYPE: ", msgType);
      // console.log("GOT AN EVENT FROM A WEB WORKER", file);
      if (file.type.split("/")[0] === "image") {
        if (router.pathname === "/d/meeting") {
          saveAs(file, file.name);
          return;
        }
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
          saveBasicMessage({
            msg: {
              name: file.name,
              type: file.type,
              size: file.size,
              id,
              image: reader.result,
            },
            type: msgType,
            did,
            from,
          });
        };
      } else {
        saveAs(file, file.name);
      }
    };
    return () => {
      filesWorker.current.terminate();
    };
  }, []);

  useEffect(() => {
    // subscribe to the impervious daemon to listen for events/messages
    socketRef.current = new WebSocket(`ws://${IP}:${PORT}/v1/subscribe `);
    socketRef.current.onopen = (e) => {
      console.log("Connection established to impervious daemon websocket.");
    };
    socketRef.current.onerror = (e) => {
      console.log(
        `Error occured when connection to impervious daemon websocket: ${e.message}`
      );
    };

    return () => {
      socketRef.current.close();
    };
  }, []);

  useEffect(() => {
    if (!socketRef.current) return;
    socketRef.current.onmessage = (e) => {
      const data = {
        data: e.data,
        contacts: contactsRes?.data.contacts,
        pathname: router.pathname,
      };
      handleDidCommMessage(data);
      queryClient.invalidateQueries("fetch-messages");
    };
  }, [queryClient, contactsRes?.data.contacts, router.pathname]);

  useEffect(() => {
    on("received-peer-message", handleReceivedPeerMessage);
    return () => {
      off("received-peer-message", handleReceivedPeerMessage);
    };
  }, [handleReceivedPeerMessage]);

  useEffect(() => {
    on("sdp-offer", confirmPeerInvite);

    return () => {
      off("sdp-offer", confirmPeerInvite);
    };
  }, []);

  useEffect(() => {
    on("accept-peer-invitation", acceptInvite);
    return () => {
      off("accept-peer-invitation", acceptInvite);
    };
  }, [acceptInvite]);

  useEffect(() => {
    on("sat-payment-received", showPaymentNotification);

    return () => {
      off("sat-payment-received", showPaymentNotification);
    };
  }, []);

  useEffect(() => {
    on("new-peer-connection", handleNewPeerConnection);

    return () => {
      off("new-peer-connection", handleNewPeerConnection);
    };
  }, [handleNewPeerConnection]);

  useEffect(() => {
    on("file-download-request", handleFileDownload);

    return () => {
      off("file-download-request", handleFileDownload);
    };
  }, [handleFileDownload]);

  return (
    <div>
      <ErrorBoundary
        FallbackComponent={ErrorFallback}
        onReset={() => handleErrors()}
        onError={() => handleErrors()}
      >
        {children}
      </ErrorBoundary>
    </div>
  );
};

export default SubscribeProvider;
