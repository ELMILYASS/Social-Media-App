import React, { useState } from "react";

function BarElement({ Icon, content, navigate, currentPage }) {
  const [clicked, setClicked] = currentPage;
  const styles = {
    backgroundColor: content === clicked ? "var(--main)" : "var(--second)",
    borderColor: content === clicked ? "var(--second)" : "",
  };
  return (
    <div
      style={styles}
      onClick={(e) => navigate(e, content)}
      className="flex w-[40px]  px-2 barElement cursor-pointer  max-sm:mx-2  sm:mb-5 h-[40px] hover:w-[35%] sm:hover:w-full justify-center items-center bg-main rounded-full duration-[0.3s] border-second border-4 border-solid"
    >
      <div className="text-xl  text-white  ">{Icon}</div>
      <div className=" rounded-full ml-2 text-white content  hidden">
        {content}
      </div>
    </div>
  );
}

export default BarElement;
