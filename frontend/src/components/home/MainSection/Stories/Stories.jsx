import React, { useState } from "react";
import Story from "./Story";
import img from "../../../Images/pexels-pixabay-220453.jpg";
function Stories() {
  const [displayStory, setDisplayStory] = useState(false);
  const style = {
    opacity: displayStory ? "1" : "0",
    zIndex: displayStory ? "80" : "-1",
  };
  return (
    <div
      className="w-full pb-3 stories overflow-auto flex  item-center gap-4
    "
    >
      <div
        style={style}
        className="absolute h-[80vh] top-36 z-30 rounded-xl flex shadow-[0_10px_30px_rgb(0,0,0,0.2)] items-center justify-center sm:w-[50%] bg-main  left-1/2 translate-x-[-50%] w-[90%] p-5 "
      >
        <img
          src={img}
          alt=""
          className="object-cover w-full h-full rounded-xl"
        />
        <p className="absolute top-96 max-h-[20%] p-6 overflow-auto">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam libero,
          lore est voluptas quidem, fugiat impedit nisi autem cupiditate fugit
        </p>
      </div>
      <Story addPost={true} />
      <Story displayStory={setDisplayStory} />
      <Story displayStory={setDisplayStory} />
      <Story displayStory={setDisplayStory} />
      <Story displayStory={setDisplayStory} />
      <Story displayStory={setDisplayStory} />
    </div>
  );
}

export default Stories;
