import Typography from '@/components/Typography';
import RefundPolicy from '@/features/Policy/RefundPolicy';

import React from 'react';

const page = () => {
  return (
    <div className="container flex items-center justify-center py-10">
      <div className="w-full rounded-sm bg-white p-4 sm:p-14">
        <Typography as="h1" className="text-center text-[32px]">
          Refund Policy
        </Typography>
        <div className="h-4"></div>
        <RefundPolicy />
      </div>
    </div>
  );
};

export default page;
