/* eslint-disable react/no-unknown-property */
'use client';

import React from 'react';
import { PhotoProvider, PhotoView } from 'react-photo-view';

import 'react-photo-view/dist/react-photo-view.css';

export const GalleryView = ({
  title,
  images,
  isLast,
}: {
  title: string;
  images: { thumbnail: string }[];
  isLast: boolean;
}) => {
  return (
    <>
      <h4 className="font-roboto mb-5 text-2xl font-semibold text-white">
        {title}
      </h4>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 xl:gap-5">
        <PhotoProvider>
          {images?.map((image, index) => (
            <PhotoView src={image?.thumbnail} key={index}>
              <div className="fade-in   w-full cursor-pointer overflow-hidden rounded-xl duration-300 hover:scale-105">
                <img
                  src={image?.thumbnail}
                  alt={`Gallery ${index + 1}`}
                  className="h-full w-full"
                />
              </div>
            </PhotoView>
          ))}
        </PhotoProvider>
      </div>
      {!isLast && (
        <div className="h-6"></div>
        // <img
        //   className="mx-auto my-5 w-fit rotate-90 sm:mx-0 sm:my-16 sm:rotate-0"
        //   src="/img/gallery/decoration.png"
        //   alt=""
        // />
      )}
      <style jsx global>{`
        .fade-in {
          animation: fadeInAnimation 1s ease;
        }

        @keyframes fadeInAnimation {
          from {
            opacity: 0;
            margin-top: -10px;
          }
          to {
            opacity: 1;
            margin-top: 0px;
          }
        }
      `}</style>
    </>
  );
};
