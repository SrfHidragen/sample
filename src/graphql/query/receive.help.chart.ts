import { gql } from '@apollo/client';

export const RECEIVE_HELP_CHART = gql`
  query {
    receiveHelpListCount {
      associatesConsumers
      helpedConsumers
      partiallyPaidConsumers
      notInvitedCount
      stages {
        stage
        associatedConsumers
        helpedConsumers
        partiallyPaidConsumers
        notInvitedMembers
        totalConumers
        amount
      }
    }
  }
`;

export const ASSOCIATED_CONSUMER = gql`
  query associatedReceiversConsumersList($rowNumber: Int) {
    associatedReceiversConsumersList(rowNumber: $rowNumber) {
      consumer {
        memberId
        memberName
        status
        designation
        receiveAmount
        receivedTime
        associatedDate
        toBeReceivedAmount
      }
    }
  }
`;

export const HELPED_CONSUMER = gql`
  query helpedConsumersOnReceiversByStage($rowNumber: Int) {
    helpedConsumersOnReceiversByStage(rowNumber: $rowNumber) {
      edges {
        node {
          id
          amount
          paidAmount
          consumerName
          consumerNumber
          statusCode
          hasPartial
          designation
          updatedAt
        }
      }
    }
  }
`;

export const PARTIALLY_HELPED_AMOUNT = gql`
  query partiallyHelpedConsumersOnReceiversByStage($rowNumber: Int) {
    partiallyHelpedConsumersOnReceiversByStage(rowNumber: $rowNumber) {
      edges {
        node {
          id
          amount
          paidAmount
          consumerName
          consumerNumber
          statusCode
          hasPartial
          designation
          updatedAt
          paymentStatus
          partialPayments {
            edges {
              node {
                id
                amount
                status
                updatedAt
                approvedAt
              }
            }
          }
        }
      }
    }
  }
`;

export const NON_ASSOCIATED_INVITERS = gql`
  query nonAssociatedConsumersList($rowNumber: Int) {
    nonAssociatedConsumersList(rowNumber: $rowNumber) {
      edges {
        node {
          firstName
          createdAt
          id
          stage
          username
        }
      }
    }
  }
`;
