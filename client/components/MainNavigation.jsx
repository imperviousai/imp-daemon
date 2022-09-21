import { Fragment, useContext, useState, useRef, useEffect } from "react";
import { Dialog, Transition, Menu } from "@headlessui/react";
import {
  CogIcon,
  MenuAlt2Icon,
  XIcon,
  HomeIcon,
  ChatAlt2Icon,
  DocumentTextIcon,
  PencilAltIcon,
  UserGroupIcon,
  VideoCameraIcon,
  ClipboardIcon,
} from "@heroicons/react/outline";

import { useAtom } from "jotai";
import Link from "next/link";
// import DarkModeToggle from "./DarkModeToggle";
import AddContactSlideOut from "../components/contact/AddContactSlideOut";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { toast } from "react-toastify";
import { useFetchMyDid } from "../hooks/id";
import { myDidDocumentAtom, myDidLongFormDocumentAtom } from "../stores/id";
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
import { resolveDid } from "../utils/id";
import LightningToggle from "./LightingToggle";

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
const userNavigation = [
  { name: "Your Profile", href: "#" },
  { name: "Sign out", href: "#" },
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
          Share Contact
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
        <Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <div className="grid grid-cols-4 gap-2">
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

export default function MainNavigation({ children, currentPage }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openAddContactForm, setOpenAddContactForm] = useState(false);

  const { data: myDid } = useFetchMyDid();

  const isCurrent = (name) => currentPage === name;

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
        <div className="flex-1 flex flex-col overflow-hidden z-10">
          <AddContactSlideOut
            open={openAddContactForm}
            setOpen={setOpenAddContactForm}
            existingContact={null}
          />
          <header className="w-full">
            <div className="relative z-10 flex-shrink-0 h-16 bg-white border-b border-gray-200 shadow-sm flex">
              <button
                type="button"
                className="border-r border-gray-200 px-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 md:hidden"
                onClick={() => setMobileMenuOpen(true)}
              >
                <span className="sr-only">Open sidebar</span>
                <MenuAlt2Icon className="h-6 w-6" aria-hidden="true" />
              </button>
              <div className="flex-1 flex justify-between px-4 sm:px-6">
                <div className="flex-1 flex items-center space-x-4">
                  <h2 className="font-semibold text-primary text-lg">
                    {currentPage}
                  </h2>
                </div>
                <div className="ml-2 flex items-center space-x-4 sm:ml-6 sm:space-x-6">
                  {/* Profile dropdown */}
                  <button
                    type="button"
                    className="order-1 ml-3 inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 sm:order-0 sm:ml-0"
                  >
                    Share Browser
                  </button>
                  <button
                    type="button"
                    onClick={() => setOpenAddContactForm(true)}
                    className="order-0 inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 sm:order-1 sm:ml-3"
                  >
                    Add Contact
                  </button>
                  <div className="pr-6">
                    <ShareContactButton myDid={myDid} />
                  </div>
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
