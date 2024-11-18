import PageLoading from '@/components/PageLoading';
import dynamic from 'next/dynamic';

const RecentReceiveHelp = dynamic(
  () => import('@/features/dashboard/Reports/RecentReceiveHelp'),
  {
    ssr: false,
    loading: () => <PageLoading />,
  },
);

export default function page() {
  return (
    <>
      <RecentReceiveHelp />
    </>
  );
}
