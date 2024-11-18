// /* eslint-disable @typescript-eslint/no-explicit-any */
// import React from 'react';
// import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
// import Avatar from '../Avatar';
// import useAuth from '@/hooks/useAuth';

// const UserMenu = ({ name }: any) => {
//   const { logout } = useAuth();
//   return (
//     <Menu>
//       <MenuButton>
//         <Avatar isImage={false} user_name={name} />
//       </MenuButton>

//       <MenuItems
//         transition
//         anchor="bottom end"
//         className="z-30 mt-2 w-60  rounded-xl border border-white/5 bg-white p-1 text-sm/6 text-black transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0"
//       >
//         <MenuItem>
//           <button
//             className="group flex w-full items-center gap-2 rounded-lg px-3 py-1.5 font-medium tracking-wide data-[focus]:bg-white/30"
//             onClick={logout}
//           >
//             Logout
//           </button>
//         </MenuItem>
//       </MenuItems>
//     </Menu>
//   );
// };

// export default UserMenu;

// import React, { useState, useCallback } from 'react';
// import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
// import Avatar from '../Avatar';
// import { IoSettingsOutline } from 'react-icons/io5';
// import Link from 'next/link';
// import useAuth from '@/hooks/useAuth';

// const UserMenu = ({ name }: any) => {
//   const { logout } = useAuth();
//   const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);

//   // Use useCallback to memoize the function and avoid unnecessary re-renders
//   const toggleSettingsMenu = useCallback(() => {
//     setIsSettingsOpen((prev) => !prev);
//   }, []);

//   const closeSettingsMenu = useCallback(() => {
//     setIsSettingsOpen(false);
//   }, []);

//   return (
//     <Menu as="div" className="relative inline-block text-left">
//       <MenuButton onClick={toggleSettingsMenu}>
//         <Avatar isImage={false} user_name={name} />
//       </MenuButton>

//       <MenuItem
//         as="div"
//         className="z-30 mt-2 w-60 rounded-xl border border-white/5 bg-white p-1 text-sm text-black shadow-lg transition duration-100 ease-out focus:outline-none"
//       >
//         <MenuItem>
//           {({ active }) => (
//             <button
//               onClick={toggleSettingsMenu}
//               className={`group flex w-full items-center gap-2 rounded-lg px-3 py-1.5 font-medium tracking-wide ${active ? 'bg-gray-200' : ''}`}
//             >
//               <IoSettingsOutline className="size-5 fill-black/60" />
//               <span className="ml-2">Settings</span>
//             </button>
//           )}
//         </MenuItem>

//         {isSettingsOpen && (
//           <div className="mt-2 rounded-xl border border-black/5 bg-gray-100 p-1 text-sm text-black shadow-lg transition duration-100 ease-out">
//             <Link
//               href="/dashboard/settings/update-email"
//               onClick={closeSettingsMenu}
//               className="group flex w-full items-center gap-2 truncate rounded-lg px-3 py-1.5 hover:bg-[#0128AC] font-medium"
//             >
//               Change Email Address
//             </Link>
//             <Link
//               href="/dashboard/settings/update-password"
//               onClick={closeSettingsMenu}
//               className="group flex w-full items-center gap-2 truncate rounded-lg px-3 py-1.5 hover:bg-[#0128AC] font-medium"
//             >
//               Change Password
//             </Link>
//             <Link
//               href="/dashboard/settings/update-mobile"
//               onClick={closeSettingsMenu}
//               className="group flex w-full items-center gap-2 truncate rounded-lg px-3 py-1.5 hover:bg-[#0128AC] font-medium"
//             >
//               Change Phone Number
//             </Link>
//             <Link
//               href="/dashboard/settings/receive-help-start-time"
//               onClick={closeSettingsMenu}
//               className="group flex w-full items-center gap-2 truncate rounded-lg px-3 py-1.5 hover:bg-[#0128AC] font-medium"
//             >
//               Receive Help Start Time
//             </Link>
//             <Link
//               href="/dashboard/settings/withdraw-limit"
//               onClick={closeSettingsMenu}
//               className="group flex w-full items-center gap-2 truncate rounded-lg px-3 py-1.5 hover:bg-[#0128AC] font-medium"
//             >
//               Withdrawal Limit
//             </Link>
//           </div>
//         )}

