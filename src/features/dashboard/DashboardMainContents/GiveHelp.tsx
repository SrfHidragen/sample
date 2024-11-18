'use client';
import Typography from '@/components/Typography';
import Link from 'next/link';
import React from 'react';
import NoData from '@/components/NoData';
import DashboardTable from '@/components/dashboard/DashboardTable';
import { GiveHelpHistoryEdgeType } from '@/types/history-type/give.help.history.type';

const GiveHelpHistory = ({
  GiveHelpHistoryData,
}: {
  GiveHelpHistoryData: GiveHelpHistoryEdgeType[] | undefined;
}) => {
  const GiveHelpHistoryList =
    GiveHelpHistoryData?.map((item) => item?.node) || [];

  return (
    <div className="flex w-full flex-col gap-8 rounded-xl bg-secondary p-4 text-white transition-all duration-300">
      <>
        <div className="flex justify-between gap-4">
          <Typography as="h6" className="text-xl font-bold">
            My Give Helps
          </Typography>
          {GiveHelpHistoryList?.length > 0 && (
            <Link href={'/dashboard/all-transactions/give-help-history'}>
              <Typography
                as="span"
                className="border-b-2 border-tertiary pb-1 font-normal"
              >
                View All
              </Typography>
            </Link>
          )}
        </div>
        {GiveHelpHistoryList?.length === 0 && <NoData />}
        {GiveHelpHistoryList?.length > 0 && (
          <DashboardTable
            CurrentData={GiveHelpHistoryList || []}
            name="Give Help"
            dateField="givehelp"
            amountType="paid"
          />
        )}
      </>
    </div>
  );
};

export default GiveHelpHistory;
