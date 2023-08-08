import React from "react";
import img from "../../../Images/pexels-pixabay-220453.jpg";
import addpost from "../../../Images/plus-icon-plus-math-icon-download-icons-9.png";
function Story({ addPost, displayStory }) {
  function story() {
    if (displayStory) {
      displayStory(true);
      setTimeout(() => {
        displayStory(false);
      }, 1000);
    }
  }
  return (
    <div
      onClick={story}
      className="shrink-0 w-[65px] p-[2px] border-solid border-main border-[2px]   h-[65px] cursor-pointer rounded-full overflow-hidden  "
    >
      <img
        src={addPost ? addpost : img}
        alt=""
        className="w-full h-full rounded-full object-cover hover:scale-110 duration-[0.3s]"
      />
    </div>
  );
}

export default Story;
