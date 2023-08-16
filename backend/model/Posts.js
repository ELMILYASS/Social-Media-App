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
        userId: mongoose.Types.ObjectId, // Référence à l'utilisateur qui a fait le commentaire
        content: String, // Contenu textuel du commentaire (optional)
        image: String, // URL de l'image associée au commentaire (optional)
        createdAt: Date, // Date de création du commentaire
      },
    ],
    default: [],
  },

  createdAt: Date,
  updatedAt: Date,
});

module.exports = mongoose.model("Posts", postSchema);
