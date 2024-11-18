/* eslint-disable no-irregular-whitespace */
import React from 'react';
import Typography from '@/components/Typography';
import Images from '@/components/Image';

const WordfromFounder = () => {
  return (
    <>
      <div className="container relative z-0 py-8 sm:z-20 md:py-16">
        <div className="shadow-right-bottom flex flex-col items-center rounded-3xl bg-tertiary !p-4  md:flex-row md:!px-20 md:!py-8">
          <div className="h-[289px] w-[215px] flex-shrink-0 rounded-3xl">
            <Images
              src="/img/homepage/sec-3-image.svg"
              alt="Prasanth Panachikkal"
              className="h-full w-full"
            />
          </div>
          <div className="relative py-14 md:pl-14">
            <Typography
              as="h1"
              className="text-center text-[20px] font-bold leading-[37px] text-black sm:text-[28px] md:text-left lg:text-[32px]"
            >
              A word from the founder
            </Typography>
            <div className="absolute left-1 top-10 h-[60px] w-8 sm:-top-2 sm:w-16 md:left-5 md:w-[64px] ">
              <Images
                src="/img/homepage/left-quote.svg"
                className="h-full w-full"
                alt="left-quote"
              />
            </div>
            <div className="absolute -right-3.5 bottom-[125px] h-[60px] w-8 sm:bottom-14 sm:w-16 md:right-[-58px] md:w-[64px] lg:-right-16 xl:-right-7">
              <Images
                src="/img/homepage/right-quote.svg"
                className="h-full w-full"
                alt="right-quote"
              />
            </div>
            <div className="">
              <div className="h-6"></div>
              <Typography
                as="p"
                className=" text-center leading-[28px] md:text-left"
              >
                Growing up with financial challenges taught me how much it means
                to help others. The happiness and relief I saw when I helped
                someone showed me the true value of my actions. I&apos;ve always
                strongly believed that great business ideas come from our
                passions, and my passion has been to help people. This led me to
                create giventake.world online helping platform, a concept where
                we can all help each other easily. This platform is my promise
                to keep supporting those in need of financial assistance. Think
                differently, and let change come for us and our country.
              </Typography>
              <div className="h-6"></div>
              <Typography as="h1" className="text-xl font-bold">
                Prasanth Panachikkal
              </Typography>
              <div className="h-3"></div>
              <Typography as="p" className="text-balance">
                Founder, CMD & CEO - Prasanth Panachikkal Enterprises Pvt. Ltd.
              </Typography>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WordfromFounder;
