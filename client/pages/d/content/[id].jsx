import React, { useCallback } from "react";
import MainNavigation from "../../../components/MainNavigation";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState, useRef, useEffect } from "react";
import { DownloadIcon, XIcon } from "@heroicons/react/outline";
import { CalendarIcon, PencilIcon, MenuIcon } from "@heroicons/react/solid";
import { BigHead } from "@bigheads/core";
import RichTextEditor from "../../../components/RichTextEditor";
import { ChevronLeftIcon } from "@heroicons/react/outline";
import Link from "next/link";
import { useRouter } from "next/router";
import { QuillDeltaToHtmlConverter } from "quill-delta-to-html";
import ReactHtmlParser from "react-html-parser";
import { toast } from "react-toastify";
import DisplayParticipants from "../../../components/meeting/DisplayParticipants";
import { useAtom } from "jotai";
import {
  currentLiveDocsAtom,
  activeLiveDocsPeersAtom,
  draftStore,
  draftLocalStateStore,
} from "../../../stores/peers";
import { useUploadFile } from "../../../hooks/files";
import { useFetchMyDid } from "../../../hooks/id";
import { useFetchContacts } from "../../../hooks/contacts";
import moment from "moment";
import { getContactAvatar } from "../../../utils/contacts";
import { saveAs } from "file-saver";
import { updateDocTitle } from "../../../utils/content";
import { on, off, trigger } from "../../../utils/events";

const pageTitle = "Live Docs";

const downloadFileTypes = ["docx", "pdf", "html"];

