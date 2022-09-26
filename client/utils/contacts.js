import { request } from "./axios-utils";
import { gql } from "@apollo/client";

// Utility functions for the contacts management
export const ALGOLIA_ID = "2AT1J9F6CY";
export const ALGOLIA_API_KEY = "87c6424da600d8a843e353e17b27ecfa"; // not a sensitive token, just the public Algolia Search-Only API Key
export const ALGOLIA_DID_INDEX = "did_registry";

// Used to generate random avatars using bighead.io
const bigHeadAttributes = {
  accessory: ["none", "roundGlasses", "tinyGlasses", "shades"],
  body: ["chest", "breasts"],
  circleColor: ["blue"],
  clothing: ["naked", "shirt", "dressShirt", "vneck", "tankTop", "dress"],
  clothingColor: ["white", "blue", "black", "green", "red"],
  eyebrows: ["raised", "leftLowered", "serious", "angry", "concerned"],
  eyes: [
    "normal",
    "leftTwitch",
    "happy",
    "content",
    "squint",
    "simple",
    "dizzy",
    "wink",
    "heart",
  ],
  facialHair: ["none", "none2", "none3", "stubble", "mediumBeard"],
  graphic: ["none", "redwood", "gatsby", "vue", "react", "graphQL"],
  hair: [
    "none",
    "long",
    "bun",
    "short",
    "pixie",
    "balding",
    "buzz",
    "afro",
    "bob",
  ],
  hairColor: ["blonde", "orange", "black", "white", "brown", "blue", "pink"],
  hat: ["none", "none2", "none3", "none4", "none5", "beanie", "turban"],
  hatColor: ["white", "blue", "black", "green", "red"],
  lashes: ["true", "false"],
  lipColor: ["red", "purple", "pink", "turqoise", "green"],
  mask: [false],
  faceMask: [false],
  mouth: ["grin", "sad", "openSmile", "lips", "open", "serious", "tongue"],
  skinTone: ["light", "yellow", "brown", "dark", "red", "black"],
};

export const fetchContacts = () => {
  return request({
    url: "/v1/contacts",
    method: "get",
    headers: {
      "Grpc-Metadata-X-API-KEY": `${localStorage.getItem("apiKey")}`,
    },
  });
};

export const addContact = (data) => {
  // data structure should be
  // data = {
  //     didDocument - didDocument of the contact
  //     name - supply a name/nickname for the contact
  // }
  const { didDocument, name, myDid, twitterUsername, avatarUrl } = data;
  // each new contact gets a generated, random bighead avatar.
  const randomAvatar = getRandomAvatar();
  const metadata = JSON.stringify({
    avatar: randomAvatar,
    twitterUsername: twitterUsername || "",
    avatarUrl: avatarUrl || "",
  });
  return request({
    url: "/v1/contacts/create",
    method: "post",
    data: {
      contact: {
        did: didDocument.id,
        didDocument: JSON.stringify(didDocument),
        name,
        userDID: myDid.id,
        metadata,
      },
    },
    headers: {
      "Grpc-Metadata-X-API-KEY": `${localStorage.getItem("apiKey")}`,
    },
  });
};

export const updateContact = (data) => {
  const {
    longFormDid,
    name,
    existingContact,
    avatar,
    twitterUsername,
    avatarUrl,
  } = data;
  const updatedContact = existingContact;
  if (twitterUsername) updatedContact = { ...updatedContact, twitterUsername };
  if (avatarUrl) updatedContact = { ...updatedContact, avatarUrl };
  if (name) updatedContact = { ...updatedContact, name };
  if (longFormDid) updatedContact = { ...updatedContact, did: longFormDid };
  if (avatar) {
    let updatedMetadata = JSON.parse(existingContact.metadata);
    updatedMetadata.avatar = avatar;
    updatedContact = {
      ...updatedContact,
      metadata: JSON.stringify(updatedMetadata),
    };
  }

  return request({
    url: "/v1/contacts/update",
    method: "post",
    data: { contact: updatedContact },
    headers: {
      "Grpc-Metadata-X-API-KEY": `${localStorage.getItem("apiKey")}`,
    },
  });
};

export const fetchContactById = (id) => {
  return request({
    url: `/v1/contacts/${id}`,
    method: "get",
    headers: {
      "Grpc-Metadata-X-API-KEY": `${localStorage.getItem("apiKey")}`,
    },
  });
};

export const deleteContactById = (id) => {
  console.log(id);
  return request({
    url: `/v1/contacts/${id}`,
    method: "delete",
    headers: {
      "Grpc-Metadata-X-API-KEY": `${localStorage.getItem("apiKey")}`,
    },
  });
};

export const getRandomAvatar = () => {
  let result = {};
  Object.keys(bigHeadAttributes).forEach((key) => {
    let arr = bigHeadAttributes[key];
    result[key] = arr[Math.floor(Math.random() * arr.length)];
  });
  return result;
};

export const GET_DID_BY_TWITTER = gql`
  query getDIDByTwitter($twitterUsername: String!) {
    listDIDS(filter: { twitterUsername: { eq: $twitterUsername } }, limit: 1) {
      items {
        avatarUrl
        id
        lastUpdated
        longFormDid
        shortFormDid
        name
        twitterUsername
      }
    }
  }
`;

// getContactByDid will attempt to return a contact associated with the given did. If there is not a saved contact,
// we will return an unknown contact object instead
// TODO: perform automatic lookups in algolia for the contact, if the contact is not saved
export const getContactByDid = ({ shortFormDid, contacts }) => {
  let c = contacts.find((contact) => contact.did === shortFormDid);
  if (!c) {
    return {
      did: shortFormDid,
      name: "Unknown",
      hasContacts: false,
      metadata: JSON.stringify({
        avatar: getRandomAvatar(),
        avatarUrl: "",
      }),
    };
  }
  return c;
};

// getContactsbyMessage returns a list of contacts (excluding you) per recipient (did) that are in a given messsage
// if the recipient does not have a saved contact, we return an "unknown contact"
// TODO: perform automatic lookups in algolia for the contact, if the contact is not saved yet
export const getContactsByMessage = ({ message, contacts, myDid }) => {
  let f = message.recipients.filter((r) => r !== myDid.id);
  return f.map((recipient) => {
    if (recipient !== myDid.id) {
      return getContactByDid({ shortFormDid: recipient, contacts });
    }
  });
};
