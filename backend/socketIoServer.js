const express = require("express");

const app = express();

app.get("/", (res, req) => {
  res.send("Http server");
});

const io = require("socket.io")(3007, {
  cors: {
    origin: ["http://localhost:3000"],
  },
}); // listen for a socket connection on port 3000

io.on("connection", (socket) => {
  console.log(`Connected with id : ${socket.id}`);
});

app.listen(3006, () => console.log("Server is listening ..."));
