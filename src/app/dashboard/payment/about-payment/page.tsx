'use client';
import React from 'react';
import PageLoading from '@/components/PageLoading';
import dynamic from 'next/dynamic';
const AboutPayment = dynamic(
  () => import('@/features/dashboard/payment/about-payment/AboutPayment'),
  {
    loading: () => <PageLoading />,
    ssr: false,
  },
);

const page = () => {
  return (
    <>
      <AboutPayment />
    </>
  );
};

export default page;
