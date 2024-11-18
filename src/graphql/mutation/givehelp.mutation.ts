import { gql } from '@apollo/client';

export const PAY_GIVE_HELP_INITIATE_TOP_UP = gql`
  mutation initiateTopUp(
    $amount: Float
    $upiId: String
    $transactionName: String
  ) {
    initiateTopUp(
      input: {
        amount: $amount
        upiId: $upiId
        transactionName: $transactionName
      }
    ) {
      message
      statusCode
      data {
        status
        upiIntentUrl
        errorMessage
        createdAt
        updatedAt
        upiTxnId
        merchantTxnId
      }
    }
  }
`;

export const CHECK_TOP_UP_PAYMENT_STATUS = gql`
  mutation checkTopUpStatus($transactionId: String) {
    checkTopUpStatus(input: { transactionId: $transactionId }) {
      errors
      message
      statusCode
      data {
        status
        errorMessage
        upiTxnId
      }
    }
  }
`;

export const RECEIVER_ACCOUNT_INFO = gql`
  query getReceiverAccountInfo($isApproach: Boolean, $approachLevel: Int) {
    getReceiverAccountInfo(
      isApproach: $isApproach
      approachLevel: $approachLevel
    ) {
      helpAmount
      approachAmount
      paymentInfo {
        avatar
        totalAmount
        pendingAmount
        receiverInfo {
          upiId
          username
          personal {
            firstName
          }
          address {
            state
            district
            panchayath
            ward
          }
          bankDetails {
            upiRegisteredBankName
            upiRegisteredAccountNumber
            upiRegisteredBankBranch
          }
        }
      }
    }
  }
`;
