import React from "react";

function Image({ position, url }) {
  return (
    <div
      className={`absolute transform w-full duration-[0.3s] hidden md:flex translate-x-[${position}] h-full  items-center justify-center`}
    >
      <img src={url} alt="image" className="h-full" />
    </div>
  );
}

export default Image;
