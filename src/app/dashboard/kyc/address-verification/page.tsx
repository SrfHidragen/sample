'use client';

import PageLoading from '@/components/PageLoading';
import { withKYC } from '@/features/dashboard/kyc-page/withKYC';
import dynamic from 'next/dynamic';
const AddressForm = dynamic(
  () => import('@/features/dashboard/kyc-page/AddressForm'),
  {
    loading: () => <PageLoading />,
    ssr: false,
  },
);

import React from 'react';

const Page = () => {
  return <AddressForm />;
};

export default withKYC(Page);
