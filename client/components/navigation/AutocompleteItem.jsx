import { ArrowCircleDownIcon, ChatAlt2Icon } from "@heroicons/react/outline";
import { useFetchContacts } from "../../hooks/contacts";
import { getContactByDid } from "../../utils/contacts";

export function AutocompleteItem({ item, importContact, goToMessage }) {
  return (
    <div className="flex space-x-4 items-center w-full px-4 hover:bg-gray-100">
      <button
        type="button"
        onClick={() => {
          importContact(item);
        }}
        className="inline-flex justify-self-end items-center rounded-full border border-transparent bg-blue-400 p-2 text-blue-400 shadow-sm hover:bg-blue-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        <ArrowCircleDownIcon className="h-6 w-6" aria-hidden="true" />
      </button>
      <button
        type="button"
        onClick={() => {
          goToMessage(item);
        }}
        className="inline-flex justify-self-end items-center rounded-full border border-transparent bg-blue-400 p-2 text-blue-400 shadow-sm hover:bg-blue-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        <ChatAlt2Icon className="h-6 w-6 m-0.5" aria-hidden="true" />
      </button>
      <div
        className="flex items-center space-x-4"
        onClick={() => {
          importContact(item);
        }}
      >
        <img
          className="inline-block h-8 w-8 rounded-full"
          src={item.avatarUrl}
          alt=""
        />
        <div className="flex flex-col">
          <p className="text-lg text-gray-900">{item.name}</p>
          <p>
            <a
              target="_blank"
              rel="noreferrer"
              href={`https://twitter.com/${item.username}`}
              className="text-sm text-blue-400 bg-blue-100"
            >
              @{item.username}
            </a>
          </p>
          <p className="text-sm text-gray-500">{item.shortFormDid}</p>
        </div>
      </div>
    </div>
  );
}
