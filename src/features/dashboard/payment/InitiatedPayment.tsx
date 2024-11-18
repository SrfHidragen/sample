/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { Button } from '@/components/Button';
import NoData from '@/components/NoData';
import PageLoading from '@/components/PageLoading';
import Typography from '@/components/Typography';
import { CHECK_TOP_UP_PAYMENT_STATUS } from '@/graphql/mutation/givehelp.mutation';
import {
  CHECK_INITIAL_PAYMENT_STATUS,
  PMF_PAYMENT_CHECK_STATUS,
} from '@/graphql/mutation/initialpmfpayment.mutation';
import { CANCEL_PAYMENT } from '@/graphql/mutation/payment.mutation';
import { INITIATED_QUERY } from '@/graphql/query/payment.query';
import withConsumer from '@/helper/withConsumer';
import { cn, convertToInrSymbol, localDateConvertion } from '@/lib/utils';
import { useLazyQuery, useMutation } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const INITIAL_PROCESSING_STATUS: { [key: string]: string } = {
  Failed: 'text-red-500',
  Completed: 'text-green-500',
  'In Progress': 'text-orange-400',
};

const PMF_STATUS_NAME: { [key: number]: string } = {
  1: 'Pending',
  2: 'Completed',
  3: 'Failed',
  7: 'Cancel',
};

const PMF_STATUS_COLOR: { [key: number]: string } = {
  1: 'text-orange-500',
  2: 'text-green-500',
  3: 'text-red-500',
  7: 'text-orange-500',
};

const TOP_UP_STATUS: { [key: number]: string } = {
  0: 'WAITING',
  2: 'PROCESSING',
  6: 'FAILED',
  7: 'CANCELLED',
  3: 'SUCCESS',
};
const TOPUP_STATUS_COLOR: { [key: number]: string } = {
  0: 'text-orange-500',
  2: 'text-orange-500',
  3: 'text-green-500',
  6: 'text-red-500',
  7: 'text-yellow-400',
};

interface BankTopUpNode {
  txnId: string;
  upiTxnId: string | null;
  amount: string;
  status: number;
  createdAt: string;
  updatedAt: string;
}

interface BankTopUpTypeEdge {
  node: BankTopUpNode;
}
interface pmfType {
  transactionId: string;
  upiTxnId: string | null;
  amount: number | null;
  status: number;
  requestedAt: number;
  requestApprovedAt: number;
}

