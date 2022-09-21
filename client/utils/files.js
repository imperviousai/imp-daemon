import { request } from "./axios-utils";
import { fileTypeFromBuffer } from "file-type";

// Utility functions for file management
export const fetchFiles = () => {
  return request({
    url: "/v1/ipfs/list",
    method: "get",
    headers: {
      "Grpc-Metadata-X-API-KEY": `${localStorage.getItem("apiKey")}`,
    },
  });
};

export const uploadFile = (file) => {
  const reader = new window.FileReader();
  reader.readAsArrayBuffer(file);
  reader.onloadend = () => {
    // console.log("Buffer data: ", Buffer(reader.result));
    const byteArray = btoa(Buffer(reader.result));
    let data = {
      name: file.name,
      data: byteArray,
      updatable: false,
    };
    return request({
      url: "/v1/ipfs/add",
      method: "post",
      data,
      headers: {
        "Grpc-Metadata-X-API-KEY": `${localStorage.getItem("apiKey")}`,
      },
    });
  };
};

export const fetchFileById = (id) => {
  return request({
    url: `/v1/ipfs/${id}`,
    method: "get",
    headers: {
      "Grpc-Metadata-X-API-KEY": `${localStorage.getItem("apiKey")}`,
    },
  });
};

export const detectFile = async (byteString, cid) => {
  if (byteString.substring(0, 20).includes("<!DOCTYPE html>")) {
    // checking for html files by header
    const file = new File([byteString], cid, {
      type: "text/html",
    });
    return file;
  }

  // checking for binary files (i.e. video)
  let bytes = byteString.split(",");
  let byteArray = new Uint8Array(bytes.length);
  for (var i = 0; i < bytes.length; i++) {
    byteArray[i] = bytes[i];
  }
  const fileType = await fileTypeFromBuffer(byteArray);
  if (fileType) {
    console.log("FILETYPE: ", fileType);
    // must be a readable binary file (i.e. videos)
    const file = new File([byteArray], cid, {
      type: fileType ? fileType.mime : "",
    });
    return file;
  }

  // consider everything else a plain text file and render accordingly
  // check for raw text files
  const file = new File([byteString], cid, {
    type: "text/plain",
  });
  return file;
};
