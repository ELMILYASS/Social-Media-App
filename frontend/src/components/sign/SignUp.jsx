import React, { useState } from "react";
import Input from "./Input";
import { BiSolidUser } from "react-icons/bi";
import { HiUserAdd } from "react-icons/hi";
import { RiLockPasswordFill } from "react-icons/ri";
import { MdEmail } from "react-icons/md";
import { FcGoogle } from "react-icons/fc";
import { GiConfirmed } from "react-icons/gi";
import handleSign from "./HandleSign";
function SignUp({ position, positionSmall }) {
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
    username: {
      username: "",
      placeholder: "Username",
      color: "gray-500",
      iconColor: "dark",
    },
    confirmPassword: {
      confirmPassword: "",
      placeholder: "Confirm password",
      color: "gray-500",
      iconColor: "dark",
    },
  });
  function handleSignUp(e) {
    console.log(userInfo);
    e.preventDefault();
    for (let field in userInfo) {
      if (userInfo[field][field] === "") {
        setUserInfo((prev) => {
          return {
            ...prev,
            [field]: {
              ...userInfo[field],
              placeholder: `Please enter your ${field}`,
              color: "red-500",
              iconColor: "red-500",
            },
          };
        });
      } else {
        setUserInfo((prev) => {
          return {
            ...prev,
            [field]: {
              ...userInfo[field],
              placeholder: `${field}`,
              color: "gray-500",
              iconColor: "dark",
            },
          };
        });
      }
    }
  }
  const [isEmailCorrect, setIsEmailCorrect] = useState(true);
  return (
    <div
      className={`absolute   w-full md:w-1/2  duration-[0.3s] md:translate-x-[${position}] translate-x-[${positionSmall}] mt-5  p-8 flex flex-col justify-center text-center `}
    >
      <div className="mb-5">
        <h1 className="text-2xl font-bold mt-8">Hello friend!</h1>
        <p className="text-sm text-dark">Create your account </p>
        {!isEmailCorrect && (
          <p className="text-red-500 text-md mt-2">Email is not correct</p>
        )}
      </div>
      <form action="">
        <Input
          type="text"
          name="email"
          color={userInfo.email.color}
          placeholder={userInfo.email.placeholder}
          iconColor={userInfo.email.iconColor}
          info={[userInfo, setUserInfo]}
          Icon={<MdEmail />}
        />
        <Input
          type="text"
          name="username"
          color={userInfo.username.color}
          placeholder={userInfo.username.placeholder}
          iconColor={userInfo.username.iconColor}
          info={[userInfo, setUserInfo]}
          Icon={<BiSolidUser />}
        />
        <Input
          type="password"
          name="password"
          color={userInfo.password.color}
          placeholder={userInfo.password.placeholder}
          iconColor={userInfo.password.iconColor}
          info={[userInfo, setUserInfo]}
          Icon={<RiLockPasswordFill />}
        />{" "}
        <Input
          type="password"
          name="confirmPassword"
          color={userInfo.confirmPassword.color}
          placeholder={userInfo.confirmPassword.placeholder}
          iconColor={userInfo.confirmPassword.iconColor}
          info={[userInfo, setUserInfo]}
          Icon={<GiConfirmed />}
        />
        <button
          className="bg-main w-full rounded-full text-white cursor-pointer h-10 flex items-center justify-center mb-5"
          onClick={(e) =>
            handleSign(
              e,
              [userInfo, setUserInfo],
              [isEmailCorrect, setIsEmailCorrect]
            )
          }
        >
          <HiUserAdd className="mr-2 text-lg" />
          Sign up
        </button>
      </form>
      <div className="bg-white hover:bg-main duration-[0.3s] w-full rounded-full  hover:text-white  text-dark cursor-pointer h-10 flex items-center shadow-[0_10px_30px_rgb(0,0,0,0.3)] justify-center">
        <FcGoogle className="mr-2 text-lg" />
        <button>Sign up with Google </button>
      </div>
      <p></p>
    </div>
  );
}

export default SignUp;
