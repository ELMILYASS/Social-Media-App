import React, { useContext, useEffect, useState } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import SearchedUser from "../MainSection/SearchedUser";
import { BsPersonAdd, BsSearch } from "react-icons/bs";
import { UserContext } from "../../../App";
import { sendRequest } from "../../Request";
import { getUserProfileImage } from "../../../controllers/User";

function AddFriend({ style, setAddFriend }) {
  const [user, setUser] = useContext(UserContext).user;
  const [users, setUsers] = useState();
  const [searchedUsers, setSearchedUsers] = useState([]);
  const [foundUsers, setFoundUsers] = useState([]);
  const [inputValue, setInputValue] = useState();
  console.log(foundUsers);
  useEffect(() => {
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
  }, []);

  async function displayUsers(users) {
    const usersList = [];

    for (let i = 0; i < users.length; i++) {
      const u = users[i];

      if (u?.image) {
        const image = await getUserProfileImage(u.userId);
        usersList.push(
          <div className="relative">
            <SearchedUser
              username={u.username}
              userId={u.userId}
              image={image}
            />
            <div className="cursor-pointer">
              <BsPersonAdd className="absolute right-4 top-1/2 translate-y-[-50%] text-2xl text-main" />
            </div>
          </div>
        );
      } else {
        usersList.push(
          <SearchedUser username={u.username} userId={u.userId} />
        );
      }
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
    <div
      style={style}
      className="w-[80%] h-[90vh] duration-[0.3s]  bg-white shadow border-solid rounded-xl border-second border-[2px] fixed top-1/2 sm:ml-[45px]  left-1/2 translate-y-[-50%] translate-x-[-50%] p-3 flex flex-col gap-3"
    >
      <div
        className="flex justify-end  cursor-pointer"
        onClick={() => setAddFriend(false)}
      >
        <AiOutlineCloseCircle className="text-2xl hover:text-3xl duration-[0.3s]" />
      </div>
      <div className="w-full relative ">
        <input
          type="text"
          // onFocus={() => setSearching(true)}
          value={inputValue}
          //  onBlur={() => setSearching(false)}
          className="outline-none w-full border-second border-[1px] h-[36px]   pl-2  pr-9  rounded-xl shadow"
          placeholder="Search for a user ..."
          onChange={handleSearch}
        />
        <BsSearch className="absolute right-3 cursor-pointer top-1/2 translate-y-[-50%] " />
      </div>

      {inputValue && (
        <div className="p-3 flex flex-col gap-5 overflow-auto w-full">
          {searchedUsers.length === 0
            ? "No user with that username"
            : [...foundUsers]}
        </div>
      )}
    </div>
  );
}

export default AddFriend;