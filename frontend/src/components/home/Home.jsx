import React, { useState } from "react";
import SideBar from "../Sidebar/SideBar";
import MainSection from "./MainSection/MainSection";
import { Routes, Route } from "react-router";
import Profile from "./Profile/Profile";
import EditProfile from "./Profile/EditProfile";
import sendRequest from "../Request";
function Home() {
  const [displayed, setDisplayed] = useState("home");

  return (
    <div className="min-h-[100vh] bg-backgroundGray">
      <SideBar click={[displayed, setDisplayed]} />

      <Routes>
        <Route path="/" element={<MainSection />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/:username" element={<Profile />} />
        <Route path="/editprofile" element={<EditProfile />} />
      </Routes>
    </div>
  );
}

export default Home;
