import React from 'react';
import dynamic from 'next/dynamic';
import PageLoading from '@/components/PageLoading';
const VerifyAndPay = dynamic(
  () => import('@/features/dashboard/payment/verify-and-pay/VerifyAndPay'),
  {
    loading: () => <PageLoading />,
    ssr: false,
  },
);

const page = () => {
  return <VerifyAndPay />;
};

export default page;
