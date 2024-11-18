/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import Typography from '@/components/Typography';
import {
  capitalizeFirstLetter,
  convertToInrSymbol,
  decode,
  encode,
} from '@/lib/utils';
import { usePaymentProcess } from '@/store/paymentprocess.store';
import { notFound, useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useId, useMemo } from 'react';
import { Button } from '@/components/Button';
import { useLazyQuery } from '@apollo/client';
import { RECEIVER_ACCOUNT_INFO } from '@/graphql/mutation/givehelp.mutation';
import {
  GIVE_HELP_PAYMENT_APPROACH,
  PAYMENT_PENDING_TYPE,
  PAYMENT_TYPE,
} from '@/types/paymentprocess.store.type';
import { GetReceiverAccountInfoResponse } from '@/types/pay-amount.give-help.type';
import { FaUserCircle } from 'react-icons/fa';
import PageLoading from '@/components/PageLoading';
import { GlobalVariables } from '@/lib/constant';
import {
  PENDING_GIVE_HELP_PAYMENT,
  PENDING_PMF_PAYMENT,
  PENDING_PROCESSING_PAYMENT,
} from '@/graphql/query/payment.query';
import toast from 'react-hot-toast';
import InfoRow from '../../kyc-page/AddressForm/InfoRow';
import withConsumer from '@/helper/withConsumer';

