import { gql } from '@apollo/client';

//login for consumer and customer
export const LOGIN_MUTATION = gql`
  mutation login(
    $username: String!
    $password: String!
    $isConsumer: Boolean!
  ) {
    login(
      input: {
        username: $username
        password: $password
        isConsumer: $isConsumer
      }
    ) {
      message
      statusCode
      data {
        id
        token
        userDetails {
          invitedBy {
            firstName
          }
          username
          totalReceived
          isInitialPmfPaid
          totalSpend
          id
          isKycFilled
          userType
          userPlan
          pmf
          tax
          walletBalance
          personal {
            id
            avatar
            firstName
            communicationLanguage {
              id
              code
              name
            }
          }
          address {
            id
            postalCode
          }
          parent {
            firstName
            totalReceived
            lastName
            totalSpend
            username
          }
          notifications {
            existingMemberName
            topicId
            id
            existingMemberPhoneNumber
            message
          }
          avatar
          kycCompletion {
            isBank
            isAddress
            isPan
            isAadhaar
            isSelfie
          }
        }
      }
    }
  }
`;

// forgot consumership No
export const FORGOT_CONSUMERSHIPNUMBER_MUTATION = gql`
  mutation forgotUsername($phoneNumber: String!) {
    forgotUsername(input: { phoneNumber: $phoneNumber }) {
      message
      data
      statusCode
    }
  }
`;

// request otp to registered users -> action like forgot password
export const REQUEST_OTP_TO_REGISTERED = gql`
  mutation sendOtpToRegistered($phone: String!) {
    sendOtpToRegistered(input: { phone: $phone }) {
      statusCode
      message
      data {
        otp
        phone
      }
    }
  }
`;

//new password setup
export const SUBMIT_NEW_PASSWORD = gql`
  mutation forgotPassword($phoneNumber: String!, $password: String!) {
    forgotPassword(input: { phoneNumber: $phoneNumber, password: $password }) {
      message
      statusCode
      data
    }
  }
`;

export const SEND_OTP_EVERYONE = gql`
  mutation sendOtpToEveryone($phone: String!) {
    sendOtpToEveryone(input: { phone: $phone }) {
      statusCode
      message
      data {
        otp
        phone
      }
    }
  }
`;

// otp verification
export const OTP_VERIFICATION = gql`
  mutation verifyOtp($phone: String!, $otp: String!) {
    verifyOtp(input: { phone: $phone, otp: $otp }) {
      message
      statusCode
    }
  }
`;

//Registration
export const REGISTRATION_OTP = gql`
  mutation sendRegistrationOtp($phone: String!) {
    sendRegistrationOtp(input: { phone: $phone }) {
      message
      statusCode
      data {
        otp
        phone
      }
    }
  }
`;

//final submit
export const REGISTER_SUBMIT = gql`
  mutation register(
    $phone: String
    $communicationLanguage: [String]
    $motherTongue: String
    $password: String
    $name: String
    $termsId: Int
  ) {
    register(
      input: {
        phone: $phone
        communicationLanguage: $communicationLanguage
        motherTongue: $motherTongue
        password: $password
        name: $name
        termsId: $termsId
      }
    ) {
      message
      statusCode
      data {
        id
        token
        userDetails {
          invitedBy {
            firstName
          }
          username
          totalReceived
          isInitialPmfPaid
          totalSpend
          id
          isKycFilled
          userType
          pmf
          tax
          walletBalance
          personal {
            id
            firstName
            communicationLanguage {
              id
              code
              name
            }
          }
          address {
            id
            postalCode
          }
          parent {
            firstName
            totalReceived
            lastName
            totalSpend
            username
          }
          notifications {
            existingMemberName
            topicId
            id
            existingMemberPhoneNumber
            message
          }
          avatar
          kycCompletion {
            isBank
            isAddress
            isPan
            isAadhaar
            isSelfie
          }
        }
      }
    }
  }
`;
