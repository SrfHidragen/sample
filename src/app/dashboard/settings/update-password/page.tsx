const CurrentPasswordModification = dynamic(
  () =>
    import('@/features/dashboard/settings-page/CurrentPasswordModification'),
  {
    ssr: false,
    loading: () => <PageLoading />,
  },
);
import PageLoading from '@/components/PageLoading';
import dynamic from 'next/dynamic';
import React from 'react';

function page() {
  return <CurrentPasswordModification />;
}

export default page;
