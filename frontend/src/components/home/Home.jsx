import React, { useContext, useEffect, useState } from "react";
import SideBar from "../Sidebar/SideBar";
import MainSection from "./MainSection/MainSection";
import { Routes, Route } from "react-router";
import Profile from "./Profile/Profile";
import EditProfile from "./Profile/EditProfile";
import sendRequest from "../Request";
import Notification from "./Notifications/Notifications";
import Notifications from "./Notifications/Notifications";
import OtherUserProfile from "./Profile/OtherUserProfile";
import { io } from "socket.io-client";
import { UserContext } from "../../App";
import Friends from "./Friends/Friends";
import Chat from "./Chat/Chat";
import Messages from "./Chat/Messages";
function Home() {
  const [displayed, setDisplayed] = useState("home");
  const [socket, setSocket] = useContext(UserContext).socket;
  useEffect(() => {
    if (socket) {
      socket.emit("user-connected", localStorage.getItem("email"));
    }
  }, [socket]);
  return (
    <div className="min-h-[100vh] ">
      <SideBar click={[displayed, setDisplayed]} />

      <Routes>
        <Route path="/" element={<MainSection setDisplayed={setDisplayed} />} />

        <Route
          path="/profile"
          element={<Profile setDisplayed={setDisplayed} />}
        />
        <Route path="/profile/:username" element={<OtherUserProfile />} />
        <Route
          path="/editprofile"
          element={<EditProfile setDisplayed={setDisplayed} />}
        />
        <Route
          path="/notifications"
          element={<Notifications setDisplayed={setDisplayed} />}
        />
        <Route
          path="/friends"
          element={<Friends setDisplayed={setDisplayed} />}
        />
        <Route path="/chat" element={<Chat setDisplayed={setDisplayed} />} />
        <Route
          path="/chat/:username"
          element={<Messages setDisplayed={setDisplayed} />}
        />
      </Routes>
    </div>
  );
}

export default Home;
