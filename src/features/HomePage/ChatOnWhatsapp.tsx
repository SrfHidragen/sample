/* eslint-disable @next/next/no-img-element */
'use client';

import { Button } from '@/components/Button';
import Images from '@/components/Image';
import Typography from '@/components/Typography';
import React from 'react';

const ChatOnWhatsapp = () => {
  const handleChatOnWhatsapp = () => {
    window.open(
      'https://wa.me/919846073366?text=I%27m%20interested%20in%20your%20services',
      '_blank',
    );
  };

  return (
    <div className="container flex flex-col items-center gap-5 pb-8 pt-8 sm:gap-10 md:flex-row md:pb-16 md:pt-16 xl:gap-20">
      <div className="w-full max-w-[200px] sm:max-w-xs md:flex-shrink-0">
        <Images className="" src={'/img/homepage/chatonwhatsapp.svg'} alt="" />
      </div>
      <div className="w-full text-center md:text-left">
        <Typography className="!text-2xl font-medium leading-snug text-white sm:!text-[32px]">
          Not Sure where to begin?
        </Typography>
        <div className="h-6 sm:h-8"></div>
        <Typography className="!text-base font-normal leading-loose text-white">
          If you have an interest in gaining a comprehensive understanding of
          the business opportunity offered by the world&apos;s first online
          helping platform, which enables you to provide unconditional financial
          help directly to ten individuals, without the involvement of
          intermediaries, addressing the personal financial needs within our
          society, and receive financial help directly from 2,046 individuals,
          ranging from Rs. 150 to Rs. 82,95,500, without intermediaries, please
          reach out via WhatsApp at
        </Typography>
        <div className="h-6 sm:h-8"></div>
        <div className="text-center">
          <Button
            className="w-full max-w-[403px] rounded-3xl bg-tertiary py-3"
            variant={'default'}
            onClick={handleChatOnWhatsapp}
          >
            <div className="flex items-center justify-center gap-1">
              <div className="h-30 w-30">
                <Images src="/img/contact/whatsapp2.svg" alt="WhatsApp Icon" />
              </div>
              <span className="text-[16px] font-semibold leading-[18.75px] text-black">
                Interested, Chat on WhatsApp
              </span>
            </div>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatOnWhatsapp;
