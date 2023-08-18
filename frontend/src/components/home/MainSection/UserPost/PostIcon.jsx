import React from "react";

function PostIcon({ Icon }) {
  function shareComment() {
  
  }
  return (
    <div
      onClick={shareComment}
      className="h-8  cursor-pointer rounded-full text-xl w-8  bg-second p-1 flex items-center justify-center "
    >
      {Icon}
    </div>
  );
}

export default PostIcon;
