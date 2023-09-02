import React, { useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faThumbsUp,
  faThumbsDown,
  faSmile,
  faAngry,
} from "@fortawesome/free-solid-svg-icons";
import "@fortawesome/fontawesome-free/css/all.min.css"; // Import the Font Awesome CSS
import {
  AiOutlineDislike,
  AiOutlineLike,
  AiTwotoneDislike,
  AiTwotoneLike,
} from "react-icons/ai";
import {
  BsEmojiAngry,
  BsEmojiSmile,
  BsEmojiSmileFill,
  BsEmojiAngryFill,
} from "react-icons/bs";
import { FaRegCommentDots, FaCommentDots } from "react-icons/fa";
import { FcLike, FcLikePlaceholder } from "react-icons/fc";
import { UserContext } from "../../../../App";
import { likePost } from "../../../../services/PostController";
function InteractBar({ displayingComments, userId, postId, likes, comments }) {
  const [isOnHover, setIsOnHover] = useState(false);
  const [displayComments, setDisplayComments] = displayingComments;
  const [isLongPressing, setIsLongPressing] = useState(false);
  const [pressTimer, setPressTimer] = useState(null);
  const [changeAddPost, setChangeAddPost] =
    useContext(UserContext).changedAddedPost;
  const [user, setUser] = useContext(UserContext).user;
  const [socket, setSocket] = useContext(UserContext).socket;
  const handleMouseDown = () => {
    const timer = setTimeout(() => {
      setIsLongPressing(true);
    }, 400);
    setPressTimer(timer);
  };

  const handleMouseUp = () => {
    if (pressTimer) {
      clearTimeout(pressTimer);
      setPressTimer(null);
      setIsLongPressing(false);
    }
  };

  const [chosenIcon, setChosenIcon] = useState("NHeart");

  useEffect(() => {
    if (likes) {
      const isLikedBefore = likes?.find((like) => like.userId === user.userId);
      if (isLikedBefore) {
        setChosenIcon(isLikedBefore.emoji);
      }
    }
  }, []);
  const emoji = {
    NHeart: <FcLikePlaceholder type="NHeart" />,
    Heart: <FcLike type="Heart" />,

    Smile: (
      <FontAwesomeIcon
        icon={faSmile}
        style={{ color: "yellow" }}
        type="Smile"
      />
    ),

    Angry: (
      <FontAwesomeIcon icon={faAngry} style={{ color: "red" }} type="Angry" />
    ),

    Like: (
      <FontAwesomeIcon
        icon={faThumbsUp}
        style={{ color: "blue" }}
        type="Like"
      />
    ),

    Dislike: (
      <FontAwesomeIcon
        icon={faThumbsDown}
        style={{ color: "blue" }}
        type="Dislike"
      />
    ),
  };
  const [emojiList, setEmojiList] = useState([
    "Smile",
    "Angry",
    "Like",
    "Dislike",
  ]);

  const styles = {
    opacity: isLongPressing ? "1" : "0",
    zIndex: isLongPressing ? "10" : "-1",
  };
  const handleLike = async () => {
    if (chosenIcon === "NHeart") {
      setChosenIcon("Heart");
      setChangeAddPost((prev) => !prev);
      socket.emit("interaction-added", user.userId, postId, "Heart", "");
      await likePost(user.userId, postId, "Heart");
    } else {
      setChosenIcon("NHeart");
      socket.emit("interaction-added", user.userId, postId, "", "");
      setChangeAddPost((prev) => !prev);
      await likePost(user.userId, postId, "");
      const newEmojiList = emojiList;
      newEmojiList[emojiList.indexOf("Heart")] = chosenIcon;
      setEmojiList(newEmojiList);
    }
  };

  const [Timer, setTimer] = useState(null);
  async function changeEmoji(e, type) {
    const timer = setTimeout(async () => {
      setChosenIcon(type);
      setChangeAddPost((prev) => !prev);
      socket.emit("interaction-added", user.userId, postId, type, "");
      await likePost(user.userId, postId, type);
      const newEmojiList = emojiList;
      newEmojiList[emojiList.indexOf(type)] =
        chosenIcon === "NHeart" ? "Heart" : chosenIcon;
      setEmojiList(newEmojiList);
      setIsLongPressing(false);
    }, 500);
    setTimer(timer);
  }
  function RestartChangeEmoji(e, type) {
    if (Timer) {
      clearTimeout(Timer);
      setTimer(null);
    }
  }
  const renderedIcons = emojiList.map((icon) => (
    <div
      className="hover:scale-125 duration-[0.3s]"
      onMouseEnter={(e) => changeEmoji(e, emoji[icon].props.type)}
      onMouseLeave={(e) => RestartChangeEmoji(e, emoji[icon].props.type)}
    >
      {emoji[icon]}
    </div>
  ));

  return (
    <div className="select-none">
      <div className="py-1 relative w-full select-none ">
        <div
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          style={styles}
          className="w-[50%] max-[500px]:w-[90%]  md:w-[35%] flex absolute shadow-[0_10px_30px_rgb(0,0,0,0.2)] px-4 text-3xl items-center gap-4 justify-between h-[50px] bg-white rounded-xl bottom-10    min-[500px]:left-5  max-[500px]:left-1/2  max-[500px]:translate-x-[-50%]"
        >
          {renderedIcons}
        </div>
        <div className="flex justify-between text-sm select-none">
          <p className="cursor-pointer">
            {likes?.length} interaction{likes?.length < 2 ? "" : "s"}
          </p>
          <p>
            {`${comments?.length} comment${comments?.length < 2 ? "" : "s"}`}.
            33 shares
          </p>
        </div>
      </div>
      <div className="flex justify-between items-center h-[35px] flex-wrap">
        <div className="flex gap-3 h-full ">
          <div
            className="cursor-pointer text-3xl"
            onClick={handleLike}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
          >
            {emoji[chosenIcon]}
          </div>
          <div
            onClick={() => {
              setDisplayComments(!displayComments);
            }}
            onMouseEnter={() => {
              setIsOnHover(true);
            }}
            onMouseLeave={() => {
              setIsOnHover(false);
            }}
            className="cursor-pointer "
          >
            {!isOnHover ? (
              <FaRegCommentDots className="text-3xl" />
            ) : (
              <FaCommentDots className="text-3xl" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default InteractBar;
