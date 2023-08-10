import React from "react";

function ProfileInfo({ number, content }) {
  return (
    <div className=" text-center">
      <div className="text-main text-2xl font-medium">{number}</div>
      <div text-dark>{content}</div>
    </div>
  );
}

export default ProfileInfo;
