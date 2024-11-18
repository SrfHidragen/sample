import { gql } from '@apollo/client';

export const CHECK_CUSTOMER_TOPUP_STATUS = gql`
  mutation checkCustomerTopUp($transactionId: String) {
    checkCustomerTopUp(input: { transactionId: $transactionId }) {
      errors
      message
      statusCode
      data {
        status
        errorMessage
        upiIntentUrl
        merchantTxnId
        upiTxnId
        createdAt
        updatedAt
      }
    }
  }
`;

export const COMPLETE_CUSTOMER_APPROACH = gql`
  mutation completeCustomerApproach($transactionId: String) {
    completeCustomerApproach(input: { transactionId: $transactionId }) {
      errors
      message
      statusCode
      data {
        id
        status
        transactionName
      }
    }
  }
`;
