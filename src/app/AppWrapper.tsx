/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import React from 'react';
import { Roboto_Flex } from 'next/font/google';
import './globals.css';
import ClientProvider from '@/app/ClientProvider';
import { usePathname } from 'next/navigation';
import Head from 'next/head';

const roboto = Roboto_Flex({
  subsets: ['latin'],
  weight: ['100', '300', '400', '500', '700'],
});

const AppWrapper = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  const color = pathname.startsWith('/mobile') ? 'bg-white' : 'bg-[#02158A]';

  return (
    <html lang="en" className="!pr-0">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <body className={`${roboto.className} ${color}`}>
        <main className="min-h-screen w-full">
          <ClientProvider>{children}</ClientProvider>
        </main>
      </body>
    </html>
  );
};

export default AppWrapper;
