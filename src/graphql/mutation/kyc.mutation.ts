import { gql } from '@apollo/client';

// Step 0

export const DIGI_LOCKER_INITIATE = gql`
  mutation createDigiLockerRequest($url: String) {
    createDigiLockerRequest(input: { url: $url }) {
      errors
      message
      statusCode
      data {
        id
        status
        url
      }
    }
  }
`;

//Step 1
export const GET_KYC_REQUEST_ID = gql`
  mutation createKycRequest {
    createKycRequest(input: { url: "https://giventake.world" }) {
      errors
      message
      statusCode
      data {
        id
        status
      }
    }
  }
`;

//Step 2
export const GET_CAPTCHA = gql`
  mutation initiateKycRequest($id: String) {
    initiateKycRequest(input: { id: $id }) {
      errors
      message
      statusCode
      data {
        captchaImage
      }
    }
  }
`;

//Step 3
export const AADHAR_WITH_CAPTCHA_SUBMIT = gql`
  mutation verifyAadhaarWithCaptcha(
    $id: String
    $aadhaarNumber: String
    $captchaCode: String
  ) {
    verifyAadhaarWithCaptcha(
      input: {
        id: $id
        aadhaarNumber: $aadhaarNumber
        captchaCode: $captchaCode
      }
    ) {
      errors
      message
      statusCode
      data {
        code
      }
    }
  }
`;

//Step 4
export const COMPLETE_AADHAAR_VERIFICATION = gql`
  mutation completeAadhaarVerification(
    $id: String
    $aadhaarNumber: String
    $otp: String
  ) {
    completeAadhaarVerification(
      input: {
        id: $id
        aadhaarNumber: $aadhaarNumber
        otp: $otp
        shareCode: "1234"
      }
    ) {
      errors
      message
      statusCode
      data {
        status
        aadhaar {
          name
          gender
          maskedNumber
          dateOfBirth
          address {
            careOf
            country
            landmark
            locality
            postOffice
            house
            street
            state
            district
            pin
            district
            vtc
          }
          userProfile {
            unmaskedPhone
          }
        }
      }
    }
  }
`;

//Step 5
export const KYC_ADDRESS_SUBMIT = gql`
  mutation kycAddressSubmit(
    $permanentPincode: String
    $permanentStateId: String
    $permanentDistrictId: String
    $permanentState: String
    $permanentDistrict: String
    $permanentPanchayathId: String
    $permanentWardId: String
    $permanentPanchayath: String
    $permanentWard: String
    $isSame: String
    $livingPincode: String
    $livingStateId: String
    $livingDistrictId: String
    $livingState: String
    $livingDistrict: String
    $livingPanchayathId: String
    $livingWardId: String
    $livingPanchayath: String
    $livingWard: String
    $alternateMobile: String
    $whatsappNumber: String
    $email: String
    $street: String
    $vtc: String
  ) {
    kycAddressSubmit(
      input: {
        permanentPincode: $permanentPincode
        permanentStateId: $permanentStateId
        permanentDistrictId: $permanentDistrictId
        permanentState: $permanentState
        permanentDistrict: $permanentDistrict
        permanentPanchayathId: $permanentPanchayathId
        permanentWardId: $permanentWardId
        permanentPanchayath: $permanentPanchayath
        permanentWard: $permanentWard
        isSame: $isSame
        livingPincode: $livingPincode
        livingStateId: $livingStateId
        livingDistrictId: $livingDistrictId
        livingState: $livingState
        livingDistrict: $livingDistrict
        livingPanchayathId: $livingPanchayathId
        livingWardId: $livingWardId
        livingPanchayath: $livingPanchayath
        livingWard: $livingWard
        alternateMobile: $alternateMobile
        whatsappNumber: $whatsappNumber
        email: $email
        street: $street
        vtc: $vtc
      }
    ) {
      message
      statusCode
      data {
        kyc
      }
    }
  }
`;

//Step 6
export const PAN_SUBMITION = gql`
  mutation verifyPan(
    $pan: String!
    $consent: String
    $reason: String
    $name: String
  ) {
    verifyPan(
      input: { pan: $pan, consent: $consent, reason: $reason, name: $name }
    ) {
      errors
      message
      statusCode
      data {
        verification
        message
        data {
          fullName
        }
      }
    }
  }
`;

//Step-1
export const PAN_SKIP_VERIFICATION = gql`
  query {
    panVerificationSkipped
  }
`;
//Step 7
export const UPDATE_LANGUAGE = gql`
  mutation updateMemberLanguage(
    $communicationLanguage: [String]
    $motherTongue: String
  ) {
    updateMemberLanguage(
      input: {
        communicationLanguage: $communicationLanguage
        motherTongue: $motherTongue
      }
    ) {
      message
      statusCode
    }
  }
`;

//Step 8
export const BANK_VERIFY = gql`
  mutation verifyBank($ifsc: String!, $accountNumber: String!, $name: String!) {
    verifyBank(
      input: { ifsc: $ifsc, accountNumber: $accountNumber, name: $name }
    ) {
      message
      statusCode
      data {
        verification
        bank
        branch
        address
        ifsc
        accountNumber
        data {
          name
        }
      }
    }
  }
`;

//Step 9
export const SUBMIT_BANK = gql`
  mutation (
    $ifsc: String!
    $accountNumber: String!
    $accountHolderName: String
    $bankName: String
    $branch: String
    $bankAddress: String
  ) {
    createKycBankDetails(
      input: {
        ifsc: $ifsc
        accountNumber: $accountNumber
        accountHolderName: $accountHolderName
        bankName: $bankName
        branch: $branch
        bankAddress: $bankAddress
      }
    ) {
      message
      statusCode
      data {
        id
        upiRegisteredAccountNumber
        upiRegisteredBankIfsc
        accountHolderName
        upiRegisteredBankBranch
        upiRegisteredBankName
      }
    }
  }
`;

//Step 10
export const FILE_UPLOAD = gql`
  mutation fileUpload($file: Upload!) {
    fileUpload(input: { imageFile: $file }) {
      message
      errors
      statusCode
      data {
        filePath
      }
    }
  }
`;

// Final Step
export const KYC_FINAL_SUBMIT = gql`
  mutation kyc($profileImage: String) {
    kyc(input: { profileImage: $profileImage }) {
      message
      statusCode
      data {
        kyc
      }
    }
  }
`;
