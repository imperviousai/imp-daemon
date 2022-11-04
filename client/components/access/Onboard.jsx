import React, { useState, useRef, useEffect, useCallback } from "react";
import { toast } from "react-toastify";
import { Listbox, Transition } from "@headlessui/react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useInitSeed } from "../../hooks/key";
import { useRecoverDid, useUpdateMyAvatar } from "../../hooks/id";
import {
  CheckIcon,
  SelectorIcon,
  ChevronRightIcon,
  XIcon,
} from "@heroicons/react/solid";
import { onboard, didCommRelayEndpoints } from "../../utils/onboard";
import { useQueryClient } from "react-query";
import { useAtom } from "jotai";
import { getRandomAvatar } from "../../utils/contacts";
import {
  recoverySeedSavedAtom,
  passwordSetAtom,
  commsSelectedAtom,
  recoverySeedAtom,
  apiKeyAtom,
  onboardInProgressAtom,
} from "../../stores/auth";
import { saveAs } from "file-saver";
// import { providedLightningNodes } from "../../mock/lightning";
import { useSaveLightningConfig } from "../../hooks/config";
import { useUpdateCompletedSetup } from "../../hooks/auth";
import { Rings } from "react-loader-spinner";
import { relayRequest } from "../../utils/messages";
import { ChevronLeftIcon } from "@heroicons/react/outline";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

// COMING SOON
// const CustomRelayEndpoint = ({ input, setInput }) => {
//   return (
//     <div className="w-1/3">
//       <div className="mt-1 mb-3 ">
//         <input
//           type="text"
//           name="endpoint"
//           id="endpoint"
//           className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-2 border-gray-300 rounded-md px-10 py-2 text-center"
//           placeholder="did:peer:abcdefghijk"
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//         />
//       </div>
//     </div>
//   );
// };

// FOR DEVELOPER USAGE ONLY
// const SelectSupportedLnNode = ({ selected, setSelected, isDisabled }) => {
//   return (
//     <Listbox value={selected} onChange={setSelected} disabled={isDisabled}>
//       {({ open }) => (
//         <>
//           {/* <Listbox.Label className="block text-sm font-medium text-gray-700">
//             Relay Endpoint
//           </Listbox.Label> */}
//           <div className="mt-1 relative">
//             <Listbox.Button className="bg-white relative w-full border-2 border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
//               <span className="block truncate">{selected}</span>
//               <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
//                 <SelectorIcon
//                   className="h-5 w-5 text-gray-400"
//                   aria-hidden="true"
//                 />
//               </span>
//             </Listbox.Button>

//             <Transition
//               show={open}
//               as={Fragment}
//               leave="transition ease-in duration-100"
//               leaveFrom="opacity-100"
//               leaveTo="opacity-0"
//             >
//               <Listbox.Options className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
//                 {providedLightningNodes.map((node, i) => (
//                   <Listbox.Option
//                     key={i}
//                     className={({ active }) =>
//                       classNames(
//                         active ? "text-white bg-indigo-600" : "text-gray-900",
//                         "cursor-default select-none relative py-2 pl-3 pr-9"
//                       )
//                     }
//                     value={node.name}
//                   >
//                     {({ selected, active }) => (
//                       <>
//                         <span
//                           className={classNames(
//                             selected ? "font-semibold" : "font-normal",
//                             "block truncate"
//                           )}
//                         >
//                           {node.name}
//                         </span>

//                         {selected ? (
//                           <span
//                             className={classNames(
//                               active ? "text-white" : "text-indigo-600",
//                               "absolute inset-y-0 right-0 flex items-center pr-4"
//                             )}
//                           >
//                             <CheckIcon className="h-5 w-5" aria-hidden="true" />
//                           </span>
//                         ) : null}
//                       </>
//                     )}
//                   </Listbox.Option>
//                 ))}
//               </Listbox.Options>
//             </Transition>
//           </div>
//         </>
//       )}
//     </Listbox>
//   );
// };

