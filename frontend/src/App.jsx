import React, { useEffect, useMemo, useState } from "react";
import "./input.css";
import Sign from "./components/sign/Sign";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RequireAuth from "./routes/RequiredAuth";
import axios from "axios";
import Home from "./components/home/Home";
import { io } from "socket.io-client";
import { createContext } from "react";
import defaultImage from "../src/images/default profile image.jpg";
import { sendAxiosRequest } from "./components/Request";
export const UserContext = createContext();

function App() {
  const [user, setUser] = useState(null);
  const [connected, setConnected] = useState(false);
  const [socket, setSocket] = useState(null);
  const [changeAddPost, setChangeAddPost] = useState(false);
  const [imageURL, setImageURL] = useState("");
  console.log("user is ", user);
  // console.log("socket is ", socket);
  useEffect(() => {
    socket?.on("accepted-invitation", (sender, receiver) => {
      setUser(sender);
      console.log(
        receiver.username,
        " has accepted the invitation that you sent to him"
      );
    });
    socket?.on("error", (error) => console.log(error));

    socket?.on("deleted-invitation", (sender, receiver) => {
      setUser(receiver);
      console.log(
        sender.username,
        " has deleted the invitation that he sent to you"
      );
    });

    socket?.on("new-invitation", (sender, receiver) => {
      setUser(receiver);
      console.log("You have received a new Invitation from ", sender.username);
    });
    socket?.on("deletion-friend", (sender, receiver) => {
      console.log("sender( who delete )", sender);
      console.log("receiver", receiver);
      setUser(receiver);
      console.log(`${sender.username} has deleted you from his friends `);
    });
    socket?.on("post-added", (username) => {
      setChangeAddPost((prev) => !prev);
      console.log(`${username} has added a new Post`);
    });
    socket?.on("interaction-added", (object) => {
      setChangeAddPost((prev) => !prev);
      console.log(object);
    });

    socket?.on("comment-changed", (object) => {
      setChangeAddPost((prev) => !prev);
      console.log("hahah", object);
    });
    socket?.on("post-deleted", () => {
      setChangeAddPost((prev) => !prev);
      console.log("post deleted");
    });
  }, [socket]);
  useEffect(() => {
    async function uploadImage(userId) {
      const file = await sendAxiosRequest("GET", `profileimage/${userId}`);
      return file;
    }
    if (user?.image) {
      uploadImage(user.userId).then((data) =>
        setImageURL(URL.createObjectURL(data.data))
      );
    } else {
      setImageURL(defaultImage);
    }
  }, [user]);

  return (
    <UserContext.Provider
      value={{
        user: [user, setUser],
        image: [imageURL, setImageURL],
        socket: [socket, setSocket],
        connected: [connected, setConnected],
        changedAddedPost: [changeAddPost, setChangeAddPost],
      }}
    >
      <Router>
        <Routes>
          <Route element={<RequireAuth />}>
            <Route path="/" element={<Sign />} />
            <Route path="/home/*" element={<Home />} />
          </Route>
        </Routes>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
