import {
  ChatAltIcon,
  UsersIcon,
  DesktopComputerIcon,
} from "@heroicons/react/solid";
import React, { useEffect, useRef, useState } from "react";
import {
  BsFillMicMuteFill,
  BsFillMicFill,
  BsFillLightningChargeFill,
} from "react-icons/bs";
import { FaVideo, FaVideoSlash } from "react-icons/fa";
import DisplayParticipants from "./DisplayParticipants";
import PaymentsSlideOut from "../../components/lightning/PaymentsSlideOut";
import { useAtom } from "jotai";
import {
  localStreamAtom,
  peerMessagesAtom,
  currentVideoCallAtom,
  hasUnreadVideoMessagesAtom,
} from "../../stores/peers";

const Video = ({ peer }) => {
  const ref = useRef();

  useEffect(() => {
    peer.peer.on("stream", (stream) => {
      if (ref.current) {
        ref.current.srcObject = stream;
      }
    });
  }, [peer.peer]);

  useEffect(() => {
    if (peer.peer._remoteStreams && peer.peer._remoteStreams.length > 0) {
      ref.current.srcObject = peer.peer._remoteStreams[0];
    }
  }, [peer.peer._remoteStreams]);

  return (
    <div className="flex justify-center bg-gray-100 rounded-lg m-2 px-2">
      <video className="h-full" playsInline ref={ref} autoPlay />
    </div>
  );
};

