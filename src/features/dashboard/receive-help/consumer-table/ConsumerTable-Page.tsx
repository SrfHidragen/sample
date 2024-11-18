/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React from 'react';
import { useSearchParams } from 'next/navigation';
import { useQuery } from '@apollo/client';
import { GET_RECEIVE_HELP_TABLE_DETAILS } from '@/graphql/query/dashboard.query';
import PageLoading from '@/components/PageLoading';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import DataTable from '@/components/DataTable';

interface ConsumerType {
  memberId: string;
  memberName: string;
  status: string;
}

interface ConsumerType {
  memberId: string;
  memberName: string;
  status: string;
}

const ConsumerTablePage: React.FC = () => {
  const searchParams = useSearchParams();
  const stage = searchParams.get('stage');

  const { data, loading } = useQuery(GET_RECEIVE_HELP_TABLE_DETAILS, {
    variables: { rowNumber: parseInt(stage || '0', 10) },
  });

  const columnHelper = createColumnHelper<ConsumerType>();
  const columns: ColumnDef<ConsumerType, any>[] = [
    columnHelper.accessor('memberId', {
      header: 'Consumer No',
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('memberName', {
      header: 'Consumer Name',
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('status', {
      header: 'Status',
      cell: (info) => info.getValue(),
    }),
  ];

  const ConsumerData: ConsumerType[] =
    data?.receiveHelpDetailList?.consumer || [];

  if (loading) return <PageLoading />;

  return (
    <div>
      <DataTable columns={columns} data={ConsumerData} />
    </div>
  );
};

export default ConsumerTablePage;
