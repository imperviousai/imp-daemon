import { useState, useEffect } from "react";
import { Switch } from "@headlessui/react";
import {
  BellIcon,
  CogIcon,
  KeyIcon,
  LinkIcon,
  PhotographIcon,
  RefreshIcon,
} from "@heroicons/react/outline";
import { ChevronLeftIcon } from "@heroicons/react/solid";
import MainNavigation from "../../components/MainNavigation";
import { BigHead } from "@bigheads/core";
import { useAtom } from "jotai";
import { myAvatarAtom } from "../../stores/settings";
import { getRandomAvatar } from "../../utils/contacts";
import { resolveDid } from "../../utils/id";
import { useFetchMyDid } from "../../hooks/id";
import RelayLightningSettings from "../../components/settings/RelayLightningSettings";

const subNavigation = [
  // {
  //   name: "General",
  //   description: "General application settings",
  //   href: "#",
  //   icon: CogIcon,
  //   current: true,
  // },
  // {
  //   name: "Security",
  //   description: "Security Settings",
  //   href: "#",
  //   icon: KeyIcon,
  //   current: false,
  // },
  {
    name: "Relay & Lightning",
    description: "Manage your relay node.",
    href: "#",
    icon: LinkIcon,
    current: false,
  },
  {
    name: "Identity",
    description: "Manage your decentralized settings",
    href: "#",
    icon: PhotographIcon,
    current: false,
  },
  // {
  //   name: "Notifications",
  //   description: "Manage your notification settings",
  //   href: "#",
  //   icon: BellIcon,
  //   current: false,
  // },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const pageTitle = "Settings";

const GeneralSettings = () => {
  return (
    <div className="max-w-3xl mx-auto py-10 px-4 sm:px-6 lg:py-12 lg:px-8">
      <h1 className="text-3xl font-extrabold text-blue-gray-900">General</h1>

      <div className="mt-6 space-y-8 divide-y divide-y-blue-gray-200">
        <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-6 sm:gap-x-6">
          <div className="sm:col-span-6">
            <h2 className="text-xl font-medium text-blue-gray-900">Section</h2>
            <p className="mt-1 text-sm text-blue-gray-500">
              General settings subtitle.
            </p>
          </div>
        </div>

        <div className="pt-8 flex justify-end">
          <button
            type="button"
            className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-blue-gray-900 hover:bg-blue-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            Cancel
          </button>
          <button
            type="button"
            className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

const SecuritySettings = () => {
  return (
    <div className="max-w-3xl mx-auto py-10 px-4 sm:px-6 lg:py-12 lg:px-8">
      <h1 className="text-3xl font-extrabold text-blue-gray-900">Security</h1>
      <div className="mt-6 space-y-8 divide-y divide-y-blue-gray-200">
        <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-6 sm:gap-x-6">
          <div className="sm:col-span-6">
            <h2 className="text-xl font-medium text-blue-gray-900">Section</h2>
            <p className="mt-1 text-sm text-blue-gray-500">
              Security settings subtitle.
            </p>
          </div>
        </div>

        <div className="pt-8 flex justify-end">
          <button
            type="button"
            className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-blue-gray-900 hover:bg-blue-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            Cancel
          </button>
          <button
            type="button"
            className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

const IdentitySettings = () => {
  const [showAvatarSave, setShowAvatarSave] = useState(false);
  const [currentAvatar, setCurrentAvatar] = useState({});

  const [myAvatar, setMyAvatar] = useAtom(myAvatarAtom);

  const { data: myDid } = useFetchMyDid();

  const [longFormDid, setLongFormDid] = useState("");

  useEffect(() => {
    if (myDid) {
      resolveDid(myDid.id)
        .then((res) => {
          setLongFormDid(res.data.longFormDid);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [myDid]);

  useEffect(() => {
    setCurrentAvatar(myAvatar);
  }, [myAvatar]);

  const handleAvatarRotation = () => {
    setShowAvatarSave(true);
    setCurrentAvatar({ ...getRandomAvatar() });
  };

  const cancelAvatarSave = () => {
    setShowAvatarSave(false);
    setCurrentAvatar(myAvatar);
  };

  const saveNewAvatar = () => {
    setMyAvatar(currentAvatar);
    setShowAvatarSave(false);
  };

  return (
    <div className="max-w-3xl mx-auto py-10 px-4 sm:px-6 lg:py-12 lg:px-8">
      <h1 className="text-3xl font-extrabold text-blue-gray-900">Identity</h1>

      <form className="mt-6 space-y-8 divide-y divide-y-blue-gray-200">
        <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-6 sm:gap-x-6">
          <div className="sm:col-span-6">
            <h2 className="text-xl font-medium text-blue-gray-900">Profile</h2>
            <p className="mt-1 text-sm text-blue-gray-500">
              Manage your decentalized identity from this section.
            </p>
          </div>

          <div className="sm:col-span-6">
            <label
              htmlFor="photo"
              className="block text-sm font-medium text-blue-gray-900"
            >
              Photo
            </label>
            <div className="pb-12 flex flex-col items-center">
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
            </div>
          </div>

          <div className="sm:col-span-6">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-blue-gray-900"
            >
              Decentralized Identifier
            </label>
            <div className="mt-1">
              <textarea
                id="description"
                name="description"
                disabled
                rows={4}
                className="block w-full border border-blue-gray-300 rounded-md shadow-sm sm:text-sm focus:ring-primary focus:border-blue-500"
                defaultValue={longFormDid}
              />
            </div>
            <p className="mt-3 text-sm text-blue-gray-500">
              This is the long form decentralized identity that you share with
              your connections.
            </p>
          </div>
        </div>
        <div className="pt-8 flex justify-end">
          <button
            type="button"
            className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-blue-gray-900 hover:bg-blue-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            Cancel
          </button>
          <button
            type="button"
            className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

const NotificationSettings = () => {
  return (
    <div className="max-w-3xl mx-auto py-10 px-4 sm:px-6 lg:py-12 lg:px-8">
      <h1 className="text-3xl font-extrabold text-blue-gray-900">
        Notification Settings
      </h1>

      <form className="mt-6 space-y-8 divide-y divide-y-blue-gray-200">
        <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-6 sm:gap-x-6">
          <div className="sm:col-span-6">
            <h2 className="text-xl font-medium text-blue-gray-900">
              Message Settings
            </h2>
            <p className="mt-1 text-sm text-blue-gray-500">
              Message Settings Coming Soon - Below are boilerplate settings.
              They are not yet operational.
            </p>
          </div>

          <div className="sm:col-span-6">
            <ul role="list" className="mt-2 divide-y divide-gray-200">
              <Switch.Group
                as="li"
                className="py-4 flex items-center justify-between"
              >
                <div className="flex flex-col">
                  <Switch.Label
                    as="p"
                    className="text-sm font-medium text-gray-900"
                    passive
                  >
                    Allow messages from everyone
                  </Switch.Label>
                  <Switch.Description className="text-sm text-gray-500">
                    You will receive messages from everyone, even if they are
                    not a known contact. Disable this setting if you only want
                    to receive messages from known contacts.
                  </Switch.Description>
                </div>
                <Switch
                  checked={true}
                  onChange={() => console.log("cool")}
                  className={classNames(
                    true ? "bg-teal-500" : "bg-gray-200",
                    "ml-4 relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
                  )}
                >
                  <span
                    aria-hidden="true"
                    className={classNames(
                      true ? "translate-x-5" : "translate-x-0",
                      "inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"
                    )}
                  />
                </Switch>
              </Switch.Group>
            </ul>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-6 sm:gap-x-6 pt-6">
          <div className="sm:col-span-6">
            <h2 className="text-xl font-medium text-blue-gray-900">
              Call Settings
            </h2>
            <p className="mt-1 text-sm text-blue-gray-500">
              Edit your call settings here
            </p>
          </div>

          <div className="sm:col-span-6">
            <ul role="list" className="mt-2 divide-y divide-gray-200">
              <Switch.Group
                as="li"
                className="py-4 flex items-center justify-between"
              >
                <div className="flex flex-col">
                  <Switch.Label
                    as="p"
                    className="text-sm font-medium text-gray-900"
                    passive
                  >
                    Push notifications for call requests from unknown
                  </Switch.Label>
                  <Switch.Description className="text-sm text-gray-500">
                    Do you want to receive a push notification for call requests
                    from unknown
                  </Switch.Description>
                </div>
                <Switch
                  checked={true}
                  onChange={() => console.log("cool")}
                  className={classNames(
                    true ? "bg-teal-500" : "bg-gray-200",
                    "ml-4 relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
                  )}
                >
                  <span
                    aria-hidden="true"
                    className={classNames(
                      true ? "translate-x-5" : "translate-x-0",
                      "inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"
                    )}
                  />
                </Switch>
              </Switch.Group>
              <Switch.Group
                as="li"
                className="py-4 flex items-center justify-between"
              >
                <div className="flex flex-col">
                  <Switch.Label
                    as="p"
                    className="text-sm font-medium text-gray-900"
                    passive
                  >
                    Set yourself away
                  </Switch.Label>
                  <Switch.Description className="text-sm text-gray-500">
                    You will not receive any notification, and will auto decline
                    invitations to call.
                  </Switch.Description>
                </div>
                <Switch
                  checked={true}
                  onChange={() => console.log("cool")}
                  className={classNames(
                    true ? "bg-teal-500" : "bg-gray-200",
                    "ml-4 relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
                  )}
                >
                  <span
                    aria-hidden="true"
                    className={classNames(
                      true ? "translate-x-5" : "translate-x-0",
                      "inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"
                    )}
                  />
                </Switch>
              </Switch.Group>
            </ul>
          </div>
        </div>
        <div className="pt-8 flex justify-end">
          <button
            type="button"
            className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-blue-gray-900 hover:bg-blue-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            Cancel
          </button>
          <button
            type="button"
            className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default function Settings() {
  const [settingsPage, setSettingsPage] = useState("Relay & Lightning");
  return (
    <>
      <MainNavigation currentPage={pageTitle}>
        <main className="flex-1 flex overflow-hidden h-full">
          <div className="flex-1 flex flex-col overflow-y-auto xl:overflow-hidden">
            {/* Breadcrumb */}
            <nav
              aria-label="Breadcrumb"
              className="bg-white border-b border-blue-gray-200 xl:hidden"
            >
              <div className="max-w-3xl mx-auto py-3 px-4 flex items-start sm:px-6 lg:px-8">
                <a
                  href="#"
                  className="-ml-1 inline-flex items-center space-x-3 text-sm font-medium text-blue-gray-900"
                >
                  <ChevronLeftIcon
                    className="h-5 w-5 text-blue-gray-400"
                    aria-hidden="true"
                  />
                  <span>Settings</span>
                </a>
              </div>
            </nav>

            <div className="flex-1 flex xl:overflow-hidden">
              {/* Secondary sidebar */}
              <nav
                aria-label="Sections"
                className="hidden flex-shrink-0 w-96 bg-white border-r border-blue-gray-200 xl:flex xl:flex-col"
              >
                {/* <div className="flex-shrink-0 h-16 px-6 border-b border-blue-gray-200 flex items-center">
                  <p className="text-lg font-medium text-blue-gray-900">
                    Settings
                  </p>
                </div> */}
                <div className="flex-1 min-h-0 overflow-y-auto">
                  {subNavigation.map((item) => (
                    <div
                      key={item.name}
                      onClick={() => setSettingsPage(item.name)}
                      className={classNames(
                        item.current
                          ? "bg-blue-50 bg-opacity-50"
                          : "hover:bg-blue-50 hover:bg-opacity-50",
                        "flex p-6 border-b border-blue-gray-200"
                      )}
                      aria-current={item.current ? "page" : undefined}
                    >
                      <item.icon
                        className="flex-shrink-0 -mt-0.5 h-6 w-6 text-blue-gray-400"
                        aria-hidden="true"
                      />
                      <div className="ml-3 text-sm">
                        <p className="font-medium text-blue-gray-900">
                          {item.name}
                        </p>
                        <p className="mt-1 text-blue-gray-500">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </nav>

              {/* Main content */}
              <div className="flex-1 xl:overflow-y-auto">
                {/* {settingsPage === "General" && <GeneralSettings />} */}
                {/* {settingsPage === "Security" && <SecuritySettings />} */}
                {settingsPage === "Relay & Lightning" && (
                  <RelayLightningSettings />
                )}
                {settingsPage === "Identity" && <IdentitySettings />}
                {/* {settingsPage === "Notifications" && <NotificationSettings />} */}
              </div>
            </div>
          </div>
        </main>
      </MainNavigation>
    </>
  );
}
