'use client';
import NoData from '@/components/NoData';
import PageLoading from '@/components/PageLoading';
import Typography from '@/components/Typography';
import { PROCESSING_FEE } from '@/graphql/query/all-history.query';
import withConsumer from '@/helper/withConsumer';
import { convertToInrSymbol, localDateConvertion } from '@/lib/utils';
import { useQuery } from '@apollo/client';
import React from 'react';

interface ProcessingFeeHistoryType {
  transactionId: string;
  upiTxnId: string;
  requestedAt: string;
  amount: number;
  paidDate: string;
  status: string;
}
function ProcessingFee() {
  const { data, loading } = useQuery(PROCESSING_FEE);

  const ProcessingFeeData: ProcessingFeeHistoryType[] =
    data?.processingFeeHistory;

  if (loading) {
    return <PageLoading />;
  }

  if (ProcessingFeeData?.length === 0) return <NoData />;

  return (
    <>
      <div className="mx-auto  max-w-2xl">
        {ProcessingFeeData?.map(
          (item, index: number) =>
            item?.status !== 'Cancelled' && (
              <div
                key={index}
                className="mb-6 flex flex-col gap-2 font-normal text-white"
              >
                <div className="flex items-center justify-between">
                  <Typography className="w-full" as="p">
                    One Time Processing Fee
                  </Typography>
                  <Typography className="w-full text-right" as="p">
                    {convertToInrSymbol(Number(item?.amount))}
                  </Typography>
                </div>
                <div className="flex items-center justify-between">
                  <Typography className="w-full" as="p">
                    Transaction Id
                  </Typography>
                  <Typography className="w-full text-right" as="p">
                    {item?.transactionId}
                  </Typography>
                </div>
                {!!item?.upiTxnId && (
                  <div className="flex items-center justify-between">
                    <Typography className="w-full" as="p">
                      UPI Transaction Id
                    </Typography>
                    <Typography className="w-full text-right" as="p">
                      {item?.upiTxnId}
                    </Typography>
                  </div>
                )}
                <div className="flex items-center justify-between">
                  <Typography className="w-full" as="p">
                    Status
                  </Typography>
                  <Typography className="w-full text-right" as="p">
                    {item?.status}
                  </Typography>
                </div>
                <div className="flex items-center justify-between">
                  <Typography className="w-full" as="p">
                    Date
                  </Typography>
                  <Typography className="w-full text-right" as="p">
                    {item?.paidDate
                      ? localDateConvertion(item?.paidDate, true)
                      : localDateConvertion(item?.requestedAt, true)}
                  </Typography>
                </div>

                {/* <div className="flex items-center justify-end">
              <div className="w-full text-right">
                <Button
                  className="h-fit w-fit border-none bg-none px-0 text-base tracking-wide text-tertiary hover:bg-transparent hover:text-tertiary"
                  variant={'outline'}
                >
                  Download Invoice
                </Button>
              </div>
            </div> */}
                <div className="h-[2px] w-full bg-tertiary"></div>
              </div>
            ),
        )}
      </div>
    </>
  );
}

export default withConsumer(ProcessingFee);
