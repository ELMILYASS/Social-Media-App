import React from "react";
import img from "../../../Images/pexels-pixabay-220453.jpg";
import {
  AiOutlineCamera,
  AiOutlineVideoCamera,
  AiOutlinePlus,
} from "react-icons/ai";
import PostIcon from "./PostIcon";
function Post() {
  return (
    <div className="bg-white shadow-[0_10px_30px_rgb(0,0,0,0.2)] p-4 min-h-[150px]  rounded-xl">
      <div className="w-full h-[80px] flex  mb-5">
        <img
          src={img}
          alt="image"
          className="h-[50px] w-[50px] mr-3 rounded-full object-cover "
        />
        <textarea
          type="text"
          placeholder="What are you thinking"
          rows={"4"}
          className="w-full    resize-none p-2 textarea outline-none"
        />
      </div>
      <div className="flex flex-wrap gap-2 justify-center">
        <div className="mr-auto flex gap-3 ">
          <PostIcon Icon={<AiOutlineCamera />} />
          <PostIcon Icon={<AiOutlineVideoCamera />} />
          <PostIcon Icon={<AiOutlinePlus />} />
        </div>
        <button className="bg-main rounded-full  text-white px-10">
          Share
        </button>
      </div>
    </div>
  );
}

export default Post;
