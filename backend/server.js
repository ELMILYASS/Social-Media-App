require("dotenv").config();
const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const mongoose = require("mongoose");
const fileUpload = require("express-fileupload");
const cors = require("cors");
const connectDB = require("./config/dbConnect");
const verifyJwt = require("./middleware/VerifyJwt");
const corsOptions = require("./config/corsOptions");
const {
  sendInvitation,
  deleteInvitation,
  acceptInvitation,
} = require("./controllers/InvitationController");
const cookieParser = require("cookie-parser");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./controllers/appController");
const path = require("path");
const app = express();
const server = http.createServer(app);

const PORT = process.env.PORT | 3006;

//Connect to db
connectDB();
app.use(cookieParser());
app.use(express.json());
app.use(cors(corsOptions));
app.use(fileUpload({ createParentPath: true }));
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

app.use("/profileImage", require("./routes/profileImage"));
app.use("/post", require("./routes/post"));
mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  // Start listening for incoming requests once the connection is established
  server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
  const io = socketIo(server, {
    cors: {
      origin: "http://localhost:3000",
    },
  });

  io.on("connection", (socket) => {
    console.log("A user connected with id: ", socket.id);
    socket.on("send-invitation", async (senderId, receiverId) => {
      // console.log(senderId);
      // console.log(receiverId);
      try {
        const res = await sendInvitation(senderId, receiverId);
        socket.emit("server-response", res);
      } catch (err) {
        console.log(err);
        socket.emit("error", err.message);
      }
    });
    socket.on(
      "send-notification-toReceiver",
      (sender, receiver, receiverSocketId) => {
        io.to(receiverSocketId).emit("new-invitation", sender, receiver);
      }
    );
    socket.on("delete-invitation", async (senderId, receiverId) => {
      // console.log(senderId);
      // console.log(receiverId);
      try {
        const res = await deleteInvitation(senderId, receiverId);
        socket.emit("server-response", res);
      } catch (err) {
        console.log(err);
        socket.emit("error", err.message);
      }
    });
    socket.on(
      "send-DeleteNotification-toReceiver",
      (sender, receiver, receiverSocketId) => {
        io.to(receiverSocketId).emit("deleted-invitation", sender, receiver);
      }
    );
    socket.on("accept-invitation", async (senderId, receiverId) => {
      // console.log(senderId);
      // console.log(receiverId);
      try {
        await deleteInvitation(senderId, receiverId);
        const res = await acceptInvitation(senderId, receiverId);
        socket.emit("server-response", res);
      } catch (err) {
        console.log(err);
        socket.emit("error", err.message);
      }
    });
    socket.on(
      "send-AcceptedNotification-toSender",
      (sender, receiver, senderSocketId) => {
        io.to(senderSocketId).emit("accepted-invitation", sender, receiver);
      }
    );
    socket.on("disconnect", () => {
      console.log("A user disconnected");
    });
  });
});

// Event listener for connection error
mongoose.connection.on("error", (err) => {
  console.error("Error connecting to MongoDB:", err.message);
  // If there's an error connecting to MongoDB, stop listening for incoming requests
  // You can also perform any other necessary actions or cleanup here if needed.
  process.exit(1); // This will exit the Node.js process with a non-zero exit code (indicating an error).
});
