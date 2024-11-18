/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import React, { useEffect, useState } from 'react';
import Typography from '@/components/Typography';
import WhiteCard from '@/components/WhiteCard';
import { MdLogin } from 'react-icons/md';
import { GrStatusGood } from 'react-icons/gr';
import { Button } from '@/components/Button';
import moment from 'moment';
import { MdAdsClick } from 'react-icons/md';
import { MdOutlinePendingActions } from 'react-icons/md';
import { usePaymentProcess } from '@/store/paymentprocess.store';
import { useMutation } from '@apollo/client';
import { convertToInrSymbol, decode, localDateConvertion } from '@/lib/utils';
import { notFound, useRouter, useSearchParams } from 'next/navigation';
import {
  PAYMENT_PENDING_TYPE,
  PAYMENT_TYPE,
} from '@/types/paymentprocess.store.type';
import { CHECK_TOP_UP_PAYMENT_STATUS } from '@/graphql/mutation/givehelp.mutation';
import {
  CHECK_INITIAL_PAYMENT_STATUS,
  PMF_PAYMENT_CHECK_STATUS,
} from '@/graphql/mutation/initialpmfpayment.mutation';
import { CANCEL_PAYMENT } from '@/graphql/mutation/payment.mutation';
import toast from 'react-hot-toast';
import withConsumer from '@/helper/withConsumer';

