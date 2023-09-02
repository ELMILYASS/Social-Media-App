import React, { useContext } from "react";
import { UserContext } from "../../../App";
import { TimePassed } from "../../../services/PostController";
import { useState } from "react";

function Message({ senderId, receiverId, content, createdAt, userInfo }) {
  const [user, setUser] = useContext(UserContext).user;
  const [displayDate, setDisplayDate] = useState(false);

  const style = {
    alignSelf: senderId === user.userId ? "end" : "",
    backgroundColor: senderId === user.userId ? "var(--main)" : "var(--gray)",
    color: senderId === user.userId ? "white" : "",
  };
  return (
    <div
      style={style}
      onMouseEnter={() => setDisplayDate(true)}
      onMouseLeave={() => setDisplayDate(false)}
      className="max-w-[70%] w-fit min-w-[40px] text-center   rounded-xl p-[4px] "
    >
      <div className=" break-words  ">{content}</div>
      {displayDate && (
        <div className="text-sm text-grayText  text-right">
          {TimePassed(createdAt)}
        </div>
      )}
    </div>
  );
}

export default Message;
