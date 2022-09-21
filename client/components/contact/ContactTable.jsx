import { CashIcon, ChatIcon, PhoneIcon } from "@heroicons/react/outline";
import { SearchIcon } from "@heroicons/react/solid";
import moment from "moment";
import Link from "next/link";

export default function ContactTable({ contacts }) {
  return (
    <div className="flex flex-col">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider"
                  >
                    Actions
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="px-2 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider"
                  >
                    Date
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {contacts.map((contact, i) => (
                  <tr key={i} className="hover:bg-gray-50">
                    <td className="pl-4 py-4 whitespace-nowrap">
                      <div className="flex">
                        <Link
                          href={`/d/contacts/view?id=${contact.id}`}
                          passHref
                        >
                          <button
                            type="button"
                            className="px-2 inline-flex items-center p-2 border border-transparent rounded-full text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                          >
                            <SearchIcon
                              className="h-4 w-4"
                              aria-hidden="true"
                            />
                          </button>
                        </Link>

                        <button
                          type="button"
                          className="px-2 inline-flex items-center p-2 border border-transparent rounded-full text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                        >
                          <ChatIcon className="h-4 w-4" aria-hidden="true" />
                        </button>
                        <button
                          type="button"
                          className="px-2 inline-flex items-center p-2 border border-transparent rounded-full text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                        >
                          <PhoneIcon className="h-4 w-4" aria-hidden="true" />
                        </button>
                        <button
                          type="button"
                          className="px-2 inline-flex items-center p-2 border border-transparent rounded-full text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                        >
                          <CashIcon className="h-4 w-4" aria-hidden="true" />
                        </button>
                      </div>
                    </td>
                    <td className="px-2 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {contact.name ? contact.name : "No Name Provided"}
                          </div>
                          <div className="text-sm text-gray-500">
                            {contact.id}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-2 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {moment(contact.updated).format("MMM Do YY, h:mm a")}
                      </div>
                      <div className="text-sm text-gray-500">
                        {moment(contact.updated).fromNow()}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
