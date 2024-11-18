/* eslint-disable @typescript-eslint/no-explicit-any */
// pages/signup.tsx
'use client';

import { withSignup } from '@/features/account-page/SignUp/withSignUp';
import React from 'react';

interface PageProps {
  searchParams?: { [key: string]: string | undefined };
  ActualForm: React.ComponentType<any>;
}

function Page({ ActualForm }: PageProps) {
  return <ActualForm />;
}

export default withSignup(Page);
