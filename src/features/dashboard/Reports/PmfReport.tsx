'use client';
import { Button } from '@/components/Button';
import NoData from '@/components/NoData';
import PageLoading from '@/components/PageLoading';
import Typography from '@/components/Typography';
import { INVOICE_DOWNLOAD_AS_PDF } from '@/graphql/mutation/invoice/invoice.mutation';
import { GET_PMF_HISTORY_LIST } from '@/graphql/query/all-history.query';
import withConsumer from '@/helper/withConsumer';
import {
  cn,
  convertToInrSymbol,
  localDateConvertion,
  openBase64NewTab,
} from '@/lib/utils';
import { UserPmfList } from '@/types/history-type/pmfhistory.type';
import { useLazyQuery, useMutation } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { GrFormPrevious } from 'react-icons/gr';
import { MdNavigateNext } from 'react-icons/md';

const PmfReport = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [nextPageVisible, setNextPageVisible] = useState<boolean>(false);
  const [prevPageVisible, setPrevPageVisible] = useState<boolean>(false);
  const [onHandlePmfList, { data, loading }] =
    useLazyQuery<UserPmfList>(GET_PMF_HISTORY_LIST);
  const [GetPdfData] = useMutation(INVOICE_DOWNLOAD_AS_PDF);

  useEffect(() => {
    onHandlePmfList({
      variables: {
        first: 5,
      },
    });
    setIsLoading(false);
  }, [onHandlePmfList]);

  const onHandlePdf = async (id: string | undefined) => {
    const { data } = await GetPdfData({
      variables: { invoiceId: id },
    });
    if (data?.downloadInvoiceAsPdf?.data) {
      openBase64NewTab(data?.downloadInvoiceAsPdf?.data);
    }
  };

  const pmfHistory = data?.userPmfList.pmfList.edges;

  const prevPage = (value: string | undefined) => {
    onHandlePmfList({
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
    onHandlePmfList({
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

  if (loading || isLoading) return <PageLoading />;

  if (!pmfHistory || pmfHistory?.length === 0) {
    return <NoData Error="No History Found" className="text-white" />;
  }

  return (
    <>
      <div className="mx-auto  max-w-2xl">
        {pmfHistory?.map((pmf, index: React.Key) => (
          <div
            key={index}
            className="mb-6 flex flex-col gap-2 font-normal text-white"
          >
            <div className="flex items-center justify-between">
              <Typography className="w-full " as="p">
                {'PMF '}
              </Typography>
              <Typography className="w-full text-right" as="p">
                {convertToInrSymbol(pmf?.node.amount)}
              </Typography>
            </div>
            <div className="flex items-center justify-between">
              <Typography className="w-full" as="p">
                GST
              </Typography>
              <Typography className="w-full text-right" as="p">
                {convertToInrSymbol(pmf?.node.tax)}
              </Typography>
            </div>

            <div className="flex items-center justify-between">
              <Typography className="w-full " as="p">
                Total
              </Typography>
              <Typography className="w-full text-right" as="p">
                ₹{' '}
                {(Number(pmf?.node.amount) + Number(pmf?.node.tax))?.toFixed(2)}
              </Typography>
            </div>
            <div className="flex items-center justify-between">
              <Typography className="w-full" as="p">
                Status
              </Typography>
              <Typography
                className={cn(
                  'w-full text-right',
                  pmf?.node?.status === 3
                    ? 'text-green-500'
                    : 'text-orange-500',
                )}
                as="p"
              >
                {pmf?.node.status === 3 ? 'Paid' : 'Not Paid'}
              </Typography>
            </div>
            <div className="flex items-center justify-between">
              <Typography className="w-full " as="p">
                Date
              </Typography>
              <Typography className="w-full text-right" as="p">
                {pmf?.node?.approvedAt
                  ? localDateConvertion(pmf?.node?.approvedAt, true)
                  : localDateConvertion(pmf?.node?.createdAt, true)}
              </Typography>
            </div>
            <div className="flex items-center justify-between">
              <div></div>
              <div className="w-full text-right">
                <Button
                  className="h-fit w-fit border-none bg-none px-0 text-base tracking-wide text-tertiary hover:bg-transparent hover:text-tertiary"
                  variant={'outline'}
                  onClick={() => onHandlePdf(pmf?.node.pmfInvoice?.id)}
                >
                  Download Invoice
                </Button>
              </div>
            </div>
            <div className="h-[2px] w-full bg-tertiary"></div>
          </div>
        ))}

        {!!pmfHistory && (
          <div className="flex h-full w-full items-end justify-end gap-2">
            <button
              onClick={() =>
                prevPage(data?.userPmfList.pmfList.pageInfo.startCursor)
              }
              disabled={
                !prevPageVisible &&
                !data?.userPmfList.pmfList.pageInfo.hasPreviousPage
              }
              className="h-7 w-7  rounded-md bg-white text-[30px] font-bold text-primary disabled:bg-gray-500"
            >
              <GrFormPrevious />
            </button>
            <button
              onClick={() =>
                nextPage(data?.userPmfList?.pmfList.pageInfo?.endCursor)
              }
              disabled={
                !nextPageVisible &&
                !data?.userPmfList?.pmfList.pageInfo?.hasNextPage
              }
              className="h-7 w-7 rounded-md bg-white text-[30px] font-bold text-primary disabled:bg-gray-500"
            >
              <MdNavigateNext />
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default withConsumer(PmfReport);
