'use client';

import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { cn } from '@/lib/utils';
import { IoMdCloseCircleOutline } from 'react-icons/io';
import { useDialogStore } from '@/store/dialog.store';

export default function DialogComponent() {
  const { isOpen, closeDialog, title, children, className, titleClass } =
    useDialogStore();

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={closeDialog}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel
                className={cn(
                  `relative min-h-96 w-full max-w-5xl rounded-xl bg-white p-3 ${className}`,
                )}
              >
                <div
                  onClick={closeDialog}
                  className="absolute right-2 top-2 z-10 h-fit w-fit cursor-pointer"
                >
                  <IoMdCloseCircleOutline
                    size={'1.6rem'}
                    className="fill-red-500"
                  />
                </div>
                {title !== '' && (
                  <Dialog.Title
                    className={cn(
                      `relative text-center font-bold ${titleClass}`,
                    )}
                  >
                    {title}
                  </Dialog.Title>
                )}

                <div className="h-4 "></div>
                <div className="text-left">{children}</div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
