'use client';
import React, { useEffect, useState } from 'react';
import NoData from '@/components/NoData';
import PageLoading from '@/components/PageLoading';
import { INVOICE_DOWNLOAD_AS_PDF } from '@/graphql/mutation/invoice/invoice.mutation';
import { GET_GST_INVOICE_LIST } from '@/graphql/query/all-history.query';
import {
  convertToInrSymbol,
  localDateConvertion,
  openBase64NewTab,
} from '@/lib/utils';
import { UserGstInvoicesResponse } from '@/types/history-type/gst.history.type';
import { useLazyQuery, useMutation } from '@apollo/client';
import Typography from '@/components/Typography';
import { Button } from '@/components/Button';
import { GrFormPrevious } from 'react-icons/gr';
import { MdNavigateNext } from 'react-icons/md';
import withConsumer from '@/helper/withConsumer';

const GstInvoiceReport = () => {
  const [mutateInvoiceList, { data, loading }] =
    useLazyQuery<UserGstInvoicesResponse>(GET_GST_INVOICE_LIST, {
      fetchPolicy: 'network-only',
    });
  const [nextPageVisible, setNextPageVisible] = useState<boolean>(false);
  const [PrevPageVisible, setPrevPageVisible] = useState<boolean>(false);
  const [GetPdfData] = useMutation(INVOICE_DOWNLOAD_AS_PDF);

  const downloadInvoice = async (id: string | undefined) => {
    if (!id) return null;
    const { data } = await GetPdfData({
      variables: { invoiceId: id },
    });
    openBase64NewTab(data?.downloadInvoiceAsPdf?.data);
    // downloadFile(data?.downloadInvoiceAsPdf?.data);
  };

  useEffect(() => {
    mutateInvoiceList({
      variables: {
        first: 5,
      },
    });
  }, [mutateInvoiceList]);

  const prevPage = (value: string | null) => {
    mutateInvoiceList({
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

  const nextPage = (value: string | null) => {
    mutateInvoiceList({
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

  if (loading) return <PageLoading />;

  if (
    data?.userGstInvoices.edges?.length === 0 ||
    !data?.userGstInvoices?.edges
  ) {
    return <NoData Error="No History Found" className="text-white" />;
  }
  const InvoiceList = data?.userGstInvoices?.edges || [];
  return (
    <>
      <div className="mx-auto max-w-2xl">
        {InvoiceList.map((invoice, index: number) => (
          <div
            key={index}
            className="mx-auto mb-6 flex max-w-2xl flex-col gap-2 font-normal text-white"
          >
            <div className="flex items-center justify-between">
              <Typography className="w-full " as="p">
                Invoice Number
              </Typography>
              <Typography className="w-full text-right" as="p">
                {invoice.node.invoiceNumber}
              </Typography>
            </div>
            {/* <div className="flex items-center justify-between">
              <Typography className="w-full " as="p">
                Invoice Type
              </Typography>
              <Typography className="w-full text-right" as="p">
                {invoice?.node?.invoiceType}
              </Typography>
            </div> */}
            <div className="flex items-center justify-between">
              <Typography className="w-full" as="p">
                Date
              </Typography>
              <Typography className="w-full text-right" as="p">
                {localDateConvertion(invoice?.node?.createdAt, true)}
              </Typography>
            </div>
            <div className="flex items-center justify-between">
              <Typography className="w-full" as="p">
                Amount
              </Typography>
              <Typography className="w-full text-right" as="p">
                {convertToInrSymbol(invoice?.node?.amount || '')}
              </Typography>
            </div>
            <div className="flex items-center justify-between">
              <Typography className=" w-full" as="p">
                GST
              </Typography>
              <Typography className="w-full text-right" as="p">
                {convertToInrSymbol(invoice?.node?.taxAmount || '')}
              </Typography>
            </div>
            <div className="flex items-center justify-between">
              <Typography className="w-full" as="p">
                Total
              </Typography>
              <Typography className="w-full text-right" as="p">
                {convertToInrSymbol(invoice?.node?.subtotalAmount || '')}
              </Typography>
            </div>

            <div className="flex items-center justify-between">
              <div></div>
              <div className="w-full text-right">
                <Button
                  className="h-fit w-fit border-none bg-none px-0 text-base tracking-wide text-tertiary hover:bg-transparent hover:text-tertiary"
                  variant={'outline'}
                  onClick={() => downloadInvoice(invoice?.node?.id)}
                >
                  Download Invoice
                </Button>
              </div>
            </div>
            <div className="h-[2px] w-full bg-tertiary"></div>
          </div>
        ))}
        <div className="flex h-full w-full items-end justify-end gap-2">
          <button
            onClick={() =>
              prevPage(data?.userGstInvoices?.pageInfo?.startCursor)
            }
            disabled={
              !PrevPageVisible &&
              !data?.userGstInvoices?.pageInfo?.hasPreviousPage
            }
            className="h-7 w-7  rounded-md bg-white text-[30px] font-bold text-primary disabled:bg-gray-500"
          >
            <GrFormPrevious />
          </button>
          <button
            onClick={() => nextPage(data?.userGstInvoices?.pageInfo?.endCursor)}
            disabled={
              !nextPageVisible && !data?.userGstInvoices?.pageInfo?.hasNextPage
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

export default withConsumer(GstInvoiceReport);
