import { useQuery, useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import {
  fetchMessages,
  sendMessage,
  relayMailbox,
  deleteGroupMessages,
  saveMessage,
} from "../utils/messages";
import { defaultRelayShortForm } from "../utils/onboard";
import _ from "lodash";

const getNotifications = (messages, myDid) => {
  let notifications = _.chain(messages)
    .filter(
      (m) =>
        m.type === "https://didcomm.org/webrtc/1.0/sdp" &&
        JSON.parse(m.data).body.content.signal?.type !== "answer"
    )
    .map((m) => {
      return { ...m, data: JSON.parse(m.data) };
    })
    .sortBy((m) => m.data.created_time)
    .value();
  return notifications;
};

// convertMessagesIntoConversations sorts messages into conversations where the
// conversationID is the did of the peer you are communicating with
const convertMessagesintoConversations = (messages, myDid) => {
  let conversations = [];
  const sortedMessages = _.chain(messages)
    .filter(
      (m) =>
        m.type !== "https://impervious.ai/didcomm/relay-registration/1.0" &&
        JSON.parse(m.data).body.content.signal?.type !== "answer"
    )
    .sortBy((m) => m.data.created_time)
    .map((m) => {
      return { ...m, data: JSON.parse(m.data) };
    })
    .value();

  let conversationIds = _.uniq(sortedMessages.map((m) => m.groupId));
  conversationIds.forEach((groupId) => {
    conversations.push({
      groupId,
      messages: sortedMessages.filter((m) => m.groupId === groupId),
    });
  });

  return conversations;
};

// useFetchMessages gets all of the messages, sorts them into conversations assuming a 1:1 pair (for now).
// It will be the responsibility of the consuming component to sort between messages types as they choose.
// NOTE: Requires myDid as a parameter to handle the sorting of messages into conversations
export const useFetchMessages = ({ myDid, onSuccess }) => {
  return useQuery("fetch-messages", fetchMessages, {
    onSuccess,
    onError: (error) => {
      toast.error("Unable to fetch messages. Please try again.");
      console.log("Unable to fetch messages. Error: ", error);
    },
    enabled: !!myDid,
    // refetchInterval: 3000,
    select: (data) => {
      // do data transformation to turn messages into conversations
      if (data.data.messages) {
        return {
          conversations: convertMessagesintoConversations(
            data.data.messages,
            myDid
          ),
          notifications: getNotifications(data.data.messages, myDid),
        };
      } else {
        return data.data;
      }
    },
  });
};

// useFetchNotifications gets all of the messages, filters them by didcomm webrtc to display a standalone timeline of invitations
// and then sorts them by timestamp.
// Current not being used, likely be used at a later date
export const useFetchNotifications = (onSuccess, onError) => {
  return useQuery("fetch-notifications", fetchMessages, {
    onSuccess,
    onError,
    select: (data) => {
      // do data transformation to sort out notifications (primarily WebRTC for now)
      const messages = data.data.filter(
        (message) => message.type === "https://didcomm.org/webrtc/1.0/sdp"
      );
      return messages;
    },
  });
};

// upon listening for inbound messages from the websocket, we will need to invalidate the query to force a refetch. Not here obviously,
// using the queryClients. similar to the following

// queryClient.invalidateQueries(['fetch-conversations'])

// Mutations
export const useSendMessage = () => {
  const queryClient = useQueryClient();
  return useMutation(sendMessage, {
    onSuccess: () => {
      queryClient.invalidateQueries("fetch-messages");
    },
    onError: (error) => {
      console.log("Error sending message. Error: ", error);
    },
  });
};

export const useSaveMessage = () => {
  const queryClient = useQueryClient();
  return useMutation(saveMessage, {
    onSuccess: () => {
      queryClient.invalidateQueries("fetch-messages");
    },
    onError: (error) => {
      console.log("Error sending message. Error: ", error);
    },
  });
};

// we need a RelayMailbox that has a short cache time and refetches the daemon to poll the relay server to get new messages
// that have been sitting on the mailbox.
export const useRelayMailbox = () => {
  return useQuery("fetch-mailbox", relayMailbox(defaultRelayShortForm), {
    onSuccess: () => console.log("Mailbox successfuly fetched"),
    onError: (error) => {
      console.log("Unable to fetch mailbox: ", error);
    },
    // refetchInterval: 5000, // need to refetch the mailbox every 1 second
  });
};

// we have a DeleteGroupMessages hook that removes all saved messages tied to a specific group
export const useDeleteGroupMessages = () => {
  const queryClient = useQueryClient();
  return useMutation(deleteGroupMessages, {
    onSuccess: () => {
      queryClient.invalidateQueries("fetch-messages");
      toast.success("Conversation deleted.");
    },
    onError: (error) => {
      console.log("Error deleting group messages. Error: ", error);
      toast.error("Error deleting group messages. Please try again.");
    },
  });
};
