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
function Home() {
  const [displayed, setDisplayed] = useState("home");
  const [socket] = useContext(UserContext).socket;

  return (
    <div className="min-h-[100vh] ">
      <SideBar click={[displayed, setDisplayed]} />

      <Routes>
        <Route path="/" element={<MainSection />} />
        {/* <Route
          path="/h"
          element={<h1 onClick={sendEvent}>Click to send event</h1>}
        /> */}
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/:username" element={<OtherUserProfile />} />
        <Route path="/editprofile" element={<EditProfile />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/friends" element={<Friends />} />
      </Routes>
    </div>
  );
}

export default Home;
