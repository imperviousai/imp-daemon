import { request } from "./axios-utils";

// Utility functions for the contacts management

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
  const { didDocument, name, myDid } = data;
  // each new contact gets a generated, random bighead avatar.
  const randomAvatar = getRandomAvatar();
  const initialMetadata = {
    avatar: randomAvatar,
  };
  return request({
    url: "/v1/contacts/create",
    method: "post",
    data: {
      contact: {
        did: didDocument.id,
        didDocument: JSON.stringify(didDocument),
        name,
        userDID: myDid.id,
        metadata: JSON.stringify(initialMetadata),
      },
    },
    headers: {
      "Grpc-Metadata-X-API-KEY": `${localStorage.getItem("apiKey")}`,
    },
  });
};

export const updateContact = (data) => {
  const { longFormDid, name, existingContact, avatar } = data;
  const updatedContact = existingContact;
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

// the avatar attributes are stored in the DB as a stringified JSON object, need to return
// the real object
export const getContactAvatar = (contact) => {
  if (contact) {
    return contact.metadata.length > 0
      ? JSON.parse(contact.metadata).avatar
      : {};
  } else {
    return {};
  }
};