const AboutPayment = () => {
  const router = useRouter();
  const confirmId = useId();

  //has ProcessingFee Pending Checking
  const [fetchPaymentProcessingFeeStatus] = useLazyQuery(
    PENDING_PROCESSING_PAYMENT,
    {
      fetchPolicy: 'network-only',
    },
  );

  const [fetchPmfPaymentStatus] = useLazyQuery(PENDING_PMF_PAYMENT, {
    fetchPolicy: 'network-only',
  });

  const [fetchGiveHelp] = useLazyQuery(PENDING_GIVE_HELP_PAYMENT, {
    fetchPolicy: 'network-only',
  });

  const [fetchGiveHelpAccountInfo, { data, loading }] =
    useLazyQuery<GetReceiverAccountInfoResponse>(RECEIVER_ACCOUNT_INFO, {
      fetchPolicy: 'network-only',
    });

  const addPaymentProcess = usePaymentProcess((state) => state?.AddPaymentInfo);
  const PaymentInfo = usePaymentProcess((state) => state?.PaymentInfo);
  const searchParams = useSearchParams()?.get('process');

  useEffect(() => {
    if (PaymentInfo?.unique_key && searchParams) {
      const searchParamsId = decode(searchParams);
      const storeUniqueId = decode(PaymentInfo?.unique_key);
      if (searchParamsId !== storeUniqueId) {
        return notFound();
      }
    } else {
      return notFound();
    }
  }, [searchParams, PaymentInfo?.unique_key]);

  if (!PaymentInfo?.unique_key && !searchParams) {
    return <PageLoading />;
  }

  const onHandleConfirm = async () => {
    const EncodeConfirmId = encode(confirmId);
    if (PaymentInfo.payment_type === PAYMENT_TYPE.GIVE_HELP_TOP_UP) {
      try {
        const { data } = await fetchGiveHelp();
        if (
          data?.getLastTopUp?.status === 0 ||
          data?.getLastTopUp?.status === 2
        ) {
          const EncodeTxnId = encode(data?.getLastTopUp?.txnId);
          addPaymentProcess({
            confirm_payment_id: EncodeConfirmId,
            total_amount: data?.getLastTopUp?.amount
              ? data?.getLastTopUp?.amount
              : PaymentInfo.amount,
            amount: PaymentInfo.amount,
            txnId: EncodeTxnId,
            payment_pending: PAYMENT_PENDING_TYPE.GIVE_HELP_TOP_UP,
            IsPendingPayment: true,
            request_time: data?.getLastTopUp?.updatedAt,
          });
          return router.push(
            `/dashboard/payment/complete-payment?tn=${EncodeTxnId}`,
          );
        } else {
          if (
            PaymentInfo.give_help_payment_approach ===
            GIVE_HELP_PAYMENT_APPROACH.NEXT_DESIGNATION
          ) {
            addPaymentProcess({
              payment_page_level: 'givehelp',
              confirm_payment_id: EncodeConfirmId,
              total_amount: data?.getReceiverAccountInfo?.approachAmount
                ? data?.getReceiverAccountInfo?.approachAmount
                : PaymentInfo.total_amount,
              amount: data?.getReceiverAccountInfo?.approachAmount
                ? data?.getReceiverAccountInfo?.approachAmount
                : PaymentInfo.total_amount,
            });
          } else if (
            PaymentInfo.give_help_payment_approach ===
            GIVE_HELP_PAYMENT_APPROACH.HELP_AMOUNT
          ) {
            addPaymentProcess({
              payment_page_level: 'givehelp',
              confirm_payment_id: EncodeConfirmId,
              total_amount: PaymentInfo.total_amount,
              amount: PaymentInfo.total_amount,
            });
          }
        }
      } catch (error) {
        toast.error('Payment Process some issues');
      }
    } else if (PAYMENT_TYPE.PROCESSING_FEE === PaymentInfo.payment_type) {
      try {
        const { data } = await fetchPaymentProcessingFeeStatus();
        if (data?.getLastProcessingFee?.status === 2) {
          const EncodeTxnId = encode(data?.getLastProcessingFee?.transactionId);
          addPaymentProcess({
            confirm_payment_id: EncodeConfirmId,
            total_amount: data?.getLastProcessingFee?.amount
              ? data?.getLastProcessingFee?.amount
              : PaymentInfo.amount,
            amount: PaymentInfo.amount,
            txnId: EncodeTxnId,
            payment_pending: PAYMENT_PENDING_TYPE.PROCESSING_FEE,
            IsPendingPayment: true,
            request_time: data?.getLastProcessingFee?.requestedAt,
          });
          return router.push(
            `/dashboard/payment/complete-payment?tn=${EncodeTxnId}`,
          );
        } else {
          addPaymentProcess({
            confirm_payment_id: EncodeConfirmId,
            total_amount: data?.getReceiverAccountInfo?.approachAmount
              ? data?.getReceiverAccountInfo?.approachAmount
              : PaymentInfo.total_amount,
            amount: PaymentInfo.amount,
          });
        }
      } catch (error) {
        toast.error('Payment Process some issues');
      }
    } else if (PAYMENT_TYPE.INITIAL_PMF_FEE === PaymentInfo.payment_type) {
      try {
        const { data } = await fetchPmfPaymentStatus();
        if (data?.getLastInitialPmf?.status === 1) {
          const EncodeTxnId = encode(data?.getLastInitialPmf?.transactionId);
          addPaymentProcess({
            confirm_payment_id: EncodeConfirmId,
            total_amount: data?.getLastInitialPmf?.amount
              ? data?.getLastInitialPmf?.amount
              : PaymentInfo.amount,
            amount: PaymentInfo.amount,
            txnId: EncodeTxnId,
            IsPendingPayment: true,
            payment_pending: PAYMENT_PENDING_TYPE.INITIAL_PMF_FEE,
            request_time: data?.getLastInitialPmf?.requestedAt,
          });
          return router.push(
            `/dashboard/payment/complete-payment?tn=${EncodeTxnId}`,
          );
        } else {
          addPaymentProcess({
            confirm_payment_id: EncodeConfirmId,
            total_amount: data?.getReceiverAccountInfo?.approachAmount
              ? data?.getReceiverAccountInfo?.approachAmount
              : PaymentInfo.total_amount,
            amount: PaymentInfo.amount,
          });
        }
      } catch (error) {
        toast.error('Payment Process some issues');
      }
    }

    router.push(
      `/dashboard/payment/verify-and-pay?process=${searchParams}&verify=${EncodeConfirmId}`,
    );
  };

  const DifferentPaymentDetails = [
    {
      id: 1,
      name: 'processingFee',
      title: 'Processing Fee',
      description:
        'Every consumer who associates with the giveNtake.world online helping platform will need to pay a one-time processing fee of INR 10. This fee will help cover the costs associated with the KYC process, ensuring a safe and transparent experience for all consumers.',
      amount: 8.2,
      gst_amount: 1.8,
    },
    {
      id: 2,
      name: 'giveHelp',
      title: 'GiveHelp',
      description: `To unconditionally help 10 people in India who are in urgent need of financial help, I am by entrusting to ₹${PaymentInfo?.total_amount} giveNtake online helping platform to help a consumers, whose details are provided below.`,
    },
    {
      id: 3,
      name: 'pmfPayment',
      title: 'PMF Payment',
      description:
        'As a consumer of the giveNtake.world online helping platform / Prasanth Panachikkal Enterprises Private Limited, I acknowledge and understand, in my conscious awareness, that I am willing to pay INR 118, which includes 18% GST, as the Platform Maintenance Fee (PMF)',
    },
  ];

  const CurrentDescription = useMemo(
    () =>
      DifferentPaymentDetails.find(
        (desc) => desc?.name === PaymentInfo.payment_description_type,
      ),
    [PaymentInfo],
  );

  useEffect(() => {
    if (PaymentInfo.payment_type === PAYMENT_TYPE.GIVE_HELP_TOP_UP) {
      const Apporach =
        PaymentInfo.give_help_payment_approach ===
        GIVE_HELP_PAYMENT_APPROACH.NEXT_DESIGNATION
          ? true
          : false;

      fetchGiveHelpAccountInfo({
        variables: {
          isApproach: Apporach,
          approachLevel: PaymentInfo.approach_level,
        },
      });
    }
  }, []);

  if (loading) return <PageLoading />;

  return (
    <div className="flex w-full items-center justify-center py-24">
      {/* <div className="min-w-md w-full px-4 sm:w-10/12 sm:min-w-[700px] sm:px-0"> */}
      <div className="flex flex-col gap-6 rounded-lg bg-[#FFF1CF] p-6">
        <Typography as="h2" className="leading-[28.13px] text-black">
          {PaymentInfo.payment_type === PAYMENT_TYPE.PROCESSING_FEE
            ? 'Consumer KYC verification fee'
            : 'More about this payment'}
        </Typography>
        {CurrentDescription?.description && (
          <Typography as="h4" className="font-normal leading-[26px] text-black">
            {CurrentDescription?.description || ''}
          </Typography>
        )}

        <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3">
          {data?.getReceiverAccountInfo?.paymentInfo &&
            PaymentInfo.payment_type === PAYMENT_TYPE.GIVE_HELP_TOP_UP &&
            data?.getReceiverAccountInfo.paymentInfo?.map(
              (item, index: React.Key) => (
                <div
                  className="flex flex-col justify-between gap-2 rounded-md bg-[#F3E1B2] p-4"
                  key={index}
                >
                  <div className="flex items-start justify-between">
                    <div className="">
                      <Typography as="p" className="text-base font-medium">
                        Name:
                      </Typography>
                      <Typography as="p" className="text-base font-normal">
                        {capitalizeFirstLetter(
                          item?.receiverInfo?.personal?.firstName,
                        )}
                      </Typography>
                      <div className="h-1"></div>
                      <Typography as="p" className="text-base font-medium">
                        Consumership Number:
                      </Typography>
                      <Typography as="p" className="text-base font-normal">
                        {item?.receiverInfo?.username}
                      </Typography>

                      <Typography as="p" className="text-base font-medium">
                        Pay Amount:
                      </Typography>
                      <Typography as="p" className="text-base font-normal">
                        {convertToInrSymbol(item?.pendingAmount)}
                      </Typography>
                    </div>

                    {item?.avatar ? (
                      <div className="rounded-full border-[1.53px] border-[#2FEA00] p-1">
                        <img
                          src={GlobalVariables.imgURL + item?.avatar}
                          alt="alt"
                          className="h-11 w-11 rounded-full"
                        />
                      </div>
                    ) : (
                      <div className="rounded-full border-[1.53px] border-[#2FEA00] p-1">
                        <FaUserCircle size={42.82} color="gray" />
                      </div>
                    )}
                  </div>
                  <div>
                    <Typography as="h4" className="text-base font-medium">
                      Address
                    </Typography>
                    <Typography as="p" className=" text-base font-normal">
                      {item?.receiverInfo?.address?.state},{' '}
                      {item?.receiverInfo?.address?.district},{' '}
                      {item?.receiverInfo?.address?.panchayath},{' '}
                      {item?.receiverInfo?.address?.ward}
                    </Typography>
                  </div>
                  {item?.receiverInfo?.bankDetails && (
                    <div>
                      <Typography as="h4" className="text-base font-medium">
                        Bank Details
                      </Typography>
                      <div className="h-1"></div>
                      <div className="mb-1 grid grid-cols-[1.5fr,1fr,2fr] gap-y-1">
                        {!!item?.receiverInfo?.bankDetails
                          ?.upiRegisteredBankName && (
                          <InfoRow
                            label="Bank Name"
                            value={
                              item?.receiverInfo?.bankDetails
                                ?.upiRegisteredBankName || ''
                            }
                          />
                        )}
                        {!!item?.receiverInfo?.bankDetails
                          ?.upiRegisteredAccountNumber && (
                          <InfoRow
                            label="Account Number"
                            value={
                              item?.receiverInfo?.bankDetails
                                ?.upiRegisteredAccountNumber || ''
                            }
                          />
                        )}
                        {!!item?.receiverInfo?.bankDetails
                          ?.upiRegisteredBankBranch && (
                          <InfoRow
                            label="Branch"
                            value={
                              item?.receiverInfo?.bankDetails
                                ?.upiRegisteredBankBranch || ''
                            }
                          />
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ),
            )}
        </div>
        {data?.getReceiverAccountInfo?.paymentInfo &&
        PaymentInfo.payment_type === PAYMENT_TYPE.GIVE_HELP_TOP_UP ? (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            <div className="flex justify-between">
              <Typography as="p" className="text-[20px] font-normal">
                Payable Amount
              </Typography>
              <Typography as="p" className="text-[20px] font-normal">
                {convertToInrSymbol(PaymentInfo?.amount || '')}
              </Typography>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            <div className="flex justify-between">
              <Typography as="p" className="font-normal text-black">
                One time
              </Typography>
              <Typography as="p" className="font-normal text-black">
                {convertToInrSymbol(PaymentInfo?.amount || '')}
              </Typography>
            </div>
            {PaymentInfo?.tax?.cgst_amount &&
            PaymentInfo?.tax?.cgst_percentage ? (
              <div className="flex justify-between">
                <Typography as="p" className="font-normal text-black">
                  CGST (9%)
                </Typography>
                <Typography as="p" className="font-normal text-black">
                  ₹1.8
                </Typography>
              </div>
            ) : null}
            {PaymentInfo?.tax?.sgst_amount &&
            PaymentInfo?.tax?.sgst_percentage ? (
              <div className="flex justify-between">
                <Typography as="p" className="font-normal text-black">
                  SGST (9%)
                </Typography>
                <Typography as="p" className="font-normal text-black">
                  ₹1.8
                </Typography>
              </div>
            ) : null}
            {PaymentInfo?.tax?.gst_amount &&
            PaymentInfo?.tax?.gst_percentage ? (
              <div className="flex justify-between">
                <Typography as="p" className="font-normal text-black">
                  GST {PaymentInfo?.tax?.gst_percentage}%
                </Typography>
                <Typography as="p" className="font-normal text-black">
                  {convertToInrSymbol(PaymentInfo?.tax?.gst_amount)}
                </Typography>
              </div>
            ) : null}
            <div className="flex justify-between">
              <Typography as="p" className="font-bold text-[#001BC2]">
                Total
              </Typography>
              <Typography as="p" className="font-bold text-[#001BC2]">
                {convertToInrSymbol(PaymentInfo?.total_amount || '')}
              </Typography>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Button
            type="submit"
            variant={'secondary'}
            onClick={onHandleConfirm}
            disabled={loading}
          >
            Continue to payment
          </Button>
        </div>
      </div>
      {/* </div> */}
    </div>
  );
};

export default withConsumer(AboutPayment);
