import { useEffect, useState } from "react";
import DIDSearchInput from "../../../components/DIDSearchInput";
import DidCard from "../../../components/DidCard";
import { useRouter } from "next/dist/client/router";
import { fetchDids } from "../../../utils/id";
import MainNavigation from "../../../components/MainNavigation";

export default function ContactId() {
  const [selectedDid, setSelectedDids] = useState({});
  const [isDidSaved, setIsDidSaved] = useState(false);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      fetchDids()
        .then((res) => {
          const dids = res.data.documents.map((did) => JSON.parse(did));
          let did = dids.find((did) => did.id === id);
          if (did) {
            setSelectedDids(did);
            setIsDidSaved(true);
          }
        })
        .catch((err) => console.log(err));
    }
  }, [setSelectedDids, id, setIsDidSaved]);

  return (
    <MainNavigation>
      <div className="mt-4 flex sm:mt-0 sm:ml-4">
        {!isDidSaved && (
          <button
            type="button"
            className="order-0 inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:order-1 sm:ml-3"
          >
            Import ID
          </button>
        )}
      </div>

      {/* BODY GOES HERE  */}
      <div className="px-8 pt-8">
        <div className="flex space-between flex-wrap pb-2">
          <div className="lg:w-12/12 w-full pb-4">
            <DIDSearchInput />
          </div>
          {/* <div className="lg:w-2/12 w-full pb-4">
                  <ViewRawToggle />
                </div> */}
        </div>
        <div className="flex w-full items-center flex-col">
          <div className="sm:w-8/12 lg:w-6/12">
            <DidCard selectedDid={selectedDid} />
          </div>
        </div>
      </div>
    </MainNavigation>
  );
}
