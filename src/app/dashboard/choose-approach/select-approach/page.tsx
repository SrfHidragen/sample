import PageLoading from '@/components/PageLoading';
import dynamic from 'next/dynamic';

const ChooseSelectApproach = dynamic(
  () => import('@/features/dashboard/choose-approach/ChooseSelectApproach'),
  { loading: () => <PageLoading /> },
);

export default function page() {
  return <ChooseSelectApproach />;
}
