import React from "react";

function Image({ position, url }) {
  return (
    <div
      style={{ transform: `translateX(${position})` }}
      className={`absolute mt-5 md:flex hidden  h-full  w-1/2 duration-[0.3s]   items-center justify-center`}
    >
      <img src={url} alt="image" className="w-[400px] h-full" />
    </div>
  );
}

export default Image;
