import React from "react";

function SocialIcon({ Icon }) {
  return (
    <div className="w-10 h-10  cursor-pointer text-md  mr-3 rounded-full flex items-center justify-center shadow-[0_10px_30px_rgb(0,0,0,0.4)] bg-white">
      {Icon}
    </div>
  );
}

export default SocialIcon;
