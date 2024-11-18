/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import DashboardTable from '@/components/dashboard/DashboardTable';
import NoData from '@/components/NoData';
import Typography from '@/components/Typography';
import { PartialPaymentTypeEdge } from '@/types/history-type/recent.receive.help.type';
import Link from 'next/link';
import React from 'react';

const ReceiveHelpHistory = ({
  ReceiveHelpHistoryData,
}: {
  ReceiveHelpHistoryData: PartialPaymentTypeEdge[] | undefined;
}) => {
  const ReceiveHelpHistoryList =
    ReceiveHelpHistoryData?.map((item) => item?.node) || [];
  return (
    <div className="flex w-full flex-col gap-8 rounded-xl bg-secondary p-4 text-white transition-all duration-300">
      <>
        <div className="flex justify-between gap-4">
          <Typography as="h6" className="text-xl font-bold">
            Recent Receive Helps
          </Typography>
          {ReceiveHelpHistoryList?.length !== 0 && (
            <Link href={'/dashboard/all-transactions/receive-help-history'}>
              <Typography
                as="span"
                className="border-b-2 border-tertiary pb-1 font-normal"
              >
                View All
              </Typography>
            </Link>
          )}
        </div>

        {ReceiveHelpHistoryList?.length === 0 && <NoData />}
        {ReceiveHelpHistoryList?.length > 0 && (
          <DashboardTable
            CurrentData={ReceiveHelpHistoryList}
            name=" Receive Help"
            dateField="updatedAt"
            className="text-green-500"
          />
        )}
      </>
    </div>
  );
};

export default ReceiveHelpHistory;
