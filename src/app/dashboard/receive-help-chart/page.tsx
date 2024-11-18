'use client';
import PageLoading from '@/components/PageLoading';
import dynamic from 'next/dynamic';

const ReceiveHelpChart = dynamic(
  () => import('@/features/dashboard/receive-help-chart-page/ReceiveHelpChart'),
  {
    loading: () => <PageLoading />,
    ssr: false,
  },
);

export default function page() {
  return (
    <>
      <ReceiveHelpChart />
    </>
  );
}
