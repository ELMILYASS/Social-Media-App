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
  console.log("new receiver", receiver);
  await receiver.save();
  return receiver.socketIoId;
};

module.exports = {
  newMessage,
};
