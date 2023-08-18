import React, { useContext, useState } from "react";
import {
  deleteComment,
  deletePost,
  updateComment,
} from "../../../../controllers/PostController";
import { UserContext } from "../../../../App";

function PostBar({
  Icon,
  content,
  onHoverIcon,
  postId,
  setDisplayPostBar,
  commentId,
  setDisplayCommentBar,
  setChangeComment,
  setCommentContent,
  commentContent,
  input,
}) {
  const [isOnHover, setIsOnHover] = useState(true);

  const [changeAddPost, setChangeAddPost] =
    useContext(UserContext).changedAddedPost;
  const [socket, setSocket] = useContext(UserContext).socket;
  const [user, setUser] = useContext(UserContext).user;
  async function handleClick() {
    if (content === "Delete Post") {
      setDisplayPostBar(false);
      socket.emit("post-deleted", postId);
      await deletePost(postId);
      setChangeAddPost((prev) => !prev);
    }

    if (content === "Delete") {
      setDisplayCommentBar(false);
      socket.emit("comment-changed", user.userId, postId, commentId, "");
      await deleteComment(postId, commentId);
      setChangeAddPost((prev) => !prev);
    }
    if (content === "Update") {
      setDisplayCommentBar(false);
      input.current.focus();
      setChangeComment(true);
    }
    if (content === "Save") {
      if (commentContent || commentContent === "") {
        socket.emit(
          "comment-changed",
          user.userId,
          postId,
          commentId,
          commentContent
        );
        await updateComment(postId, commentId, commentContent);
        setDisplayCommentBar(false);
        setChangeComment(false);
        setChangeAddPost((prev) => !prev);
      }
    }
    if (content === "Cancel") {
      setCommentContent(commentContent);
      setDisplayCommentBar(false);
      setChangeComment(false);
    }
  }
  return (
    <div
      onClick={handleClick}
      onMouseEnter={() => {
        setIsOnHover(true);
      }}
      onMouseLeave={() => {
        setIsOnHover(false);
      }}
      className="flex bg-transparent hover:text-dark  py-2 cursor-pointer gap-4 w-full text-white items-center justify-center"
    >
      {isOnHover ? (
        <div className="text-2xl w-[20%] ">{onHoverIcon}</div>
      ) : (
        <div className="text-2xl w-[20%] ">{Icon}</div>
      )}

      <p className="font-bold w-[80%] ">{content}</p>
    </div>
  );
}

export default PostBar;
