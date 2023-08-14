const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    auto: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  friends: {
    type: Array,
    default: [],
  },
  refreshToken: String,
  dateOfBirth: String,
  country: String,
  city: String,
  sentInvitations: {
    type: Array,
    default: [],
  },
  receivedInvitations: {
    type: Array,
    default: [],
  },
  description: String,
  image: {
    type: String,
    default: "",
  },
  socketIoId: String,
});

module.exports = mongoose.model("Users", userSchema);
