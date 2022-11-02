import { useState, useEffect } from "react";
import { MenuIcon } from "@heroicons/react/outline";
import {
  ChatAlt2Icon,
  ChevronLeftIcon,
  ExclamationIcon,
  PencilAltIcon,
  SearchIcon,
  VideoCameraIcon,
  XCircleIcon,
} from "@heroicons/react/solid";
import { toast } from "react-toastify";
import { CopyToClipboard } from "react-copy-to-clipboard";
import AddContactSlideOut from "../../components/contact/AddContactSlideOut";
import {
  useFetchContacts,
  useDeleteContactById,
  useFetchBlocklist,
} from "../../hooks/contacts";
const tabs = [{ name: "Contact Info", href: "#", current: true }];

const categories = "abcdefghijklmnopqrstuvwxyz1234567890";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
import MainNavigation from "../../components/MainNavigation";
import { BsLightningChargeFill } from "react-icons/bs";
import ContactAvatar from "../../components/contact/ContactAvatar";
import TwitterLink from "../../components/contact/TwitterLink";
import TwitterConnected from "../../components/contact/TwitterConnected";
import AvatarRotator from "../../components/contact/AvatarRotator";
import BlockButton from "../../components/contact/BlockButton";
import { useFetchMessages } from "../../hooks/messages";
import { useFetchMyDid } from "../../hooks/id";
import { getShortFormId } from "../../utils/id";
import { useFetchSettings } from "../../hooks/settings";

const pageTitle = "Contacts";

