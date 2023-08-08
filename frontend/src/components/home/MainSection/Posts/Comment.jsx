import React from "react";
import img from "../../../Images/pexels-pixabay-220453.jpg";

function Comment() {
  return (
    <div className="relative flex ">
      <img
        src={img}
        alt="image"
        className="h-[50px]  w-[50px] mr-3 rounded-full object-cover "
      />
      <div className="flex flex-col w-[100%]">
        <div className="mb-2">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo,
          provident? Expedita temporibus explicabo deserunt eaque quis, enim,
          repellendus eum tenetur iste nulla cumque pariatur laborum eveniet
          sequi illum molestias? Ea? Lorem ipsum dolor sit, amet consectetur
          adipisicing
        </div>
        <img
          src={img}
          alt=""
          className="object-cover rounded-xl h-[300px] md:h-[500px]"
        />
      </div>
    </div>
  );
}

export default Comment;
