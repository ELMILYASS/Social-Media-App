import React from "react";
import Stories from "./Stories/Stories";
import Post from "./UserPost/UserPost";
import Posts from "./Posts/Posts";
import { BsSearch } from "react-icons/bs";
function MainSection() {
  return (
    <div className="bg-backgroundGray section sm:ml-[90px]  sm:p-6 p-4 flex flex-col gap-2 relative">
      <div className="flex w-full justify-between   mb-[10px]  max-[500px]:flex-col max-[500px]:gap-2">
        <h1 className=" text-2xl mb-1 ">
          <span className="text-main font-bold  ">B</span>logging
        </h1>
        <div className="relative w-[300px] max-[500px]:w-full">
          <input
            type="text"
            className="outline-none w-full border-none h-[35px]   pl-2  pr-9  rounded-xl"
            placeholder="Search ..."
          />
          <BsSearch className="absolute right-3 cursor-pointer top-1/2 translate-y-[-50%] " />
        </div>
      </div>
      <Stories />
      <Post />
      <Posts />
    </div>
  );
}

export default MainSection;
