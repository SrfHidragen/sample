import Spinner from '@/components/Spinner';

const LoadingComponent = ({
  isLoading,
  isSmall,
}: {
  isLoading?: boolean;
  isSmall?: boolean;
}) => {
  if (isSmall) {
    return (
      isLoading && (
        <div className="flex h-full w-full items-center justify-center">
          <Spinner />
        </div>
      )
    );
  }
  return (
    isLoading && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500 bg-opacity-50 backdrop-blur-sm backdrop-filter">
        <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-t-2 border-blue-500"></div>
      </div>
    )
  );
};

export default LoadingComponent;
