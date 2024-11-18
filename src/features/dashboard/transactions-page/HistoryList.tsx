// /* eslint-disable @typescript-eslint/array-type */
// /* eslint-disable @typescript-eslint/no-explicit-any */
// /* eslint-disable no-unused-vars */
// 'use client';
// import { Button } from '@/components/Button';
// import Typography from '@/components/Typography';
// import { GrFormPrevious } from 'react-icons/gr';
// import { MdNavigateNext } from 'react-icons/md';

// export enum HISTORY_LIST_TYPE {
//   PMF_HISTORY = 'PMF_HISTORY',
//   GST_INVOICE = 'GST_INVOICE',
//   GIVE_HELP_APPROACH_HISTORY = 'GIVE_HELP_APPROACH_HISTORY',
// }

// type ListData = { [key: string]: any };
// type HistoryListProps = {
//   List: Array<ListData>;
//   type: HISTORY_LIST_TYPE;
//   prevPageVisible?: boolean;
//   nextPageVisible?: boolean;
//   prevPage: (value: string | null) => void;
//   nextPage: (value: string | null) => void;
//   startCursor: string | null;
//   endCursor: string | null;
//   hasNextPage?: boolean;
//   hasPreviousPage?: boolean;
//   HandleInfvoiceDownload?: (id: string | undefined) => void;
// };

