import {
  CashIcon,
  ChatIcon,
  DotsVerticalIcon,
  HeartIcon,
  PhoneIcon,
  StatusOfflineIcon,
  StatusOnlineIcon,
  VideoCameraIcon,
  ExclamationIcon,
  XIcon,
} from "@heroicons/react/outline";
import { Fragment, useState } from "react";
import { Menu, Transition, Dialog } from "@headlessui/react";
import Link from "next/link";

const didSources = [
  {
    title: "Connected Sources",
    sources: [
      { title: "joerogan.com", live: true },
      { title: "joetherogan.com (Mirror 1)", live: true },
    ],
  },
  {
    title: "Verified Social",
    sources: [
      { title: "@joerogan", live: true },
      { title: "@joetherogan (Backup)", live: true },
      { title: "facebook.com/joerogan", live: true },
      { title: "youtube.com/joerogan", live: false },
      { title: "vimeo.com/joerogan (Backup)", live: true },
    ],
  },
  {
    title: "Communication Methods",
    sources: [
      { title: "p2p Message - Free", live: false },
      { title: "p2p Message - Paid", live: true },
      { title: "p2p Video - Paid", live: true },
    ],
  },
  {
    title: "Live Stream",
    sources: [{ title: "p2p Video - Paid", live: true }],
  },
];

const subscriptionSources = [
  {
    title: "Media",
    sources: [
      { title: "Podcast Ep. 452 - 10.1.21", live: true },
      { title: "Podcast Ep. 453 - 10.2.21", live: true },
      { title: "Podcast Ep. 454 - 10.3.21", live: true },
      { title: "Podcast Ep. 455 - 10.4.21", live: true },
    ],
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const DeleteDidModal = ({ open, setOpen }) => {
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto"
        onClose={setOpen}
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div className="hidden sm:block absolute top-0 right-0 pt-4 pr-4">
                <button
                  type="button"
                  className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  onClick={() => setOpen(false)}
                >
                  <span className="sr-only">Close</span>
                  <XIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              <div className="sm:flex sm:items-start">
                <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                  <ExclamationIcon
                    className="h-6 w-6 text-red-600"
                    aria-hidden="true"
                  />
                </div>
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <Dialog.Title
                    as="h3"
                    className="text-lg leading-6 font-medium text-gray-900"
                  >
                    Delete this contact?
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Are you sure you want to delete this contact? This action
                      cannot be undone.
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => setOpen(false)}
                  // perform the actual delete here
                >
                  Delete
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
                  onClick={() => setOpen(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

const DotsMenu = ({ selectedDid, setOpenDeleteModal }) => {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="bg-gray-100 rounded-full flex items-center text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500">
          <span className="sr-only">Open options</span>
          <DotsVerticalIcon className="h-6 w-6" aria-hidden="true" />
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
        <Menu.Items className="origin-top-right absolute bottom-0 right-0 mb-16 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <Link href={`/d/contacts/new?id=${selectedDid.id}`} passHref>
                  <a
                    className={classNames(
                      active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                      "block px-4 py-2 text-sm"
                    )}
                  >
                    Edit
                  </a>
                </Link>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <a
                  href="#"
                  onClick={() => setOpenDeleteModal(true)}
                  className={classNames(
                    active ? "bg-gray-100 text-red-900" : "text-red-700",
                    "block px-4 py-2 text-sm"
                  )}
                >
                  Delete
                </a>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default function DidCard({ selectedDid }) {
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  return (
    <div className="relative px-4 pt-8 bg-white border border-gray-200 rounded-2xl shadow-sm flex flex-col">
      <DeleteDidModal open={openDeleteModal} setOpen={setOpenDeleteModal} />
      {/* DID Profile Header and Favorite Button  */}
      <div className="flex">
        <div className="flex flex-col w-11/12 items-center">
          <p className="text-lg font-light text-gray-500">
            {selectedDid.id ? `(${selectedDid.id})` : "Decentralized Identity"}
          </p>
          <h4 className="text-lg font-bold">
            {selectedDid.name ? selectedDid.name : "Unknown Name"}
          </h4>
        </div>
        <div className="flex flex-col w-1/12 items-center">
          <HeartIcon className="w-8 h-8" />
        </div>
      </div>

      {/* DID Resources Section  */}
      {didSources.map((item, i) => (
        <div className="flex flex-col py-2" key={i}>
          <p className="text-md font-bold">{item.title}</p>
          {item.sources.map((source, i) => (
            <div className="flex" key={i}>
              {source.live ? (
                <StatusOnlineIcon className="w-6 h-6 text-green-500" />
              ) : (
                <StatusOfflineIcon className="w-6 h-6 text-red-500" />
              )}
              <p className="px-2">{source.title}</p>
            </div>
          ))}
        </div>
      ))}

      {/* Divider  */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center" aria-hidden="true">
          <div className="w-full border-t border-gray-300" />
        </div>
        <div className="relative flex justify-center">
          <span className="px-3 bg-white text-lg font-medium text-gray-900">
            Subscription Content
          </span>
        </div>
      </div>

      {/* Subscription Content Section  */}
      {subscriptionSources.map((item, i) => (
        <div className="flex flex-col py-2" key={i}>
          <p className="text-md font-bold">{item.title}</p>
          {item.sources.map((source, i) => (
            <div className="flex" key={i}>
              {source.live ? (
                <StatusOnlineIcon className="w-6 h-6 text-green-500" />
              ) : (
                <StatusOfflineIcon className="w-6 h-6 text-red-500" />
              )}
              <p className="px-2">{source.title}</p>
            </div>
          ))}
        </div>
      ))}

      {/* Subscription Button  */}
      <div className="flex flex-col items-center py-4">
        <button className="bg-gray-900 w-8/12 hover:bg-gray-700 text-white font-bold py-2 px-4 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
          Subscribe
        </button>
      </div>

      {/* Action Button Group  */}
      <div className="flex flex-row-reverse pt-2">
        <DotsMenu
          selectedDid={selectedDid}
          setOpenDeleteModal={setOpenDeleteModal}
        />
        <button
          type="button"
          className="px-2 inline-flex items-center p-2 border border-transparent rounded-full shadow-sm text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
        >
          <CashIcon className="h-6 w-6" aria-hidden="true" />
        </button>
        <button
          type="button"
          className="px-2 inline-flex items-center p-2 border border-transparent rounded-full shadow-sm text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
        >
          <VideoCameraIcon className="h-6 w-6" aria-hidden="true" />
        </button>
        <button
          type="button"
          className="px-2 inline-flex items-center p-2 border border-transparent rounded-full shadow-sm text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
        >
          <PhoneIcon className="h-6 w-6" aria-hidden="true" />
        </button>
        <button
          type="button"
          className="px-2 inline-flex items-center p-2 border border-transparent rounded-full shadow-sm text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
        >
          <ChatIcon className="h-6 w-6" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
