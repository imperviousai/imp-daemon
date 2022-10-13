import { exposeWorker } from "react-hooks-worker";
import { request } from "../utils/axios-utils";

const relayMailbox = (input) => {
  const [toDID, apiKey] = input.split("%");
  request({
    url: "/v1/relay/mailbox",
    method: "post",
    data: { toDID, amount: 10, privateServiceEndpoints: [] },
    headers: {
      "Grpc-Metadata-X-API-KEY": `${apiKey.replaceAll('"', "")}`,
    },
  })
    .then((res) => console.log("Mailbox successfully fetched: ", res))
    .catch((err) => console.error("Unable to fetch mailbox: ", err));
};

const fetchMailbox = (input) => setInterval(() => relayMailbox(input), 30000);

exposeWorker(fetchMailbox);
