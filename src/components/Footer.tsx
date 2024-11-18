'use client';
import Link from 'next/link';
import React from 'react';
import { FaRegEnvelope, FaPhone } from 'react-icons/fa';
import { FaYoutube, FaFacebookF, FaInstagram } from 'react-icons/fa';
import { usePathname } from 'next/navigation';

const Footer = () => {
  const pathname = usePathname();
  return (
    <div
      className={`bg-[#00117A] ${!pathname.startsWith('/mobile') ? 'block' : 'hidden'}`}
    >
      <div
        className={
          !pathname.startsWith('/dashboard') ? 'container py-6' : 'hidden'
        }
      >
        <div
          className={
            !pathname.startsWith('/dashboard')
              ? '!h-auto !w-auto !rounded-none'
              : 'hidden'
          }
        >
          <div className="grid grid-cols-1 border-b-[1px] border-b-[#707070] pb-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            <div className="mb-6 text-sm font-light  text-white md:mb-0">
              <div className="mb-[13px] text-[15px] font-semibold text-tertiary md:mb-6">
                QUICK LINKS
              </div>
              <Link href="/about-us" className="mb-3 block">
                About giveNtake
              </Link>
              {/* <Link href="#" className="mb-3 block">
                Group of Organisations
              </Link> */}
              <Link href="/gallery" className="mb-3 block">
                Gallery
              </Link>
              <Link href="/contact-us" className="mb-3 block">
                Contact
              </Link>
              <Link href="/faq" className="mb-3 block">
                FAQ
              </Link>
            </div>
            <div className="mb-6 text-sm font-light  text-white md:mb-0">
              <div className="text-primary-yellow mb-[13px] text-[15px] font-semibold text-[#FFCC01] md:mb-6">
                INFO
              </div>

              <Link href="/web/terms-of-service" className="mb-3 block">
                Terms of Service
              </Link>
              <Link href="/web/privacy-policy" className="mb-3 block">
                Privacy Policy
              </Link>
              <Link href="/web/refund-policy" className="mb-3 block">
                Refund Policy
              </Link>
            </div>

            <div className="mb-6 text-sm  font-normal text-white md:mb-0 lg:block">
              <div className="text-primary-yellow mb-6 text-[15px] font-semibold text-[#FFCC01]">
                HELP
              </div>
              <div className="mb-3 flex items-center gap-[10px] text-[14px] font-light leading-[25px] text-white">
                <div className="">
                  <FaRegEnvelope size={24} />
                </div>
                {/* info@giventake.world */}
                <Link href="mailto:connect@hidragen.world">
                  info@giventake.world
                </Link>
              </div>
              <div className="mb-3 flex items-center gap-[10px] text-[14px] font-light leading-[25px] text-white">
                <div className="">
                  <FaPhone className="rotate-90" size={18} />
                </div>
                {/* +91 9846073366 */}
                <Link href="tel:+919846073366">+91 9846 073366</Link>
              </div>
              <div className="flex items-center gap-[8px]">
                <Link
                  target="_blank"
                  href={'https://www.youtube.com/c/GiventakeBusinessChannel'}
                  className="cursor-pointer rounded-full bg-red-500 p-2 text-base text-white hover:bg-red-600"
                >
                  <FaYoutube size={19} />
                </Link>
                <Link
                  target="_blank"
                  href={'https://www.facebook.com/giventakeworld'}
                  className="cursor-pointer rounded-full bg-blue-800 p-2 text-base text-white hover:bg-blue-700"
                >
                  <FaFacebookF size={19} />
                </Link>
                <Link
                  target="_blank"
                  href={'https://www.instagram.com/giventakeworld/'}
                  className="cursor-pointer rounded-full  bg-gradient-to-b from-[#833AB4] via-[#FD1D1D] to-[#FCB045] p-2 text-base text-white"
                >
                  <FaInstagram size={19} />
                </Link>
              </div>
            </div>

            <div className="mb-4 text-sm font-normal text-white md:mb-0  md:block  lg:border-l-[1px] lg:border-l-[#707070]  lg:pl-6">
              <div className="text-primary-yellow mb-6 text-sm font-bold text-[#FFCC01]">
                ADDRESS
              </div>
              <div className="mb-3 block">
                <span className="block text-[14px] font-light">
                  PRASANTH PANACHIKKAL ENTERPRISES
                </span>
                <span className="block text-[14px] font-light">PVT LTD</span>
                <span className="block text-[14px] font-light">
                  ROOM NO : 23/326/53
                </span>
                <span className="block text-[14px] font-light">
                  1st FLOOR N P TOWER GURUVAYOOR ROAD
                </span>
                <span className="block text-[14px] font-light">
                  NP TOWER, West Fort, 680004 Thrissur
                </span>
                <span className="block text-[14px] font-light">Kerala</span>
              </div>
            </div>
          </div>

          {/* bottom */}
          <div className="h-6"></div>
          <div className="">
            <div className="flex flex-col items-center">
              <div className="text-[14px] leading-[25px] text-white">
                © 2024 giveNtake.world
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
