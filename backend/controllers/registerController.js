const bcrypt = require("bcrypt");
const User = require("../model/User");

const handleNewUser = async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({ message: "All fields are required !!!" });
  }
  const existentUser = await User.findOne({ email: email }).exec();
  if (existentUser) {
    return res
      .status(409)
      .json({ message: "The Email you provided is for another user" });
  }
  const usernameExist = await User.findOne({ username: username });
  if (usernameExist) {
    return res
      .status(409)
      .json({
        message:
          "The Username you provided is for another user, Try another username",
      });
  }
  try {
    const hashedPwd = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      email: email,
      username: username,
      password: hashedPwd,
    });
    return res.status(201).json({ success: `New user ${username} created` });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports = {handleNewUser};
