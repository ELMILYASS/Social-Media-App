import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

import { GoLocation } from "react-icons/go";
import ProfileInfo from "./ProfileInfo";
import EditAddButton from "./EditAddButton";
import { AiOutlineEdit, AiOutlineUserAdd } from "react-icons/ai";
import Post from "../MainSection/Posts/Post";
import JSZip from "jszip";
import {
  getUserByUsername,
  getUserPosts,
  getUserProfileImage,
} from "../../../services/UserController";
import { UserContext } from "../../../App";
import AddFriend from "../Friends/AddFriend";
import { getPostImages } from "../../../services/PostController";

function Profile({ setDisplayed }) {
  const Navigate = useNavigate();
  useEffect(() => {
    setDisplayed("profile");
  }, []);
  const [friendsNumber, setFriendsNumber] = useState();

  const [interactionsNumber, setInteractionsNumber] = useState();
  const [friends, setFriends] = useState();
  const [posts, setPosts] = useState([]);
  const [changeAddPost, setChangeAddPost] =
    useContext(UserContext).changedAddedPost;
  const [user, setUser] = useContext(UserContext).user;
  const [imageURL, setImageURL] = useContext(UserContext).image;

  const [addFriend, setAddFriend] = useState(false);

  const styles = {
    width: addFriend ? "80%" : "0",
    height: addFriend ? "80vh" : "0",
    zIndex: addFriend ? "30" : "-2",
    opacity: addFriend ? "1" : "0",
  };

  useEffect(() => {
    async function getPosts() {
      let res = await getUserPosts(user?.userId);

      for (let i = 0; i < res.length; i++) {
        const images = await getPostImages(res[i].postId);

        res[i].images = images || [];
        res[i].createdAt = res[i]?.createdAt;
      }

      //sort posts

      res = res.sort((postA, postB) => postB.createdAt - postA.createdAt);

      setInteractionsNumber(
        res.reduce((prev, current) => {
          return prev + current.likes.length;
        }, 0)
      );

      setPosts(res);
    }

    setFriendsNumber(user?.friends.length);
    if (user?.userId) {
      getPosts();
    }
  }, [user, changeAddPost]);
  const [isDark, setIsDark] = useContext(UserContext).isDark;

  return (
    <div className=" section sm:ml-[90px] min-h-[100vh]   sm:p-6 p-4 flex flex-col gap-5 items-center">
      <AddFriend style={styles} setAddFriend={setAddFriend} />
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
            {user?.username || "Username"}
          </div>
          {user?.description && (
            <div className="text-black">{user.description}</div>
          )}

          {user?.country !== "Select Country" &&
            user?.country &&
            user?.city && (
              <div className="flex gap-1 justify-center">
                <GoLocation className="text-xl" />

                <div> {`${user.country} ${user.city}`}</div>
              </div>
            )}
          <div className="flex justify-center items-center text-dark gap-1"></div>
        </div>
      </div>
      <div className="flex px-6  max-w-full justify-center gap-7  rounded-xl bg-main text-white border-[1px] border-dark hover:bg-dark duration-[0.3s] hover:shadow-[0_0px_30px_rgb(0,0,0,0.1)]">
        <ProfileInfo number={posts.length} content={"posts"} />
        <ProfileInfo number={friendsNumber} content={"friends"} />
        <ProfileInfo number={interactionsNumber} content={"likes"} />
      </div>
      <div className="flex flex-wrap gap-4 justify-center ">
        <EditAddButton Icon={<AiOutlineEdit />} content={"Edit profile"} />

        <EditAddButton
          Icon={<AiOutlineUserAdd />}
          content={"Add friends"}
          setAddFriend={setAddFriend}
        />
      </div>
      <div className="w-full">
        <div
          style={{
            color: isDark ? "white" : "",
          }}
          className="text-center text-xl text-black border-solid border-gray pb-2 border-b-[1px] mb-5"
        >
          Posts
        </div>
        <div
          style={{
            backgroundColor: isDark ? "#111" : "",
            color: isDark ? "white" : "",
          }}
          className="bg-white rounded-xl p-5 max-sm:mb-16 flex flex-col gap-5 "
        >
          {posts.length > 0 ? (
            [
              ...posts.map((post, index) => {
                return (
                  <Post
                    text={post?.content}
                    imgs={post.images}
                    userId={user.userId}
                    createdAt={post.createdAt}
                    postId={post.postId}
                    likes={post.likes}
                    comments={post.comments}
                  />
                );
              }),
            ]
          ) : (
            <div
              style={{
                color: isDark ? "white" : "",
              }}
              className="text-center"
            >
              No posts yet
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;
