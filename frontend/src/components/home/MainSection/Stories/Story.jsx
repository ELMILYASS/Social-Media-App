import React from "react";
import img from "../pexels-pixabay-220453.jpg";
function Story() {
  return (
    <div className="shrink-0 w-[65px] p-[2px] border-solid border-main border-[2px]   h-[65px] cursor-pointer rounded-full overflow-hidden  ">
      <img
        src={img}
        alt=""
        className="w-full h-full rounded-full object-cover hover:scale-110 duration-[0.3s]"
      />
    </div>
  );
}

export default Story;
