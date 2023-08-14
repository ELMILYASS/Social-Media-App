import React, { useContext, useEffect } from "react";
import { AiOutlineLeft } from "react-icons/ai";
import { useNavigate } from "react-router";
import { UserContext } from "../../../App";

function Friends() {
  const Navigate = useNavigate();
  const [friends, setFriends] = useState([]);
  const [user, setUser] = useContext(UserContext).user;
  useEffect(()=>{
  
  
  },)
  return (
    <div className="section sm:ml-[90px]  sectionHeight">
      <div className="relative text-center text-xl ">
        <div
          className="absolute z-50 cursor-pointer top-1/2 translate-y-[-50%]"
          onClick={() => Navigate(-1)}
        >
          <AiOutlineLeft />
        </div>
        <div className="text-main font-medium">Friends</div>
      </div>
    </div>
  );
}

export default Friends;
