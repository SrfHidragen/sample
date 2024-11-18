'use client';
import { Button } from '@/components/Button';
import Typography from '@/components/Typography';
import { useRouter, useSearchParams } from 'next/navigation';
import React from 'react';
import { IoIosCheckmarkCircleOutline } from 'react-icons/io';

const EmailVerification = () => {
  const searchParams = useSearchParams().get('email') || '';
  const router = useRouter();
  const URI = decodeURIComponent(searchParams);
  const handleRouter = () => router.push('/dashboard');
  return (
    <div className="container">
      <div className="mx-auto flex min-h-[70vh] max-w-2xl flex-col items-center justify-center gap-6 py-10 text-center sm:min-h-[60vh] sm:gap-8">
        <IoIosCheckmarkCircleOutline className="size-24 fill-green-500  sm:size-28" />
        <Typography as="h1" className="text-[28px] text-white  sm:text-[48px]">
          Email Verified Successfully
        </Typography>
        <Typography as="p" className="text-white">
          Your new email ID, {URI}, is now registered with giveNtake. To ensure
          you receive all important updates and communications, please add
          “info@giveNtake” to your contacts.
        </Typography>
        <Button
          className="max-w-sm"
          variant={'secondary'}
          onClick={handleRouter}
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export default EmailVerification;
