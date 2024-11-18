/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import React, { useState } from 'react';
import Typography from '@/components/Typography';
import WhiteCard from '@/components/WhiteCard';
import { MdLogin } from 'react-icons/md';
import { GrStatusGood } from 'react-icons/gr';
import { Button } from '@/components/Button';
import moment from 'moment';
import { MdAdsClick } from 'react-icons/md';
import { MdOutlinePendingActions } from 'react-icons/md';

import { useMutation } from '@apollo/client';
import { convertToInrSymbol, decode, localDateConvertion } from '@/lib/utils';
import { useRouter, useSearchParams } from 'next/navigation';
import toast from 'react-hot-toast';
import { CHECK_CUSTOMER_TOPUP_STATUS } from '@/graphql/mutation/initialapproach.mutation';

type PaymentRequestType = {
  status: string;
  upiIntentUrl: string | undefined;
  errorMessage: string | null;
  createdAt: string;
  updatedAt: string;
  upiTxnId: string | null;
  merchantTxnId: string;
};
const VerifyApproachPayment = () => {
  //   const [showCancelButton, setShowCancelButton] = useState(false);
  const searchParams = useSearchParams();
  const PaymentInfo: PaymentRequestType =
    decode(searchParams.get('tn') || '') || {};
  const amount = searchParams.get('process');
  //   const [PaymentInfo, setPaymentInfo] = useState<PaymentRequestType>();
  const [error, setError] = useState<string>('');

  const router = useRouter();

  const [mutateGivehelpTopupStatus, { loading: loadingGiveHelpStatus }] =
    useMutation(CHECK_CUSTOMER_TOPUP_STATUS);

  const onGiveHelpPaymentStatusCheck = async () => {
    try {
      const { data } = await mutateGivehelpTopupStatus({
        variables: {
          transactionId: PaymentInfo.merchantTxnId,
        },
      });

      if (data?.checkCustomerTopUp?.statusCode !== 200) {
        setError(data?.checkCustomerTopUp?.message);
        if (data?.checkCustomerTopUp?.message === 'Payment Failed.') {
          return router.replace('/dashboard');
        }
      }
      if (data?.checkCustomerTopUp?.statusCode === 200) {
        toast.success(data?.checkCustomerTopUp?.message);
        return router.replace('/dashboard');
      }
    } catch (error) {
      setError('Payment have some technical issues , Re-payment once again');
    }
  };

  const onHandlePaymentStatus = async () => {
    onGiveHelpPaymentStatusCheck();
  };

  //   const onHandleCancelPayment = async (Id: string, paymentType: number) => {
  //     try {
  //       const { data } = await mutationPaymentCancel({
  //         variables: {
  //           transactionId: decode(Id),
  //           transactionType: paymentType,
  //         },
  //       });
  //       if (data?.cancelPayment?.statusCode !== 200) {
  //         return toast.error(data?.cancelPayment?.message);
  //       }
  //       if (data?.cancelPayment?.statusCode === 200) {
  //         toast.success(data?.cancelPayment?.message);
  //         return router.replace('/dashboard/payment/payment-cancel');
  //       }
  //     } catch (error) {
  //       toast.error('Please try again!');
  //     }
  //   };

  const isLoading = loadingGiveHelpStatus;
  return (
    <>
      <div className="flex flex-col items-center justify-center">
        {/* <div className=" flex flex-col items-center justify-center gap-3">
          <Spinner className="text-[#FFCC01]" size={50} />

          <Typography
            as="h4"
            className="text-center leading-[21.09px] text-white"
          >
            Payment request processing , Please wait 5 Minutes{' '}
          </Typography>

          {error && (
            <>
              <Typography className="text-xl font-medium text-red-600">
                * {error}
              </Typography>
            </>
          )}
        </div> */}
        <div className="h-4"></div>
        <WhiteCard className="flex w-full max-w-md flex-col sm:w-10/12 sm:max-w-[588px] sm:px-4">
          <Typography as="h1" className="text-2xl font-bold">
            To complete your payment:
          </Typography>
          <div className="h-2"></div>
          <Typography className="text-sm text-red-600">
            * Please read instructions carefully
          </Typography>

          <div className="h-4"></div>

          <div className="flex items-center gap-2 py-3">
            <MdLogin className="text-gray-400" />
            <Typography as="h4" className="text-sm">
              Check to your UPI application (Google Pay, PhonePe, Paytm etc...)
            </Typography>
          </div>
          <hr className="h-[3px] bg-slate-300" />
          <div className="flex items-center gap-2 py-3">
            <MdOutlinePendingActions className="text-gray-400" />
            <Typography as="h4" className="text-sm">
              Please check your transaction status in your VPA application
            </Typography>
          </div>
          <hr className="h-[3px] bg-slate-300" />
          <div className="flex items-center gap-2 py-3">
            <GrStatusGood className="text-gray-400" />
            <Typography as="h4" className="text-sm">
              Approve the payment request within 5 minutes
            </Typography>
          </div>
          <hr className="h-[3px] bg-slate-300" />
          <div className="flex items-center gap-2 py-3">
            <MdAdsClick className="text-gray-400" />
            <Typography as="h4" className="text-sm">
              After successful payment click check status button.
            </Typography>
          </div>
          <hr className="h-[3px] bg-slate-300" />
          <div className="h-4"></div>
          <div className="flex justify-between">
            {/* <Typography className="font-semibold">Payment Status</Typography> */}
            {error && <Typography className="text-red-500">{error}</Typography>}
          </div>
          <div className="h-3"></div>
          <div className="flex gap-3">
            {/* {showCancelButton && (
              <Button
                className="flex-1"
                variant="secondary"
                disabled={loadingPaymentCancelProcess}
                loading={loadingPaymentCancelProcess}
                onClick={() => {
                  onHandleCancelPayment(PaymentInfo.txnId, 3);
                }}
              >
                Cancel
              </Button>
            )} */}
            <Button
              variant="secondary"
              className="flex-2"
              onClick={onHandlePaymentStatus}
              loading={isLoading}
              disabled={isLoading}
            >
              Check Status
            </Button>
          </div>
          <div className="h-4"></div>
          <div>
            <Typography as="h3" className="font-bold">
              Payment Details
            </Typography>
            <div className="h-2"></div>
            {/* Amount */}
            <div className="flex items-center py-2">
              <Typography className="w-1/3 text-sm sm:w-1/2 md:text-base">
                Amount
              </Typography>
              <span className="w-4 text-center">:</span>
              <Typography className="w-2/3 text-right text-sm md:text-base">
                <span className="ml-1 inline-flex items-baseline">
                  {convertToInrSymbol(Number(decode(amount || '')))}
                </span>
              </Typography>
            </div>

            {/* Transaction ID */}
            <div className="flex items-center py-2">
              <Typography className="w-1/3 text-sm sm:w-1/2 md:text-base">
                Transaction ID
              </Typography>
              <span className="w-4 text-center">:</span>
              <Typography className="w-2/3 text-right text-xs md:text-base">
                {PaymentInfo.merchantTxnId}
              </Typography>
            </div>

            {/* Requested Time */}
            <div className="flex items-center py-2">
              <Typography className="w-1/3 text-sm sm:w-1/2 md:text-base">
                Requested Time
              </Typography>
              <span className="w-4 text-center">:</span>
              <Typography className="w-2/3 text-right text-sm md:text-base">
                {PaymentInfo?.updatedAt
                  ? localDateConvertion(PaymentInfo.updatedAt, true)
                  : moment().format('DD-MM-YYYY, hh:mm A')}
              </Typography>
            </div>

            {/* UPI ID */}
            {PaymentInfo?.upiTxnId && (
              <div className="flex items-center py-2">
                <Typography className="w-1/3 text-sm sm:w-1/2 md:text-base">
                  UPI ID
                </Typography>
                <span className="w-4 text-center">:</span>
                <Typography className="w-2/3 text-right text-sm md:text-base">
                  {PaymentInfo.upiTxnId}
                </Typography>
              </div>
            )}
          </div>
        </WhiteCard>
      </div>
    </>
  );
};

export default VerifyApproachPayment;
