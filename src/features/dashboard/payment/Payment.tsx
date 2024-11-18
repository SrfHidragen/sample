'use client';

import Typography from '@/components/Typography';
import WhiteCard from '@/components/WhiteCard';
import { convertToInrSymbol, decode } from '@/lib/utils';
import { usePaymentProcess } from '@/store/paymentprocess.store';
import moment from 'moment';
import { useRouter } from 'next/navigation';
import React from 'react';

interface PaymentProps {
  status: 'success' | 'failed' | 'cancel';
}

const Payment: React.FC<PaymentProps> = ({ status }) => {
  const router = useRouter();
  const linkText =
    status === 'success'
      ? 'Continue'
      : status === 'failed'
        ? 'Try Again'
        : 'Continue';

  const showRefundText = status !== 'success';
  const { PaymentInfo } = usePaymentProcess();

  const handlRoute = () => {
    router.replace('/dashboard');
  };
  return (
    <div className="flex w-full items-center justify-center">
      <div className="w-full max-w-md sm:w-10/12 sm:max-w-[680px] sm:px-0">
        <WhiteCard className="flex flex-col gap-6 rounded-2xl p-4 md:p-8">
          <div className="grid grid-cols-[1fr,1.5fr,1.5fr] gap-[9px] sm:p-[23.74px]">
            <Typography
              as="h4"
              className="text-[14px] font-normal text-black sm:text-[18px]"
            >
              Amount
            </Typography>
            <Typography
              as="h4"
              className="text-center text-[14px] font-normal text-black sm:text-[18px]"
            >
              :
            </Typography>
            <Typography
              as="h4"
              className="text-[14px] font-normal text-black sm:text-[18px]"
            >
              {convertToInrSymbol(PaymentInfo?.total_amount || '')}
            </Typography>

            <Typography
              as="h4"
              className="text-[14px] font-normal text-black sm:text-[18px]"
            >
              Transaction ID
            </Typography>
            <Typography
              as="h4"
              className="text-center text-[14px] font-normal text-black sm:text-[18px]"
            >
              :
            </Typography>
            <Typography
              as="h4"
              className="text-[14px] font-normal text-black sm:text-[18px]"
            >
              {!!PaymentInfo?.txnId && decode(PaymentInfo.txnId)}
            </Typography>

            <Typography
              as="h4"
              className="text-[14px] font-normal text-black sm:text-[18px]"
            >
              Date and Time
            </Typography>
            <Typography
              as="h4"
              className="text-center text-[14px] font-normal text-black sm:text-[18px]"
            >
              :
            </Typography>
            <Typography
              as="h4"
              className="text-[14px] font-normal text-black sm:text-[18px]"
            >
              {moment().format('MM-DD-YYYY, h:mm a')}
            </Typography>

            {!!PaymentInfo?.upiTxnId && (
              <>
                <Typography
                  as="h4"
                  className="text-[14px] font-normal text-black sm:text-[18px]"
                >
                  UPI Transaction Id
                </Typography>
                <Typography
                  as="h4"
                  className="text-center text-[14px] font-normal text-black sm:text-[18px]"
                >
                  :
                </Typography>
                <Typography
                  as="h4"
                  className="text-[14px] font-normal text-black sm:text-[18px]"
                >
                  {PaymentInfo.upiTxnId}
                </Typography>
              </>
            )}

            <Typography
              as="h4"
              className="text-[14px] font-normal text-black sm:text-[18px]"
            >
              Payment Mode
            </Typography>
            <Typography
              as="h4"
              className="text-center text-[14px] font-normal text-black sm:text-[18px]"
            >
              :
            </Typography>
            <Typography
              as="h4"
              className="text-[14px] font-normal text-black sm:text-[18px]"
            >
              UPI
            </Typography>
          </div>
          <div className="w-full max-w-full sm:max-w-[248px]">
            <div
              onClick={handlRoute}
              className="font-roboto block w-full cursor-pointer rounded-lg bg-tertiary px-6 py-4 text-center text-[16px] font-semibold leading-[15px] text-black duration-300 hover:bg-yellow-500 hover:text-black hover:shadow-2xl"
            >
              {linkText}
            </div>
          </div>
          {showRefundText && (
            <Typography
              as="h4"
              className="mt-10 text-[14px] font-normal text-black sm:text-[18px]"
            >
              Any Money debited will be refunded in your account within 5-7
              business days
            </Typography>
          )}
        </WhiteCard>
      </div>
    </div>
  );
};

export default Payment;
