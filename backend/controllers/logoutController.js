const User = require("../model/User");
const handleLogout = async (req, res) => {
  //Also on the Client we should delete the access token
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.status(204); //Success but no content , that's mean that there is no more refresh token in cookies

  const refreshToken = cookies.jwt;

  const foundUser = await User.findOne({ refreshToken }).exec();
  if (!foundUser) {
    //There is a cookie but no client so we must delete the cookie from the browser
    res.clearCookie("jwt", {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    return res.sendStatus(204);
  }
  //delete refresh token from db
  foundUser.refreshToken = "";
  const result = await foundUser.save();

  res.clearCookie("jwt", {
    httpOnly: true,
    secure: true,
    sameSite: "None",
  });
  res.sendStatus(204);
};

module.exports = {handleLogout};
