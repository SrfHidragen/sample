interface PmfInvoice {
  stateId: number;
  id: string;
}

interface PmfNode {
  id: string;
  amount: string;
  tax: string;
  status: number;
  createdAt: number;
  approvedAt: number | string;
  pmfInvoice: PmfInvoice;
  CGST: number;
  SGST: number;
}

export interface PmfEdge {
  node: PmfNode;
}

interface PageInfo {
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  startCursor: string;
  endCursor: string;
}

interface PmfList {
  edges: PmfEdge[];
  pageInfo: PageInfo;
}

export interface UserPmfList {
  userPmfList: {
    pmfList: PmfList;
    totalPmfAmount: number;
  };
}
