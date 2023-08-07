import React, { useState } from "react";

function PostBar({ Icon, content, onHoverIcon }) {
  const [isOnHover, setIsOnHover] = useState(false);
  return (
    <div
      onMouseEnter={() => {
        setIsOnHover(true);
      }}
      onMouseLeave={() => {
        setIsOnHover(false);
      }}
      className="flex bg-transparent  cursor-pointer gap-4 w-full text-white items-center justify-center"
    >
      {isOnHover ? (
        <div className="text-2xl w-[20%]">{onHoverIcon}</div>
      ) : (
        <div className="text-2xl w-[20%]">{Icon}</div>
      )}

      <p className="font-bold w-[80%]">{content}</p>
    </div>
  );
}

export default PostBar;
