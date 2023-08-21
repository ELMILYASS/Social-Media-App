const User = require("../model/User");
const newMessage = async (senderId, receiverId) => {
  const receiver = await User.findOne({ userId: receiverId }).exec();

  receiver.notifications.push({
    createdAt: new Date().toString(),

    userId: senderId,
    status: "new-message",
    message: `has sent you a message `,
    isSeen: false,
  });

  await receiver.save();
  return receiver.socketIoId;
};

const userConnected = async (userEmail) => {
  const user = await User.findOne({ email: userEmail }).exec();
  let socketIds = [];

  for (const friendId of user.friends) {
    const user = await User.findOne({ userId: friendId }).exec();
    socketIds.push(user.socketIoId);
  }

  return { socketIds, userId: user.userId };
};

module.exports = {
  newMessage,
  userConnected,
};
