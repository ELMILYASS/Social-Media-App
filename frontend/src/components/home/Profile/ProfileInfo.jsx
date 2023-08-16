import React, { useState } from "react";
import { useNavigate } from "react-router";
import MyFriends from "../Friends/MyFriends";

function ProfileInfo({
  number,
  content,
  userInfo,
  setDisplayFriends,
  isFriend,
}) {
  const Navigate = useNavigate();
  const [notFriend, setNotFriend] = useState(false);
  const styles = {
    zIndex: notFriend ? "30" : "-2",
    opacity: notFriend ? "1" : "0",
  };
  function navigate() {
    if (content === "friends") {
      if (userInfo) {
        if (isFriend) {
          setDisplayFriends(true);
        } else {
          setNotFriend(true);
          setTimeout(() => {
            setNotFriend(false);
          }, 1200);
        }
      } else {
        Navigate(`/home/${content}`);
      }
    }
  }
  return (
    <div
      style={{ cursor: content === "likes" ? "" : "pointer" }}
      className="relative text-center duration-[0.3s] hover:bg-main rounded-xl"
      onClick={navigate}
    >
      <div className="text-white text-2xl font-medium">{number}</div>
      <div text-dark>{content}</div>

      {content === "friends" && (
        <div
          style={styles}
          className="absolute bottom-[109%] left-1/2 translate-x-[-50%] text-black bg-white duration-[0.3s] shadow-[0_0px_30px_rgb(0,0,0,0.2)] rounded-xl z-20 w-[300px]"
        >{`Impossible ! ${userInfo?.username} not among your friends `}</div>
      )}
    </div>
  );
}

export default ProfileInfo;
