import { Fragment, useState, useEffect, createElement } from "react";
import { Dialog, Transition, Menu } from "@headlessui/react";
import {
  CogIcon,
  MenuAlt2Icon,
  XIcon,
  HomeIcon,
  ChatAlt2Icon,
  PencilAltIcon,
  UserGroupIcon,
  VideoCameraIcon,
  ClipboardIcon,
} from "@heroicons/react/outline";
import { useAuth0 } from "@auth0/auth0-react";
import { useAtom } from "jotai";
import Link from "next/link";
import { getAlgoliaResults } from "@algolia/autocomplete-js";
import algoliasearch from "algoliasearch";
// import DarkModeToggle from "./DarkModeToggle";
import AddContactSlideOut from "../components/contact/AddContactSlideOut";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { toast } from "react-toastify";
import {
  useFetchMyDid,
  useFetchCurrentRegistryUser,
  useUpdateCurrentRegistryUser,
} from "../hooks/id";
import {
  myDidDocumentAtom,
  myDidLongFormDocumentAtom,
  publishedDidAtom,
} from "../stores/id";
import { auth0TokenAtom } from "../stores/auth";
import {
  EmailShareButton,
  FacebookShareButton,
  EmailIcon,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  TelegramShareButton,
  TelegramIcon,
  WhatsappShareButton,
  WhatsappIcon,
} from "react-share";
import { createDid, resolveDid } from "../utils/id";
import { useAddContact } from "../hooks/contacts";
import LightningToggle from "./LightingToggle";
import { Autocomplete } from "./navigation/Autocomplete";
import {
  ALGOLIA_ID,
  ALGOLIA_API_KEY,
  ALGOLIA_DID_INDEX,
} from "../utils/contacts";
import { AutocompleteItem } from "./navigation/AutocompleteItem";
import { createDID } from "../src/graphql/mutations";
import { GET_DID_BY_TWITTER } from "../utils/contacts";
import { useLazyQuery, useMutation, gql } from "@apollo/client";
import { PaperAirplaneIcon, PlusIcon } from "@heroicons/react/solid";

