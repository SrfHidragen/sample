type PartialPaymentNodeType = {
  id: string;
  amount: string;
  updatedAt: number | string;
  status: number;
};

type PartialPaymentEdgeType = {
  node: PartialPaymentNodeType;
};

type PartialPaymentsType = {
  edges: PartialPaymentEdgeType[];
};

type UserReceiveHelpHistoryNodeType = {
  id: string;
  amount: string;
  paidAmount: string;
  consumerName: string;
  consumerNumber: string;
  approvedAt: string;
  receiveLevel: number;
  statusCode: number;
  updatedAt: number | string;
  hasPartial: boolean;
  partialPayments: PartialPaymentsType;
};

export type UserReceiveHelpHistoryEdgeType = {
  node: UserReceiveHelpHistoryNodeType;
};

type PageInfoType = {
  hasPreviousPage: boolean;
  startCursor: string;
  hasNextPage: boolean;
  endCursor: string | undefined;
};

export type UserReceiveHelpHistoryType = {
  userReceiveHelpHistory: {
    edges: UserReceiveHelpHistoryEdgeType[];
    pageInfo: PageInfoType;
  };
};

// type DataResponseType = {
//   data: {
//     userReceiveHelpHistory: UserReceiveHelpHistoryType;
//   };
// };
