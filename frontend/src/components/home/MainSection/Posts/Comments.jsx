import React, { useContext, useEffect, useRef, useState } from "react";

import PostIcon from "../UserPost/PostIcon";
import {
  AiOutlineCamera,
  AiOutlineCloseCircle,
  AiOutlineVideoCamera,
} from "react-icons/ai";
import Comment from "./Comment";
import { FaShare } from "react-icons/fa";
import { addComment } from "../../../../controllers/Comment";
import { UserContext } from "../../../../App";
import { TimePassed } from "../../../../controllers/PostController";
function Comments({ displayed, comments, postId }) {
  const [displayComments, setDisplayComments] = displayed;
  const input = useRef();

  const [user, setUser] = useContext(UserContext).user;
  const [changeAddPost, setChangeAddPost] =
    useContext(UserContext).changedAddedPost;
  const [socket, setSocket] = useContext(UserContext).socket;
  const [warning, setWarning] = useState("");
  function shareComment() {
    const value = input.current.value.trim();

    if (!value) {
      setWarning("Your can't share an empty comment");
      setTimeout(() => {
        setWarning("");
      }, 1500);
    } else {
      addComment(postId, user.userId, value);

      setWarning("Post shared");
      setChangeAddPost((prev) => !prev);

      socket.emit("interaction-added", user.userId, postId, "", value);
      input.current.value = "";
      setTimeout(() => {
        setWarning("");
        divRef.current.scrollTop = divRef.current.scrollHeight;
      }, 1500);
    }

    // console.log(value);
  }
  const style = {
    opacity: warning ? "1" : "0",
    zIndex: warning ? "20" : "-1",
  };
  const divRef = useRef(null);

  useEffect(() => {
    // Scroll the div to the bottom when the component mounts
    if (divRef?.current) {
      divRef.current.scrollTop = divRef.current.scrollHeight;
    }
  }, []);
  return (
    <div className="p-4 relative bg-white shadow-[0_10px_30px_rgb(0,0,0,0.2)]  flex flex-col  ">
      <div className="   rounded-xl border-[1px] border-gray p-3  mb-5">
        <div
          className="h-[30px] flex items-center justify-end z-20 cursor-pointer"
          onClick={() => setDisplayComments(false)}
        >
          <AiOutlineCloseCircle className="text-2xl hover:text-3xl duration-[0.3s]" />
        </div>
        <div
          ref={divRef}
          className="overflow-auto scroll-smooth max-h-[600px] min-h-[100px] gap-8 flex flex-col pr-4"
        >
          {comments.length > 0 ? (
            comments.map((comment) => (
              <Comment
                userId={comment.userId}
                content={comment.content}
                createdAt={comment.createdAt}
                commentId={comment.commentId}
                postId={postId}
              />
            ))
          ) : (
            <div>No comment yet on this post</div>
          )}
        </div>
      </div>

      <div style={style} className="text-center text-sm duration-[0.3s]">
        {warning}
      </div>
      <div className=" w-full h-[50px]    flex justify-between px-4 gap-5 items-center  rounded-xl border-solid border-[1px] border-main">
        <input
          type="text"
          ref={input}
          placeholder="Your Comment ..."
          className="h-full outline-none w-full  "
        />

        <div className=" flex gap-3 ">
          <div
            onClick={shareComment}
            className="h-8  cursor-pointer rounded-full text-xl w-8  bg-second p-1 flex items-center justify-center "
          >
            <FaShare />
          </div>
          {/* <PostIcon Icon={<AiOutlineVideoCamera />} /> */}
        </div>
      </div>
    </div>
  );
}

export default Comments;