const sidebarNavigation = [
  { name: "Dashboard", href: "/d/dashboard", icon: HomeIcon, current: false },
  { name: "Messaging", href: "/d/chat", icon: ChatAlt2Icon, current: false },
  {
    name: "Meet",
    href: "/d/meeting",
    icon: VideoCameraIcon,
    current: false,
  },
  {
    name: "Live Docs",
    href: "/d/content",
    icon: PencilAltIcon,
    current: true,
  },
  // {
  //   name: "IPFS",
  //   href: "/d/files",
  //   icon: DocumentTextIcon,
  //   current: false,
  // },
  {
    name: "Contacts",
    href: "/d/contacts",
    icon: UserGroupIcon,
    current: false,
  },
  { name: "Settings", href: "/d/settings", icon: CogIcon, current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const ShareContactButton = ({ myDid }) => {
  const [, setMyDidDocument] = useAtom(myDidDocumentAtom);
  const [myDidLongFormDocument, setMyDidLongFormDocument] = useAtom(
    myDidLongFormDocumentAtom
  );

  useEffect(() => {
    if (myDid) {
      resolveDid(myDid.id)
        .then((res) => {
          setMyDidDocument(JSON.parse(res.data.document));
          setMyDidLongFormDocument(res.data.longFormDid);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [myDid, setMyDidLongFormDocument, setMyDidDocument]);

  const title = "I want to share my Impervious contact with you!";
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="order-0 inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 sm:order-1 sm:ml-3">
          <PaperAirplaneIcon className="h-4 w-4 mr-1" /> Contact
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="z-10 origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <div className="grid grid-cols-4 gap-2 p-4">
                  <CopyToClipboard
                    text={myDidLongFormDocument}
                    onCopy={() =>
                      toast.info("Copied to clipboard! Share this document!")
                    }
                  >
                    <button
                      type="button"
                      className="inline-flex items-center p-1 w-2/3 border border-transparent rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      <ClipboardIcon className="h-5 w-5" aria-hidden="true" />
                    </button>
                  </CopyToClipboard>
                  <EmailShareButton subject={title} url={myDid}>
                    <EmailIcon size={32} round />
                  </EmailShareButton>
                  <FacebookShareButton url={myDid} quote={title}>
                    <FacebookIcon size={32} round />
                  </FacebookShareButton>
                  <TwitterShareButton url={myDid} title={title}>
                    <TwitterIcon size={32} round />
                  </TwitterShareButton>
                  <TelegramShareButton url={myDid} title={title}>
                    <TelegramIcon size={32} round />
                  </TelegramShareButton>
                  <WhatsappShareButton
                    url={myDid}
                    title={title}
                    separator=":: "
                  >
                    <WhatsappIcon size={32} round />
                  </WhatsappShareButton>
                </div>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

const TwitterProfileMenu = () => {
  const { user, logout } = useAuth0();

  let returnUrl = "";
  if (typeof window !== "undefined") {
    returnUrl = window.location.origin;
  }

  const logoutWithRedirect = ({ state }) =>
    logout({
      returnTo: returnUrl,
    });

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="flex items-center rounded-full bg-gray-100 text-gray-400 hover:text-gray-600">
          <span className="sr-only">Open options</span>
          {user && (
            <img
              className="inline-block h-8 w-8 rounded-full"
              src={user.picture}
              alt=""
            />
          )}
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            <div className="flex flex-col items-center border-b border-b-2 border-gray-400 pb-2 ">
              <p className="text-sm text-gray-700">Logged in as:</p>
              <a
                href={`https://twitter.com/${user.nickname}`}
                rel="noreferrer"
                target="_blank"
                className="text-sm text-blue-500"
              >
                @{user.nickname}
              </a>
            </div>
            <Menu.Item>
              {({ active }) => (
                <button
                  type="submit"
                  onClick={() => logoutWithRedirect({ state: "Identity" })}
                  className={classNames(
                    active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                    "block w-full px-4 py-2 text-left text-sm text-center"
                  )}
                >
                  Sign out
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

const TwitterConnect = () => {
  const [, setAuth0Token] = useAtom(auth0TokenAtom);
  const { data: myDid } = useFetchMyDid();
  const [myDidLongFormDocument] = useAtom(myDidLongFormDocumentAtom);
  const [, setPublishedDid] = useAtom(publishedDidAtom);
  const { user, isAuthenticated, getAccessTokenSilently, loginWithPopup } =
    useAuth0();

  const { mutate: setCurrentRegistryUser } = useUpdateCurrentRegistryUser();
  const { data: currentRegistryUser } = useFetchCurrentRegistryUser();

  const [getDidsbyTwitter, { data, loading, error }] =
    useLazyQuery(GET_DID_BY_TWITTER);

  useEffect(() => {
    if (data?.listDIDS?.items?.length > 0) {
      setPublishedDid(data.listDIDS.items[0]);
    } else {
      setPublishedDid("");
    }
  }, [data, setPublishedDid]);

  useEffect(() => {
    const getToken = async () => {
      if (user) {
        const accessToken = await getAccessTokenSilently();
        setAuth0Token(accessToken);
        await setCurrentRegistryUser({
          key: "currentRegistryUser",
          value: JSON.stringify(user),
        });
        getDidsbyTwitter({
          variables: { twitterUsername: user?.nickname },
        });
        if (user?.nickname !== currentRegistryUser?.nickname) {
          publishDid()
            .then(() =>
              console.log("Successfuly published did to the registery")
            )
            .catch((e) =>
              console.error("Unable published did to the registery", e)
            );
        }
      }
    };
    getToken();
  }, [
    getAccessTokenSilently,
    user,
    setAuth0Token,
    getDidsbyTwitter,
    publishDid,
  ]);

  let returnUrl = "";
  if (typeof window !== "undefined") {
    returnUrl = window.location.origin;
  }

  const [publishDid] = useMutation(gql(createDID), {
    variables: {
      input: {
        longFormDid: myDidLongFormDocument,
        shortFormDid: myDid?.id,
        twitterUsername: user?.nickname,
        avatarUrl: user?.picture,
        name: user?.nickname,
        lastUpdated: new Date().getTime(),
      },
    },
    refetchQueries: [{ query: GET_DID_BY_TWITTER }, "getDIDByTwitter"],
  });

  return (
    <>
      {!isAuthenticated ? (
        <button
          type="button"
          onClick={() => loginWithPopup()}
          className="text-white bg-blue-400 hover:bg-blue-500 focus:ring-4 focus:outline-none focus:ring-blue-400/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
        >
          <svg
            className="mr-2 -ml-1 w-4 h-4"
            aria-hidden="true"
            focusable="false"
            data-prefix="fab"
            data-icon="twitter"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <path
              fill="currentColor"
              d="M459.4 151.7c.325 4.548 .325 9.097 .325 13.65 0 138.7-105.6 298.6-298.6 298.6-59.45 0-114.7-17.22-161.1-47.11 8.447 .974 16.57 1.299 25.34 1.299 49.06 0 94.21-16.57 130.3-44.83-46.13-.975-84.79-31.19-98.11-72.77 6.498 .974 12.99 1.624 19.82 1.624 9.421 0 18.84-1.3 27.61-3.573-48.08-9.747-84.14-51.98-84.14-102.1v-1.299c13.97 7.797 30.21 12.67 47.43 13.32-28.26-18.84-46.78-51.01-46.78-87.39 0-19.49 5.197-37.36 14.29-52.95 51.65 63.67 129.3 105.3 216.4 109.8-1.624-7.797-2.599-15.92-2.599-24.04 0-57.83 46.78-104.9 104.9-104.9 30.21 0 57.5 12.67 76.67 33.14 23.72-4.548 46.46-13.32 66.6-25.34-7.798 24.37-24.37 44.83-46.13 57.83 21.12-2.273 41.58-8.122 60.43-16.24-14.29 20.79-32.16 39.31-52.63 54.25z"
            ></path>
          </svg>
          Connect
        </button>
      ) : (
        <TwitterProfileMenu />
      )}
    </>
  );
};

export default function MainNavigation({ children, currentPage }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openAddContactForm, setOpenAddContactForm] = useState(false);
  const { data: myDid } = useFetchMyDid();
  const { mutate: addContact } = useAddContact();

  const isCurrent = (name) => currentPage === name;

  const searchClient = algoliasearch(ALGOLIA_ID, ALGOLIA_API_KEY);

  const importContact = (item) => {
    const { twitterUsername, name, avatarUrl, longFormDid } = item;
    resolveDid(longFormDid)
      .then((res) => {
        console.log(res);
        addContact({
          didDocument: JSON.parse(res.data.document),
          twitterUsername,
          name,
          avatarUrl,
          myDid,
        });
      })
      .catch((err) => {
        toast.error(
          "Unable to parse DID. Check formatting and try again. Long Form DID expected."
        );
        console.log("Unable to parse DID while importing contact: ", err);
      });
  };

  const saveContactConfirm = (item) => {
    toast(
      ({ closeToast }) => (
        <div>
          <p className="pb-4">
            Import contact{" "}
            <a
              href={`https://twitter.com/${item.twitterUsername}`}
              target="_blank"
              rel="noreferrer"
              className="text-md text-blue-400"
            >
              @{item.twitterUsername}
            </a>
            ?
          </p>
          <div className="flex space-x-4">
            <button
              type="button"
              onClick={() => {
                importContact(item);
                closeToast();
              }}
              className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Import
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
    <>
      <div className="h-screen w-screen flex">
        {/* Narrow sidebar */}
        <div className="hidden w-28 bg-primary overflow-y-auto md:block">
          <div className="w-full py-6 flex flex-col items-center h-full">
            <div className="flex-shrink-0 flex items-center">
              <img
                src="/imp-logo.svg"
                alt="Impervious"
                height="30"
                width="30"
              />
            </div>
            <div className="flex-1 mt-6 w-full px-2 space-y-1">
              {sidebarNavigation.map((item) => (
                <Link key={item.name} href={item.href} passHref>
                  <a
                    className={classNames(
                      isCurrent(item.name)
                        ? "bg-violet-800 text-white"
                        : "text-indigo-100 hover:bg-primary-hover hover:text-white",
                      "group w-full p-3 rounded-md flex flex-col items-center text-xs font-medium"
                    )}
                    aria-current={item.current ? "page" : undefined}
                  >
                    <item.icon
                      className={classNames(
                        isCurrent(item.name)
                          ? "text-white"
                          : "text-indigo-300 group-hover:text-white",
                        "h-6 w-6"
                      )}
                      aria-hidden="true"
                    />
                    <span className="mt-2">{item.name}</span>
                  </a>
                </Link>
              ))}
            </div>
            <div className="self-end items-center flex flex-col w-full">
              <LightningToggle />
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <Transition.Root show={mobileMenuOpen} as={Fragment}>
          <Dialog as="div" className="md:hidden" onClose={setMobileMenuOpen}>
            <div className="fixed inset-0 z-40 flex">
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
                <div className="relative max-w-xs w-full bg-primary pt-5 pb-4 flex-1 flex flex-col">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute top-1 right-0 -mr-14 p-1">
                      <button
                        type="button"
                        className="h-12 w-12 rounded-full flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-white"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <XIcon
                          className="h-6 w-6 text-white"
                          aria-hidden="true"
                        />
                        <span className="sr-only">Close sidebar</span>
                      </button>
                    </div>
                  </Transition.Child>
                  <div className="flex-shrink-0 px-4 flex items-center">
                    <img
                      src="/imp-logo.svg"
                      alt="Impervious"
                      height="30"
                      width="30"
                    />
                  </div>
                  <div className="mt-5 flex-1 h-0 px-2 overflow-y-auto">
                    <nav className="h-full flex flex-col">
                      <div className="space-y-1">
                        {sidebarNavigation.map((item) => (
                          <a
                            key={item.name}
                            href={item.href}
                            className={classNames(
                              isCurrent(item.name)
                                ? "bg-violet-800 text-white"
                                : "text-indigo-100 hover:bg-primary-hover hover:text-white",
                              "group py-2 px-3 rounded-md flex items-center text-sm font-medium"
                            )}
                            aria-current={item.current ? "page" : undefined}
                          >
                            <item.icon
                              className={classNames(
                                isCurrent(item.name)
                                  ? "text-white"
                                  : "text-indigo-300 group-hover:text-white",
                                "mr-3 h-6 w-6"
                              )}
                              aria-hidden="true"
                            />
                            <span>{item.name}</span>
                          </a>
                        ))}
                      </div>
                    </nav>
                  </div>
                </div>
              </Transition.Child>
              <div className="flex-shrink-0 w-14" aria-hidden="true">
                {/* Dummy element to force sidebar to shrink to fit close icon */}
              </div>
            </div>
          </Dialog>
        </Transition.Root>

        {/* Content area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <AddContactSlideOut
            open={openAddContactForm}
            setOpen={setOpenAddContactForm}
            existingContact={null}
          />
          <header className="w-full">
            <div className="relative flex-shrink-0 h-16 bg-white border-b border-gray-200 shadow-sm flex">
              <button
                type="button"
                className="border-r border-gray-200 px-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 md:hidden"
                onClick={() => setMobileMenuOpen(true)}
              >
                <span className="sr-only">Open sidebar</span>
                <MenuAlt2Icon className="h-6 w-6" aria-hidden="true" />
              </button>
              <div className="flex-1 flex justify-between px-4 sm:px-6 items-center">
                <div>
                  <h2 className="font-semibold text-primary text-md pr-3">
                    {currentPage}
                  </h2>
                </div>
                <div className="bg-blue-100 w-1/2">
                  <Autocomplete
                    placeholder="Search for user via Twitter username or contact name"
                    getSources={({ query }) => [
                      {
                        sourceId: ALGOLIA_DID_INDEX,
                        getItems() {
                          return getAlgoliaResults({
                            searchClient,
                            queries: [
                              {
                                indexName: ALGOLIA_DID_INDEX,
                                query,
                              },
                            ],
                          });
                        },
                        templates: {
                          item({ item }) {
                            return (
                              <AutocompleteItem
                                item={item}
                                saveContactConfirm={saveContactConfirm}
                              />
                            );
                          },
                        },
                      },
                    ]}
                  />
                </div>

                <div className="ml-2 flex items-center space-x-4 sm:ml-6 sm:space-x-6">
                  {/* <button
                    type="button"
                    className="ml-3 inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 sm:order-0 sm:ml-0"
                  >
                    Share Browser
                  </button> */}
                  <ShareContactButton myDid={myDid} />
                  <button
                    type="button"
                    onClick={() => setOpenAddContactForm(true)}
                    className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 sm:ml-3"
                  >
                    <PlusIcon className="h-4 w-4 mr-1" />
                    Contact
                  </button>
                  <TwitterConnect />
                </div>
              </div>
            </div>
          </header>

          {/* Main content */}
          <div className="flex-1 flex items-stretch overflow-hidden">
            <main className="flex-1 overflow-y-auto">
              {/* Notifications Listener */}
              {children}
              {/* <div className="absolute bottom-0 right-0 py-4 px-4 pr-8">
                <DarkModeToggle />
              </div> */}
            </main>
          </div>
        </div>
      </div>
    </>
  );
}
