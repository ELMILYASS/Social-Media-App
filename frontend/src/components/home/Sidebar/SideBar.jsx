import React, { useState } from "react";
import BarElement from "./BarElement";
import { CgProfile } from "react-icons/cg";
import { IoMdNotificationsOutline } from "react-icons/io";
import { AiOutlineHome, AiOutlineMessage } from "react-icons/ai";
import { FiSettings } from "react-icons/fi";
function SideBar() {
  const [clicked, setClicked] = useState("Home");
  function navigate(e, content) {
    setClicked(content);
  }

  return (
    <div className="sm:h-[100vh] h-[60px]  px-1  sm:w-[90px] w-screen bg-white sm:top-0 sm:left-0 bottom-0 fixed sm:rounded-tr-2xl sm:rounded-br-2xl ">
      <div className=" flex sm:flex-col w-[140px] max-sm:items-center max-sm:w-screen  justify-center sm:ml-5   h-full  ">
        <BarElement
          Icon={<AiOutlineHome />}
          content={"Home"}
          navigate={navigate}
          currentPage={[clicked, setClicked]}
        />
        <BarElement
          Icon={<AiOutlineMessage />}
          content={"Chat"}
          navigate={navigate}
          currentPage={[clicked, setClicked]}
        />
        <BarElement
          Icon={<CgProfile />}
          content={"Profile"}
          navigate={navigate}
          currentPage={[clicked, setClicked]}
        />
        <BarElement
          Icon={<IoMdNotificationsOutline />}
          content={"Notification"}
          navigate={navigate}
          currentPage={[clicked, setClicked]}
        />
        <BarElement
          Icon={<FiSettings />}
          content={"Settings"}
          navigate={navigate}
          currentPage={[clicked, setClicked]}
        />
      </div>
    </div>
  );
}

export default SideBar;
