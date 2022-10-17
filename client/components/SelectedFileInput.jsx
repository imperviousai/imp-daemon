import React from "react";
import { XIcon } from "@heroicons/react/solid";
import { TailSpin } from "react-loader-spinner";
import { ExclamationCircleIcon } from "@heroicons/react/outline";
import { toast } from "react-toastify";
import { filesize } from "filesize";

function SelectedFileInput({ fileInput, setFileInput, progress }) {
  const removeFile = () => setFileInput();

  const renderFileState = (progress) => {
    if (progress > 0) {
      return (
        <TailSpin height="20" width="20" color="#312e81" ariaLabel="loading" />
      );
    } else if (fileInput.isError) {
      return (
        <ExclamationCircleIcon
          onClick={() => {
            toast.error("Unable to upload file. Please try again.");
            removeFile(file.id);
          }}
          className="h-6 w-6 text-red-600"
          aria-hidden="true"
        />
      );
    } else {
      return (
        <button
          type="button"
          className="bg-white rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          onClick={() => removeFile()}
        >
          <span className="sr-only">Close</span>
          <XIcon className="h-5 w-5" aria-hidden="true" />
        </button>
      );
    }
  };

  return (
    <div>
      {" "}
      <div className="my-3 max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden">
        <div className="p-4">
          <div className="flex items-center">
            <div className="w-0 flex-1 flex justify-between">
              <p className="w-0 flex-1 text-sm font-medium text-gray-900">
                {fileInput.name}{" "}
                <span className="font-light text-gray-500">
                  ({filesize(fileInput.size)})
                </span>
              </p>
            </div>
            <div className="ml-4 flex-shrink-0 flex">{renderFileState()}</div>
          </div>
          {progress > 0 && (
            <div className="flex items-center pt-2">
              <div className="w-full bg-gray-200 rounded-full dark:bg-gray-700 mx-20">
                <div
                  className="bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full"
                  style={{ width: `${Math.floor(progress)}%` }}
                >
                  {" "}
                  {Math.floor(progress)}%
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SelectedFileInput;
