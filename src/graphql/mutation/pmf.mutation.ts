import { gql } from '@apollo/client';

export const INITIAL_PMF_PAYMENT = gql`
  mutation initialPmf($amount: Float, $upiId: String) {
    initialPmf(input: { amount: $amount, upiId: $upiId }) {
      message
      data {
        upiIntentUrl
        merchantTxnId
        upiTxnId
      }
      statusCode
    }
  }
`;
