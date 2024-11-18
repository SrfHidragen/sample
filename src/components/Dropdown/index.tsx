/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Menu, Transition } from '@headlessui/react';
import Link from 'next/link';
import React, { Fragment } from 'react';

type DropdownTypes = {
  name?: string | undefined | null;
  image?: string | undefined | null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  MenuButton?: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  MenuList: any;
  isProfile?: boolean;
};
export default function Dropdown({
  MenuButton,
  MenuList,
  name,
  image,
  isProfile = false,
}: DropdownTypes) {
  const avatarContent = image ? (
    <span className="inline-flex h-14 w-14 items-center justify-center overflow-hidden rounded-full border-[2px] border-dashed border-[#FFCC01]">
      <span className="inline-flex h-12 w-12 items-center justify-center overflow-hidden rounded-full border-[1px] border-dashed border-[#FFCC01]">
        <span className="inline-flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border-[.5px] border-dashed border-[#FFCC01]">
          <img src={image} alt="User Avatar" className="h-8 w-8 rounded-full" />
        </span>
      </span>
    </span>
  ) : (
    <span className="inline-flex h-14 w-14 items-center justify-center overflow-hidden rounded-full border-[2px] border-dashed border-[#FFCC01]">
      <span className="inline-flex h-12 w-12 items-center justify-center overflow-hidden rounded-full border-[1px] border-dashed border-[#FFCC01]">
        <span className="inline-flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border-[.5px] border-dashed border-[#FFCC01]">
          <span className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-[#FFCC01] bg-[#FFCC01] text-[#001BC2]">
            {name?.charAt(0).toUpperCase()}
          </span>
        </span>
      </span>
    </span>
  );
  return (
    <>
      <Menu as="div" className="relative  inline-block text-left">
        <Menu.Button className="w-full focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75">
          {MenuButton ? MenuButton : avatarContent}
        </Menu.Button>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0  z-10 mt-2 w-[270px] rounded-2xl  bg-[#001BC2] p-[5px] shadow-2xl ring-1 ring-black/5 focus:outline-none">
            {isProfile && (
              <div className="p-4">
                <Menu.Item as="div" className="border-none">
                  <div className="flex gap-4">
                    {avatarContent}
                    <div>
                      <h1 className="text-[16px] font-semibold text-white">
                        {name}
                      </h1>
                      <h1 className="text-[16px] font-semibold text-white">
                        9746729085
                      </h1>
                    </div>
                  </div>
                </Menu.Item>
              </div>
            )}
            <div className="border-none px-1 py-1">
              {MenuList?.map((item: any) => (
                <React.Fragment key={item?.id}>
                  {item?.isLink ? (
                    <Link href={item?.link}>
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            className={`${
                              active ? 'bg-[#FFCC01]' : ''
                            } text-md group flex w-full items-center gap-3 rounded-md p-3 text-white`}
                          >
                            {item?.icon}
                            {item?.name}
                          </button>
                        )}
                      </Menu.Item>
                    </Link>
                  ) : (
                    <div onClick={item?.link}>
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            className={`${
                              active ? 'bg-[#FFCC01]' : ''
                            } text-md group flex w-full items-center gap-3 rounded-md p-3 text-white`}
                          >
                            {item?.icon}
                            {item?.name}
                          </button>
                        )}
                      </Menu.Item>
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </>
  );
}
