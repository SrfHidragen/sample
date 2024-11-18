import { gql } from '@apollo/client';

export const NOTIFICATIONS_QUERY = gql`
  query {
    allNotifications(first: 100) {
      items {
        id
        image
        title
        description
        createdAt
        isRead
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
        endCursor
      }
    }
  }
`;

export const MAKE_NOTIFICATION_VIEW = gql`
  mutation MakeNotificationView($notificationId: String!) {
    makeNotificationView(input: { notificationId: $notificationId }) {
      errors
      message
      statusCode
    }
  }
`;
