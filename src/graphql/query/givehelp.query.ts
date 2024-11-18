import { gql } from '@apollo/client';

export const GET_GIVEHELP_PAYMENT_AMOUNT = gql`
  query {
    getPaymentAmount {
      helpAmount
      nextApproachAmount
    }
  }
`;

export const GET_USER_PLAN = gql`
  query {
    getUserPlans {
      versions
      initialGiveHelpLevel
      amount
      paidStatus
    }
  }
`;
