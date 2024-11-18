/* eslint-disable no-unused-vars */
/* eslint-disable @next/next/no-img-element */
'use client';
import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { CgCloseO } from 'react-icons/cg';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import dynamic from 'next/dynamic';
import { useSession } from 'next-auth/react';
import useAuth from '@/hooks/useAuth';
const Images = dynamic(() => import('@/components/Image'));

function classNames(...classes: (string | null | undefined)[]): string {
  return classes.filter(Boolean).join(' ');
}

interface NavigationType {
  open: boolean;
  setOpen: (open: boolean) => void;
}
export default function Navigation({ open, setOpen }: NavigationType) {
  const { data } = useSession();
  const { logout } = useAuth();
  const pathname = usePathname();
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto relative w-screen max-w-[361px]">
                  {/* <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-500"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-500"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute left-0 top-0 -ml-8 flex pr-2 pt-4 sm:-ml-10 sm:pr-4">
                      <button
                        type="button"
                        className="relative rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                      >
                        <span className="absolute -inset-2.5" />
                        <span className="sr-only">Close panel</span>
                        <CgCloseO className="h-8 w-8" aria-hidden="true" />
                      </button>
                    </div>
                  </Transition.Child> */}
                  <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                    <div className="px-4 sm:px-6">
                      <Dialog.Title className="text-base font-semibold leading-6 text-gray-900">
                        <div className="relative flex items-center justify-between">
                          <Images
                            src="/img/gnt-mobile-logo.png"
                            alt="gnt-logo"
                            className="h-7 w-7"
                          />
                          <CgCloseO
                            onClick={() => setOpen(false)}
                            className="h-6 w-6"
                            aria-hidden="true"
                          />
                        </div>
                      </Dialog.Title>
                    </div>
                    <div className="h-10"></div>
                    <div className="relative flex-1 px-4 sm:px-6">
                      <div className="flex flex-col gap-6">
                        {data?.isAuthenticated && (
                          <Link
                            href={'/dashboard'}
                            className={classNames(
                              pathname == '/dashboard'
                                ? 'rounded-lg bg-[#0128AC] px-3 py-2 font-medium text-white'
                                : 'rounded-lg px-3 py-2 text-black hover:bg-[#0128AC] hover:text-white ',
                            )}
                          >
                            Dashboard
                          </Link>
                        )}
                        <Link
                          href={'/'}
                          className={classNames(
                            pathname == '/'
                              ? 'rounded-lg bg-[#0128AC] px-3 py-2 font-medium text-white'
                              : 'rounded-lg px-3 py-2 text-black hover:bg-[#0128AC] hover:text-white ',
                          )}
                        >
                          Home
                        </Link>
                        <Link
                          href={'/about-us'}
                          className={classNames(
                            pathname == '/about-us'
                              ? 'rounded-lg bg-[#0128AC] px-3 py-2 font-medium text-white'
                              : 'rounded-lg px-3 py-2 text-black hover:bg-[#0128AC] hover:text-white ',
                          )}
                        >
                          About Us
                        </Link>
                        <Link
                          href={'/gallery'}
                          className={classNames(
                            pathname == '/gallery'
                              ? 'rounded-lg bg-[#0128AC] px-3 py-2 font-medium text-white'
                              : 'rounded-lg px-3 py-2 text-black hover:bg-[#0128AC] hover:text-white ',
                          )}
                        >
                          Gallery
                        </Link>
                        <Link
                          href={'/contact-us'}
                          className={classNames(
                            pathname == '/contact-us'
                              ? 'rounded-lg bg-[#0128AC] px-3 py-2 font-medium text-white'
                              : 'rounded-lg px-3 py-2 text-black hover:bg-[#0128AC] hover:text-white ',
                          )}
                        >
                          Contact Us
                        </Link>
                      </div>
                      <div className="h-10"></div>
                      {data?.isAuthenticated ? (
                        <div
                          className="block cursor-pointer rounded-lg bg-[#FFCC01] px-4 py-2 text-center font-semibold text-black"
                          onClick={logout}
                        >
                          Logout
                        </div>
                      ) : (
                        <>
                          <Link href="/account/register?SignUp=terms-of-register">
                            <div className="block cursor-pointer rounded-lg border-2 border-tertiary px-4 py-2 text-center font-semibold ">
                              Register
                            </div>
                          </Link>
                          <div className="h-2"></div>
                          <Link href="/account?credential=SignIn">
                            <div className="block cursor-pointer rounded-lg bg-[#FFCC01] px-4 py-2 text-center font-semibold text-black">
                              Login
                            </div>
                          </Link>
                        </>
                      )}
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
