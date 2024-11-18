'use client';
import React from 'react';

import { HiMenu } from 'react-icons/hi';
import DashboardNavigation from './DashboardNavigation';
import { BsBellFill } from 'react-icons/bs';
import Link from 'next/link';
import DashboardBreadCrumb from '../DashboardBreadCrumb';
import UserMenu from '../UserMenu';
import { useAuthStore } from '@/store/auth.store';

type DashboardHeaderProps = {
  // eslint-disable-next-line no-unused-vars
  setOpenSidebar: (open: boolean) => void;
  openSidebar: boolean;
  name: string;
  image: string;
};

const DashboardHeader = ({
  openSidebar,
  setOpenSidebar,
  name,
  image,
}: DashboardHeaderProps) => {
  const user = useAuthStore((state) => state?.user);
  const userDetails = user?.userDetails;
  return (
    <div className=" sticky top-0 z-20 w-full">
      <div
        className={
          ' h-fit w-full bg-primary px-5 py-8 transition-all duration-500 lg:px-8 lg:py-10 xl:px-10'
        }
      >
        <div className="relative flex items-center justify-between">
          <DashboardBreadCrumb name={name} username={userDetails?.username} />

          <div className="flex items-center justify-center gap-3 lg:gap-5">
            {userDetails?.isUnreadNotifications ? (
              <Link
                href={'/dashboard/notifications'}
                className="relative hover:cursor-pointer"
              >
                <span className="absolute right-0 h-2.5 w-2.5 rounded-full bg-red-600"></span>
                <BsBellFill className="size-5 fill-white" />
              </Link>
            ) : (
              <Link href={'/dashboard/notifications'}>
                <BsBellFill className="size-5 fill-white" />
              </Link>
            )}

            <div className="hidden lg:block">
              <UserMenu name={name} image={image} />
            </div>
            <div
              onClick={() => setOpenSidebar(true)}
              className="block lg:hidden"
            >
              <HiMenu size={'1.8rem'} className="fill-white" />
            </div>
          </div>
        </div>
      </div>
      <DashboardNavigation open={openSidebar} setOpen={setOpenSidebar} />
    </div>
  );
};

export default DashboardHeader;
