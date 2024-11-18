'use client';
import React from 'react';
import Typography from './Typography';
import { usePathname } from 'next/navigation';

const Header = () => {
  const pathname = usePathname();
  return (
    <div className={pathname.startsWith('/dashboard') ? 'hidden' : 'container'}>
      <div className="flex items-center justify-between py-4">
        <div className="h-auto w-[200px]">
          <img
            src="/img/gnt-logo.png"
            alt="gnt-logo"
            className="h-full w-full"
          />
        </div>
        <Typography
          as="p"
          className="text-sm font-normal tracking-wider text-white"
        >
          info@giventake.world
        </Typography>
      </div>
    </div>
  );
};

export default Header;
