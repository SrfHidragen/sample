import PageLoading from '@/components/PageLoading';
import dynamic from 'next/dynamic';

const AssociatedConsumer = dynamic(
  () =>
    import('@/features/dashboard/receive-help-chart-page/AssociatedConsumer'),
  { loading: () => <PageLoading /> },
);

export default function page() {
  return (
    <>
      <AssociatedConsumer />
    </>
  );
}
