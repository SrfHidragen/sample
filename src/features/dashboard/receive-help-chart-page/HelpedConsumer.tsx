/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import NoData from '@/components/NoData';
import PageLoading from '@/components/PageLoading';
import Typography from '@/components/Typography';
import { HELPED_CONSUMER } from '@/graphql/query/receive.help.chart';
import { cn, convertToInrSymbol, localDateConvertion } from '@/lib/utils';
import { UserReceiveHelpHistoryEdge } from '@/types/helped.consumer.type';
import { useQuery } from '@apollo/client';
import { useSearchParams } from 'next/navigation';
import React from 'react';

const STATUSLINE: { [key: number]: string } = {
  1: 'Partially Completed',
  3: 'Completed',
};
const STATUSCLASS: { [key: number]: string } = {
  1: 'text-orange-500',
  3: 'text-green-500',
};

function HelpedConsumer() {
  const searchParams = useSearchParams();
  const stage = searchParams.get('stage');
  const { data, loading } = useQuery(HELPED_CONSUMER, {
    variables: { rowNumber: Number(stage) },
  });

  const HelpedList: UserReceiveHelpHistoryEdge[] =
    data?.helpedConsumersOnReceiversByStage?.edges;

  if (loading) return <PageLoading />;
  if (!HelpedList || HelpedList?.length === 0)
    return <NoData Error="No data" />;
  return (
    <div className="container">
      <div>
        <Typography className="text-white">Stage {stage}</Typography>
      </div>
      <div className="h-3"></div>
      <div className="grid grid-cols-1 gap-2 md:grid-cols-3">
        {HelpedList?.map((item, index) => (
          <div
            className="rounded-sm bg-[#003186] p-4 hover:shadow-lg"
            key={index}
          >
            <div className="flex flex-col gap-2 text-white">
              <div className="flex">
                <Typography className="flex-1 ">Consumer Name</Typography>
                <span className="md:w-4">:</span>
                <Typography className="flex-1 ">
                  {item?.node?.consumerNumber}
                </Typography>
              </div>
              <div className="flex ">
                <Typography className="flex-1">Consumer Name</Typography>
                <span className=" md:w-4">:</span>
                <Typography className="flex-1">
                  {item?.node?.consumerName?.toUpperCase()}
                </Typography>
              </div>

              <div className="flex ">
                <Typography className="flex-1">
                  To be Received Amount
                </Typography>
                <span className="md:w-4 ">:</span>
                <Typography className="flex-1 ">
                  {convertToInrSymbol(item?.node?.amount)}
                </Typography>
              </div>
              <div className="flex ">
                <Typography className="flex-1">Paid Amount</Typography>
                <span className="md:w-4 ">:</span>
                <Typography className="flex-1 ">
                  {convertToInrSymbol(item?.node?.paidAmount)}
                </Typography>
              </div>
              <div className="flex ">
                <Typography className="flex-1">Status</Typography>
                <span className="md:w-4 ">:</span>
                <Typography
                  className={cn('flex-1', STATUSCLASS[item?.node?.statusCode])}
                >
                  {STATUSLINE[item?.node?.statusCode]}
                </Typography>
              </div>
              <div className="flex ">
                <Typography className="flex-1">Help Received Time</Typography>
                <span className="md:w-4">:</span>
                <Typography className="flex-1 ">
                  {localDateConvertion(item?.node?.updatedAt, true)}
                </Typography>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HelpedConsumer;
