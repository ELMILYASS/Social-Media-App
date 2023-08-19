const User = require("../model/User");
const path = require("path");

// upload user image
const updateImage = async (req, res) => {
  // console.log("server ");
  const userId = req.body.userId;
  const file = req.files;

  try {
    const user = await User.findOne({ userId: userId }).exec();
    Object.keys(file).forEach((key) => {
      const filepath = path.join(
        __dirname,
        "..",
        "files",
        "profileImages",
        `${file[key].md5}${path.extname(file[key].name)}`
      );

      user.image = `${file[key].md5}${path.extname(file[key].name)}`;
      //mv function allow to upload a file on the server
      file[key].mv(filepath, async (err) => {
        if (err) return res.status(500).json({ status: "error", message: err });
        else {
          const userUpdated = await user.save();
          res.status(200).json({ status: "success", message: file[key].md5 });
        }
      });
    });
  } catch (err) {
    res.status(500).json({ status: "error", message: err });
  }
};

const getImage = async (req, res) => {
  const userId = req.params.userId;

  const user = await User.findOne({ userId: userId }).exec();

  const imageFileName = user.image;

  if (imageFileName) {
    const imagePath = path.join(
      __dirname,
      "..",
      "files",
      "profileImages",
      imageFileName
    );

    return res.sendFile(imagePath);
  }
 
  return res.json({ message: "User doesn't have a profile image" });
};

module.exports = { updateImage, getImage };
