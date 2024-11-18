import { gql } from '@apollo/client';

export const INVOICE_DOWNLOAD_AS_PDF = gql`
  mutation downloadInvoiceAsPdf($invoiceId: String) {
    downloadInvoiceAsPdf(input: { invoiceId: $invoiceId }) {
      data
    }
  }
`;
