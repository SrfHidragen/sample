const TermsAndCondition = dynamic(
  () => import('@/features/dashboard/TermsAndConditions'),
  { loading: () => <PageLoading /> },
);
import PageLoading from '@/components/PageLoading';
import dynamic from 'next/dynamic';
import React from 'react';

const page = () => {
  return <TermsAndCondition />;
};

export default page;
