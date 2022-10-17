import React from "react";
import { DownloadIcon } from "@heroicons/react/solid";
import { trigger } from "../../utils/events";
import { saveAs } from "file-saver";
import { filesize } from "filesize";

export const FileDownload = ({ message, myDid, fileObj }) => {
  const downloadFile = () => {
    const { id, name, type } = message.data;
    if (fileObj) {
      saveAs(fileObj, name);
      return;
    }
    trigger("file-download-request", { id, name, type });
  };

  return (
    <div className="bg-white px-4 py-5 border-2 border-gray-200 rounded-lg sm:px-6 mt-6">
      <div className="-ml-4 -mt-4 flex justify-between items-center flex-wrap sm:flex-nowrap">
        <div className="ml-4 mt-4">
          <div className="flex space-x-2 items-center">
            <div className="flex flex-col">
              <h3 className="text-md leading-6 break-all font-medium text-gray-900">
                {message.data ? message.data.name : "No File Name"}
              </h3>
              <p className="mt-1 text-sm font-light text-gray-500">
                {message.data && `(${filesize(message.data.size)})`}
              </p>
            </div>
          </div>
        </div>
        <div className="ml-4 mt-4 flex-shrink-0">
          {message.from !== myDid && (
            <button
              type="button"
              onClick={() => downloadFile()}
              className="relative inline-flex items-center px-4 py-2 text-sm font-medium rounded-md text-gray-500 hover:text-black"
            >
              <DownloadIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default FileDownload;
