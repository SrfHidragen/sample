'use client';

import React from 'react';
import { MdLocationOn } from 'react-icons/md';
import Typography from '@/components/Typography';
import Images from '@/components/Image';
import Link from 'next/link';
import ContactForm from './ContactForm';

const ContactUs = () => {
  const isAlert = false;

  return (
    <>
      <div>
        <div className="container py-20">
          <>
            <Typography
              as="h1"
              className="text-[28px] font-semibold leading-8 text-white lg:text-[36px] lg:leading-[42.19px]"
            >
              How Can we help you
            </Typography>
            <div className="h-[10px]"></div>
            <Typography as="h4" className="font-normal text-white">
              Have questions or feedback? We are here to help you. Please let us
              know how we can help you and you will get a response within 12
              hours
            </Typography>
          </>
          <div className="h-10"></div>
          <div className="flex flex-col-reverse gap-5 rounded-[10px] md:flex-row md:bg-white md:p-3 lg:gap-[38px]">
            <div className="flex w-full flex-col items-center justify-center rounded-2xl bg-[#001ABD] from-[#001BC2] via-[#001BC2] to-[#041790] px-4 py-6 md:bg-gradient-to-b md:py-0 lg:max-w-[491px]">
              <div className="flex flex-col gap-[30px]">
                <Typography
                  as="h1"
                  className="font-semibold leading-8 text-white"
                >
                  Contact Us
                </Typography>
                <div className="flex items-center gap-2 lg:gap-9">
                  <div className="h-6 w-6">
                    <Images
                      src="/img/contact/whatsapp1.svg"
                      alt="WhatsApp Icon"
                      className="h-full w-full"
                    />
                  </div>
                  <Link
                    href="tel:+919846073366"
                    className="text-[13px] font-normal leading-[18.75px] text-white sm:text-[16px]"
                  >
                    +91 9846 073366
                  </Link>
                </div>

                <div className="flex items-center gap-2 lg:gap-9">
                  <div className="h-6 w-6">
                    <Images
                      src="/img/contact/message.svg"
                      alt="Email Icon"
                      className="h-full w-full"
                    />
                  </div>
                  <Link
                    href="mailto:connect@hidragen.world"
                    className="text-[13px] font-normal leading-[18.75px] text-white sm:text-[16px]"
                  >
                    info@prasanthpanachikkalenterprises.world
                  </Link>
                </div>

                <div className="flex items-start gap-2 lg:gap-9">
                  <div className="h-6 w-6">
                    <MdLocationOn size={24} className="text-[#00AFF0]" />
                  </div>
                  <div className="text-[13px] font-normal leading-[18.75px] text-white sm:text-[16px]">
                    <p>PRASANTH PANACHIKKAL ENTERPRISES PVT</p>
                    <p>LTD ROOM NO : 23/326/53 1st FLOOR N P</p>
                    <p>TOWER GURUVAYOOR ROAD NP TOWER,West Fort,</p>
                    <p>680004 Thrissur, Kerala</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full rounded-[10px] bg-white p-4">
              <ContactForm />
              {isAlert && (
                <div
                  className="mb-4 rounded-lg bg-green-50 p-4 text-sm text-green-800 dark:bg-gray-800 dark:text-green-400"
                  role="alert"
                >
                  <span className="font-medium">
                    Email Sended Successfully!
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactUs;
