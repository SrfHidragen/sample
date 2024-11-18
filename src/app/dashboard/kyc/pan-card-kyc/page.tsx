'use client';
import React from 'react';

import { withKYC } from '@/features/dashboard/kyc-page/withKYC';
import dynamic from 'next/dynamic';
import PageLoading from '@/components/PageLoading';

const PanForm = dynamic(() => import('@/features/dashboard/kyc-page/PanForm'), {
  loading: () => <PageLoading />,
  ssr: false,
});

const Page = () => {
  return <PanForm />;
};

export default withKYC(Page);
