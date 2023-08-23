import { sendRequest } from "../components/Request";

export const NotificationSeen = async (userId, notificationIds) => {
  const query = `
    mutation notificationSeen($userId: ID!, $notificationIds: [ID]! ) {
      notificationSeen(userId: $userId, notificationIds: $notificationIds) {
        userId
        email
        dateOfBirth
        country
        city
        image
        description
        friends
        username
        sentInvitations
        receivedInvitations
        notifications{
          userId
          postId
          message
          createdAt
          isSeen
          notificationId
          status
        }

      }
    }
  `;

  try {
    const res = await sendRequest(query, {
      userId: userId,
      notificationIds: notificationIds,
    });

    return res.data.data.notificationSeen;
  } catch (err) {
    console.log(err);
  }
};
