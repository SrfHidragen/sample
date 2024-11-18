/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-console */
'use client';
import React, { useCallback, useEffect, useState } from 'react';
import DashboardSidebar from './Sidebar';
import DashboardHeader from './Header';
import { useAuthStore } from '@/store/auth.store';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
const DashboardController = ({
  children,
  name,
  image,
}: {
  children: React.ReactNode;
  name: string;
  image: string;
}) => {
  const { data, update } = useSession();
  const isAuthenticated = useAuthStore((state) => state?.isAuthenticated);
  const UserDetails = useAuthStore((state) => state?.user?.userDetails);
  const setTokenInfo = useAuthStore((state) => state?.addAuthData);
  const [openSidebar, setOpenSidebar] = useState(false);
  const [isSmallSidebar, setIsSmallSidebar] = useState(false);

  const addProfileImage = useCallback(() => {
    update({
      name: UserDetails?.personal?.firstName,
      image: UserDetails?.personal?.avatar,
    });
  }, [UserDetails?.personal?.avatar, UserDetails?.personal?.firstName]);

  useEffect(() => {
    if (!isAuthenticated && data?.isAuthenticated) {
      setTokenInfo({
        token: data?.auth_token,
        userDetails: {
          personal: {
            firstName: data?.user?.name,
          },
        },
      });
      redirect('/dashboard');
    }
  }, [isAuthenticated, data]);

  useEffect(() => {
    if (UserDetails?.personal?.avatar || UserDetails?.personal?.firstName) {
      addProfileImage();
    }
  }, [UserDetails]);

  return (
    <div
      className={
        openSidebar
          ? 'relative flex min-h-screen w-full overflow-x-hidden'
          : 'relative flex min-h-screen w-full '
      }
    >
      {/* dashboard sidebar */}
      <DashboardSidebar
        isSmallSidebar={isSmallSidebar}
        setIsSmallSidebar={setIsSmallSidebar}
      />
      {/* main contents */}
      <div
        className={
          openSidebar
            ? 'min-w-screen min-h-full w-screen'
            : 'relative min-h-full w-full '
        }
      >
        <div
          className={
            openSidebar
              ? 'relative ml-[300px] min-w-full transition-all duration-500'
              : ' relative min-h-full w-full transition-all duration-500'
          }
        >
          {/* header */}
          <DashboardHeader
            openSidebar={openSidebar}
            setOpenSidebar={setOpenSidebar}
            name={name}
            image={image}
          />
          {/* children */}
          <div className="mx-auto max-w-[1500px] px-3 py-4 transition-all duration-500 md:px-5 md:py-6">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardController;
