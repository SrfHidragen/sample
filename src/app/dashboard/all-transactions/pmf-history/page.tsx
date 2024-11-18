import PageLoading from '@/components/PageLoading';
import dynamic from 'next/dynamic';

const PmfReport = dynamic(
  () => import('@/features/dashboard/Reports/PmfReport'),
  {
    ssr: false,
    loading: () => <PageLoading />,
  },
);

export default function page() {
  return <PmfReport />;
}
