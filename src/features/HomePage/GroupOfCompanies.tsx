/* eslint-disable @next/next/no-img-element */
'use client';

import React from 'react';
import Typography from '@/components/Typography';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Autoplay } from 'swiper/modules';
import Images from '@/components/Image';
import GradientCard from './GradientCard';

const GroupOfCompaniesImages = [
  {
    src: '/img/Group-of-companies/gnt-logo.webp',
  },
  {
    src: '/img/Group-of-companies/ppe.webp',
  },
  {
    src: '/img/Group-of-companies/enterprise.webp',
  },
  // {
  //   src: '/img/Group-of-companies/games.webp',
  // },
  {
    src: '/img/Group-of-companies/technologies.webp',
  },
  {
    src: '/img/Group-of-companies/entertainment.webp',
  },
];

const GroupOfCompanies = () => {
  return (
    <div className="container relative pb-8 pt-8 md:pb-16 md:pt-16">
      {/* <div className="absolute -left-8 top-16 hidden lg:block">
        <div className="h-[400px] w-[300px]">
          <Images className="h-full w-full" src="/img/GnT.webp" alt="gnt" />
        </div>
      </div> */}
      <GradientCard className="hidden w-full rounded-2xl from-transparent to-transparent md:block lg:from-[#031cc0ad] lg:to-[#0115872e]">
        <div className="mx-auto w-full lg:w-10/12">
          <Typography as="h6" className=" font-semibold text-white">
            {' '}
            Group of Companies / Projects
          </Typography>
          <div className="h-4"></div>
          <div className="flex items-center gap-2">
            <div className="hidden h-[50px] w-[50px] lg:block">
              <Images className="h-full w-full" src="/img/logo.svg" alt="gnt" />
            </div>
            <Typography
              as="h6"
              className="text-xl font-semibold leading-snug text-tertiary lg:text-3xl lg:leading-[46px] xl:text-[40px]"
            >
              Prasanth Panachikkal Enterprises Pvt. Ltd.{' '}
            </Typography>
          </div>
          <div className="h-6"></div>
          <div className="grid grid-cols-1 gap-[42px] sm:grid-cols-2 md:grid-cols-3 xl:gap-8">
            {GroupOfCompaniesImages?.map((item, index) => (
              <div
                key={index}
                className="relative z-10 flex h-40 items-center justify-center rounded-[32px] border-2 border-tertiary
bg-[#001BC2] p-5"
              >
                <Images src={item?.src} className="h-fit w-fit" alt="" />
              </div>
            ))}
          </div>
        </div>
      </GradientCard>
      <div className="mb-10 block md:hidden">
        <div className="mx-auto lg:w-11/12 ">
          <Typography as="h6" className=" text-sm leading-snug text-white ">
            Prasanth Panachikkal Enterprises Pvt. Ltd.{' '}
          </Typography>
          <div className="h-3"></div>
          <Typography as="h6" className=" text-lg font-medium text-white">
            {' '}
            Group of Companies / Projects
          </Typography>
          <div className="h-3"></div>
          <Swiper
            loop={true}
            spaceBetween={10}
            slidesPerView={2}
            centeredSlides={true}
            autoplay={{
              delay: 0,
              disableOnInteraction: false,
            }}
            speed={2000}
            modules={[Autoplay]}
            className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 xl:gap-8"
          >
            {GroupOfCompaniesImages?.map((item, index) => (
              <SwiperSlide key={index} className="h-fit w-fit">
                <div className="relative flex h-[100px]  items-center justify-center rounded-[32px] border-2 border-secondary bg-primary p-4">
                  <Images src={item?.src} className="h-full w-auto" alt="" />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default GroupOfCompanies;
