/* This example requires Tailwind CSS v2.0+ */
import { Switch } from "@headlessui/react";
import { useAtom } from "jotai";
import { lightningEnabledAtom } from "../stores/messages";
import { LightningBoltIcon } from "@heroicons/react/solid";
import { useFetchLightningConfig } from "../hooks/config";
import { toast } from "react-toastify";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function LightningToggle() {
  const [lightningEnabled, setLightningEnabled] = useAtom(lightningEnabledAtom);
  const { data: lightningConfig } = useFetchLightningConfig();

  const toggleLightning = (value) => {
    if (!lightningConfig?.data.lightningConfig.listening) {
      toast.info("Connect to a lightning node to use this action.");
      return;
    }
    setLightningEnabled(value);
    if (value) {
      toast.info(
        "The Lightning Network is now prioritized for sending and receiving DIDComm messages."
      );
    }
  };

  return (
    <>
      <Switch
        checked={lightningEnabled}
        onChange={toggleLightning}
        className={classNames(
          lightningEnabled ? "bg-indigo-600" : "bg-gray-200",
          "relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        )}
      >
        <span className="sr-only">Use setting</span>
        <span
          className={classNames(
            lightningEnabled ? "translate-x-5" : "translate-x-0",
            "pointer-events-none relative inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"
          )}
        >
          <span
            className={classNames(
              lightningEnabled
                ? "opacity-0 ease-out duration-100"
                : "opacity-100 ease-in duration-200",
              "absolute inset-0 h-full w-full flex items-center justify-center transition-opacity"
            )}
            aria-hidden="true"
          >
            <svg
              className="h-3 w-3 text-gray-400"
              fill="none"
              viewBox="0 0 12 12"
            >
              <path
                d="M4 8l2-2m0 0l2-2M6 6L4 4m2 2l2 2"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <span
            className={classNames(
              lightningEnabled
                ? "opacity-100 ease-in duration-200"
                : "opacity-0 ease-out duration-100",
              "absolute inset-0 h-full w-full flex items-center justify-center transition-opacity"
            )}
            aria-hidden="true"
          >
            <LightningBoltIcon className="text-indigo-800 h-3 w-3" />
          </span>
        </span>
      </Switch>
      <div className="flex">
        <p className="py-2 px-3 rounded-md items-center text-xs font-medium text-indigo-100">
          Lightning
        </p>
      </div>
    </>
  );
}
