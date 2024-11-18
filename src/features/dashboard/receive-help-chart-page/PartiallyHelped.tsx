'use client';
import NoData from '@/components/NoData';
import PageLoading from '@/components/PageLoading';
import Typography from '@/components/Typography';
import { PARTIALLY_HELPED_AMOUNT } from '@/graphql/query/receive.help.chart';
import { convertToInrSymbol, localDateConvertion } from '@/lib/utils';
import { ConsumerEdgeType } from '@/types/partial.helped.type';
import { useQuery } from '@apollo/client';
import { useSearchParams } from 'next/navigation';
import React from 'react';

function PartiallyHelped() {
  const searchParams = useSearchParams();
  const stage = searchParams.get('stage');

  const { data, loading } = useQuery(PARTIALLY_HELPED_AMOUNT, {
    variables: {
      rowNumber: Number(stage),
    },
  });

  const PartialData: ConsumerEdgeType[] =
    data?.partiallyHelpedConsumersOnReceiversByStage?.edges;

  if (loading) return <PageLoading />;
  if (!PartialData || PartialData?.length === 0) return <NoData />;
  return (
    <div className="container">
      <div>
        <Typography className="text-white">Stage {stage}</Typography>
      </div>
      <div className="h-3"></div>
      <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
        {PartialData?.map((item, index: number) => (
          <div
            className="rounded-sm bg-[#003186] p-4 hover:shadow-lg"
            key={index}
          >
            <div className="flex flex-col gap-2 text-white">
              <div className="flex">
                <Typography className="flex-1 ">Consumer Number</Typography>
                <span className="md:w-4">:</span>
                <Typography className="flex-1 ">
                  {item?.node?.consumerNumber}
                </Typography>
              </div>
              <div className="flex ">
                <Typography className="flex-1">Consumer Name</Typography>
                <span className=" md:w-4">:</span>
                <Typography className="flex-1">
                  {item?.node?.consumerName}
                </Typography>
              </div>
              <div className="flex ">
                <Typography className="flex-1">Total Amount</Typography>
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
                <Typography className="flex-1 ">
                  {item?.node?.paymentStatus}
                </Typography>
              </div>
              <div className="flex ">
                <Typography className="flex-1">Helped Received Time</Typography>
                <span className="md:w-4">:</span>
                <Typography className="flex-1 ">
                  {localDateConvertion(item?.node?.updatedAt)}
                </Typography>
              </div>
            </div>
            <div className="h-3"></div>
            <hr className="h-px border-0 bg-[#FFCC01]" />
            <div className="h-3"></div>
            <Typography className="text-[20px] font-medium text-[#FFCC01]">
              Received Help History
            </Typography>
            <div className="h-3"></div>
            {item?.node?.partialPayments?.edges?.map((partial, index) => (
              <div key={index}>
                <div className="flex flex-col gap-2 text-white">
                  <div className="flex">
                    <Typography className="flex-1">
                      Received Help Amount
                    </Typography>
                    <span className="md:w-4">:</span>
                    <Typography className="flex-1">
                      {partial?.node?.amount}
                    </Typography>
                  </div>
                  <div className="flex">
                    <Typography className="flex-1">Date</Typography>
                    <span className="md:w-4">:</span>
                    <Typography className="flex-1">
                      {localDateConvertion(partial?.node?.approvedAt)}
                    </Typography>
                  </div>
                </div>

                {/* Only show the divs and hr if this is not the last item */}
                {index < item.node.partialPayments.edges.length - 1 && (
                  <>
                    <div className="h-3"></div>
                    <hr className="h-px border-0 bg-[#FFCC01]" />
                    <div className="h-3"></div>
                  </>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default PartiallyHelped;
