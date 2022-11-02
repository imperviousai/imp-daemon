import { Fragment, useState, useContext, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";
import { toast } from "react-toastify";
import {
  useAddContact,
  useDeleteContactById,
  useUpdateContact,
} from "../../hooks/contacts";
import { useFetchMyDid } from "../../hooks/id.js";
import { resolveDid } from "../../utils/id.js";

export default function AddContactSlideOut({
  open,
  setOpen,
  existingContact,
  defaultName,
  defaultDid,
}) {
  const [name, setName] = useState("");
  const [longFormDidInput, setLongFormDidInput] = useState("");

  useEffect(() => {
    if (defaultDid) {
      setLongFormDidInput(defaultDid);
    }
  }, [defaultDid]);

  useEffect(() => {
    if (defaultName) {
      setName(defaultName);
    }
  }, [defaultName]);

  useEffect(() => {
    if (existingContact) {
      setName(existingContact.name);
    }
  }, [existingContact]);

  const onSuccessDelete = () => {
    toast.success("Contact successfully deleted!");
  };

  const onErrorDelete = (error) => {
    toast.error("Failed to delete contact. Please try again.");
    console.log("Failed to delete contact. Error: ", error);
  };

  const { data: myDid } = useFetchMyDid();
  const { mutate: addContact } = useAddContact();
  const { mutate: deleteContactById } = useDeleteContactById();
  const { mutate: updateContact } = useUpdateContact();

  const parseDid = () =>
    longFormDidInput.split(/[\s]+/).find((d) => d.includes("did:"));

  const submitContactForm = (e) => {
    e.preventDefault();
    // for now let's just check that it's an object. Assuming it came from the "Share Contact".
    if (existingContact) {
      // check for same ID
      if (longFormDidInput) {
        const longFormDid = parseDid();
        if (!longFormDid) {
          toast.error("Unable to parse DID. Check formatting and try again.");
          return;
        }
        const longFormDidId = longFormDid.split("?")[0];
        if (longFormDidId === existingContact.did) {
          updateContact({
            name,
            existingContact,
            longFormDid: longFormDid || null,
          });
          setOpen(false);
        } else {
          toast.error(
            "DID ID does not match this contact's ID. Please supply a correct DID or create a new contact for this DID."
          );
        }
      } else {
        updateContact({
          name,
          existingContact,
        });
      }

      return;
    } else {
      const longFormDid = parseDid();
      if (!longFormDid) {
        toast.error("Unable to parse DID. Check formatting and try again.");
        return;
      }
      if (!name) {
        toast.error("Please provide a name or the contact and try again.");
        return;
      }
      resolveDid(longFormDid)
        .then((res) => {
          addContact({
            didDocument: JSON.parse(res.data.document),
            name,
            myDid,
          });
          setOpen(false);
        })
        .catch((err) => {
          toast.error(
            "Unable to parse DID. Check formatting and try again. Long Form DID expected."
          );
          console.log(err);
        });
    }
  };

  const deleteContactConfirm = () => {
    toast(
      ({ closeToast }) => (
        <div>
          <p className="pb-4">Delete this contact?</p>
          <div className="flex space-x-4">
            <button
              type="button"
              onClick={() => {
                existingContact &&
                  deleteContactById(existingContact.id, {
                    onSuccess: onSuccessDelete,
                    onError: onErrorDelete,
                  });
                closeToast();
              }}
              className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Delete
            </button>
            <button
              type="button"
              onClick={closeToast}
              className="inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Cancel
            </button>
          </div>
        </div>
      ),
      { autoClose: false }
    );
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="absolute fixed overflow-hidden z-10"
        onClose={setOpen}
      >
        <div className="absolute inset-0 overflow-hidden">
          <Dialog.Overlay className="absolute inset-0" />

          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16">
            <Transition.Child
              as={Fragment}
              enter="transform transition ease-in-out duration-500 sm:duration-700"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transform transition ease-in-out duration-500 sm:duration-700"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <div className="pointer-events-auto w-screen max-w-md">
                <form className="flex h-full flex-col divide-y divide-gray-200 bg-white shadow-xl">
                  <div className="h-0 flex-1 overflow-y-auto">
                    <div className="bg-primary py-6 px-4 sm:px-6">
                      <div className="flex items-center justify-between">
                        <Dialog.Title className="text-lg font-medium text-white">
                          {" "}
                          Add or Update Contact{" "}
                          {existingContact && `- ${existingContact.name}`}
                        </Dialog.Title>
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            className="rounded-md bg-indigo-700 text-indigo-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                            onClick={() => setOpen(false)}
                          >
                            <span className="sr-only">Close panel</span>
                            <XIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>
                      <div className="mt-1">
                        <p className="text-sm text-indigo-300">
                          Add or update an existing contact in the form below.
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-1 flex-col justify-between">
                      <div className="divide-y divide-gray-200 px-4 sm:px-6">
                        <div className="space-y-6 pt-6 pb-5">
                          <div>
                            <label
                              htmlFor="project-name"
                              className="block text-md font-medium text-gray-900"
                            >
                              {" "}
                              Name{" "}
                            </label>
                            <div className="mt-1">
                              <input
                                type="text"
                                name="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                id="name"
                                className="block w-full border rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                              />
                            </div>
                          </div>
                          <div>
                            <label
                              htmlFor="description"
                              className="block text-md font-medium text-gray-900"
                            >
                              Paste Contact/Long Form Did
                            </label>
                            <div className="mt-1">
                              <textarea
                                id="didDocument"
                                name="didDocument"
                                value={longFormDidInput}
                                onChange={(e) =>
                                  setLongFormDidInput(e.target.value)
                                }
                                rows={4}
                                className="block w-full rounded-md border-2 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-shrink-0 justify-end px-4 py-4">
                    {existingContact && (
                      <button
                        type="button"
                        className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-red-700 shadow-sm hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                        onClick={() => deleteContactConfirm(existingContact)}
                      >
                        Delete
                      </button>
                    )}
                    <button
                      type="button"
                      className="ml-4 rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      onClick={() => setOpen(false)}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      onClick={(e) => submitContactForm(e)}
                      className="ml-4 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                      {existingContact ? "Update" : "Add"}
                    </button>
                  </div>
                </form>
              </div>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
