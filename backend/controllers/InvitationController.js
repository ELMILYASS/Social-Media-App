const User = require("../model/User");

const sendInvitation = async (senderId, receiverId) => {
  try {
    const sender = await User.findOne({ userId: senderId }).exec();
    const receiver = await User.findOne({ userId: receiverId }).exec();
   
    sender.sentInvitations.push(receiverId);
    console.log("new lkust ",sender.sentInvitations)
    receiver.receivedInvitations.push(senderId);
    await sender.save();
    await receiver.save();
    return {
      status: "Invitation sent successfully",
      receiverSocketId: receiver.socketIoId,
    };
  } catch (err) {
    console.log(err);
    return err.message;
  }
};

module.exports = { sendInvitation };
