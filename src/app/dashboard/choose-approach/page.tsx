import PageLoading from '@/components/PageLoading';
import dynamic from 'next/dynamic';

const ChooseApproach = dynamic(
  () => import('@/features/dashboard/choose-approach/ChooseApproach'),
  { loading: () => <PageLoading /> },
);

export default function page() {
  return <ChooseApproach />;
}
