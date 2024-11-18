'use client';
import Typography from '@/components/Typography';
import React from 'react';
// import { CiShare2 } from 'react-icons/ci';
import ReceiveHelpListCard from './ReceiveHelpListCard';
import { useQuery } from '@apollo/client';
import { RECEIVE_HELP_CHART } from '@/graphql/query/receive.help.chart';
import PageLoading from '@/components/PageLoading';
import { ReceiveHelpList } from '@/types/receive.help.type';
import { useAuthStore } from '@/store/auth.store';
import { capitalizeFirstLetter } from '@/lib/utils';
import withConsumer from '@/helper/withConsumer';

function ReceiveHelpChart() {
  const userDetails = useAuthStore((state) => state?.user)?.userDetails;
  const { data, loading } = useQuery(RECEIVE_HELP_CHART, {
    fetchPolicy: 'network-only',
  });

  const ReceiveHelpData: ReceiveHelpList = data?.receiveHelpListCount;
  if (loading) return <PageLoading />;
  return (
    <>
      <div className="mx-auto max-w-4xl">
        <div className="overflow-hidden bg-[#03147C] p-4 md:p-8">
          <div className="flex justify-between">
            <Typography className="text-[20px] font-semibold text-white">
              Receive Help Chart
            </Typography>
            <div className="flex cursor-pointer items-center gap-3 text-[#FFCC01]">
              {/* <Typography className="hidden text-[14px] md:block">
                Share your status
              </Typography>
              <CiShare2 size={20} className="font-normal" /> */}
            </div>
          </div>
          <div className="h-8"></div>
          <div className="flex flex-col justify-between gap-10 text-white md:flex-row md:gap-24">
            <div className="flex w-full flex-1 flex-col gap-3 md:w-1/2">
              <div className="flex w-full justify-between">
                <Typography className="flex-1">Consumership No</Typography>
                <span className="shrink-0">:</span>
                <Typography className="flex-1 text-right">
                  {userDetails?.username}
                </Typography>
              </div>
              <div className="flex w-full justify-between">
                <Typography className="flex-1">Consumer Name</Typography>
                <span className="shrink-0">:</span>
                <Typography className="flex-1 text-right">
                  {capitalizeFirstLetter(
                    userDetails?.personal?.firstName || '',
                  )}
                </Typography>
              </div>
              {/* <div className="flex w-full justify-between">
                <Typography className="flex-1">Current Designation</Typography>
                <span className="shrink-0">:</span>
                <Typography className="flex-1 text-right">
                  giveNTake Volunteer
                </Typography>
              </div> */}

              <div className="flex w-full justify-between">
                <Typography className="flex-1">
                  Total Receive Help Amount
                </Typography>
                <span className="shrink-0">:</span>
                <Typography className="flex-1 text-right">
                  ₹{userDetails?.totalReceived}
                </Typography>
              </div>
            </div>
            <div className="flex w-full flex-1 flex-col gap-3 md:w-1/2">
              <div className="flex w-full justify-between">
                <Typography className="flex-1 text-[#FFCC01]">
                  Associated Consumer
                </Typography>
                <span className="w-3 shrink-0 text-white md:w-10">:</span>
                <div className="flex flex-1 justify-end md:justify-start">
                  <Typography className="mr-2 text-[#FFCC01]">
                    {ReceiveHelpData?.associatesConsumers}
                  </Typography>
                  / <Typography className="ml-2">2046</Typography>
                </div>
              </div>
              <div className="flex w-full justify-between text-[#2CAB00]">
                <Typography className="flex-1">Helped Consumer</Typography>
                <span className="w-3 shrink-0 text-white md:w-10">:</span>
                <Typography className="flex-1 text-right md:text-left ">
                  {ReceiveHelpData?.helpedConsumers}
                </Typography>
              </div>
              <div className="flex w-full justify-between text-[#44C7F4]">
                <Typography className="flex-1">Partially Helped</Typography>
                <span className="w-3 shrink-0 text-white md:w-10">:</span>
                <Typography className="flex-1 text-right md:text-left ">
                  {ReceiveHelpData?.partiallyPaidConsumers}
                </Typography>
              </div>
              <div className="flex w-full justify-between text-[#FF4F4F]">
                <Typography className="flex-1">
                  Associate Non-Inviters
                </Typography>
                <span className="w-3 shrink-0 text-white md:w-10">:</span>
                <Typography className="flex-1 text-right md:text-left ">
                  {ReceiveHelpData?.notInvitedCount}
                </Typography>
              </div>
            </div>
          </div>
        </div>
        <div className="h-6"></div>
        <ReceiveHelpListCard StageData={ReceiveHelpData?.stages || []} />
      </div>
    </>
  );
}

export default withConsumer(ReceiveHelpChart);
