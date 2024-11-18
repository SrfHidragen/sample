import Typography from '@/components/Typography';
import TermsofService from '@/features/Policy/TermsofService';
import React from 'react';

function page() {
  return (
    <>
      <div className="container flex items-center justify-center py-10">
        <div className="w-full rounded-sm bg-white p-4 sm:p-14">
          <Typography as="h1" className="text-center text-[32px]">
            Terms of Service
          </Typography>
          <div className="h-4"></div>
          <TermsofService />
        </div>
      </div>
    </>
  );
}

export default page;
