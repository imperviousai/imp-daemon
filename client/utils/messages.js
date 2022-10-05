import { trigger } from "./events";
import { request } from "./axios-utils";
import { toast } from "react-toastify";
import moment from "moment";
import { getShortFormId } from "./id";
import { getContactByDid } from "./contacts";

// Utility functions for message handling

export const fetchMessages = () => {
  return request({
    url: "/v1/message",
    method: "get",
    headers: {
      "Grpc-Metadata-X-API-KEY": `${localStorage.getItem("apiKey")}`,
    },
  });
};

export const sendMessage = (data) => {
  // data structure should be
  // data = {
  //   message - message body
  //   type - didcomm type
  //   did - recipient, who are we sending the message to
  //   amount: how much does it cost if using sats
  //   reply_to_id - usually an empty string
  //   isPayment - boolean flag to indicate messages a (payment w/ message attached)
  // }
  const { msg, did, type, amount, reply_to_id, isPayment } = data;
  return request({
    url: "/v2/message/send",
    method: "post",
    data: {
      body: JSON.stringify({
        content: msg,
        payment: isPayment ? amount : null,
      }),
      type,
      did,
      amount,
      reply_to_id,
    },
    headers: {
      "Grpc-Metadata-X-API-KEY": `${localStorage.getItem("apiKey")}`,
    },
  });
};

export const saveMessage = (data) => {
  const { msg, type, did, from } = data;
  return request({
    url: "/v2/message/save",
    method: "post",
    data: {
      body: JSON.stringify({
        content: msg,
      }),
      type,
      from,
      did,
      reply_to_id: "",
    },
    headers: {
      "Grpc-Metadata-X-API-KEY": `${localStorage.getItem("apiKey")}`,
    },
  });
};

// payloadFromAPI is a quick helper function to parse data, will be used to handle any
// common data re-structuring or formatting of inbound message types
export const payloadFromApi = (payload, channel) => {
  switch (channel) {
    case "didcomm":
      const data = JSON.parse(payload).result.data;
      return JSON.parse(atob(data));
    case "webrtc":
      // incoming peer data seems to show up as a bytes array
      return JSON.parse(String.fromCharCode(...payload));
    default:
      console.log("message channel type is missing or invalid type");
      return null;
  }
};

// toast notification to show that you've just received sats!
export const showPaymentNotification = ({ detail: { msg, knownContact } }) => {
  toast.info(
    `You've just received ${msg.body.payment} sats from ${
      (knownContact && knownContact.name) || "Unknown"
    }!`
  );
};

// handleDidCommMessage is a handler function for incoming messages
export const handleDidCommMessage = ({ data, contacts, pathname }) => {
  const d = JSON.parse(data).result?.data;
  if (d) {
    const msg = JSON.parse(atob(d));
    const fromId = getShortFormId(msg.from);

    // check if the incoming message is from a known contact
    let knownContact = getContactByDid({
      shortFormDid: fromId,
      contacts,
    });

    switch (msg && msg.type) {
      case "https://didcomm.org/basicmessage/2.0/message":
        // handle inbound basic messages
        // likely a better way to do this, for now let's re-poll getMessages to get the existing structure
        // the inbound messages via websocket are structured differently that those from the Messages List API
        if (pathname !== "/d/chat") {
          toast.info(
            `${
              (knownContact && knownContact.name) || "An unknown user"
            } just messaged you.`
          );
        }
        if (msg.body.payment) {
          // payment specifically attached
          trigger("sat-payment-received", { msg, knownContact });
        }
        break;
      case "https://didcomm.org/webrtc/1.0/sdp":
        switch (msg.body.content.signal.type) {
          case "offer":
            console.log("Received a didcomm SDP of type OFFER");
            trigger("sdp-offer", {
              message: msg.body.content,
              knownContact,
              sourceType: "didcomm",
              timestamp: new Date(),
            });
            break;
          case "answer":
            console.log("Received a didcomm SDP of type ANSWER");
            trigger("sdp-answer", {
              message: msg,
              knownContact,
              sourceType: "didcomm",
              timestamp: new Date(),
            });
            break;
        }
        break;
      default:
        console.log("Received unknown message type: ", msg);
        break;
    }
  }
};

export const showMessagesAsRead = (state, messages) => {
  // state - a Jotai atom value
  // messages - messages to be marked as read
  if (state.length > 0) {
    let update = state;
    messages.forEach((msg) => {
      const { id } = msg;
      if (state.indexOf(id) === -1) {
        update = [...update, id];
      }
    });
    return update;
  } else {
    return messages.map((m) => m.id);
  }
};

// UI action to delete a conversation
export const deleteConversation = ({
  groupId,
  deleteGroupMessage,
  callback,
}) => {
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
                if (callback) {
                  callback();
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

// set an expiration time for webrtc invitations (in minutes);
const notificationExpiration = 5;

export const isNotificationExpired = (timestamp) => {
  return moment
    .unix(timestamp)
    .isAfter(moment().subtract(notificationExpiration, "minutes"));
};

// request a relay to a specific node
export const relayRequest = (toDID) => {
  return request({
    url: "/v1/relay/request",
    method: "post",
    data: { toDID, amount: 10 },
    headers: {
      "Grpc-Metadata-X-API-KEY": `${localStorage.getItem("apiKey")}`,
    },
  });
};

// request a relay to send over stored mailbox messages
export const relayMailbox = (toDID) => {
  return request({
    url: "/v1/relay/mailbox",
    method: "post",
    data: { toDID, amount: 10, privateServiceEndpoints: [] },
    headers: {
      "Grpc-Metadata-X-API-KEY": `${localStorage.getItem("apiKey")}`,
    },
  }).catch((err) => console.log(err));
};

// do a comparison of read messages and new messages
export const getUnreadNotifications = ({ readMessages, currentMessages }) => {
  if (currentMessages && currentMessages.length > 0) {
    return currentMessages.filter((message) =>
      readMessages.indexOf(message.id === -1)
    );
  }
};

export const deleteGroupMessages = ({ groupId }) => {
  return request({
    url: `/v1/message_group/${groupId}`,
    method: "delete",
    headers: {
      "Grpc-Metadata-X-API-KEY": `${localStorage.getItem("apiKey")}`,
    },
  });
};

export const getConversationByGroupId = ({ messages, groupId }) =>
  messages.conversations.find((c) => c.groupId === groupId);
