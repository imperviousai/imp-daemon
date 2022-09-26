import { XCircleIcon } from "@heroicons/react/outline";

const files = [
  {
    title: "vlog-12.4.12.mov",
    timestamp: "2 months ago",
    size: "320mb",
  },
  {
    title: "vlog_12_4_12_logo.jpeg",
    timestamp: "2 months ago",
    size: "4.1gb",
  },
  {
    title: "Description.txt",
    timestamp: "2 months ago",
    size: "140kb",
  },
];

export default function UploadFileTable({ files, removeFile }) {
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
                    Files to Upload
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider"
                  >
                    Size
                  </th>
                  <th scope="col" className="relative px-6 py-3"></th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {files.length > 0 &&
                  files.map((file, i) => (
                    <tr key={i}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {file.name}
                            </div>
                            <div className="text-sm text-gray-500">
                              {file.type}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{file.size}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <XCircleIcon
                          className="h-6 w-6 text-red-500"
                          onClick={() => removeFile(file)}
                        />
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
