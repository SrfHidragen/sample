import { auth } from '@/auth';
import DashboardController from '@/components/dashboard/DashboardController';
import React from 'react';

export default async function DashboarLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <DashboardController
      name={session?.user?.name || ''}
      image={session?.user?.image || ''}
    >
      {children}
    </DashboardController>
  );
}
