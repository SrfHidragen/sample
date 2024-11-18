import KycLayoutController from '@/features/dashboard/kyc-page/KycLayoutController';
import React from 'react';

export default function KycLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <KycLayoutController>{children}</KycLayoutController>;
}
