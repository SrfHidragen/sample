/* eslint-disable @next/next/no-img-element */
'use client';
import Image from 'next/image';
import React, { useState } from 'react';
import { FaPlay } from 'react-icons/fa';
import { PhotoProvider, PhotoView } from 'react-photo-view';

import 'react-photo-view/dist/react-photo-view.css';
import { Annual_2024_images } from '@/lib/constant';
import Typography from '@/components/Typography';
import Modal from '@/components/Modal';
import GradientCard from './GradientCard';

const Conferrence = () => {
  const [openModal, setOpenModal] = useState(false);
  return (
    <>
      <div className=" font-roboto  container pb-8 pt-8 md:pb-16 md:pt-16">
        <GradientCard className=" !p-5 sm:!p-8">
          <div className="flex items-center justify-start gap-3 ">
            <FaPlay className="text-red-600" size={'1.2rem'} />
            <span className="font-bold text-white">WATCH</span>
          </div>
          <div className="h-1 sm:h-4"></div>
          <Typography className="hidden text-xl font-bold text-white sm:block">
            Prasanth Panachikkal Enterprises Pvt. Ltd.
          </Typography>
          <Typography
            as="h1"
            className="!text-base !font-normal text-white sm:!text-5xl sm:!font-bold"
          >
            5th Annual Day (2024)
          </Typography>
          <Typography
            as="h1"
            className="mt-3 block text-2xl !font-medium text-white sm:mt-5 sm:hidden"
          >
            Consumer Meet Up
          </Typography>
          <div className="h-5 sm:h-8"></div>
          <Typography className=" hidden text-white sm:block">
            Each year, we gather as a community to celebrate achievements, share
            insights, and chart the course for a brighter future. In 2024, our
            5rd Annual Conference served as a vibrant testament to the
            collective progress we&apos;ve made and the unwavering commitment we
            share towards excellence.
          </Typography>
          <div className="sm:h-5"></div>
          <div className="mx-auto flex flex-col gap-5 md:flex-row">
            <div
              onClick={() => setOpenModal(true)}
              className="group relative w-full self-stretch overflow-hidden rounded-xl"
            >
              <Image
                src={'/img/conferrence/play.jpg'}
                alt="play"
                width={500}
                height={100}
                className="h-full w-full cursor-pointer duration-300 group-hover:scale-105"
              />
              <div className="absolute left-0 top-0 flex h-full w-full cursor-pointer items-center justify-center">
                <Image
                  src={'/img/conferrence/play-icon.svg'}
                  alt="play"
                  width={50}
                  height={50}
                  className=" h-20 w-20"
                />
              </div>
            </div>
            <div className="grid w-full grid-cols-3 items-stretch gap-3 sm:grid-cols-4">
              <PhotoProvider>
                {Annual_2024_images?.slice(0, 12)?.map((img, index) => (
                  <PhotoView src={img?.thumbnail} key={index}>
                    <img
                      className="h-22 w-full cursor-pointer rounded-xl duration-200 hover:scale-105"
                      src={img?.thumbnail}
                      alt={`conferrence-${index}`}
                    />
                  </PhotoView>
                ))}
              </PhotoProvider>
            </div>
          </div>
        </GradientCard>
      </div>
      <Modal open={openModal} setOpen={setOpenModal}>
        <div className="xs:[w-360px] relative  mb-10 h-[300px] sm:h-[450px] sm:w-[500px] md:w-[650px] lg:w-[900px]">
          <iframe
            width="100%"
            height="100%"
            src="https://www.youtube.com/embed/1KAUk4x19os?si=Ylyz3yA3Nmrno8or&amp;controls=1"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
          <button
            onClick={() => setOpenModal(false)}
            className="flex w-full cursor-pointer  items-center justify-center bg-red-500 pb-2 pt-1 text-lg font-medium text-white"
          >
            Close Video
          </button>
        </div>
      </Modal>
    </>
  );
};

export default Conferrence;
