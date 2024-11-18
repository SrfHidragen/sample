/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Menu, MenuButton, MenuItems } from '@headlessui/react';
// import { IoSettingsOutline } from 'react-icons/io5';
import { MdOutlineLogout } from 'react-icons/md';
import Avatar from '../Avatar';
import useAuth from '@/hooks/useAuth';
import Link from 'next/link';

const HomeUserMenu = ({ name, id, image }: any) => {
  const { logout } = useAuth();

  return (
    <Menu key={id}>
      <MenuButton>
        <Avatar user_name={name} src={image} isImageAvailable={!!image} />
      </MenuButton>

      <MenuItems
        transition
        anchor="bottom end"
        className="z-30 mt-2 w-60 rounded-xl border border-white/5 bg-white p-2 text-sm/6 text-black  transition-all  duration-300 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0"
      >
        <Link
          href="/dashboard"
          className="group flex w-full items-center gap-2 truncate rounded-lg px-3 py-1.5 font-medium hover:bg-[#0128AC] hover:text-white"
        >
          Dashboard
        </Link>

        <button
          className="group flex w-full items-center gap-2 truncate rounded-lg px-3 py-1.5 font-medium hover:bg-[#0128AC] hover:text-white"
          onClick={logout}
        >
          <MdOutlineLogout />
          Logout
        </button>
        {/* </MenuItem> */}
      </MenuItems>
    </Menu>
  );
};

export default HomeUserMenu;
