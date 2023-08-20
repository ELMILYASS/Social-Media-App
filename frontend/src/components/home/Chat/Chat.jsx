import React, { useContext, useEffect, useState } from "react";
import { AiOutlineLeft } from "react-icons/ai";
import { useNavigate } from "react-router";
import { UserContext } from "../../../App";
import SearchedUser from "../MainSection/SearchedUser";
import { BsSearch } from "react-icons/bs";
import { getUserById, getUserProfileImage } from "../../../controllers/User";
import Friend from "./Friend";
import { getMessages } from "../../../controllers/ChatController";

function Chat({ setDisplayed }) {
  const Navigate = useNavigate();
  const [user, setUser] = useContext(UserContext).user;
  const [socket, setSocket] = useContext(UserContext).socket;
  const [users, setUsers] = useState([]);
  const [searchedUsers, setSearchedUsers] = useState([]);
  const [foundUsers, setFoundUsers] = useState([]);
  const [inputValue, setInputValue] = useState();
  const [newMessage, setNewMessage] = useContext(UserContext).newMessage;
  const [messages, setMessages] = useState("");
  const [lastMessages, setLastMessages] = useState([]);
  useEffect(() => {
    setDisplayed("chat");
  }, []);
  useEffect(() => {
    async function getUserMessages() {
      const messages = await getMessages(user.userId);
      setMessages(messages);
    }
    getUserMessages();
  }, [newMessage, user]);

  async function getFriends(user) {
    let array = [];

    for (const i of user?.friends) {
      const User = await getUserById(i);
      const image = await getUserProfileImage(User.userId);

      array.push(
        <Friend
          username={User.username}
          userId={User.userId}
          image={image}
          socketIoId={User.socketIoId}
        />
      );
    }

    setUsers(array);
  }

  async function getLastMessages() {
    let array = [];
    let ids = [];
    for (const message of messages) {
      let userId;
      if (message.senderId === user.userId) userId = message.receiver;
      if (message.receiverId === user.userId) userId = message.sender;
      if (!ids.includes(userId)) {
        ids.push(userId);
        
      }
    }
  }
  useEffect(() => {
    getFriends(user);
  }, [user]);

  async function displayUsers(users) {
    const usersList = [];

    for (let i = 0; i < users.length; i++) {
      const u = users[i];

      const image = await getUserProfileImage(u.props.userId);
      usersList.push(
        <Friend
          username={u.props.username}
          userId={u.props.userId}
          image={image}
          socketIoId={u.props.socketIoId}
        />
      );
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
    <div className="section sm:ml-[90px]  sm:p-6 p-4 ">
      <div className="relative  text-xl h-[7%] px-2 flex items-center mb-2">
        <div className="  cursor-pointer" onClick={() => Navigate(-1)}>
          <AiOutlineLeft />
        </div>
        <div className="text-main font-medium mx-auto">Chat</div>
      </div>
      <div>
        <div className=" relative border-b-[1px] border-b-solid border-b-gray">
          <input
            type="text"
            onChange={handleSearch}
            value={inputValue}
            className="outline-none w-full border-none h-[40px]  pl-2  pr-9   "
            placeholder="Search for a friend ..."
          />
          <BsSearch className="absolute right-3 cursor-pointer top-1/2 translate-y-[-50%] " />
        </div>
      </div>
      {inputValue && (
        <div className="flex  gap-4 py-3  h-[85%] overflow-auto">
          {searchedUsers.length === 0
            ? "No user with that username"
            : [...foundUsers]}
        </div>
      )}
      {!inputValue && (
        <div className="flex  gap-4 py-3  h-[85%] overflow-auto">
          {[...users]}
        </div>
      )}
      <div>
        <div className="border-b-[1px] border-gray text-main">Messages</div>
        <div></div>
      </div>
    </div>
  );
}

export default Chat;
