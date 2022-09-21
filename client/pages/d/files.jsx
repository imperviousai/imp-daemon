import { useEffect, useState, useContext, useCallback } from "react";
import SortDropDown from "../../components/SortDropDown";
import MainNavigation from "../../components/MainNavigation";
import { DocumentTextIcon } from "@heroicons/react/solid";
import { toast } from "react-toastify";
import { useFetchFiles, useUploadFile } from "../../hooks/files";
import { detectFile, fetchFileById } from "../../utils/files";

import Link from "next/link";

const pageTitle = "IPFS";

const pages = [{ name: pageTitle, href: "/d/files", current: false }];
const timeFilter = [{ title: "Newest" }, { title: "Oldest" }];
const typeFilter = [
  { title: "All Files" },
  { title: "Audio" },
  { title: "Video" },
  { title: "Text" },
];

function formatBytes(bytes, decimals = 2) {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
}

export default function Files() {
  const [uploadFile, setUploadFile] = useState();
  const [showFiles, setShowFiles] = useState([]);

  const fetchFilesSuccess = (data) => {
    setShowFiles([]);
    data?.data.files.forEach((cid) => {
      cid = cid.split("/")[2];
      fetchFileById(cid).then(async (res) => {
        let byteString = atob(res.data.data);
        const file = await detectFile(byteString, cid);
        console.log(file);
        if (file) {
          setShowFiles((old) => [...old, file]);
        }
      });
    });
  };
  const { data } = useFetchFiles(fetchFilesSuccess);
  const onSuccess = () => {
    toast.success("File uploaded!");
    setUploadFile();
  };
  const onError = () =>
    toast.error("Error uploading file. Please try again later.");
  const { mutate: uploadToIPFS } = useUploadFile(onSuccess, onError);

  const pushToIPFS = async () => {
    // show loading spinner to indicate uploading status since API calls seems to hang when file successfully uploads
    if (uploadFile) {
      // const file = btoa(uploadFile);
      uploadToIPFS(uploadFile);
    } else {
      toast.error("No file selected. Please select a file to upload to IPFS.");
    }
  };

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
              onChange={
                (e) => e.target.files && setUploadFile(e.target.files[0])
                // console.log(e.target.files)
              }
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
        <div className="flex flex-col text-md text-gray-600">
          <div>
            {file.name} ({formatBytes(file.size)})
          </div>
          <div className="flex space-x-4 pt-4">
            <button
              type="button"
              onClick={() => setUploadFile(undefined)}
              className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={async () => await pushToIPFS()}
              className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Upload to IPFS
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <MainNavigation currentPage={pageTitle} hideNav={false}>
      {/* BODY GOES HERE  */}
      {/* Files table (small breakpoint and up) */}

      <div className="px-8 pt-8">
        <div className="flex flex-row-reverse pb-8">
          <SortDropDown title="Sort By: Newest" options={timeFilter} />
          <SortDropDown title="All Files" options={typeFilter} />
        </div>
        {/* Upload a file here */}
        <div className="pb-4">
          <label className="block text-sm font-medium text-gray-700">
            Upload a new file
          </label>
          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
            {uploadFile ? renderFileToUpload(uploadFile) : renderUploadForm()}
          </div>
        </div>
        <div className="flex flex-col">
          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider"
                      >
                        Name
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider"
                      >
                        Type
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider"
                      >
                        Address
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider"
                      >
                        Date
                      </th>
                      <th scope="col" className="relative px-6 py-3">
                        <span className="sr-only">Edit</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {showFiles.length > 0 &&
                      showFiles.map((file, i) => (
                        <tr key={i}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">
                                  {file && file.name}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {file && file.type}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {file && file.name}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                              Status
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <Link
                              href={`/d/files/${file && file.name}`}
                              passHref
                            >
                              <a
                                href=""
                                className="text-gray-600 hover:text-gray-900"
                              >
                                View
                              </a>
                            </Link>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainNavigation>
  );
}
