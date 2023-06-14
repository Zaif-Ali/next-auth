import { NextPage } from "next";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { useClickOutside } from "@mantine/hooks";
interface Props {
  isOpen: boolean;
  closeModal: () => void;
}

const CardModal: NextPage<Props> = ({ isOpen, closeModal }) => {
  const ref = useClickOutside(closeModal);
  return (
    <>
      <Transition appear show={isOpen} as={Fragment} ref={ref}>
        <Dialog
          as="div"
          className=" fixed inset-0 z-10 overflow-y-auto "
          onClose={closeModal}
        >
          <div className="min-h-screen px-4 text-center ">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0  bg-gray-900 opacity-10" />
            </Transition.Child>

            <span
              className="inline-block h-screen align-middle "
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block  w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-gray-100 dark:bg-gray-800 border border-gray-700 shadow-xl rounded-2xl ">
                <Dialog.Title
                  as="h3"
                  className="text-base md:text-lg font-medium  leading-6 text-gray-800 dark:text-gray-300 "
                >
                  Are you sure want to Delete ?
                </Dialog.Title>

                <div className="mt-10 flex flex-row justify-end space-x-2">
                  <button
                    
                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-gray-800 border-2 border-gray-600 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gray-700"
                    
                  >
                    No, Cancel
                  </button>
                  <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                  >
                    Yes, im sure
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default CardModal;
