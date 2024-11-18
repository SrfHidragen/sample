'use client';
import NoData from '@/components/NoData';
import PageLoading from '@/components/PageLoading';
import Typography from '@/components/Typography';
import { WITHDRAWAL_HISTORY } from '@/graphql/query/all-history.query';
import withConsumer from '@/helper/withConsumer';
import { cn, convertToInrSymbol, localDateConvertion } from '@/lib/utils';
import { useLazyQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { GrFormPrevious } from 'react-icons/gr';
import { MdNavigateNext } from 'react-icons/md';

type WithdrawalHistoryEntry = {
  name: string;
  amount: string;
  status: number;
  transactionName: string;
  updatedAt: string | number;
  createdAt: string | number;
};

export type withdrawHistoryEdge = {
  node: WithdrawalHistoryEntry;
};

type PageInfo = {
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  startCursor: string;
  endCursor: string;
};

export type GetWithdrawalHistoryResponse = {
  getWithdrawalHistory: {
    pageInfo: PageInfo;
    edges: withdrawHistoryEdge[];
  };
};

type WithdrawalHistoryVariables = {
  first?: number;
  last?: number;
  after?: string;
  before?: string;
};

const STATUSLIST: { [key: number]: string } = {
  0: 'WAITING',
  4: 'REQUESTED',
  5: 'AUTOMATED',
  2: 'PROCESSING',
  6: 'FAILED',
  3: 'SUCCESS',
};

const COLOR_CHANGE_STATUS: { [key: number]: string } = {
  0: 'text-[#fb923c] ',
  4: 'text-[#fb923c]',
  5: 'text-[#fb923c]',
  2: 'text-[#fb923c]',
  6: 'text-[#dc2626]',
  3: 'text-[#16a34a]',
};
const WithdrawalReport = () => {
  const [nextPageVisible, setNextPageVisible] = useState<boolean>(false);
  const [PrevPageVisible, setPrevPageVisible] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [mutateWithdrawalHistory, { data, loading }] = useLazyQuery<
    GetWithdrawalHistoryResponse,
    WithdrawalHistoryVariables
  >(WITHDRAWAL_HISTORY);

  useEffect(() => {
    mutateWithdrawalHistory({
      variables: {
        first: 5,
      },
    });
    setIsLoading(false);
  }, [mutateWithdrawalHistory]);

  const prevPage = (value: string) => {
    mutateWithdrawalHistory({
      variables: {
        last: 5,
        before: value,
      },
      onCompleted() {
        setNextPageVisible(true);
        setPrevPageVisible(false);
      },
    });
  };

  const nextPage = (value: string) => {
    mutateWithdrawalHistory({
      variables: {
        first: 5,
        after: value,
      },
      onCompleted() {
        setPrevPageVisible(true);
        setNextPageVisible(false);
      },
    });
  };

  if (loading || isLoading) return <PageLoading />;
  return (
    <div className="mx-auto max-w-2xl ">
      {data && data?.getWithdrawalHistory.edges.length > 0 ? (
        <>
          {data?.getWithdrawalHistory?.edges?.map((item, index: number) => (
            <div
              key={index}
              className="mb-6 flex flex-col gap-2 font-normal text-white"
            >
              <div className="flex items-center justify-between">
                <Typography className="w-full" as="p">
                  Name
                </Typography>
                <Typography className="w-full text-right" as="p">
                  {item?.node?.name}
                </Typography>
              </div>
              <div className="flex items-center justify-between">
                <Typography className="w-full" as="p">
                  Withdrawal Amount
                </Typography>
                <Typography className="w-full text-right" as="p">
                  {convertToInrSymbol(item?.node?.amount)}
                </Typography>
              </div>

              <div className="flex items-center justify-between">
                <Typography className="w-full" as="p">
                  Transaction Name
                </Typography>
                <Typography className="w-full text-right" as="p">
                  {item?.node?.transactionName}
                </Typography>
              </div>
              <div className="flex items-center justify-between">
                <Typography className="w-full" as="p">
                  Status
                </Typography>
                <Typography
                  className={cn(
                    'w-full text-right font-semibold',
                    COLOR_CHANGE_STATUS[item?.node?.status],
                  )}
                  as="p"
                >
                  {STATUSLIST[item.node?.status]}
                </Typography>
              </div>
              <div className="flex items-center justify-between">
                <Typography className="w-full" as="p">
                  Date
                </Typography>
                <Typography className="w-full text-right" as="p">
                  {item?.node?.updatedAt
                    ? localDateConvertion(item?.node?.updatedAt, true)
                    : localDateConvertion(item?.node?.createdAt, true)}
                </Typography>
              </div>
              <div className="flex items-center justify-between">
                {/* <Button
          className="h-fit w-fit border-none bg-none px-0 text-base tracking-wide text-tertiary hover:bg-transparent hover:text-tertiary"
          variant={'outline'}
        >
          Download Invoice
        </Button> */}
              </div>
              <div className="h-[2px] w-full bg-tertiary"></div>
            </div>
          ))}
          <div className="flex h-full w-full items-end justify-end gap-2">
            <button
              onClick={() =>
                prevPage(data?.getWithdrawalHistory?.pageInfo?.startCursor)
              }
              disabled={
                !PrevPageVisible &&
                !data?.getWithdrawalHistory?.pageInfo?.hasPreviousPage
              }
              className="h-7 w-7  rounded-md bg-white text-[30px] font-bold text-primary disabled:bg-gray-500"
            >
              <GrFormPrevious />
            </button>
            <button
              onClick={() =>
                nextPage(data?.getWithdrawalHistory?.pageInfo?.endCursor)
              }
              disabled={
                !nextPageVisible &&
                !data?.getWithdrawalHistory?.pageInfo?.hasNextPage
              }
              className="h-7 w-7 rounded-md bg-white text-[30px] font-bold text-primary disabled:bg-gray-500"
            >
              <MdNavigateNext />
            </button>
          </div>
        </>
      ) : (
        <NoData Error="No History Found" className="text-white" />
      )}
    </div>
  );
};

export default withConsumer(WithdrawalReport);
