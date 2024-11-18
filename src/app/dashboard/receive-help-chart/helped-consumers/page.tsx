import PageLoading from '@/components/PageLoading';
import dynamic from 'next/dynamic';

const HelpedConsumer = dynamic(
  () => import('@/features/dashboard/receive-help-chart-page/HelpedConsumer'),
  {
    loading: () => <PageLoading />,
    ssr: false,
  },
);

export default function page() {
  return (
    <>
      <HelpedConsumer />
    </>
  );
}
