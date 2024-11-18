const GiveHelpReport = dynamic(
  () => import('@/features/dashboard/Reports/GiveHelpReport'),
  {
    ssr: false,
    loading: () => <PageLoading />,
  },
);
import PageLoading from '@/components/PageLoading';
import dynamic from 'next/dynamic';
import React from 'react';

function page() {
  return <GiveHelpReport />;
}

export default page;
