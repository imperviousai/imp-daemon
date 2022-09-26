import axios from "axios";
import crypto from "crypto-js";

// ruthlessly copied this from https://docs.voltage.cloud/api/creating-a-node-example
// much love to the Voltage Team!
export const createVoltageNode = async (apiKey, nodeName, nodePassword) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log("Creating your node...", nodeName);

      const voltageHeaders = {
        "X-VOLTAGE-AUTH": apiKey,
        "Access-Control-Allow-Origin": "true",
      };

      let nodeApi;
      let nodeStatus;

      // Create the Node
      const creationBody = {
        network: "testnet",
        purchased_type: "ondemand",
        type: "standard",
        name: nodeName,
        settings: {
          alias: nodeName,
          autocompaction: false,
          autopilot: false,
          color: "#EF820D",
          grpc: true,
          keysend: true,
          rest: true,
          whitelist: ["1.2.3.4"],
          wumbo: true,
        },
      };
      let response = await makeRequest(
        "POST",
        "https://api.voltage.cloud/node/create",
        creationBody,
        voltageHeaders
      );
      let nodeId = response.node_id;
      let apiEndpoint = response.api_endpoint;
      console.log("Created the node: " + nodeId);

      // Wait until the node is waiting_init
      do {
        let statusBody = {
          node_id: nodeId,
        };
        let response = await makeRequest(
          "POST",
          "https://api.voltage.cloud/node",
          statusBody,
          voltageHeaders
        );
        nodeStatus = response.status;
        nodeApi = response.api_endpoint;
        console.log("Found node's status of " + nodeStatus);

        // Wait 5 seconds before checking again
        await new Promise((r) => setTimeout(r, 5000));
      } while (nodeStatus !== "waiting_init");

      // Get a seed for the node
      response = await makeRequest(
        "GET",
        "https://" + nodeApi + ":8080/v1/genseed",
        {},
        {}
      );
      let seedPhrase = response.cipher_seed_mnemonic;
      console.log("Got seed phrase: " + seedPhrase);

      // Initialize the node
      console.log("Initializing wallet with password: " + nodePassword);
      let initBody = {
        wallet_password: Buffer.from(nodePassword).toString("base64"),
        cipher_seed_mnemonic: seedPhrase,
        stateless_init: true,
      };
      response = await makeRequest(
        "POST",
        "https://" + nodeApi + ":8080/v1/initwallet",
        initBody,
        {}
      );
      let nodeMacaroon = response.admin_macaroon;
      console.log("Got Node's Macaroon: " + nodeMacaroon);

      // Encrypt the Macaroon and Seed
      let encryptedSeed = crypto.AES.encrypt(
        Buffer.from(seedPhrase.join(",")).toString("base64"),
        nodePassword
      ).toString();

      let encryptedMacaroon = crypto.AES.encrypt(
        nodeMacaroon,
        nodePassword
      ).toString();

      // Backup Seed and Macaroon
      let macBody = {
        node_id: nodeId,
        macaroon: encryptedMacaroon,
        name: "admin",
      };
      response = await makeRequest(
        "POST",
        "https://api.voltage.cloud/node/macaroon",
        macBody,
        voltageHeaders
      );
      console.log("Uploaded macaroon");

      let seedBackBody = {
        node_id: nodeId,
        seed: encryptedSeed,
      };
      response = await makeRequest(
        "POST",
        "https://api.voltage.cloud/node/upload_seed",
        seedBackBody,
        voltageHeaders
      );
      console.log("Uploaded seed");

      console.log("Successfully created your node!");
      const hexMacaroon = crypto.enc.Base64.parse(nodeMacaroon).toString(
        crypto.enc.Hex
      );
      // console.log("raw nodeMacaroon to hex: ", hexMacaroon);

      console.log("Grabbing the TLS cert for newly created node.");
      let tlsBody = {
        node_id: nodeId,
      };
      response = await makeRequest(
        "POST",
        "https://api.voltage.cloud/node/cert",
        tlsBody,
        voltageHeaders
      );

      const tlsCert = crypto.enc.Base64.parse(response.tls_cert).toString(
        crypto.enc.Hex
      );
      // console.log("Retreived the TLS certificate: ", tlsCert);

      resolve({
        nodeName,
        apiEndpoint,
        hexMacaroon,
        tlsCert,
      });
    } catch (e) {
      console.log("Unable to create your node: ", e);
      reject(e);
    }
  });
};

const makeRequest = (method, url, data, headers) => {
  return new Promise((resolve, reject) => {
    axios({
      method,
      url,
      headers,
      data,
    })
      .then((response) => {
        let result = response.data;
        resolve(result);
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
};
