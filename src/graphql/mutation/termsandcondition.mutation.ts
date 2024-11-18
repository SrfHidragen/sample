import { gql } from '@apollo/client';

export const UPDATE_TERMS_AND_CONDITION = gql`
  mutation updateTermsVersion($termsId: Int) {
    updateTermsVersion(input: { termsId: $termsId }) {
      message
      data {
        termsId
      }
      statusCode
    }
  }
`;

export const UPDATE_CONTACT_NUMBER = gql`
  mutation updateSecondaryNumber($contactNumber: String) {
    updateSecondaryNumber(input: { contactNumber: $contactNumber }) {
      errors
      message
      statusCode
      data {
        contactNumber
      }
    }
  }
`;
