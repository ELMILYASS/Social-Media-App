import React, { useContext, useEffect, useState } from "react";
import Stories from "./Stories/Stories";
import UserPost from "./UserPost/UserPost";
import Posts from "./Posts/Posts";
import { BsSearch } from "react-icons/bs";
import SearchedUser from "./SearchedUser";

import { sendRequest, sendAxiosRequest } from "../../../routes/Request";
import { noProfileImage } from "../../../assets/default profile image.jpg";
import { UserContext } from "../../../App";
import { getUserProfileImage } from "../../../services/UserController";
import {
  getFriendsPosts,
  getPostImages,
} from "../../../services/PostController";
import { MdDarkMode, MdOutlineLightMode } from "react-icons/md";
function MainSection({ setDisplayed }) {
  useEffect(() => {
    setDisplayed("home");
  }, []);
  const [user, setUser] = useContext(UserContext).user;
  const [users, setUsers] = useState();
  const [searchedUsers, setSearchedUsers] = useState([]);
  const [foundUsers, setFoundUsers] = useState([]);
  const [searching, setSearching] = useState(false);
  const [changeAddPost, setChangeAddPost] =
    useContext(UserContext).changedAddedPost;
  const [inputValue, setInputValue] = useState();
  const [posts, setPosts] = useState([]);
  if (!users) {
    const query = `query{
                    users{
                    userId
                    username
                    image
                    }
                      }`;
    const result = sendRequest(query).then((data) =>
      setUsers(data.data.data.users)
    );
  }

  async function displayUsers(users) {
    const usersList = [];

    for (let i = 0; i < users.length; i++) {
      const u = users[i];

      const image = await getUserProfileImage(u.userId);

      usersList.push(
        <SearchedUser username={u.username} userId={u.userId} image={image} />
      );
    }

    setFoundUsers(usersList);
  }

  async function handleSearch(e) {
    setInputValue(e.target.value);
    const displayedUsers = users.filter(
      (u) =>
        u.username.startsWith(e.target.value || " ") && u.userId !== user.userId
    );

    setSearchedUsers(displayedUsers);

    if (displayedUsers.length > 0) {
      displayUsers(displayedUsers);
    } else {
      setFoundUsers([]);
    }
  }

  useEffect(() => {
    async function getPosts() {
      let Posts = await getFriendsPosts(user.userId);
      for (let i = 0; i < Posts.length; i++) {
        try {
          const Images = await getPostImages(Posts[i].postId);

          Posts[i].images = Images || [];
          Posts[i].createdAt = new Date(Number(Posts[i]?.createdAt));
        } catch (err) {
          console.error(err);
        }
      }

      //sort posts

      Posts = Posts.sort((postA, postB) => postB.createdAt - postA.createdAt);

      setPosts(Posts);
    }
    getPosts();
  }, [user, changeAddPost]);

  const [isDark, setIsDark] = useContext(UserContext).isDark;
  const style = {
    transform: isDark ? `translate(37px,-50%)` : `translate(0px,-50%)`,
  };
  function switchMode() {
    localStorage.setItem("dark", !isDark);
    setIsDark((prev) => !prev);
  }
  return (
    <div
      className=" section 
       sm:ml-[90px]  sm:p-6 p-4 flex  flex-col gap-2 relative"
    >
      <div className="flex w-full justify-between items-center relative mb-[10px] flex-wrap    max-[500px]:gap-2">
        <h1
          className=" text-2xl mb-1 mr-auto "
          style={{ color: isDark ? "white" : "" }}
        >
          <span className="text-main   ">I</span>lyass
          <span className="text-main   ">N</span>et
        </h1>
        <div className=" border-main  border-[2px] h-[32px] w-[70px] relative rounded-full px-[2px] mx-2  items-center flex">
          <div
            style={style}
            onClick={switchMode}
            className="h-[23px] duration-[0.5s] cursor-pointer absolute top-1/2  rounded-full    w-[25px] bg-main "
          ></div>
          <div
            className="text-2xl mr-auto"
            style={{ color: isDark ? "white" : "" }}
          >
            <MdOutlineLightMode />
          </div>
          <div className="text-2xl">
            <MdDarkMode />
          </div>
        </div>
        <div className="relative w-[300px] max-[500px]:w-full  hover:shadow-[0_0px_30px_rgb(0,0,0,0.1)] duration-[0.3s] rounded-xl ">
          <input
            style={{
              backgroundColor: isDark ? "var(--darkSecond)" : "",
              color: isDark ? "white" : "",
              borderColor: isDark ? "rgb(38,38,38)" : "var(--gray)",
            }}
            type="text"
            onFocus={() => setSearching(true)}
            value={inputValue}
            onBlur={() => setSearching(false)}
            className="outline-none border-[1px]  w-full  h-[35px]   pl-2  pr-9  rounded-xl"
            placeholder="Search for a user ..."
            onChange={handleSearch}
          />
          <BsSearch
            style={{
              color: isDark ? "white" : "",
            }}
            className="absolute right-3 cursor-pointer top-1/2 translate-y-[-50%] "
          />
        </div>

        {inputValue && (
          <div
            style={{
              borderColor: isDark ? "rgb(38,38,38)" : "var(--gray)",
              backgroundColor: isDark ? "var(--darkSecond)" : "",
              color: isDark ? "white" : "",
            }}
            className="absolute flex flex-col gap-5 p-5 items-center max-sm:w-full  max-[960px]:w-[60%]  w-[40%]  bg-white border-second shadow border-solid border-[1px] rounded-xl min-h-[100px] max-h-[400px] overflow-auto top-full right-0 z-50 mt-3"
          >
            {searchedUsers.length === 0
              ? "No user with that username"
              : [...foundUsers]}
          </div>
        )}
      </div>
      <Stories />
      <UserPost />
      <Posts posts={posts} />
    </div>
  );
}

export default MainSection;
