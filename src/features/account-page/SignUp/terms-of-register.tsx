'use client';
import { Button } from '@/components/Button';
import Checkbox from '@/components/Checkbox/Index';
import Typography from '@/components/Typography';
import TermsofService from '@/features/Policy/TermsofService';
import { useKycStore } from '@/store/kyc.store';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

type TermsAndConditionType = {
  IsAccept?: boolean;
  error?: string;
};

export default function TermsOfRegister() {
  const { setAadharVerification } = useKycStore();
  const router = useRouter();
  const [IsAcceptTerms, setAcceptTerms] = useState<TermsAndConditionType>({
    IsAccept: false,
    error: '',
  });
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAcceptTerms({ IsAccept: event.target.checked, error: '' });
  };
  const handleSubmit = () => {
    if (!IsAcceptTerms.IsAccept) {
      setAcceptTerms({
        IsAccept: false,
        error: 'You must accept the Terms of Service to proceed.',
      });
      return;
    }
    setAadharVerification({ kycLevel: 1 });
    router.push('/account/register?SignUp=customer-registration');
  };
  return (
    <>
      <div className="mx-auto w-full max-w-4xl">
        <div className="flex items-center justify-center py-10">
          <div className="w-full rounded-sm bg-white p-4 sm:p-14">
            <Typography as="h1" className="text-center text-2xl sm:text-[32px]">
              Terms of Service
            </Typography>
            <div className="h-4"></div>
            <TermsofService />
            <div className="h-4"></div>
            {/* <label className="form-label flex items-start gap-2.5 sm:items-center">
              <input
                className="ml-[3px] mt-1 h-4 w-4 flex-shrink scale-150 transform sm:mt-0"
                type="checkbox"
                checked={IsAcceptTerms.IsAccept}
                onChange={handleCheckboxChange}
              />
              I acknowledge that I have reviewed and accepted the new giveNtake
              Terms and Conditions, effective as of October 19, 2024.
            </label> */}
            <div className="flex items-start gap-3 rounded-md border border-gray-300 bg-gray-50 p-2">
              <Checkbox
                className="h-5 w-5 flex-shrink-0 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                checked={IsAcceptTerms.IsAccept}
                onChange={handleCheckboxChange}
              />
              <label className="flex items-center text-base text-gray-800">
                I acknowledge that I have reviewed and accepted the new
                giveNtake Terms of Service, effective as of October 19, 2024.
              </label>
            </div>
            {IsAcceptTerms?.error && (
              <>
                <div className="h-1"></div>
                <Typography className="text-base text-red-600">
                  * {IsAcceptTerms.error}
                </Typography>
              </>
            )}
            <div className="h-6"></div>
            <div className="flex w-full justify-center">
              <div className="w-96">
                <Button variant="secondary" onClick={handleSubmit}>
                  I Agreed
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
