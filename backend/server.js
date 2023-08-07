require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const connectDB = require("./config/dbConnect");
const verifyJwt = require("./middleware/VerifyJwt");
const corsOptions = require("./config/corsOptions");
const cookieParser = require("cookie-parser");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./controllers/appController");
const PORT = process.env.PORT | 3006;
//Connect to db
connectDB();
app.use(cookieParser());
app.use(express.json());
app.use(cors(corsOptions));
app.get("/", (req, res) => {
  res.clearCookie("jwt");
  res.send("cookie cleared");
});
app.use("/register", require("./routes/register"));
app.use("/auth", require("./routes/authenticate"));
app.use("/refresh", require("./routes/refresh"));
app.use("/logout", require("./routes/logout"));

app.use(verifyJwt); //to verify server EndPoints
app.use("/verify", require("./routes/verifyToken")); //to permit frontend to verify if user has always access to the app
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  // Start listening for incoming requests once the connection is established
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});

// Event listener for connection error
mongoose.connection.on("error", (err) => {
  console.error("Error connecting to MongoDB:", err.message);
  // If there's an error connecting to MongoDB, stop listening for incoming requests
  // You can also perform any other necessary actions or cleanup here if needed.
  process.exit(1); // This will exit the Node.js process with a non-zero exit code (indicating an error).
});
