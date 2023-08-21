import React, { useContext } from "react";
import { useNavigate } from "react-router";
import { UserContext } from "../../../App";
import {
  acceptInvitation,
  deleteInvitation,
  sendInvitation,
  deleteFriend,
} from "../../../controllers/Invitation";

function EditAddButton({ Icon, content, setAddFriend, userId, username }) {
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
    if (content === "Send Invitation") {
      sendInvitation(socket, setUser, user.userId, userId);
    }
    if (content === "Delete Invitation") {
      deleteInvitation(socket, setUser, user.userId, userId);
    }
    if (content === "Accept Invitation") {
      acceptInvitation(socket, setUser, userId, user.userId);
    }
    if (content === "Friend") {
      deleteFriend(socket, setUser, user.userId, userId);
    }
    if (content === "Message") {
      navigate("/home/chat/" + username);
      // deleteFriend(socket, setUser, user.userId, userId);
    }
  }

  return (
    <div
      onClick={handleClick}
      className="flex  border-[1px] border-gray text-main gap-1 p-2 min-w-[130px] justify-center hover:bg-main hover:text-white duration-[0.3s] cursor-pointer  rounded-xl items-center"
    >
      <div className="text-xl">{Icon}</div>
      <div className="">{content}</div>
    </div>
  );
}

export default EditAddButton;
