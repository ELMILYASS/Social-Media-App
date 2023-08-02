import React from "react";

function SocialIcon({ Icon }) {
  return (
    <div className="w-11 h-11  cursor-pointer text-lg hover:bg-main hover:text-white duration-[0.3s]  mr-3 rounded-full flex items-center justify-center shadow-[0_10px_30px_rgb(0,0,0,0.3)] bg-white text-blue-600">
      {Icon}
    </div>
  );
}

export default SocialIcon;
