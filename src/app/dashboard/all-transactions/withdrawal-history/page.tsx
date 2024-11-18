import PageLoading from '@/components/PageLoading';
import dynamic from 'next/dynamic';

const WithdrawalReport = dynamic(
  () => import('@/features/dashboard/Reports/WithdrawalReport'),
  {
    ssr: false,
    loading: () => <PageLoading />,
  },
);

export default function page() {
  return <WithdrawalReport />;
}
