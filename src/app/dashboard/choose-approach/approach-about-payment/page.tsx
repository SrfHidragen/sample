import PageLoading from '@/components/PageLoading';
import dynamic from 'next/dynamic';

const ApproachAboutPayment = dynamic(
  () => import('@/features/dashboard/choose-approach/ApproachAboutPayment'),
  { loading: () => <PageLoading /> },
);

export default function page() {
  return <ApproachAboutPayment />;
}
