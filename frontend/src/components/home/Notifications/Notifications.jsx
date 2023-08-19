import React, { useEffect } from "react";
import { AiOutlineLeft } from "react-icons/ai";
import { useNavigate } from "react-router";

function Notifications({ setDisplayed }) {
  useEffect(() => {
    setDisplayed("notifications");
  }, []);
  const Navigate = useNavigate();
  return (
    <div className="section sm:ml-[90px]  sm:p-6 p-4">
      <div className="relative  text-xl h-[7%] px-2 flex items-center">
        <div className="  cursor-pointer" onClick={() => Navigate(-1)}>
          <AiOutlineLeft />
        </div>
        <div className="text-main font-medium mx-auto">Notifications</div>
      </div>
    </div>
  );
}

export default Notifications;
