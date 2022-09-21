import { SearchIcon } from "@heroicons/react/outline";

export default function ImpSearchInput() {
  return (
    <div className="w-6/12">
      <div>
        <div className="mt-1 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <SearchIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
          </div>
          <input
            type="text"
            name="imp-search"
            id="imp-search"
            className="hover:shadow-lg rounded-full h-12 border border-gray-200 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
            placeholder="Search for any person, source, or URL ..."
          />
        </div>
      </div>
    </div>
  );
}
