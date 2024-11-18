import { gql } from '@apollo/client';

export const INITIAL_PROCESSING_FEE = gql`
  mutation sendProcessingFee($amount: Float, $upiId: String) {
    sendProcessingFee(input: { amount: $amount, upiId: $upiId }) {
      data {
        status
        upiIntentUrl
        errorMessage
        merchantTxnId
        updatedAt
        createdAt
      }
      message
      statusCode
    }
  }
`;

export const PMF_PAYMENT_CHECK_STATUS = gql`
  mutation checkPmfPaymentStatus($transactionId: String) {
    checkPmfPaymentStatus(input: { transactionId: $transactionId }) {
      data {
        status
        errorMessage
        createdAt
        upiTxnId
        updatedAt
      }
      statusCode
      errors
    }
  }
`;

export const CHECK_INITIAL_PAYMENT_STATUS = gql`
  mutation checkProcessingFeeStatus($transactionId: String) {
    checkProcessingFeeStatus(input: { transactionId: $transactionId }) {
      data {
        status
        errorMessage
        createdAt
        updatedAt
        upiTxnId
        upiIntentUrl
        merchantTxnId
      }
      statusCode
      errors
      message
    }
  }
`;
