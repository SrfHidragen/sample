'use client';
import Typography from '@/components/Typography';
import WhiteCard from '@/components/WhiteCard';
import { convertToInrSymbol } from '@/lib/utils';
import { usePaymentProcess } from '@/store/paymentprocess.store';
import React from 'react';
import { IoCloseCircleOutline } from 'react-icons/io5';

const CurrentPayemntStatus: { [key: string]: string } = {
  success: 'Payment Success',
  failed: 'Payment Failed',
  cancel: 'Payment Cancel',
};

interface PaymentProps {
  status: 'success' | 'failed' | 'cancel';
}
const PaymentStatus: React.FC<PaymentProps> = ({ status }) => {
  const { PaymentInfo } = usePaymentProcess();
  return (
    <div className="flex w-full items-center justify-center">
      <div className="w-full sm:w-10/12 sm:max-w-[680px] sm:px-0">
        <WhiteCard className="flex flex-col gap-6 rounded-2xl p-4 md:p-8">
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-3">
              <Typography
                as="h2"
                className="font-semibold leading-[28.13px] text-[#C61906]"
              >
                {CurrentPayemntStatus[status]}
              </Typography>
              <Typography
                as="h4"
                className="font-semibold leading-[20.01px] text-black"
              >
                {convertToInrSymbol(PaymentInfo.total_amount || '')}
              </Typography>
            </div>
            <IoCloseCircleOutline
              color="#C61906"
              className="size-9 sm:size-12"
            />
          </div>
        </WhiteCard>
      </div>
    </div>
  );
};

export default PaymentStatus;
