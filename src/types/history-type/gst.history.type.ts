type InvoiceItemType = {
  id: string;
  type: string;
  name: string;
};

export type InvoiceNodeType = {
  id?: string;
  invoiceNumber?: string;
  stateId?: string;
  amount?: string;
  taxAmount?: string;
  subtotalAmount?: string;
  createdAt: number;
  isCancelled?: boolean;
  CGST?: string;
  SGST?: string;
  invoiceType?: string;
  tblinvoiceitemSet?: InvoiceItemType[];
};

export type PmfHistoryNodeType = {
  node: InvoiceNodeType;
};

type PageInfoType = {
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  startCursor: string | null;
  endCursor: string | null;
};

export type UserGstInvoicesResponse = {
  userGstInvoices: {
    edges: PmfHistoryNodeType[];
    pageInfo: PageInfoType;
  };
};
