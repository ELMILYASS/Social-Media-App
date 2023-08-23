const User = require("../model/User");

const sendInvitation = async (senderId, receiverId) => {
  try {
    const sender = await User.findOne({ userId: senderId }).exec();
    const receiver = await User.findOne({ userId: receiverId }).exec();

    sender.sentInvitations.push(receiverId);
    receiver.receivedInvitations.push(senderId);
    receiver.notifications.push({
      status: "invitation-received",
      message: `has sent you an invitation`,
      createdAt: new Date().toString(),
      userId: senderId,
      isSeen: false,
    });
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

    receiver.notifications.push({
      status: "invitation-deleted",
      message: `has deleted the invitation he sent to you`,
      createdAt: new Date().toString(),
      userId: senderId,
      isSeen: false,
    });
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
    sender.sentInvitations = sender.sentInvitations.filter(
      (id) => id !== receiverId
    );
    receiver.receivedInvitations = receiver.receivedInvitations.filter(
      (id) => id !== senderId
    );
    sender.friends.push(receiverId);
    receiver.friends.push(senderId);
    sender.notifications.push({
      status: "invitation-accepted",
      message: `has accepted your invitation`,
      createdAt: new Date().toString(),
      userId: receiverId,
      isSeen: false,
    });
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
  receiver.notifications.push({
    status: "friend-deletion",
    message: `has removed you from his friends`,
    createdAt: new Date().toString(),
    userId: senderId,
    isSeen: false,
  });

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
