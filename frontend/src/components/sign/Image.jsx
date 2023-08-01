import React from "react";

function Image({ position, url }) {
  return (
    <div
      className={`absolute transform w-full duration-[0.3s] translate-x-[${position}] h-full flex items-center`}
    >
      <img src={url} alt="image" className="h-full" />
    </div>
  );
}

export default Image;
