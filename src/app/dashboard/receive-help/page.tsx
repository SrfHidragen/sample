'use client';

import React, { useEffect, useMemo } from 'react';
import { useQuery } from '@apollo/client';
import { notFound, useRouter } from 'next/navigation';
import ReceiveHelp from '@/features/dashboard/receive-help/ReceiveHelp';
import ReceiveHelpHistory from '@/features/dashboard/receive-help/ReceiveHelpHistory';
import { GET_RECEIVE_HELP_DATA } from '@/graphql/query/dashboard.query';
import NoData from '@/components/NoData';
import { useAuthStore } from '@/store/auth.store';
import PageLoading from '@/components/PageLoading';

export default function Page() {
  const USET_TYPE = useAuthStore((state) => state?.user)?.userDetails?.userType;
  const router = useRouter();

  useEffect(() => {
    if (USET_TYPE !== 'consumer') {
      notFound();
    }
  }, [USET_TYPE]);

  type Stage = {
    stage: string;
    associatedConsumers: string;
    helpedConsumers: string;
    partiallyPaidConsumers: string;
    notInvitedMembers: string;
    totalConumers: string;
    amount: string | number;
  };

  type ReceiveHelpData = {
    totalConsumers: string;
    associatesConsumers: string;
    helpedConsumers: string;
    partiallyPaidConsumers: string;
    notInvitedCount: string;
    stages: Stage[];
  };

  const { data, loading } = useQuery<{
    receiveHelpList: ReceiveHelpData;
  }>(GET_RECEIVE_HELP_DATA);

  const receiveHelpData = useMemo(() => {
    return data?.receiveHelpList;
  }, [data]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <PageLoading />
      </div>
    );
  }

  // if (error) {
  //   return (
  //     <div className="flex h-screen items-center justify-center">
  //       Error loading data
  //     </div>
  //   );
  // }

  if (!receiveHelpData) {
    return <NoData Error="No Data" className="text-white" />;
  }

  const handleStageSelect = (stage: string) => {
    router.push(`/dashboard/receive-help/consumer-table?stage=${stage}`);
  };

  return (
    <div>
      <ReceiveHelp
        totalConsumers={receiveHelpData.totalConsumers}
        associatesConsumers={receiveHelpData.associatesConsumers}
        helpedConsumers={receiveHelpData.helpedConsumers}
        partiallyPaidConsumers={receiveHelpData.partiallyPaidConsumers}
        notInvitedCount={receiveHelpData.notInvitedCount}
      />
      <ReceiveHelpHistory
        stages={receiveHelpData.stages}
        onStageSelect={handleStageSelect}
      />
    </div>
  );
}
