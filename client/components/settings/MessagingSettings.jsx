import { Switch } from "@headlessui/react";
import { useFetchSettings, useUpdateSettings } from "../../hooks/settings";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const MessagingSettings = () => {
  const { data: settings } = useFetchSettings();
  const { mutate: updateSettings } = useUpdateSettings();

  const toggleOpenMessaging = (value) => {
    let update = settings;
    update.messages.openInbox = value;
    updateSettings({ key: "settings", value: JSON.stringify(update) });
  };

  return (
    <div className="max-w-3xl mx-auto py-10 px-4 sm:px-6 lg:py-12 lg:px-8">
      <h1 className="text-3xl font-extrabold text-blue-gray-900 pb-5">
        Messaging
      </h1>
      <div>
        <div>
          <h2 className="text-xl font-medium text-blue-gray-900">General</h2>
          <p className="mt-1 text-sm text-blue-gray-500">
            Manage your messaging settings.
          </p>
        </div>
        <div>
          {settings && (
            <ul role="list" className="mt-2 divide-y divide-gray-200">
              <Switch.Group
                as="li"
                className="flex items-center justify-between py-4"
              >
                <div className="flex flex-col">
                  <Switch.Label
                    as="p"
                    className="text-md font-medium text-gray-900"
                    passive
                  >
                    Open Messaging{" "}
                    {settings.messages.openInbox ? (
                      <span className="pl-4 font-bold text-lg text-indigo-600">
                        Open
                      </span>
                    ) : (
                      <span className="pl-4 font-bold text-lg text-indigo-600">
                        Closed
                      </span>
                    )}
                  </Switch.Label>
                  <Switch.Description className="text-md text-gray-500 pt-2">
                    With open messaging enabled, you will recieve messages from
                    any contact. Toggle open messaging to "Closed" to recieve
                    messages from only saved contacts.
                  </Switch.Description>
                </div>
                <Switch
                  checked={settings.messages.openInbox}
                  onChange={(e) => toggleOpenMessaging(e)}
                  className={classNames(
                    settings.messages.openInbox ? "bg-primary" : "bg-gray-200",
                    "mx-4 relative ml-4 inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                  )}
                >
                  <span
                    aria-hidden="true"
                    className={classNames(
                      settings.messages.openInbox
                        ? "translate-x-5"
                        : "translate-x-0",
                      "inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
                    )}
                  />
                </Switch>
              </Switch.Group>
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessagingSettings;
