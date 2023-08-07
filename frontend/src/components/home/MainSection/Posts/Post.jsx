import React, { useEffect, useRef, useState } from "react";
import img from "../pexels-pixabay-220453.jpg";
import { BsThreeDotsVertical } from "react-icons/bs";
import { RiSaveLine, RiSaveFill } from "react-icons/ri";
import { BiShare, BiSolidShare } from "react-icons/bi";
import PostBar from "./PostBar";
import InteractBar from "./InteractBar";
function Post({ text, imgs }) {
  const [isTruncated, setIsTruncated] = useState(false);
  const paragraphRef = useRef(null);
  const [displayPostBar, setDisplayPostBar] = useState(false);
  function displayBar() {
    setDisplayPostBar(!displayPostBar);
  }
  const BarStyles = {
    opacity: displayPostBar ? "1" : "0",
  };
  useEffect(() => {
    if (paragraphRef?.current?.clientHeight > 100) {
      setIsTruncated(true);
    }
  }, []);

  const toggleTruncate = () => {
    setIsTruncated(!isTruncated);
  };

  const len = imgs.length;

  const styles =
    len === 4 || len === 2
      ? "grid grid-cols-2"
      : len === 3
      ? "grid grid-cols-2 "
      : len === 1
      ? "grid grid-cols-1 "
      : len > 4
      ? "flex overflow-x-auto pb-4"
      : "";

  const images = imgs.map((img, index) => {
    if (len === 3 && index === 2) {
      return (
        <img
          src={img}
          alt="image"
          className="col-span-2 max-h-[600px] w-full object-cover rounded-xl"
        />
      );
    }
    if (len > 4) {
      return (
        <img
          src={img}
          alt="image"
          className="shrink-0 max-h-[600px] w-full object-cover rounded-xl"
        />
      );
    }
    return (
      <img
        src={img}
        alt="image"
        className="max-h-[600px] w-full object-cover rounded-xl"
      />
    );
  });
  return (
    <div className="relative">
      <div className="flex mb-4 ">
        <img
          src={img}
          alt="image"
          className="h-[50px] w-[50px] mr-3 rounded-full object-cover "
        />
        <div className="mr-auto">
          <p className="font-medium">Courtney Herny</p>
          <p className="text-sm text-gray">20 min ago</p>
        </div>
        <div className="cursor-pointer" onClick={displayBar}>
          <BsThreeDotsVertical />
        </div>
      </div>

      <div
        style={BarStyles}
        className="absolute w-[130px] h-[130px] duration-[0.3s]  px-5 flex flex-col items-center justify-center max-[400px]:w-[70%] rounded-xl gap-6 bg-main top-5 right-3 "
      >
        <PostBar
          Icon={<RiSaveLine />}
          onHoverIcon={<RiSaveFill />}
          content={"Save"}
        />
        <PostBar
          Icon={<BiShare />}
          onHoverIcon={<BiSolidShare />}
          content={"Share"}
        />
      </div>

      {text.trim().length > 0 && (
        <>
          <p
            ref={paragraphRef}
            style={{
              maxHeight: isTruncated ? "50px" : "none",
              overflow: "hidden",
            }}
          >
            {text}
          </p>
          <p className="text-blue-500 ">
            {isTruncated && (
              <button onClick={toggleTruncate}>Lire la suite</button>
            )}
          </p>
        </>
      )}
      {styles && <div className={` ${styles} mt-4 gap-5 w-full`}>{images}</div>}
      <InteractBar />
    </div>
  );
}

export default Post;
