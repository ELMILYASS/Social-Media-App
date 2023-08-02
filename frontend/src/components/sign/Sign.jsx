import React, { useState } from "react";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import Image from "./Image";
import Background from "./Background";
import NavBar from "./NavBar";
import image2 from "../../images/istockphoto-1266468568-612x612.jpg";
import image1 from "../../images/man-using-mobile-phone-2839467-2371260.png";
function Sign() {
  const [positions, setPositions] = useState({
    signIn: "0",
    signUp: "100%",
    signInImage: "0",
    signUpImage: "-100%",
  });
  return (
    <div className="relative flex items-center justify-center h-screen overflow-hidden">
      <Background />
      <div className="w-[80%] h-[80%]  shadow-[0_0_30px_rgb(0,0,0,0.2)] bg-white rounded-md overflow-hidden flex items-center relative ">
        <NavBar positions={[positions, setPositions]} />

        <div className="md:w-1/2 w-full relative flex items-center   h-[80%]">
          <SignIn position={positions.signIn} />
          <Image position={positions.signUpImage} url={image1} />
        </div>
        <div className="md:w-1/2 w-full relative flex items-center h-[80%]">
          <Image position={positions.signInImage} url={image2} />
          <SignUp position={positions.signUp} />
        </div>
      </div>
    </div>
  );
}

export default Sign;
