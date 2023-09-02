import { sendRequest } from "../routes/Request";

export const sendMessage = async (senderId, receiverId, content) => {
  const query = `
    mutation sendMessage($senderId: ID!, $receiverId: ID!, $content: String) {
      sendMessage(senderId: $senderId, receiverId: $receiverId, content: $content) {
       senderId
       receiverId
       content
       createdAt
       isSeen

      }
    }
  `;

  try {
    const res = await sendRequest(query, {
      senderId: senderId,
      receiverId: receiverId,
      content: content,
    });

    return res.data.data.sendMessage;
  } catch (err) {
    console.log(err);
  }
};

export const getMessages = async (userId) => {
  const query = `
      query getUserMessages($userId: ID!) {
        getUserMessages(userId: $userId) {
        senderId
         receiverId
         content
         createdAt
         isSeen
  
        }
      }
    `;

  try {
    const res = await sendRequest(query, {
      userId: userId,
    });

    return res.data.data.getUserMessages;
  } catch (err) {
    console.log(err);
  }
};

export const getMessagesWith = async (userOneId, userTwoId) => {
  const query = `
        query  getMessagesWith($userOneId: ID! , $userTwoId: ID!) {
            getMessagesWith(userOneId: $userOneId, userTwoId: $userTwoId) {
                senderId
                receiverId
                content
                createdAt
                isSeen
              }
        }
      `;

  try {
    const res = await sendRequest(query, {
      userOneId: userOneId,
      userTwoId: userTwoId,
    });
    // console.log("result is aaaa", res);
    return res.data.data.getMessagesWith;
  } catch (err) {
    console.log(err);
  }
};

export const getLastMessage = async (userOneId, userTwoId) => {
  const query = `
        query  getLastMessage($userOneId: ID! , $userTwoId: ID!) {
            getLastMessage(userOneId: $userOneId, userTwoId: $userTwoId) {
                senderId
                receiverId
                content
                createdAt
                isSeen
              }
        }
      `;

  try {
    const res = await sendRequest(query, {
      userOneId: userOneId,
      userTwoId: userTwoId,
    });

    return res.data.data.getLastMessage;
  } catch (err) {
    console.log(err);
  }
};

export const seenMessages = async (userId, friendId) => {
  const query = `
        mutation  seenMessages($userId: ID! , $friendId: ID!) {
            seenMessages(userId: $userId, friendId: $friendId) {
                senderId
                receiverId
                content
                createdAt
                isSeen
              }
        }
      `;

  try {
    const res = await sendRequest(query, {
      userId: userId,
      friendId: friendId,
    });

    return res.data.data.seenMessages;
  } catch (err) {
    console.log(err);
  }
};
