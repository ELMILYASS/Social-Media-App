import React from "react";

import addpost from "../../../../assets/plus-icon-plus-math-icon-download-icons-9.png";
import { useNavigate } from "react-router";
function Story({ addPost, displayStory, username, userId, image, socketIoId }) {
  function story() {
    if (displayStory) {
      displayStory(true);
      setTimeout(() => {
        displayStory(false);
      }, 1000);
    }
  }
  const navigate = useNavigate();
  const style = {
    borderColor: socketIoId ? "var(--green)" : "var(--main)",
  };
  return (
    <div
      onClick={() => navigate("/home/profile/" + username)}
      className="shrink-0      cursor-pointer   "
    >
      <div className="relative">
        <div
          style={style}
          className="bg-white border-solid border-[2px] rounded-full "
        >
          <img
            src={addPost ? addpost : image}
            alt=""
            className=" w-[55px] h-[55px] rounded-full object-cover hover:scale-110 duration-[0.3s]"
          />
        </div>
        <div className="text-center">{username}</div>
        {socketIoId && (
          <div className="absolute w-3 h-3 bg-green-500 rounded-full right-[5%] top-[55%] z-10 border-[2px] border-white"></div>
        )}
      </div>
    </div>
  );
}

export default Story;