interface ProcessingType {
  transactionId: string;
  upiTxnId: string | null;
  amount: number | null;
  status: string;
  requestedAt: number;
  paidDate: number;
}
function InitiatedPayment() {
  const [loadingStatus, setLoadingStatus] = useState<{
    [key: string]: boolean;
  }>({});
  const [loadingCancel, setLoadingCancel] = useState<{
    [key: string]: boolean;
  }>({});

  const [mutationPaymentCancel, { loading: loadingPaymentCancelProcess }] =
    useMutation(CANCEL_PAYMENT);
  const [mutatePmfPaymentCheckStatus, { loading: ispmfLoading }] = useMutation(
    PMF_PAYMENT_CHECK_STATUS,
  );
  const [mutateInitialPaymentCheckStatus, { loading: InitialLoading }] =
    useMutation(CHECK_INITIAL_PAYMENT_STATUS);

  const [mutateGivehelpTopupStatus, { loading: loadingGiveHelpStatus }] =
    useMutation(CHECK_TOP_UP_PAYMENT_STATUS);

  const [fetchPendingPayment, { data, loading }] = useLazyQuery(
    INITIATED_QUERY,
    {
      fetchPolicy: 'network-only',
    },
  );

  useEffect(() => {
    fetchPendingPayment();
  }, [fetchPendingPayment]);
  if (loading) return <PageLoading />;

  const pmfpaymentlist: pmfType[] = data?.getPaymentsHistory?.pmfPayments || [];
  const ProcessingFee: ProcessingType[] =
    data?.getPaymentsHistory?.processingFee || [];
  const topup: BankTopUpTypeEdge[] =
    data?.getPaymentsHistory?.topUps?.edges || [];

  if (
    pmfpaymentlist?.length === 0 &&
    ProcessingFee?.length === 0 &&
    topup?.length === 0
  ) {
    return <NoData />;
  }

  //===> Initial Processing Fee
  const onHandleInitialProcessingFee = async (Id: string) => {
    setLoadingStatus((prev) => ({ ...prev, [Id]: true }));
    try {
      const { data } = await mutateInitialPaymentCheckStatus({
        variables: {
          transactionId: Id,
        },
      });
      if (data?.checkProcessingFeeStatus?.statusCode !== 200) {
        toast.error(data?.checkProcessingFeeStatus?.errors?.message);
        fetchPendingPayment();
        return;
      }
      if (data?.checkProcessingFeeStatus?.statusCode === 200) {
        toast.success('Payment Success');
        fetchPendingPayment();
      }
    } catch (error) {
      toast.error('Please try again!');
    } finally {
      setLoadingStatus((prev) => ({ ...prev, [Id]: false }));
    }
  };

  //PMF Payment Check Status
  const onPmfPaymentStatusCheck = async (Id: string) => {
    setLoadingStatus((prev) => ({ ...prev, [Id]: true }));
    try {
      const { data } = await mutatePmfPaymentCheckStatus({
        variables: {
          transactionId: Id,
        },
      });
      if (data?.checkPmfPaymentStatus?.statusCode !== 200) {
        toast.error(data?.checkPmfPaymentStatus?.errors?.message);
        fetchPendingPayment();
        return;
      }
      if (data?.checkPmfPaymentStatus?.statusCode === 200) {
        toast.success(data?.checkPmfPaymentStatus?.message);
      }
      fetchPendingPayment();
    } catch (error) {
      toast.error('Please try again!');
    } finally {
      setLoadingStatus((prev) => ({ ...prev, [Id]: false }));
    }
  };

  //===> Give Help Payment
  const onGiveHelpPaymentStatusCheck = async (Id: string) => {
    setLoadingStatus((prev) => ({ ...prev, [Id]: true }));
    try {
      const { data } = await mutateGivehelpTopupStatus({
        variables: {
          transactionId: Id,
          type: 1,
        },
      });
      if (data?.checkTopUpStatus?.statusCode !== 200) {
        toast.error(data?.checkTopUpStatus?.message);
        fetchPendingPayment();
        return;
      }
      if (data?.checkTopUpStatus?.statusCode === 200) {
        toast.success(data?.checkTopUpStatus?.message);
      }
      fetchPendingPayment();
    } catch (error) {
      toast.error('Please try again!');
    } finally {
      setLoadingStatus((prev) => ({ ...prev, [Id]: false }));
    }
  };

  const onHandleCancelPayment = async (Id: string, paymentType: number) => {
    setLoadingCancel((prev) => ({ ...prev, [Id]: true }));
    try {
      const { data } = await mutationPaymentCancel({
        variables: {
          transactionId: Id,
          transactionType: paymentType,
        },
      });
      if (data?.cancelPayment?.statusCode !== 200) {
        return toast.error(data?.cancelPayment?.message);
      }
      if (data?.cancelPayment?.statusCode === 200) {
        fetchPendingPayment();
        return toast.success(data?.cancelPayment?.message);
      }
    } catch (error) {
      toast.error('Please try again!');
    } finally {
      setLoadingCancel((prev) => ({ ...prev, [Id]: false }));
    }
  };

  return (
    <>
      <div className="container">
        {/* PROCESSING FEE */}

        <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
          {topup?.map((item, index: number) => (
            <div key={index}>
              <div className="h-2"></div>
              <div className="text-xl font-normal text-white ">
                <Typography>Payment {index + 1}</Typography>
              </div>
              <div className="h-4"></div>
              <div className="h-2"></div>
              <div className="bg-[#0119AD] p-4">
                <Typography className="text-[20px] text-white">
                  GIVE HELP PAYMENT
                </Typography>
                <div className="h-3"></div>
                <div className="flex justify-between">
                  <Typography className="text-white">Status</Typography>
                  <Typography
                    className={cn(
                      'text-white',
                      TOPUP_STATUS_COLOR[item?.node.status],
                    )}
                  >
                    {TOP_UP_STATUS[item?.node?.status]}
                  </Typography>
                </div>
                <div className="h-1"></div>
                <div className="flex justify-between">
                  <Typography className="text-white">Date</Typography>
                  <Typography className="text-white">
                    {item?.node?.updatedAt
                      ? localDateConvertion(item?.node?.updatedAt, true)
                      : localDateConvertion(item?.node?.createdAt)}
                  </Typography>
                </div>
                <div className="h-1"></div>
                <div className="flex justify-between">
                  <Typography className="text-white">Payment Mode</Typography>
                  <Typography className="text-white">UPI</Typography>
                </div>
                <div className="h-2"></div>
                <hr />
                <div className="flex flex-col items-end">
                  <Typography className="text-white">Amount</Typography>
                  <Typography className="text-white">
                    {convertToInrSymbol(item?.node?.amount)}
                  </Typography>
                </div>
                <div className="h-3"></div>

                <div className="flex justify-between gap-2">
                  {item?.node.status === 0 && (
                    <Button
                      variant={'secondary'}
                      disabled={
                        loadingCancel[item?.node?.txnId] ||
                        loadingPaymentCancelProcess
                      }
                      loading={
                        loadingCancel[item?.node?.txnId] ||
                        loadingPaymentCancelProcess
                      }
                      onClick={() => onHandleCancelPayment(item?.node.txnId, 3)}
                    >
                      Cancel
                    </Button>
                  )}
                  {(item?.node?.status === 7 || item?.node?.status === 0) && (
                    <Button
                      variant={'secondary'}
                      onClick={() =>
                        onGiveHelpPaymentStatusCheck(item?.node?.txnId)
                      }
                      disabled={loadingGiveHelpStatus}
                      loading={loadingStatus[item?.node?.txnId]}
                    >
                      Check Status
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        {((topup?.length !== 0 && pmfpaymentlist?.length !== 0) ||
          (topup?.length !== 0 && ProcessingFee?.length !== 0)) && (
          <>
            <div className="h-5"></div>
            <hr />
            <div className="h-2"></div>
          </>
        )}

        <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
          {/* PMF PAYMENT PENDING LIST */}
          {pmfpaymentlist?.map((item, index) => (
            <div key={index}>
              <div className="h-2"></div>
              <div className="text-xl font-normal text-white ">
                <Typography>Payment {index + 1}</Typography>
              </div>
              <div className="h-4"></div>
              <div className="bg-[#0119AD] p-4">
                <Typography className="text-[20px] text-white">
                  PMF PAYMENT
                </Typography>
                <div className="h-3"></div>
                <div className="flex justify-between">
                  <Typography className="text-white">Status</Typography>
                  <Typography
                    className={cn('text-white', PMF_STATUS_COLOR[item.status])}
                  >
                    {PMF_STATUS_NAME[item?.status]}
                  </Typography>
                </div>
                <div className="h-1"></div>
                <div className="flex justify-between">
                  <Typography className="text-white">Date</Typography>
                  <Typography className="text-white">
                    {item?.requestApprovedAt
                      ? localDateConvertion(item?.requestApprovedAt, true)
                      : localDateConvertion(item?.requestedAt, true)}
                  </Typography>
                </div>
                <div className="h-1"></div>
                <div className="flex justify-between">
                  <Typography className="text-white">Payment Mode</Typography>
                  <Typography className="text-white">UPI</Typography>
                </div>
                <div className="h-2"></div>
                <hr />
                <div className="flex flex-col items-end">
                  <Typography className="text-white">Amount</Typography>
                  <Typography className="text-white">
                    {convertToInrSymbol(item?.amount || '')}
                  </Typography>
                </div>
                <div className="h-3"></div>

                <div className="flex justify-between gap-3">
                  {item?.status === 1 && (
                    <Button
                      variant={'secondary'}
                      disabled={
                        loadingCancel[item?.transactionId] ||
                        loadingPaymentCancelProcess
                      }
                      loading={
                        loadingCancel[item?.transactionId] ||
                        loadingPaymentCancelProcess
                      }
                      onClick={() =>
                        onHandleCancelPayment(item?.transactionId, 2)
                      }
                    >
                      Cancel
                    </Button>
                  )}
                  {(item?.status === 1 || item?.status === 7) && (
                    <Button
                      variant={'secondary'}
                      onClick={() => {
                        onPmfPaymentStatusCheck(item?.transactionId);
                      }}
                      loading={loadingStatus[item?.transactionId]}
                      disabled={ispmfLoading}
                    >
                      Check Status
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        {pmfpaymentlist?.length !== 0 && ProcessingFee?.length !== 0 && (
          <>
            <div className="h-5"></div>
            <hr />
            <div className="h-2"></div>
          </>
        )}
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
          {ProcessingFee?.map((item, index) => (
            <div key={index}>
              <div className="h-2"></div>
              <div className="text-xl font-normal text-white ">
                <Typography>Payment {index + 1}</Typography>
              </div>
              <div className="h-4"></div>
              <div className="h-2"></div>
              <div className="bg-[#0119AD] p-4">
                <Typography className="text-[20px] text-white">
                  PROCESSING FEE PAYMENT
                </Typography>
                <div className="h-3"></div>
                <div className="flex justify-between">
                  <Typography className="text-white">Status</Typography>
                  <Typography
                    className={cn(
                      'text-white',
                      INITIAL_PROCESSING_STATUS[item?.status],
                    )}
                  >
                    {item?.status}
                  </Typography>
                </div>
                <div className="h-1"></div>
                <div className="flex justify-between">
                  <Typography className="text-white">Date</Typography>
                  <Typography className="text-white">
                    {item?.paidDate
                      ? localDateConvertion(item?.paidDate, true)
                      : localDateConvertion(item?.requestedAt, true)}
                  </Typography>
                </div>
                <div className="h-1"></div>
                <div className="flex justify-between">
                  <Typography className="text-white">Payment Mode</Typography>
                  <Typography className="text-white">UPI</Typography>
                </div>
                <div className="h-2"></div>
                <hr />
                <div className="flex flex-col items-end">
                  <Typography className="text-white">Amount</Typography>
                  <Typography className="text-white">
                    {convertToInrSymbol(item?.amount || '')}
                  </Typography>
                </div>
                <div className="h-3"></div>

                <div className="flex justify-between gap-2">
                  {item?.status === 'In Progress' && (
                    <Button
                      variant={'secondary'}
                      disabled={
                        loadingCancel[item?.transactionId] ||
                        loadingPaymentCancelProcess
                      }
                      loading={
                        loadingCancel[item?.transactionId] ||
                        loadingPaymentCancelProcess
                      }
                      onClick={() =>
                        onHandleCancelPayment(item?.transactionId, 1)
                      }
                    >
                      Cancel
                    </Button>
                  )}
                  {(item?.status === 'In Progress' ||
                    item?.status === 'Cancelled') && (
                    <Button
                      variant={'secondary'}
                      onClick={() =>
                        onHandleInitialProcessingFee(item?.transactionId)
                      }
                      loading={loadingStatus[item?.transactionId]}
                      disabled={InitialLoading}
                    >
                      Check Status
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default withConsumer(InitiatedPayment);
