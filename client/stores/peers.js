import { atom } from "jotai";
import localforage from "localforage";
import { currentConversationAtom } from "./messages";

// primitive atom to represent the user's local stream if available
export const localStreamAtom = atom();

// primitive atom to hold a list of simple-peer instances
export const peersAtom = atom([]);

// primitive atom to hold a list of peer networks (for network isolation) (each network will be an object)
// network = id, owner, list of dids currently within that network
export const peerNetworksAtom = atom([]);

// Only one video call can be viewable at a time, so we need a primitive atom to show the current network to stream video from
export const currentVideoCallAtom = atom();

// Only one live document can be viewable at a time, so we need a primitive atom to show the current live doc network to read/write quill updates to
export const currentLiveDocsAtom = atom();

// The way to show the peers within the active network, is to create derived atoms that filter the peers who's destination did is in the network's did list

// derived atom that filters the peersAtom only showing the peers that match the currentVideoCallAtom
export const activeVideoPeersAtom = atom((get) =>
  get(peersAtom).filter(
    (peer) => peer.metadata.networkId === get(currentVideoCallAtom)
  )
);

// derived atom that filters the peersAtom only showing the peers that match the currentLiveDocsAtom
export const activeLiveDocsPeersAtom = atom((get) =>
  get(peersAtom).filter(
    (peer) => peer.metadata.networkId === get(currentLiveDocsAtom)
  )
);

// write-only atom to add a single peer to the list of peers, it will add a peer to a network and create the network if not exist
export const addPeerAtom = atom(null, (get, set, peer) => {
  // add peer to list of peers
  set(peersAtom, (prev) => [...prev, peer]);
  // add a peer network if not already present, usually occurs for initial 1:1 peer connections over a new network
  set(peerNetworksAtom, (prev) => {
    if (!prev.some((network) => network.id === peer.metadata.networkId)) {
      // network doesn't exists, create one
      return [
        ...prev,
        {
          id: peer.metadata.networkId,
          owner: peer.metadata.networkOwner,
          dids: [peer.metadata.dest],
        },
      ];
    } else {
      // network does exist
      const networkIndex = prev.findIndex(
        (network) => network.id === peer.metadata.networkId
      );
      prev[networkIndex].dids.push(peer.metadata.dest);
      return prev;
    }
  });
});

// write-only atom to remove a single peer from the existing peer list and associated network.
// If this is the last peer in a network we destroy the entire network
export const removePeerAtom = atom(null, (get, set, peer) => {
  set(peersAtom, (prev) => {
    // check to see if this peer is the last remaining peer in a network, is yes then delete the network
    const currentPeerCount = prev.filter(
      (p) => p.metadata.networkId === peer.metadata.networkId
    ).length;
    if (currentPeerCount === 1) {
      //   peer is the last remaining peer in a network
      set(peerNetworksAtom, (prev) =>
        prev.filter((network) => network.id !== peer.metadata.networkId)
      );
    }
    if (currentPeerCount > 1) {
      // there are other peers in the network, remove the peer's did from the did's list
      set(peerNetworksAtom, (prev) => {
        const networkIndex = prev.findIndex(
          (network) => network.id !== peer.metadata.networkId
        );
        if (peer[networkIndex]) {
          prev[networkIndex].dids = prev[networkIndex].dids.filter(
            (d) => d !== peer.metadata.dest
          );
        }
        return prev;
      });
    }
    return prev.filter((p) => p.peer._id !== peer.peer._id);
  });
});

// write-only atom to destroy both a network and associated peers from primitive atoms
// use case: destroy entire network and those associated with it
export const removeNetworkAtom = atom(null, (get, set, id) => {
  // each simple peer instance MUST have an associated network id
  set(peerNetworksAtom, (prev) => prev.filter((network) => network.id !== id));
  set(peersAtom, (prev) => prev.filter((peer) => peer._id !== id));
});

// primitive atom to hold ephemeral messages sent via webrtc
export const peerMessagesAtom = atom([]);

// primitive atom to flag if a user has unread messages
export const hasUnreadVideoMessagesAtom = atom(false);

// read-write atom to add a messages to the list of ephemeral/peer messages
export const addPeerMessageAtom = atom(null, (get, set, message) => {
  set(peerMessagesAtom, (prev) => [...prev, message]);
  if (message.networkId === get(currentVideoCallAtom)) {
    set(hasUnreadVideoMessagesAtom, true);
  }
});

// derived atom to parse the peer messages based on the current video call id
export const activeVideoMessagesAtom = atom((get) =>
  get(peerMessagesAtom).filter(
    (message) => message.networkId === get(currentVideoCallAtom)
  )
);

// derived atom to grab the peer connection that matches the currentConversationAtom, if either exists
export const currentConversationPeerAtom = atom((get) => {
  if (get(currentConversationAtom) && get(peersAtom).length > 0) {
    const peer = get(peersAtom).find(
      (p) => p.metadata.contact.did === get(currentConversationAtom).did
    );
    if (peer) {
      return peer;
    }
  }
});

// atom to store files that have been sent to them through webrtc, primarily handles images only
export const peerFilesAtom = atom([]);

// draftStore is a localForage instance for holding drafts. A jotai implementation would
// require several atoms created for each draft? I prefer to instance.set(title, draftUpdate) flow
export const draftStore = localforage.createInstance({
  name: "documentDrafts",
});

// documentLocalStates is a localForage instance for hosting quill delta states for drafts prior to connecting
// with a user over live docs. Often the user may connect a party, get their changes overwritten unwillingly and wish
// to revert back to the state of the document prior to the connection
export const draftLocalStateStore = localforage.createInstance({
  name: "documentLocalStates",
});
