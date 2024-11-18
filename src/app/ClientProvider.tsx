'use client';
import DialogComponent from '@/components/DialogComponent';
import ErrorBoundaryWrapper from '@/components/ErrorBoundary';

import { getClient } from '@/helper/apolloClient';
import { ApolloProvider } from '@apollo/client';
import { SessionProvider } from 'next-auth/react';
import React from 'react';
import { Toaster } from 'react-hot-toast';

const ClientProvider = ({ children }: { children: React.ReactNode }) => {
  const client = getClient();

  return (
    <ErrorBoundaryWrapper>
      <SessionProvider>
        <ApolloProvider client={client}>
          <Toaster position="top-right" />
          <DialogComponent />
          {children}
        </ApolloProvider>
      </SessionProvider>
    </ErrorBoundaryWrapper>
  );
};

export default ClientProvider;
