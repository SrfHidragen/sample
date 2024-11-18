import PageLoading from '@/components/PageLoading';
import dynamic from 'next/dynamic';

const InitialGiveHelp = dynamic(
  () => import('@/features/dashboard/give-help/InitialGiveHelp'),
  { loading: () => <PageLoading /> },
);

export default function page() {
  return <InitialGiveHelp />;
}
