import React, { useState } from "react";
import Input from "./Input";
import SocialIcon from "./SocialIcon";
import { BiSolidUser } from "react-icons/bi";
import { RiLockPasswordFill } from "react-icons/ri";
import { FaTwitter, FaFacebookF } from "react-icons/fa";
import { BsGoogle } from "react-icons/bs";
function SignIn({ position }) {
  const [userInfo, setUserInfo] = useState({ email: "", password: "" });
  console.log(userInfo);
  return (
    <div
      className={`absolute transform text-center p-8 h-full  w-full translate-x-[${position}]  flex flex-col justify-center `}
    >
      <div className="mb-5">
        <h1 className="text-2xl font-bold">Welcome Back!</h1>
        <p className="text-sm">Sign in to your Account</p>
      </div>
      <div>
        <Input
          placeholder={"Email"}
          Icon={<BiSolidUser />}
          type={"text"}
          info={[userInfo, setUserInfo]}
          name="email"
        />
        <Input
          placeholder={"Password"}
          Icon={<RiLockPasswordFill />}
          type={"password"}
          info={[userInfo, setUserInfo]}
          name="password"
        />
      </div>

      <div className="flex justify-between w-full gap-3 mb-5">
        <button className="bg-main w-1/2 rounded-full text-white h-10">
          Sign in
        </button>
        <button className="hover:bg-main duration-[0.2s] hover:text-white text-dark shadow-xl w-1/2 rounded-full  h-10">
          Forgot Password?
        </button>
      </div>
      <p className="text-sm mb-3">Or login with</p>
      <div className="flex justify-center">
        <SocialIcon Icon={<FaFacebookF />} />
        <SocialIcon Icon={<BsGoogle />} />
        <SocialIcon Icon={<FaTwitter />} />
      </div>
    </div>
  );
}

export default SignIn;
