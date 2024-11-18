import { gql } from '@apollo/client';

export const SITE_CONTENTS = gql`
  query siteContents(
    $languageCode: String
    $isConsumer: Boolean
    $policyType: String
  ) {
    siteContents(
      languageCode: $languageCode
      isConsumer: $isConsumer
      policyType: $policyType
    ) {
      id
      content
      isConsumer
      language {
        id
        code
      }
      policy {
        name
        type
      }
    }
  }
`;

// my account
export const GET_ACCOUNT_DETAILS = gql`
  query {
    account {
      bank {
        name
        accountNo
        ifsc
        bankName
        branch
        primaryUpi
        secondaryUpi
      }
      address {
        state
        district
        panchayath
        ward
      }
      basic {
        name
        consumerNo
        createdAt
        aadhaarNumber
        designation
        pan
        mobile
        whatsapp
        alternativeMobile
      }
    }
  }
`;

export const GET_LANGUAGE = gql`
  query {
    languages {
      id
      code
      name
    }
  }
`;

export const FETCH_GEO_BY_STATE_DISTICT = gql`
  query geoByState(
    $stateId: String
    $districtId: String
    $panchayathId: String
  ) {
    geoByState(
      stateId: $stateId
      districtId: $districtId
      panchayathId: $panchayathId
    ) {
      states {
        id
        name
      }
      districts {
        id
        name
      }
      panchayaths {
        id
        name
      }
      wards {
        id
        name
        number
      }
    }
  }
`;
