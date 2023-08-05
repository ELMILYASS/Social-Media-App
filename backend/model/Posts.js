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
  content: String, // Contenu textuel de la publication (optional)
  image: String, // URL de l'image associée à la publication (optional)
  video: String,

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
        video: String, // URL de la vidéo associée au commentaire (optional)
        createdAt: Date, // Date de création du commentaire
      },
    ],
    default: [],
  },

  createdAt: Date,
  updatedAt: Date,
});

module.exports = mongoose.model("Posts", postSchema);
