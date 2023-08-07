import React, { useState } from "react";

function BarElement({ Icon, content, navigate, currentPage, info }) {
  const [clicked, setClicked] = currentPage;
  const styles = {
    backgroundColor: content === clicked ? "var(--main)" : "var(--second)",

    color: content === clicked ? "white" : "var(--dark)",
  };
  return (
    <div
      style={styles}
      onClick={(e) => navigate(e, content)}
      className={`flex w-[40px] max-[450px]:w-1/6 ${info} hover:w-[35%] px-2    sm:ml-5 barElement cursor-pointer   h-[40px]  sm:hover:w-full justify-center items-center rounded-full duration-[0.3s]   `}
    >
      <div className="text-2xl    ">{Icon}</div>
      <div className=" rounded-full ml-2  content  hidden">{content}</div>
    </div>
  );
}

export default BarElement;