export const ContactView = ({
  selectedContact,
  setOpenAddContactForm,
  setSelectedContact,
  nickname,
}) => {
  const [openAddForm, setOpenAddForm] = useState(false);
  const [didToSave, setDidToSave] = useState();
  const { mutate: deleteContactById } = useDeleteContactById();
  const { data } = useFetchContacts();
  const { data: myDid } = useFetchMyDid();
  const { data: blocklist } = useFetchBlocklist();
  const { data: settings } = useFetchSettings();
  const { data: messages } = useFetchMessages({
    myDid,
    contacts: data?.data.contacts,
    blocklist,
    settings,
  });

  const onSuccessDelete = () => {
    toast.success("Contact successfully deleted!");
    setSelectedContact && setSelectedContact("");
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

  const saveUnknownContact = () => {
    let c = messages.conversations.find((c) =>
      c.messages.find(
        (m) => getShortFormId(m.data.from) === selectedContact.did
      )
    );
    if (c) {
      let fromDid = c.messages.find(
        (m) => getShortFormId(m.data.from) === selectedContact.did
      ).data.from;
      if (fromDid) {
        setDidToSave(fromDid);
        setOpenAddForm(true);
      }
    }
  };
  return (
    <article>
      {/* Profile header */}
      <AddContactSlideOut
        open={openAddForm}
        setOpen={setOpenAddForm}
        existingContact={null}
        defaultDid={didToSave}
        defaultName={nickname}
      />
      <div>
        {selectedContact?.name === "Unknown" && (
          <div className="rounded-md bg-green-50 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <ExclamationIcon
                  className="h-5 w-5 text-green-400"
                  aria-hidden="true"
                />
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-green-800">
                  Unknown contact
                </h3>
                <div className="mt-2 text-sm text-green-700">
                  <p>
                    You do not have this contact saved and is unknown. Do you
                    want to save this contact?
                  </p>
                </div>
                <div className="mt-4">
                  <div className="-mx-2 -my-1.5 flex">
                    <button
                      type="button"
                      onClick={() => saveUnknownContact()}
                      className="rounded-md bg-green-50 px-2 py-1.5 text-sm font-medium text-green-800 hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 focus:ring-offset-green-50"
                    >
                      Save Contact
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        <div className="pb-12 flex flex-col items-center mt-8 ">
          <AvatarRotator contact={selectedContact} />
        </div>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="-mt-12 sm:-mt-16 sm:flex sm:items-end sm:space-x-5">
            <div className="mt-6 sm:flex-1 sm:min-w-0 sm:flex sm:items-center sm:justify-end sm:space-x-6 sm:pb-1 flex flex-col">
              <div className="sm:hidden 2xl:block mt-6 min-w-0 flex-1">
                <h1 className="text-2xl font-bold text-gray-900 truncate">
                  {selectedContact?.name}
                </h1>
              </div>
            </div>
          </div>
          <div className="hidden sm:block 2xl:hidden mt-6 min-w-0 flex-1">
            <div className="flex space-x-2 items-center">
              <h1 className="text-2xl font-bold text-gray-900 truncate">
                {selectedContact?.name}
              </h1>
              <TwitterConnected contact={selectedContact} className="h-4 w-4" />
            </div>
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
          <div className="sm:col-span-1">
            <dt className="text-xs font-medium text-gray-500">DID</dt>
            <CopyToClipboard
              text={selectedContact.did}
              onCopy={() => toast.info("Copied!")}
            >
              <dd className="mt-1 text-xs text-gray-900 hover:bg-gray-50">
                {selectedContact.did}
              </dd>
            </CopyToClipboard>
          </div>
          {JSON.parse(selectedContact.metadata).username && (
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">Twitter</dt>
              <dd className="mt-1 text-sm text-gray-900 hover:bg-gray-50">
                <TwitterLink
                  contact={selectedContact}
                  className="text-blue-500 font-medium"
                />
              </dd>
            </div>
          )}

          <br />
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
        <BlockButton did={selectedContact.did} />
        {selectedContact?.name !== "Unknown" && (
          <>
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
          </>
        )}
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
          return data.data.contacts.filter((c) => {
            let name =
              c.name.charAt(0) === "@"
                ? c.name.substring(1, c.name.length)
                : c.name;

            return name[0].toLowerCase() === d.toLowerCase();
          });
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
              <aside className="hidden xl:order-first xl:flex xl:flex-col flex-shrink-0 w-80 border-r border-gray-200">
                <div className="px-6 pt-6 pb-4">
                  <h2 className="text-lg font-medium text-gray-900">
                    Directory ({data?.data.contacts.length})
                  </h2>
                  <p className="mt-1 text-sm text-gray-600">
                    Search contacts below
                  </p>
                  {/* //TODO: need to implement the local search */}
                  {/* <div className="flex-1 min-w-0">
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
                    </div> */}
                </div>
                {/* Directory list */}
                <nav
                  className="flex-1 min-h-0 overflow-y-auto"
                  aria-label="Directory"
                >
                  {directory &&
                    directory.map((d, i) => (
                      <div key={i} className="relative">
                        <div className="sticky top-0 border-t border-b border-gray-200 bg-gray-50 px-6 py-1 text-sm font-medium text-gray-500">
                          <h3>
                            {d[0].name[0] === "@"
                              ? d[0].name[1].toUpperCase()
                              : d[0].name[0].toUpperCase()}
                          </h3>
                        </div>
                        <ul
                          role="list"
                          className="relative divide-y divide-gray-200"
                        >
                          {d.map((contact, i) => (
                            <li
                              key={i}
                              onClick={() => setSelectedContact(contact)}
                            >
                              <div className="relative px-6 py-5 flex items-center space-x-3 hover:bg-gray-50 focus-within:ring-2 focus-within:ring-inset focus-within:ring-primary">
                                <div className="flex-shrink-0">
                                  <ContactAvatar
                                    contact={contact}
                                    className="h-10 w-10"
                                  />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="focus:outline-none">
                                    <span
                                      className="absolute inset-0"
                                      aria-hidden="true"
                                    />
                                    <span className="flex items-center space-x-2">
                                      <p className="text-sm font-medium text-gray-900">
                                        {contact.name}
                                      </p>
                                      <TwitterConnected
                                        contact={contact}
                                        className="h-4 w-4"
                                      />
                                    </span>
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
