import PageLoading from '@/components/PageLoading';
import dynamic from 'next/dynamic';

const ConsumerTablePage = dynamic(
  () =>
    import(
      '@/features/dashboard/receive-help/consumer-table/ConsumerTable-Page'
    ),
  {
    loading: () => <PageLoading />,
    ssr: false,
  },
);

export default function page() {
  return <ConsumerTablePage />;
}
