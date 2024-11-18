import type { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import AppWrapper from './AppWrapper';
import { auth } from '@/auth';
import dynamic from 'next/dynamic';
const Header = dynamic(() => import('@/components/Header/Header'));
import Footer from '@/components/Footer';
import CommonAlert from '@/components/CommonAlert';

export const metadata: Metadata = {
  title: 'GiveNtake.world',
  description: 'GiveNtake.world',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <AppWrapper>
      <Header session={session} />
      <CommonAlert />
      {children}
      <Analytics />
      <SpeedInsights />
      <Footer />
    </AppWrapper>
  );
}
