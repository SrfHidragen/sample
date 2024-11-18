import PageLoading from '@/components/PageLoading';
import dynamic from 'next/dynamic';

const PayApproach = dynamic(
  () => import('@/features/dashboard/choose-approach/PayApproach'),
  { loading: () => <PageLoading /> },
);

export default function page() {
  return <PayApproach />;
}
