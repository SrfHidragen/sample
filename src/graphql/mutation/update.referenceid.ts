import { gql } from '@apollo/client';

export const UPDATE_REFERENCE_MUTATION = gql`
  mutation updateReference($referenceUsername: String) {
    updateReference(input: { referenceUsername: $referenceUsername }) {
      statusCode
      errors
      message
    }
  }
`;
