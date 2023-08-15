import React, { useContext, useEffect, useState } from "react";
import { BsSearch } from "react-icons/bs";
import SearchedUser from "../MainSection/SearchedUser";
import { UserContext } from "../../../App";
import { getUserById, getUserProfileImage } from "../../../controllers/User";

function ReceivedInvitations() {
  const [user, setUser] = useContext(UserContext).user;
  const [users, setUsers] = useState([]);
  const [searchedUsers, setSearchedUsers] = useState([]);
  const [foundUsers, setFoundUsers] = useState([]);
  const [searching, setSearching] = useState(false);
  const [inputValue, setInputValue] = useState();
  //   console.log("user is ", user);

  useEffect(() => {
    async function getInvitations() {
      let array = [];
      for (const i of user?.receivedInvitations) {
        const User = await getUserById(i);
        const image = await getUserProfileImage(User.userId);

        array.push(
          <SearchedUser
            userId={User.userId}
            username={User.username}
            image={image}
          />
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
      const u = users[i];

      if (u.props?.image) {
        const image = await getUserProfileImage(u.props.userId);
        usersList.push(
          <div className="relative">
            <SearchedUser
              username={u.props.username}
              userId={u.props.userId}
              image={image}
            />
            {/* <div className="cursor-pointer">
              <BsPersonAdd className="absolute right-4 top-1/2 translate-y-[-50%] text-2xl text-main" />
            </div> */}
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
    const displayedUsers = users.filter((u) => {
      return u.props.username.startsWith(e.target.value || " ");
    });

    setSearchedUsers(displayedUsers);

    if (displayedUsers.length > 0) {
      displayUsers(displayedUsers);
    } else {
      setFoundUsers([]);
    }
  }
  return (
    <div className=" p-5 h-full overflow-hidden">
      <div className="h-[15%]">
        <div className="text-center text-xl text-dark">Received Invitations</div>
        <div className=" relative border-b-[1px] border-b-solid border-b-dark">
          <input
            type="text"
            onChange={handleSearch}
            onFocus={() => setSearching(true)}
            value={inputValue}
            onBlur={() => setSearching(false)}
            className="outline-none w-full border-none h-[40px]  pl-2  pr-9   "
            placeholder="Search for a user ..."
          />
          <BsSearch className="absolute right-3 cursor-pointer top-1/2 translate-y-[-50%] " />
        </div>
      </div>

      {inputValue && (
        <div className="p-3 flex flex-col gap-5 overflow-auto h-[85%] w-full">
          {searchedUsers.length === 0
            ? "No user with that username"
            : [...foundUsers]}
        </div>
      )}
      {!inputValue && (
        <div className="flex flex-col gap-3 py-3  h-[85%] overflow-auto">
          {[...users]}
        </div>
      )}
    </div>
  );
}

export default ReceivedInvitations;
