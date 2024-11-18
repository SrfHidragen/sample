/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from '@/components/Button';
import Typography from '@/components/Typography';
import React from 'react';
import Images from '@/components/Image';
import Link from 'next/link';

const ImportantMessage = ({
  title,
  btnTitle,
  description,
  onClickFn,
  isLink,
  link,
  isWarning = false,
  isHiddenLinkorButton = false,
}: {
  title?: string;
  btnTitle?: string;
  description?: string | string[];
  onClickFn?: any;
  isLink?: boolean;
  isHiddenLinkorButton?: boolean;
  isWarning?: boolean;
  link?: string;
}) => {
  const handleClick = () => {
    onClickFn();
  };

  return (
    <>
      <div className="flex  flex-col-reverse items-center justify-between gap-4 sm:flex-row sm:gap-0">
        <div className="text-center sm:text-left">
          <Typography as="p" className=" text-sm font-medium text-[#FC0000] ">
            IMPORTANT
          </Typography>
          <Typography
            as="h1"
            className="text-[24px] text-white md:text-[28px] lg:text-[32px]"
          >
            {title}
          </Typography>
          <Typography as="h5" className="text-lg font-light text-white">
            {Array.isArray(description)
              ? description.map((line, index) => (
                  <React.Fragment key={index}>
                    {line}
                    <br />
                  </React.Fragment>
                ))
              : description}
          </Typography>

          {isLink ? (
            <div>
              <div className="h-5"></div>
              <Link
                href={`${link}`}
                className="align-center t  max-w-fit rounded-lg bg-tertiary px-10 py-3 text-left font-semibold duration-300 hover:bg-yellow-500 hover:text-black hover:shadow-2xl "
              >
                {btnTitle}
              </Link>
              <div className="h-5"></div>
            </div>
          ) : (
            !isHiddenLinkorButton && (
              <Button
                className="mt-3 max-w-fit bg-tertiary px-10 text-left sm:mt-5"
                variant={'default'}
                type="button"
                onClick={handleClick}
              >
                {btnTitle}
              </Button>
            )
          )}
        </div>
        <div>
          {isWarning ? (
            <Images
              src="/img/dashboard/warning.png"
              alt="initial-payment-warn"
              className="h-full w-full max-w-[100px] sm:max-w-full"
            />
          ) : (
            <Images
              src={'/img/homepage/logo.svg'}
              alt="Logo"
              className="h-full w-full max-w-[100px] opacity-50 sm:max-w-full"
            />
          )}
        </div>
      </div>
    </>
  );
};

export default ImportantMessage;
