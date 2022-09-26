import { QrcodeIcon } from "@heroicons/react/solid";

export default function DIDSearchInput() {
  return (
    <div>
      <div className="mt-1 relative rounded-md shadow-sm">
        <input
          type="text"
          name="did-lookup"
          id="did-lookup"
          className="focus:ring-gray-500 h-12 border border-gray-200 pl-4 focus:border-gray-500 block w-full pr-10 sm:text-lg border-gray-300 rounded-md"
          placeholder="Add new contact - Paste Decentralized Identity Here"
        />
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
          <QrcodeIcon className="h-8 w-8 text-gray-900" aria-hidden="true" />
        </div>
      </div>
    </div>
  );
}
