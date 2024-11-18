/* eslint-disable @next/next/no-img-element */
import Typography from '@/components/Typography';
import React from 'react';
import Images from '@/components/Image';
import GradientCard from './GradientCard';

const DownloadMobileApp = () => {
  return (
    <div className="py-8 md:flex md:py-16">
      <div className="hidden w-full items-center justify-center md:flex md:justify-end xl:pl-0">
        <div className="text-white">
          <Typography
            as="h1"
            className="!text-[30px] font-bold xl:!text-[32px]"
          >
            Download Our Mobile App
          </Typography>
          {/* <img className="mb-5" src="/img/scanner.png" alt="" /> */}
          <div className="h-8"></div>
          <div className="h-[268px] w-[268px]">
            <Images src="/img/scanner.svg" alt="scanner-img" />
          </div>
          <div className="h-5"></div>
          <Typography className=" !text-[18px] font-normal">
            Scan to download
          </Typography>
          <div className="h-4"></div>
          <div className="flex items-center gap-[18px]">
            {/* <img src="/img/playstore.svg" alt="" /> */}
            <div className="h-[27px] w-[27px]">
              <Images src="/img/playstore.svg" alt="playstore-img" />
            </div>
            <Typography className="!text-[18px] font-normal">
              For Android
            </Typography>
          </div>
        </div>
      </div>
      <div className="relative flex w-full flex-col items-center justify-center md:flex-row md:justify-start">
        <div className="hidden h-full w-[15%] md:block 2xl:w-[20%]"></div>
        <Typography
          as="h1"
          className="block text-center !text-[20px] font-bold text-white md:hidden"
        >
          Download Our Mobile App
        </Typography>
        <div className="block h-8 md:hidden"></div>
        <div className="relative z-50 h-[224.17px] md:my-[60px] md:h-[449.58px]">
          <Images className="h-full w-full" src="/img/mobile.svg" alt="" />
        </div>
        <GradientCard
          className="to-[#001178 ]
absolute right-0 top-10 ml-auto flex h-[274px] w-full max-w-[50%] rounded-none from-[#415CFD] !p-0 shadow-lg md:top-0 md:h-auto md:min-h-full md:max-w-[70%] md:rounded-2xl  md:rounded-r-none md:from-[#031DC0] md:to-[#011487]"
        >
          <></>
        </GradientCard>
        <div className="h-8"></div>
        <div className="flex items-center  justify-center gap-2 md:hidden">
          <Images src="/img/playstore.svg" alt="" />
          <Typography className="font-normal text-white">
            Download for Android
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default DownloadMobileApp;
