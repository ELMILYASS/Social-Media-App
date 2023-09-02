import React, { useContext } from "react";
import Post from "./Post";
import { UserContext } from "../../../../App";
function Posts({ posts }) {
  const [user, setUser] = useContext(UserContext).user;
  const [isDark, setIsDark] = useContext(UserContext).isDark;

  return (
    <div
      style={{
        backgroundColor: isDark ? "var(--darkSecond)" : "",
        color: isDark ? "white" : "",
        borderColor: isDark ? "rgb(38,38,38)" : "var(--gray)",
      }}
      className="= bg-white border-[1px] border-gray hover:shadow-[0_10px_30px_rgb(0,0,0,0.2)] duration-[0.3s] p-5 rounded-xl flex flex-col gap-8 max-sm:mb-[70px]"
    >
      {posts.length > 0 ? (
        [
          ...posts.map((post, index) => {
            return (
              <Post
                text={post?.content}
                imgs={post.images}
                userId={post.userId}
                createdAt={post.createdAt}
                postId={post.postId}
                likes={post.likes}
                comments={post.comments}
              />
            );
          }),
        ]
      ) : (
        <div>No posts yet</div>
      )}
    </div>
  );
}

export default Posts;
