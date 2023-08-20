import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../App";

function BarElement({ Icon, content, navigate, currentPage, info }) {
  const [displayed, setDisplayed] = currentPage;
  const [notifications, setNotifications] =
    useContext(UserContext).notifications;
  const [user, setUser] = useContext(UserContext).user;
  const styles = {
    backgroundColor: content === displayed ? "var(--main)" : "",

    color: content === displayed ? "white" : "var(--dark)",
  };

  const [numberUnseenNot, setNumberUnseenNot] = useState();
  
  useEffect(() => {
    function countNumberOfNot() {
      let number = 0;
      for (const not of notifications) {
        if (!not.isSeen) {
          number++;
        }
        setNumberUnseenNot(number);
      }
    }
    if (user) {
      countNumberOfNot();
    }
  }, [user, notifications]);
  return (
    <div
      style={styles}
      onClick={(e) => navigate(e, content)}
      className={`flex w-[40px] max-[450px]:w-1/6  ${info} hover:w-[35%] px-2    sm:ml-5 barElement cursor-pointer   h-[40px]  sm:hover:w-full justify-center items-center rounded-full duration-[0.3s]   `}
    >
      <div className="text-2xl relative ">
        {Icon}

        {content === "notifications" && numberUnseenNot > 0 && (
          <div className="absolute text-sm  top-[-20%] right-[-45%]  text-white bg-main rounded-full w-5 h-5 flex justify-center items-center">
            {numberUnseenNot}
          </div>
        )}
      </div>
      <div className=" rounded-full ml-2  content  hidden">{content}</div>
    </div>
  );
}

export default BarElement;
