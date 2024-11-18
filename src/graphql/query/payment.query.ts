import { gql } from '@apollo/client';

export const INITIATED_QUERY = gql`
  query {
    getPaymentsHistory {
      processingFee {
        transactionId
        upiTxnId
        amount
        status
        requestedAt
        paidDate
      }
      pmfPayments {
        transactionId
        upiTxnId
        amount
        status
        requestedAt
        requestApprovedAt
      }
      topUps {
        edges {
          node {
            txnId
            upiTxnId
            amount
            status
            createdAt
            updatedAt
          }
        }
      }
    }
  }
`;

export const PENDING_PROCESSING_PAYMENT = gql`
  query {
    getLastProcessingFee {
      amount
      transactionId
      upiTxnId
      status
      requestedAt
    }
  }
`;

export const PENDING_PMF_PAYMENT = gql`
  query {
    getLastInitialPmf {
      id
      amount
      transactionId
      upiTxnId
      isInitialPmf
      status
      requestedAt
    }
  }
`;

export const PENDING_GIVE_HELP_PAYMENT = gql`
  query {
    getLastTopUp {
      id
      txnId
      upiTxnId
      name
      amount
      status
      updatedAt
    }
  }
`;
