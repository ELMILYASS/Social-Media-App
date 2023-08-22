import React, { useState, useContext } from "react";
import BarElement from "./BarElement";
import { CgProfile } from "react-icons/cg";
import { IoMdNotificationsOutline } from "react-icons/io";
import { AiOutlineHome, AiOutlineMessage } from "react-icons/ai";
import { FiSettings, FiLogOut } from "react-icons/fi";
import handleLogout from "../../controllers/HandleLogout";
import { useNavigate } from "react-router";
import { UserContext } from "../../App";
import {
  MdDarkMode,
  MdOutlineHighlight,
  MdOutlineHighlightAlt,
  MdOutlineLightMode,
} from "react-icons/md";

function SideBar({ click }) {
  const Navigate = useNavigate();
  const [socket, setSocket] = useContext(UserContext).socket;
  const [isDark, setIsDark] = useContext(UserContext).isDark;
  const [displayed, setDisplayed] = click;
  const [connected, setConnected] = useContext(UserContext).connected;
  function navigate(e, content) {
    if (content === "LogOut") {
      socket.emit("user-connected", localStorage.getItem("email"));
      socket.disconnect();
      setConnected(false);
      setSocket(null);
      handleLogout();
      Navigate("/");
    } else {
      setDisplayed(content);
      if (content !== "home") {
        Navigate(`/home/${content}`);
      } else {
        Navigate("/home");
      }
    }
  }
  // const [darkMode, setDarkMode] = useState(false);
  // const style = {
  //   transform: darkMode ? `translate(37px,-50%)` : `translate(0px,-50%)`,
  // };
  // function switchMode() {
  //   setDarkMode((prev) => !prev);
  // }
  return (
    <div
      className={`sm:h-[100vh] h-[60px] z-50  sm:border-r-[1px] sm:border-r-gray max-sm:border-t-[1px] max-sm:border-t-gray hover:shadow-[0_10px_30px_rgb(0,0,0,0.2)] duration-[0.3s] sm:w-[90px] w-screen  sm:top-0 sm:left-0 bottom-0 fixed sm:rounded-tr-2xl bg-white sm:rounded-br-2xl sm:flex sm:flex-col sm:justify-between  sm:py-10`}
      style={{
        backgroundColor: isDark ? "var(--darkSecond)" : "",
        borderRightColor: isDark ? "rgb(38,38,38)" : "var(--gray)",
        borderTopColor: isDark ? "rgb(38,38,38)" : "var(--gray)",
      }}
    >
      <div className=" flex sm:flex-col  w-[140px] gap-5 max-sm:items-center max-sm:w-screen  justify-center    h-full  max-sm:px-5 ">
        <BarElement
          Icon={<AiOutlineHome />}
          content={"home"}
          navigate={navigate}
          currentPage={[displayed, setDisplayed]}
        />
        <BarElement
          Icon={<AiOutlineMessage />}
          content={"chat"}
          navigate={navigate}
          currentPage={[displayed, setDisplayed]}
        />
        <BarElement
          Icon={<CgProfile />}
          content={"profile"}
          navigate={navigate}
          currentPage={[displayed, setDisplayed]}
        />

        <BarElement
          Icon={<IoMdNotificationsOutline />}
          content={"notifications"}
          navigate={navigate}
          currentPage={[displayed, setDisplayed]}
        />

        {/* <BarElement
          Icon={<FiSettings />}
          content={"Settings"}
          navigate={navigate}
          currentPage={[displayed, setDisplayed]}
        /> */}

        <BarElement
          Icon={<FiLogOut />}
          content={"LogOut"}
          navigate={navigate}
          info={"Small"}
          currentPage={[displayed, setDisplayed]}
        />
      </div>
      <div className="w-[140px]  max-sm:w-screen max-sm:hidden">
        <BarElement
          Icon={<FiLogOut />}
          content={"LogOut"}
          navigate={navigate}
          currentPage={[displayed, setDisplayed]}
        />
      </div>
    </div>
  );
}

export default SideBar;
