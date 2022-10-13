import React, { useState } from "react";
import moment from "moment";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { toast } from "react-toastify";
import {
  useFetchLightningConfig,
  useSaveLightningConfig,
} from "../../hooks/config";
import { createVoltageNode } from "../../utils/voltage";
import { CheckIcon, XIcon, ExclamationIcon } from "@heroicons/react/solid";
import RelaySelectionField from "./RelaySelectionField";
import { useFetchMyDid, useUpdateDid } from "../../hooks/id";
import { didCommRelayEndpoints } from "../../utils/onboard";
import { myDidDocumentAtom } from "../../stores/id";
import { useAtom } from "jotai";
import { relayRequest } from "../../utils/messages";

const RelayLightningSettings = () => {
  const { data } = useFetchLightningConfig();
  const { data: myDid } = useFetchMyDid();
  const { mutate: saveLightningConfig } = useSaveLightningConfig();
  const { mutate: updateMyDid } = useUpdateDid();
  const [myDidDocument] = useAtom(myDidDocumentAtom);

  const [hexMacaroon, setHexMacaroon] = useState("");
  const [nodeName, setNodeName] = useState("");
  const [apiEndpoint, setApiEndpoint] = useState("");
  const [needsDidUpdate, setNeedsDidUpdate] = useState(false);

  const [selectedRelay, setSelectedRelay] = useState(didCommRelayEndpoints[0]);

  // Voltage Creation State
  const [toggleUpdate, setToggleUpdate] = useState(false);
  const [voltageAPIKey, setVoltageAPIKey] = useState("");
  const [nodePassword, setNodePassword] = useState("");
  const [nodeTLS, setNodeTLS] = useState("");
  const [isCreatingNode, setIsCreatingNode] = useState(false);
  const [nodeCreationSuccess, setNodeCreationSuccess] = useState(false);
  const [nodeCreationFailed, setNodeCreationFailed] = useState(false);

  // Update Lightning Node State
  const [ip, setIp] = useState("");
  const [port, setPort] = useState("");
  const [pubkey, setPubkey] = useState("");
  const [adminMacaroon, setAdminMacaroon] = useState("");
  const [tlsCert, setTlsCert] = useState("");
  const [adminMacaroonHex, setAdminMacaroonHex] = useState("");
  const [tlsCertHex, setTLSCertHex] = useState("");
  const [useTLSFilePath, setUseTLSFilePath] = useState(true);
  const [useMacaroonFilePath, setUseMacaroonFilePath] = useState(true);

  const clearVoltageInfo = () => {
    setNodeCreationSuccess(false);
    setNodeCreationFailed(false);
    setNodeName("");
    setHexMacaroon("");
    setApiEndpoint("");
    setNodeTLS("");
  };

  const createNode = () => {
    setIsCreatingNode(true);
    clearVoltageInfo();
    const nodeName = `impervious-node-${moment().unix()}`;
    createVoltageNode(voltageAPIKey, nodeName, nodePassword)
      .then(({ nodeName, apiEndpoint, hexMacaroon, tlsCert }) => {
        setIsCreatingNode(false);
        setNodeCreationSuccess(true);
        console.log("NODE CREATED");
        // store the encrypted macaroon and seed in localstorage for now. should live in a file.
        setHexMacaroon(hexMacaroon);
        setApiEndpoint(apiEndpoint);
        setNodeName(nodeName);
        setNodeTLS(tlsCert);

        // pre-populate the update lightning fields
        setUseTLSFilePath(false);
        setUseMacaroonFilePath(false);
        setIp(apiEndpoint);
        setPort("10009");
        setAdminMacaroonHex(hexMacaroon);
        setTlsCertHex(tlsCert);
      })
      .catch((err) => {
        setIsCreatingNode(false);
        setNodeCreationFailed(true);
        console.log("NODE CREATION FAILED: ", err);
      });
  };

  const clearLightningFields = () => {
    setIp("");
    setPort("");
    setPubkey("");
    setTlsCert("");
    setTLSCertHex("");
    setAdminMacaroonHex("");
    setAdminMacaroon("");
  };

  const isLightningInfoValid = () =>
    ip &&
    port &&
    pubkey &&
    (tlsCert || tlsCertHex) &&
    (adminMacaroon || adminMacaroonHex);

  const removeLightningConfig = () => {
    toast(
      ({ closeToast }) => (
        <div>
          <p className="pb-4">
            Are you sure you want to remove this lightning configuration?
          </p>
          <div className="flex space-x-4">
            <button
              type="button"
              onClick={() => {
                saveLightningConfig({
                  config: {
                    ip: "",
                    port: "",
                    pubkey: "",
                    tlsCert: "",
                    tlsCertHex: "",
                    adminMacaroon: "",
                    adminMacaroonHex: "",
                    listening: false,
                  },
                });
                closeToast();
              }}
              className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Remove
            </button>
            <button
              type="button"
              onClick={closeToast}
              className="inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Cancel
            </button>
          </div>
        </div>
      ),
      { autoClose: false }
    );
  };

  const updateLightningConfig = () => {
    console.log("Updating lightning configuration ...");
    // we'll definitely want to use a proper form for validation here
    if (isLightningInfoValid) {
      saveLightningConfig({
        config: {
          ip,
          port,
          pubkey,
          tlsCert: useTLSFilePath ? tlsCert : "",
          tlsCertHex: useTLSFilePath ? "" : tlsCertHex,
          adminMacaroon: useMacaroonFilePath ? adminMacaroon : "",
          adminMacaroonHex: useMacaroonFilePath ? "" : adminMacaroonHex,
          listening: true,
        },
      });
      // clear the fields
      setToggleUpdate(!toggleUpdate);
      // prompt to update the user's did
      setNeedsDidUpdate(true);
    } else {
      toast.error(
        "Unable to update lightning configuration. Missing required fields."
      );
    }
  };

  const performDidUpdate = () => {
    // perform the actual did update
    let serviceUpdate = myDidDocument.service;

    // remove relay if exists
    // let relayIndex = serviceUpdate.findIndex((service) =>
    //   service.serviceEndpoint.includes("did:")
    // );
    // relayIndex > -1 && serviceUpdate.splice(relayIndex, 1);

    // remove lightning if exists
    let lightningIndex = serviceUpdate.findIndex((service) =>
      service.serviceEndpoint.includes("lightning:")
    );
    lightningIndex > -1 && serviceUpdate.splice(lightningIndex, 1);

    const pushEndpoint = (endpoint) => {
      const len = serviceUpdate.length;
      const newEndpoint = {
        id: `#DidCommMessaging-${len > 0 ? len + 1 : 1}`,
        priority: len,
        recipientKeys: [],
        routingKeys: [],
        serviceEndpoint: endpoint,
        type: "DidCommMessaging",
      };
      serviceUpdate.push(newEndpoint);
    };

    // // add relay endpoint
    // TODO: need to detect for a NEWLY SELECTED relay endpoint, not just the precense of one
    // TODO: update the relay, for now we only support a single relay node
    // selectedRelay.length > 0 && pushEndpoint(selectedRelay);
    pubkey.length > 0 && pushEndpoint(`lightning:${pubkey}`);

    let newDidDocument = myDid;
    newDidDocument.service = serviceUpdate;
    updateMyDid(JSON.stringify(newDidDocument));
    clearLightningFields();
    setNeedsDidUpdate(false);
  };

  const registerRelay = () => {
    relayRequest(selectedRelay)
      .then(() => toast.info("Registered with relay."))
      .catch((err) => {
        toast.error("Unable to register with relay.");
        console.log(err);
      });
  };

  const updateDidPrompt = () => {
    toast(
      ({ closeToast }) => (
        <div>
          <p>{"Are you sure you want to update your DID?"}</p>
          <div className="flex space-x-4">
            <button
              type="button"
              onClick={() => {
                performDidUpdate();
                closeToast();
              }}
              className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Confirm
            </button>
            <button
              type="button"
              onClick={closeToast}
              className="inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Cancel
            </button>
          </div>
        </div>
      ),
      { autoClose: false }
    );
  };

  const removeLightningNode = () => {
    return (
      <div className="space-y-3 py-4">
        <h2 className="text-xl font-medium text-blue-gray-900">
          Remove Lightning Node
        </h2>
        <p className="mt-1 mb-2 text-sm text-blue-gray-500">
          Remove the existing lightning node configuration by pressing the
          button below. You can always add the lightning node back at any point.
        </p>
        <button
          type="button"
          onClick={() => removeLightningConfig()}
          className="mt-3 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        >
          Remove Lightning Node
        </button>
      </div>
    );
  };

  const buildLightningNode = () => {
    return (
      <div className="space-y-3 py-4">
        <h2 className="text-xl font-medium text-blue-gray-900">
          Build a Lightning Node
        </h2>
        <p className="mt-1 mb-2 text-sm text-blue-gray-500">
          Don&apos;t have a lightning node already? Impervious supports creating
          a Voltage Lightning Node via the Voltage API. To get started, supply a
          Voltage API Key and Node Password and we will handle the rest.
        </p>
        <a href="https://voltage.cloud/" className="text-sm text-primary">
          Head over to voltage.cloud if you do not have an API key.
        </a>
        {nodeCreationSuccess && (
          <>
            <div className="flex items-center space-x-2">
              <CheckIcon
                className="h-5 w-5 text-green-400"
                aria-hidden="true"
              />
              <p className="mt-1 text-md font-semibold text-gray-800">
                Voltage Node Created!
              </p>
            </div>
            <div className="w-full break-words">
              <p>
                Your Voltage Node has been created. The following is your
                Voltage Node Configuration Information, use these values to
                update your Lightning Configuration. Click the values below to
                copy to clipboard.{" "}
              </p>
              <CopyToClipboard
                text={nodeName}
                onCopy={() => toast.success("Seed Copied")}
              >
                <p className="my-2">
                  <b>Voltage Node Name: (Click to Copy)</b> {nodeName}
                </p>
              </CopyToClipboard>
              <CopyToClipboard
                text={apiEndpoint}
                onCopy={() => toast.success("Seed Copied")}
              >
                <p className="my-2">
                  <b>Voltage Endpoint: (Click to Copy)</b> {apiEndpoint}
                </p>
              </CopyToClipboard>
              <CopyToClipboard
                text={hexMacaroon}
                onCopy={() => toast.success("Macaroon Copied!")}
              >
                <p className="my-2">
                  <b>Admin Macaroon (Hex): (Click to Copy)</b> {hexMacaroon}
                </p>
              </CopyToClipboard>
              <CopyToClipboard
                text={nodeTLS}
                onCopy={() => toast.success("Macaroon Copied!")}
              >
                <p className="my-2">
                  <b>TLS Cert (Hex): (Click to Copy)</b>{" "}
                  {`${nodeTLS.substring(0, 100)}............${nodeTLS.slice(
                    -100
                  )}`}
                </p>
              </CopyToClipboard>
              <button
                type="button"
                onClick={() => clearVoltageInfo()}
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Good to go. Clear values.
              </button>
            </div>
          </>
        )}
        {nodeCreationFailed && (
          <>
            <div className="flex items-center space-x-2">
              <XIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
              <p className="mt-1 text-md font-semibold text-gray-800">
                Error occured while creating voltage node.
              </p>
            </div>
          </>
        )}
        {!isCreatingNode ? (
          <>
            <div>
              <label
                htmlFor="apiKey"
                className="block text-sm font-medium text-gray-700"
              >
                Supply Voltage API Key
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="endpoint"
                  id="endpoint"
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-2 border-gray-300 rounded-md px-10 py-2 text-center"
                  placeholder="Voltage API Key"
                  value={voltageAPIKey}
                  onChange={(e) => setVoltageAPIKey(e.target.value)}
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="apiKey"
                className="block text-sm font-medium text-gray-700"
              >
                Supply Voltage Node Password
              </label>
              <div className="mt-1">
                <input
                  type="password"
                  name="nodePassword"
                  id="nodePassword"
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-2 border-gray-300 rounded-md px-10 py-2 text-center"
                  placeholder="Password"
                  value={nodePassword}
                  onChange={(e) => setNodePassword(e.target.value)}
                />
              </div>
            </div>
            {nodePassword && voltageAPIKey && (
              <button
                type="button"
                onClick={() => createNode()}
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Create a Voltage Lightning Node
              </button>
            )}
          </>
        ) : (
          <div>Creating Voltage Node ...</div>
        )}
      </div>
    );
  };

  const importLightningNode = () => {
    return (
      <div className="space-y-3 py-4">
        <h2 className="text-xl font-medium text-blue-gray-900">
          Import a Lightning Node
        </h2>
        <p className="mt-1 mb-2 text-sm text-blue-gray-500">
          If you already have a running lightning node, or just created one
          above, enter the configuration information below and Impervious will
          configure itself to use the given lightning node. Note: This restart
          the Impervious daemon services and the application will experience a
          reboot.
        </p>
        <div>
          <label
            htmlFor="ip"
            className="block text-sm font-medium text-gray-700"
          >
            Supply Lightning Endpoint Address
          </label>
          <div className="mt-1">
            <input
              type="text"
              name="ip"
              id="ip"
              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-2 border-gray-300 rounded-md px-10 py-2 text-center"
              placeholder="IP or URI (i.e. xxxxx.t.voltageapp.io)"
              value={ip}
              onChange={(e) => setIp(e.target.value)}
            />
          </div>
        </div>
        <div>
          <label
            htmlFor="port"
            className="block text-sm font-medium text-gray-700"
          >
            Supply Lightning Port (GRPC)
          </label>
          <div className="mt-1">
            <input
              type="text"
              name="port"
              id="port"
              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-2 border-gray-300 rounded-md px-10 py-2 text-center"
              placeholder="Port"
              value={port}
              onChange={(e) => setPort(e.target.value)}
            />
          </div>
        </div>
        <div>
          <label
            htmlFor="pubkey"
            className="block text-sm font-medium text-gray-700"
          >
            Supply Lightning Pubkey (leave blank if it is a Voltage node)
          </label>
          <div className="mt-1">
            <input
              type="text"
              name="pubkey"
              id="pubkey"
              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-2 border-gray-300 rounded-md px-10 py-2 text-center"
              placeholder="Pubkey"
              value={pubkey}
              onChange={(e) => setPubkey(e.target.value)}
            />
          </div>
        </div>
        <span className="relative z-0 inline-flex shadow-sm rounded-md">
          <button
            type="button"
            onClick={() => setUseTLSFilePath(true)}
            className="relative inline-flex items-center px-4 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
          >
            Use TLS Filepath
          </button>
          <button
            type="button"
            onClick={() => setUseTLSFilePath(false)}
            className="-ml-px relative inline-flex items-center px-4 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
          >
            Use TLS Hex String
          </button>
        </span>
        {useTLSFilePath ? (
          <div>
            <label
              htmlFor="tls"
              className="block text-sm font-medium text-gray-700"
            >
              Supply File Path to Lightning TLS Cert
            </label>
            <div className="mt-1">
              <input
                type="text"
                name="tls"
                id="tls"
                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-2 border-gray-300 rounded-md px-10 py-2 text-center"
                placeholder="Provide full path to TLS Cert"
                value={tlsCert}
                onChange={(e) => setTlsCert(e.target.value)}
              />
            </div>
          </div>
        ) : (
          <div>
            <label
              htmlFor="tls"
              className="block text-sm font-medium text-gray-700"
            >
              Supply Lightning TLS Cert (Hex String)
            </label>
            <div className="mt-1">
              <input
                type="text"
                name="tls"
                id="tls"
                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-2 border-gray-300 rounded-md px-10 py-2 text-center"
                placeholder="TLS Cert (Hex)"
                value={tlsCertHex}
                onChange={(e) => setTLSCertHex(e.target.value)}
              />
            </div>
          </div>
        )}
        <span className="relative z-0 inline-flex shadow-sm rounded-md">
          <button
            type="button"
            onClick={() => setUseMacaroonFilePath(true)}
            className="relative inline-flex items-center px-4 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
          >
            Use Macaroon Filepath
          </button>
          <button
            type="button"
            onClick={() => setUseMacaroonFilePath(false)}
            className="-ml-px relative inline-flex items-center px-4 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
          >
            Use Macaroon Hex String
          </button>
        </span>
        {useMacaroonFilePath ? (
          <div>
            <label
              htmlFor="macaroon"
              className="block text-sm font-medium text-gray-700"
            >
              Supply File Path to Admin Macaroon
            </label>
            <div className="mt-1">
              <input
                type="text"
                name="macaroon"
                id="macaroon"
                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-2 border-gray-300 rounded-md px-10 py-2 text-center"
                placeholder="Provide full path to Admin Macaroon"
                value={adminMacaroon}
                onChange={(e) => setAdminMacaroon(e.target.value)}
              />
            </div>
          </div>
        ) : (
          <div>
            <label
              htmlFor="macaroon"
              className="block text-sm font-medium text-gray-700"
            >
              Supply Admin Macaroon (Hex String)
            </label>
            <div className="mt-1">
              <input
                type="text"
                name="macaroon"
                id="macaroon"
                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-2 border-gray-300 rounded-md px-10 py-2 text-center"
                placeholder="Macaroon (Hex)"
                value={adminMacaroonHex}
                onChange={(e) => setAdminMacaroonHex(e.target.value)}
              />
            </div>
          </div>
        )}

        <button
          type="button"
          onClick={() => updateLightningConfig()}
          className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Update Lightning Configuration
        </button>
      </div>
    );
  };

  return (
    <div className="max-w-3xl mx-auto py-10 px-4 sm:px-6 lg:py-12 lg:px-8">
      <h1 className="text-3xl font-extrabold text-blue-gray-900">
        Relay & Lightning
      </h1>

      <form className="mt-6 space-y-8 divide-y divide-y-blue-gray-200">
        <div className="pt-8 grid grid-cols-1 gap-y-6 sm:grid-cols-6 sm:gap-x-6">
          <div className="sm:col-span-6 space-y-3">
            <h2 className="text-xl font-medium text-blue-gray-900">
              Manage Your Relay
            </h2>
            <div className="space-y-3">
              <RelaySelectionField
                selected={selectedRelay}
                setSelected={setSelectedRelay}
              />
            </div>
            <h2 className="text-xl font-medium text-blue-gray-900">
              Register with Relay
            </h2>
            <p className="mt-1 text-sm text-blue-gray-500">
              Register with a new relay or reregister with an existing relay, in
              the event of service interruption.
            </p>
            <button
              type="button"
              onClick={() => registerRelay()}
              className="mt-3 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Register
            </button>
            {/* Divider */}
            <div className="relative py-6">
              <div
                className="absolute inset-0 flex items-center"
                aria-hidden="true"
              >
                <div className="w-full border-t border-gray-300" />
              </div>
            </div>
          </div>
          <div className="sm:col-span-6">
            <h2 className="text-xl font-medium text-blue-gray-900">
              Manage Your Lightning Node
            </h2>
            <p className="mt-1 text-sm text-blue-gray-500">
              This information will be displayed publicly so be careful what you
              share.
            </p>
            {data?.data.lightningConfig.listening && (
              <div>
                <p className="mt-1 text-sm text-blue-gray-500">
                  A lightning node is current configured to listen.
                </p>
                <p className="mt-1 text-sm font-semibold text-blue-gray-500">
                  Existing LN Pubkey: {data?.data.lightningConfig.pubkey}
                </p>
                {JSON.stringify(myDid?.service).includes(
                  data?.data.lightningConfig.pubkey
                ) && (
                  <p className="mt-1 text-sm text-blue-gray-500">
                    This node is already listed in your did.
                  </p>
                )}
              </div>
            )}
            <button
              type="button"
              onClick={() => setToggleUpdate(!toggleUpdate)}
              className="mt-3 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Update Lightning Settings
            </button>
            {toggleUpdate && (
              <>
                {data?.data.lightningConfig.listening && removeLightningNode()}
                {buildLightningNode()}
                {importLightningNode()}
              </>
            )}
          </div>
        </div>

        {needsDidUpdate && (
          <>
            <div className="rounded-md bg-yellow-50 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <ExclamationIcon
                    className="h-5 w-5 text-yellow-400"
                    aria-hidden="true"
                  />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-yellow-800">
                    Change detected! Do you want to update your DID?
                  </h3>
                  <div className="mt-2 text-sm text-yellow-700">
                    <p>
                      Since you have changed your connection endpoints (relay or
                      lightning), if you want users to be able to contact you
                      over these channels you will need to{" "}
                      <b>update your did</b>. Click the button below to update
                      your did.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="pt-8 flex justify-end">
              <button
                type="button"
                onClick={() => setNeedsDidUpdate(false)}
                className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-blue-gray-900 hover:bg-blue-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                Do Not Update
              </button>
              <button
                type="button"
                onClick={() => updateDidPrompt()}
                className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                Update DID
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  );
};

export default RelayLightningSettings;
