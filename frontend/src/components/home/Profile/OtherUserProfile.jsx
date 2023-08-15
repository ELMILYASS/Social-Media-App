import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import img from "../../Images/pexels-pixabay-220453.jpg";

import ProfileInfo from "./ProfileInfo";
import EditAddButton from "./EditAddButton";
import { AiOutlineEdit, AiOutlineLeft, AiOutlineUserAdd } from "react-icons/ai";
import Post from "../MainSection/Posts/Post";
import {
  getUserByUsername,
  getUserProfileImage,
} from "../../../controllers/User";
import { UserContext } from "../../../App";

function OtherUserProfile() {
  const Navigate = useNavigate();
  const { username } = useParams();
  const [user, setUser] = useContext(UserContext).user;
  const [userInfo, setUserInfo] = useState();
  const [imageURL, setImageURL] = useState();

  useEffect(() => {
    const fetchUserData = async (username) => {
      const userData = await getUserByUsername(username);
      setUserInfo(userData);
      const image = await getUserProfileImage(userData.userId);
      setImageURL(image);
    };
    if (username) {
      fetchUserData(username);
    }
  }, []);

  return (
    <div className=" section sm:ml-[90px] min-h-[100vh]   sm:p-6 p-4 flex flex-col gap-5 items-center">
      <div className="  text-xl w-full ">
        <div className=" z-50 cursor-pointer " onClick={() => Navigate(-1)}>
          <AiOutlineLeft />
        </div>
      </div>

      <div className=" flex flex-col items-center gap-1">
        <div className="h-[140px] rounded-full bg-white border-solid border-main border-[1px]  p-[2px] w-[140px] overflow-hidden max-[400px]:w-[120px] max-[400px]:h-[120px]">
          <img
            src={imageURL}
            alt="Profile Image"
            className="object-cover w-full h-full rounded-full duration-[0.3s]  hover:scale-110"
          />
        </div>
        <div className="text-center">
          <div className="text-xl text-main">
            {userInfo?.username || "Username"}
          </div>
          {userInfo?.description && (
            <div className="text-dark">{user.description}</div>
          )}

          {userInfo?.country !== "Select Country" &&
            userInfo?.country &&
            userInfo?.city && (
              <div className="flex gap-1 justify-center">
                <GoLocatio className="text-xl" />

                <div> {`${userInfo.country} ${userInfo.city}`}</div>
              </div>
            )}
          <div className="flex justify-center items-center text-dark gap-1"></div>
        </div>
      </div>
      <div className="flex px-6  max-w-full justify-center gap-7 bg-white rounded-xl  shadow-[0_10px_30px_rgb(0,0,0,0.2)]">
        <ProfileInfo number={50} content={"posts"} />
        <ProfileInfo number={122} content={"friends"} />
        <ProfileInfo number={90} content={"likes"} />
      </div>
      <div className="flex flex-wrap gap-4 justify-center ">
        {user?.friends.includes(userInfo?.userId) ? (
          "Friend"
        ) : user?.sentInvitations.includes(userInfo?.userId) ? (
          <EditAddButton
            Icon={<AiOutlineUserAdd />}
            content={"Delete Invitation"}
            userId={userInfo?.userId}
          />
        ) : user?.receivedInvitations.includes(userInfo?.userId) ? (
          <EditAddButton
            Icon={<AiOutlineUserAdd />}
            content={"Accept Invitation"}
            userId={userInfo?.userId}
          />
        ) : (
          <EditAddButton
            Icon={<AiOutlineUserAdd />}
            content={"Send Invitation"}
            userId={userInfo?.userId}
          />
        )}
      </div>
      <div>
        <div className="text-center text-xl text-dark border-solid border-gray pb-2 border-b-[1px] mb-5">
          Posts
        </div>
        <div className="bg-white rounded-xl p-5 max-sm:mb-16 flex flex-col gap-5">
          <Post
            text={
              "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil nesciunt repudiandae accusantium eos, cum inventore, ipsam eveniet quis et, veniam illum cupiditate quibusdam perferendis tempora. Cupiditate architecto nihil consequuntur nesciunt. "
            }
            imgs={[img]}
          />
          <Post
            text={
              "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil nesciunt repudiandae accusantium eos, cum inventore, ipsam eveniet quis et, veniam illum cupiditate quibusdam perferendis tempora. Cupiditate architecto nihil consequuntur nesciunt. "
            }
            imgs={[img]}
          />
        </div>
      </div>
    </div>
  );
}

export default OtherUserProfile;
