import React, { useState } from "react";

function Input({ placeholder, Icon, type, info, name, color, iconColor }) {
  const [userInfo, setUserInfo] = info;

  const [focus, setFocus] = useState(false);
  const [hidden, setHidden] = useState(
    type === "password" ? "password" : "text"
  );

  return (
    <div className="relative  h-[40px]  mb-3">
      <div
        className={`absolute  top-1/2 translate-y-[-50%] left-3  ${
          focus ? "text-main" : `text-${iconColor}`
        }`}
      >
        {Icon}
      </div>
      <input
        type={hidden}
        name={name}
        required={true}
        value={userInfo[name][name]}
        placeholder={placeholder}
        onChange={(e) => {
          setUserInfo((prev) => {
            return {
              ...prev,
              [e.target.name]: {
                ...prev[e.target.name],
                [e.target.name]: e.target.value,
              },
            };
          });
        }}
        onBlur={(e) => {
          setUserInfo((prev) => {
            return {
              ...prev,
              [e.target.name]: {
                ...prev[e.target.name],
                [e.target.name]: e.target.value.trim(),
              },
            };
          });
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
        className={`rounded-full border-solid  border-${color}  ${
          focus ? "border-main" : `border-${color}`
        }  border-[2px] py-3 pl-8 pr-3 outline-none h-full w-full`}
      />
    </div>
  );
}

export default Input;
