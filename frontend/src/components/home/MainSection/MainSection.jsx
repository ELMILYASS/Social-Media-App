import React, { useContext, useEffect, useState } from "react";
import Stories from "./Stories/Stories";
import Post from "./UserPost/UserPost";
import Posts from "./Posts/Posts";
import { BsSearch } from "react-icons/bs";
import SearchedUser from "./SearchedUser";

import { sendRequest, sendAxiosRequest } from "../../Request";
import { noProfileImage } from "../../../images/default profile image.jpg";
import { UserContext } from "../../../App";
import { getUserProfileImage } from "../../../controllers/User";
function MainSection() {
  const [user, setUser] = useContext(UserContext).user;
  const [users, setUsers] = useState();
  const [searchedUsers, setSearchedUsers] = useState([]);
  const [foundUsers, setFoundUsers] = useState([]);
  const [searching, setSearching] = useState(false);
  const [inputValue, setInputValue] = useState();
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

  return (
    <div className=" section sm:ml-[90px]  sm:p-6 p-4 flex flex-col gap-2 relative">
      <div className="flex w-full justify-between relative mb-[10px]   max-[500px]:flex-col max-[500px]:gap-2">
        <h1 className=" text-2xl mb-1 ">
          <span className="text-main font-bold  ">B</span>logging
        </h1>
        <div className="relative w-[300px] max-[500px]:w-full border-[1px] border-gray hover:shadow-[0_0px_30px_rgb(0,0,0,0.1)] duration-[0.3s] rounded-xl ">
          <input
            type="text"
            onFocus={() => setSearching(true)}
            value={inputValue}
            onBlur={() => setSearching(false)}
            className="outline-none w-full border-none h-[35px]   pl-2  pr-9  rounded-xl"
            placeholder="Search for a user ..."
            onChange={handleSearch}
          />
          <BsSearch className="absolute right-3 cursor-pointer top-1/2 translate-y-[-50%] " />
        </div>

        {inputValue && (
          <div className="absolute flex flex-col gap-5 p-5 items-center max-sm:w-full  max-[960px]:w-[60%]  w-[40%]  bg-white border-second shadow border-solid border-[1px] rounded-xl min-h-[100px] max-h-[400px] overflow-auto top-full right-0 z-50 mt-3">
            {searchedUsers.length === 0
              ? "No user with that username"
              : [...foundUsers]}
          </div>
        )}
      </div>
      <Stories />
      <Post />
      <Posts />
    </div>
  );
}

export default MainSection;
