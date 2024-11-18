/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import DataTable from '@/components/DataTable';
import NoData from '@/components/NoData';
import PageLoading from '@/components/PageLoading';
import Typography from '@/components/Typography';
import { NON_ASSOCIATED_INVITERS } from '@/graphql/query/receive.help.chart';
import {
  cn,
  findTotalPreviousDayCount,
  localDateConvertion,
} from '@/lib/utils';
import { useQuery } from '@apollo/client';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import { useSearchParams } from 'next/navigation';
import React from 'react';

type NonAssociatedConsumerNodeType = {
  firstName: string;
  createdAt: number;
  id: string;
  stage: number;
  username: string;
};

type NonAssociatedConsumerEdgeType = {
  node: NonAssociatedConsumerNodeType;
};
function AssociateNonInviters() {
  const searchParams = useSearchParams();
  const stage = searchParams.get('stage');
  const { data, loading } = useQuery(NON_ASSOCIATED_INVITERS, {
    variables: {
      rowNumber: Number(stage),
    },
  });
  const columnHelper = createColumnHelper<NonAssociatedConsumerNodeType>();
  const columns: ColumnDef<NonAssociatedConsumerNodeType, any>[] = [
    columnHelper.accessor('username', {
      header: 'Consumership Number',
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('firstName', {
      header: 'Consumer Name',
      cell: (info) => info.getValue().toUpperCase(),
    }),
    columnHelper.accessor('createdAt', {
      header: 'Registration Date',
      cell: (info) => (
        <span
          className={cn(
            'text-xl font-semibold',
            findTotalPreviousDayCount(info.getValue(), true) >= 7
              ? 'text-red-600'
              : 'text-yellow-500',
          )}
        >
          {localDateConvertion(info.getValue(), true)}
        </span>
      ),
      // cell: (info) => localDateConvertion(info.getValue(), true),
    }),
  ];

  const NonAssociateInviters: NonAssociatedConsumerNodeType[] =
    data?.nonAssociatedConsumersList?.edges?.map(
      (item: NonAssociatedConsumerEdgeType) => item?.node,
    );
  if (loading) return <PageLoading />;

  if (!NonAssociateInviters || NonAssociateInviters?.length === 0) {
    return <NoData />;
  }

  return (
    <div className="container">
      <Typography className="text-xl font-semibold text-white">
        Stage - {stage}
      </Typography>
      <div className="h-5"></div>
      <DataTable data={NonAssociateInviters || []} columns={columns} />
    </div>
  );
}

export default AssociateNonInviters;