const CompletePayment = () => {
  const [showCancelButton, setShowCancelButton] = useState(false);
  const { PaymentInfo, AddPaymentInfo } = usePaymentProcess();
  const [error, setError] = useState<string>('');
  const paymentStatusId = useSearchParams().get('tn');
  const router = useRouter();

  //Cancel Payment Process
  const [mutationPaymentCancel, { loading: loadingPaymentCancelProcess }] =
    useMutation(CANCEL_PAYMENT);

  const [mutatePmfPaymentCheckStatus, { loading: ispmfLoading }] = useMutation(
    PMF_PAYMENT_CHECK_STATUS,
  );
  const [mutateGivehelpTopupStatus, { loading: loadingGiveHelpStatus }] =
    useMutation(CHECK_TOP_UP_PAYMENT_STATUS);

  const [mutateInitialPaymentCheckStatus, { loading: InitialLoading }] =
    useMutation(CHECK_INITIAL_PAYMENT_STATUS);
  // const onGeneralPaymentStatusCheck = async () => {
  //   try {
  //     const { data } = await mutatePaymentStatus({
  //       variables: {
  //         transactionId: decode(PaymentInfo?.txnId),
  //         type: 1,
  //       },
  //     });
  //     if (data?.checkPaymentStatus?.statusCode !== 200) {
  //       return router.replace('/dashboard/payment/payment-fail');
  //     }
  //     if (data?.checkPaymentStatus?.data?.status === 'SUCCESS') {
  //       router.replace('/dashboard/payment/payment-success');
  //     } else {
  //       setError('Please ensure your transaction success');
  //     }
  //   } catch (error) {
  //     setError('Payment have some technical issues , Re-payment once again');
  //   }
  // };

  const onGiveHelpPaymentStatusCheck = async () => {
    try {
      const { data } = await mutateGivehelpTopupStatus({
        variables: {
          transactionId: decode(PaymentInfo?.txnId),
          type: 1,
        },
      });
      if (data?.checkTopUpStatus?.statusCode !== 200) {
        if (data?.checkTopUpStatus?.message === 'Payment Failed.') {
          return router.replace('/dashboard/payment/payment-fail');
        }
        setError(data?.checkTopUpStatus?.message);
      }
      if (data?.checkTopUpStatus?.statusCode === 200) {
        AddPaymentInfo({
          upiTxnId: data?.checkTopUpStatus?.upiTxnId,
        });
        return router.replace('/dashboard/payment/payment-success');
      }
    } catch (error) {
      setError('Payment have some technical issues , Re-payment once again');
    }
  };
  const onHandleInitialProcessingFee = async () => {
    try {
      const { data } = await mutateInitialPaymentCheckStatus({
        variables: {
          transactionId: decode(PaymentInfo?.txnId),
        },
      });
      if (data?.checkProcessingFeeStatus?.statusCode !== 200) {
        if (
          data?.checkProcessingFeeStatus?.errors?.message === 'Payment Failed.'
        ) {
          return router.replace('/dashboard/payment/payment-fail');
        }
        return setError(data?.checkProcessingFeeStatus?.message);
      }
      if (data?.checkProcessingFeeStatus?.statusCode === 200) {
        AddPaymentInfo({
          upiTxnId: data?.checkProcessingFeeStatus?.upiTxnId,
        });
        return router.replace('/dashboard/payment/payment-success');
      }
    } catch (error) {
      setError('Payment have some technical issues , Re-payment once again');
    }
  };

  const onPmfPaymentStatusCheck = async () => {
    try {
      const { data } = await mutatePmfPaymentCheckStatus({
        variables: {
          transactionId: decode(PaymentInfo?.txnId),
        },
      });
      if (data?.checkPmfPaymentStatus?.statusCode !== 200) {
        if (
          data?.checkPmfPaymentStatus?.errors?.message === 'Payment Failed.'
        ) {
          return router.replace('/dashboard/payment/payment-fail');
        }
        return setError(data?.checkPmfPaymentStatus?.message);
      }
      if (data?.checkPmfPaymentStatus?.statusCode === 200) {
        AddPaymentInfo({
          upiTxnId: data?.checkPmfPaymentStatus?.upiTxnId,
        });
        return router.replace('/dashboard/payment/payment-success');
      }
    } catch (error) {
      setError('Payment have some technical issues , Re-payment once again');
    }
  };

  const onHandlePaymentStatus = async () => {
    if (PaymentInfo.payment_type === PAYMENT_TYPE.GIVE_HELP_TOP_UP) {
      onGiveHelpPaymentStatusCheck();
    }
    if (PaymentInfo.payment_type === PAYMENT_TYPE.INITIAL_PMF_FEE) {
      onPmfPaymentStatusCheck();
    } else if (PaymentInfo.payment_type === PAYMENT_TYPE.PROCESSING_FEE) {
      onHandleInitialProcessingFee();
    }
  };

  useEffect(() => {
    if (paymentStatusId && PaymentInfo?.txnId) {
      AddPaymentInfo({
        unique_key: '',
      });
      const TxnParamsId = decode(paymentStatusId);
      const StoreTxnId = decode(PaymentInfo?.txnId);
      if (TxnParamsId !== StoreTxnId) notFound();
    } else {
      return notFound();
    }
  }, [paymentStatusId, PaymentInfo.txnId]);

  const onHandleCancelPayment = async (Id: string, paymentType: number) => {
    try {
      const { data } = await mutationPaymentCancel({
        variables: {
          transactionId: decode(Id),
          transactionType: paymentType,
        },
      });
      if (data?.cancelPayment?.statusCode !== 200) {
        return toast.error(data?.cancelPayment?.message);
      }
      if (data?.cancelPayment?.statusCode === 200) {
        toast.success(data?.cancelPayment?.message);
        return router.replace('/dashboard/payment/payment-cancel');
      }
    } catch (error) {
      toast.error('Please try again!');
    }
  };

  useEffect(() => {
    if (
      PaymentInfo?.request_time !== null &&
      PaymentInfo?.request_time !== undefined
    ) {
      const compareTimestamps = () => {
        const currentTime = moment();
        const givenTime = moment.unix(Number(PaymentInfo.request_time));

        const differenceInMinutes = currentTime.diff(givenTime, 'minutes');

        if (differenceInMinutes >= 5) {
          setShowCancelButton(true);
        } else {
          setShowCancelButton(false);
        }
      };

      compareTimestamps();

      const interval = setInterval(compareTimestamps, 1000);

      return () => {
        clearInterval(interval);
      };
    }
  }, [PaymentInfo?.request_time]);

  const isLoading = ispmfLoading || loadingGiveHelpStatus || InitialLoading;
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
            {showCancelButton && (
              <Button
                className="flex-1"
                variant="secondary"
                disabled={loadingPaymentCancelProcess}
                loading={loadingPaymentCancelProcess}
                onClick={() => {
                  let paymentType = 0;
                  switch (PaymentInfo.payment_pending) {
                    case PAYMENT_PENDING_TYPE.PROCESSING_FEE:
                      paymentType = 1;
                      break;
                    case PAYMENT_PENDING_TYPE.INITIAL_PMF_FEE:
                      paymentType = 2;
                      break;
                    case PAYMENT_PENDING_TYPE.GIVE_HELP_TOP_UP:
                      paymentType = 3;
                      break;
                    default:
                      paymentType = 0;
                      break;
                  }
                  onHandleCancelPayment(PaymentInfo.txnId, paymentType);
                }}
              >
                Cancel
              </Button>
            )}
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
                  {convertToInrSymbol(Number(PaymentInfo.total_amount))}
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
                {!!PaymentInfo?.txnId && decode(PaymentInfo.txnId)}
              </Typography>
            </div>

            {/* Requested Time */}
            <div className="flex items-center py-2">
              <Typography className="w-1/3 text-sm sm:w-1/2 md:text-base">
                Requested Time
              </Typography>
              <span className="w-4 text-center">:</span>
              <Typography className="w-2/3 text-right text-sm md:text-base">
                {PaymentInfo.request_time
                  ? localDateConvertion(PaymentInfo.request_time, true)
                  : moment().format('DD-MM-YYYY, hh:mm A')}
              </Typography>
            </div>

            {/* UPI ID */}
            {PaymentInfo.upi_id && (
              <div className="flex items-center py-2">
                <Typography className="w-1/3 text-sm sm:w-1/2 md:text-base">
                  UPI ID
                </Typography>
                <span className="w-4 text-center">:</span>
                <Typography className="w-2/3 text-right text-sm md:text-base">
                  {PaymentInfo.upi_id}
                </Typography>
              </div>
            )}
          </div>
        </WhiteCard>
      </div>
    </>
  );
};

export default withConsumer(CompletePayment);
