const bcrypt = require("bcrypt");
const path = require("path");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const User = require("../model/User");
const handleUserAuth = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Email and Password are required" });
  }
  const existentUser = await User.findOne({ email: email }).exec();
  if (!existentUser) {
    return res.status(401).json({ message: "No user with this Email" });
  }
  try {
    const match = await bcrypt.compare(password, existentUser.password);
    if (match) {
      //create JWT
      // create access and refresh tokens (string)

      const accessToken = jwt.sign(
        {
          UserInfo: {
            email: existentUser.email,
          },
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "3s" }
      );
      const refreshToken = jwt.sign(
        { email: existentUser.email },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: "1d" }
      );
      // storing the refresh token with each user logged in ,

      existentUser.refreshToken = refreshToken;
      const result = await existentUser.save();

      //Sending the refresh token as a secret cookie prevents it from being accessed using JS, thus providing protection against CSRF or XSS attacks. The cookie will be sent to the client's browser as a response and stored there for the specified duration. With each subsequent request from the client to the server, the cookie will be automatically included, ensuring smooth authentication and authorization processes.
      res.cookie("jwt", refreshToken, {
        // sameSite: "None",
        // secure: true,  //only in production
        // httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
      });
      
      res.cookie("a", "abcaib");

      //Sending the access token : the front end developer must store the access token on the memory and not in the localStorage or cookies ( accessible with JS (CSRF))
      res.json({ accessToken });
    } else {
      res.status(401).json({ message: "Incorrect Password" });
    }
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

module.exports = { handleUserAuth };
