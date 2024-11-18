import { Button } from '@/components/Button';
import Typography from '@/components/Typography';
import React from 'react';

const GiveHelpApproach = () => {
  return (
    <div className="mx-auto max-w-4xl ">
      <div className="rounded-md bg-[#0119AD] p-6">
        <div>
          <Typography as="h1" className="font-semibold text-white">
            Approach Name
          </Typography>
          <div className="h-2"></div>
          <Typography as="p" className="text-white">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.Lorem ipsum dolor sit amet,
            consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
            labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo
            consequat.
          </Typography>
        </div>
        <div className="h-5"></div>
        <div className="flex flex-col gap-4 text-white">
          <Typography as="p" className="text-lg font-medium text-[#FFCC01]">
            Initial Payment Breakdown in Rural Approach
          </Typography>
          <div className="flex justify-between">
            <Typography>Initial PMF </Typography>
            <span>:</span>
            <Typography>₹100</Typography>
          </div>
          <div className="flex justify-between">
            <Typography>Initial PMF </Typography>
            <span>:</span>
            <Typography>₹100</Typography>
          </div>
          <div className="flex justify-between">
            <Typography>Initial PMF </Typography>
            <span>:</span>
            <Typography>₹100</Typography>
          </div>
          <hr />
          <Typography>
            No of people to be associated to receive 82,95,500
          </Typography>
        </div>
      </div>
      <div className="h-6"></div>
      <Button variant={'secondary'}>Continue to Payment</Button>
    </div>
  );
};

export default GiveHelpApproach;
