import Spinner from '@/components/Spinner';
import React from 'react';

const PageLoading = () => {
  return (
    <div className="flex min-h-96 items-center justify-center">
      <Spinner className="size-9 text-white" />
    </div>
  );
};

export default PageLoading;
