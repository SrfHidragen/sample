import React from 'react';
import { Skeleton } from '@/components/Skeleton';

const DashboardMainPageSkeleton = () => {
  return (
    <div className="flex w-full flex-col gap-10">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
        <Skeleton className="h-24 bg-white/20" />{' '}
        <Skeleton className="h-24 bg-white/20" />{' '}
        <Skeleton className="h-24 bg-white/20" />{' '}
        <Skeleton className="h-24 bg-white/20" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
        <Skeleton className="h-36 bg-white/20" />{' '}
        <Skeleton className="h-36 bg-white/20" />{' '}
        <Skeleton className="h-36 bg-white/20" />{' '}
        <Skeleton className="h-36 bg-white/20" />
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:gap-6">
        <Skeleton className="h-96 bg-white/20" />{' '}
        <Skeleton className="h-96 bg-white/20" />{' '}
        <Skeleton className="h-96 bg-white/20" />{' '}
        <Skeleton className="h-96 bg-white/20" />
      </div>
    </div>
  );
};

export default DashboardMainPageSkeleton;
