import PageLoading from '@/components/PageLoading';
import dynamic from 'next/dynamic';

const TopupReport = dynamic(
  () => import('@/features/dashboard/Reports/TopupReport'),
  {
    ssr: false,
    loading: () => <PageLoading />,
  },
);

export default function page() {
  return <TopupReport />;
}
