// import { Button } from '@/components/Button';
'use client';
import Typography from '@/components/Typography';
import { useLazyQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import NoData from '@/components/NoData';
import { GrFormPrevious } from 'react-icons/gr';
import { MdNavigateNext } from 'react-icons/md';
import PageLoading from '@/components/PageLoading';
import { RECENT_RECEIVE_HELP_LIST } from '@/graphql/query/all-history.query';
import { localDateConvertion } from '@/lib/utils';
import withConsumer from '@/helper/withConsumer';
import { RecentReceiveHelpHistory } from '@/types/history-type/recent.receive.help.type';

const RecentReceiveHelpReport = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [nextPageVisible, setNextPageVisible] = useState<boolean>(false);
  const [prevPageVisible, setPrevPageVisible] = useState<boolean>(false);
  const [fetchReceiveHelp, { data, loading }] =
    useLazyQuery<RecentReceiveHelpHistory>(RECENT_RECEIVE_HELP_LIST, {
      fetchPolicy: 'network-only',
    });

  useEffect(() => {
    fetchReceiveHelp({
      variables: {
        first: 5,
      },
    });
    setIsLoading(false);
  }, [fetchReceiveHelp]);

  const prevPage = (value: string | undefined) => {
    fetchReceiveHelp({
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
  const nextPage = (value: string | undefined) => {
    fetchReceiveHelp({
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

  const ReceiveHelpHistory = data?.recentReceiveHelpHistory;
  if (loading || isLoading) return <PageLoading />;

  if (!ReceiveHelpHistory?.edges || ReceiveHelpHistory?.edges?.length === 0) {
    return <NoData />;
  }

  return (
    <>
      <div className="mx-auto max-w-2xl">
        {ReceiveHelpHistory?.edges?.map(
          (receiveHelp, index: React.Key | null | undefined) => (
            <div
              key={index}
              className="mb-6 flex flex-col gap-2 font-normal text-white"
            >
              <div className="flex items-center justify-between">
                <Typography className="w-full" as="p">
                  Consumer Name
                </Typography>
                <Typography className="w-full text-right" as="p">
                  {receiveHelp?.node?.name}
                </Typography>
              </div>
              <div className="flex items-center justify-between">
                <Typography className="w-full" as="p">
                  Consumer Number
                </Typography>
                <Typography className="w-full text-right" as="p">
                  {receiveHelp?.node?.username}
                </Typography>
              </div>
              <div className="flex items-center justify-between">
                <Typography className="w-full" as="p">
                  Amount
                </Typography>
                <Typography className="w-full text-right" as="p">
                  {receiveHelp?.node?.amount}
                </Typography>
              </div>
              <div className="flex items-center justify-between">
                <Typography className="w-full" as="p">
                  Status
                </Typography>
                <Typography className="w-full text-right" as="p">
                  {receiveHelp?.node?.status === 3 ? 'Success' : 'Failed'}
                </Typography>
              </div>
              <div className="flex items-center justify-between">
                <Typography className="w-full" as="p">
                  Date
                </Typography>
                <Typography className="w-full text-right" as="p">
                  {localDateConvertion(receiveHelp?.node?.updatedAt, true)}
                </Typography>
              </div>

              <div className="h-[2px] w-full bg-tertiary"></div>
            </div>
          ),
        )}
        <div className="flex h-full w-full items-end justify-end gap-2">
          <button
            onClick={() =>
              prevPage(data?.recentReceiveHelpHistory.pageInfo.startCursor)
            }
            disabled={
              !prevPageVisible &&
              !data?.recentReceiveHelpHistory?.pageInfo.hasPreviousPage
            }
            className="h-7 w-7  rounded-md bg-white text-[30px] font-bold text-primary disabled:bg-gray-500"
          >
            <GrFormPrevious />
          </button>
          <button
            onClick={() =>
              nextPage(data?.recentReceiveHelpHistory.pageInfo?.endCursor)
            }
            disabled={
              !nextPageVisible &&
              !data?.recentReceiveHelpHistory?.pageInfo?.hasNextPage
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

export default withConsumer(RecentReceiveHelpReport);
