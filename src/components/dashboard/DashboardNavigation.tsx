/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
'use client';
import { Fragment, useId, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
// import { CgCloseO } from 'react-icons/cg';
import Link from 'next/link';
import Image from 'next/image';
import Typography from '@/components/Typography';
import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import useAuth from '@/hooks/useAuth';
import { IoChevronDown } from 'react-icons/io5';
import { CiLock } from 'react-icons/ci';
import { cn, encode } from '@/lib/utils';
import { useAuthStore } from '@/store/auth.store';
import { getDashboardSidebarData } from './SidebarNavLink';
import { usePaymentProcess } from '@/store/paymentprocess.store';
import { PAYMENT_TYPE } from '@/types/paymentprocess.store.type';

// function classNames(...classes: (string | null | undefined)[]): string {
//   return classes.filter(Boolean).join(' ');
// }

// interface DashboardNavigationType {
//   id: number;
//   label: string;
//   link: string;
//   icon: React.ReactNode;
// }

interface NavigationType {
  open: boolean;
  setOpen: (open: boolean) => void;
}

// const dashboardSidebarData = [
//   {
//     id: 1,
//     label: 'Dashboard',
//     link: '/dashboard',
//     type: 'link',
//     UserType: ['indirect_customer', 'invited_customer', 'consumer'],
//     icon: (
//       <img
//         src="/img/dashboard/sidebar/dashboard-logo.png"
//         className={'h-auto w-5'}
//         alt=""
//       />
//     ),
//   },
//   {
//     id: 2,
//     label: 'Receive Help',
//     link: '/dashboard/receive-help-chart',
//     type: 'link',
//     UserType: ['consumer'],
//     icon: <RiUserReceived2Line className={'size-5'} />,
//   },
//   {
//     id: 3,
//     label: 'Give Help',
//     link: '/dashboard/give-help',
//     type: 'link',
//     UserType: ['consumer'],
//     icon: <RiUserShared2Line className={'size-5'} />,
//   },
//   {
//     id: 4,
//     label: 'Receive Help History',
//     link: '/dashboard/all-transactions/receive-help-history',
//     type: 'link',
//     UserType: ['consumer'],
//     icon: <MdOutlineWorkHistory className={'size-5'} />,
//   },
//   {
//     id: 5,
//     label: 'Give Help History',
//     link: '/dashboard/all-transactions/give-help-history',
//     type: 'link',
//     UserType: ['consumer'],
//     icon: <RiFileHistoryFill className={'size-5'} />,
//   },
//   {
//     id: 6,
//     label: 'Withdrawal',
//     link: '/dashboard/all-transactions/withdrawal-history',
//     type: 'link',
//     UserType: ['consumer'],
//     icon: <PiHandWithdraw className={'size-5'} />,
//   },
//   {
//     id: 7,
//     label: 'PMF',
//     link: '/dashboard/all-transactions/pmf-history',
//     type: 'link',
//     UserType: ['consumer'],
//     icon: <PiCashRegisterBold className={'size-5'} />,
//   },
//   {
//     id: 8,
//     label: 'Customer Follow Up',
//     link: '/dashboard/customer-followup',
//     type: 'link',
//     UserType: ['consumer'],
//     icon: <IoPeopleSharp className={'size-5'} />,
//   },
//   {
//     id: 9,
//     label: 'Support',
//     link: '/support',
//     type: 'link',
//     UserType: ['indirect_customer', 'invited_customer', 'consumer'],
//     icon: <MdSupportAgent className={'size-5'} />,
//   },
//   // {
//   //   id: 3,
//   //   label: 'My Account',
//   //   link: '/dashboard/my-account',
//   //   type: 'link',
//   //   UserType: [''],
//   //   icon: (
//   //     <MdAccountCircle className={isSmallSidebar ? 'size-7' : 'size-5'} />
//   //   ),
//   // },

//   {
//     id: 6,
//     label: 'Settings',
//     link: '/dashboard',
//     type: 'menu',
//     UserType: ['consumer'],
//     // UserType: ['indirect_customer', 'invited_customer', 'consumer'],
//     icon: <IoSettingsOutline className={'size-5'} />,
//   },
// ];

export default function DashboardNavigation({ open, setOpen }: NavigationType) {
  const { logout } = useAuth();
  const router = useRouter();
  const paymentId = useId();
  const { AddPaymentInfo } = usePaymentProcess();
  const UserDetails = useAuthStore((state) => state?.user?.userDetails);

  const isGiveHelpValid = UserDetails?.isRegistrationCompleted === false;
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);
  const pathname = usePathname();
  useEffect(() => {
    setOpen(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const toggleSettingsMenu = () => {
    setIsSettingsOpen((prev) => !prev);
  };

  const isSmallSidebar = false;
  const UserType = UserDetails?.userType || '';

  const initialPayment = () => {
    const encode_payment_id = encode(paymentId);
    AddPaymentInfo(
      {
        amount: 16.95,
        unique_key: encode_payment_id,
        payment_type: PAYMENT_TYPE.PROCESSING_FEE,
        // payment_description_type: 'processingFee',
        total_amount: 20,
        tax: {
          gst_amount: 3.05,
          gst_percentage: 18,
        },
      },
      () => {
        router.push(
          `/dashboard/payment/about-payment?process=${encode_payment_id}`,
        );
      },
    );
  };
  const IsKycVerified =
    UserDetails?.kycCompletion?.isAadhaar &&
    UserDetails?.kycCompletion?.isAddress &&
    UserDetails?.kycCompletion?.isBank;
  const IsGiveHelpProcess = !Number(UserDetails?.totalSpend);

  const IsInitialProcessingFeeChecked = UserDetails?.isProcessingFeePaid;
  const dashboardSidebarData = getDashboardSidebarData({
    isSmallSidebar,
    IsGiveHelpProcess,
    IsKycVerified,
    IsInitialProcessingFeeChecked,
    isGiveHelpValid,
  });
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className={open ? 'relative z-30 block lg:hidden' : ' opacity-0'}
        onClose={setOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-40 transition-opacity" />
        </Transition.Child>

        <div className="dashboard-sidebar fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 left-0 flex max-w-full ">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto relative w-[300px]">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-500"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-500"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute -right-14 top-0  flex pr-2 pt-4  sm:pr-4">
                      <button
                        type="button"
                        className="relative rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                        onClick={() => setOpen(false)}
                      >
                        <span className="absolute -inset-2.5" />
                        <span className="sr-only">Close panel</span>
                        {/* <CgCloseO className="h-8 w-8" aria-hidden="true" /> */}
                      </button>
                    </div>
                  </Transition.Child>
                  <div className="flex h-full flex-col  bg-[#003186] py-6 shadow-xl">
                    <div className="px-4 sm:px-6">
                      <Dialog.Title className="text-base font-semibold leading-6 text-gray-900">
                        <Link
                          href={'/'}
                          className="relative flex h-[60px] justify-center"
                        >
                          <Image
                            src="/img/header/BETA.svg"
                            alt="logo"
                            className="w-3/4"
                            width={100}
                            height={100}
                            quality={100}
                          />
                        </Link>
                      </Dialog.Title>
                    </div>
                    <div className="relative mt-10 flex-1 overflow-y-auto px-4 sm:px-6">
                      <div className="flex flex-col gap-6">
                        {dashboardSidebarData.map((item) => {
                          const IsAvailable =
                            item?.UserType?.includes(UserType);

                          return (
                            <div key={item.id}>
                              {item.type === 'link' && (
                                <Link
                                  href={item.link}
                                  aria-disabled={!IsAvailable || item?.isLock}
                                  tabIndex={
                                    !IsAvailable || item?.isLock
                                      ? -1
                                      : undefined
                                  }
                                  className={
                                    !IsAvailable || item?.isLock
                                      ? 'pointer-events-none'
                                      : ''
                                  }
                                >
                                  <div
                                    className={cn(
                                      `flex cursor-pointer items-center justify-between rounded p-2  text-white duration-200 ease-linear hover:bg-white hover:text-black 
                        ${pathname === item?.link && 'bg-white text-black'}`,
                                    )}
                                  >
                                    <div className="flex items-center gap-3">
                                      <div className="flex-shrink-0">
                                        {item.icon}
                                      </div>

                                      <Typography
                                        as="p"
                                        className="truncate text-sm font-medium"
                                      >
                                        {item.label}
                                      </Typography>
                                    </div>
                                    {!IsAvailable ||
                                      (item?.isLock && (
                                        <CiLock className="text-lg font-extrabold" />
                                      ))}
                                  </div>
                                </Link>
                              )}

                              {item.type === 'menu' && (
                                <div
                                  aria-disabled={!IsAvailable || item?.isLock}
                                  tabIndex={
                                    !IsAvailable || item?.isLock
                                      ? -1
                                      : undefined
                                  }
                                  onClick={() => {
                                    if (!IsAvailable || item?.isLock) return;
                                    toggleSettingsMenu();
                                  }}
                                  className={cn(
                                    `flex cursor-pointer items-center justify-between gap-3 rounded p-2 text-white duration-200 ease-linear hover:bg-white hover:text-black
                      ${(!IsAvailable || item?.isLock) && 'pointer-events-none'}
                      `,
                                  )}
                                >
                                  <div className="flex items-center gap-3">
                                    <div className="flex-shrink-0">
                                      {item.icon}
                                    </div>
                                    <Typography
                                      as="p"
                                      className="truncate font-medium"
                                    >
                                      {item.label}
                                    </Typography>
                                  </div>
                                  {IsAvailable || !item?.isLock ? (
                                    <IoChevronDown
                                      className={`size-5 fill-white/60 transition-transform duration-300 ${
                                        isSettingsOpen
                                          ? 'rotate-180'
                                          : 'rotate-0'
                                      }`}
                                    />
                                  ) : (
                                    <CiLock className="text-lg font-extrabold" />
                                  )}
                                </div>
                              )}

                              {item?.type === 'btn' && (
                                <>
                                  <div
                                    tabIndex={
                                      !IsAvailable || item?.isLock
                                        ? -1
                                        : undefined
                                    }
                                    aria-disabled={!IsAvailable || item?.isLock}
                                    className={cn(
                                      `flex cursor-pointer items-center justify-between rounded p-2  text-white duration-200 ease-linear hover:bg-white hover:text-black 
                        ${pathname === item?.link && 'bg-white text-black'}`,
                                      (!IsAvailable || item?.isLock) &&
                                        'pointer-events-none cursor-not-allowed',
                                    )}
                                    onClick={initialPayment}
                                  >
                                    <div className="flex items-center gap-3">
                                      <div className="flex-shrink-0">
                                        {item.icon}
                                      </div>
                                      {!isSmallSidebar && (
                                        <Typography
                                          as="p"
                                          className="truncate text-sm font-medium"
                                        >
                                          {item.label}
                                        </Typography>
                                      )}
                                    </div>
                                    {(!IsAvailable || item?.isLock) &&
                                      !isSmallSidebar && (
                                        <CiLock className="text-lg font-extrabold" />
                                      )}
                                  </div>
                                </>
                              )}
                              {item.type === 'menu' && isSettingsOpen && (
                                <div className="mt-2 rounded-xl border border-white/5 bg-white/5 p-1 text-sm/6 text-white transition duration-100 ease-out">
                                  <Link href="/dashboard/settings/update-email">
                                    <div className="group flex w-full cursor-pointer items-center gap-2 truncate rounded-lg px-3 py-1.5 hover:bg-white hover:text-black data-[focus]:bg-white/10">
                                      Change Email Address
                                    </div>
                                  </Link>
                                  <Link href="/dashboard/settings/update-password">
                                    <div className="group flex w-full cursor-pointer items-center gap-2 truncate rounded-lg px-3 py-1.5 hover:bg-white hover:text-black data-[focus]:bg-white/10">
                                      Change Password
                                    </div>
                                  </Link>
                                  <Link href="/dashboard/settings/update-mobile">
                                    <div className="group flex w-full cursor-pointer items-center gap-2 truncate rounded-lg px-3 py-1.5 hover:bg-white hover:text-black data-[focus]:bg-white/10">
                                      Change Phone Number
                                    </div>
                                  </Link>
                                  <Link href="/dashboard/settings/my-account">
                                    <div className="group flex w-full cursor-pointer items-center gap-2 truncate rounded-lg px-3 py-1.5 hover:bg-white hover:text-black data-[focus]:bg-white/10">
                                      My Account
                                    </div>
                                  </Link>

                                  <Link href="/dashboard/settings/terms-of-service">
                                    <div className="group flex w-full cursor-pointer items-center gap-2 truncate rounded-lg px-3 py-1.5 hover:bg-white hover:text-black data-[focus]:bg-white/10">
                                      Terms of Service
                                    </div>
                                  </Link>

                                  {/* <Link href="/dashboard/settings/receive-help-start-time">
                                    <div className="group flex w-full cursor-pointer items-center gap-2 truncate rounded-lg px-3 py-1.5 hover:bg-white hover:text-black data-[focus]:bg-white/10">
                                      Receive Help Start Time
                                    </div>
                                  </Link>
                                  <Link href="/dashboard/settings/withdraw-limit">
                                    <div className="group flex w-full cursor-pointer items-center gap-2 truncate rounded-lg px-3 py-1.5 hover:bg-white hover:text-black data-[focus]:bg-white/10">
                                      Withdrawal Limit
                                    </div>
                                  </Link> */}
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                      <div className="mt-10">
                        <div
                          className="mb-2 block rounded-2xl bg-tertiary px-4 py-2 text-center font-semibold text-black"
                          onClick={logout}
                        >
                          Logout
                        </div>

                        {/* <Link href="/login">
                          <div className="block rounded-2xl bg-[#FFCC01] px-4 py-2 text-center font-semibold text-black">
                            Login
                          </div>
                        </Link> */}
                      </div>
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
