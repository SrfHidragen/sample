'use client';
import NoData from '@/components/NoData';
import PageLoading from '@/components/PageLoading';
import Typography from '@/components/Typography';
import { GIVE_HELP_HISTORY_LIST } from '@/graphql/query/all-history.query';
import withConsumer from '@/helper/withConsumer';
import { convertToInrSymbol, localDateConvertion } from '@/lib/utils';
import { GiveHelpHistoryType } from '@/types/history-type/give.help.history.type';
import { useLazyQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { GrFormPrevious } from 'react-icons/gr';
import { MdNavigateNext } from 'react-icons/md';

const GiveHelpReport = () => {
  const [nextPageVisible, setNextPageVisible] = useState<boolean>(false);
  const [PrevPageVisible, setPrevPageVisible] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [mutateGiveHelpHistory, { data, loading }] =
    useLazyQuery<GiveHelpHistoryType>(GIVE_HELP_HISTORY_LIST, {
      fetchPolicy: 'network-only',
    });

  useEffect(() => {
    mutateGiveHelpHistory({
      variables: {
        first: 5,
      },
    });
    setIsLoading(false);
  }, [mutateGiveHelpHistory]);

  const prevPage = (value: string | undefined) => {
    mutateGiveHelpHistory({
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
    mutateGiveHelpHistory({
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

  const GiveHelpHistoryList = data?.giveHelpHistory?.edges || [];
  if (loading || isLoading) return <PageLoading />;

  if (!GiveHelpHistoryList || GiveHelpHistoryList?.length === 0) {
    return <NoData />;
  }
  return (
    <>
      <div className="mx-auto max-w-2xl">
        {GiveHelpHistoryList?.map(
          (giveHelp, index: React.Key | null | undefined) => (
            <div
              key={index}
              className="mb-6 flex flex-col gap-2 font-normal text-white"
            >
              <div className="flex items-center justify-between">
                <Typography className="w-full" as="p">
                  Consumer Number
                </Typography>
                <Typography className="w-full text-right" as="p">
                  {giveHelp?.node?.consumerNumber}
                </Typography>
              </div>
              <div className="flex items-center justify-between">
                <Typography className="w-full" as="p">
                  Consumer Name
                </Typography>
                <Typography className="w-full text-right" as="p">
                  {giveHelp?.node?.consumerName}
                </Typography>
              </div>
              <div className="flex items-center justify-between">
                <Typography className="w-full " as="p">
                  Total Give Help Amount
                </Typography>
                <Typography className="w-full text-right" as="p">
                  {convertToInrSymbol(giveHelp?.node?.amount)}
                </Typography>
              </div>
              <div className="flex items-center justify-between">
                <Typography className="w-full " as="p">
                  Paid Give Help Amount
                </Typography>
                <Typography className="w-full text-right" as="p">
                  {convertToInrSymbol(giveHelp?.node?.paidAmount)}
                </Typography>
              </div>
              {!!giveHelp?.node?.approvedAt && (
                <div className="flex items-center justify-between">
                  <Typography className="w-full " as="p">
                    Date
                  </Typography>
                  {/* <Typography className="w-full text-right" as="p">
                  {giveHelp?.node?.hasPartial
                    ? localDateConvertion(
                        giveHelp?.node?.partialPayments?.edges[0]?.node
                          ?.updatedAt,
                        true,
                      )
                    : localDateConvertion(giveHelp?.node?.updatedAt, true)}
                </Typography> */}
                  <Typography className="w-full text-right" as="p">
                    {localDateConvertion(giveHelp?.node?.approvedAt, true)}
                  </Typography>
                </div>
              )}
              <div className="flex items-center justify-between">
                <Typography className="w-full" as="p">
                  Status
                </Typography>
                {giveHelp?.node.statusCode === 3 ? (
                  <Typography
                    className="w-full text-right text-green-500"
                    as="p"
                  >
                    Paid
                  </Typography>
                ) : giveHelp?.node?.hasPartial ? (
                  <Typography
                    className="w-full text-right text-yellow-500"
                    as="p"
                  >
                    {' '}
                    Partially Paid
                  </Typography>
                ) : (
                  <Typography className="w-full text-right text-red-500" as="p">
                    Not Paid
                  </Typography>
                )}
              </div>

              <div className="h-[2px] w-full bg-tertiary"></div>
            </div>
          ),
        )}
        <div className="flex h-full w-full items-end justify-end gap-2">
          <button
            onClick={() =>
              prevPage(data?.giveHelpHistory?.pageInfo?.startCursor)
            }
            disabled={
              !PrevPageVisible &&
              !data?.giveHelpHistory?.pageInfo?.hasPreviousPage
            }
            className="h-7 w-7  rounded-md bg-white text-[30px] font-bold text-primary disabled:bg-gray-500"
          >
            <GrFormPrevious />
          </button>
          <button
            onClick={() => nextPage(data?.giveHelpHistory?.pageInfo?.endCursor)}
            disabled={
              !nextPageVisible && !data?.giveHelpHistory?.pageInfo?.hasNextPage
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

export default withConsumer(GiveHelpReport);
