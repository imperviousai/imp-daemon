import { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useFetchMyDid } from "../../hooks/id";
import Identity from "./Identity";
import AvatarRotator from "../contact/AvatarRotator";
import { useAtom } from "jotai";
import { myDidLongFormDocumentAtom } from "../../stores/id";

const IdentitySettings = () => {
  const [longFormDid, setLongFormDid] = useState("");
  const { data: myDid } = useFetchMyDid();
  const { isAuthenticated, user } = useAuth0();
  const [myDidLongFormDocument] = useAtom(myDidLongFormDocumentAtom);

  return (
    <div className="max-w-3xl mx-auto py-10 px-4 sm:px-6 lg:py-12 lg:px-8">
      <h1 className="text-3xl font-extrabold text-blue-gray-900">Identity</h1>
      <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-6 sm:gap-x-6">
        <div className="sm:col-span-6">
          <h2 className="text-xl font-medium text-blue-gray-900">Profile</h2>
          <p className="mt-1 text-sm text-blue-gray-500">
            Manage your decentalized identity.
          </p>
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
              className="block text-xl font-medium text-blue-gray-900"
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
            className="block text-sm font-medium text-blue-gray-900"
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
