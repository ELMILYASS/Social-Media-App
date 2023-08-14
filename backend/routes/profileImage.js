const express = require("express");
const fileUpload = require("express-fileupload");
const fileExtLimiter = require("../middleware/fileExtLimiter");
const fileSizeLimiter = require("../middleware/fileSizeLimiter");
const router = express.Router();
const profileImageController = require("../controllers/profileImageController");
router.post(
  "/",

  fileExtLimiter([".png", ".jpg", ".jpeg"]),
  fileSizeLimiter,
  profileImageController.updateImage
);

router.get(
  "/:userId",

  profileImageController.getImage
);
module.exports = router;
