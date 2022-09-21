import { useState, useEffect } from "react";
import { MenuIcon, RefreshIcon } from "@heroicons/react/outline";
import {
  ChatAlt2Icon,
  ChevronLeftIcon,
  PencilAltIcon,
  SearchIcon,
  VideoCameraIcon,
  XCircleIcon,
} from "@heroicons/react/solid";
import { BigHead } from "@bigheads/core";
import { toast } from "react-toastify";
import { CopyToClipboard } from "react-copy-to-clipboard";
import AddContactSlideOut from "../../components/contact/AddContactSlideOut";
import {
  useFetchContacts,
  useUpdateContact,
  useDeleteContactById,
} from "../../hooks/contacts";
import { getContactAvatar, getRandomAvatar } from "../../utils/contacts";

const tabs = [{ name: "Contact Info", href: "#", current: true }];

const categories = "abcdefghijklmnopqrstuvwxyz1234567890";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
import MainNavigation from "../../components/MainNavigation";
import { BsLightningChargeFill } from "react-icons/bs";

const pageTitle = "Contacts";

export const ContactView = ({
  selectedContact,
  setOpenAddContactForm,
  setSelectedContact,
}) => {
  const [showAvatarSave, setShowAvatarSave] = useState(false);
  const [currentAvatar, setCurrentAvatar] = useState({});

  const { mutate: deleteContactById } = useDeleteContactById();

  const onSuccess = () => toast.success("Avatar saved!");
  const onError = () =>
    toast.error("Error saving avatar. Please try again later.");
  const { mutate: updateContact } = useUpdateContact(onSuccess, onError);

  useEffect(() => {
    if (selectedContact) {
      setCurrentAvatar({ ...getContactAvatar(selectedContact) });
    }
  }, [selectedContact]);

  const handleAvatarRotation = () => {
    setShowAvatarSave(true);
    setCurrentAvatar({ ...getRandomAvatar() });
  };

  const cancelAvatarSave = () => {
    setShowAvatarSave(false);
    setCurrentAvatar({ ...getContactAvatar(selectedContact) });
  };

  const saveNewAvatar = () => {
    updateContact({ existingContact: selectedContact, avatar: currentAvatar });
    setShowAvatarSave(false);
  };

  const onSuccessDelete = () => {
    toast.success("Contact successfully deleted!");
    setSelectedContact("");
  };

  const onErrorDelete = (error) => {
    toast.error("Failed to delete contact. Please try again.");
    console.log("Failed to delete contact. Error: ", error);
  };

  const deleteContactConfirm = (contact) => {
    toast(
      ({ closeToast }) => (
        <div>
          <p className="pb-4">Delete this contact?</p>
          <div className="flex space-x-4">
            <button
              type="button"
              onClick={() => {
                deleteContactById(contact.id, {
                  onSuccess: onSuccessDelete,
                  onError: onErrorDelete,
                });
                closeToast();
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

  return (
    <article>
      {/* Profile header */}
      <div>
        <div className="pb-12 flex flex-col items-center">
          <div className="flex flex-col items-center">
            <BigHead
              {...currentAvatar}
              className="h-32 w-full object-cover lg:h-48"
            />
            <button
              type="button"
              onClick={() => handleAvatarRotation()}
              className="pt-2"
            >
              <RefreshIcon
                className="-ml-1 mr-2 h-6 w-6 text-gray-900"
                aria-hidden="true"
              />
            </button>
            {showAvatarSave && (
              <div className="flex space-x-2 pt-4">
                <button
                  type="button"
                  onClick={() => cancelAvatarSave()}
                  className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => saveNewAvatar()}
                  className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Save
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="-mt-12 sm:-mt-16 sm:flex sm:items-end sm:space-x-5">
            <div className="mt-6 sm:flex-1 sm:min-w-0 sm:flex sm:items-center sm:justify-end sm:space-x-6 sm:pb-1 flex flex-col">
              <div className="sm:hidden 2xl:block mt-6 min-w-0 flex-1">
                <h1 className="text-2xl font-bold text-gray-900 truncate">
                  {selectedContact && selectedContact.name}
                </h1>
              </div>
              {/* <div className="mt-6 flex flex-col justify-stretch space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4">
                <button
                  type="button"
                  className="inline-flex justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                >
                  <ChatAlt2Icon
                    className="-ml-1 mr-2 h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                  <span>Message</span>
                </button>
                <button
                  type="button"
                  className="inline-flex justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                >
                  <VideoCameraIcon
                    className="-ml-1 mr-2 h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                  <span>Call</span>
                </button>
                <button
                  type="button"
                  className="inline-flex justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                >
                  <BsLightningChargeFill
                    className="-ml-1 mr-2 h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                  <span>Send/Receive</span>
                </button>
              </div> */}
            </div>
          </div>
          <div className="hidden sm:block 2xl:hidden mt-6 min-w-0 flex-1">
            <h1 className="text-2xl font-bold text-gray-900 truncate">
              {selectedContact.name}
            </h1>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-6 sm:mt-2 2xl:mt-5">
        <div className="border-b border-gray-200">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="-mb-px flex space-x-8" aria-label="Tabs">
              {tabs.map((tab) => (
                <a
                  key={tab.name}
                  href={tab.href}
                  className={classNames(
                    tab.current
                      ? "border-pink-500 text-gray-900"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300",
                    "whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm"
                  )}
                  aria-current={tab.current ? "page" : undefined}
                >
                  {tab.name}
                </a>
              ))}
            </nav>
          </div>
        </div>
      </div>

      {/* Description list */}
      <div className="mt-6 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
          <div className="sm:col-span-1">
            <dt className="text-sm font-medium text-gray-500">DID</dt>
            <CopyToClipboard
              text={selectedContact.did}
              onCopy={() => toast.info("Copied!")}
            >
              <dd className="mt-1 text-sm text-gray-900 hover:bg-gray-50">
                {selectedContact.did}
              </dd>
            </CopyToClipboard>
          </div>
          <br />
          <div className="sm:col-span-1">
            <dt className="text-sm font-medium text-gray-500">Name</dt>
            <CopyToClipboard
              text={selectedContact.name}
              onCopy={() => toast.info("Copied!")}
            >
              <dd className="mt-1 text-sm text-gray-900 hover:bg-gray-50">
                {selectedContact.name}
              </dd>
            </CopyToClipboard>
          </div>
        </dl>
      </div>
      <div className="relative pb-8">
        <div
          className="absolute inset-0 flex items-center pt-6"
          aria-hidden="true"
        >
          <div className="w-full border-t border-gray-300" />
        </div>
      </div>
      <div className="pt-4 pl-16 flex space-x-4">
        <button
          type="button"
          onClick={() => setOpenAddContactForm(true)}
          className="inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
        >
          <PencilAltIcon
            className="-ml-1 mr-2 h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
          Edit
        </button>
        <button
          type="button"
          onClick={() => deleteContactConfirm(selectedContact)}
          className="inline-flex items-center px-2.5 py-1.5 border border-red-300 shadow-sm text-xs font-medium rounded text-red-700 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        >
          <XCircleIcon
            className="-ml-1 mr-2 h-5 w-5 text-red-400"
            aria-hidden="true"
          />
          Delete
        </button>
      </div>
    </article>
  );
};

export default function Contacts() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [directory, setDirectory] = useState([]);
  const [selectedContact, setSelectedContact] = useState("");
  const [openAddContactForm, setOpenAddContactForm] = useState(false);

  const { data } = useFetchContacts();

  useEffect(() => {
    if (data) {
      const result = categories
        .split("")
        .map((d) => {
          return data.data.contacts.filter(
            (c) => c.name[0].toLowerCase() === d.toLowerCase()
          );
        })
        .filter((d) => d.length > 0);
      setDirectory(result);
    }
  }, [data]);

  return (
    <MainNavigation currentPage={pageTitle}>
      <>
        <div className="h-full flex z-0">
          <AddContactSlideOut
            open={openAddContactForm}
            setOpen={setOpenAddContactForm}
            existingContact={selectedContact}
          />
          <div className="flex flex-col min-w-0 flex-1 overflow-hidden">
            <div className="lg:hidden">
              <div className="flex items-center justify-between bg-gray-50 border-b border-gray-200 px-4 py-1.5">
                <div>
                  <button
                    type="button"
                    className="-mr-3 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
                    onClick={() => setSidebarOpen(true)}
                  >
                    <span className="sr-only">Open sidebar</span>
                    <MenuIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </div>
            <div className="flex-1 relative z-0 flex overflow-hidden">
              <main className="flex-1 relative z-0 overflow-y-auto focus:outline-none xl:order-last">
                {/* Breadcrumb */}
                <nav
                  className="flex items-start px-4 py-3 sm:px-6 lg:px-8 xl:hidden"
                  aria-label="Breadcrumb"
                >
                  <a
                    href="#"
                    className="inline-flex items-center space-x-3 text-sm font-medium text-gray-900"
                  >
                    <ChevronLeftIcon
                      className="-ml-2 h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                    <span>Directory</span>
                  </a>
                </nav>

                {selectedContact && (
                  <ContactView
                    selectedContact={selectedContact}
                    setOpenAddContactForm={setOpenAddContactForm}
                    setSelectedContact={setSelectedContact}
                  />
                )}
              </main>
              <aside className="hidden xl:order-first xl:flex xl:flex-col flex-shrink-0 w-96 border-r border-gray-200">
                <div className="px-6 pt-6 pb-4">
                  <h2 className="text-lg font-medium text-gray-900">
                    Directory ({data?.data.contacts.length})
                  </h2>
                  <p className="mt-1 text-sm text-gray-600">
                    Search contacts below
                  </p>
                  <form className="mt-6 flex space-x-4" action="#">
                    <div className="flex-1 min-w-0">
                      <label htmlFor="search" className="sr-only">
                        Search
                      </label>
                      <div className="relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <SearchIcon
                            className="h-5 w-5 text-gray-400"
                            aria-hidden="true"
                          />
                        </div>
                        <input
                          type="search"
                          name="search"
                          id="search"
                          className="focus:ring-primaryfocus:border-primary block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                          placeholder="Search"
                        />
                      </div>
                    </div>
                  </form>
                </div>
                {/* Directory list */}
                <nav
                  className="flex-1 min-h-0 overflow-y-auto"
                  aria-label="Directory"
                >
                  {directory &&
                    directory.map((d, i) => (
                      <div key={i} className="relative">
                        <div className="z-10 sticky top-0 border-t border-b border-gray-200 bg-gray-50 px-6 py-1 text-sm font-medium text-gray-500">
                          <h3>{d[0].name[0].toUpperCase()}</h3>
                        </div>
                        <ul
                          role="list"
                          className="relative z-0 divide-y divide-gray-200"
                        >
                          {d.map((contact, i) => (
                            <li
                              key={i}
                              onClick={() => setSelectedContact(contact)}
                            >
                              <div className="relative px-6 py-5 flex items-center space-x-3 hover:bg-gray-50 focus-within:ring-2 focus-within:ring-inset focus-within:ring-primary">
                                <div className="flex-shrink-0">
                                  <BigHead
                                    {...getContactAvatar(contact)}
                                    className="h-10 w-10"
                                  />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="focus:outline-none">
                                    <span
                                      className="absolute inset-0"
                                      aria-hidden="true"
                                    />
                                    <p className="text-sm font-medium text-gray-900">
                                      {contact.name}
                                    </p>
                                    <p className="text-sm text-gray-500 truncate">
                                      {contact.did}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                </nav>
              </aside>
            </div>
          </div>
        </div>
      </>
    </MainNavigation>
  );
}
