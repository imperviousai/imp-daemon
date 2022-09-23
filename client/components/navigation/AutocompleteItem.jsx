import { PlusIcon } from "@heroicons/react/outline";

export function AutocompleteItem({ item, saveContactConfirm }) {
  return (
    <div className="flex">
      <div className="flex space-x-4 items-center w-full px-4">
        <img
          className="inline-block h-8 w-8 rounded-full"
          src={item.avatarUrl}
          alt=""
        />
        <div className="flex flex-col">
          <p className="text-lg text-gray-900">{item.name}</p>
          <a
            href={`https://twitter.com/${item.twitterUsername}`}
            className="text-sm text-blue-400"
          >
            @{item.twitterUsername}
          </a>
          <p className="text-sm text-gray-500">{item.shortFormDid}</p>
        </div>
      </div>
      <div className="flex items-center pr-2">
        <button
          type="button"
          className="inline-flex items-center text-primary hover:bg-indigo-200 rounded-full"
          onClick={() => saveContactConfirm(item)}
        >
          <PlusIcon className="h-6 w-6" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
