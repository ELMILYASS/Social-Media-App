import React from "react";

function Image({ position, url }) {
  return (
    <div
      className={`absolute mt-5 md:flex hidden  w-1/2 duration-[0.3s] translate-x-[${position}]   items-center justify-center`}
    >
      <img src={url} alt="image" className="w-[400px]" />
    </div>
  );
}

export default Image;
