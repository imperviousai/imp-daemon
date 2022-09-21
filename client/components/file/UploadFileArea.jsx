import { UploadIcon } from "@heroicons/react/outline";

// TODO: Drag and drop file upload using React DnD
export default function UploadFileArea({ handleUpload }) {
  return (
    <>
      <form>
        <div className="sm:py-5">
          <div className="mt-1 sm:mt-0 sm:col-span-2">
            <div className="max-w-lg flex justify-center px-12 py-12 border-2 border-gray-300 border-dashed rounded-md">
              <div className="space-y-1 text-center">
                <UploadIcon className="mx-auto h-12 w-12 text-gray-400 pb-2" />
                <div className="flex text-sm text-gray-600">
                  <label
                    htmlFor="file-upload"
                    className="relative underline cursor-pointer bg-white rounded-md font-medium text-gray-600 hover:text-gray-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                  >
                    <span>Upload a file</span>
                    <input
                      id="file-upload"
                      name="file-upload"
                      type="file"
                      className="sr-only"
                      onChange={handleUpload}
                    />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-500">
                  PNG, JPG, GIF up to 10MB
                </p>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
