import { useState } from "react";
import { Switch } from "@headlessui/react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function DarkModeToggle() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <>
      <Switch
        checked={darkMode}
        onChange={setDarkMode}
        className={classNames(
          darkMode ? "bg-gray-900" : "bg-gray-200",
          "mb-2 ml-4 relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
        )}
      >
        <span className="sr-only">Use setting</span>
        <span
          className={classNames(
            darkMode ? "translate-x-5" : "translate-x-0",
            "pointer-events-none relative inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"
          )}
        >
          <span
            className={classNames(
              darkMode
                ? "opacity-0 ease-out duration-100"
                : "opacity-100 ease-in duration-200",
              "absolute inset-0 h-full w-full flex items-center justify-center transition-opacity"
            )}
            aria-hidden="true"
          >
            <svg
              className="h-3 w-3 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
          </span>
          <span
            className={classNames(
              darkMode
                ? "opacity-100 ease-in duration-200"
                : "opacity-0 ease-out duration-100",
              "absolute inset-0 h-full w-full flex items-center justify-center transition-opacity"
            )}
            aria-hidden="true"
          >
            <svg
              className="h-3 w-3 text-gray-900"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
          </span>
        </span>
      </Switch>
    </>
  );
}
