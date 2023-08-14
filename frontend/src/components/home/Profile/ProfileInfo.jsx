import React from "react";
import { useNavigate } from "react-router";

function ProfileInfo({ number, content }) {
  const Navigate = useNavigate();
  function navigate() {
    Navigate(`/home/${content}`);
  }
  return (
    <div className=" text-center cursor-pointer" onClick={navigate}>
      <div className="text-main text-2xl font-medium">{number}</div>
      <div text-dark>{content}</div>
    </div>
  );
}

export default ProfileInfo;
