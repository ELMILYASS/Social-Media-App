const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");

const app = express();
const server = http.createServer(app);

const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});
const PORT = process.env.PORT || 3006;

app.use(cors());

app.get("/", (req, res) => {
  res.send("HTTP server is up and running!");
});

io.on("connection", (socket) => {
  console.log(`A user connected with id: ${socket.id}`);

  socket.on("chat-message", (message) => {
    console.log(`Received message: ${message}`);
    // Broadcast the message to all connected clients
    io.emit("chat-message", message);
  });

  socket.on("disconnect", () => {
    console.log(`A user disconnected with id: ${socket.id}`);
  });
});
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
// const app = express();

// const server = http.createServer(app);
// app.use(cors());
// app.get("/", (req, res) => {
//   res.send("Http server");
// });
// const io = socketIo(server, {
//   cors: {
//     origin: "http://localhost:3000",
//   },
// });

// io.on("connection", (socket) => {
//   console.log(`Connected with id : ${socket.id}`);
// });

// app.listen(3006, () => console.log("Server is listening ..."));
// // const io = require("socket.io")(3007, {
// //   cors: {
// //     origin: ["http://localhost:3000"],
// //   },
// // }); // listen for a socket connection on port 3000
