import React from "react";

import PostIcon from "../UserPost/PostIcon";
import { AiOutlineCamera, AiOutlineVideoCamera } from "react-icons/ai";
import Comment from "./Comment";
function Comments({ displayed }) {
  return (
    <div className="p-4 relative bg-white shadow-[0_10px_30px_rgb(0,0,0,0.2)]  flex flex-col  ">
      <div className="max-h-[600px] min-h-[100px] overflow-auto flex flex-col gap-8 mb-5">
        <Comment />
        {/* <Comment />
        {/* <Comment />
        <Comment />
        <Comment />
        <Comment />
        <Comment /> */}
      </div>
      <div className=" w-full h-[50px]    flex justify-between px-4 gap-5 items-center  rounded-xl border-solid border-[1px] border-main">
        <input
          type="text"
          placeholder="Your Comment ..."
          className="h-full outline-none w-full  "
        />
        <div className=" flex gap-3 ">
          <PostIcon Icon={<AiOutlineCamera />} />
          <PostIcon Icon={<AiOutlineVideoCamera />} />
        </div>
      </div>
    </div>
  );
}

export default Comments;
