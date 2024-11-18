const ImageView = dynamic(
  () => import('@/features/dashboard/kyc-page/ImageView'),
  {
    ssr: false,
    loading: () => <PageLoading />,
  },
);
import PageLoading from '@/components/PageLoading';
import dynamic from 'next/dynamic';
// import SelfiVerification from '@/features/dashboard/kyc-page/SelfiVerification';
import React from 'react';

const Page = () => {
  return (
    <>
      {/* <SelfiVerification />; */}
      <ImageView />
    </>
  );
};

export default Page;
