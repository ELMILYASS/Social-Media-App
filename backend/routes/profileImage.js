const express = require("express");
const fileUpload = require("express-fileupload");
const fileExtLimiter = require("../middleware/fileExtLimiter");
const fileSizeLimiter = require("../middleware/fileSizeLimiter");
const router = express.Router();
const profileImageController = require("../controllers/profileImageController");
router.post(
  "/",
  fileUpload({ createParentPath: true }),
  fileExtLimiter([".png", ".jpg", ".jpeg"]),
  fileSizeLimiter,
  profileImageController.updateImage
);

router.get(
  "/:userId",
  fileUpload({ createParentPath: true }),

  profileImageController.getImage
);
module.exports = router;
