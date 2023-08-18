const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const postSchema = new Schema({
  postId: {
    type: mongoose.Types.ObjectId,
    auto: true,
  },
  userId: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  content: String,
  images: {
    type: [String],
  },
  videos: {
    type: [String],
  },

  likes: {
    type: [
      {
        userId: mongoose.Types.ObjectId,
        emoji: String,
      },
    ],
    default: [],
  },
  comments: {
    type: [
      {
        commentId: {
          type: mongoose.Types.ObjectId,
          auto: true,
        },
        userId: mongoose.Types.ObjectId,
        content: String,
        // image: String, // URL de l'image associée au commentaire (optional)
        createdAt: Date,
      },
    ],
    default: [],
  },

  createdAt: Date,
  updatedAt: Date,
});

module.exports = mongoose.model("Posts", postSchema);
