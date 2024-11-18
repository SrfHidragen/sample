/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import React, { useCallback, useState } from 'react';
import Typography from '../Typography';
import { IoChevronDown } from 'react-icons/io5';
import { IoIosArrowDropleft, IoIosArrowDropright } from 'react-icons/io';
// import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import Link from 'next/link';
import { cn, encode, generateRandomId } from '@/lib/utils';
import { usePathname, useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/auth.store';
import { CiLock } from 'react-icons/ci';
import { getDashboardSidebarData } from './SidebarNavLink';
import { usePaymentProcess } from '@/store/paymentprocess.store';
import { PAYMENT_TYPE } from '@/types/paymentprocess.store.type';
import toast from 'react-hot-toast';
import Image from '@/components/Image';

interface SidebarProps {
  isSmallSidebar: boolean;
  // eslint-disable-next-line no-unused-vars
  setIsSmallSidebar: (open: boolean) => void;
}

const DashboardSidebar = ({
  isSmallSidebar,
  setIsSmallSidebar,
}: SidebarProps) => {
  const uniqueId = generateRandomId();
  const router = useRouter();
  // const paymentId = useId();
  //find path
  const pathname = usePathname();

  const { AddPaymentInfo, clearProcess } = usePaymentProcess();
  //User information
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);
  const UserDetails = useAuthStore((state) => state?.user?.userDetails);
  const isGiveHelpValid = UserDetails?.isRegistrationCompleted === false;
  const UserType = UserDetails?.userType || '';

  //Firstly Kyc firstly checked
  const IsKycVerified =
    UserDetails?.kycCompletion?.isAadhaar &&
    UserDetails?.kycCompletion?.isAddress &&
    UserDetails?.kycCompletion?.isBank;

  const IsGiveHelpProcess = !Number(UserDetails?.totalSpend);

  const IsInitialProcessingFeeChecked = UserDetails?.isProcessingFeePaid;

  type DebounceFunction<T extends any[]> = (...args: T) => void;

  const debounce = <T extends any[]>(
    func: DebounceFunction<T>,
    delay: number,
  ) => {
    let timeoutId: ReturnType<typeof setTimeout>;

    return (...args: T) => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };

  const initialPayment = useCallback(
    debounce((uniqueId: string) => {
      const encode_payment_id = encode(uniqueId);
      AddPaymentInfo(
        {
          amount: 16.4,
          unique_key: encode_payment_id,
          payment_type: PAYMENT_TYPE.PROCESSING_FEE,
          // payment_description_type: 'processingFee',
          total_amount: 20,
          tax: {
            gst_amount: 3.6,
            gst_percentage: 18,
          },
        },
        () => {
          router.push(
            `/dashboard/payment/about-payment?process=${encode_payment_id}`,
          );
        },
      );
    }, 300),
    [],
  );

  const toggleSettingsMenu = () => {
    setIsSettingsOpen((prev) => !prev);
  };
  const dashboardSidebarData = getDashboardSidebarData({
    isSmallSidebar,
    IsGiveHelpProcess,
    IsKycVerified,
    IsInitialProcessingFeeChecked,
    isGiveHelpValid,
  });
  return (
    <div className="dashboard-sidebar  relative bg-[#003186] ">
      <div
        className={cn(
          isSmallSidebar
            ? 'group fixed top-0 z-50 hidden  w-[70px] bg-[#003186] px-8 transition-all duration-500 lg:block'
            : 'group fixed top-0 z-50 hidden  w-[250px] bg-[#003186] px-8 transition-all duration-500 lg:block',
        )}
      >
        <div className="h-10"></div>
        <Link
          href={'/'}
          className={
            isSmallSidebar
              ? 'flex justify-center gap-0'
              : 'flex items-center  justify-start gap-3'
          }
        >
          {!isSmallSidebar ? (
            <div className="relative flex h-[60px] w-[210px] items-center">
              <Image
                src="/img/header/BETA.svg"
                alt="gnt_logo"
                className="w-full"
              />
            </div>
          ) : (
            <div className="w-[34px] flex-shrink-0">
              <img
                src="/img/dashboard/sidebar/logo.png"
                className="h-auto w-auto "
                alt=""
              />
            </div>
          )}
          {/* {!isSmallSidebar && (
            <div
              className={
                isSmallSidebar
                  ? 'w-0 opacity-0 transition-all duration-500'
                  : 'w-full opacity-100 transition-all duration-500'
              }
            >
              <Typography
                as="p"
                className="truncate text-xl font-medium text-tertiary"
              >
                give
                <Typography as="span" className="text-xl text-white">
                  N
                </Typography>
                take.
                <Typography as="span" className="text-xl text-[#44C7F4]">
                  world
                </Typography>
              </Typography>
            </div>
          )} */}
        </Link>
        <div className="h-3"></div>
      </div>
      <div
        className={
          isSmallSidebar
            ? 'sticky top-0 hidden  w-[70px]  flex-col  overflow-y-auto overflow-x-hidden px-4  transition-all duration-500 lg:block'
            : 'sticky top-0 hidden  w-[250px]  flex-col  overflow-y-auto overflow-x-hidden px-4  transition-all duration-500 lg:block'
        }
      >
        <div className="h-32"></div>
        <div
          className={
            isSmallSidebar
              ? 'flex h-[calc(100vh-220px)] flex-col  items-center gap-y-4 '
              : 'flex h-[calc(100vh-220px)]  flex-col gap-y-4  pr-2'
          }
        >
          {dashboardSidebarData.map((item) => {
            const IsAvailable = item?.UserType?.includes(UserType);
            return (
              !item?.isSmallNav && (
                <div key={item.id}>
                  {item.type === 'link' && (
                    <Link
                      onClick={(e) => {
                        if (!IsAvailable || item?.isLock) {
                          e.preventDefault();
                          return;
                        }
                      }}
                      href={item.link}
                      aria-disabled={!IsAvailable || item?.isLock}
                      tabIndex={!IsAvailable || item?.isLock ? -1 : undefined}
                      className={
                        !IsAvailable || item?.isLock
                          ? 'hide-sidebar-link cursor-not-allowed'
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
                          <div className="flex-shrink-0">{item.icon}</div>
                          {!isSmallSidebar && (
                            <Typography
                              as="p"
                              className="truncate text-sm font-medium"
                            >
                              {item.label}
                            </Typography>
                          )}
                        </div>
                        {(!IsAvailable || item?.isLock) && !isSmallSidebar && (
                          <CiLock className="text-lg font-extrabold" />
                        )}
                      </div>
                    </Link>
                  )}

                  {item.type === 'menu' && (
                    <div
                      aria-disabled={!IsAvailable || item?.isLock}
                      tabIndex={!IsAvailable || item?.isLock ? -1 : undefined}
                      onClick={() => {
                        if (!IsAvailable || item?.isLock) return;
                        if (isSmallSidebar) {
                          setIsSmallSidebar(false);
                        }
                        toggleSettingsMenu();
                      }}
                      className={cn(
                        `flex cursor-pointer items-center justify-between gap-3 rounded p-2 text-white duration-200 ease-linear hover:bg-white hover:text-black
                      ${(!IsAvailable || item?.isLock) && 'pointer-events-none'}
                      `,
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex-shrink-0">{item.icon}</div>
                        {!isSmallSidebar && (
                          <Typography as="p" className="truncate font-medium">
                            {item.label}
                          </Typography>
                        )}
                      </div>
                      {!isSmallSidebar && (
                        <IoChevronDown
                          className={`size-5 fill-white/60 transition-transform duration-300 ${
                            isSettingsOpen ? 'rotate-180' : 'rotate-0'
                          }`}
                        />
                      )}
                    </div>
                  )}

                  {item?.type === 'btn' && (
                    <>
                      <div
                        tabIndex={!IsAvailable || item?.isLock ? -1 : undefined}
                        aria-disabled={!IsAvailable || item?.isLock}
                        className={cn(
                          `flex cursor-pointer items-center justify-between rounded p-2  text-white duration-200 ease-linear hover:bg-white hover:text-black 
                        ${pathname === item?.link && 'bg-white text-black'}`,
                          (!IsAvailable || item?.isLock) &&
                            'pointer-events-none cursor-not-allowed',
                        )}
                        onClick={() => {
                          if (!IsAvailable || item?.isLock) return;
                          const CurrentPath = pathname
                            .split('/')
                            .some(
                              (item) =>
                                item === 'about-payment' ||
                                item === 'complete-payment' ||
                                item === 'verify-and-pay',
                            );
                          if (CurrentPath) {
                            return toast.error(
                              'Please pay KYC verification Fee !',
                            );
                          }
                          clearProcess();
                          initialPayment(uniqueId);
                        }}
                      >
                        <div className="flex items-center gap-3">
                          <div className="flex-shrink-0">{item.icon}</div>
                          {!isSmallSidebar && (
                            <Typography
                              as="p"
                              className="truncate text-sm font-medium"
                            >
                              {item.label}
                            </Typography>
                          )}
                        </div>
                        {(!IsAvailable || item?.isLock) && !isSmallSidebar && (
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
              )
            );
          })}
        </div>
      </div>
      <div
        onClick={() => {
          setIsSmallSidebar(!isSmallSidebar);
          if (!isSmallSidebar) {
            setIsSettingsOpen(false);
          }
        }}
        className={
          isSmallSidebar
            ? 'group fixed bottom-0  z-50 hidden w-[70px] cursor-pointer items-center justify-center gap-4 border-t-[1px] border-sky-800 bg-[#003186] py-5 text-white transition-all duration-500 lg:flex '
            : 'group fixed bottom-0  z-50 hidden w-[250px] cursor-pointer items-center justify-end gap-4 border-t-[1px] border-sky-800 bg-[#003186] px-8 py-5 text-white transition-all duration-500 lg:flex'
        }
      >
        {!isSmallSidebar ? (
          <>
            <IoIosArrowDropleft className="size-8 flex-shrink-0 duration-300 group-hover:-ml-3" />
          </>
        ) : (
          <>
            <IoIosArrowDropright className="size-8 duration-300 group-hover:ml-3 " />
          </>
        )}
      </div>
    </div>
  );
};

export default DashboardSidebar;
