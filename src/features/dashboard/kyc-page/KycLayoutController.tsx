'use client';
import dynamic from 'next/dynamic';
import { usePathname } from 'next/navigation';

const KycFlowCard = dynamic(
  () => import('@/features/dashboard/kyc-page/KycFlowCard'),
  {
    ssr: false,
  },
);
import React from 'react';

const KycLayoutController = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname()?.split('/');
  const currentPath = pathname[pathname?.length - 1]?.split('-')?.join(' ');
  return (
    <>
      <div className="flex flex-col items-center justify-center">
        {currentPath !== 'congratulations' && <KycFlowCard />}
        <div className="h-6"></div>
        {children}
      </div>
    </>
  );
};

export default KycLayoutController;
