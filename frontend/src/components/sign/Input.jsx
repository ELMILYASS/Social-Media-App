import React, { useState } from "react";

function Input({ placeholder, Icon, type, info, name }) {
  const [userInfo, setUserInfo] = info;
  const [focus, setFocus] = useState(false);
  const [hidden, setHidden] = useState(
    type === "password" ? "password" : "text"
  );
  return (
    <div className="relative  h-[40px]  mb-3">
      <div
        className={`absolute top-1/2 translate-y-[-50%] left-3 ${
          focus ? "text-main" : "text-dark"
        }`}
      >
        {Icon}
      </div>
      <input
        type={hidden}
        name={name}
        value={userInfo.name}
        placeholder={placeholder}
        onChange={(e) => {
          setUserInfo((prev) => {
            return {
              ...prev,
              [e.target.name]: e.target.value,
            };
          });
        }}
        onBlur={() => {
          if (type === "password") {
            setHidden("password");
          }
          setFocus(false);
        }}
        onFocus={() => {
          if (type === "password") {
            setHidden("text");
          }
          setFocus(true);
        }}
        className="rounded-full border-solid focus:border-main  border-dark border-[1px] py-3 pl-8 pr-3 outline-none h-full w-full"
      />
    </div>
  );
}

export default Input;
