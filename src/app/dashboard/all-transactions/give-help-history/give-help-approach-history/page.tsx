/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
// import HistoryList, {
//   HISTORY_LIST_TYPE,
// } from '@/features/dashboard/transactions-page/HistoryList';

type ListItemNodeType1 = {
  id: string;
  amount: string;
  status: string;
  transactionType: string;
  updatedAt: string;
};
const transactionsType1: ListItemNodeType1[] = [
  {
    id: 'tx1',
    amount: '150.00',
    status: 'Completed',
    transactionType: 'Credit',
    updatedAt: '2023-09-08T12:34:56',
  },
  {
    id: 'tx2',
    amount: '200.00',
    status: 'Pending',
    transactionType: 'Debit',
    updatedAt: '2023-09-09T09:15:45',
  },
];

export default function page() {
  const prevPage = (value: string | null) => {
    // mutateInvoiceList({
    //   variables: {
    //     last: 5,
    //     before: value,
    //   },
    //   onCompleted() {
    //     setNextPageVisible(true);
    //     setPrevPageVisible(false);
    //   },
    // });
  };

  const nextPage = (value: string | null) => {
    // mutateInvoiceList({
    //   variables: {
    //     first: 5,
    //     after: value,
    //   },
    //   onCompleted() {
    //     setPrevPageVisible(true);
    //     setNextPageVisible(false);
    //   },
    // });
  };
  return (
    <>hai</>
    // <HistoryList
    //   type={HISTORY_LIST_TYPE.GIVE_HELP_APPROACH_HISTORY}
    //   List={transactionsType1}
    //   nextPage={nextPage}
    //   prevPage={prevPage}
    //   endCursor={'hai'}
    //   startCursor={'hai'}
    // />
  );
}
