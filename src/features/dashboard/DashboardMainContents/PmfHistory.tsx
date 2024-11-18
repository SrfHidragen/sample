/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import NoData from '@/components/NoData';
import Typography from '@/components/Typography';
import Link from 'next/link';
import React from 'react';
import DashboardTable from '@/components/dashboard/DashboardTable';
import { PmfEdge } from '@/types/history-type/pmfhistory.type';
const PmfHistory = ({
  pmfHistoryData,
}: {
  pmfHistoryData: PmfEdge[] | undefined;
}) => {
  const pmflist = pmfHistoryData?.map((item) => item?.node) || [];

  return (
    <>
      <div className="flex w-full flex-col gap-8 rounded-xl bg-secondary p-4 text-white transition-all duration-300">
        <div className="flex justify-between gap-4">
          <Typography as="h6" className="text-xl font-bold">
            PMF Payments
          </Typography>
          {pmflist?.length != 0 && (
            <Link href={'/dashboard/all-transactions/pmf-history'}>
              <Typography
                as="span"
                className="border-b-2 border-tertiary pb-1 font-normal"
              >
                View All
              </Typography>
            </Link>
          )}
        </div>

        {pmflist?.length == 0 && <NoData />}
        {pmflist && pmflist?.length > 0 && (
          <>
            <DashboardTable
              CurrentData={pmflist || []}
              name="PMF Payment"
              dateField="pmf"
            />
          </>
        )}
      </div>
    </>
  );
};

export default PmfHistory;
