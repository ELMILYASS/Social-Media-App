const jwt = require("jsonwebtoken");

require("dotenv").config();

const User = require("../model/User");

const handleRefreshToken = async (req, res) => {
  const cookies = req.cookies;

  if (!cookies?.jwt)
    return res.status(401).json({ message: "No refresh token was sent " });

  const refreshToken = cookies.jwt;

  const foundUser = await User.findOne({ refreshToken: refreshToken }).exec();

  if (!foundUser) res.status(403).json({ message: "Unauthorized" });
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err || decoded.email !== foundUser?.email)
      return res
        .status(403)
        .json({ message: "Unauthorized Invalid refresh Token" });

    const accessToken = jwt.sign(
      {
        UserInfo: {
          email: decoded.email,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "30s" }
    );

    return res.json({ accessToken });
  });
};

module.exports = { handleRefreshToken };
