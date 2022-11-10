import {
  ChatAltIcon,
  UsersIcon,
  DesktopComputerIcon,
} from "@heroicons/react/solid";
import React, { useCallback, useEffect, useRef, useState } from "react";
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
import { XCircleIcon } from "@heroicons/react/outline";
import { toast } from "react-toastify";
import { useFetchLightningConfig } from "../../hooks/config";
import { meetingInviteListAtom } from "../../stores/messages";

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
      <div className="relative">
        <video className="h-full" playsInline ref={ref} autoPlay />
        <div className="bg-gray-900 opacity-75 text-white rounded-md text-sm absolute bottom-0 left-0 px-4 m-2">
          {peer.metadata.contact.name}
        </div>
      </div>
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
  const [inviteList] = useAtom(meetingInviteListAtom);

  const { data: lightningConfig } = useFetchLightningConfig();

  useEffect(() => {
    // check for invite list
    if (inviteList && inviteList?.length > 0) {
      console.log(inviteList);
      setOpenParticipants(true);
    }
  }, [inviteList]);

  useEffect(() => {
    connectAudioandVideo();
  }, [connectAudioandVideo]);

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

  const connectAudioandVideo = useCallback(
    () =>
      new Promise((resolve, reject) => {
        navigator.mediaDevices
          .getUserMedia({ audio: true, video: true })
          .then((stream) => {
            if (userVideo.current) userVideo.current.srcObject = stream;
            setLocalStream(stream);
            resolve(stream);
          })
          .catch((err) => {
            console.log("Unable to capture video stream: ", err);
            toast.error("Unable to turn on audio and video. Please try again.");
            reject(err);
          });
      }),
    [setLocalStream]
  );

  const disconnectAudioandVideo = () => {
    localStream?.getTracks().forEach((track) => {
      track.stop();
    });
    setLocalStream();
    userVideo.current.srcObject = undefined;
  };

  const destroyCall = () => {
    disconnectAudioandVideo();
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
            });
          }
        });
      }
    });
    setAudioOn(!audioOn);
  };

  const toggleVideo = () => {
    peers.forEach((p) => {
      if (p.peer.streams.length > 0) {
        p.peer.streams.forEach((stream) => {
          if (stream.getVideoTracks().length > 0) {
            stream.getVideoTracks().forEach((track) => {
              track.enabled = videoOn ? false : true;
            });
          }
        });
      }
    });
    setVideoOn(!videoOn);
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

  const enableVideoConfirm = () => {
    setOpenParticipants(true);
    toast(
      ({ closeToast }) => (
        <div>
          <p className="pb-1">Turn on camera and microphone?</p>
          <p className="text-xs pb-2">
            Do you want to turn on camera and microphone? This is a chat-only
            invitation.{" "}
          </p>
          <div className="flex space-x-4">
            <button
              type="button"
              onClick={() => {
                connectAudioandVideo();
                setOpenParticipants(true);
                closeToast();
              }}
              className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Connect Audio/Video
            </button>
            <button
              type="button"
              onClick={() => {
                closeToast();
                setOpenParticipants(true);
              }}
              className="inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Continue
            </button>
          </div>
        </div>
      ),
      { autoClose: false }
    );
  };

  const handleParticipants = () => {
    if (!localStream) {
      enableVideoConfirm();
      return;
    }
    setOpenParticipants(true);
  };

  const getGridLayout = (count) => {
    if (count < 1) return "";
    if (count === 1) return "grid-cols-2";
    if (count > 1 && count <= 3) return "grid-cols-2 grid-rows-2";
    if (count > 3 && count <= 5) return "grid-cols-3 grid-rows-2";
    if (count > 5 && count <= 7) return "grid-cols-4 grid-rows-2";
  };

  const togglePayment = () => {
    if (!lightningConfig?.data.lightningConfig.listening) {
      toast.info("Connect to a lightning node to use this action.");
      return;
    }
    setOpenPayment(true);
  };

  return (
    <div className="bg-gray-50 w-full h-full flex items-center flex-col">
      <div className="h-5/6 w-full pl-12 pr-12 mt-8">
        <div className={`grid w-full h-full ${getGridLayout(peers.length)}`}>
          <div className="flex justify-center bg-gray-100 rounded-lg m-2 px-2 relative">
            <div className="relative">
              <video
                className="h-full"
                playsInline
                muted
                ref={userVideo}
                autoPlay
              />
              {localStream && (
                <div className="bg-gray-900 opacity-75 text-white rounded-md text-sm absolute bottom-0 left-0 px-4 m-2">
                  You
                </div>
              )}
            </div>
          </div>
          {peers.map((peer, i) => (
            <Video key={i} peer={peer} />
          ))}
        </div>
      </div>
      <div className="absolute bottom-0 w-11/12 mb-4 px-6">
        <div className="px-10 h-16 bg-black bg-opacity-40 inset-x-0 bottom-0 flex justify-between items-center rounded-lg">
          <div className="flex space-x-4">
            <>
              {localStream ? (
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
                      <FaVideoSlash
                        className="mb-2 h-6 w-6"
                        aria-hidden="true"
                      />
                    )}
                    {videoOn ? "Stop Video" : "Start Video"}
                  </button>
                  {peers.length === 0 && (
                    <button
                      type="button"
                      onClick={() => disconnectAudioandVideo()}
                      className="flex flex-col items-center px-2 py-2 text-sm leading-4 font-medium rounded-md text-gray-50 bg-opacity-100 hover:bg-opacity-20 hover:bg-gray-100"
                    >
                      <XCircleIcon
                        className="mb-2 h-6 w-6"
                        aria-hidden="true"
                      />
                      Disconnect A/V
                    </button>
                  )}
                </>
              ) : (
                <>
                  {peers.length === 0 && (
                    <button
                      type="button"
                      onClick={() => connectAudioandVideo()}
                      className="flex flex-col items-center px-2 py-2 text-sm leading-4 font-medium rounded-md text-gray-50 bg-opacity-100 hover:bg-opacity-20 hover:bg-gray-100"
                    >
                      Connect Audio & Video
                    </button>
                  )}
                </>
              )}
            </>
          </div>
          <div className="flex space-x-4">
            <button
              onClick={handleParticipants}
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
              onClick={() => togglePayment()}
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
            localStream={localStream || false}
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
