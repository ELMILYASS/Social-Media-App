import React from "react";
import { useNavigate } from "react-router";

function EditAddButton({ Icon, content }) {
  const navigate = useNavigate();
  function handleClick() {
    if (content === "Edit profile") {
      
      navigate("/home/editprofile");
    }
  }
  return (
    <div
      onClick={handleClick}
      className="flex text-white bg-main gap-1 p-3 cursor-pointer  rounded-xl items-center"
    >
      <div className="text-xl">{Icon}</div>
      <div className="">{content}</div>
    </div>
  );
}

export default EditAddButton;
