'use client';
import dynamic from 'next/dynamic';
import React from 'react';
const MyAccount = dynamic(
  () => import('@/features/dashboard/settings-page/my-account/MyAccount'),
  {
    loading: () => <PageLoading />,
    ssr: false,
  },
);
import PageLoading from '@/components/PageLoading';

const page = () => {
  return (
    <div className="flex flex-col items-center">
      <MyAccount />
    </div>
  );
};

export default page;
