import { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useFetchMyDid } from "../../hooks/id";
import Identity from "./Identity";
import AvatarRotator from "../contact/AvatarRotator";
import { useAtom } from "jotai";
import { myDidLongFormDocumentAtom } from "../../stores/id";
import { useFetchSettings, useUpdateSettings } from "../../hooks/settings";

const IdentitySettings = () => {
  const { isAuthenticated, user } = useAuth0();
  const [myDidLongFormDocument] = useAtom(myDidLongFormDocumentAtom);
  const [editNickname, setEditNickname] = useState(false);
  const [nickname, setNickname] = useState("");

  const { data: settings } = useFetchSettings();
  const { mutate: updateSettings } = useUpdateSettings();

  const toggleEditNickname = () => setEditNickname(!editNickname);

  const saveNickname = () => {
    let update = settings;
    if (!update.identity) {
      update.identity = { nickname };
    } else {
      update.identity.nickname = nickname;
    }
    updateSettings({ key: "settings", value: JSON.stringify(update) });
    toggleEditNickname();
  };

  useEffect(() => {
    if (settings?.identity?.nickname) {
      setNickname(settings?.identity?.nickname);
    }
  }, [settings?.identity?.nickname]);

  return (
    <div className="max-w-3xl mx-auto py-10 px-4 sm:px-6 lg:py-12 lg:px-8">
      <h1 className="text-3xl font-extrabold text-blue-gray-900 pb-5">
        Identity
      </h1>
      <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-6 sm:gap-x-6">
        <div className="sm:col-span-6">
          <h2 className="text-xl font-medium text-blue-gray-900">Profile</h2>
          <p className="mt-1 text-sm text-blue-gray-500">
            Manage your decentalized identity.
          </p>
        </div>
        <div className="sm:col-span-6">
          <label
            htmlFor="description"
            className="block text-lg font-medium text-blue-gray-900"
          >
            Nickname
          </label>
          <div className="mt-1">
            <p className="mt-1 text-sm font-medium text-blue-gray-900 pb-4">
              Set a nickname for yourself, will be used to identify yourself if
              your DID is unpublished or you are unknown to outside parties.
            </p>
            <div className="w-full flex space-x-4">
              <input
                type="text"
                name="nickName"
                value={nickname}
                disabled={!editNickname}
                onChange={(e) => setNickname(e.target.value)}
                id="nickName"
                className="px-2 block w-full border rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
              <div className="flex space-x-2">
                {!editNickname ? (
                  <button
                    type="button"
                    onClick={() => toggleEditNickname()}
                    className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    Update
                  </button>
                ) : (
                  <>
                    <button
                      type="button"
                      onClick={() => saveNickname()}
                      className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        if (settings?.identity?.nickname) {
                          setNickname(settings.identity.nickname);
                        }
                        setEditNickname(!editNickname);
                      }}
                      className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                      Cancel
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
        {user ? (
          <div className="sm:col-span-6">
            <p
              htmlFor="photo"
              className="block text-xl font-medium text-blue-gray-900 pb-4"
            >
              Signed into Twitter:{" "}
            </p>
            <span>
              <img
                className="inline-block h-8 w-8 rounded-full"
                src={user.picture}
                alt=""
              />
              <a
                href={`https://twitter.com/${user.nickname}`}
                rel="noreferrer"
                target="_blank"
                className="text-blue-500 pl-2 text-xl"
              >
                @{user.nickname}
              </a>
            </span>
          </div>
        ) : (
          <div className="sm:col-span-6">
            <label
              htmlFor="photo"
              className="block text-lg font-medium text-blue-gray-900"
            >
              Avatar
            </label>
            <p className="mt-1 text-md text-blue-gray-500">
              Here is your avatar, you can rotate your avatar at any time.
            </p>
            <AvatarRotator />
          </div>
        )}

        <div className="sm:col-span-6">
          <label
            htmlFor="description"
            className="block text-lg font-medium text-blue-gray-900"
          >
            Decentralized Identity
          </label>
          <div className="mt-1">
            <p className="mt-1 text-sm font-medium text-blue-gray-900 pb-4">
              This is your Long Form Decentralized Identity that you share with
              your connections
            </p>
            <textarea
              id="description"
              name="description"
              disabled
              rows={4}
              className="block w-full p-4 border border-blue-gray-300 rounded-md shadow-sm sm:text-sm focus:ring-primary focus:border-blue-500"
              defaultValue={myDidLongFormDocument}
            />
          </div>
        </div>
        {isAuthenticated && (
          <div className="sm:col-span-6">
            <label
              htmlFor="description"
              className="block text-xl font-medium text-blue-gray-900"
            >
              Publish to Impervious Contacts Registry
            </label>
            <p className="mt-1 text-md font-medium text-blue-gray-900">
              You can publish your Identity to the Impervious Contacts Registry.
              Peers can search for your Twitter username in the Registry to find
              your latest Identity.
            </p>
            <Identity />
          </div>
        )}
      </div>
    </div>
  );
};

export default IdentitySettings;
