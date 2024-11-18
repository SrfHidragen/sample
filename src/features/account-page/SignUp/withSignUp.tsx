/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React, { ComponentType } from 'react';
import { notFound, redirect } from 'next/navigation';
import { isObjectNullOrHasNullValues } from '@/lib/utils';
import TermsOfRegister from '@/features/account-page/SignUp/terms-of-register';
import CustomerRegistration from './CustomerRegistration';
import SetPassword from './SetPassword';
import { useSignUpStore } from '@/store/register.store';

interface CustomerData {
  communicationLanguage: string[];
  isVerified: boolean;
  motherTongue: string;
  phone: string;
}
function isCustomerDataValid(customerData: CustomerData): boolean {
  if (!customerData) {
    return false;
  }

  const { communicationLanguage, isVerified, motherTongue, phone } =
    customerData;

  if (
    !Array.isArray(communicationLanguage) ||
    communicationLanguage.length === 0
  ) {
    return false;
  }

  if (typeof isVerified !== 'boolean') {
    return false;
  }

  if (typeof motherTongue !== 'string' || motherTongue.trim() === '') {
    return false;
  }

  if (typeof phone !== 'string' || phone.trim() === '') {
    return false;
  }

  return true;
}
interface WithSignupProps {
  ActualForm: ComponentType<any>;
  searchParams?: { [key: string]: string | undefined };
}
export function withSignup<T extends WithSignupProps>(
  WrappedComponent: ComponentType<T>,
) {
  return function WithSignupFlowComponent(props: Omit<T, 'ActualForm'>) {
    const { searchParams } = props as unknown as WithSignupProps;
    let ActualForm: ComponentType<any> | null = null;
    const CustomerData = useSignUpStore((state) => state?.CustomerRegistration);

    const isInvalidSearchParams = isObjectNullOrHasNullValues(searchParams);

    if (isInvalidSearchParams) {
      redirect('/account/register?SignUp=terms-of-register');
    }

    if (searchParams?.SignUp === 'terms-of-register') {
      ActualForm = TermsOfRegister;
    }

    if (searchParams?.SignUp === 'customer-registration') {
      ActualForm = CustomerRegistration;
    }

    if (searchParams?.SignUp === 'create-password') {
      if (!isCustomerDataValid(CustomerData)) {
        redirect('/account/register?SignUp=terms-of-register');
      } else {
        ActualForm = SetPassword;
      }
    }

    if (!ActualForm) {
      return notFound();
    }

    const FinalForm = ActualForm;

    if (!FinalForm) {
      return notFound();
    }

    // Render the wrapped Component with the determined ActualForm and StepForm
    return <WrappedComponent {...(props as T)} ActualForm={FinalForm} />;
  };
}
