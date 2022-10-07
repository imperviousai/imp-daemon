import { ArrowCircleDownIcon } from "@heroicons/react/outline";

export function AutocompleteItem({ item, saveContactConfirm }) {
  return (
    <div
      className="flex space-x-4 items-center w-full px-4 hover:bg-gray-100"
      onClick={() => {
        saveContactConfirm(item);
      }}
    >
      <button
        type="button"
        className="inline-flex justify-self-end items-center rounded-full border border-transparent bg-blue-400 p-2 text-blue-400 shadow-sm hover:bg-blue-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        <ArrowCircleDownIcon className="h-8 w-8" aria-hidden="true" />
      </button>
      <div className="flex items-center space-x-4">
        <img
          className="inline-block h-8 w-8 rounded-full"
          src={item.avatarUrl}
          alt=""
        />
        <div className="flex flex-col">
          <p className="text-lg text-gray-900">{item.name}</p>
          <a
            target="_blank"
            rel="noreferrer"
            href={`https://twitter.com/${item.twitterUsername}`}
            className="text-sm text-blue-400"
          >
            @{item.twitterUsername}
          </a>
          <p className="text-sm text-gray-500">{item.shortFormDid}</p>
        </div>
      </div>
    </div>
  );
}
