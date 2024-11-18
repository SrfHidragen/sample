import PageLoading from '@/components/PageLoading';
import dynamic from 'next/dynamic';

const Announcement = dynamic(() => import('@/features/announcement'), {
  ssr: false,
  loading: () => <PageLoading />,
});

export default function Page() {
  return <Announcement />;
}
