const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifyJwt = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  if (!authHeader?.startsWith("Bearer "))
    return res.status(404).json({ message: "No access token was sent !" }); // Unauthorized
  console.log(authHeader); // Bearer token
  const token = authHeader.split(" ")[1]; //or  authHeader.slice(7)
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) return res.sendStatus(403);
    req.email = decoded.UserInfo.email;

    next();
  });
};

module.exports = verifyJwt;
