'use client';
const AadharForm = dynamic(
  () => import('@/features/dashboard/kyc-page/AadharForm'),
  { loading: () => <PageLoading /> },
);
import PageLoading from '@/components/PageLoading';
import { withKYC } from '@/features/dashboard/kyc-page/withKYC';
import dynamic from 'next/dynamic';
import React from 'react';

const Page = () => {
  return <AadharForm />;
};

export default withKYC(Page);
