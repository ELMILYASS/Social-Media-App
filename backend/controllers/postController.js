const Post = require("../model/Posts");
const User = require("../model/User");
const path = require("path");
const fs = require("fs");
const zip = require("express-zip");
const fileSizeLimiter = require("../middleware/fileSizeLimiter");
const fileExtLimiter = require("../middleware/fileExtLimiter");
const fsPromises = require("fs").promises;
const archiver = require("archiver");
// upload user image
const addPost = async (req, res) => {
  const info = req.body;

  const files = req.files;
  const userId = info.userId;
  const content = info?.content;

  const imagesFiles = files
    ? files?.images?.length
      ? files?.images
      : [files?.images]
    : undefined;

  // const videosFiles = files.videos;
  const post = new Post();
  post.userId = userId;
  post.content = content;
  post.createdAt = new Date().toString();
  let notAllowedFiles = [];
  const allowedImageExtensions = [".png", ".jpg", ".jpeg"];
  const MB = 5; // 5 MB
  const FILE_SIZE_LIMIT = MB * 1024 * 1024;

  if (imagesFiles) {
    Object.keys(imagesFiles).forEach((key) => {
      const extension = path.extname(imagesFiles[key].name);

      if (
        !allowedImageExtensions.includes(extension) ||
        imagesFiles[key].size >= FILE_SIZE_LIMIT
      ) {
        notAllowedFiles.push(imagesFiles[key].name);
      }
    });

    if (notAllowedFiles.length > 0) {
      const message =
        `Upload failed for ${notAllowedFiles.toString()}. Only ${allowedImageExtensions.toString()} files allowed, and files with size less than ${MB} MB`.replaceAll(
          ",",
          ", "
        );
      return res.status(402).json({
        status: "error",
        message: message,
        notAllowedFiles: notAllowedFiles,
      });
    } else {
      Object.keys(imagesFiles).forEach((key) => {
        const extension = path.extname(imagesFiles[key].name);
        const filepath = path.join(
          __dirname,
          "..",
          "files",
          "posts",
          `${post.postId}`,
          `${imagesFiles[key].md5}${extension}`
        );

        post.images.push(
          `${imagesFiles[key].md5}${path.extname(imagesFiles[key].name)}`
        );
        imagesFiles[key].mv(filepath, async (err) => {
          if (err)
            return res.status(500).json({ status: "error", message: err });
        });
      });
    }
  }
  try {
    const savedPost = await post.save();
    res.json({ status: "success", message: "Post added" });
  } catch (error) {
    console.error("Error saving post:", error);
  }
};

const getPostImages = async (req, res) => {
  const postId = req.params.postId;
  const filesDir = path.join(__dirname, "..", "files", "posts", `${postId}`);
  if (fs.existsSync(filesDir)) {
    try {
      const files = await fsPromises.readdir(filesDir);

      if (files.length === 0) {
        return res.status(404).send("No images found for this post");
      }

      const archiveName = `${postId}.zip`;
      console.log("files", files);
      res.attachment(archiveName);

      const archive = archiver("zip", { zlib: { level: 9 } });
      archive.pipe(res);

      files.forEach((file) => {
        const filePath = path.join(filesDir, file);
        archive.append(fs.createReadStream(filePath), { name: file });
      });

      archive.finalize();
    } catch (err) {
      console.error("Error reading files directory:", err.message);
      res
        .status(500)
        .json({ status: "error", message: "Error reading files directory" });
    }
  } else {
    res.send("No images for that post");
  }
};

const postAdded = async (senderId) => {
  const sender = await User.findOne({ userId: senderId }).exec();

  let socketIds = [];
  for (const friendId of sender.friends) {
    const user = await User.findOne({ userId: friendId }).exec();
    socketIds.push(user.socketIoId);
  }
  console.log(socketIds);
  return { socketIds, sender };
};

const interactionAdded = async (senderId, postId) => {
  const sender = await User.findOne({ userId: senderId }).exec();
  const post = await Post.findOne({ postId: postId }).exec();
  const postOwner = await User.findOne({ userId: post.userId }).exec();
  let socketIds = [];

  for (const friendId of sender.friends) {
    if (postOwner.friends.includes(friendId)) {
      const user = await User.findOne({ userId: friendId }).exec();
      socketIds.push(user.socketIoId);
    }
  }
  if (postOwner.userId !== senderId) {
    if (postOwner.socketIoId) socketIds.push(postOwner.socketIoId);
  }
  console.log({ socketIds, postOwner: postOwner.username });
  return {
    socketIds,
    postOwner: postOwner.username,
    senderUsername: sender.username,
  };
};

const postDeleted = async (postId) => {
  const post = await Post.findOne({ postId: postId }).exec();

  const postOwner = await User.findOne({ userId: post.userId }).exec();
  let socketIds = [];

  for (const friendId of postOwner.friends) {
    const user = await User.findOne({ userId: friendId }).exec();
    socketIds.push(user.socketIoId);
  }

  return socketIds;
};

module.exports = {
  addPost,
  getPostImages,
  postAdded,
  interactionAdded,
  postDeleted,
};
