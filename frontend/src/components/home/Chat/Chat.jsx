import React, { useContext, useEffect, useState } from "react";
import { AiOutlineLeft } from "react-icons/ai";
import { useNavigate } from "react-router";
import { UserContext } from "../../../App";
import SearchedUser from "../MainSection/SearchedUser";
import { BsSearch } from "react-icons/bs";
import { getUserById, getUserProfileImage } from "../../../controllers/User";
import Friend from "./Friend";
import {
  getLastMessage,
  getMessages,
  getMessagesWith,
} from "../../../controllers/ChatController";
import { TimePassed } from "../../../controllers/PostController";

function Chat({ setDisplayed }) {
  const Navigate = useNavigate();
  const [user, setUser] = useContext(UserContext).user;
  const [socket, setSocket] = useContext(UserContext).socket;
  const [newUserConnected, setNewUserConnected] =
    useContext(UserContext).newUserConnected;
  const [connectedUsers, setConnectedUsers] = useState([]);
  const [users, setUsers] = useState([]);
  const [searchedUsers, setSearchedUsers] = useState([]);
  const [foundUsers, setFoundUsers] = useState([]);
  const [inputValue, setInputValue] = useState();
  const [newMessage, setNewMessage] = useContext(UserContext).newMessage;
  const [messages, setMessages] = useState("");
  const [lastMessages, setLastMessages] = useState([]);
  const [numberUnseenMessages, setNumberUnseenMessages] =
    useContext(UserContext).numberUnseenMessages;
  useEffect(() => {
    setDisplayed("chat");
  }, []);
  async function getLastMessages(messages) {
    let array = [];
    let ids = [];

    for (const message of messages) {
      let userId;

      if (message.senderId === user.userId) {
        userId = message.receiverId;
      }
      if (message.receiverId === user.userId) userId = message.senderId;
      if (!ids.includes(userId)) {
        ids.push(userId);
        const lastMessage = await getLastMessage(user.userId, userId);
        const messages = await getMessagesWith(user.userId, userId);

        const User = await getUserById(userId);
        const image = await getUserProfileImage(userId);
        const style = {
          fontWeight:
            lastMessage.senderId === user.userId
              ? ""
              : lastMessage.isSeen
              ? ""
              : "600",
        };
        array.push(
          <div
            onClick={() => {
              setNumberUnseenMessages((prev) => {
                return (
                  prev -
                  messages.reduce((prev, curr) => {
                    if (!curr.isSeen && curr.receiverId === user.userId) {
                      return prev + 1;
                    } else {
                      return prev;
                    }
                  }, 0)
                );
              });
              Navigate("/home/chat/" + User.username);
            }}
            className="flex items-center cursor-pointer gap-3"
          >
            <Friend
              username={User.username}
              userId={User.userId}
              image={image}
              socketIoId={User.socketIoId}
              numberUnseenMessages={messages.reduce((prev, curr) => {
                if (!curr.isSeen && curr.receiverId === user.userId) {
                  return prev + 1;
                } else {
                  return prev;
                }
              }, 0)}
            />

            <div className="w-full">
              <div style={style}>{lastMessage.content}</div>
              <div className="text-right text-sm text-grayText">
                {TimePassed(lastMessage.createdAt)}
              </div>
            </div>
          </div>
        );
      }
    }
    setLastMessages(array);
  }
  useEffect(() => {
    async function getUserMessages() {
      const messages = await getMessages(user.userId);
      setMessages(messages);
      getLastMessages(messages);
    }
    getUserMessages();
  }, [newMessage, user, newUserConnected]);

  async function getConnectedFriends(user) {
    let array = [];
    let friends = [];
    for (const i of user?.friends) {
      const User = await getUserById(i);
      const image = await getUserProfileImage(User.userId);
      friends.push(
        <Friend
          username={User.username}
          userId={User.userId}
          image={image}
          socketIoId={User.socketIoId}
        />
      );
      if (User.socketIoId) {
        array.push(
          <Friend
            username={User.username}
            userId={User.userId}
            image={image}
            socketIoId={User.socketIoId}
          />
        );
      }
    }
    setUsers(friends);
    setConnectedUsers(array);
  }

  useEffect(() => {
    getConnectedFriends(user);
  }, [user, newUserConnected]);

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
    <div className="section sectionHeight sm:ml-[90px]  flex flex-col  gap-2 sm:p-6 p-4 ">
      <div className="relative  text-xl h-[7%]   px-2 flex items-center mb-2">
        <div className="  cursor-pointer" onClick={() => Navigate(-1)}>
          <AiOutlineLeft />
        </div>
        <div className="text-main font-medium mx-auto">Chat</div>
      </div>
      <div className="h-[7%] bg-blue-500">
        <div className=" relative border-b-[1px] h-full border-b-solid border-b-gray">
          <input
            type="text"
            onChange={handleSearch}
            value={inputValue}
            className="outline-none w-full border-none h-full  pl-2  pr-9   "
            placeholder="Search for a friend ..."
          />
          <BsSearch className="absolute right-3 cursor-pointer top-1/2 translate-y-[-50%] " />
        </div>
      </div>
      {inputValue && (
        <div className="max-h-[20%] ">
          {" "}
          <div className="flex  gap-4 py-3   overflow-auto">
            {searchedUsers.length === 0
              ? "No user with that username"
              : [...foundUsers]}
          </div>
        </div>
      )}

      {!inputValue && (
        <div className="h-[20%] ">
          <div className="text-main">Connected Friends</div>
          <div className="flex  gap-4 pb-3  overflow-auto">
            {[...connectedUsers]}
          </div>
        </div>
      )}
      <div className="border-b-[1px]    border-gray text-main">Messages</div>
      <div className="h-[66%] pr-5 overflow-auto">
        <div className="  ">
          <div>{[...lastMessages]}</div>
        </div>
      </div>
    </div>
  );
}

export default Chat;