// COMING SOON
// const SelectRelay = ({ selected, setSelected, isDisabled }) => {
//   return (
//     <Listbox value={selected} onChange={setSelected} disabled={isDisabled}>
//       {({ open }) => (
//         <>
//           {/* <Listbox.Label className="block text-sm font-medium text-gray-700">
//             Relay Endpoint
//           </Listbox.Label> */}
//           <div className="mt-1 relative">
//             <Listbox.Button className="bg-white relative w-full border-2 border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
//               <span className="block truncate">{selected}</span>
//               <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
//                 <SelectorIcon
//                   className="h-5 w-5 text-gray-400"
//                   aria-hidden="true"
//                 />
//               </span>
//             </Listbox.Button>

//             <Transition
//               show={open}
//               as={Fragment}
//               leave="transition ease-in duration-100"
//               leaveFrom="opacity-100"
//               leaveTo="opacity-0"
//             >
//               <Listbox.Options className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
//                 {didCommRelayEndpoints.map((endpoint, i) => (
//                   <Listbox.Option
//                     key={i}
//                     className={({ active }) =>
//                       classNames(
//                         active ? "text-white bg-indigo-600" : "text-gray-900",
//                         "cursor-default select-none relative py-2 pl-3 pr-9"
//                       )
//                     }
//                     value={endpoint}
//                   >
//                     {({ selected, active }) => (
//                       <>
//                         <span
//                           className={classNames(
//                             selected ? "font-semibold" : "font-normal",
//                             "block truncate"
//                           )}
//                         >
//                           {endpoint}
//                         </span>

//                         {selected ? (
//                           <span
//                             className={classNames(
//                               active ? "text-white" : "text-indigo-600",
//                               "absolute inset-y-0 right-0 flex items-center pr-4"
//                             )}
//                           >
//                             <CheckIcon className="h-5 w-5" aria-hidden="true" />
//                           </span>
//                         ) : null}
//                       </>
//                     )}
//                   </Listbox.Option>
//                 ))}
//               </Listbox.Options>
//             </Transition>
//           </div>
//         </>
//       )}
//     </Listbox>
//   );
// };

