'use client';
import { Fragment, ReactNode, useRef } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { IoMdCloseCircleOutline } from 'react-icons/io';
import { cn } from '@/lib/utils';

interface DialogComponentProps {
  // eslint-disable-next-line no-unused-vars
  setOpen: (open: boolean) => void;
  open: boolean | undefined;
  children: ReactNode;
  title?: string;
  className?: string;
  isShowIcon?: boolean;
}

export default function DialogComponent({
  setOpen,
  open,
  children,
  className,
  title,
  isShowIcon = false,
}: DialogComponentProps) {
  const cancelButtonRef = useRef(null);
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-30"
        initialFocus={cancelButtonRef}
        onClose={() => setOpen(false)}
      >
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

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0 ">
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
                  'relative transform overflow-hidden rounded-[32px] border border-[#FFCC01] text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg',
                  className,
                )}
              >
                <div className="flex items-start justify-between rounded-t p-4">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    {title}
                  </Dialog.Title>
                  {!isShowIcon && (
                    <div className="ml-3 flex h-7 items-center">
                      <button
                        type="button"
                        className="rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        onClick={() => setOpen(false)}
                      >
                        <span className="sr-only">Close</span>
                        <IoMdCloseCircleOutline
                          className="h-[40px] w-[40px] text-white"
                          aria-hidden="false"
                        />
                      </button>
                    </div>
                  )}
                </div>
                <div className={cn('px-4 pb-4 pt-5 sm:p-6 sm:pb-4', className)}>
                  {children}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
