import React, { useContext } from "react";
import { useNavigate } from "react-router";
import { UserContext } from "../../../App";

function EditAddButton({ Icon, content, setAddFriend, userId }) {
  const navigate = useNavigate();
  const [user, setUser] = useContext(UserContext).user;
  const [socket, setSocket] = useContext(UserContext).socket;
  function handleClick() {
    if (content === "Edit profile") {
      navigate("/home/editprofile");
    }
    if (content === "Add friends") {
      setAddFriend(true);
    }
    if ((content = "Send Invitation")) {
      socket.emit("send-invitation", user.userId, userId);
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
