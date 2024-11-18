import PageLoading from '@/components/PageLoading';
import dynamic from 'next/dynamic';

const GstInvoiceReport = dynamic(
  () => import('@/features/dashboard/Reports/GstInvoiceReport'),
  {
    ssr: false,
    loading: () => <PageLoading />,
  },
);

export default function page() {
  return <GstInvoiceReport />;
}
