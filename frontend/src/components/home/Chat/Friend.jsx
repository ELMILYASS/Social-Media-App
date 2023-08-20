import React, { useContext } from "react";
import { useNavigate } from "react-router";
import { UserContext } from "../../../App";

function Friend({ username, userId, image, socketIoId }) {
  const Navigate = useNavigate();
  const [user, setUser] = useContext(UserContext).user;
  function displayUserProfile() {
    Navigate("/home/chat/" + username);
  }

  return (
    <div
      onClick={displayUserProfile}
      className="relative cursor-pointer shrink-0 w-fit text-center"
    >
      <img
        src={image}
        alt=""
        className="object-full rounded-full w-[65px] h-[65px]"
      />
      {socketIoId && (
        <>
          <div className="absolute w-4 h-4 bg-green-500 rounded-full right-[10%] top-[55%] z-10 border-[2px] border-white"></div>
        </>
      )}
      <div>{username}</div>
    </div>
  );
}

export default Friend;
