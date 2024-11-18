/* eslint-disable no-unused-vars */
export enum PAYMENT_TYPE {
  PROCESSING_FEE = 'PROCESSING_FEE',
  INITIAL_PMF_FEE = 'INITIAL_PMF_FEE',
  GIVE_HELP_TOP_UP = 'GIVE_HELP_TOP_UP',
  NULL = 'NULL',
}

export enum GIVE_HELP_PAYMENT_APPROACH {
  NULL = 'NULL',
  NEXT_DESIGNATION = 'NEXT_DESIGNATION',
  HELP_AMOUNT = 'HELP_AMOUNT',
}

export enum PAYMENT_PENDING_TYPE {
  NULL = 'NULL',
  PROCESSING_FEE = 'PROCESSING_FEE',
  INITIAL_PMF_FEE = 'INITIAL_PMF_FEE',
  GIVE_HELP_TOP_UP = 'GIVE_HELP_TOP_UP',
}
type TaxType = {
  other_tax_percentage?: number;
  other_tax_amount?: number;
  cgst_percentage?: number;
  sgst_percentage?: number;
  igst_percentage?: number;
  gst_percentage?: number;
  cgst_amount?: number;
  sgst_amount?: number;
  igst_amount?: number;
  gst_amount?: number;
};

type PaymentInfoType = {
  payment_type?: PAYMENT_TYPE;
  unique_key?: string;
  payment_page_level?: string;
  payment_pending?: PAYMENT_PENDING_TYPE;
  amount?: number;
  total_amount?: number;
  approach_level?: string | number;
  payment_description_type?: string;
  request_time?: number | string | undefined;
  IsPendingPayment?: boolean;
  tax: TaxType;
  upiTxnId?: string;
  give_help_transactionName: string;
  txnId: string;
  confirm_payment_id: string;
  upi_id: string;
  give_help_payment_approach: GIVE_HELP_PAYMENT_APPROACH;
};

export interface PaymentProcessType {
  PaymentInfo: PaymentInfoType;
  AddPaymentInfo: (
    data: Partial<PaymentInfoType>,
    callback?: () => void,
  ) => void;
  clearProcess: () => void;
}
