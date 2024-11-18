import PageLoading from '@/components/PageLoading';
const GiveHelp = dynamic(() => import('@/features/dashboard/give-help'), {
  ssr: false,
  loading: () => <PageLoading />,
});
import dynamic from 'next/dynamic';
import React from 'react';

const Page = () => {
  return (
    <>
      <GiveHelp />
    </>
  );
};

export default Page;
