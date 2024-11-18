import PageLoading from '@/components/PageLoading';
import dynamic from 'next/dynamic';

const InitiatedPayment = dynamic(
  () => import('@/features/dashboard/payment/InitiatedPayment'),
  {
    loading: () => <PageLoading />,
    ssr: false,
  },
);

export default function page() {
  return (
    <>
      <InitiatedPayment />
    </>
  );
}
