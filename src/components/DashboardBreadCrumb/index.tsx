/* eslint-disable @typescript-eslint/no-explicit-any */
import { usePathname } from 'next/navigation';
import React from 'react';
import Typography from '../Typography';
import { capitalizeFirstLetter } from '@/lib/utils';
import { GrPrevious } from 'react-icons/gr';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/auth.store';
type DashboardBreadCrumbType = {
  name?: string;
  username?: string;
};

const DashboardBreadCrumb: React.FC<DashboardBreadCrumbType> = ({
  name,
  username,
}) => {
  const UserDetails = useAuthStore((state) => state?.user?.userDetails);
  const pathname = usePathname()?.split('/');
  const currentPath = pathname[pathname?.length - 1]?.split('-')?.join(' ');
  const NotificationPath = pathname.includes('notifications');
  const router = useRouter();

  const handleRouter = () => router.back();

  const giveNtakeTitle = () => {
    return (
      <span className="mx-1 truncate text-[18px] font-medium text-tertiary">
        give
        <span className="text-[18px] font-medium text-white">N</span>
        take.
        <span className="text-[18px] font-medium text-[#44C7F4]">world</span>
      </span>
    );
  };
  return (
    <>
      <div className="flex items-center gap-2">
        {currentPath !== 'dashboard' && (
          <div className="cursor-pointer p-4" onClick={handleRouter}>
            <GrPrevious className="font-bold text-white " size={20} />
          </div>
        )}
        {/* <Typography as="h4" className="hidden font-bold text-white lg:block">
          {currentPath === 'dashboard'
            ? `Hello ${name} ${UserDetails?.userType === 'consumer' && username ? '- ' + username : ''}, Welcome to ${giveNtakeTitle()} ${capitalizeFirstLetter(currentPath)}`
            : NotificationPath
              ? 'Notifications'
              : capitalizeFirstLetter(currentPath)}
        </Typography> */}
        <div className="hidden font-bold text-white lg:block ">
          {currentPath === 'dashboard' ? (
            <Typography as="h4" className="flex flex-col  xl:flex-row">
              Hello {name}
              {UserDetails?.userType === 'consumer' && username
                ? ` - ${username}`
                : ''}
              , Welcome to
              <span>
                {giveNtakeTitle()} {capitalizeFirstLetter(currentPath)}
              </span>
            </Typography>
          ) : NotificationPath ? (
            'Notifications'
          ) : (
            capitalizeFirstLetter(currentPath)
          )}
        </div>

        <Typography
          as="h5"
          className="block text-[22px] font-bold text-white lg:hidden"
        >
          {NotificationPath
            ? 'Notifications'
            : capitalizeFirstLetter(currentPath)}
        </Typography>
      </div>
    </>
  );
};

export default DashboardBreadCrumb;
