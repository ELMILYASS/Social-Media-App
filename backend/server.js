require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT | 3006;
const connectDB = require("./config/dbConnect");
connectDB();
app.use(cors());
app.use(express.json());

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
