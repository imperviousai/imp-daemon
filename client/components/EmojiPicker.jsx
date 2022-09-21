/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useRef, useEffect } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon, PencilAltIcon } from "@heroicons/react/solid";
import { EmojiHappyIcon } from "@heroicons/react/outline";
import data from "@emoji-mart/data";
import { Picker } from "emoji-mart";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Pick = (props) => {
  const ref = useRef();

  useEffect(() => {
    new Picker({ ...props, data, ref });
  }, [props]);

  return <div ref={ref} />;
};

export default function EmojiPicker({ onEmojiSelect }) {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex justify-center w-full rounded-md py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 ">
          <EmojiHappyIcon className="h-6 w-6" aria-hidden="true" />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="origin-top-right absolute left-0 bottom-12 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none">
          <div className="py-1">
            <Menu.Item>
              {({ active }) => <Pick onEmojiSelect={onEmojiSelect} />}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
