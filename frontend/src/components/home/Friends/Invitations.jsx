import React, { useContext, useEffect, useState } from "react";
import { BsSearch } from "react-icons/bs";
import SearchedUser from "../MainSection/SearchedUser";
import { UserContext } from "../../../App";
import { getUserById, getUserProfileImage } from "../../../controllers/User";
import { AiOutlineUserDelete } from "react-icons/ai";
import { deleteInvitation } from "../../../controllers/Invitation";

function Invitations() {
  const [user, setUser] = useContext(UserContext).user;
  const [users, setUsers] = useState([]);
  const [searchedUsers, setSearchedUsers] = useState([]);
  const [foundUsers, setFoundUsers] = useState([]);
  const [searching, setSearching] = useState(false);
  const [inputValue, setInputValue] = useState();
  const [socket, setSocket] = useContext(UserContext).socket;
  //   console.log("user is ", user);

  useEffect(() => {
    async function getInvitations() {
      let array = [];
      for (const i of user?.sentInvitations) {
        const User = await getUserById(i);
        const image = await getUserProfileImage(User.userId);

        array.push(
          <div className="relative">
            <SearchedUser
              userId={User.userId}
              username={User.username}
              image={image}
            />
            <div
              className="cursor-pointer"
              onClick={() => deleteInvitation(socket, setUser, user.userId, i)}
            >
              <AiOutlineUserDelete className="absolute right-4 top-1/2 translate-y-[-50%] text-2xl text-main" />
            </div>
          </div>
        );
      }

      setUsers(array);
    }

    getInvitations();
  }, [user]);

  // console.log("user from friends is ", user);

  async function displayUsers(users) {
    const usersList = [];

    for (let i = 0; i < users.length; i++) {
      const u = users[i].props.children[0].props;

      const image = await getUserProfileImage(users.userId);
      usersList.push(
        <div className="relative ">
          <SearchedUser
            username={users.username}
            userId={users.userId}
            image={image}
          />

          <div
            className="cursor-pointer"
            onClick={() => deleteInvitation(socket, setUser, user.userId, i)}
          >
            <AiOutlineUserDelete className="absolute right-4 top-1/2 translate-y-[-50%] text-2xl text-main" />
          </div>
        </div>
      );
    }

    setFoundUsers(usersList);
  }

  async function handleSearch(e) {
    setInputValue(e.target.value);
    const displayedUsers = users.filter((u) => {
      return u.props.children[0].props.username.startsWith(
        e.target.value || " "
      );
    });

    setSearchedUsers(displayedUsers);

    if (displayedUsers.length > 0) {
      displayUsers(displayedUsers);
    } else {
      setFoundUsers([]);
    }
  }
  const [isDark, setIsDark] = useContext(UserContext).isDark;

  return (
    <div className=" p-5 h-full overflow-hidden">
      <div className="h-[15%]">
        <div
          style={{
            color: isDark ? "white" : "",
          }}
          className="text-center text-xl text-dark"
        >
          Invitations
        </div>
        <div className=" relative border-b-[1px] border-b-solid border-b-dark">
          <input
            style={{
              color: isDark ? "white" : "",
              backgroundColor: isDark ? "var(--darkSecond)" : "",
            }}
            type="text"
            onChange={handleSearch}
            onFocus={() => setSearching(true)}
            value={inputValue}
            onBlur={() => setSearching(false)}
            className="outline-none w-full border-none h-[40px]  pl-2  pr-9   "
            placeholder="Search for a user ..."
          />
          <BsSearch
            style={{
              color: isDark ? "white" : "",
            }}
            className="absolute right-3 cursor-pointer top-1/2 translate-y-[-50%] "
          />
        </div>
      </div>

      {inputValue && (
        <div
          style={{
            color: isDark ? "white" : "",
          }}
          className="p-3 flex flex-col gap-5 overflow-auto h-[85%] w-full"
        >
          {searchedUsers.length === 0
            ? "No user with that username"
            : [...foundUsers]}
        </div>
      )}
      {!inputValue && (
        <div
          style={{
            color: isDark ? "white" : "",
          }}
          className="flex flex-col gap-3 py-3  h-[85%] overflow-auto"
        >
          {[...users]}
        </div>
      )}
    </div>
  );
}

export default Invitations;
