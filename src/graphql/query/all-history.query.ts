import { gql } from '@apollo/client';

export const GET_GST_INVOICE_LIST = gql`
  query userGstInvoices(
    $first: Int
    $last: Int
    $after: String
    $before: String
  ) {
    userGstInvoices(
      first: $first
      last: $last
      after: $after
      before: $before
    ) {
      edges {
        node {
          id
          invoiceNumber
          stateId
          invoiceNumber
          amount
          taxAmount
          subtotalAmount
          createdAt
          isCancelled
          CGST
          SGST
          invoiceType
          tblinvoiceitemSet {
            id
            type
            name
          }
        }
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
    }
  }
`;

export const GIVE_HELP_HISTORY_LIST = gql`
  query ($first: Int, $last: Int, $after: String, $before: String) {
    giveHelpHistory(
      first: $first
      last: $last
      after: $after
      before: $before
    ) {
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
      edges {
        node {
          amount
          consumerName
          consumerNumber
          statusCode
          updatedAt
          hasPartial
          approvedAt
          paidAmount
          partialPayments {
            edges {
              node {
                id
                amount
                status
                updatedAt
              }
            }
          }
        }
      }
    }
  }
`;

export const WITHDRAWAL_HISTORY = gql`
  query ($first: Int, $last: Int, $after: String, $before: String) {
    getWithdrawalHistory(
      first: $first
      last: $last
      after: $after
      before: $before
    ) {
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
      edges {
        node {
          name
          amount
          status
          transactionName
          updatedAt
          createdAt
        }
      }
    }
  }
`;

export const GET_TOP_UP_HISTORY = gql`
  query getTopUpHistory(
    $first: Int
    $last: Int
    $after: String
    $before: String
  ) {
    getTopUpHistory(
      first: $first
      last: $last
      after: $after
      before: $before
    ) {
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
      edges {
        node {
          id
          amount
          approvedAt
          txnId
          upiTxnId
          serviceCharge
          status
          transactionName
          transactionType
          approvedBy
          createdAt
          updatedAt
        }
      }
    }
  }
`;

export const GET_PMF_HISTORY_LIST = gql`
  query userPmfList($first: Int, $last: Int, $after: String, $before: String) {
    userPmfList {
      pmfList(first: $first, last: $last, after: $after, before: $before) {
        edges {
          node {
            id
            amount
            tax
            status
            createdAt
            approvedAt
            pmfInvoice {
              id
              stateId
            }
            CGST
            SGST
          }
        }
        pageInfo {
          hasNextPage
          hasPreviousPage
          startCursor
          endCursor
        }
      }
      totalPmfAmount
    }
  }
`;

export const RECEIVE_HELP_LIST = gql`
  query userReceiveHelpHistory(
    $first: Int
    $last: Int
    $before: String
    $after: String
  ) {
    userReceiveHelpHistory(
      first: $first
      last: $last
      before: $before
      after: $after
    ) {
      edges {
        node {
          id
          amount
          paidAmount
          consumerName
          consumerNumber
          receiveLevel
          approvedAt
          statusCode
          hasPartial
          updatedAt
          partialPayments {
            edges {
              node {
                id
                amount
                updatedAt
                status
              }
            }
          }
        }
      }
      pageInfo {
        hasPreviousPage
        startCursor
        hasNextPage
        endCursor
      }
    }
  }
`;

export const RECENT_RECEIVE_HELP_LIST = gql`
  query recentReceiveHelpHistory(
    $first: Int
    $last: Int
    $before: String
    $after: String
  ) {
    recentReceiveHelpHistory(
      first: $first
      last: $last
      before: $before
      after: $after
    ) {
      edges {
        node {
          id
          amount
          createdAt
          username
          name
          status
          createdAt
          updatedAt
        }
      }
      pageInfo {
        hasPreviousPage
        startCursor
        hasNextPage
        endCursor
      }
    }
  }
`;

export const PROCESSING_FEE = gql`
  query {
    processingFeeHistory {
      transactionId
      upiTxnId
      requestedAt
      amount
      paidDate
      status
    }
  }
`;
