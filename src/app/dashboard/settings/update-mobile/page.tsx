import PageLoading from '@/components/PageLoading';
import dynamic from 'next/dynamic';

const ChangePhoneNumber = dynamic(
  () => import('@/features/dashboard/settings-page/ChangePhoneNumber'),
  {
    loading: () => <PageLoading />,
    ssr: false,
  },
);

export default function page() {
  return <ChangePhoneNumber />;
}
