/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import Images from '@/components/Image';
import Typography from '@/components/Typography';
import { GlobalVariables } from '@/lib/constant';

import { cn } from '@/lib/utils';
import { useSearchParams } from 'next/navigation';
import React, { useMemo } from 'react';

function base64DecodeUnicode(str: string): string {
  return decodeURIComponent(
    atob(str)
      .split('')
      .map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join(''),
  );
}
export default function Page() {
  const searchParams = useSearchParams();

  const data: any = searchParams.get('data');

  const decodedData = useMemo(() => {
    try {
      const encodedData = base64DecodeUnicode(data);
      return JSON.parse(encodedData);
    } catch (error) {
      return null;
    }
  }, [data]);
  if (!decodedData) {
    return <div>Error: Unable to load notification data</div>;
  }
  return (
    <div
      className={cn(
        `flex flex-col justify-between rounded-lg bg-gradient-to-br from-[#0018AB] to-[#011487] p-4`,
      )}
    >
      <>
        <div className="flex w-full items-center justify-center">
          {decodedData?.image ? (
            <div
              className={
                decodedData?.image
                  ? 'h-[320px] w-[320px] overflow-hidden rounded-[20px] border-4 border-tertiary'
                  : 'h-[320px] w-[320px] overflow-hidden rounded-[20px] border-4 border-tertiary opacity-70'
              }
            >
              <Images
                src={GlobalVariables.imgURL + decodedData?.image}
                alt="img-icon"
                className="h-full w-full"
              />
            </div>
          ) : (
            <div className="relative h-[320px]  w-[320px] overflow-hidden rounded-[20px] ">
              <div className="absolute left-0 top-0 z-10 flex h-full w-full items-center justify-center bg-black/20 text-center text-lg font-bold text-black">
                Image <br /> Not Found
              </div>
              <div
                className={
                  'absolute left-0 top-0 h-full w-full  overflow-hidden rounded-[20px] border-4 border-tertiary opacity-90'
                }
              >
                <Images
                  className="h-full w-full"
                  src={'/img/image-placeholder.webp'}
                  alt="img-icon"
                />
              </div>
            </div>
          )}
        </div>
        <div className="h-3"></div>
      </>

      <div className="flex flex-col justify-between">
        <div className={cn('flex flex-col gap-3')}>
          <Typography as="h1" className="text-white">
            {decodedData?.title}
          </Typography>
          <Typography className="text-white">
            {decodedData?.description}
          </Typography>
        </div>
      </div>
    </div>
  );
}
