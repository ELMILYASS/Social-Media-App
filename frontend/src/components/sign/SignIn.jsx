import React, { useState } from "react";
import Input from "./Input";
import SocialIcon from "./SocialIcon";
import { BiSolidUser, BiLogIn } from "react-icons/bi";
import { RiLockPasswordFill } from "react-icons/ri";
import { FaTwitter, FaFacebookF } from "react-icons/fa";

import { FcGoogle } from "react-icons/fc";
import handleSign from "./HandleSign";
function SignIn({ position }) {
  const [userInfo, setUserInfo] = useState({
    email: {
      email: "",
      placeholder: "Email",
      color: "gray-500",
      iconColor: "dark",
    },
    password: {
      password: "",
      placeholder: "Password",
      color: "gray-500",
      iconColor: "dark",
    },
  });
  const [warning, setWarning] = useState("");
  return (
    <div
      className={` md:w-1/2 h-full  duration-[0.3s] mt-5  text-center p-8  w-full translate-x-[${position}]  flex flex-col justify-center `}
    >
      <div className="mb-5">
        <h1 className="text-2xl font-bold">Welcome Back!</h1>
        <p className="text-sm text-dark">Sign in to your Account</p>
        {warning && <p className="text-red-500 text-md mt-2">{warning}</p>}
      </div>
      <form action="">
        <div>
          <Input
            placeholder={userInfo.email.placeholder}
            color={userInfo.email.color}
            Icon={<BiSolidUser />}
            iconColor={userInfo.email.iconColor}
            type={"text"}
            info={[userInfo, setUserInfo]}
            name="email"
          />
          <Input
            placeholder={userInfo.password.placeholder}
            color={userInfo.password.color}
            iconColor={userInfo.password.iconColor}
            Icon={<RiLockPasswordFill />}
            type={"password"}
            info={[userInfo, setUserInfo]}
            name="password"
          />
        </div>

        <div className="flex justify-between w-full gap-3 mb-5">
          <button
            onClick={(e) =>
              handleSign(e, [userInfo, setUserInfo], [warning, setWarning])
            }
            className="bg-main w-1/2 rounded-full text-white cursor-pointer h-10 flex items-center justify-center"
          >
            <BiLogIn className="mr-2 text-lg" />
            Sign in
          </button>

          <div className="hover:bg-main cursor-pointer duration-[0.2s] leading-5 hover:text-white text-dark shadow-xl w-1/2 rounded-full flex items-center justify-center  h-10">
            Forgot Password?
          </div>
        </div>
      </form>
      <div className="text-sm mb-3 text-dark  flex items-center justify-center">
        <span className="w-1/3 h-0.5 bg-dark"></span>
        <span className="w-1/4 ">Or login with</span>
        <span className="w-1/3 h-0.5 bg-dark"></span>
      </div>
      <div className="flex justify-center">
        <SocialIcon Icon={<FaFacebookF />} />
        <SocialIcon Icon={<FcGoogle />} />
        <SocialIcon Icon={<FaTwitter />} />
      </div>
    </div>
  );
}

export default SignIn;
