import React, { useState } from "react";

function NavBar(props) {
  const [positions, setPositions] = props.positions;
  const [haveAnAccount, setHaveAnAccount] = useState(false);
  function handleClick() {
    setPositions({
      signIn: !haveAnAccount ? "-100%" : "0",
      signUp: !haveAnAccount ? "0" : "100%",
      signInImage: !haveAnAccount ? "100%" : "0",
      signUpImage: !haveAnAccount ? "0" : "-100%",
    });
    setHaveAnAccount((prev) => !prev);
  }
  return (
    <div className="p-7  absolute w-full top-0 flex">
      <h1 className="mr-auto text-xl">
        <span className="text-main font-bold  ">B</span>logging
      </h1>
      <div>
        <span>
          {haveAnAccount ? "Already have an account" : "New User?"}
          <span className="cursor-pointer text-main" onClick={handleClick}>
            {" "}
            {haveAnAccount ? "Sign In" : "Sign Up"}
          </span>
        </span>
      </div>
    </div>
  );
}

export default NavBar;
