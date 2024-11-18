const ReceiveHelpReport = dynamic(
  () => import('@/features/dashboard/Reports/ReceiveHelpReport'),
  {
    ssr: false,
    loading: () => <PageLoading />,
  },
);
import PageLoading from '@/components/PageLoading';
import dynamic from 'next/dynamic';
import React from 'react';

function page() {
  return <ReceiveHelpReport />;
}

export default page;
