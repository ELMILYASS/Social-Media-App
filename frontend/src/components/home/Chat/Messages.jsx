import React, { useContext, useEffect, useRef, useState } from "react";
import { AiOutlineLeft, AiOutlineSend } from "react-icons/ai";
import { useNavigate, useParams } from "react-router";
import {
  getUserByUsername,
  getUserProfileImage,
} from "../../../services/UserController";
import { BsArrowLeft } from "react-icons/bs";
import { UserContext } from "../../../App";
import { BiImageAdd } from "react-icons/bi";
import {
  getMessages,
  getMessagesWith,
  seenMessages,
  sendMessage,
} from "../../../services/ChatController";
import Message from "./Message";
function Messages({ setDisplayed }) {
  const Navigate = useNavigate();
  const { username } = useParams();
  const [newMessage, setNewMessage] = useContext(UserContext).newMessage;
  const [userInfo, setUserInfo] = useState();
  const [numberUnseenMessages, setNumberUnseenMessages] =
    useContext(UserContext).numberUnseenMessages;
  const [socket, setSocket] = useContext(UserContext).socket;
  const [user, setUser] = useContext(UserContext).user;
  const divRef = useRef();
  useEffect(() => {
    divRef.current.scrollTop = divRef.current.scrollHeight;
  });
  useEffect(() => {
    setDisplayed("chat");
  }, []);

  useEffect(() => {
    async function getUserInfo() {
      const User = await getUserByUsername(username);
      const Image = await getUserProfileImage(User.userId);
      User.image = Image;
      setUserInfo(User);
    }

    getUserInfo();
  }, [newMessage]);

  const inputRef = useRef();
  const [warning, setWarning] = useState("");
  const [messages, setMessages] = useState("");

  useEffect(() => {
    async function getUserMessages() {
      const messages = await getMessagesWith(user.userId, userInfo.userId);
      setNumberUnseenMessages(0);
      setMessages(messages);
    }
    if (userInfo) {
      getUserMessages();
    }
  }, [newMessage, user, userInfo]);
  async function seeMessages() {
    const newMessages = await seenMessages(user.userId, userInfo.userId);
    setMessages(newMessages);
  }

  useEffect(() => {
    if (userInfo) {
      seeMessages();
    }
  }, [userInfo]);
  // useEffect(() => {
  //   console.log("mlmmmmm", messages);
  //   setNewMessage((prev) => {
  //     return !prev;
  //   });
  // }, [messages]);
  async function send() {
    if (!inputRef.current.value.trim()) {
      setWarning("Impossible to send an empty message");
      setTimeout(() => {
        setWarning("");
      }, 1500);
    } else {
      const res = await sendMessage(
        user.userId,
        userInfo.userId,
        inputRef.current.value
      );
      setMessages(res);
      setTimeout(() => {
        divRef.current.scrollTop = divRef.current.scrollHeight;
      }, 0);
      socket.emit("new-message", user.userId, userInfo.userId);
      inputRef.current.value = "";
    }
  }
  const [isDark, setIsDark] = useContext(UserContext).isDark;

  return (
    <div className="section sm:ml-[90px] flex flex-col gap-4 sectionHeight  sm:p-6 p-4">
      <div className="relative gap-2 text-xl h-[7%] px-2 flex items-center mb-2">
        <div className=" z-50 cursor-pointer " onClick={() => Navigate(-1)}>
          <BsArrowLeft
            style={{
              color: isDark ? "white" : "",
            }}
            className="hover:scale-125 duration-[0.3s]"
          />
        </div>

        <div
          className="relative cursor-pointer"
          onClick={() => Navigate(`/home/profile/${username}`)}
        >
          <img
            src={userInfo?.image}
            alt=""
            className="w-[50px] h-[50px] object-cover rounded-full"
          />
          {userInfo?.socketIoId && (
            <>
              <div className="absolute w-3 h-3 bg-green-500 rounded-full right-0 top-[70%] z-10 border-[2px] border-white"></div>
            </>
          )}
        </div>
        <div>
          <div
            onClick={() => Navigate(`/home/profile/${username}`)}
            className="text-main font-medium cursor-pointer text-[18px]"
          >
            {username}
          </div>
          <div
            style={{
              backgroundColor: isDark ? "#111" : "",
              color: isDark ? "white" : "",
            }}
            className="text-[16px]"
          >
            {userInfo?.socketIoId ? "Online" : "Offline"}
          </div>
        </div>
      </div>
      <div
        ref={divRef}
        style={{ borderColor: isDark ? "rgb(38,38,38)" : "var(--gray)" }}
        className="h-[83%] flex flex-col gap-2 p-3 border-second overflow-auto border-[1px] rounded-xl"
      >
        {messages &&
          messages
            .sort((msA, msB) => msA.createdAt - msB.createdAt)
            .map((element) => {
              return (
                <Message
                  senderId={element.senderId}
                  receiverId={element.receiverId}
                  content={element.content}
                  createdAt={element.createdAt}
                  userInfo={userInfo}
                />
              );
            })}
      </div>
      {warning && (
        <div className="text-sm text-red-700 w-full text-center">{warning}</div>
      )}
      <div
        style={{
          backgroundColor: isDark ? "var(--darkSecond)" : "",
          borderColor: isDark ? "rgb(38,38,38)" : "var(--gray)",
        }}
        className=" h-[45px]    flex justify-between px-4 gap-5 items-center  rounded-xl border-solid border-gray border-[1px]"
      >
        <input
          style={{
            color: isDark ? "white" : "",
            backgroundColor: isDark ? "var(--darkSecond)" : "",
          }}
          type="text"
          placeholder="Send a message ..."
          className="h-full outline-none w-full "
          ref={inputRef}
        />

        <div className=" flex gap-3 ">
          <div
            onClick={send}
            className="h-8  cursor-pointer rounded-full text-xl w-8  bg-main p-1 flex items-center justify-center text-white"
          >
            <AiOutlineSend />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Messages;
