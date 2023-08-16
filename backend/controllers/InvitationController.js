const User = require("../model/User");

const sendInvitation = async (senderId, receiverId) => {
  try {
    const sender = await User.findOne({ userId: senderId }).exec();
    const receiver = await User.findOne({ userId: receiverId }).exec();

    sender.sentInvitations.push(receiverId);
    receiver.receivedInvitations.push(senderId);
    await sender.save();
    await receiver.save();
    return {
      status: "Invitation sent successfully",
      receiverSocketId: receiver.socketIoId,
      senderUser: sender,
      receiverUser: receiver,
    };
  } catch (err) {
    throw err;
  }
};

const deleteInvitation = async (senderId, receiverId) => {
  try {
    const sender = await User.findOne({ userId: senderId }).exec();
    const receiver = await User.findOne({ userId: receiverId }).exec();

    sender.sentInvitations = sender.sentInvitations.filter(
      (id) => id !== receiverId
    );
    receiver.receivedInvitations = receiver.receivedInvitations.filter(
      (id) => id !== senderId
    );
    await sender.save();
    await receiver.save();
    return {
      status: "Invitation deleted successfully",
      receiverSocketId: receiver.socketIoId,
      senderUser: sender,
      receiverUser: receiver,
    };
  } catch (err) {
    throw err;
  }
};

const acceptInvitation = async (senderId, receiverId) => {
  try {
    const sender = await User.findOne({ userId: senderId }).exec();
    const receiver = await User.findOne({ userId: receiverId }).exec();

    sender.friends.push(receiverId);
    receiver.friends.push(senderId);
    await sender.save();
    await receiver.save();
    return {
      status: "Invitation accepted successfully",
      senderSocketId: sender.socketIoId,
      senderUser: sender,
      receiverUser: receiver,
    };
  } catch (err) {
    throw err;
  }
};

const deleteFriend = async (senderId, receiverId) => {
  const sender = await User.findOne({ userId: senderId }).exec();
  const receiver = await User.findOne({ userId: receiverId }).exec();
  sender.friends = sender.friends.filter((id) => id !== receiverId);
  receiver.friends = receiver.friends.filter((id) => id !== senderId);
  await sender.save();
  await receiver.save();
  return {
    status: "Friend deleted successfully",
    receiverSocketId: receiver.socketIoId,
    senderUser: sender,
    receiverUser: receiver,
  };
};
module.exports = {
  sendInvitation,
  deleteInvitation,
  acceptInvitation,
  deleteFriend,
};
