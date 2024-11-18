/* eslint-disable react-hooks/exhaustive-deps */
// /* eslint-disable @typescript-eslint/no-explicit-any */
// 'use client';
// import dynamic from 'next/dynamic';
// import { isObjectNullOrHasNullValues } from '@/lib/utils';
// import { notFound, redirect } from 'next/navigation';
// import React, { ComponentType, useEffect } from 'react';
// const AadharForm = dynamic(
//   () => import('@/features/dashboard/kyc-page/AadharForm'),
//   {
//     loading: () => <PageLoading />,
//     ssr: false,
//   },
// );
// const AddressForm = dynamic(
//   () => import('@/features/dashboard/kyc-page/AddressForm'),
//   {
//     loading: () => <PageLoading />,
//   },
// );
// import PanForm from './PanForm';
// import BankAccountForm from './BankForm';
// import SelfiVerification from './SelfiVerification';
// import PageLoading from './PageLoading';
// import { useKycStore } from '@/store/kyc.store';

// interface WithKYCProps {
//   ActualForm: ComponentType<any>;
//   searchParams?: { [key: string]: string | undefined };
// }
// export function withKYC<T extends WithKYCProps>(
//   WrappedComponent: ComponentType<T>,
// ) {
//   return function WithKYCFlowComponent(props: Omit<T, 'ActualForm'>) {
//     const { searchParams } = props as unknown as WithKYCProps;
//     let ActualForm: ComponentType<any> | null = null;
//     const { isKycFilled } = useKycStore((state) => state?.kycVerification);
//     const isInvalidSearchParams = isObjectNullOrHasNullValues(searchParams);

//     useEffect(() => {
//       if (isKycFilled) {
//         redirect('/dashboard');
//       }
//     }, [isKycFilled]);

//     if (isInvalidSearchParams) {
//       redirect('/dashboard/kyc?digital=aadhar-verification');
//     }

//     if (searchParams?.digital === 'aadhar-verification') {
//       ActualForm = AadharForm;
//     }

//     if (searchParams?.digital === 'address-verification') {
//       ActualForm = AddressForm;
//     }

//     if (searchParams?.digital === 'pan-details') {
//       ActualForm = PanForm;
//     }

//     if (searchParams?.digital === 'bank-details') {
//       ActualForm = BankAccountForm;
//     }
//     if (searchParams?.digital === 'selfi-verification') {
//       ActualForm = SelfiVerification;
//     }

//     // if (searchParams?.SignUp === 'create-password') {
//     //   if (!isCustomerDataValid(CustomerData)) {
//     //     redirect('/account/register?SignUp=terms-of-register');
//     //   } else {
//     //     ActualForm = SetPassword;
//     //   }
//     // }

//     if (!ActualForm) {
//       return notFound();
//     }

//     const FinalForm = ActualForm;

//     if (!FinalForm) {
//       return notFound();
//     }

//     // Render the wrapped Component with the determined ActualForm and StepForm
//     return <WrappedComponent {...(props as T)} ActualForm={FinalForm} />;
//   };
// }

'use client';

import React, { ComponentType, FC, useEffect, useState } from 'react';
import { redirect, useRouter } from 'next/navigation';
import { useKycStore } from '@/store/kyc.store';
import PageLoading from '@/components/PageLoading';

export function withKYC<P extends object>(
  WrappedComponent: ComponentType<P>,
): FC<P> {
  const KycFlow: FC<P> = (props: P) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    const { kycLevel, isKycFilled, kyc_information } = useKycStore(
      (state) => state?.kycVerification,
    );

    useEffect(() => {
      setIsLoading(true);
      if (!isKycFilled) {
        if (kycLevel === 1 && !kyc_information?.aadhaarVerified) {
          router.replace('/dashboard/kyc');
        } else if (kycLevel === 2 && !kyc_information?.addressVerified) {
          router.replace('/dashboard/kyc/address-verification');
        } else if (kycLevel === 3 && !kyc_information?.bankVerified) {
          router.replace('/dashboard/kyc/kyc-bank-details');
        } else if (kycLevel === 4 && !kyc_information?.panVerified) {
          router.replace('/dashboard/kyc/pan-card-kyc');
        } else if (kycLevel === 5 && !kyc_information?.selfiVerified) {
          router.replace('/dashboard/kyc/IPV-kyc-verification');
        } else if (kycLevel === 6) {
          router.replace('/dashboard/kyc/congratulations');
        }
        setIsLoading(false);
      } else {
        redirect('/dashboard');
      }
    }, [kycLevel, isKycFilled, kyc_information]);

    if (isLoading) {
      return <PageLoading />;
    }

    return <WrappedComponent {...props} />;
  };

  return KycFlow;
}
