import React, { useContext, useEffect, useState } from "react";
import SideBar from "../Sidebar/SideBar";
import MainSection from "./MainSection/MainSection";
import { Routes, Route, useLocation, Navigate } from "react-router";
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
import Error from "../Error";
function Home() {
  const [displayed, setDisplayed] = useState("home");
  const [socket, setSocket] = useContext(UserContext).socket;
  const [isDark, setIdDark] = useContext(UserContext).isDark;

  const style = {
    backgroundColor: isDark ? "#111" : "white",
  };
  useEffect(() => {
    if (socket) {
      socket.emit("user-connected", localStorage.getItem("email"));
    }
  }, [socket]);
  const location = useLocation();
  const shouldDisplaySidebar = !location.pathname.includes("/error");
  return (
    <div style={style} className="min-h-[100vh] ">
      {shouldDisplaySidebar && <SideBar click={[displayed, setDisplayed]} />}
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
        <Route path="/error" element={<Error />} />
        <Route path="*" element={<Navigate to="/error" />} />
      </Routes>
    </div>
  );
}

export default Home;
