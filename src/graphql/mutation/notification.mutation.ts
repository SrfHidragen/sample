import { gql } from '@apollo/client';

export const MAKE_NOTIFICATION_VIEWED = gql`
  mutation makeNotificationView($notificationId: String) {
    makeNotificationView(input: { notificationId: $notificationId }) {
      errors
      message
      statusCode
    }
  }
`;
