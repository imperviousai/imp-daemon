import React, { useEffect, useCallback, useRef } from "react";
import { useAtom } from "jotai";
import { peersAtom, peerNetworksAtom, removePeerAtom } from "../stores/peers";
import { on, off } from "../utils/events";
import { useRouter } from "next/router";
import { getShortFormId } from "../utils/id";

const Peer = ({ peer, router }) => {
  const [, removePeer] = useAtom(removePeerAtom);
  const videoRef = useRef();

  // need to useRef because peers in signalIncomingAnswer useCallback calls infinite loop
  const peerRef = useRef(peer);

  useEffect(() => {
    peer.peer.on("stream", (stream) => {
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    });
  }, [peer.peer]);

  useEffect(() => {
    // for background audio when a user leaves the video call
    if (peer.peer._remoteStreams && peer.peer._remoteStreams.length > 0) {
      if (videoRef.current) {
        videoRef.current.srcObject = peer.peer._remoteStreams[0];
      }
    }
  });

  const signalIncomingAnswer = useCallback(
    ({ detail: { message, knownContact, sourceType } }) => {
      if (!peerRef.current) return;
      if (sourceType === "webrtc") {
        console.log(peerRef.current.metadata);
        if (
          peerRef.current.metadata.dest === knownContact.did &&
          peerRef.current.metadata.networkId === message.networkId &&
          !peerRef.current.peer._connected
        ) {
          peerRef.current.peer.signal(message.signal);
          return;
        }
      }

      if (sourceType === "didcomm") {
        if (
          peerRef.current.metadata.dest === getShortFormId(message.from) &&
          peerRef.current.metadata.networkId ===
            message.body.content.networkId &&
          !peerRef.current.peer._connected
        ) {
          peerRef.current.peer.signal(message.body.content.signal);
        }
      }
    },
    []
  );

  useEffect(() => {
    on("sdp-answer", signalIncomingAnswer);

    return () => {
      off("sdp-answer", signalIncomingAnswer);
    };
  }, [signalIncomingAnswer]);

  useEffect(() => {
    peer.peer.on("close", () => {
      // remove the peer from state
      removePeer(peer);
      peerRef.current = null;
    });
  }, [peer, removePeer]);

  //   need to listen for background audio during video calls and the user switches pages
  return (
    <div>
      {/* <p>{peer.metadata.contact.name}</p> */}
      {peer.peer._remoteStreams.length > 0 && router.pathname !== "/d/meeting" && (
        <div className="relative">
          <video
            className="h-36"
            playsInline
            ref={videoRef}
            autoPlay
            muted={router.pathname === "/d/meeting"}
          />
          <div className="bg-gray-900 opacity-75 text-white rounded-md text-sm absolute bottom-0 right-0 px-4 m-2">
            {peer.metadata.contact.name}
          </div>
        </div>
      )}
    </div>
  );
};

const Peers = () => {
  const [peers] = useAtom(peersAtom);
  const router = useRouter();

  return (
    <div className="bg-blue-100">
      <div className="absolute bottom-0 right-0 py-8 px-8 flex">
        {peers.map((peer, i) => (
          <Peer key={i} peer={peer} router={router} />
        ))}
      </div>
    </div>
  );
};

export default Peers;
