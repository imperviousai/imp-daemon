import { toast } from "react-toastify";
import Peer from "simple-peer";
import { v4 as uuidv4 } from "uuid";
import { trigger } from "./events";

// createPeer creates a peer instances with base event handlers, attaches metadata and returns an object with peer and metadata
export const createPeer = ({
  initiator,
  withStream,
  existingNetworkPeers,
  networkOwner,
  networkId,
}) => {
  const peer = new Peer({
    initiator,
    trickle: false,
    stream: withStream,
    config: {
      iceServers: [
        {
          urls: ["stun:turn.imp-api.net"],
        },
      ],
    },
  });

  peer.on("data", (data) => {
    const msg = JSON.parse(String.fromCharCode(...data));
    // TODO: will need to handle file data, since it will not always be JSON parse-able
    trigger("received-peer-message", { msg, peerId: peer._id });
  });
  peer.on("connect", () => {
    trigger("new-peer-connection", { peerId: peer._id });
    toast("Connection established.");
  });
  peer.on("error", (error) => {
    console.log("Error in peer connection: ", error);
  });
  return peer;
};

// sendPeerInvitation sends peer an invite to connect
// Assumes the peer is initiating a 1:1 peer connection
// TLDR: Alice sends invitation to Bob
// Alice can reuse the same WebRTC connection with Bob to spawn a new peer connection if currentPeer param is provided
export const sendPeerInvitation = ({
  src,
  contact,
  networkId,
  networkOwner,
  sendBasicMessage,
  lightningEnabled,
  type,
  localStream,
  existingNetworkPeers,
}) => {
  // super weird, but sendBasicMessage is a react-query mutation that can only be instantiated within a rendered component
  // going to do a pass through workaround until I find a better solution.
  console.log("Sending invitation!");
  const id = networkId || uuidv4();
  const metadata = {
    networkId: id,
    dest: contact.did,
    contact,
    networkOwner,
    type,
  };

  // check for existing peers on network

  // if peer already exists, just resend the invitation

  const peer = createPeer({
    initiator: true,
    withStream: localStream || false,
    existingNetworkPeers,
    networkOwner,
    networkId,
  });

  peer.on("signal", (signal) => {
    console.log("initiating peer created a signal: ", signal);
    const data = {
      msg: {
        signal,
        networkId,
        networkOwner,
        src,
        type,
      },
      did: contact.did,
      type: "https://didcomm.org/webrtc/1.0/sdp",
      amount: lightningEnabled ? 50 : 0,
      replay_to_id: "",
      isPayment: false,
    };
    console.log("Sending invitation to person: ", data);
    sendBasicMessage(data);
  });

  // return the peer and object to add to the peersAtom
  return { peer, metadata };
};

// acceptPeerInvitation creates a new peer, adds it to the network, sends an answer back and immediately begins signaling the incoming signal
// TLDR: Bob accepts Alice's answer
export const acceptPeerInvitation = ({
  from,
  incomingSignal,
  network,
  sendBasicMessage,
  lightningEnabled,
  knownContact,
  type,
  localStream,
  currentPeer,
  sourceType,
}) => {
  console.log("Attempting to accept invitation and return answer to peer.");
  const metadata = {
    networkId: network.id,
    dest: from,
    contact: knownContact || null,
    networkOwner: network.owner,
    type,
  };

  const peer = createPeer({
    initiator: false,
    withStream: localStream || false,
  });

  peer.signal(incomingSignal);

  peer.on("signal", (signal) => {
    const data = {
      msg: {
        signal,
        networkId: network.id,
        networkOwner: network.owner,
      },
      did: from,
      type: "https://didcomm.org/webrtc/1.0/sdp",
      amount: lightningEnabled ? 50 : 0,
      replay_to_id: "",
      isPayment: false,
    };
    if (sourceType === "didcomm") {
      console.log(
        "Source type is DIDCOMM, responding over that channel now ..."
      );
      sendBasicMessage(data);
      return;
    }
    if (sourceType === "webrtc") {
      console.log(
        "Source type is WEBRTC, responding over that channel now ..."
      );
      if (currentPeer) {
        // send invitation over webrtc
        console.log(
          `Sending Answer to peer over source type: ${sourceType.toUpperCase()}`,
          {
            ...data.msg,
            type,
          }
        );
        currentPeer.peer.write(JSON.stringify({ ...data.msg, type }));
        return;
      } else {
        console.log("Cannot accept invitation, as peer no longer exists.");
      }
    }
  });

  return { peer, metadata };
};

