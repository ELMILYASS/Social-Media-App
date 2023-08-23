import React, { useEffect, useState } from "react";
import { getUserById, getUserProfileImage } from "../../../controllers/User";

import { TimePassed, getPostImages } from "../../../controllers/PostController";
import { useNavigate } from "react-router";
import { AiOutlineArrowRight, AiOutlineCloseCircle } from "react-icons/ai";
import UserPost from "../MainSection/Posts/Post";
import { useContext } from "react";
import { UserContext } from "../../../App";

function Notification({ status, message, createdAt, userId, postId, post }) {
  const [userInfo, setUserInfo] = useState();
  const [displayPost, setDisplayPost] = useState(false);
  const styles = {
    width: displayPost ? "80%" : "0",
    height: displayPost ? "80vh" : "0",
    zIndex: displayPost ? "2" : "-1",
    opacity: displayPost ? "1" : "0",
  };

  const [Post, setPost] = useState();
  const Navigate = useNavigate();
  useEffect(() => {
    async function getUserImage() {
      const user = await getUserById(userId);
      const image = await getUserProfileImage(userId);
      user.image = image;

      setUserInfo(user);
    }
    async function getImages() {
      const images = await getPostImages(postId);

      post.images = images || [];
      setPost(post);
    }
    if (postId) {
      getImages();
    }
    getUserImage();
  }, []);
  console.log("post", post);
  function handleClick() {
    if (!postId && status !== "new-message") {
      Navigate(`/home/profile/${userInfo?.username}`);
    } else if (status === "new-message") {
      Navigate(`/home/chat/${userInfo?.username}`);
    } else {
      setDisplayPost(true);
    }
  }
  const [isDark, setIsDark] = useContext(UserContext).isDark;

  return (
    <div
      style={{ borderBottomColor: isDark ? "rgb(38,38,38)" : "var(--gray)" }}
      className="flex gap-3  border-b-[1px] duration-[0.3s] hover:pl-2 hover:border-b-main"
    >
      <img
        src={userInfo?.image}
        alt="image"
        className="w-[55px] h-[55px] rounded-full object-cover"
      />
      <div
        style={styles}
        className="w-[80%] h-[90vh] duration-[0.3s]  bg-white  border-solid rounded-xl border-main border-[1px] fixed top-1/2 sm:ml-[45px]  left-1/2 translate-y-[-50%] translate-x-[-50%] p-3 flex flex-col gap-3 overflow-auto"
      >
        <div className="flex justify-end ">
          <AiOutlineCloseCircle
            onClick={() => {
              setDisplayPost(false);
            }}
            className="text-2xl cursor-pointer  hover:text-3xl duration-[0.3s]"
          />
        </div>

        {postId && (
          <UserPost
            text={post?.content}
            imgs={post?.images}
            userId={userId}
            createdAt={post?.createdAt}
            postId={postId}
            likes={post?.likes}
            comments={post?.comments}
          />
        )}
      </div>
      <div className="w-full">
        <div className="mb-1">
          <span className="font-semibold">{userInfo?.username}</span> {message}
        </div>
        <div className="cursor-pointer  " onClick={handleClick}>
          <AiOutlineArrowRight className="hover:scale-150 duration-[0.3s] " />
        </div>
        <div className="text-end text-grayText">{TimePassed(createdAt)}</div>
      </div>
    </div>
  );
}

export default Notification;
