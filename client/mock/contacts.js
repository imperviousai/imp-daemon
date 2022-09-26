import { myDid } from "./messages.js";
export const mockContacts = [
  {
    id: "2",
    did: "did:peer:1zQmew6uQ7ua729axhHUcaJ184AYFveWuFqU54PFdoiBrpea",
    didDocument:
      '{"@context":["https://www.w3.org/ns/did/v1"],"id":"did:peer:1zQmew6uQ7ua729axhHUcaJ184AYFveWuFqU54PFdoiBrpea","verificationMethod":[{"controller":"","id":"#keys-1","publicKeyBase58":"NsjkXUPyxtCzvFiy6KxP6b6jB2VnnekH1x7HvDQ7687HfHTPAScAv3tUc5HK","type":"Ed25519VerificationKey2018"},{"controller":"","id":"#keys-2","publicKeyJwk":{"kty":"EC","crv":"P-384","x":"maT8LUvkeHUFFIOyu0JAM_-P3V8PEAQfPeMQhzNfxkQvn4uyV6Yi1zaOWneonWkO","y":"gNbhTPDWnra3hUTzaPwIy_pGq_8SbwlOETU7RwRfLGe38nxS_ydLLhyaZ2l6ssDH"},"type":"JsonWebKey2020"}],"service":[{"id":"#DidCommMessaging-1","priority":0,"recipientKeys":[],"routingKeys":[],"serviceEndpoint":"lightning:0259f1ab261d25eb3ce37a9d02c0e8e4244d360463cc7ed37cfad5373f183e087b","type":"DidCommMessaging"},{"id":"#LNPubkey","priority":0,"recipientKeys":[],"routingKeys":[],"serviceEndpoint":"lightning:0259f1ab261d25eb3ce37a9d02c0e8e4244d360463cc7ed37cfad5373f183e087b","type":"LNPubkey"}],"authentication":["#keys-1"],"assertionMethod":["#keys-1"],"keyAgreement":["#keys-2"],"created":"2022-03-30T12:40:53.601708-05:00","updated":"2022-03-30T12:40:53.601708-05:00"}',
    name: "Ridgeback",
    userDID: "did:peer:1zQmZ7fGkbrks7p8JJgx2mioVS9aoYaCX3AmLGBt3teT5frK",
    hasContacted: false,
    metadata: "",
  },
  {
    id: "3",
    did: "did:peer:1zQmPit3DYYWYMS9ALTMJ4ztbfNWZnKvHwoj2vL8cz9ELLwJ",
    didDocument:
      '{"@context":["https://www.w3.org/ns/did/v1"],"id":"did:peer:1zQmPit3DYYWYMS9ALTMJ4ztbfNWZnKvHwoj2vL8cz9ELLwJ","verificationMethod":[{"controller":"","id":"#keys-1","publicKeyBase58":"NsjkXUPyxtCzvFiy6KxP6b6jB2VnnekH1x7HvDQ7687HfHTPAScAv3tUc5HK","type":"Ed25519VerificationKey2018"},{"controller":"","id":"#keys-2","publicKeyJwk":{"kty":"EC","crv":"P-384","x":"maT8LUvkeHUFFIOyu0JAM_-P3V8PEAQfPeMQhzNfxkQvn4uyV6Yi1zaOWneonWkO","y":"gNbhTPDWnra3hUTzaPwIy_pGq_8SbwlOETU7RwRfLGe38nxS_ydLLhyaZ2l6ssDH"},"type":"JsonWebKey2020"}],"service":[{"id":"#DidCommMessaging-1","priority":0,"recipientKeys":[],"routingKeys":[],"serviceEndpoint":"lightning:0259f1ab261d25eb3ce37a9d02c0e8e4244d360463cc7ed37cfad5373f183e087b","type":"DidCommMessaging"},{"id":"#LNPubkey","priority":0,"recipientKeys":[],"routingKeys":[],"serviceEndpoint":"lightning:0259f1ab261d25eb3ce37a9d02c0e8e4244d360463cc7ed37cfad5373f183e087b","type":"LNPubkey"}],"authentication":["#keys-1"],"assertionMethod":["#keys-1"],"keyAgreement":["#keys-2"],"created":"2022-03-30T12:40:53.601708-05:00","updated":"2022-03-30T12:40:53.601708-05:00"}',
    name: "Desiree",
    userDID: "did:peer:1zQmZ7fGkbrks7p8JJgx2mioVS9aoYaCX3AmLGBt3teT5frK",
    hasContacted: false,
    metadata: "",
  },
  {
    id: "4",
    did: "did:peer:1zQmV1cJ56Rmts7mY96rGDzzYo21BtKq3GYrVwW4bWm8xbs8",
    didDocument:
      '{"@context":["https://www.w3.org/ns/did/v1"],"id":"did:peer:1zQmV1cJ56Rmts7mY96rGDzzYo21BtKq3GYrVwW4bWm8xbs8","verificationMethod":[{"controller":"","id":"#keys-1","publicKeyBase58":"NsjkXUPyxtCzvFiy6KxP6b6jB2VnnekH1x7HvDQ7687HfHTPAScAv3tUc5HK","type":"Ed25519VerificationKey2018"},{"controller":"","id":"#keys-2","publicKeyJwk":{"kty":"EC","crv":"P-384","x":"maT8LUvkeHUFFIOyu0JAM_-P3V8PEAQfPeMQhzNfxkQvn4uyV6Yi1zaOWneonWkO","y":"gNbhTPDWnra3hUTzaPwIy_pGq_8SbwlOETU7RwRfLGe38nxS_ydLLhyaZ2l6ssDH"},"type":"JsonWebKey2020"}],"service":[{"id":"#DidCommMessaging-1","priority":0,"recipientKeys":[],"routingKeys":[],"serviceEndpoint":"lightning:0259f1ab261d25eb3ce37a9d02c0e8e4244d360463cc7ed37cfad5373f183e087b","type":"DidCommMessaging"},{"id":"#LNPubkey","priority":0,"recipientKeys":[],"routingKeys":[],"serviceEndpoint":"lightning:0259f1ab261d25eb3ce37a9d02c0e8e4244d360463cc7ed37cfad5373f183e087b","type":"LNPubkey"}],"authentication":["#keys-1"],"assertionMethod":["#keys-1"],"keyAgreement":["#keys-2"],"created":"2022-03-30T12:40:53.601708-05:00","updated":"2022-03-30T12:40:53.601708-05:00"}',
    name: "Gavin Belson",
    userDID: "did:peer:1zQmZ7fGkbrks7p8JJgx2mioVS9aoYaCX3AmLGBt3teT5frK",
    hasContacted: false,
    metadata: "",
  },
  {
    id: "5",
    did: "did:peer:1zQmZbGmnWGg3XpSnoToJ7UmmEuspvJGyct6gpi8673oGoEr",
    didDocument:
      '{"@context":["https://www.w3.org/ns/did/v1"],"id":"did:peer:1zQmZbGmnWGg3XpSnoToJ7UmmEuspvJGyct6gpi8673oGoEr","verificationMethod":[{"controller":"","id":"#keys-1","publicKeyBase58":"NsjkXUPyxtCzvFiy6KxP6b6jB2VnnekH1x7HvDQ7687HfHTPAScAv3tUc5HK","type":"Ed25519VerificationKey2018"},{"controller":"","id":"#keys-2","publicKeyJwk":{"kty":"EC","crv":"P-384","x":"maT8LUvkeHUFFIOyu0JAM_-P3V8PEAQfPeMQhzNfxkQvn4uyV6Yi1zaOWneonWkO","y":"gNbhTPDWnra3hUTzaPwIy_pGq_8SbwlOETU7RwRfLGe38nxS_ydLLhyaZ2l6ssDH"},"type":"JsonWebKey2020"}],"service":[{"id":"#DidCommMessaging-1","priority":0,"recipientKeys":[],"routingKeys":[],"serviceEndpoint":"lightning:0259f1ab261d25eb3ce37a9d02c0e8e4244d360463cc7ed37cfad5373f183e087b","type":"DidCommMessaging"},{"id":"#LNPubkey","priority":0,"recipientKeys":[],"routingKeys":[],"serviceEndpoint":"lightning:0259f1ab261d25eb3ce37a9d02c0e8e4244d360463cc7ed37cfad5373f183e087b","type":"LNPubkey"}],"authentication":["#keys-1"],"assertionMethod":["#keys-1"],"keyAgreement":["#keys-2"],"created":"2022-03-30T12:40:53.601708-05:00","updated":"2022-03-30T12:40:53.601708-05:00"}',
    name: "George",
    userDID: "did:peer:1zQmZ7fGkbrks7p8JJgx2mioVS9aoYaCX3AmLGBt3teT5frK",
    hasContacted: false,
    metadata: "",
  },
  {
    id: "66",
    did: "did:peer:1zQmPP8E3wKcwvACsCVkqdigL5EzPBnwgMYbRaebWQFPA3Ej",
    didDocument:
      '{"@context":["https://www.w3.org/ns/did/v1"],"id":"did:peer:1zQmPP8E3wKcwvACsCVkqdigL5EzPBnwgMYbRaebWQFPA3Ej","verificationMethod":[{"controller":"","id":"#keys-1","publicKeyBase58":"NsjkXUPyxtCzvFiy6KxP6b6jB2VnnekH1x7HvDQ7687HfHTPAScAv3tUc5HK","type":"Ed25519VerificationKey2018"},{"controller":"","id":"#keys-2","publicKeyJwk":{"kty":"EC","crv":"P-384","x":"maT8LUvkeHUFFIOyu0JAM_-P3V8PEAQfPeMQhzNfxkQvn4uyV6Yi1zaOWneonWkO","y":"gNbhTPDWnra3hUTzaPwIy_pGq_8SbwlOETU7RwRfLGe38nxS_ydLLhyaZ2l6ssDH"},"type":"JsonWebKey2020"}],"service":[{"id":"#DidCommMessaging-1","priority":0,"recipientKeys":[],"routingKeys":[],"serviceEndpoint":"lightning:0259f1ab261d25eb3ce37a9d02c0e8e4244d360463cc7ed37cfad5373f183e087b","type":"DidCommMessaging"},{"id":"#LNPubkey","priority":0,"recipientKeys":[],"routingKeys":[],"serviceEndpoint":"lightning:0259f1ab261d25eb3ce37a9d02c0e8e4244d360463cc7ed37cfad5373f183e087b","type":"LNPubkey"}],"authentication":["#keys-1"],"assertionMethod":["#keys-1"],"keyAgreement":["#keys-2"],"created":"2022-03-30T12:40:53.601708-05:00","updated":"2022-03-30T12:40:53.601708-05:00"}',
    name: "Team IMP",
    userDID: "did:peer:1zQmZ7fGkbrks7p8JJgx2mioVS9aoYaCX3AmLGBt3teT5frK",
    hasContacted: false,
    metadata: "",
  },
  {
    id: "7",
    did: "did:peer:1zQmSyjPqHwrjF2Z22JWKLh1bjgdiN8FsCvQRPgD3gHvGHSP",
    didDocument:
      '{"@context":["https://www.w3.org/ns/did/v1"],"id":"did:peer:1zQmSyjPqHwrjF2Z22JWKLh1bjgdiN8FsCvQRPgD3gHvGHSP","verificationMethod":[{"controller":"","id":"#keys-1","publicKeyBase58":"NsjkXUPyxtCzvFiy6KxP6b6jB2VnnekH1x7HvDQ7687HfHTPAScAv3tUc5HK","type":"Ed25519VerificationKey2018"},{"controller":"","id":"#keys-2","publicKeyJwk":{"kty":"EC","crv":"P-384","x":"maT8LUvkeHUFFIOyu0JAM_-P3V8PEAQfPeMQhzNfxkQvn4uyV6Yi1zaOWneonWkO","y":"gNbhTPDWnra3hUTzaPwIy_pGq_8SbwlOETU7RwRfLGe38nxS_ydLLhyaZ2l6ssDH"},"type":"JsonWebKey2020"}],"service":[{"id":"#DidCommMessaging-1","priority":0,"recipientKeys":[],"routingKeys":[],"serviceEndpoint":"lightning:0259f1ab261d25eb3ce37a9d02c0e8e4244d360463cc7ed37cfad5373f183e087b","type":"DidCommMessaging"},{"id":"#LNPubkey","priority":0,"recipientKeys":[],"routingKeys":[],"serviceEndpoint":"lightning:0259f1ab261d25eb3ce37a9d02c0e8e4244d360463cc7ed37cfad5373f183e087b","type":"LNPubkey"}],"authentication":["#keys-1"],"assertionMethod":["#keys-1"],"keyAgreement":["#keys-2"],"created":"2022-03-30T12:40:53.601708-05:00","updated":"2022-03-30T12:40:53.601708-05:00"}',
    name: "Tony",
    userDID: "did:peer:1zQmZ7fGkbrks7p8JJgx2mioVS9aoYaCX3AmLGBt3teT5frK",
    hasContacted: false,
    metadata: "",
  },
  {
    id: "8",
    did: "did:peer:1zQmNsQG2bztVyoMiqern7gpKH7UtgyLS15avyjKgDCtHSK3",
    didDocument:
      '{"@context":["https://www.w3.org/ns/did/v1"],"id":"did:peer:1zQmNsQG2bztVyoMiqern7gpKH7UtgyLS15avyjKgDCtHSK3","verificationMethod":[{"controller":"","id":"#keys-1","publicKeyBase58":"NsjkXUPyxtCzvFiy6KxP6b6jB2VnnekH1x7HvDQ7687HfHTPAScAv3tUc5HK","type":"Ed25519VerificationKey2018"},{"controller":"","id":"#keys-2","publicKeyJwk":{"kty":"EC","crv":"P-384","x":"maT8LUvkeHUFFIOyu0JAM_-P3V8PEAQfPeMQhzNfxkQvn4uyV6Yi1zaOWneonWkO","y":"gNbhTPDWnra3hUTzaPwIy_pGq_8SbwlOETU7RwRfLGe38nxS_ydLLhyaZ2l6ssDH"},"type":"JsonWebKey2020"}],"service":[{"id":"#DidCommMessaging-1","priority":0,"recipientKeys":[],"routingKeys":[],"serviceEndpoint":"lightning:0259f1ab261d25eb3ce37a9d02c0e8e4244d360463cc7ed37cfad5373f183e087b","type":"DidCommMessaging"},{"id":"#LNPubkey","priority":0,"recipientKeys":[],"routingKeys":[],"serviceEndpoint":"lightning:0259f1ab261d25eb3ce37a9d02c0e8e4244d360463cc7ed37cfad5373f183e087b","type":"LNPubkey"}],"authentication":["#keys-1"],"assertionMethod":["#keys-1"],"keyAgreement":["#keys-2"],"created":"2022-03-30T12:40:53.601708-05:00","updated":"2022-03-30T12:40:53.601708-05:00"}',
    name: "Stew",
    userDID: "did:peer:1zQmZ7fGkbrks7p8JJgx2mioVS9aoYaCX3AmLGBt3teT5frK",
    hasContacted: false,
    metadata: "",
  },
  {
    id: "9",
    did: "did:peer:1zQmbNxfpUYptF3bj37ozpYJAEjL61icXQwybg6krgrNKZy4",
    didDocument:
      '{"@context":["https://www.w3.org/ns/did/v1"],"id":"did:peer:1zQmbNxfpUYptF3bj37ozpYJAEjL61icXQwybg6krgrNKZy4","verificationMethod":[{"controller":"","id":"#keys-1","publicKeyBase58":"NsjkXUPyxtCzvFiy6KxP6b6jB2VnnekH1x7HvDQ7687HfHTPAScAv3tUc5HK","type":"Ed25519VerificationKey2018"},{"controller":"","id":"#keys-2","publicKeyJwk":{"kty":"EC","crv":"P-384","x":"maT8LUvkeHUFFIOyu0JAM_-P3V8PEAQfPeMQhzNfxkQvn4uyV6Yi1zaOWneonWkO","y":"gNbhTPDWnra3hUTzaPwIy_pGq_8SbwlOETU7RwRfLGe38nxS_ydLLhyaZ2l6ssDH"},"type":"JsonWebKey2020"}],"service":[{"id":"#DidCommMessaging-1","priority":0,"recipientKeys":[],"routingKeys":[],"serviceEndpoint":"lightning:0259f1ab261d25eb3ce37a9d02c0e8e4244d360463cc7ed37cfad5373f183e087b","type":"DidCommMessaging"},{"id":"#LNPubkey","priority":0,"recipientKeys":[],"routingKeys":[],"serviceEndpoint":"lightning:0259f1ab261d25eb3ce37a9d02c0e8e4244d360463cc7ed37cfad5373f183e087b","type":"LNPubkey"}],"authentication":["#keys-1"],"assertionMethod":["#keys-1"],"keyAgreement":["#keys-2"],"created":"2022-03-30T12:40:53.601708-05:00","updated":"2022-03-30T12:40:53.601708-05:00"}',
    name: "Erin",
    userDID: "did:peer:1zQmZ7fGkbrks7p8JJgx2mioVS9aoYaCX3AmLGBt3teT5frK",
    hasContacted: false,
    metadata: "",
  },
];
