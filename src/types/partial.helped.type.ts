type PartialPaymentNodeType = {
  id: string;
  amount: string;
  status: number;
  approvedAt: Date;
  updatedAt: Date;
};

type PartialPaymentEdgeType = {
  node: PartialPaymentNodeType;
};

type PartialPaymentsType = {
  edges: PartialPaymentEdgeType[];
};

type ConsumerNodeType = {
  id: string;
  amount: string;
  paidAmount: string;
  consumerName: string;
  consumerNumber: string;
  statusCode: number;
  hasPartial: boolean;
  designation: string;
  updatedAt: string;
  paymentStatus: string;
  partialPayments: PartialPaymentsType;
};

export type ConsumerEdgeType = {
  node: ConsumerNodeType;
};
