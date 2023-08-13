const Post = require("../model/Posts");
const path = require("path");
const fileSizeLimiter = require("../middleware/fileSizeLimiter");
const fileExtLimiter = require("../middleware/fileExtLimiter");
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

module.exports = { addPost };
