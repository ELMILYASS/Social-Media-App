import React, { useContext, useEffect, useState } from "react";
import Story from "./Story";
import img from "../../../Images/pexels-pixabay-220453.jpg";
import { getUserById, getUserProfileImage } from "../../../../controllers/User";
import { UserContext } from "../../../../App";
import Friend from "../../Chat/Friend";
import { AiOutlineUserDelete } from "react-icons/ai";
function Stories() {
  const [displayStory, setDisplayStory] = useState(false);
  const style = {
    opacity: displayStory ? "1" : "0",
    zIndex: displayStory ? "80" : "-1",
  };
  const [newUserConnected, setNewUserConnected] =
    useContext(UserContext).newUserConnected;
  const [users, setUsers] = useState([]);
  const [user, setUser] = useContext(UserContext).user;
  async function getFriends(user) {
    let array = [];
    let friends = [];
    for (const i of user?.friends) {
      const User = await getUserById(i);
      const image = await getUserProfileImage(User.userId);
      friends.push(
        <Story
          username={User.username}
          userId={User.userId}
          image={image}
          socketIoId={User.socketIoId}
          displayStory={setDisplayStory}
        />
      );
    }
    setUsers(friends);
  }
  useEffect(() => {
    getFriends(user);
  }, [user, newUserConnected]);
  const [isDark, setIsDark] = useContext(UserContext).isDark;
  // style={{
  //   color: isDark ? "white" : "",
  // }}
  return (
    <div
      style={{
        color: isDark ? "white" : "",
      }}
      className="w-full py-2 stories overflow-auto flex  item-center gap-4
    "
    >
      {/* <div
        style={style}
        className="absolute h-[80vh] top-36 z-30 rounded-xl flex shadow-[0_10px_30px_rgb(0,0,0,0.2)] items-center justify-center sm:w-[50%] bg-main  left-1/2 translate-x-[-50%] w-[90%] p-5 "
      >
        <img
          src={img}
          alt=""
          className="object-cover w-full h-full rounded-xl"
        />
        <p className="absolute top-96 max-h-[20%] p-6 overflow-auto">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam libero,
          lore est voluptas quidem, fugiat impedit nisi autem cupiditate fugit
        </p>
      </div> */}
      {/* <Story addPost={true} /> */}
      {[...users]}

      {/* 
      <Story displayStory={setDisplayStory} />
      <Story displayStory={setDisplayStory} />
      <Story displayStory={setDisplayStory} />
      <Story displayStory={setDisplayStory} />
      <Story displayStory={setDisplayStory} /> */}
    </div>
  );
}

export default Stories;
