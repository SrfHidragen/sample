'use client';
import Typography from '@/components/Typography';
import WhiteCard from '@/components/WhiteCard';
import { convertToInrSymbol } from '@/lib/utils';
import { useAuthStore } from '@/store/auth.store';
import { usePaymentProcess } from '@/store/paymentprocess.store';
import { PAYMENT_TYPE } from '@/types/paymentprocess.store.type';
import React, { useEffect } from 'react';
import { IoIosCheckmarkCircleOutline } from 'react-icons/io';

const PaymentSuccessful = () => {
  const { PaymentInfo } = usePaymentProcess();
  const { updateUserDetails } = useAuthStore();

  useEffect(() => {
    if (PaymentInfo.payment_type === PAYMENT_TYPE.PROCESSING_FEE) {
      updateUserDetails({ userDetails: { isProcessingFeePaid: true } });
    }
  }, [PaymentInfo, updateUserDetails]);
  return (
    <div className="flex w-full items-center justify-center">
      <div className="w-full sm:w-10/12 sm:max-w-[680px] sm:px-0">
        <WhiteCard className="flex flex-col gap-6 rounded-2xl p-4 md:p-8">
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-3">
              <Typography
                as="h2"
                className="font-semibold leading-[28.13px] text-[#52B900]"
              >
                Payment Success
              </Typography>
              <Typography
                as="h4"
                className="font-semibold leading-[20.01px] text-black"
              >
                {convertToInrSymbol(PaymentInfo.total_amount || '')}
              </Typography>
            </div>
            <IoIosCheckmarkCircleOutline className="size-9 fill-[#52B900] sm:size-12" />
          </div>
        </WhiteCard>
      </div>
    </div>
  );
};

export default PaymentSuccessful;
