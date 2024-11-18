/* eslint-disable @typescript-eslint/no-explicit-any */
import NoData from '@/components/NoData';
import Typography from '@/components/Typography';
import Link from 'next/link';
import React from 'react';
import DashboardTable from '@/components/dashboard/DashboardTable';
import { withdrawHistoryEdge } from '../Reports/WithdrawalReport';

const WithdrawalHistory = ({
  withdrawalHistoryData,
}: {
  withdrawalHistoryData: withdrawHistoryEdge[] | undefined;
}) => {
  const withdrawalHistoryList =
    withdrawalHistoryData?.map((item) => item?.node) || [];
  return (
    <div className="flex w-full flex-col gap-8 rounded-xl bg-secondary p-4 text-white transition-all duration-300">
      <div className="flex justify-between gap-4">
        <Typography as="h6" className="text-xl font-bold">
          My Withdrawals
        </Typography>
        {withdrawalHistoryList?.length > 0 && (
          <Link href={'/dashboard/all-transactions/withdrawal-history'}>
            <Typography
              as="span"
              className="border-b-2 border-tertiary pb-1 font-normal"
            >
              View All
            </Typography>
          </Link>
        )}
      </div>
      {withdrawalHistoryList?.length === 0 && <NoData />}
      {withdrawalHistoryList?.length > 0 && (
        <DashboardTable
          CurrentData={withdrawalHistoryList}
          name="Withdrawal"
          dateField="withdrawal"
          className="text-yellow-500"
        />
      )}
      {/* {withdrawalHistoryList?.length > 0 && (
        <>
          {withdrawalHistoryList &&
            withdrawalHistoryList?.map((item: any, index: number) => (
              <div
                key={index}
                className="flex items-start justify-between gap-4"
              >
                <div>
                  <Typography as="h6" className="text-lg font-normal">
                    Give Help
                  </Typography>
                  <Typography as="p" className="font-light">
                    {item?.createdAt}
                  </Typography>
                </div>
                <div>
                  <Typography className="text-xl font-bold text-tertiary">
                    {item?.amount}
                  </Typography>
                </div>
              </div>
            ))}
        </>
      )} */}
    </div>
  );
};

export default WithdrawalHistory;
