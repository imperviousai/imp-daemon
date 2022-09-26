import React, { useContext } from "react";
import { PhoneIcon, VideoCameraIcon, CashIcon } from "@heroicons/react/solid";

const ConversationHeader = () => {
  return (
    <div className="flex flex-row w-full h-full justify-between">
      {/* conversation header - maybe separate component */}
      <div></div> {/* placeholder for left section */}
      <div className="flex justify-items-center">
        <span className="inline-flex items-center text-sm text-primary font-semibold font-medium">
          {/* <svg
            className="-ml-1 mr-1.5 h-2 w-2 text-green-400"
            fill="currentColor"
            viewBox="0 0 8 8"
          >
            <circle cx={4} cy={4} r={3} />
          </svg> */}
          Chat
        </span>
      </div>
      <div></div> {/* placeholder for right section */}
      {/* <div className="flex">
        <PhoneIcon className="text-primary w-6 ml-2" />
        <VideoCameraIcon className="text-primary w-6 ml-2" />
        <CashIcon className="text-primary w-6 ml-2" />
      </div> */}
    </div>
  );
};

export default ConversationHeader;
