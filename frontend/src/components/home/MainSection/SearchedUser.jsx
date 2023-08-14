import React from "react";
import defaultImage from "../../../../src/images/default profile image.jpg";
import { useNavigate } from "react-router";
function SearchedUser({ username, userId, image }) {
  const Navigate = useNavigate();
  function displayUserProfile() {
    Navigate("/home/profile/" + username);
  }
  console.log("image from here ", image);
  return (
    <div
      onClick={displayUserProfile}
      className="flex text-[18px] cursor-pointer items-center gap-3 border-b-second border-b-[1px] hover:pl-1 w-full pb-2 duration-[0.3s] hover:border-b-main "
    >
      <img
        src={image}
        alt=""
        className="object-full rounded-full w-[60px] h-[60px]"
      />
      <div>{username}</div>
    </div>
  );
}

export default SearchedUser;
