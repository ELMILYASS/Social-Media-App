import React, { useContext, useEffect, useState } from "react";
import { AiOutlineLeft } from "react-icons/ai";
import { Routes, useNavigate } from "react-router";
import { UserContext } from "../../../App";

import { getUserById } from "../../../controllers/User";
import Invitations from "./Invitations";
import MyFriends from "./MyFriends";
import ReceivedInvitations from "./ReceivedInvitations";

function Friends({ setDisplayed }) {
  const Navigate = useNavigate();
  const [friends, setFriends] = useState([]);
  const [invitations, setInvitations] = useState([]);
  const [receivedInvitations, setReceivedInvitations] = useState([]);
  const [user, setUser] = useContext(UserContext).user;
  useEffect(() => {
    setDisplayed("profile");
  }, []);
  useEffect(() => {
    async function getFriends() {
      let array = [];
      for (const i of user.friends) {
        const User = await getUserById(i);

        array.push(User);
      }
      setFriends(array);
    }
    async function getReceivedInvitations() {
      let array = [];
      for (const i of user.receivedInvitations) {
        const User = await getUserById(i);

        array.push(User);
      }
      setReceivedInvitations(array);
    }

    if (user?.friends) {
      getFriends();
    }
    if (user?.receivedInvitations) {
      getReceivedInvitations();
    }
    // <SearchedUser username={u.username} userId={u.userId} image={image} />
  }, [user]);
  return (
    <div className="section sm:ml-[90px] sm:px-10 px-4 py-4 Height flex flex-col gap-6 ">
      <div className="relative  text-xl h-[7%] px-2 flex items-center">
        <div className="  cursor-pointer" onClick={() => Navigate(-1)}>
          <AiOutlineLeft />
        </div>
        <div className="text-main font-medium mx-auto">Friends</div>
      </div>
      <div className="flex overflow-x-auto gap-5 h-full snap-x justify-between pb-3">
        <div className=" w-full min-[720px]:w-[450px] bg-white shadow rounded-xl border-[1px] border-gray overflow-y-auto shrink-0 h-full snap-center">
          <MyFriends />
        </div>

        <div className=" w-full min-[720px]:w-[450px] bg-white shadow rounded-xl overflow-y-auto border-[1px] border-gray shrink-0 h-full snap-center">
          <Invitations />
        </div>
        <div className=" w-full min-[720px]:w-[450px] bg-white shadow rounded-xl overflow-y-auto shrink-0 border-[1px] border-gray h-full snap-center">
          <ReceivedInvitations />
        </div>
      </div>
    </div>
  );
}

export default Friends;
