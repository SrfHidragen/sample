import { gql } from '@apollo/client';

export const GET_CUSTOMER_INITIAL_APPROACH = gql`
  query {
    getCustomerGiveHelpList {
      id
      versions
      amount
      transactionId
      payments {
        id
        amount

        member {
          id
          avatar
          name
          username

          address {
            addressLine1
            addressLine2
            city
            state
            district
            panchayath
            ward
            houseNo
            street
            postalCode
          }
          bankDetails {
            upiRegisteredAccountNumber
            upiRegisteredBankIfsc
            accountHolderName
            upiRegisteredBankBranch
            upiRegisteredBankName
          }
        }
      }
    }
  }
`;
