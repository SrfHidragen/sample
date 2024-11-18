'use client';
import TermsofService from '@/features/Policy/TermsofService';
import React from 'react';

const TermsAndConditions = () => {
  return (
    // <div className="bg-[#02158A]">
    //   <div className="h-10"></div>
    //   <div className="container">
    <div className="p-4">
      {/* <Typography as="h1" className="text-center text-2xl sm:text-[32px]">
        Terms And Conditions
      </Typography> */}
      <TermsofService device="mobile" />
    </div>
    //   </div>
    //   <div className="h-10"></div>
    // </div>
  );
};

export default TermsAndConditions;
