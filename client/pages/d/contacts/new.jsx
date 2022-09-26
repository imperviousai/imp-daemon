import MainNavigation from "../../../components/MainNavigation";
import ComingSoon from "../../../components/ComingSoon";
import { useCallback, useEffect, useState } from "react";
import { DocumentTextIcon } from "@heroicons/react/solid";
import { toast } from "react-toastify";
import { createDid, importDid, fetchDids } from "../../../utils/id";
import { useRouter } from "next/dist/client/router";

export default function CreateContact() {
  const [selectedDid, setSelectedDids] = useState();
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      fetchDids()
        .then((res) => {
          const dids = res.data.documents.map((did) => JSON.parse(did));
          let did = dids.find((did) => did.id === id);
          if (did) {
            setSelectedDids(did);
            setDidInput(JSON.stringify(did));
            handleTextArea(JSON.stringify(did));
          }
        })
        .catch((err) => console.log(err));
    }
  }, [setSelectedDids, id, handleTextArea]);

  const [uploadFile, setUploadFile] = useState();
  const [didInput, setDidInput] = useState("");
  const [didFormatStatus, setDidFormatStatus] = useState();
  const [toggleEditorType, setToggleEditorType] = useState("raw");

  function formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return "0 Bytes";

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  }

  const isValidDid = (did) =>
    // should probably add additional levels of did here validation
    did.type || did.id
      ? // (did.serviceEndpoints || did.service) &&
        // (Array.isArray(did.serviceEndpoints) || Array.isArray(did.service))
        true
      : false;

  const createAndSaveContact = (did) => {
    const d = JSON.parse(did);
    if (d.id) {
      // must be an already created did, import this did
      importDid(did)
        .then((res) => {
          toast.success("Document imported successfully!");
          setDidInput("");
          setUploadFile(undefined);
          console.log("Document successfully imported", res);
        })
        .catch((err) => {
          toast.error("Error importing contact. Please try again.");
          console.log(err);
        });
    }
    if (d.type) {
      // must be a new did, create this did from scratch
      createDid(did)
        .then((res) => {
          toast.success("Document saved successfully!");
          setDidInput("");
          setUploadFile(undefined);
          console.log("Document successfully saved", res);
        })
        .catch((err) => {
          toast.error("Error saving contact. Please try again.");
          console.log(err);
        });
    }
  };

  const parseInput = (content) => {
    // parse the content from either did or text editor to make sure it's structured correctly
    try {
      let did = JSON.parse(content);
      if (isValidDid(did)) {
        setDidInput(JSON.stringify(did));
        setDidFormatStatus(true);
      } else {
        throw "Object is not formatted correctly";
      }
    } catch (e) {
      setDidFormatStatus(false);
      setUploadFile(undefined);
      toast.error(
        "Uh oh! Input isn't formatted correctly. Please try again with a new file."
      );
    }
  };

  const handleFileUpload = (file) => {
    if (file.type && file.type !== "text/plain") {
      toast.error("Invalid File Type. Must be a text file.");
      setUploadFile(undefined);
      return;
    }

    setUploadFile(file);
    const reader = new FileReader();
    reader.onloadend = (e) => {
      const content = e.target.result;
      parseInput(content);
    };
    reader.readAsText(file);
  };

  const handleTextArea = useCallback((input) => {
    setDidInput(input);
    try {
      let did = JSON.parse(input);
      if (isValidDid(did)) {
        setDidFormatStatus(true);
      } else {
        setDidFormatStatus(false);
      }
    } catch (e) {
      setDidFormatStatus(false);
      return;
    }
  }, []);

  const renderUploadForm = () => {
    return (
      <div className="space-y-1 text-center">
        <svg
          className="mx-auto h-12 w-12 text-gray-400"
          stroke="currentColor"
          fill="none"
          viewBox="0 0 48 48"
          aria-hidden="true"
        >
          <path
            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <div className="flex text-sm text-gray-600">
          <label
            htmlFor="file-upload"
            className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
          >
            <span>Upload a file</span>
            <input
              id="file-upload"
              name="file-upload"
              type="file"
              className="sr-only"
              onChange={(e) => {
                e.target.files && handleFileUpload(e.target.files[0]);
              }}
            />
          </label>
          <p className="pl-1">or drag and drop</p>
        </div>
        <p className="text-xs text-gray-500">Files may take awhile to upload</p>
      </div>
    );
  };

  const renderFileToUpload = (file) => {
    return (
      <div className="space-y-1 text-center">
        <DocumentTextIcon className="mx-auto h-12 w-12 text-gray-400" />
        {didFormatStatus && (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-green-100 text-green-800">
            Valid
          </span>
        )}

        <div className="flex flex-col text-md text-gray-600">
          <div>
            {file.name} ({formatBytes(file.size)})
          </div>
          <div className="pt-4">
            <button
              type="button"
              onClick={() => setUploadFile(undefined)}
              className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <MainNavigation hideNav={false} currentPage="">
      <div className="px-8 pt-8 flex flex-col space-y-6 2xl:mx-64">
        {/* Upload a file here */}
        {didFormatStatus === true && (
          <div className="self-end flex">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-green-100 text-green-800 mr-6 ">
              Contact is formatted correctly!
            </span>
            <button
              type="button"
              disabled={didFormatStatus !== true}
              onClick={() => createAndSaveContact(didInput)}
              className="inline-flex items-center px-4 py-2 ml-4border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {selectedDid ? "Update Contact" : "Save Contact"}
            </button>
          </div>
        )}
        {/* did editor coming soon */}
        <div className="self-center">
          <span className="relative z-0 inline-flex shadow-sm rounded-md space-x-4">
            <button
              type="button"
              onClick={() => setToggleEditorType("raw")}
              className={`relative inline-flex items-center px-4 py-2 rounded-l-md border border-gray-300 ${
                toggleEditorType === "raw"
                  ? "bg-indigo-500 text-white"
                  : "bg-white text-gray-700 "
              } text-sm font-medium focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500`}
            >
              Add New Contact/DID
            </button>
            <button
              type="button"
              onClick={() => setToggleEditorType("editor")}
              className={`-ml-px relative inline-flex items-center px-4 py-2 rounded-r-md border border-gray-300 ${
                toggleEditorType === "editor"
                  ? "bg-indigo-500 text-white"
                  : "bg-white text-gray-700"
              } text-sm font-medium focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500`}
            >
              DID Creator
            </button>
          </span>
        </div>
        {toggleEditorType === "raw" && (
          <>
            <div>
              <label className="block text-lg font-medium text-gray-700">
                Upload a Decentralized Identity
              </label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                {uploadFile
                  ? renderFileToUpload(uploadFile)
                  : renderUploadForm()}
              </div>
            </div>
            <div className="relative">
              <div
                className="absolute inset-0 flex items-center"
                aria-hidden="true"
              >
                <div className="w-full border-t border-gray-300" />
              </div>
            </div>
            <div>
              <div>
                <label
                  htmlFor="comment"
                  className="block text-lg font-medium text-gray-700"
                >
                  Paste a Decentralized Identity
                </label>
                <div className="mt-1">
                  <textarea
                    rows={4}
                    name="did"
                    id="did"
                    className={`shadow-sm ${
                      didFormatStatus === true
                        ? "border-green-500 border-2"
                        : "border-gray-300"
                    }  block w-full sm:text-sm rounded-md h-80`}
                    value={didInput}
                    onChange={(e) => handleTextArea(e.target.value)}
                    disabled={uploadFile}
                  />
                </div>
              </div>
            </div>
          </>
        )}

        {toggleEditorType === "editor" && (
          <>
            <ComingSoon />
          </>
        )}
      </div>
    </MainNavigation>
  );
}