const VideoCall = ({ toggleMessaging, peers, id }) => {
  const [audioOn, setAudioOn] = useState(true);
  const [videoOn, setVideoOn] = useState(true);
  const [screenShareEnabled, setScreenShareEnabled] = useState(false);
  const [openParticipants, setOpenParticipants] = useState(false);
  const [openPayment, setOpenPayment] = useState(false);
  const userVideo = useRef();

  const [localStream, setLocalStream] = useAtom(localStreamAtom);
  const [peerMessages, setPeerMessages] = useAtom(peerMessagesAtom);
  const [currentVideoCallId] = useAtom(currentVideoCallAtom);
  const [hasUnreadVideoMessages] = useAtom(hasUnreadVideoMessagesAtom);

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ audio: true, video: true })
      .then((stream) => {
        if (userVideo.current) userVideo.current.srcObject = stream;
        setLocalStream(stream);
      });
  }, [setLocalStream]);

  useEffect(() => {
    if (peers.length === 0) {
      // reset the audio and video toggles
      localStream?.getVideoTracks().forEach((track) => {
        track.enabled = true;
      });
      setAudioOn(true);
      setVideoOn(true);
    }
  }, [peers, localStream]);

  const destroyCall = () => {
    // Clear ephemeral messages as well
    setPeerMessages(
      peerMessages.filter((message) => message.networkId !== currentVideoCallId)
    );
    peers.forEach((peer) => {
      peer.peer.destroy();
    });
  };

  const toggleMute = () => {
    peers.forEach((p) => {
      if (p.peer.streams.length > 0) {
        p.peer.streams.forEach((stream) => {
          if (stream.getAudioTracks().length > 0) {
            stream.getAudioTracks().forEach((track) => {
              track.enabled = audioOn ? false : true;
              setAudioOn(!audioOn);
            });
          }
        });
      }
    });
  };

  const toggleVideo = () => {
    peers.forEach((p) => {
      if (p.peer.streams.length > 0) {
        p.peer.streams.forEach((stream) => {
          if (stream.getVideoTracks().length > 0) {
            stream.getVideoTracks().forEach((track) => {
              track.enabled = videoOn ? false : true;

              setVideoOn(!videoOn);
            });
          }
        });
      }
    });
  };

  const replaceStream = (stream) => {
    const videoTrack = stream.getVideoTracks()[0];
    peers.forEach((p) => {
      const sender = p.peer._pc
        ?.getSenders()
        .find((s) => s.track.kind === videoTrack.kind);
      sender.replaceTrack(videoTrack);
    });
    setScreenShareEnabled(!screenShareEnabled);
  };

  const toggleScreenshare = () => {
    console.log(localStream.getVideoTracks()[0]);
    if (!screenShareEnabled) {
      navigator.mediaDevices
        .getDisplayMedia({ audio: true, video: true, cursor: true })
        .then((stream) => {
          if (userVideo.current) userVideo.current.srcObject = stream;
          setLocalStream(stream);
          replaceStream(stream);
        });
    } else {
      navigator.mediaDevices
        .getUserMedia({ audio: true, video: true })
        .then((stream) => {
          if (userVideo.current) userVideo.current.srcObject = stream;
          setLocalStream(stream);
          replaceStream(stream);
        });
    }
  };

  const getGridLayout = (count) => {
    if (count < 1) return "";
    if (count === 1) return "grid-cols-2";
    if (count > 1 && count <= 3) return "grid-cols-2 grid-rows-2";
    if (count > 3 && count <= 5) return "grid-cols-3 grid-rows-2";
    if (count > 5 && count <= 7) return "grid-cols-4 grid-rows-2";
  };

  return (
    <div className="bg-gray-50 w-full h-full flex items-center flex-col">
      <div className="h-5/6 w-full pl-12 pr-12 mt-8">
        <div className={`grid w-full h-full ${getGridLayout(peers.length)}`}>
          <div className="flex justify-center bg-gray-100 rounded-lg m-2 px-2">
            <video
              className="h-full"
              playsInline
              muted
              ref={userVideo}
              autoPlay
            />
          </div>
          {peers.map((peer, i) => (
            <Video key={i} peer={peer} />
          ))}
        </div>
      </div>
      <div className="absolute bottom-0 w-11/12 mb-4 px-6">
        <div className="px-10 h-16 bg-black bg-opacity-40 inset-x-0 bottom-0 flex justify-between items-center rounded-lg">
          <div className="flex space-x-4">
            {peers.length > 0 && (
              <>
                <button
                  type="button"
                  onClick={() => toggleMute()}
                  className="flex flex-col items-center px-2 py-2 text-sm leading-4 font-medium rounded-md text-gray-50 bg-opacity-100 hover:bg-opacity-20 hover:bg-gray-100"
                >
                  {audioOn ? (
                    <BsFillMicFill
                      className="mb-2 h-6 w-6"
                      aria-hidden="true"
                    />
                  ) : (
                    <BsFillMicMuteFill
                      className="mb-2 h-6 w-6"
                      aria-hidden="true"
                    />
                  )}
                  {audioOn ? "Mute" : "Unmute"}
                </button>
                <button
                  type="button"
                  onClick={() => toggleVideo()}
                  className="flex flex-col items-center px-2 py-2 text-sm leading-4 font-medium rounded-md text-gray-50 bg-opacity-100 hover:bg-opacity-20 hover:bg-gray-100"
                >
                  {videoOn ? (
                    <FaVideo className="mb-2 h-6 w-6" aria-hidden="true" />
                  ) : (
                    <FaVideoSlash className="mb-2 h-6 w-6" aria-hidden="true" />
                  )}
                  {videoOn ? "Stop Video" : "Start Video"}
                </button>
              </>
            )}
          </div>
          <div className="flex space-x-4">
            <button
              onClick={() => setOpenParticipants(true)}
              type="button"
              className="flex flex-col items-center px-2 py-2 text-sm leading-4 font-medium rounded-md text-gray-50 bg-opacity-100 hover:bg-opacity-20 hover:bg-gray-100"
            >
              <UsersIcon className="mb-2 h-6 w-6" aria-hidden="true" />
              {peers.length ? `Participants (${peers.length})` : "Participants"}
            </button>

            <div className="flex items-center px-6 py-2 ">
              {hasUnreadVideoMessages && (
                <div
                  className="bg-red-500 flex-shrink-0 w-3 h-3 rounded-full"
                  aria-hidden="true"
                />
              )}
              <button
                onClick={() => toggleMessaging()}
                type="button"
                className="flex flex-col items-center px-2 text-sm leading-4 font-medium rounded-md text-gray-50 bg-opacity-100 hover:bg-opacity-20 hover:bg-gray-100"
              >
                <ChatAltIcon className="mb-2 h-6 w-6" aria-hidden="true" />
                Chat
              </button>
            </div>

            <div className="flex items-center px-6 py-2 ">
              <button
                onClick={() => toggleScreenshare()}
                type="button"
                className="flex flex-col items-center px-2 text-sm leading-4 font-medium rounded-md text-green-400 bg-opacity-100 hover:bg-opacity-20 hover:bg-gray-100"
              >
                <DesktopComputerIcon
                  className="mb-2 h-6 w-6"
                  aria-hidden="true"
                />
                {screenShareEnabled ? "Stop Screen Share" : "Share Screen"}
              </button>
            </div>

            <button
              type="button"
              onClick={() => setOpenPayment(true)}
              className="flex flex-col items-center px-4 py-2 text-sm leading-4 font-medium rounded-md text-gray-50 bg-opacity-100 hover:bg-opacity-20 hover:bg-gray-100"
            >
              <BsFillLightningChargeFill
                className="mb-2 h-6 w-6 text-yellow-400"
                aria-hidden="true"
              />
              Send/Receive
            </button>
          </div>
          <div className="flex space-x-4">
            <button
              type="button"
              onClick={() => destroyCall()}
              className="inline-flex items-center px-8 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-200"
            >
              End
            </button>
          </div>
          <PaymentsSlideOut
            open={openPayment}
            setOpen={setOpenPayment}
            selectedContact={null}
          />
          <DisplayParticipants
            open={openParticipants}
            setOpen={setOpenParticipants}
            networkId={id}
            localStream={localStream}
            title="Invite Users to Meeting"
            subtitle={`Invite people to join this meeting.`}
            type="video-call-invitation"
          />
        </div>
      </div>
    </div>
  );
};

export default VideoCall;
