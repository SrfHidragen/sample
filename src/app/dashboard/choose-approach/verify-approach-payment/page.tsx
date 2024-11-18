import PageLoading from '@/components/PageLoading';
import dynamic from 'next/dynamic';

const VerifyApproachPayment = dynamic(
  () => import('@/features/dashboard/choose-approach/VerifyApproachPayment'),
  { loading: () => <PageLoading /> },
);

export default function page() {
  return <VerifyApproachPayment />;
}
