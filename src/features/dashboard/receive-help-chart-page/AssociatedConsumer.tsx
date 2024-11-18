/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import DataTable from '@/components/DataTable';
import PageLoading from '@/components/PageLoading';
import Typography from '@/components/Typography';
import { ASSOCIATED_CONSUMER } from '@/graphql/query/receive.help.chart';
import { localDateConvertion } from '@/lib/utils';
import { useQuery } from '@apollo/client';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';

import { useSearchParams } from 'next/navigation';
import React from 'react';

interface AssociatedConsumerType {
  memberId: string;
  memberName: string;
  status: string;
  designation: string;
  receiveAmount: string;
  receivedTime: number;
  associatedDate: string;
  toBeReceivedAmount: number;
}

function AssociatedConsumer() {
  const searchParams = useSearchParams();
  const stage = searchParams.get('stage');
  const { data, loading } = useQuery(ASSOCIATED_CONSUMER, {
    variables: { rowNumber: Number(stage) },
  });

  const columnHelper = createColumnHelper<AssociatedConsumerType>();
  const columns: ColumnDef<AssociatedConsumerType, any>[] = [
    columnHelper.accessor('memberId', {
      header: 'Consumership Number',
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('memberName', {
      header: 'Consumer Name',
      cell: (info) => info.getValue().toUpperCase(),
    }),
    columnHelper.accessor('associatedDate', {
      header: 'Associated Date',
      cell: (info) => localDateConvertion(info.getValue(), true),
    }),
  ];
  const RowData = data?.associatedReceiversConsumersList?.consumer;
  if (loading) return <PageLoading />;

  return (
    <div className="container">
      <Typography as="h3" className="text-white">
        Stage : {stage}
      </Typography>
      <div className="h-6"></div>
      <DataTable columns={columns} data={RowData || []} />
    </div>
  );
}

export default AssociatedConsumer;
