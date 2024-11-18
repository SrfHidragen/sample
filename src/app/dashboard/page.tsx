import DashboardMainPageSkeleton from '@/features/dashboard/DashboardSkeleton/MainPage';
import dynamic from 'next/dynamic';

const DashboardPage = dynamic(
  () => import('@/features/dashboard/DashboardPage'),
  {
    loading: () => <DashboardMainPageSkeleton />,
  },
);

export default function page() {
  return <DashboardPage />;
}
