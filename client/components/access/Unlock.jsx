import React, { useEffect, useState, useCallback, useRef } from "react";
import { toast } from "react-toastify";
import { useUnlockSeed } from "../../hooks/key";
import { apiKeyAtom } from "../../stores/auth";
import { useAtom } from "jotai";
import { Rings } from "react-loader-spinner";
import { useQueryClient } from "react-query";

function Unlock() {
  const [passphrase, setPassphrase] = useState("");
  const [invalid, setIsInvalid] = useState(false);
  const [isUnlocking, setIsUnlocking] = useState(false);
  const queryClient = useQueryClient();

  const [, setApiKey] = useAtom(apiKeyAtom);

  const { mutate: unlockSeed } = useUnlockSeed(onError);

  const unlock = useCallback(
    (password) => {
      setIsUnlocking(true);
      unlockSeed(password, { onSuccess, onError });
    },
    [unlockSeed, onSuccess]
  );

  const onSuccess = useCallback(
    (data) => {
      if (data.data.apiKey) {
        setApiKey(data.data.apiKey);
        queryClient.invalidateQueries("fetch-completed-setup");
      }
    },
    [queryClient, setApiKey]
  );

  const onError = (err) => {
    setIsUnlocking(false);
    setPassphrase("");
    toast.error("Error unlocking database. Please try again.");
    setIsInvalid(true);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      unlock(passphrase);
    }
  };

  return (
    <div className="bg-white h-screen w-screen px-4 py-16 sm:px-6 sm:py-24 md:grid md:place-items-center lg:px-8">
      <div className="max-w-max mx-auto">
        <main className="sm:flex">
          <div className="sm:ml-6">
            <div className="sm:border-l sm:border-gray-200 sm:pl-6 flex flex-col items-center space-y-4">
              <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">
                Locked
              </h1>
              {isUnlocking ? (
                <h1 className="text-2xl font-semibold text-gray-900 tracking-tight">
                  Unlocking ...
                </h1>
              ) : (
                <p className="mt-1 text-base text-gray-500">
                  Please enter your password below to unlock this application.
                </p>
              )}
            </div>
            <div className="sm:pl-2">
              {!isUnlocking && (
                <input
                  type="password"
                  name="password"
                  id="password"
                  autoComplete="on"
                  onKeyDown={handleKeyDown}
                  onChange={(e) => setPassphrase(e.target.value)}
                  className={`shadow-sm h-10 w-full text-center focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm ${
                    invalid ? "border-red-300" : "border-gray-300"
                  } border-4 rounded-md my-6`}
                  placeholder="Enter your password"
                />
              )}
              <div>
                <label htmlFor="email" className="sr-only">
                  Email
                </label>
              </div>
              <div className="flex w-full justify-center">
                {isUnlocking ? (
                  <Rings
                    height="80"
                    width="80"
                    color="#312e81"
                    ariaLabel="loading"
                  />
                ) : (
                  <div className="flex flex-col w-full items-center space-y-4">
                    <button
                      type="button"
                      disabled={passphrase.length === 0}
                      onClick={() => unlock(passphrase)}
                      className="w-1/2 items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Unlock
                    </button>
                  </div>
                )}
              </div>
              <div className="flex justify-center pt-5">
                <p className="text-sm">
                  Can&apos;t unlock?
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href="https://github.com/imperviousai/imp-launcher/blob/master/README.md"
                    className="pl-1 underline text-primary font-semibold"
                  >
                    Click here for reset instructions.
                  </a>
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Unlock;
