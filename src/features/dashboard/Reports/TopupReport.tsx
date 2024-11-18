'use client';
import NoData from '@/components/NoData';
import PageLoading from '@/components/PageLoading';
import Typography from '@/components/Typography';
import { GET_TOP_UP_HISTORY } from '@/graphql/query/all-history.query';
import withConsumer from '@/helper/withConsumer';
import { cn, convertToInrSymbol, localDateConvertion } from '@/lib/utils';
import { useLazyQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { GrFormPrevious } from 'react-icons/gr';
import { MdNavigateNext } from 'react-icons/md';

const STATUSLIST: { [key: number]: string } = {
  0: 'WAITING',
  2: 'PROCESSING',
  6: 'FAILED',
  3: 'SUCCESS',
  7: 'CANCELLED',
};

const COLOR_CHANGE_STATUS: { [key: number]: string } = {
  0: 'text-[#fb923c] ',
  4: 'text-[#fb923c]',
  5: 'text-[#fb923c]',
  2: 'text-[#fb923c]',
  6: 'text-[#dc2626]',
  3: 'text-[#16a34a]',
  7: 'text-[#dc2626]',
};

type TopUpHistoryEntry = {
  id: string;
  amount: string;
  serviceCharge: string;
  status: number;
  txnId: string;
  upiTxnId: string;
  transactionName: string;
  transactionType: number;
  approvedBy: string | null;
  approvedAt: string | null;
  createdAt: string;
  updatedAt: string;
};

type Edge = {
  node: TopUpHistoryEntry;
};

type PageInfo = {
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  startCursor: string;
  endCursor: string;
};

type GetTopUpHistoryResponse = {
  getTopUpHistory: {
    pageInfo: PageInfo;
    edges: Edge[];
  };
};

type TopUpHistoryVariables = {
  first?: number;
  last?: number;
  after?: string;
  before?: string;
};
const TopupReport = () => {
  const [mutateTopUp, { data, loading }] = useLazyQuery<
    GetTopUpHistoryResponse,
    TopUpHistoryVariables
  >(GET_TOP_UP_HISTORY, {
    fetchPolicy: 'network-only',
  });
  const [nextPageVisible, setNextPageVisible] = useState<boolean>(false);
  const [PrevPageVisible, setPrevPageVisible] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    mutateTopUp({
      variables: {
        first: 5,
      },
    });
    setIsLoading(false);
  }, [mutateTopUp]);

  const prevPage = (value: string) => {
    mutateTopUp({
      variables: {
        last: 5,
        before: value,
        after: '',
      },
      onCompleted() {
        setNextPageVisible(true);
        setPrevPageVisible(false);
      },
    });
  };

  const nextPage = (value: string) => {
    mutateTopUp({
      variables: {
        first: 5,
        after: value,
        before: '',
      },
      onCompleted() {
        setPrevPageVisible(true);
        setNextPageVisible(false);
      },
    });
  };

  const TopUpHistory = data?.getTopUpHistory;

  if (isLoading || loading) return <PageLoading />;
  if (TopUpHistory?.edges?.length === 0 || !TopUpHistory?.edges) {
    return <NoData />;
  }
  return (
    <>
      <div className="mx-auto max-w-2xl">
        {TopUpHistory?.edges?.map((item, index: React.Key) => {
          return (
            <div
              className="mb-6 flex flex-col gap-2 font-normal text-white"
              key={index}
            >
              <div className="flex items-center justify-between">
                <Typography className="w-full" as="p">
                  Transaction ID
                </Typography>
                <Typography className="w-full text-right" as="p">
                  {item?.node?.txnId}
                </Typography>
              </div>
              {!!item?.node?.upiTxnId && (
                <div className="flex items-center justify-between">
                  <Typography className="w-full" as="p">
                    UPI Transaction ID
                  </Typography>
                  <Typography className="w-full text-right" as="p">
                    {item?.node?.upiTxnId}
                  </Typography>
                </div>
              )}
              <div className="flex items-center justify-between">
                <Typography className="w-full" as="p">
                  Date and Time
                </Typography>
                <Typography className="w-full text-right" as="p">
                  {localDateConvertion(item?.node?.updatedAt, true)}
                </Typography>
              </div>
              <div className="flex items-center justify-between">
                <Typography className="w-full" as="p">
                  Top Up Type
                </Typography>
                <Typography className="w-full text-right" as="p">
                  {item?.node?.transactionName}
                </Typography>
              </div>
              <div className="flex items-center justify-between">
                <Typography className="w-full" as="p">
                  Payment Mode
                </Typography>
                <Typography className="w-full text-right" as="p">
                  UPI
                </Typography>
              </div>
              <div className="flex items-center justify-between">
                <Typography className="w-full" as="p">
                  Status
                </Typography>
                <Typography
                  className={cn(
                    'w-full text-right',
                    COLOR_CHANGE_STATUS[item?.node?.status],
                  )}
                  as="p"
                >
                  {STATUSLIST[item?.node?.status]}
                </Typography>
              </div>
              <div className="flex items-center justify-between">
                <Typography className="w-full" as="p">
                  Top-Up Amount
                </Typography>
                <Typography className="w-full text-right" as="p">
                  {convertToInrSymbol(item?.node?.amount)}
                </Typography>
              </div>

              <div className="h-[2px] w-full bg-tertiary"></div>
            </div>
          );
        })}
        <div className="flex h-full w-full items-end justify-end gap-2">
          <button
            onClick={() => prevPage(TopUpHistory.pageInfo?.startCursor)}
            disabled={
              !PrevPageVisible &&
              !data?.getTopUpHistory?.pageInfo?.hasPreviousPage
            }
            className="h-7 w-7  rounded-md bg-white text-[30px] font-bold text-primary disabled:bg-gray-500"
          >
            <GrFormPrevious />
          </button>
          <button
            onClick={() => nextPage(TopUpHistory?.pageInfo?.endCursor)}
            disabled={
              !nextPageVisible && !data?.getTopUpHistory?.pageInfo?.hasNextPage
            }
            className="h-7 w-7 rounded-md bg-white text-[30px] font-bold text-primary disabled:bg-gray-500"
          >
            <MdNavigateNext />
          </button>
        </div>
      </div>
    </>
  );
};

export default withConsumer(TopupReport);
