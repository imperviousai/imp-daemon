import { useState, useEffect } from "react";
import { Switch } from "@headlessui/react";
import { LinkIcon, PhotographIcon, ChatIcon } from "@heroicons/react/outline";
import { ChevronLeftIcon } from "@heroicons/react/solid";
import MainNavigation from "../../components/MainNavigation";
import RelayLightningSettings from "../../components/settings/RelayLightningSettings";
import IdentitySettings from "../../components/settings/IdentitySettings";
import MessagingSettings from "../../components/settings/MessagingSettings";
import { useFetchSettings } from "../../hooks/settings";
import { initSettings } from "../../utils/settings";

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
  {
    name: "Messaging",
    description: "Manage your messaging settings",
    href: "#",
    icon: ChatIcon,
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
  const { data: settings } = useFetchSettings();
  useEffect(() => {
    if (!settings) {
      initSettings();
    }
  }, [settings]);

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
                className="hidden flex-shrink-0 w-80 bg-white border-r border-blue-gray-200 xl:flex xl:flex-col"
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
                        <p className="mt-1 text-xs text-blue-gray-500">
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
                {settingsPage === "Messaging" && <MessagingSettings />}
                {/* {settingsPage === "Notifications" && <NotificationSettings />} */}
              </div>
            </div>
          </div>
        </main>
      </MainNavigation>
    </>
  );
}
