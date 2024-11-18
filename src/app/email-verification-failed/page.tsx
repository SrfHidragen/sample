import { Button } from '@/components/Button';
import Typography from '@/components/Typography';
import React from 'react';
import { IoCloseCircleOutline } from 'react-icons/io5';

const page = () => {
  return (
    <div className="container">
      <div className="mx-auto flex min-h-[70vh] max-w-2xl flex-col items-center justify-center gap-6 py-10 text-center sm:min-h-[60vh] sm:gap-8">
        <IoCloseCircleOutline color="red" className="size-24   sm:size-28" />
        <Typography as="h1" className="text-[28px] text-white  sm:text-[48px]">
          Unable to Verify Email ID
        </Typography>
        <Typography as="p" className="text-white">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </Typography>
        <Button className="max-w-sm" variant={'secondary'}>
          Continue
        </Button>
      </div>
    </div>
  );
};

export default page;
