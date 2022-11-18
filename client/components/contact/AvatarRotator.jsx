import { useState, useEffect } from "react";
import { useAtom } from "jotai";
import { BigHead } from "@bigheads/core";
import { RefreshIcon } from "@heroicons/react/outline";
import { getRandomAvatar } from "../../utils/contacts";
import { useUpdateContact } from "../../hooks/contacts";
import { useFetchMyAvatar, useUpdateMyAvatar } from "../../hooks/id";
import ContactAvatar from "./ContactAvatar";

const AvatarRotator = ({ contact }) => {
  const [showAvatarSave, setShowAvatarSave] = useState(false);
  const [currentAvatar, setCurrentAvatar] = useState({});

  const { mutate: updateContact } = useUpdateContact(onSuccess, onError);
  const { mutate: updateMyAvatar } = useUpdateMyAvatar();
  const { data: myAvatar } = useFetchMyAvatar();

  const onSuccess = () => toast.success("Avatar saved!");
  const onError = () =>
    toast.error("Error saving avatar. Please try again later.");

  useEffect(() => {
    if (contact) {
      setCurrentAvatar(JSON.parse(contact.metadata).avatar);
    } else {
      if (myAvatar) {
        setCurrentAvatar(JSON.parse(myAvatar));
      } else {
        setCurrentAvatar({ ...getRandomAvatar() });
      }
    }
  }, [contact, myAvatar]);

  const handleAvatarRotation = () => {
    setShowAvatarSave(true);
    setCurrentAvatar({ ...getRandomAvatar() });
  };

  const cancelAvatarSave = () => {
    setShowAvatarSave(false);
    setCurrentAvatar(myAvatar);
  };

  const saveNewAvatar = () => {
    if (contact) {
      // update the contacts avatar, not yours
      updateContact({ existingContact: contact, avatar: currentAvatar });
    } else {
      updateMyAvatar({ key: "myAvatar", value: JSON.stringify(currentAvatar) });
    }

    setShowAvatarSave(false);
  };

  const Rotator = () => (
    <div className="flex flex-col items-center">
      <BigHead
        {...currentAvatar}
        className="h-32 w-full object-cover lg:h-48"
      />
      <button
        type="button"
        onClick={() => handleAvatarRotation()}
        className="pt-2"
      >
        <RefreshIcon
          className="-ml-1 mr-2 h-6 w-6 text-gray-900"
          aria-hidden="true"
        />
      </button>
      {showAvatarSave && (
        <div className="flex space-x-2 pt-4">
          <button
            type="button"
            onClick={() => cancelAvatarSave()}
            className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => saveNewAvatar()}
            className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Save
          </button>
        </div>
      )}
    </div>
  );

  if (contact) {
    return (
      <>
        {JSON.parse(contact.metadata).username ? (
          <ContactAvatar
            contact={contact}
            className="h-32 object-cover lg:h-48"
          />
        ) : (
          <Rotator />
        )}
      </>
    );
  }

  return <Rotator />;
};

export default AvatarRotator;