//         <MenuItem>
//           <button
//             className="group flex w-full items-center gap-2 rounded-lg px-3 py-1.5 font-medium tracking-wide data-[focus]:bg-white/30"
//             onClick={logout}
//           >
//             Logout
//           </button>
//         </MenuItem>
//       </MenuItem>
//     </Menu>
//   );
// };

// export default UserMenu;
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
// import { IoSettingsOutline } from 'react-icons/io5';
import { MdOutlineLogout } from 'react-icons/md';
import Avatar from '../Avatar';
import useAuth from '@/hooks/useAuth';
import Link from 'next/link';
import { useAuthStore } from '@/store/auth.store';
import Typography from '../Typography';
import { capitalizeFirstLetter } from '@/lib/utils';

const UserMenu = ({ name, image }: { name: string; image: string }) => {
  const { logout } = useAuth();
  const userType = useAuthStore((state) => state?.user?.userDetails)?.userType;
  // const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);

  // const toggleSettingsMenu = useCallback(() => {
  //   setIsSettingsOpen((prev) => !prev);
  // }, []);

  // const closeSettingsMenu = useCallback(() => {
  //   setIsSettingsOpen(false);
  // }, []);

  return (
    <Menu>
      <MenuButton>
        <div className="flex items-center gap-4">
          <Typography className="text-sm text-white">
            {capitalizeFirstLetter(name)}
          </Typography>
          <Avatar isImageAvailable={!!image} user_name={name} src={image} />
        </div>
      </MenuButton>

      <MenuItems
        transition
        anchor="bottom end"
        className="z-30 mt-2 w-60 rounded-xl border border-white/5 bg-white p-2 text-sm/6 text-black  transition-all  duration-300 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0"
      >
        {userType === 'consumer' && (
          <>
            <MenuItem>
              <Link
                href="/dashboard/settings/update-email"
                className="group flex w-full items-center gap-2 truncate rounded-lg px-3 py-1.5 font-medium hover:bg-[#0128AC] hover:text-white"
              >
                Change Email Address
              </Link>
            </MenuItem>
            <MenuItem>
              <Link
                href="/dashboard/settings/update-password"
                className="group flex w-full items-center gap-2 truncate rounded-lg px-3 py-1.5 font-medium hover:bg-[#0128AC] hover:text-white"
              >
                Change Password
              </Link>
            </MenuItem>
            <MenuItem>
              <Link
                href="/dashboard/settings/update-mobile"
                className="group flex w-full items-center gap-2 truncate rounded-lg px-3 py-1.5 font-medium hover:bg-[#0128AC] hover:text-white"
              >
                Change Phone Number
              </Link>
            </MenuItem>
            {/* <MenuItem>
              <Link
                href="/dashboard/settings/receive-help-start-time"
                className="group flex w-full items-center gap-2 truncate rounded-lg px-3 py-1.5 font-medium hover:bg-[#0128AC] hover:text-white"
              >
                Receive Help Start Time
              </Link>
            </MenuItem>

            <MenuItem>
              <Link
                href="/dashboard/settings/withdraw-limit"
                className="group flex w-full items-center gap-2 truncate rounded-lg px-3 py-1.5 font-medium hover:bg-[#0128AC] hover:text-white"
              >
                Withdrawal Limit
              </Link>
            </MenuItem> */}
            <MenuItem>
              <Link
                href="/dashboard/settings/my-account"
                className="group flex w-full items-center gap-2 truncate rounded-lg px-3 py-1.5 font-medium hover:bg-[#0128AC] hover:text-white"
              >
                My Account
              </Link>
            </MenuItem>
            <MenuItem>
              <Link
                href="/dashboard/settings/terms-of-service"
                className="group flex w-full items-center gap-2 truncate rounded-lg px-3 py-1.5 font-medium hover:bg-[#0128AC] hover:text-white"
              >
                Terms of Service
              </Link>
            </MenuItem>
          </>
        )}
        <MenuItem>
          <button
            className="group flex w-full items-center gap-2 truncate rounded-lg px-3 py-1.5 font-medium hover:bg-[#0128AC] hover:text-white"
            onClick={logout}
          >
            <MdOutlineLogout />
            Logout
          </button>
        </MenuItem>
      </MenuItems>
    </Menu>
  );
};

export default UserMenu;
