import { useState, useEffect } from "react";
import { useQuery, useMutation, gql } from "@apollo/client";
import { GET_DID_BY_TWITTER } from "./../../utils/contacts";
import { createDID, updateDID, deleteDID } from "../../src/graphql/mutations";
import { toast } from "react-toastify";
import { CheckCircleIcon } from "@heroicons/react/solid";
import { LockClosedIcon } from "@heroicons/react/outline";
import { useAuth0 } from "@auth0/auth0-react";
import { useFetchMyDid } from "../../hooks/id";
import { useAtom } from "jotai";
import { publishedDidAtom, myDidLongFormDocumentAtom } from "../../stores/id";

function Identity({ longFormDid }) {
  const [publishedDid, setPublishedDid] = useAtom(publishedDidAtom);
  const { user } = useAuth0();
  const { data: myDid } = useFetchMyDid();
  const [myDidLongFormDocument] = useAtom(myDidLongFormDocumentAtom);

  const { data, loading, error } = useQuery(GET_DID_BY_TWITTER, {
    variables: { username: user?.nickname },
  });

  useEffect(() => {
    if (data?.listDIDS?.items?.length > 0) {
      setPublishedDid(data.listDIDS.items[0]);
    } else {
      setPublishedDid("");
    }
  }, [data, setPublishedDid]);

  const [publishDid] = useMutation(gql(createDID), {
    variables: {
      input: {
        longFormDid: myDidLongFormDocument,
        shortFormDid: myDid?.id,
        username: user?.nickname,
        avatarUrl: user?.picture,
        name: user?.nickname,
        lastUpdated: new Date().getTime(),
        profileType: "twitter",
      },
    },
    refetchQueries: [{ query: GET_DID_BY_TWITTER }, "getDIDByTwitter"],
  });

  const [updateDid] = useMutation(gql(updateDID), {
    variables: {
      input: {
        longFormDid: myDidLongFormDocument,
        shortFormDid: myDid?.id,
        username: user?.nickname,
        avatarUrl: user?.picture,
        name: user?.nickname,
        lastUpdated: new Date().getTime(),
        profileType: "twitter",
      },
    },
    refetchQueries: [{ query: GET_DID_BY_TWITTER }, "getDIDByTwitter"],
  });

  const [deleteDid] = useMutation(gql(deleteDID), {
    variables: {
      input: {
        shortFormDid: publishedDid.shortFormDid,
        username: publishedDid.username,
      },
    },
    refetchQueries: [{ query: GET_DID_BY_TWITTER }, "getDIDByTwitter"],
  });

  if (loading) return "Loading ...";

  const publish = () => {
    toast(
      ({ closeToast }) => (
        <div>
          <p className="pb-4">
            Are you sure you want to update your published DID?
          </p>
          <div className="flex space-x-4">
            <button
              type="button"
              onClick={() => {
                try {
                  // TODO: handle the actual graphql mutation
                  if (user) {
                    publishDid()
                      .then(({ data }) => {
                        toast.success("DID Published Successfuly");
                      })
                      .catch((err) => {
                        console.log(err);
                        toast.error("Unable to publish DID. Please try again");
                      });
                  }
                } catch (e) {
                  console.log(e);
                }
                closeToast();
              }}
              className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Confirm
            </button>
            <button
              type="button"
              onClick={closeToast}
              className="inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Cancel
            </button>
          </div>
        </div>
      ),
      { autoClose: false }
    );
  };

  const update = () => {
    toast(
      ({ closeToast }) => (
        <div>
          <p className="pb-4">
            Are you sure you want to update your published DID?
          </p>
          <div className="flex space-x-4">
            <button
              type="button"
              onClick={() => {
                try {
                  // TODO: handle the actual graphql mutation
                  if (user) {
                    updateDid()
                      .then(() => {
                        toast.success("DID Sucessfully Updated!");
                      })
                      .catch((e) => {
                        toast.error("Unable to update DID. Please try again");
                        console.error(e);
                      });
                  }
                } catch (e) {
                  console.log(e);
                }
                closeToast();
              }}
              className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Confirm
            </button>
            <button
              type="button"
              onClick={closeToast}
              className="inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Cancel
            </button>
          </div>
        </div>
      ),
      { autoClose: false }
    );
  };

  const handlePublish = async () => {
    try {
      // TODO: handle the actual graphql mutation
      if (user) {
        publishedDid ? update() : publish();
      }
    } catch (e) {
      console.log(e);
    }
  };

  const unpublish = async () => {
    toast(
      ({ closeToast }) => (
        <div>
          <p className="pb-4">Unpublish?</p>
          <div className="flex space-x-4">
            <button
              type="button"
              onClick={() => {
                try {
                  // TODO: handle the actual graphql mutation
                  if (user) {
                    deleteDid()
                      .then(() => {
                        toast.success("DID Sucessfully Unpublished!");
                      })
                      .catch((e) => {
                        toast.error("Unable to publish DID. Please try again");
                        console.error(e);
                      });
                  }
                } catch (e) {
                  console.log(e);
                }
                closeToast();
              }}
              className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Confirm
            </button>
            <button
              type="button"
              onClick={closeToast}
              className="inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Cancel
            </button>
          </div>
        </div>
      ),
      { autoClose: false }
    );
  };

  if (loading) return "Loading ...";

  return (
    <div>
      <div>
        <div className="bg-white shadow overflow-hidden sm:rounded-md mt-4">
          <ul role="list" className="divide-y divide-gray-200">
            {/* future proof for multi did support */}
            <li>
              <div className="flex items-center px-4 py-4 sm:px-6 content-between">
                <div className="w-full flex justify-between">
                  <div className="flex items-center space-x-4">
                    {publishedDid && (
                      <img
                        className="inline-block h-8 w-8 rounded-full"
                        src={publishedDid.avatarUrl}
                        alt=""
                      />
                    )}
                    <p className="font-semi-bold text-md">Identity</p>
                    {publishedDid ? (
                      <p className="flex items-center text-sm text-gray-500">
                        <CheckCircleIcon
                          className="flex-shrink-0 mr-1.5 h-5 w-5 text-green-400"
                          aria-hidden="true"
                        />
                        Published
                      </p>
                    ) : (
                      <p className="flex items-center text-sm text-gray-500">
                        <LockClosedIcon
                          className="flex-shrink-0 mr-1.5 h-5 w-5"
                          aria-hidden="true"
                        />
                        Private
                      </p>
                    )}
                  </div>
                  <div className="flex space-x-4">
                    {publishedDid && (
                      <button
                        type="button"
                        className="text-red-500"
                        onClick={() => unpublish()}
                      >
                        Unpublish
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => handlePublish()}
                      className="inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      {publishedDid ? "Update" : "Publish"}
                    </button>
                    {/* <button
                  type="button"
                  className="inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Unpublish
                </button> */}
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Identity;
