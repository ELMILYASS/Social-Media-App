import React, { useState } from "react";
import BarElement from "./BarElement";
import { CgProfile } from "react-icons/cg";
import { IoMdNotificationsOutline } from "react-icons/io";
import { AiOutlineHome, AiOutlineMessage } from "react-icons/ai";
import { FiSettings, FiLogOut } from "react-icons/fi";
function SideBar() {
  const [clicked, setClicked] = useState("Home");
  function navigate(e, content) {
    setClicked(content);
  }

  return (
    <div className="sm:h-[100vh] h-[60px] z-10 shadow-[0_10px_30px_rgb(0,0,0,0.2)] sm:w-[90px] w-screen  sm:top-0 sm:left-0 bottom-0 fixed sm:rounded-tr-2xl bg-white sm:rounded-br-2xl sm:flex sm:flex-col sm:justify-between sm:py-10 ">
      <div className=" flex sm:flex-col  w-[140px] gap-5 max-sm:items-center max-sm:w-screen  justify-center    h-full  max-sm:px-5 ">
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

        <BarElement
          Icon={<FiLogOut />}
          content={"LogOut"}
          navigate={navigate}
          info={"Small"}
          currentPage={[clicked, setClicked]}
        />
      </div>
      <div className="w-[140px]  max-sm:w-screen max-sm:hidden">
        <BarElement
          Icon={<FiLogOut />}
          content={"LogOut"}
          navigate={navigate}
          currentPage={[clicked, setClicked]}
        />
      </div>
    </div>
  );
}

export default SideBar;
