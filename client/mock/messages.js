export const myDid =
  "did:peer:1zQmZ7fGkbrks7p8JJgx2mioVS9aoYaCX3AmLGBt3teT5frKdfsfs";

// dark green are mock messages between two actual people to get a convo started
// light green are mock messages between fake people to emulate a convo
export const mockMessages = [
  {
    id: "bffd2296-b33d-4809-9416-f1fbe7fbc023",
    type: "https://didcomm.org/basicmessage/2.0/message",
    recipients: [
      "did:peer:1zQmew6uQ7ua729axhHUcaJ184AYFveWuFqU54PFdoiBrpea",
      myDid,
    ],
    data: `{"typ":"application/didcomm-plain+json","id":"bffd2296-b33d-4809-9416-f1fbe7fbc023","thid":"","pthid":"","type":"https://didcomm.org/basicmessage/2.0/message","from":"did:peer:1zQmew6uQ7ua729axhHUcaJ184AYFveWuFqU54PFdoiBrpea","to":["${myDid}"],"created_time":1648662195,"expires_time":0,"body":{"content":"You ever look up at the stars and think that aliens are looking back at us?"},"attachments":null}`,
    transport: "lightning",
  },
  {
    id: "2027a0da-c4d6-4fcd-9579-5c1e9399a804",
    type: "https://didcomm.org/basicmessage/2.0/message",
    recipients: [
      "did:peer:1zQmPit3DYYWYMS9ALTMJ4ztbfNWZnKvHwoj2vL8cz9ELLwJ",
      myDid,
    ],
    data: `{"typ":"application/didcomm-plain+json","id":"bffd2296-b33d-4809-9416-f1fbe7fbc023","thid":"","pthid":"","type":"https://didcomm.org/basicmessage/2.0/message","from":"did:peer:1zQmPit3DYYWYMS9ALTMJ4ztbfNWZnKvHwoj2vL8cz9ELLwJ","to":["${myDid}"],"created_time":1648662196,"expires_time":0,"body":{"content":"MOAR cat pics, pleaz!"},"attachments":null}`,
    transport: "lightning",
  },
  {
    id: "0880e7c6-5c50-4786-bdbc-5ce45303a5b5",
    type: "https://didcomm.org/basicmessage/2.0/message",
    recipients: [
      "did:peer:1zQmV1cJ56Rmts7mY96rGDzzYo21BtKq3GYrVwW4bWm8xbs8",
      myDid,
    ],
    data: `{"typ":"application/didcomm-plain+json","id":"bffd2296-b33d-4809-9416-f1fbe7fbc023","thid":"","pthid":"","type":"https://didcomm.org/basicmessage/2.0/message","from":"did:peer:1zQmV1cJ56Rmts7mY96rGDzzYo21BtKq3GYrVwW4bWm8xbs8","to":["${myDid}"],"created_time":1648662197,"expires_time":0,"body":{"content":"This would go wonderfully in our Signature Box 2! Please call me back…"},"attachments":null}`,
    transport: "lightning",
  },
  {
    id: "8ae98a16-87ae-40c2-b3ab-72c44f7546d3",
    type: "https://didcomm.org/basicmessage/2.0/message",
    recipients: [
      "did:peer:1zQmPP8E3wKcwvACsCVkqdigL5EzPBnwgMYbRaebWQFPA3Ej",
      myDid,
    ],
    data: `{"typ":"application/didcomm-plain+json","id":"bffd2296-b33d-4809-9416-f1fbe7fbc023","thid":"","pthid":"","type":"https://didcomm.org/basicmessage/2.0/message","from":"did:peer:1zQmPP8E3wKcwvACsCVkqdigL5EzPBnwgMYbRaebWQFPA3Ej","to":["${myDid}"],"created_time":1648662198,"expires_time":0,"body":{"content":"Is Gavin also bothering you guys?"},"attachments":null}`,
    transport: "lightning",
  },
  {
    id: "ec46f9a6-3c27-4ce6-98dc-7e7cfe306df1",
    type: "https://didcomm.org/basicmessage/2.0/message",
    recipients: [
      "did:peer:1zQmSyjPqHwrjF2Z22JWKLh1bjgdiN8FsCvQRPgD3gHvGHSP",
      myDid,
    ],
    data: `{"typ":"application/didcomm-plain+json","id":"bffd2296-b33d-4809-9416-f1fbe7fbc023","thid":"","pthid":"","type":"https://didcomm.org/basicmessage/2.0/message","from":"did:peer:1zQmSyjPqHwrjF2Z22JWKLh1bjgdiN8FsCvQRPgD3gHvGHSP","to":["${myDid}"],"created_time":1648662199,"expires_time":0,"body":{"content":"Yes, DIDComm mediators can act as relays to receive an onion-encrypted message."},"attachments":null}`,
    transport: "lightning",
  },
  {
    id: "696d8e62-fe74-4fb8-81e0-1fcfb520a9a8",
    type: "https://didcomm.org/basicmessage/2.0/message",
    recipients: [
      "did:peer:1zQmZbGmnWGg3XpSnoToJ7UmmEuspvJGyct6gpi8673oGoEr",
      myDid,
    ],
    data: `{"typ":"application/didcomm-plain+json","id":"bffd2296-b33d-4809-9416-f1fbe7fbc023","thid":"","pthid":"","type":"https://didcomm.org/basicmessage/2.0/message","from":"did:peer:1zQmZbGmnWGg3XpSnoToJ7UmmEuspvJGyct6gpi8673oGoEr","to":["${myDid}"],"created_time":1648662200,"expires_time":0,"body":{"content":"That was one of the lesser known facts about the First Peloponnesian War."},"attachments":null}`,
    transport: "lightning",
  },
  {
    id: "ec46f9a6-3c27-4ce6-98dc-7e7cfe306df1",
    type: "https://didcomm.org/basicmessage/2.0/message",
    recipients: [
      "did:peer:1zQmNsQG2bztVyoMiqern7gpKH7UtgyLS15avyjKgDCtHSK3",
      myDid,
    ],
    data: `{"typ":"application/didcomm-plain+json","id":"bffd2296-b33d-4809-9416-f1fbe7fbc023","thid":"","pthid":"","type":"https://didcomm.org/basicmessage/2.0/message","from":"did:peer:1zQmNsQG2bztVyoMiqern7gpKH7UtgyLS15avyjKgDCtHSK3","to":["${myDid}"],"created_time":1648662200,"expires_time":0,"body":{"content":"I am the Walrus."},"attachments":null}`,
    transport: "lightning",
  },
  {
    id: "ec46f9a6-3c27-4ce6-98dc-7e7cfe306df1",
    type: "https://didcomm.org/basicmessage/2.0/message",
    recipients: [
      "did:peer:1zQmbNxfpUYptF3bj37ozpYJAEjL61icXQwybg6krgrNKZy4",
      myDid,
    ],
    data: `{"typ":"application/didcomm-plain+json","id":"bffd2296-b33d-4809-9416-f1fbe7fbc023","thid":"","pthid":"","type":"https://didcomm.org/basicmessage/2.0/message","from":"did:peer:1zQmbNxfpUYptF3bj37ozpYJAEjL61icXQwybg6krgrNKZy4","to":["${myDid}"],"created_time":1648662201,"expires_time":0,"body":{"content":"Intermediaries, be gone!"},"attachments":null}`,
    transport: "lightning",
  },
];
