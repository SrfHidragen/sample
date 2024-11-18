const EmailModification = dynamic(
  () => import('@/features/dashboard/settings-page/EmailModification'),
  {
    ssr: false,
    loading: () => <PageLoading />,
  },
);
import PageLoading from '@/components/PageLoading';
import dynamic from 'next/dynamic';
import React from 'react';

function page() {
  return <EmailModification />;
}

export default page;
