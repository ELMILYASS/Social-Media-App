import React, { useState, useEffect } from "react";

function NavBar(props) {
  const [
    positions,
    setPositions,
    [positionsSmallScreen, setPositionsSmallScreen],
  ] = props.positions;
  const [haveAnAccount, setHaveAnAccount] = useState(false);

  function handleClick() {
    setPositions({
      signIn: !haveAnAccount ? "-100%" : "0",
      signUp: !haveAnAccount ? "100%" : "200%",

      signInImage: !haveAnAccount ? "200%" : "100%",
      signUpImage: !haveAnAccount ? "0" : "-100%",
    });
    setPositionsSmallScreen({
      signIn: !haveAnAccount ? "-100%" : "0",
      signUp: !haveAnAccount ? "0%" : "100%",
    });
    setHaveAnAccount((prev) => !prev);
  }
  return (
    <div className="h-[10%]    p-5 w-full  z-10 flex flex-wrap justify-center items-center ">
      <h1 className="mr-auto text-xl mb-1">
        <span className="text-main   ">I</span>lyass
        <span className="text-main   ">N</span>et
      </h1>
      <div className="z-10">
        {haveAnAccount ? "Already have an account? " : "New User?"}
        <span className="cursor-pointer text-main " onClick={handleClick}>
          {" "}
          {haveAnAccount ? "Sign In" : "Sign Up"}
        </span>
      </div>
    </div>
  );
}

export default NavBar;
