import { gql } from '@apollo/client';

// customer followup
export const CUSTOMER_FOLLOWUP_MUTATION = gql`
  mutation CreateInvitation(
    $customerName: String!
    $aadharcardNumber: String!
    $mobile: String!
  ) {
    createInvitation(
      input: {
        customerName: $customerName
        aadharcardNumber: $aadharcardNumber
        mobile: $mobile
      }
    ) {
      message
      statusCode
      data {
        id
        aadharcardNumber
        customerName
      }
    }
  }
`;

export const EDIT_CUSTOMER_FOLLOWUP_MUTATION = gql`
  mutation updateInvitedAadharInfo(
    $invitedAadharcardInfoId: String
    $newAadharcardNumber: String
    $newPhoneNumber: String
    $newCustomerName: String
  ) {
    updateInvitedAadharInfo(
      input: {
        invitedAadharcardInfoId: $invitedAadharcardInfoId
        newAadharcardNumber: $newAadharcardNumber
        newPhoneNumber: $newPhoneNumber
        newCustomerName: $newCustomerName
      }
    ) {
      data {
        id
        customerName
        aadharcardNumber
        mobile
        isActive
      }
      message
      errors
      statusCode
    }
  }
`;

// customer followup remove
export const DELETE_INVITATION = gql`
  mutation DeleteInvitation($id: ID) {
    deleteInvitation(input: { id: $id }) {
      data
    }
  }
`;
