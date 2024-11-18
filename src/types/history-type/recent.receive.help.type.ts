export interface RecentReceiveHelpHistory {
  recentReceiveHelpHistory: {
    edges: PartialPaymentTypeEdge[];
    pageInfo: PageInfo;
  };
}

export interface PartialPaymentTypeEdge {
  node: PartialPaymentType;
}

interface PartialPaymentType {
  id: string;
  amount: string;
  createdAt: string;
  status: number;
  name: string;
  username: string;
  updatedAt: string;
}

interface PageInfo {
  hasPreviousPage: boolean;
  startCursor: string;
  hasNextPage: boolean;
  endCursor: string;
}
