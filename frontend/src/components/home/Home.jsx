import React from "react";
import SideBar from "./Sidebar/SideBar";
import MainSection from "./MainSection/MainSection";
function Home() {
  return (
    <div className="min-h-[100vh] bg-backgroundGray">
      <SideBar />
      <MainSection />
    </div>
  );
}

export default Home;
