import PageLoading from '@/components/PageLoading';
import dynamic from 'next/dynamic';
const CompletePayment = dynamic(
  () => import('@/features/dashboard/payment/complete-payment/CompletePayment'),
  { loading: () => <PageLoading />, ssr: false },
);

import React from 'react';

const page = () => {
  return (
    <>
      <CompletePayment />
    </>
  );
};

export default page;
