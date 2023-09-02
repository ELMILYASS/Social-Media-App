import React, { useContext, useEffect, useRef, useState } from "react";
import {
  getUserById,
  getUserProfileImage,
} from "../../../../services/UserController";
import { TimePassed } from "../../../../services/PostController";
import { UserContext } from "../../../../App";
import { BsThreeDotsVertical } from "react-icons/bs";
import PostBar from "./PostBar";
import {
  AiFillDelete,
  AiFillEdit,
  AiOutlineDelete,
  AiOutlineEdit,
} from "react-icons/ai";
import { GiCancel } from "react-icons/gi";
import { MdCancel } from "react-icons/md";
import { BiSave, BiSolidSave } from "react-icons/bi";

function Comment({ userId, content, createdAt, commentId, postId }) {
  console.log("createdAt", TimePassed(createdAt));
  const [userInfo, setUserInfo] = useState();
  const [user, setUser] = useContext(UserContext).user;
  const [displayCommentBar, setDisplayCommentBar] = useState(false);
  const [displayPostBar, setDisplayPostBar] = useState(false);

  useEffect(() => {
    async function getUserInfo() {
      const image = await getUserProfileImage(userId);
      const user = await getUserById(userId);
      user.image = image;
      setUserInfo(user);
    }
    getUserInfo();
  }, []);
  function displayBar() {
    setDisplayCommentBar((prev) => !prev);
  }
  const BarStyles = {
    opacity: displayCommentBar ? "1" : "0",
    zIndex: displayCommentBar ? "10" : "-1",
  };
  const input = useRef();
  const [changeComment, setChangeComment] = useState(false);
  const [commentContent, setCommentContent] = useState(content);
  function handleChangingComment(e) {
    setCommentContent(e.target.value);
  }
  const [isDark, setIsDark] = useContext(UserContext).isDark;

  return (
    <div className="relative flex ">
      {userId === user.userId && (
        <div className="cursor-pointer absolute right-0" onClick={displayBar}>
          <BsThreeDotsVertical />
        </div>
      )}
      <div
        style={BarStyles}
        className="absolute duration-[0.3s]  px-5 f max-[400px]:w-[70%] rounded-xl  bg-main top-5 right-3 "
      >
        {user.userId === userId && !changeComment ? (
          <>
            <PostBar
              Icon={<AiOutlineDelete />}
              onHoverIcon={<AiFillDelete />}
              content={"Delete"}
              postId={postId}
              setDisplayPostBar={setDisplayPostBar}
              commentId={commentId}
              setDisplayCommentBar={setDisplayCommentBar}
            />

            <PostBar
              Icon={<AiOutlineEdit />}
              onHoverIcon={<AiFillEdit />}
              content={"Update"}
              postId={postId}
              setDisplayPostBar={setDisplayPostBar}
              commentId={commentId}
              setDisplayCommentBar={setDisplayCommentBar}
              setChangeComment={setChangeComment}
              setCommentContent={setCommentContent}
              input={input}
            />
          </>
        ) : (
          <>
            <PostBar
              Icon={<BiSave />}
              onHoverIcon={<BiSolidSave />}
              content={"Save"}
              postId={postId}
              setDisplayPostBar={setDisplayPostBar}
              commentId={commentId}
              setDisplayCommentBar={setDisplayCommentBar}
              commentContent={commentContent}
              setChangeComment={setChangeComment}
            />

            <PostBar
              Icon={<GiCancel />}
              onHoverIcon={<MdCancel />}
              content={"Cancel"}
              postId={postId}
              setDisplayPostBar={setDisplayPostBar}
              commentId={commentId}
              setDisplayCommentBar={setDisplayCommentBar}
              setChangeComment={setChangeComment}
              setCommentContent={setCommentContent}
              commentContent={content}
            />
          </>
        )}
      </div>
      <img
        src={userInfo?.image}
        alt="image"
        className="h-[50px]  w-[50px] mr-3 rounded-full object-cover "
      />
      <div className="flex flex-col w-[100%] outline-none">
        <input
          style={{
            backgroundColor: isDark ? "#111" : "",
            color: isDark ? "white" : "",
          }}
          className="mb-2 outline-none border-none"
          type="text"
          value={commentContent}
          name="comment"
          onChange={handleChangingComment}
          readOnly={!changeComment}
          ref={input}
        />

        <div className="text-right">
          {userInfo?.username === user?.username ? "you" : userInfo?.username}{" "}
          {TimePassed(createdAt)}
        </div>
        {/* <img
          src={img}
          alt=""
          className="object-cover rounded-xl h-[300px] md:h-[500px]"
        /> */}
      </div>
    </div>
  );
}

export default Comment;
