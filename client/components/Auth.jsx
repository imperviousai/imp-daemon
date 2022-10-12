import React from "react";
import Onboard from "./access/Onboard";
import Unlock from "./access/Unlock";
import { useGetKeyStatus } from "../hooks/key";
import SubscribeProvider from "./SubscribeProvider";
import Peers from "./Peers";
import { useAtom } from "jotai";
import {
  recoverySeedSavedAtom,
  passwordSetAtom,
  recoverySeedAtom,
  apiKeyAtom,
  onboardInProgressAtom,
} from "../stores/auth";
import { useFetchCompletedSetup } from "../hooks/auth";

const NetworkError = () => {
  return (
    <>
      <div className="bg-white h-full min-h-screen px-4 py-16 sm:px-6 sm:py-24 md:grid md:place-items-center lg:px-8">
        <div className="max-w-max mx-auto">
          <main className="sm:flex">
            <p className="text-4xl font-extrabold text-indigo-600 sm:text-5xl">
              Uh oh!
            </p>
            <div className="sm:ml-6">
              <div className="sm:border-l sm:border-gray-200 sm:pl-6">
                <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">
                  Network Error
                </h1>
                <p className="mt-1 text-base text-gray-500">
                  Unable to connect to the Impervious daemon. Please try again.
                </p>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

const Loading = () => {
  return (
    <>
      <div className="bg-white h-full min-h-screen px-4 py-16 sm:px-6 sm:py-24 md:grid md:place-items-center lg:px-8">
        <div className="max-w-max mx-auto">
          <main className="sm:flex">
            {/* <p className="text-4xl font-extrabold text-indigo-600 sm:text-5xl">
              Uh oh!
            </p> */}
            <div className="sm:ml-6">
              <div className="sm:border-l sm:border-gray-200 sm:pl-6">
                <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">
                  Loading ...
                </h1>
                <p className="mt-1 text-base text-gray-500">
                  Attempting to connect to the Impervious daemon.
                </p>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

const Auth = ({ children }) => {
  const [, setPasswordSet] = useAtom(passwordSetAtom);
  const [, setRecoverySeed] = useAtom(recoverySeedAtom);
  const [, setRecoverySeedSaved] = useAtom(recoverySeedSavedAtom);
  const [apiKey] = useAtom(apiKeyAtom);
  const { data: completedSetup } = useFetchCompletedSetup();
  const [onboardInProgress] = useAtom(onboardInProgressAtom);

  const onSuccess = (data) => {
    console.log("Status check successful", data.data);
    if (data?.data.status === "NOT_INITIALIZED") {
      setPasswordSet(false);
      setRecoverySeed(false);
      setRecoverySeedSaved(false);
    }
  };
  const onError = (error) => {
    console.error("Something went wrong grabbing the key!", error);
  };

  const { isLoading, data, isError, error } = useGetKeyStatus(
    onSuccess,
    onError
  );

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    console.log(
      "Unable to to get key status. Likely unable to connect to daemon.",
      error
    );
    return <NetworkError />;
  }

  return (
    <>
      {data?.data.status === "LOCKED" && <Unlock />}
      {(data?.data.status === "NOT_INITIALIZED" ||
        (apiKey &&
          !completedSetup &&
          onboardInProgress &&
          data?.data.status === "READY")) && <Onboard />}
      {data?.data.status === "READY" && apiKey && completedSetup && (
        <>
          <Peers />
          <SubscribeProvider>{children}</SubscribeProvider>
        </>
      )}
      {data?.data.status === "READY" &&
        apiKey &&
        !completedSetup &&
        !onboardInProgress && <Unlock />}
      {data?.data.status === "READY" && !apiKey && <Unlock />}
    </>
  );
};

export default Auth;
