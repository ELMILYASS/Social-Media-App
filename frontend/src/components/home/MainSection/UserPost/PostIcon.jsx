import React from "react";

function PostIcon({ Icon }) {

  return (
    <div

      className="h-8  cursor-pointer rounded-full text-xl w-8  bg-second p-1 flex items-center justify-center "
    >
      {Icon}
    </div>
  );
}

export default PostIcon;
