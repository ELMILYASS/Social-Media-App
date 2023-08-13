const express = require("express");
// const fileUpload = require("express-fileupload");
// const fileExtLimiter = require("../middleware/fileExtLimiter");
// const fileSizeLimiter = require("../middleware/fileSizeLimiter");
const postController = require("../controllers/postController");
const fileUpload = require("express-fileupload");
const router = express.Router();

router.post(
  "/",
  postController.addPost
);

module.exports = router;
