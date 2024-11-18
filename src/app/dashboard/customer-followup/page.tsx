import PageLoading from '@/components/PageLoading';
import dynamic from 'next/dynamic';

const CustomerFollowup = dynamic(
  () => import('@/features/dashboard/Customer-Invitation/CustomerInvitation'),
  {
    ssr: false,
    loading: () => <PageLoading />,
  },
);
import React from 'react';

function page() {
  return <CustomerFollowup />;
}

export default page;
