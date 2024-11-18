type PartialPaymentNodeType = {
  id: string;
  amount: string;
  status: number;
  updatedAt: string;
};

type PartialPaymentEdgeType = {
  node: PartialPaymentNodeType;
};

type PartialPaymentsType = {
  edges: PartialPaymentEdgeType[];
};

type GiveHelpHistoryNodeType = {
  amount: string;
  paidAmount: string;
  consumerName: string;
  consumerNumber: string;
  statusCode: number;
  updatedAt: string;
  approvedAt: string;
  hasPartial: boolean;
  partialPayments: PartialPaymentsType;
};

export type GiveHelpHistoryEdgeType = {
  node: GiveHelpHistoryNodeType;
};

type PageInfoType = {
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  startCursor: string;
  endCursor: string;
};

export type GiveHelpHistoryType = {
  giveHelpHistory: {
    pageInfo: PageInfoType;
    edges: GiveHelpHistoryEdgeType[];
  };
};
