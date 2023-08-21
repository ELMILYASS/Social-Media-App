const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const chatSchema = new Schema({
  messageId: {
    type: mongoose.Types.ObjectId,
    auto: true,
  },
  senderId: {
    type: mongoose.Types.ObjectId,
  },
  receiverId: {
    type: mongoose.Types.ObjectId,
  },
  content: String,
  createdAt: Date,
  isSeen: Boolean, //by receiver
});

module.exports = mongoose.model("Chat", chatSchema);
