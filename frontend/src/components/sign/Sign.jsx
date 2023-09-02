import React, { useState, useEffect, useContext } from "react";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import Image from "./Image";
import Background from "./Background";
import NavBar from "./NavBar";
import image2 from "../../assets/istockphoto-1266468568-612x612.jpg";
import image1 from "../../assets/man-using-mobile-phone-2839467-2371260.png";
import { UserContext } from "../../App";
function Sign() {
  const [positions, setPositions] = useState({
    signIn: "0",
    signUp: "200%",
    signInImage: "100%",
    signUpImage: "-100%",
  });
  const [positionsSmallScreen, setPositionsSmallScreen] = useState({
    signIn: "0",
    signUp: "100%",
  });

  return (
    <div className="relative flex items-center justify-center h-screen  overflow-hidden">
      <Background />
      <div className="w-[80%] h-[80%] hover:shadow-[0_0_30px_rgb(0,0,0,0.1)] duration-[0.3s] border-[1px] border-gray bg-white rounded-xl">
        <NavBar
          positions={[
            positions,
            setPositions,
            [positionsSmallScreen, setPositionsSmallScreen],
          ]}
        />

        <div className=" h-[90%] relative   flex  items-center  overflow-hidden ">
          <SignIn position={positions.signIn} />
          <Image position={positions.signUpImage} url={image1} />

          <Image position={positions.signInImage} url={image2} />
          <SignUp
            position={positions.signUp}
            positionSmall={positionsSmallScreen.signUp}
          />
        </div>
      </div>
    </div>
  );
}

export default Sign;
