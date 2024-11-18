'use client';
import { Button } from '@/components/Button';
import Typography from '@/components/Typography';
import React from 'react';
import Images from '@/components/Image';
import GradientCard from './GradientCard';
import { useRouter } from 'next/navigation';

const HeroSection = () => {
  const router = useRouter();

  const onHandleRoute = () => router.push('/about-us');
  return (
    <div className="container">
      <div className="pb-8 pt-[55px] md:pb-16">
        <div className="mx-auto h-[182px] w-[191px]">
          <Images
            src="/img/homepage/logo.svg"
            alt="Logo"
            className="h-full w-full"
          />
        </div>
        <div className="h-8"></div>
        <div className="flex flex-col justify-center gap-8 md:flex-row">
          <GradientCard className="flex w-full items-center justify-center shadow-md drop-shadow-lg">
            <div className="mx-auto h-[115px] max-w-[428px]">
              <Images
                src="/img/homepage/image1.svg"
                alt="Logo"
                className="h-full w-full"
              />
            </div>
          </GradientCard>
          <GradientCard className="#00117A flex h-auto w-full items-center justify-center !px-6 shadow-md drop-shadow-lg">
            <div className="mx-auto h-[94px] max-w-[572px] content-center">
              <Images
                src="/img/homepage/image2.png"
                alt="Logo"
                className="h-auto w-full"
              />
            </div>
          </GradientCard>
        </div>

        <div className="h-4"></div>
        <div className="text-center">
          <Typography
            as="p"
            className="font-roboto text-[18px] leading-[32px] text-white"
          >
            The giveNtake.world online helping platform is the first business
            project (brand) of Prasanth Panachikkal Enterprises Private Limited.
          </Typography>
          <div className="h-6"></div>
          <Button
            className="shadow-bottom mx-auto h-[56px] w-[248px] rounded-2xl bg-tertiary px-14 py-4 text-black sm:shadow-none"
            variant="default"
            size="none"
            onClick={onHandleRoute}
          >
            Learn More
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
