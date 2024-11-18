import { gql } from '@apollo/client';

export const CANCEL_PAYMENT = gql`
  mutation CancelPayment($transactionId: String, $transactionType: Int) {
    cancelPayment(
      input: {
        transactionId: $transactionId
        transactionType: $transactionType
      }
    ) {
      errors
      message
      statusCode
      data
      clientMutationId
    }
  }
`;
