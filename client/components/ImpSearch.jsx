import { HomeIcon } from "@heroicons/react/outline";
import ImpSearchInput from "./ImpSearchInput";
import Link from "next/link";

export default function ImpSearch() {
  return (
    <>
      <div className="min-h-full pb-12 flex flex-col bg-white">
        <div className="flex flex-row-reverse pr-8 pt-4">
          <Link href="/d/dashboard">
            <a className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-gray-900 bg-white hover:bg-gray-100 focus:outline-none">
              <HomeIcon
                className="-ml-1 mr-3 h-5 w-5 text-gray-900"
                aria-hidden="true"
              />
              Dashboard
            </a>
          </Link>
        </div>
        <main className="flex-grow flex flex-col pt-48 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex-shrink-0 flex justify-center">
            <Link href="/">
              <a className="inline-flex">
                <span className="sr-only">Impervious</span>
                <img className="h-48 w-auto" src="/imp-browser.svg" alt="" />
              </a>
            </Link>
          </div>
          <div className="py-8 flex flex-col items-center">
            <ImpSearchInput />
          </div>
          <nav className="flex justify-center space-x-8">
            <a
              href="#"
              className="text-sm bg-gray-100 py-2 px-4 text-gray-700 hover:text-gray-900 hover:bg-gray-200"
            >
              Contacts
            </a>
            <a
              href="#"
              className="text-sm bg-gray-100 py-2 px-4 text-gray-700 hover:text-gray-900 hover:bg-gray-200"
            >
              Recent
            </a>
            <a
              href="#"
              className="text-sm bg-gray-100 py-2 px-4 text-gray-700 hover:text-gray-900 hover:bg-gray-200"
            >
              Favorites
            </a>
          </nav>
        </main>
        <footer className="flex-shrink-0 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8"></footer>
      </div>
    </>
  );
}
