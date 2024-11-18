import { customSessionStorage } from '@/lib/utils';
import {
  GIVE_HELP_PAYMENT_APPROACH,
  PAYMENT_PENDING_TYPE,
  PAYMENT_TYPE,
  PaymentProcessType,
} from '@/types/paymentprocess.store.type';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

const initialState = {
  payment_type: PAYMENT_TYPE.NULL,
  amount: 0,
  total_amount: 0,
  unique_key: '',
  confirm_payment_id: '',
  payment_page_level: '',
  payment_description_type: '',
  txnId: '',
  request_time: '',
  upiTxnId: '',
  IsPendingPayment: false,
  payment_pending: PAYMENT_PENDING_TYPE.NULL,
  upi_id: '',
  give_help_transactionName: '',
  give_help_payment_approach: GIVE_HELP_PAYMENT_APPROACH.NULL,
  tax: {
    cgst_amount: 0,
    cgst_percentage: 0,
    gst_amount: 0,
    gst_percentage: 0,
    igst_amount: 0,
    igst_percentage: 0,
    sgst_amount: 0,
    sgst_percentage: 0,
  },
};

export const usePaymentProcess = create<PaymentProcessType>()(
  persist(
    (set) => ({
      PaymentInfo: initialState,
      AddPaymentInfo(data, callback) {
        set((state) => {
          const resp = {
            PaymentInfo: {
              ...state?.PaymentInfo,
              ...data,
            },
          };
          if (callback) callback();
          return resp;
        });
      },
      clearProcess() {
        set(() => {
          const resp = {
            PaymentInfo: initialState,
          };
          return resp;
        });
      },
    }),
    {
      name: 'p3-t$#$',
      storage: createJSONStorage(() => customSessionStorage),
    },
  ),
);
