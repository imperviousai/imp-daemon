import { getLightningConfig } from "./config";
import { createDid, resolveDid } from "./id";
import { relayRequest } from "./messages";
// Utility functions for onboarding

// --- hardcoded dids and lightning configs to be removed -- //
export const defaultRelayShortForm =
  "did:ion:EiAITr4PsMMKZtoTcED5NsvHW8kQ4fhpUNqkRD9CfdJNJA";
// returns a list of current didcomm relay endpoints provided/supported by Impervious
export const didCommRelayEndpoints = [defaultRelayShortForm];

// make sure to delete the default lightning nodes in mock/lightning.js
// --- ^hardcoded dids and lightning configs to be removed^ -- //

// checks to see if the daemon is already Lightning enabled in its configuration
export const detectLightningConfig = async () => {
  return new Promise(async (resolve, reject) => {
    await getLightningConfig()
      .then((res) => {
        const { lightningConfig } = res.data;
        if (lightningConfig) {
          const { ip, port, pubkey } = lightningConfig;
          // ip, port, and pubkey at least need to be filled to be considered enough to have a lightning config
          // of course, enforcement can be a lot better
          if (ip && port && pubkey) {
            resolve(lightningConfig);
          } else {
            reject("Unable to detect lighting configuration");
          }
        } else {
          reject("Unable to detect lighting configuration");
        }
        lightningConfig
          ? resolve(lightningConfig)
          : reject("Unable to detect lighting configuration");
      })
      .catch((err) => {
        console.log("Unable to detect lightning configuration: ", err);
        reject("Unable to detect lightning configuration.");
      });
  });
};

export const onboard = async ({ lndEndpoint, relayEndpoint }) => {
  const serviceEndpoints = [
    {
      id: "#DidCommMessaging-1",
      type: "DidCommMessaging",
      serviceEndpoint: relayEndpoint,
    },
  ];
  lndEndpoint &&
    serviceEndpoints.push(
      {
        id: "#DidCommMessaging-2",
        type: "DidCommMessaging",
        serviceEndpoint: lndEndpoint,
      },
      {
        id: "#LNPubkey",
        type: "LNPubkey",
        serviceEndpoint: lndEndpoint,
      }
    );
  const didDocument = {
    type: "PEER",
    serviceEndpoints,
  };
  console.log(
    "Preparing to create did, printing did document now",
    didDocument
  );
  return await createDid(didDocument);
};

// mostly for testing
// allows for onboarding with lightning only, assumes the daemon is already connected
// to a lightning endpoints, and already has a lightning endpoint in its configuration
export const onboardWithLightningOnly = async () => {
  return new Promise(async (resolve, reject) => {
    await getLightningConfig()
      .then((res) => {
        const { lightningConfig } = res.data;
        // create a default did up front
        const lndEndpoint = `lightning:${lightningConfig.pubkey}`;
        const didDocument = {
          type: "PEER",
          serviceEndpoints: [
            {
              id: "#LNPubkey",
              type: "LNPubkey",
              serviceEndpoint: lndEndpoint,
            },
            {
              id: "#DidCommMessaging-1",
              type: "DidCommMessaging",
              serviceEndpoint: lndEndpoint,
            },
          ],
        };

        createDid(didDocument).then((res) => {
          const { document } = res.data;
          if (document) resolve(document);
        });
      })
      .catch((err) => reject(err));
  });
};

// mostly for testing
// allows for onbaording with didcomm relay only
export const onboardWithDidCommRelayOnly = async () => {
  const defaultUserDidDocument = {
    type: "PEER",
    serviceEndpoints: [
      {
        id: "#DidCommMessaging-1",
        type: "DidCommMessaging",
        serviceEndpoint: defaultRelayShortForm,
      },
    ],
  };

  return new Promise(async (resolve, reject) => {
    await createDid(defaultUserDidDocument)
      .then((res) => {
        const { document: yourDocument } = res.data;
        return yourDocument;
      })
      .then((yourDocument) => {
        console.log(
          "Your PEER Did has successfully been created: ",
          yourDocument
        );
        console.log("Attempting to register with relay now.");
        return relayRequest(defaultRelayShortForm);
      })
      .then((res) => {
        console.log("Successfully registered to relay.", res.data);
        resolve(res);
      })
      .catch((err) => {
        console.log("Error occured while onboarding: ", err);
        reject(err);
      });
  });
};