// confirmPeerInvite provides a toast notification allowing the user to accept/decline an invitation
// if the user accepts, the inbound messages is forwarded to the accept-peer-invitation event handler
export const confirmPeerInvite = ({
  detail: { message, knownContact, sourceType },
}) => {
  // TODO: Grab the contact information and view it in the toast notification
  const contact = knownContact ? knownContact.name : "An unknown user";
  const { type } = message;
  const invitationType = () => {
    if (type === "video-call-invitation")
      return "has invited you to a video call.";
    if (type === "doc-collab-request")
      return "has invited you to work on a live document.";
    if (type === "live-messaging-invitation")
      return "has invited you to live messaging.";
  };
  const accept = () => {
    if (type === "video-call-invitation") {
      navigator.mediaDevices
        .getUserMedia({ audio: true, video: true })
        .then((stream) => {
          trigger("accept-peer-invitation", {
            message,
            knownContact,
            stream,
            sourceType,
          });
        })
        .catch((error) => {
          toast.error(
            "Unable to grab audio and video for call. Please try again."
          );
          console.log("unable to grab audio and video. Error: ", error);
        });
    } else {
      trigger("accept-peer-invitation", {
        message,
        knownContact,
        stream: false,
        sourceType,
      });
    }
  };

  toast(
    ({ closeToast }) => (
      <div>
        <p>{`${contact} ${invitationType()}`}</p>
        <div className="flex space-x-4">
          <button
            type="button"
            onClick={() => {
              accept();
              closeToast();
            }}
            className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Accept
          </button>
          <button
            type="button"
            onClick={closeToast}
            className="inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Reject
          </button>
        </div>
      </div>
    ),
    { autoClose: false }
  );
};

const handleWebRTCSignal = (msg, peer) => {
  const { signal } = msg;
  switch (signal.type) {
    case "offer":
      trigger("sdp-offer", {
        message: msg,
        knownContact: peer.metadata.contact,
        sourceType: "webrtc",
      });
      break;
    case "answer":
      trigger("sdp-answer", {
        message: msg,
        knownContact: peer.metadata.contact,
        sourceType: "webrtc",
      });
      break;
  }
};

export const forwardSignal = ({ srcPeer, msg }) => {
  console.log("Forwarding signal now: ", msg);
  console.log("Source peer is: ", srcPeer);
  srcPeer.peer._connected &&
    srcPeer.peer.write(
      JSON.stringify({ ...msg, timestamp: new Date().toString() })
    );
};

export const handleForwardedSignal = ({ msg, srcPeer, stream }) => {
  // received forwarded signal, create peer
  console.log("handleForwardedSignal() msg: ", msg);
  const {
    data: {
      signal,
      metadata: { networkId, networkOwner, type, contact },
    },
    from,
    dest,
  } = msg;
  const metadata = {
    networkId,
    dest: from,
    contact,
    networkOwner,
    type,
  };
  console.log("handleForwardedSignal() metadata: ", metadata);
  console.log(
    "forwarded signal is offer, creating answer is forwarding answer back to src"
  );
  const peer = createPeer({
    initiator: false,
    withStream: stream,
    networkOwner: from,
  });
  // signal the inbound offer
  console.log("signaling the inbound offer");
  peer.signal(signal);
  peer.on("signal", (signal) => {
    // send your signal (answer) back to the src of the offer
    console.log(
      "Forwarding answer back to the original src. Connection expected."
    );
    forwardSignal({
      srcPeer,
      msg: {
        type: "signal-forward",
        from: dest, // flip src and dest to send the message back where it came
        dest: from, // flip src and dest to send the message back where it came
        networkId,
        data: { signal, type },
      },
    });
  });
  return { peer, metadata };
};

export const createPeerFromPeersUpdate = ({
  metadata,
  srcPeer,
  myDid,
  localStream,
}) => {
  const { networkId, dest, networkOwner } = metadata;
  console.log("Creating a peer based on the following metadata: ", metadata);
  // TODO: can we grab the contact and save it automatically based on setting?
  const forwardMsg = {
    type: "signal-forward",
    from: myDid,
    dest,
    networkId,
  };
  console.log("Created a signal-forward message: ", forwardMsg);
  console.log("Network type is: ", metadata.type);
  const peer = createPeer({
    initiator: true,
    withStream: metadata.type === "video-call-invitation" ? localStream : false,
    networkOwner,
  });
  peer.on("signal", (signal) =>
    forwardSignal({
      srcPeer,
      msg: { ...forwardMsg, data: { signal, type: metadata.type } },
    })
  );
  return peer;
};
