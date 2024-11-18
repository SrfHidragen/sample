'use client';
import { Button } from '@/components/Button';
import Image from '@/components/Image';
import Typography from '@/components/Typography';
import { useKycStore } from '@/store/kyc.store';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

const Congrats = () => {
  const router = useRouter();
  const { clearAll } = useKycStore();
  useEffect(() => clearAll(), [clearAll]);

  const handleRoutes = () => {
    router.replace('/dashboard');
  };
  return (
    <div className=" flex flex-1 items-center justify-center">
      <div className="container">
        <div className="flex flex-col gap-6 p-12">
          <div className="flex justify-center">
            <div className="h-[106px] w-[113.07px]">
              <Image src="/img/logo.svg" alt="logo" className="h-auto w-full" />
            </div>
          </div>
          <Typography
            as="h3"
            className="text-center text-[32px] leading-[37.5px] text-white"
          >
            Congratulations
          </Typography>
          <Typography
            as="p"
            className="text-center text-base leading-[19.5px] text-white"
          >
            You are now an official giveNtake verified Customer
          </Typography>
          <div className="flex justify-center">
            <Button
              onClick={handleRoutes}
              className="w-full max-w-[400px] rounded-2xl bg-yellow-500 p-3 text-center font-bold text-black"
            >
              <div className="w-full">Continue</div>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Congrats;