function NewDocument() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isAutoSaving, setIsAutoSaving] = useState(false);
  const [openParticipants, setOpenParticipants] = useState(false);
  const [pageHeader, setPageHeader] = useState("");
  const [showPreview, setShowPreview] = useState(false);
  const [hasDraftState, setHasDraftState] = useState(false);

  const [draft, setDraft] = useState();

  const [peers] = useAtom(activeLiveDocsPeersAtom);
  const [, setCurrentLiveDocId] = useAtom(currentLiveDocsAtom);

  const { mutate: uploadToIPFS } = useUploadFile();
  const { data: myDid } = useFetchMyDid();
  const { data: contactsRes } = useFetchContacts();

  const router = useRouter();

  const getContact = (did) => {
    const c = contactsRes?.data.contacts.find((c) => c.did === did);
    if (c) {
      return c.name;
    } else {
      return "Unknown";
    }
  };

  // id is the id fo the live document
  const { id } = router.query;

  useEffect(() => {
    draftLocalStateStore.iterate((v, key, i) => {
      if (key === id) {
        setHasDraftState(true);
      }
    });
  }, [id, peers]);

  useEffect(() => {
    if (id) {
      setCurrentLiveDocId(id);
      draftStore
        .getItem(id)
        .then((doc) => setDraft(doc))
        .catch((err) => console.log("Unable to retrieve document"));
    }
  }, [id, setCurrentLiveDocId]);

  const titleUpdateHandler = useCallback(
    ({ detail: { title, docId } }) => {
      if (id === docId) {
        setPageHeader(title);
      }
    },
    [id]
  );

  useEffect(() => {
    on("quill-delta-title-update", titleUpdateHandler);

    return () => {
      off("quill-delta-title-update", titleUpdateHandler);
    };
  }, [titleUpdateHandler]);

  const documentRef = useRef();

  const showAutoSave = () => {
    setIsAutoSaving(true);
    setTimeout(() => setIsAutoSaving(false), 1000);
  };

  const getQuillHTML = () => {
    const editor = documentRef.current;
    const delta = editor.getContents();
    const cfg = {
      encodeHtml: true,
      inlineStyles: {
        font: {
          serif: "font-family: Georgia, Times New Roman, serif",
          monospace: "font-family: Monaco, Courier New, monospace",
        },
        size: {
          small: "font-size: 0.75em",
          large: "font-size: 1.5em",
          huge: "font-size: 2.5em",
        },
        indent: (value, op) => {
          var indentSize = parseInt(value, 10) * 3;
          var side = op.attributes["direction"] === "rtl" ? "right" : "left";
          return "padding-" + side + ":" + indentSize + "em";
        },
        direction: (value, op) => {
          if (value === "rtl") {
            return (
              "direction:rtl" +
              (op.attributes["align"] ? "" : "; text-align: inherit")
            );
          } else {
            return "";
          }
        },
      },
    };
    let converter = new QuillDeltaToHtmlConverter(delta.ops, cfg);
    let html = converter.convert();
    return html;
  };

  const downloadHTML = () => {
    let html = `<!DOCTYPE html><html>${getQuillHTML()}</html>`;
    var file = new File([html], `${pageHeader}.html`, {
      type: "text/html",
    });
    saveAs(file, `${pageHeader.length ? pageHeader : id}.html`);
  };

  const downloadPDF = async () => {
    const editor = documentRef.current;
    const delta = editor.getContents();
    // needs to be dynamically imported. ran into "Reference Error: self is not defined"
    const { pdfExporter } = await import("quill-to-pdf");
    const pdfAsBlob = await pdfExporter.generatePdf(delta);
    saveAs(pdfAsBlob, `${pageHeader.length ? pageHeader : id}.pdf`);
  };

  const downloadWord = async () => {
    const editor = documentRef.current;
    const delta = editor.getContents();
    // needs to be dynamically imported. ran into "Reference Error: self is not defined"
    const quillToWordConfig = {
      exportAs: "blob",
    };
    const quillToWord = await import("quill-to-word");
    const docAsBlob = await quillToWord.generateWord(delta, quillToWordConfig);
    saveAs(docAsBlob, `${pageHeader.length ? pageHeader : id}.docx`);
  };

  const downloadDocumentAs = (type) => {
    type === "html" && downloadHTML();
    type === "pdf" && downloadPDF();
    type === "docx" && downloadWord();
  };

  // Disabled for now
  // const publishFileToIPFS = () => {
  // let html = `<!DOCTYPE html><html>${getQuillHTML()}</html>`;
  // var fileObj = new File([html], `${pageHeader}.html`, {
  //   type: "text/html",
  // });
  //   console.log(fileObj);
  //   uploadToIPFS(fileObj);
  //   // needs severe styling but it'll work
  // };

  useEffect(() => {
    draftStore
      .getItem(id)
      .then((doc) => doc && doc.title && setPageHeader(doc.title));
  }, [id]);

  const deleteDraft = () => {
    toast(
      ({ closeToast }) => (
        <div>
          <p className="pb-4">Delete this file?</p>
          <div className="flex space-x-4">
            <button
              type="button"
              onClick={() => {
                draftStore.removeItem(id).then(() => {
                  router.back();
                  toast.success("Document removed.");
                  closeToast();
                });
              }}
              className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Delete
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

  const publishDocumentConfirm = () => {
    toast(
      ({ closeToast }) => (
        <div>
          <p className="pb-4">Save this file?</p>
          <div className="flex space-x-4">
            <button
              type="button"
              onClick={() => {
                publishFileToIPFS();
                toast.success("Document published.");
                closeToast();
              }}
              className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Save
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

  const removePeerConnection = (peer) => {
    toast(
      ({ closeToast }) => (
        <div>
          <p className="pb-4 text-bold">Disconnect with this user?</p>
          <div className="flex space-x-4">
            <button
              type="button"
              onClick={() => {
                peer.peer.destroy();
                closeToast();
              }}
              className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Disconnect
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

  const restoreDocument = () => {
    toast(
      ({ closeToast }) => (
        <div>
          <p className="pb-4">Restore this document?</p>
          <div className="flex space-x-4">
            <button
              type="button"
              onClick={() => {
                trigger("restore-document-draft", { id });
                closeToast();
              }}
              className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Restore
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

  const deleteDocumentState = () => {
    toast(
      ({ closeToast }) => (
        <div>
          <p className="pb-4">Delete document state?</p>
          <div className="flex space-x-4">
            <button
              type="button"
              onClick={() => {
                setHasDraftState(false);
                draftLocalStateStore.removeItem(id);
                closeToast();
              }}
              className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Restore
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

  const downloadDocument = () => {
    toast(
      ({ closeToast }) => (
        <div>
          <div className="pb-4 flex flex-col w-full justify-center">
            <p className="pb-4 text-grey-900">Save As ...</p>
            <span className="relative z-0 inline-flex shadow-sm rounded-md">
              {downloadFileTypes.map((type, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => downloadDocumentAs(type)}
                  className="-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <p className="font-semibold">{type.toUpperCase()}</p>
                </button>
              ))}
            </span>
          </div>
        </div>
      ),
      { autoClose: false }
    );
  };

  const DisplayPreview = () => {
    const [html, setHtml] = useState("");

    useEffect(() => {
      if (documentRef.current) {
        let html = getQuillHTML();
        setHtml(html);
      }
    }, []);
    return <div className="pt-4">{ReactHtmlParser(html)}</div>;
  };

  const DocumentSidebar = () => {
    return (
      <>
        <div className="space-y-5">
          <div className="mt-4 flex space-x-3 md:mt-0">
            <button
              type="button"
              onClick={() => downloadDocument()}
              className="w-full inline-flex justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
            >
              <DownloadIcon
                className="-ml-1 mr-2 h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
              <span>Save/Download</span>
            </button>
          </div>
          <div className="mt-4 flex space-x-3 md:mt-0">
            <button
              type="button"
              onClick={() => setShowPreview(!showPreview)}
              className="inline-flex justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
            >
              <PencilIcon
                className="-ml-1 mr-2 h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
              <span>{showPreview ? "Edit" : "Preview"}</span>
            </button>
            <button
              type="button"
              onClick={() => deleteDraft()} // for testing
              className="inline-flex justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
            >
              <XIcon
                className="-ml-1 mr-2 h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
              <span>Delete</span>
            </button>
          </div>
          <div className="flex flex-col space-y-3">
            {/* <p className="mt-2 text-sm text-gray-500">
              Owned by{" "}
              <a href="#" className="font-medium text-gray-900">
                {`${draft?.owner ? getContact(draft.owner) : "You"}`}{" "}
              </a>
            </p> */}
            {/* <p className="text-green-700 text-sm font-medium">Published</p> */}
            <p className="text-sm font-light text-grey-500">
              Draft {isAutoSaving && "(Saving ...)"}
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <button
              type="button"
              onClick={() => setOpenParticipants(true)}
              className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-primary hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Invite Collaborators
            </button>
          </div>
          <div className="flex items-center space-x-2">
            <CalendarIcon
              className="h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
            <span className="text-gray-900 text-sm font-medium">
              Created on {`${moment(draft?.created).format("MM.DD.YYYY")}`}
            </span>
          </div>
        </div>
        <div className="mt-6 border-t border-gray-200 py-6 space-y-8">
          {hasDraftState && (
            <div>
              <h2 className="text-sm font-medium text-gray-500">
                About to connect to a user? We saved a copy of your work in case
                you need to reset the document to this point in time.
              </h2>
              <div className="flex items-center space-x-2 pt-4">
                <button
                  type="button"
                  onClick={restoreDocument}
                  className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-primary hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Restore
                </button>
                <button
                  type="button"
                  onClick={deleteDocumentState}
                  className="inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          <div>
            <h2 className="text-sm font-medium text-gray-500">
              Connected Users
            </h2>
            <ul role="list" className="mt-3 space-y-3">
              {peers.map((peer, i) => (
                <li key={i} className="flex justify-start group">
                  <a href="#" className="flex items-center space-x-3">
                    <div className="flex-shrink-0">
                      <BigHead
                        className="h-5 w-5"
                        {...getContactAvatar(peer.metadata.contact)}
                      />
                    </div>
                    <div className="text-sm font-medium text-gray-900">
                      {peer.metadata.contact.name}
                    </div>
                    <XIcon
                      className="h-5 w-5 text-red-300 hidden group-hover:block"
                      onClick={() => removePeerConnection(peer)}
                    />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </>
    );
  };
  const updatePageHeader = (title) => {
    updateDocTitle(title, id);
    setPageHeader(title);
    // send an update to all the peers connected
    peers.forEach((p) => {
      if (p.peer.connected) {
        p.peer.write(
          JSON.stringify({
            type: "quill-delta-title-update",
            from: myDid?.id,
            data: { title, id },
            timestamp: new Date().toString(),
            networkId: id,
          })
        );
      }
    });
  };

  return (
    <div className="bg-white">
      <MainNavigation currentPage={pageTitle}>
        <DisplayParticipants
          open={openParticipants}
          setOpen={setOpenParticipants}
          networkId={id}
          localStream={false}
          title="Invite Users to Collaborate With"
          subtitle="Invite people to work on this document with."
          type="doc-collab-request"
        />
        <div>
          <Transition.Root show={sidebarOpen} as={Fragment}>
            <Dialog
              as="div"
              className="fixed inset-0 flex z-40 md:hidden"
              onClose={setSidebarOpen}
            >
              <Transition.Child
                as={Fragment}
                enter="transition-opacity ease-linear duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity ease-linear duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-75" />
              </Transition.Child>
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute top-0 right-0 -mr-12 pt-2">
                      <button
                        type="button"
                        className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                        onClick={() => setSidebarOpen(false)}
                      >
                        <span className="sr-only">Close sidebar</span>
                        <XIcon
                          className="h-6 w-6 text-white"
                          aria-hidden="true"
                        />
                      </button>
                    </div>
                  </Transition.Child>
                  <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
                    <nav className="mt-5 px-2 space-y-1 pl-8">
                      <DocumentSidebar />
                    </nav>
                  </div>
                </div>
              </Transition.Child>
              <div className="flex-shrink-0 w-14">
                {/* Force sidebar to shrink to fit close icon */}
              </div>
            </Dialog>
          </Transition.Root>
          {/* Static sidebar for desktop */}
          <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:right-0">
            {/* Sidebar component, swap this element with another sidebar if you like */}
            <div className="flex-1 flex flex-col min-h-0 border-r border-gray-200">
              <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
                <nav className="mt-5 flex-1 px-2 space-y-1 border-l">
                  <DocumentSidebar />
                </nav>
              </div>
            </div>
          </div>
          <div className="md:pr-64 flex flex-col flex-1">
            <div className="sticky top-0 z-10 md:hidden pl-1 pt-1 sm:pl-3 sm:pt-3 flex justify-between">
              <Link href="/d/content" passHref={true}>
                <button
                  type="button"
                  className="mt-2.5 ml-2.5 inline-flex items-center mb-4 px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm hover:bg-gray-200 text-primary hover:text-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <ChevronLeftIcon className="w-6 h-6" />
                </button>
              </Link>
              <button
                type="button"
                className="-ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                onClick={() => setSidebarOpen(true)}
              >
                <span className="sr-only">Open sidebar</span>
                <MenuIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <main className="flex-1">
              <div className="pt-1 pb-6">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                  <Link href="/d/content" passHref={true}>
                    <button
                      type="button"
                      className="hidden md:flex mt-2.5 ml-2.5 inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm hover:bg-gray-200 text-primary hover:text-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      <ChevronLeftIcon className="w-6 h-6" />
                    </button>
                  </Link>
                </div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-48 flex flex-col">
                  {/* Document Header */}
                  <input
                    className="text-2xl font-medium text-gray-900 w-full pt-2"
                    defaultValue={pageHeader}
                    value={pageHeader}
                    onChange={(e) => updatePageHeader(e.target.value)}
                    placeholder="Title"
                  />
                  {/* Replace with your content */}
                  <div className="pb-3 xl:pb-0">
                    {showPreview ? (
                      <DisplayPreview />
                    ) : (
                      <RichTextEditor
                        docId={id}
                        documentRef={documentRef}
                        showAutoSave={showAutoSave}
                        peers={peers}
                        myDid={myDid}
                      />
                    )}
                  </div>
                  {/* /End replace */}
                </div>
              </div>
            </main>
          </div>
        </div>
      </MainNavigation>
    </div>
  );
}

export default NewDocument;
