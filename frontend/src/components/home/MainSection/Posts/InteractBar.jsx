import React, { useState } from "react";
import { FaRegCommentDots, FaCommentDots } from "react-icons/fa";
import { FcLike } from "react-icons/fc";
function InteractBar() {
  const [isOnHover, setIsOnHover] = useState(false);
  const [isLongPressing, setIsLongPressing] = useState(false);
  const handleMouseDown = () => {
    console.log("hhhh");
  };
  const handleMouseUp = () => {
    console.log("hohoh");
  };
  const handleLike = () => {};
  return (
    <div className="flex gap-3 py-4 relative">
      <div className="w-[90%] ">
      
      </div>
      <div
        className="cursor-pointer"
        onClick={handleLike}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
      >
        <FcLike className="text-3xl" />
      </div>
      <div
        onMouseEnter={() => {
          setIsOnHover(true);
        }}
        onMouseLeave={() => {
          setIsOnHover(false);
        }}
        className="cursor-pointer"
      >
        {!isOnHover ? (
          <FaRegCommentDots className="text-3xl" />
        ) : (
          <FaCommentDots className="text-3xl" />
        )}
      </div>
    </div>
  );
}

export default InteractBar;
