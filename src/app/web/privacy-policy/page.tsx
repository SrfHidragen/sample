'use client';

import Typography from '@/components/Typography';
import PrivacyPolicyContent from '@/features/Policy/PrivacyPolicyContent';
import React from 'react';
const PrivacyPolicy = () => {
  return (
    <div className="container flex items-center justify-center py-10">
      <div className="w-full rounded-sm bg-white p-4 sm:p-14">
        <Typography as="h1" className="text-center text-[32px]">
          Privacy Policy
        </Typography>
        <div className="h-4"></div>
        <PrivacyPolicyContent />
      </div>
    </div>
  );
};

export default PrivacyPolicy;
