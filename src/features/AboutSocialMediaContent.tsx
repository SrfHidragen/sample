/* eslint-disable @typescript-eslint/no-explicit-any */
import Typography from '@/components/Typography';
import Link from 'next/link';
import React from 'react';

const AboutSocialMediaContent = ({ channelData }: { channelData: any }) => {
  return (
    <div className="mx-auto w-full md:w-11/12 lg:w-10/12 xl:w-9/12">
      {/* main content */}
      <div>
        <Typography as="h6" className="text-lg font-bold text-white">
          {channelData?.title}
        </Typography>
        <div className="h-3"></div>
        <Typography as="p" className="font-sm text-wrap font-light text-white">
          {channelData?.description}
        </Typography>
      </div>
      <div className="h-10"></div>
      <div className="">
        <Typography className="text-lg font-bold text-white" as="h6">
          All giveNtake {channelData?.type} Channels
        </Typography>
        <div className="h-4"></div>
        {channelData?.channelLists?.map((item: any, index: any) => (
          <div
            className="flex flex-col gap-3 border-b border-tertiary/50 py-8"
            key={index}
          >
            <div className="flex items-center gap-3">
              <img
                className="h-8 w-8"
                src={item?.icon}
                alt={item?.channelName}
              />
              <Typography as="p" className="text-white">
                {item?.channelName}
              </Typography>
            </div>
            <div className="ml-auto w-fit">
              <Link className="ml-auto w-fit" href={item?.link} target="_blank">
                <Typography
                  as="p"
                  className="w-fit rounded bg-tertiary px-3.5 py-2 font-medium hover:bg-tertiary/90"
                >
                  {' '}
                  {item?.btnTitle || 'View Link'}
                </Typography>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutSocialMediaContent;
