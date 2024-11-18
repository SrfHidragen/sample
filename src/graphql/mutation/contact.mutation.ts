import { gql } from '@apollo/client';

export const CONTACT_US_MUTATION = gql`
  mutation contactUs(
    $firstName: String
    $whatsAppMob: String
    $message: String
    $stateId: ID
    $districtId: ID
    $panchayathId: ID
    $wardId: ID
    $emailId: String
    $lastName: String
  ) {
    contactUs(
      input: {
        firstName: $firstName
        whatsAppMob: $whatsAppMob
        message: $message
        stateId: $stateId
        districtId: $districtId
        panchayathId: $panchayathId
        wardId: $wardId
        emailId: $emailId
        lastName: $lastName
      }
    ) {
      statusCode
      errors
      message
      data
    }
  }
`;
