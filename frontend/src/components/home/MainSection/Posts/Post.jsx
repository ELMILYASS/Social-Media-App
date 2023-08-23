import React, { useContext, useEffect, useRef, useState } from "react";
import img from "../../../Images/pexels-pixabay-220453.jpg";
import { BsThreeDotsVertical } from "react-icons/bs";
import { RiSaveLine, RiSaveFill } from "react-icons/ri";
import { BiShare, BiSolidShare } from "react-icons/bi";
import PostBar from "./PostBar";
import InteractBar from "./InteractBar";
import Comments from "./Comments";
import { UserContext } from "../../../../App";
import { getUserById, getUserProfileImage } from "../../../../controllers/User";
import { TimePassed } from "../../../../controllers/PostController";
import { AiFillDelete, AiOutlineDelete } from "react-icons/ai";
import { useNavigate } from "react-router";
function Post({ text, imgs, userId, createdAt, postId, likes, comments }) {
  const [isTruncated, setIsTruncated] = useState(false);
  const paragraphRef = useRef(null);
  const [user, setUser] = useContext(UserContext).user;
  const [socket, setSocket] = useContext(UserContext).socket;
  const [displayPostBar, setDisplayPostBar] = useState(false);
  const [userInfo, setUserInfo] = useState({ username: "", image: "" });
  const navigate = useNavigate();
  useEffect(() => {
    async function getUserInfo(userId) {
      const image = await getUserProfileImage(userId);
      const user = await getUserById(userId);
      setUserInfo((prev) => ({ username: user.username, image: image }));
    }
    if (userId) {
      getUserInfo(userId);
    } else if (user?.userId) {
      getUserInfo(user?.userId);
    }
  }, [user, userId]);
  function displayBar() {
    setDisplayPostBar(!displayPostBar);
  }
  const BarStyles = {
    opacity: displayPostBar ? "1" : "0",
    zIndex: displayPostBar ? "10" : "-1",
  };

  useEffect(() => {
    if (paragraphRef.current?.clientHeight > 100) {
      setIsTruncated(true);
    } else {
      setIsTruncated(false);
    }
  }, [text]);

  const len = imgs?.length;

  const styles =
    len === 4 || len === 2
      ? "grid grid-cols-2 items-center"
      : len === 3
      ? "grid grid-cols-2 "
      : len === 1
      ? "grid grid-cols-1"
      : len > 4
      ? "flex overflow-x-auto pb-4 gap-2"
      : "";
  const images = imgs?.map((img, index) => {
    if (len === 3 && index === 2) {
      return (
        <img
          src={img}
          alt="image"
          className="col-span-2 max-h-[600px]  max-w-full object-cover rounded-xl"
        />
      );
    } else if (len > 4) {
      return (
        <img
          src={img}
          alt="image"
          className="shrink-0 max-h-[600px] max-w-full  rounded-xl"
        />
      );
    } else
      return (
        <img
          src={img}
          alt="image"
          className="max-h-[600px] max-w-full object-cover rounded-xl"
        />
      );
  });

  const toggleTruncate = () => {
    setIsTruncated(!isTruncated);
  };

  const [displayComments, setDisplayComments] = useState(false);

  return (
    <div className="relative">
      <div className="flex mb-4 ">
        <img
          onClick={() => {
            if (userInfo.username === user.username) {
              navigate("/home/profile/");
            } else {
              navigate("/home/profile/" + userInfo.username);
            }
          }}
          src={userInfo.image}
          alt="image"
          className="h-[50px] w-[50px] cursor-pointer mr-3 rounded-full object-cover "
        />
        <div
          className="mr-auto cursor-pointer"
          onClick={() => {
            if (userInfo.username === user.username) {
              navigate("/home/profile/");
            } else {
              navigate("/home/profile/" + userInfo.username);
            }
          }}
        >
          <p className="font-medium">{userInfo?.username}</p>
          <p className="text-sm text-grayText">{TimePassed(createdAt)}</p>
        </div>
        <div className="cursor-pointer" onClick={displayBar}>
          <BsThreeDotsVertical />
        </div>
      </div>

      <div
        style={BarStyles}
        className="absolute duration-[0.3s]  px-5 f max-[400px]:w-[70%] rounded-xl  bg-main top-5 right-3 "
      >
        {user.userId === userId ? (
          <PostBar
            Icon={<AiOutlineDelete />}
            onHoverIcon={<AiFillDelete />}
            content={"Delete Post"}
            postId={postId}
            setDisplayPostBar={setDisplayPostBar}
          />
        ) : (
          <>
            <PostBar
              Icon={<RiSaveLine />}
              onHoverIcon={<RiSaveFill />}
              content={"Save"}
            />
            <PostBar
              Icon={<BiShare />}
              onHoverIcon={<BiSolidShare />}
              content={"Share"}
            />
          </>
        )}
      </div>

      {!displayComments ? (
        <div className="relative">
          {text?.trim()?.length > 0 && (
            <>
              <p
                ref={paragraphRef}
                style={{
                  maxHeight: isTruncated ? "50px" : "none",
                  overflow: "hidden",
                }}
              >
                {text}
              </p>
              <p className="text-blue-500 ">
                {text?.trim()?.length > 0 && isTruncated && (
                  <button onClick={toggleTruncate}>Lire la suite</button>
                )}
              </p>
            </>
          )}
          {styles && (
            <div
              className={` ${styles} mt-4 gap-5  mx-auto w-fit justify-items-center select-none `}
            >
              {[...images]}
            </div>
          )}
        </div>
      ) : (
        <Comments
          displayed={[displayComments, setDisplayComments]}
          comments={comments}
          postId={postId}
        />
      )}
      <InteractBar
        displayingComments={[displayComments, setDisplayComments]}
        userId={userId}
        postId={postId}
        likes={likes}
        comments={comments}
      />
    </div>
  );
}

export default Post;
