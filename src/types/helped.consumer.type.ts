interface PartialPaymentNode {
  id: string;
  amount: string;
  status: string;
}

interface PartialPaymentEdge {
  node: PartialPaymentNode;
}

interface PartialPayments {
  edges: PartialPaymentEdge[];
}

export interface UserReceiveHelpHistoryNode {
  id: string;
  amount: string;
  paidAmount: string;
  updatedAt: string;
  consumerName: string;
  consumerNumber: string;
  statusCode: number;
  hasPartial: boolean;
  designation: string;
  partialPayments: PartialPayments;
}

export interface UserReceiveHelpHistoryEdge {
  node: UserReceiveHelpHistoryNode;
}

export interface UserReceiveHelpHistory {
  edges: UserReceiveHelpHistoryEdge[];
}

export interface UserReceiveHelpHistoryResponse {
  userReceiveHelpHistoryOnStage: UserReceiveHelpHistory;
}
