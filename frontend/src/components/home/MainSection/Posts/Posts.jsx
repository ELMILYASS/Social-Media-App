import React from "react";
import Post from "./Post";
import img from "../../../Images/pexels-pixabay-220453.jpg";
function Posts() {
  return (
    <div className="= bg-white shadow-[0_10px_30px_rgb(0,0,0,0.2)] p-5 rounded-xl flex flex-col gap-8 max-sm:mb-[70px]">
      
      <Post
        text={
          "  Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam sequimollitia sed tenetur in, possimus laborum repudiandae praesentium voluptates tempora facere sapiente ullam voluptatem neque nisi quam"
        }
        imgs={[img]}
      />
      <Post text={"  Lorem ipsum dolor "} imgs={[img, img, img]} />
      <Post text={"  Lorem "} imgs={[]} />
    </div>
  );
}

export default Posts;
