import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import img from "../../Images/pexels-pixabay-220453.jpg";

import ProfileInfo from "./ProfileInfo";
import EditAddButton from "./EditAddButton";
import {
  AiOutlineCloseCircle,
  AiOutlineEdit,
  AiOutlineLeft,
  AiOutlineUserAdd,
  AiOutlineUserDelete,
} from "react-icons/ai";
import Post from "../MainSection/Posts/Post";
import {
  getUserByUsername,
  getUserPosts,
  getUserProfileImage,
} from "../../../controllers/User";
import { UserContext } from "../../../App";
import { MdDownloadDone, MdPersonAddDisabled } from "react-icons/md";
import MyFriends from "../Friends/MyFriends";
import UserFriends from "./UserFriends";
import { GoLocation } from "react-icons/go";

function OtherUserProfile() {
  const Navigate = useNavigate();
  const { username } = useParams();
  const [user, setUser] = useContext(UserContext).user;
  const [userInfo, setUserInfo] = useState();
  const [imageURL, setImageURL] = useState();
  const [isFriend, setIsFriend] = useState(false);
  const [friendsNumber, setFriendsNumber] = useState();
  const [displayFriends, setDisplayFriends] = useState(false);
  const [interactionsNumber, setInteractionsNumber] = useState();

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function getPosts(userInfo) {
      const res = await getUserPosts(userInfo?.userId);

      setInteractionsNumber(
        res.reduce((prev, current) => {
          return prev + current.likes.length;
        }, 0)
      );
      setPosts(res);
    }

    const fetchUserData = async (username) => {
      const userData = await getUserByUsername(username);
      setFriendsNumber(userData?.friends.length);
      getPosts(userData);
      setIsFriend(user.friends.includes(userData.userId));
      setUserInfo(userData);
      const image = await getUserProfileImage(userData.userId);
      setImageURL(image);
    };
    if (username) {
      fetchUserData(username);
    }
  }, [user]);
  const styles = {
    width: displayFriends ? "80%" : "0",
    height: displayFriends ? "80vh" : "0",
    zIndex: displayFriends ? "30" : "-2",
    opacity: displayFriends ? "1" : "0",
  };
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
            <div className="text-dark">{user?.description}</div>
          )}

          {userInfo?.country !== "Select Country" &&
            userInfo?.country &&
            userInfo?.city && (
              <div className="flex gap-1 justify-center">
                <GoLocation className="text-xl" />

                <div> {`${userInfo.country} ${userInfo.city}`}</div>
              </div>
            )}
          <div className="flex justify-center items-center text-dark gap-1"></div>
        </div>
      </div>
      <div className="flex px-6  max-w-full justify-center gap-7  rounded-xl  bg-main text-white border-[1px] border-dark hover:bg-dark duration-[0.3s] hover:shadow-[0_0px_30px_rgb(0,0,0,0.1)]">
        <ProfileInfo
          number={posts.length}
          content={"posts"}
          userInfo={userInfo}
        />
        <ProfileInfo
          number={friendsNumber}
          content={"friends"}
          userInfo={userInfo}
          setDisplayFriends={setDisplayFriends}
          isFriend={isFriend}
        />
        <ProfileInfo
          number={interactionsNumber}
          content={"likes"}
          userInfo={userInfo}
        />
      </div>
      <div className="flex flex-wrap gap-4 justify-center ">
        {user?.friends.includes(userInfo?.userId) ? (
          <EditAddButton
            Icon={<AiOutlineUserDelete />}
            content={"Friend"}
            userId={userInfo?.userId}
          />
        ) : user?.sentInvitations.includes(userInfo?.userId) ? (
          <EditAddButton
            Icon={<MdPersonAddDisabled />}
            content={"Delete Invitation"}
            userId={userInfo?.userId}
          />
        ) : user?.receivedInvitations.includes(userInfo?.userId) ? (
          <EditAddButton
            Icon={<MdDownloadDone />}
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
      <div
        style={styles}
        className="fixed sm:w-[500px] w-[90%] h-[90%] bg-white border-gray border-[1px] rounded-xl z-20  top-1/2 sm:ml-[45px] duration-[0.3s]  left-1/2 translate-y-[-50%] translate-x-[-50%] p-3"
      >
        <UserFriends userData={userInfo} />
        <div
          className="flex justify-end absolute top-1 right-1  cursor-pointer"
          onClick={() => {
            setDisplayFriends(false);
          }}
        >
          <AiOutlineCloseCircle className="text-2xl hover:text-3xl duration-[0.3s]" />
        </div>
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