// const HistoryList = ({
//   List,
//   type,
//   nextPage,
//   nextPageVisible,
//   prevPage,
//   prevPageVisible,
//   startCursor,
//   endCursor,
//   hasNextPage,
//   hasPreviousPage,
//   HandleInfvoiceDownload,
// }: HistoryListProps) => {
//   if (type === HISTORY_LIST_TYPE.PMF_HISTORY) {
//     return (
//       <div className="mx-auto max-w-2xl">
//         {List?.map((item, index: React.Key) => {
//           return (
//             <div
//               className="mb-6 flex flex-col gap-2 font-normal text-white"
//               key={index}
//             >
//               <div className="flex items-center justify-between">
//                 <Typography className="w-full" as="p">
//                   Amount
//                 </Typography>
//                 <Typography className="w-full text-right" as="p">
//                   ₹ {item.node?.amount}
//                 </Typography>
//               </div>
//               {/* <div className="flex items-center justify-between">
//                 <Typography className="w-full" as="p">
//                   Transaction ID
//                 </Typography>
//                 <Typography className="w-full text-right" as="p">
//                   {item.}
//                 </Typography>
//               </div> */}
//               {/* <div className="flex items-center justify-between">
//                 <Typography className="w-full" as="p">
//                   Status
//                 </Typography>
//                 <Typography as="p">{item.node?.}</Typography>
//               </div> */}
//               {/* <div className="flex items-center justify-between">
//                 <Typography className="w-full" as="p">
//                   Payment Mode
//                 </Typography>
//                 <Typography className="w-full text-right" as="p">
//                   {item.transactionType}
//                 </Typography>
//               </div> */}
//               {/* <div className="flex items-center justify-between">
//                 <Typography className="w-full" as="p">
//                   Date
//                 </Typography>
//                 <Typography className="w-full text-right" as="p">
//                   {moment(item.updatedAt).format('MM-DD-YYYY, HH:mm')}
//                 </Typography>
//               </div> */}
//               <div className="flex items-center justify-between">
//                 <Typography className="w-full" as="p">
//                   hai
//                 </Typography>
//                 <div className="w-full text-right">
//                   <Button
//                     className="h-fit w-fit border-none bg-none px-0 text-base tracking-wide text-tertiary hover:bg-transparent hover:text-tertiary"
//                     variant={'outline'}
//                     onClick={() => {
//                       if (HandleInfvoiceDownload) {
//                         HandleInfvoiceDownload(item.node?.id);
//                       }
//                     }}
//                   >
//                     Download Invoice
//                   </Button>
//                 </div>
//               </div>
//               <div className="h-[2px] w-full bg-tertiary"></div>
//             </div>
//           );
//         })}
//         <div className="flex h-full w-full items-end justify-end gap-2">
//           <button
//             onClick={() => prevPage(startCursor)}
//             disabled={!prevPageVisible && !hasPreviousPage}
//             className="h-7 w-7  rounded-md bg-white text-[30px] font-bold text-primary disabled:bg-gray-500"
//           >
//             <GrFormPrevious />
//           </button>
//           <button
//             onClick={() => nextPage(endCursor)}
//             disabled={!nextPageVisible && !hasNextPage}
//             className="h-7 w-7 rounded-md bg-white text-[30px] font-bold text-primary disabled:bg-gray-500"
//           >
//             <MdNavigateNext />
//           </button>
//         </div>
//       </div>
//     );
//   }
//   // if (type === '')
//   //   return (
//   //     <>
//   //       <div className="mx-auto max-w-2xl">
//   //         {List?.map((item, index: React.Key) => {
//   //           return (
//   //             <div
//   //               className="mb-6 flex flex-col gap-2 font-normal text-white"
//   //               key={index}
//   //             >
//   //               {/* Conditional Rendering Based on Item Type */}
//   //               {'id' in item ? (
//   //                 // Render for ListItemNodeType1
//   //                 <>
//   //                   <div className="flex items-center justify-between">
//   //                     <Typography className="w-full" as="p">
//   //                       Amount
//   //                     </Typography>
//   //                     <Typography className="w-full text-right" as="p">
//   //                       ₹ {item.amount}
//   //                     </Typography>
//   //                   </div>
//   //                   <div className="flex items-center justify-between">
//   //                     <Typography className="w-full" as="p">
//   //                       Transaction ID
//   //                     </Typography>
//   //                     <Typography className="w-full text-right" as="p">
//   //                       {item.id}
//   //                     </Typography>
//   //                   </div>
//   //                   <div className="flex items-center justify-between">
//   //                     <Typography className="w-full" as="p">
//   //                       Status
//   //                     </Typography>
//   //                     <Typography as="p">{item.status}</Typography>
//   //                   </div>
//   //                   <div className="flex items-center justify-between">
//   //                     <Typography className="w-full" as="p">
//   //                       Payment Mode
//   //                     </Typography>
//   //                     <Typography className="w-full text-right" as="p">
//   //                       {item.transactionType}
//   //                     </Typography>
//   //                   </div>
//   //                   <div className="flex items-center justify-between">
//   //                     <Typography className="w-full" as="p">
//   //                       Date
//   //                     </Typography>
//   //                     <Typography className="w-full text-right" as="p">
//   //                       {moment(item.updatedAt).format('MM-DD-YYYY, HH:mm')}
//   //                     </Typography>
//   //                   </div>
//   //                 </>
//   //               ) : (
//   //                 // Render for ListItemNodeType2
//   //                 <>
//   //                   <div className="flex items-center justify-between">
//   //                     <Typography className="w-full" as="p">
//   //                       Value
//   //                     </Typography>
//   //                     <Typography className="w-full text-right" as="p">
//   //                       ₹ {item.value}
//   //                     </Typography>
//   //                   </div>
//   //                   <div className="flex items-center justify-between">
//   //                     <Typography className="w-full" as="p">
//   //                       Transaction ID
//   //                     </Typography>
//   //                     <Typography className="w-full text-right" as="p">
//   //                       {item.transactionId}
//   //                     </Typography>
//   //                   </div>
//   //                   <div className="flex items-center justify-between">
//   //                     <Typography className="w-full" as="p">
//   //                       State
//   //                     </Typography>
//   //                     <Typography as="p">{item.state}</Typography>
//   //                   </div>
//   //                   <div className="flex items-center justify-between">
//   //                     <Typography className="w-full" as="p">
//   //                       Payment Method
//   //                     </Typography>
//   //                     <Typography className="w-full text-right" as="p">
//   //                       {item.paymentMethod}
//   //                     </Typography>
//   //                   </div>
//   //                   <div className="flex items-center justify-between">
//   //                     <Typography className="w-full" as="p">
//   //                       Date
//   //                     </Typography>
//   //                     <Typography className="w-full text-right" as="p">
//   //                       {moment(item.dateUpdated).format('MM-DD-YYYY, HH:mm')}
//   //                     </Typography>
//   //                   </div>
//   //                 </>
//   //               )}
//   //               <div className="h-[2px] w-full bg-tertiary"></div>
//   //             </div>
//   //           );
//   //         })}
//   //         <div className="flex h-full w-full items-end justify-end gap-2">
//   //           <button className="h-7 w-7  rounded-md bg-white text-[30px] font-bold text-primary disabled:bg-gray-500">
//   //             <GrFormPrevious />
//   //           </button>
//   //           <button className="h-7 w-7 rounded-md bg-white text-[30px] font-bold text-primary disabled:bg-gray-500">
//   //             <MdNavigateNext />
//   //           </button>
//   //         </div>
//   //       </div>
//   //     </>
//   //   );
// };

// export default HistoryList;
