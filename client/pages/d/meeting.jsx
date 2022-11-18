import React, { useEffect, useState } from "react";
import Messaging from "../../components/meeting/Messaging";
import Participants from "../../components/meeting/Participants";
import VideoCall from "../../components/meeting/VideoCall";
import MainNavigation from "../../components/MainNavigation";
import { useAtom } from "jotai";
import { currentVideoCallAtom, activeVideoPeersAtom } from "../../stores/peers";
import { v4 as uuidv4 } from "uuid";

const pageTitle = "Meeting";

const Meeting = () => {
  const toggleMessaging = () => setOpenMessaging(!openMessaging);
  const toggleParticipants = () => setOpenParticipants(!openParticipants);

  const [openMessaging, setOpenMessaging] = useState(false);
  const [openParticipants, setOpenParticipants] = useState(false);

  const [currentVideoCallId, setCurrentVideoCallId] =
    useAtom(currentVideoCallAtom);
  const [peers] = useAtom(activeVideoPeersAtom);

  useEffect(() => {
    if (!currentVideoCallId) {
      // TODO: You will need to clear the currentVideoCallId after a call is completed
      console.log("Creating a new meeting room.");
      const newMeetingRoomId = uuidv4();
      setCurrentVideoCallId(newMeetingRoomId);
    }
  }, [currentVideoCallId, setCurrentVideoCallId]);

  return (
    <MainNavigation currentPage={pageTitle} hideNav={true}>
      <VideoCall
        peers={peers}
        id={currentVideoCallId}
        toggleParticipants={toggleParticipants}
        toggleMessaging={toggleMessaging}
      />
      <Messaging
        peers={peers}
        id={currentVideoCallId}
        openMessaging={openMessaging}
        toggleMessaging={toggleMessaging}
      />
      {/* TODO: remove this component as it's not needed. Participants is no longer needed.  */}
      <Participants
        peers={peers}
        id={currentVideoCallId}
        openParticipants={openParticipants}
        toggleParticipants={toggleParticipants}
      />
    </MainNavigation>
  );
};

export default Meeting;