function Onboard() {
  const [passphrase, setPassphrase] = useState("");
  const [passphraseConfirm, setPassphraseConfirm] = useState("");
  const [invalid, setIsInvalid] = useState(false);
  const [relayEndpoint, setRelayEndpoint] = useState(didCommRelayEndpoints[0]);
  const [customRelayEndpoint, setCustomRelayEndpoint] = useState("");
  const [lndEndpoint, setLndEndpoint] = useState("");
  const [showingRecovery, setShowingRecovery] = useState(false);
  const [isRecovering, setIsRecovering] = useState(false);
  const [recoveryKit, setRecoveryKit] = useState();
  const [showPasswordScreen, setShowPasswordScreen] = useState(false);
  const [file, setFile] = useState();

  const hiddenFileInput = useRef(null);

  const handleClick = (e) => {
    hiddenFileInput.current.click();
  };

  const handleChange = (e) => {
    const file = e.target.files[0];
    setFile(file);
    hiddenFileInput.current.value = null;
  };

  const passwordsMatch = useCallback(() => {
    return passphrase.length && passphrase === passphraseConfirm;
  }, [passphrase, passphraseConfirm]);

  useEffect(() => {
    passwordsMatch ? setIsInvalid(false) : setIsInvalid(true);
  }, [passwordsMatch]);

  // const [supportedLnNode, setSupportedLnNode] = useState(
  //   providedLightningNodes[0].name
  // );

  const { mutateAsync: saveLightningConfig } = useSaveLightningConfig();
  const { mutate: initSeed } = useInitSeed();
  const { mutate: recoverDid } = useRecoverDid();
  const { mutate: updateMyAvatar } = useUpdateMyAvatar();
  const { mutate: updateCompletedSetup } = useUpdateCompletedSetup();

  const [recoverySeedSaved, setRecoverySeedSaved] = useAtom(
    recoverySeedSavedAtom
  );
  const [isLoading, setIsLoading] = useState(false);
  const [passwordSet, setPasswordSet] = useAtom(passwordSetAtom);
  const [, setApiKey] = useAtom(apiKeyAtom);
  const [, setOnboardInProgress] = useAtom(onboardInProgressAtom);
  const [recoverySeed, setRecoverySeed] = useAtom(recoverySeedAtom);

  const queryClient = useQueryClient();

  const downloadRecoveryKit = (recoveryKit) => {
    const file = new File(
      [`${JSON.stringify(recoveryKit)}`],
      "impervious_recovery_kit.txt",
      {
        type: "text/plain;charset=utf-8",
      }
    );
    saveAs(file, "impervious_recovery_kit.txt");
  };

  // const updateLightningConfig = () => {
  //   // clear error message field
  //   if (supportedLnNode !== providedLightningNodes[0].name) {
  //     const node = providedLightningNodes.find(
  //       (node) => node.name === supportedLnNode
  //     );
  //     if (node) {
  //       saveLightningConfig({
  //         config: {
  //           ip: node.ip,
  //           port: node.port,
  //           pubkey: node.pubkey,
  //           tlsCert: node.tlsCert,
  //           tlsCertHex: node.tlsCertHex,
  //           adminMacaroon: node.adminMacaroon,
  //           adminMacaroonHex: node.adminMacaroonHex,
  //           listening: node.listening,
  //         },
  //       });
  //       setLndEndpoint(`lightning:${node.pubkey}`);
  //     }
  //   }
  // };

  const onSuccess = (data) => {
    const { mnenomic, apiKey } = data.data;
    setRecoverySeed(mnenomic);
    setApiKey(apiKey);
    // set up an initial avatar
    updateMyAvatar({
      key: "myAvatar",
      value: JSON.stringify(getRandomAvatar()),
    });
    onboard({
      lndEndpoint,
      relayEndpoint: customRelayEndpoint || relayEndpoint,
    })
      .then(({ data: { recoveryKit } }) => {
        setPasswordSet(true);
        downloadRecoveryKit(recoveryKit);
        console.log("Attempting to register with relay now.");
        return relayRequest(relayEndpoint);
      })
      .then(() => {
        console.log("Successfully registered to relay.");
        setIsLoading(false);
      })
      .catch((err) => {
        console.log("Unable to complete onboarding.");
        console.log(err);
        setIsLoading(false);
      });
  };
  const onError = () => {
    toast.error("Failed to Initialize. Please try again.");
    setIsInvalid(true);
  };

  const initialize = () => {
    if (
      !passphrase ||
      passphrase.length < 8 ||
      passphrase !== passphraseConfirm
    ) {
      toast.error(
        "Unable to set password. Passwords must match and be at least 8 characters long."
      );
      setIsLoading(false);
      setIsInvalid(true);
      return;
    }
    setIsLoading(true);
    setIsInvalid(false);
    setOnboardInProgress(true);
    initSeed({ passphrase }, { onSuccess, onError });
  };

  const recover = () => {
    try {
      setIsRecovering(true);
      const reader = new FileReader();
      reader.readAsText(file);
      reader.onloadend = () => {
        try {
          const recoveryKit = JSON.parse(reader.result);
          setRecoveryKit(recoveryKit);
          const { seed } = recoveryKit;
          initSeed(
            { passphrase, mnemonic: seed },
            {
              onSuccess: ({ data: { apiKey } }) => {
                setApiKey(apiKey);
                updateMyAvatar({
                  key: "myAvatar",
                  value: JSON.stringify(getRandomAvatar()),
                });
                recoverDid(recoveryKit, {
                  onSuccess: () => {
                    toast.success("Recovery successful!");
                    goToDashboard();
                  },
                  onError: () => {
                    toast.error("Unable to recover DID. Please try again.");
                    setIsRecovering(false);
                  },
                });
              },
              onError: () => {
                toast.error("Failed to Initialize. Please try again.");
                setIsRecovering(false);
              },
            }
          );
        } catch (e) {
          toast.error(
            "Unable to recover using provided file. Please select the recovery kit."
          );
          console.log(e);
          setIsRecovering(false);
        }
      };
    } catch (e) {
      toast.error(
        "Unable to recover using provided file. Please select the recovery kit."
      );
      setIsRecovering(false);
      console.log(e);
    }
  };

  const goToDashboard = () => {
    updateCompletedSetup({ key: "completedSetup", value: "true" });
    setOnboardInProgress(false);
    queryClient.invalidateQueries("fetch-key-status");
  };

  const setupComms = () => {
    return (
      <div className="flex w-full justify-center flex-col items-center">
        <div className="w-full pt-3 flex flex-col items-center space-y-4">
          <button
            type="button"
            onClick={() => {
              setShowPasswordScreen(true);
            }}
            className="w-2/5 inline-flex justify-center items-center px-8 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            New User
            <ChevronRightIcon className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={() => setShowingRecovery(true)}
            className="w-2/5 inline-flex justify-center items-center px-8 py-2 mt-4 border-2 border-primary shadow-sm text-base font-medium rounded-md text-primary bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Recovery <ChevronRightIcon className="h-5 w-5" />
          </button>
        </div>
        {/* <h1 className="font-bold text-xl mb-1">
          Step 1 - Set Up Communication
        </h1>
        <p className="mt-1 text-md text-gray-800 font-light w-3/4 text-center">
          First things first, we need to set up your preferred didcomm
          endpoint(s).
        </p>
        <h1 className="font-semibold text-lg mt-1">Select a Relay Endpoint</h1>
        {customRelayEndpoint === "" && (
          <p className="my-1 text-md font-light text-gray-800 w-3/4 text-center">
            Choose from a list of validated relay endpoints provided by
            Impervious.
          </p>
        )}
        {customRelayEndpoint === "" && (
          <SelectRelay
            selected={relayEndpoint}
            setSelected={setRelayEndpoint}
            isDisabled={customRelayEndpoint !== ""}
          />
        )}

        <p className="mt-3 text-md font-light text-gray-800 w-3/4 text-center">
          Or if you prefer to provide your own, please enter the Relay DID
          below.
        </p>
        <CustomRelayEndpoint
          input={customRelayEndpoint}
          setInput={setCustomRelayEndpoint}
        /> */}
        {/* <p className="mt-1 mb-3 text-md font-light text-gray-800 w-3/4 text-center">
          For initial testing, select from one of our supported nodes, or use
          your own. If your Impervious daemon pre-configured to use lightning
          already, we can auto detect the lightning configuraton settings and
          activate cypherpunk mode.
        </p> */}
        {/* FOR DEVELOPER USAGE ONLY */}
        {/* <div className="mt-4 flex flex-col space-y-4 items-center">
          <SelectSupportedLnNode
            selected={supportedLnNode}
            setSelected={setSupportedLnNode}
            disabled={false}
          />
          {supportedLnNode !== providedLightningNodes[0].name && (
            <button
              type="button"
              onClick={() => updateLightningConfig()}
              className="inline-flex w-fuull items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Confirm Selection
            </button>
          )}
        </div> */}

        {/* {lndEndpoint && (
          <div className="flex items-center space-x-2">
            <CheckIcon className="h-5 w-5 text-green-400" aria-hidden="true" />
            <p className="mt-1 text-md font-semibold text-gray-800">
              Lightning settings detected! Adding to your DID now.
            </p>
          </div>
        )} */}
        {/* <p className="mt-3 text-md font-light text-gray-800 w-3/4 text-center">
          For additional lighting configurations, this will need to be performed
          in settings.{" "}
        </p> */}

        {/* {lndEndpoint ? (
          <div className="w-full grid justify-items-center pt-3">
            <button
              type="button"
              onClick={() => setShowPasswordScreen(true)}
              className="inline-flex items-center px-4 py-2 mt-4 border-2 border-primary shadow-sm text-base font-medium rounded-md text-primary bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Next <ChevronRightIcon className="h-5 w-5" />
            </button>
          </div>
        ) : (
          <>
            {(!supportedLnNode ||
              supportedLnNode === "Pick a Lightning Node") && (
              <div className="w-full grid justify-items-center pt-3">
                <button
                  type="button"
                  onClick={() => setShowPasswordScreen(true)}
                  className="inline-flex items-center px-4 py-2 mt-4 border-2 border-primary shadow-sm text-base font-medium rounded-md text-primary bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Skip <ChevronRightIcon className="h-5 w-5" />
                </button>
              </div>
            )}
          </>
        )} */}
      </div>
    );
  };

  const showRecovery = () => {
    return (
      <div className="flex w-full justify-center flex-col items-center">
        {!isRecovering ? (
          <>
            <h1 className="font-bold text-xl mb-1">Recovery</h1>
            <p className="mt-1 text-lg text-base text-gray-800 pt-2 pb-4">
              Please set and confirm your password
            </p>
            <form
              className="w-full flex flex-col items-center justify-center w-full"
              autoComplete="on"
              onSubmit={(e) => {
                e.preventDefault();
                recover();
              }}
            >
              {" "}
              <input
                type="password"
                name="password"
                id="password"
                onChange={(e) => setPassphrase(e.target.value)}
                className={`shadow-sm h-10 w-full text-center focus:ring-indigo-500 focus:border-indigo-500 block sm:text-sm ${
                  invalid ? "border-red-300" : "border-gray-300"
                } border-4 rounded-md my-4`}
                placeholder="Enter your password"
              />
              <input
                type="password"
                name="passwordConfirm"
                id="passwordConfirm"
                onChange={(e) => setPassphraseConfirm(e.target.value)}
                className={`shadow-sm h-10 w-full text-center focus:ring-indigo-500 focus:border-indigo-500 block sm:text-sm ${
                  invalid ? "border-red-300" : "border-gray-300"
                } border-4 rounded-md my-4`}
                placeholder="Confirm your password"
              />
              <p className="mt-1 text-lg text-base text-gray-800 pt-2 pb-4">
                Please select your recovery kit.
              </p>
              {file && (
                <p className="pb-2">
                  File Selected:{" "}
                  <span className="text-semibold">{file.name}</span>{" "}
                </p>
              )}
              <>
                <button
                  type="button"
                  onClick={handleClick}
                  className="w-1/2 items-center px-6 py-3 border-2 border-primary text-base font-medium rounded-md shadow-sm text-primary bg-white hover:text-white hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Select Recovery Kit
                </button>
                <input
                  type="file"
                  ref={hiddenFileInput}
                  onChange={handleChange}
                  style={{ display: "none" }}
                />
              </>
              {file && passwordsMatch() ? (
                <button
                  type="submit"
                  className="w-1/2 items-center px-6 py-3 mt-4  border-2 border-primary text-base font-medium rounded-md shadow-sm text-white bg-primary hover:text-white hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Recover
                </button>
              ) : (
                <></>
              )}
            </form>

            <button
              type="button"
              onClick={() => {
                setShowingRecovery(false);
              }}
              className="w-1/2 mt-4 inline-flex justify-center items-center px-8 py-3 border border-gray-600 text-base font-medium rounded-md shadow-sm text-gray-600 bg-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              <ChevronLeftIcon className="h-5 w-5" />
              Back
            </button>
          </>
        ) : (
          <>
            <h1 className="font-semibold text-2xl my-4">Recovering ...</h1>
            <Rings
              height="100"
              width="100"
              color="#312e81"
              ariaLabel="loading"
            />
          </>
        )}
      </div>
    );
  };

  const enterPassword = () => {
    return (
      <div className="flex w-full justify-center flex-col items-center">
        <>
          <h1 className="font-bold text-xl mb-1">Set a Password Manually</h1>
          <p className="mt-1 text-lg text-base text-gray-800 pt-2 pb-4">
            You will need to <b>enter and confirm a passphrase below </b>and
            then <b>save your Recovery Kit</b>
          </p>
          <p className="mt-1 text-md text-light text-gray-500">
            Enter a password at least 8 characters long
          </p>
          <form
            className="w-full flex flex-col items-center justify-center w-full"
            autoComplete="on"
            onSubmit={(e) => {
              e.preventDefault();
              initialize();
            }}
          >
            <input
              type="password"
              name="password"
              id="password"
              autoComplete="on"
              onChange={(e) => setPassphrase(e.target.value)}
              className={`shadow-sm h-10 w-full text-center focus:ring-indigo-500 focus:border-indigo-500 block sm:text-sm ${
                invalid ? "border-red-300" : "border-gray-300"
              } border-4 rounded-md my-4`}
              placeholder="Enter your password"
            />
            <input
              type="password"
              name="passwordConfirm"
              id="passwordConfirm"
              autoComplete="on"
              onChange={(e) => setPassphraseConfirm(e.target.value)}
              className={`shadow-sm h-10 w-full text-center focus:ring-indigo-500 focus:border-indigo-500 block sm:text-sm ${
                invalid ? "border-red-300" : "border-gray-300"
              } border-4 rounded-md my-4`}
              placeholder="Confirm your password"
            />
            {isLoading ? (
              <Rings
                height="80"
                width="80"
                color="#312e81"
                ariaLabel="loading"
              />
            ) : (
              <div className="w-full pt-3 flex flex-col items-center space-y-4">
                <button
                  type="submit"
                  disabled={passphrase.length === 0}
                  className="w-2/5 inline-flex justify-center items-center px-8 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                >
                  Set Password
                  <ChevronRightIcon className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  onClick={() => setShowPasswordScreen(false)}
                  className="w-2/5 inline-flex justify-center items-center px-8 py-2 mt-4 border-2 border-primary shadow-sm text-base font-medium rounded-md text-primary bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <ChevronLeftIcon className="h-5 w-5" /> Back
                </button>
              </div>
            )}
          </form>
        </>
      </div>
    );
  };

  const copySeed = () => {
    return (
      <div className="flex w-1/2 justify-center flex-col items-center">
        <h1 className="font-bold text-xl mb-1">
          Step 3: Save Your Account Recovery Kit
        </h1>
        <p className="mt-1 text-lg font-semibold pb-4 mx-6 mt-4">
          The Account Recovery Kit can be used to recover encrypted data stored
          on your local Impervious database.
        </p>
        <p className="mx-6 pb-4 font-light">
          Please back it up and never share with a third-party (including
          Impervious). We cannot help you recover data in the event of loss.
        </p>
        <div className="relative flex items-start items-center py-4">
          <div className="flex items-center h-5">
            <input
              id="comments"
              aria-describedby="comments-description"
              name="comments"
              type="checkbox"
              value={recoverySeedSaved}
              onChange={(e) => {
                setRecoverySeedSaved(true);
              }}
              className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
            />
          </div>
          <div className="ml-3 text-sm">
            <label
              htmlFor="comments"
              className="text-lg font-bold text-gray-700"
            >
              I have backed up the Account Recovery Kit.
            </label>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white h-screen w-screen px-4 py-16 sm:px-6 sm:py-24 md:grid md:place-items-center lg:px-8">
      <div className="max-w-max mx-auto">
        <main className="sm:flex">
          <div className="sm:ml-6">
            <div className="sm:border-l sm:border-gray-200 sm:pl-6 flex flex-col items-center space-y-4">
              <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">
                Welcome to the Impervious Browser
              </h1>
              <h1 className="text-2xl font-bold text-gray-900 tracking-tight sm:text-2xl">
                Your Portal to the Peer-to-Peer Internet
              </h1>
            </div>
            <div className="pt-4 flex flex-col items-center">
              {showingRecovery
                ? showRecovery()
                : showPasswordScreen
                ? passwordSet
                  ? copySeed()
                  : enterPassword()
                : setupComms()}
              {recoverySeedSaved && (
                <div className="flex w-full justify-center flex-col items-center pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setRecoverySeed("");
                      goToDashboard();
                    }}
                    className="w-1/2 inline-flex items-center px-6 py-3 border-4 border-primary shadow-sm text-base font-medium rounded-md text-primary bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Take me to the Peer to Peer Internet!
                  </button>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Onboard;
