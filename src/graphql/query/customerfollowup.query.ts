import { gql } from '@apollo/client';

// customer followup
export const GET_MY_INVITATIONS = gql`
  query {
    myInvitations {
      id
      customerName
      aadharcardNumber
      isActive
      createdAt
      isPmfPaid
      mobile
    }
  }
`;
