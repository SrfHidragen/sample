import Typography from '@/components/Typography';
import Link from 'next/link';
import React from 'react';
import { FaRegStar } from 'react-icons/fa';

const DownLoadMobileAppNew = () => {
  return (
    <div className="py-8  md:py-16">
      <div className="container">
        <div className="flex flex-col-reverse items-center justify-center gap-5 md:flex-row md:justify-start md:gap-10 xl:gap-20">
          <div className="flex flex-col gap-5 text-center md:gap-10 md:text-left ">
            <Typography
              as="h2"
              className="hidden text-3xl font-medium leading-tight text-white md:block md:text-[45px] xl:text-[56px]"
            >
              Experience giveNtake at your fingertips
            </Typography>
            <Typography className="text-lg text-white">
              Download our mobile application to enjoy seamless experience
              Download our mobile application to enjoy seamless experience
              Download our mobile application to enjoy seamless experience
            </Typography>
            <div className="flex items-center justify-center gap-10 md:justify-start">
              <div className="text-left">
                <Typography className="text-[24px] font-medium text-white md:text-[28px] xl:text-[32px]">
                  2,00,000 +
                </Typography>
                <Typography className="text-lg text-white">
                  Active Users
                </Typography>
              </div>
              <div className="text-left">
                <Typography className="flex items-center gap-4 text-[24px] font-medium text-white md:text-[28px] xl:text-[32px]">
                  4.5{' '}
                  <Typography as="span" className="">
                    <FaRegStar />
                  </Typography>
                </Typography>
                <Typography className="text-lg text-white">
                  Playstore Rating
                </Typography>
              </div>
            </div>
            <div className="flex  flex-row items-center justify-center  gap-2 md:justify-start">
              <Link
                href={''}
                className=" flex  items-center gap-2 rounded-lg border border-white/60 bg-black px-3 py-2 md:w-fit md:gap-5"
              >
                <img className="h-7 w-7" src="/img/playstore-icon.png" alt="" />
                <div className="text-left">
                  <Typography className="text-xs font-normal text-white">
                    GET IT ON
                  </Typography>
                  <Typography className="text-base font-semibold text-white">
                    Google Play
                  </Typography>
                </div>
              </Link>
              <Link
                href={''}
                className=" flex  items-center gap-2 rounded-lg border border-white/60 bg-black px-3 py-2 md:w-fit md:gap-5"
              >
                <img className="h-8 w-auto" src="/img/apple-icon.png" alt="" />
                <div className="text-left">
                  <Typography className="text-xs font-normal text-white">
                    Download on the
                  </Typography>
                  <Typography className="text-base font-semibold text-white">
                    App Store
                  </Typography>
                </div>
              </Link>
            </div>
          </div>
          <div className="w-full max-w-[200px] md:max-w-xs lg:flex-shrink-0">
            <img className="w-full " src="/img/mobilenew.svg" alt="" />
          </div>
          <Typography
            as="h2"
            className="block text-center text-3xl font-medium leading-tight text-white md:hidden md:text-[45px] xl:text-[56px]"
          >
            Experience giveNtake at your fingertips
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default DownLoadMobileAppNew;
