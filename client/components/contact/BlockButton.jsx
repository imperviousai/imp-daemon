import { LockOpenIcon, XCircleIcon } from "@heroicons/react/outline";
import { useState, useEffect } from "react";
import { useFetchBlocklist, useUpdateBlocklist } from "../../hooks/contacts";

function BlockButton({ did, asMenuItem }) {
  const [blocked, setBlocked] = useState(false);
  const { data: blocklist } = useFetchBlocklist();
  const { mutate: updateBlocklist } = useUpdateBlocklist();

  useEffect(() => {
    if (blocklist) {
      setBlocked(blocklist.includes(did));
    }
  }, [blocklist, did]);

  const block = () => {
    let update = blocklist;
    if (!update) {
      update = [];
    }
    update.push(did);
    updateBlocklist({ key: "blocklist", value: JSON.stringify(update) });
  };

  const unblock = () => {
    let update = blocklist.filter((d) => d !== did);
    updateBlocklist({ key: "blocklist", value: JSON.stringify(update) });
  };

  return (
    <>
      {asMenuItem ? (
        <>
          {blocked ? (
            <div
              className="w-full flex items-center ml-2"
              onClick={() => unblock()}
            >
              <p className="text-gray-900 px-2 py-2 text-sm">Unlock</p>
            </div>
          ) : (
            <div
              className="w-full flex items-center ml-2"
              onClick={() => block()}
            >
              <p className="text-red-700 px-2 py-2 text-sm">Block</p>
            </div>
          )}
        </>
      ) : (
        <>
          {blocked ? (
            <button
              type="button"
              onClick={() => unblock()}
              className="inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              <LockOpenIcon
                className="-ml-1 mr-2 h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
              Unblock
            </button>
          ) : (
            <button
              type="button"
              onClick={() => block()}
              className="inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              <XCircleIcon
                className="-ml-1 mr-2 h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
              Block
            </button>
          )}
        </>
      )}
    </>
  );
}

export default BlockButton;
