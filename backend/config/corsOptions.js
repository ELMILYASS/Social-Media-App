//Define the authorized domains to request your server
const whiteList = require("./allowedOrigins");

const corsOptions = {
  origin: function (origin, callback) {
    if (whiteList.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },

  credentials: true, // Allow credentials (cookies) to be included in the request
};

module.exports = corsOptions;
