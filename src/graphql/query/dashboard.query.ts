import { gql } from '@apollo/client';

export const DASHBOARD_QUERY = gql`
  query {
    userDetails {
      isUnreadNotifications
      username
      isKycFilled
      isProcessingFeePaid
      totalWithdrawalAmount
      totalReceived
      totalSpend
      isParentAssigned
      approachIsSelected
      isRegistrationCompleted
      paidLevel
      giveAmount
      termsId
      isInitialPmfPaid
      id
      isPendingPayments
      userPlan
      userType
      notifications {
        id
        topicId
        message
      }
      pmf
      isGiveHelpCompleted
      invitedBy {
        firstName
        lastName
        username
        avatar
        id
        totalSpend
        totalReceived
        achievements {
          name
        }
      }
      tax
      walletBalance
      personal {
        avatar
        id
        firstName
        dob
        careOf
        contactNumber
        motherTongue {
          id
          code
          name
        }
        communicationLanguage {
          id
          code
          name
        }
      }
      address {
        id
        postalCode
        postOffice
        street
        panchayathName
        wardName
        stateName
        districtName
        houseNo
      }
      email
      registrationTime
      updateReference
      parent {
        id
        firstName
        totalReceived
        lastName
        totalSpend
        username
        avatar
        achievements {
          name
          id
        }
      }
      notifications {
        existingMemberName
        topicId
        id
        existingMemberPhoneNumber
        message
      }
      avatar
      mobile
      kycCompletion {
        isBank
        isAddress
        isPan
        isAadhaar
        isSelfie
      }
    }
  }
`;

// export const RECEIVE_HELP_LIST = gql`
//   query userReceiveHelpHistory($first: Int, $after: String) {
//     userReceiveHelpHistory(first: $first, after: $after) {
//       items {
//         memberId
//         username
//         name
//         time
//         amount
//         status
//         designation
//       }
//       pageInfo {
//         hasNextPage
//         hasPreviousPage
//         startCursor
//         endCursor
//       }
//       totalPages
//       totalItems
//     }
//   }
// `;

export const GET_RECEIVE_HELP_DATA = gql`
  query GetReceiveHelpData {
    receiveHelpList {
      totalConsumers
      associatesConsumers
      helpedConsumers
      partiallyPaidConsumers
      notInvitedCount
      stages {
        stage
        associatedConsumers
        helpedConsumers
        partiallyPaidConsumers
        notInvitedMembers
        totalConumers
        amount
      }
    }
  }
`;

export const GET_RECEIVE_HELP_TABLE_DETAILS = gql`
  query GetReceiveHelpDetailList($rowNumber: Int!) {
    receiveHelpDetailList(rowNumber: $rowNumber) {
      consumer {
        memberId
        memberName
        status
      }
    }
  }
`;

export const GIVE_HELP_LIST = gql`
  query {
    giveHelpList {
      consumerName
      consumerNumber
      statusCode
      updatedAt
      totalAmount
      pendingAmount
      approvedAt
      paidAmount
      payButton
    }
  }
`;

export const ASSOCIATE_LIST = gql`
  query {
    listAssociates {
      firstName
      consumerNo
      approach
      invitedBy
      enrolledBy
      designation
      createdAt
    }
  }
`;
