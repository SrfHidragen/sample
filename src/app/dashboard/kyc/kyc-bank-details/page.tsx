'use client';
import BankAccountForm from '@/features/dashboard/kyc-page/BankForm';
import { withKYC } from '@/features/dashboard/kyc-page/withKYC';
import React from 'react';

const Page = () => {
  return <BankAccountForm />;
};

export default withKYC(Page);
