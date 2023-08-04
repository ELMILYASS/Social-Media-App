import React, { useState } from "react";

function Input({ placeholder, Icon, type, info, name, color, iconColor }) {
  const [userInfo, setUserInfo] = info;

  const [focus, setFocus] = useState(false);
  const [hidden, setHidden] = useState(
    type === "password" ? "password" : "text"
  );

  const Styles = {
    "--color": focus ? "var(--main)" : iconColor,
  };
  const borderStyles = {

    "--color": focus ? "var(--main)" : color,
  };
  return (
    <div className="relative  h-[40px]  mb-3">
      <div
        style={Styles}
        className={`absolute  top-1/2 iconColor translate-y-[-50%] left-3`}
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
        style={borderStyles}
        className={`rounded-full border-solid  borderColor border-[2px] py-3 pl-8 pr-3 outline-none h-full w-full`}
      />
    </div>
  );
}

export default Input;
