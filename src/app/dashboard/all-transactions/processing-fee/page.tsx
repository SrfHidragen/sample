import PageLoading from '@/components/PageLoading';
import dynamic from 'next/dynamic';

const ProcessingFee = dynamic(
  () => import('@/features/dashboard/Reports/ProcessingFee'),
  {
    ssr: false,
    loading: () => <PageLoading />,
  },
);

const page = () => {
  return <ProcessingFee />;
};

export default page;
