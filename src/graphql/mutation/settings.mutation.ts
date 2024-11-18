import { gql } from '@apollo/client';

export const EMAIL_UPDATE_MUTATION = gql`
  mutation emailChangeGenerator($email: String) {
    emailChangeGenerator(input: { email: $email }) {
      errors
      message
      data
      statusCode
    }
  }
`;

export const GET_OTP_FOR_CHANGE_MOBILE = gql`
  mutation initiateChangeMobile($oldMobile: String, $newMobile: String) {
    initiateChangeMobile(
      input: { oldMobile: $oldMobile, newMobile: $newMobile }
    ) {
      errors
      message
      statusCode
      data {
        otp
        phone
      }
    }
  }
`;

export const SUBMIT_CHANGE_MOBILE_OTP = gql`
  mutation changeMobile($oldMobile: String, $newMobile: String, $otp: String) {
    changeMobile(
      input: { oldMobile: $oldMobile, newMobile: $newMobile, otp: $otp }
    ) {
      errors
      message
      statusCode
      data
    }
  }
`;

export const RESET_PASSWORD = gql`
  mutation resetPassword($oldPassword: String, $newPassword: String) {
    resetPassword(
      input: { oldPassword: $oldPassword, newPassword: $newPassword }
    ) {
      errors
      message
      data
      statusCode
    }
  }
`;
