import axios from "axios";
import endPoint from "../backendEndPoint";

export let access_token = "vava";
async function handleSign(
  e,
  [userInfo, setUserInfo],
  [warning, setWarning],
  Navigate
) {
  e.preventDefault();
  let sign = true;

  let accessToken = "";
  for (let field in userInfo) {
    if (userInfo[field][field] === "") {
      sign = false;
      if (field == "email") {
        setWarning("");
      }
      setUserInfo((prev) => {
        return {
          ...prev,
          [field]: {
            ...userInfo[field],
            placeholder: `Please enter your ${field}`,
            color: "red",
            iconColor: "red",
          },
        };
      });
    } else {
      if (field == "email") {
        const emailRegex = /^[a-z]+[0-9]+@gmail.com$/g;
        if (!emailRegex.test(userInfo.email.email)) {
          sign = false;
          setWarning("Email is not correct, Please enter a valid Email");
          setUserInfo((prev) => {
            return {
              ...prev,
              [field]: {
                ...userInfo[field],
                placeholder: `${field}`,
                color: "red",
                iconColor: "red",
              },
            };
          });
        } else {
          setWarning("");
          setUserInfo((prev) => {
            return {
              ...prev,
              [field]: {
                ...userInfo[field],
                placeholder: `${field}`,
                color: "#ccc",
                iconColor: "var(--dark)",
              },
            };
          });
        }
      } else {
        setUserInfo((prev) => {
          return {
            ...prev,
            [field]: {
              ...userInfo[field],
              placeholder: `${field}`,
              color: "#ccc",
              iconColor: "var(--dark)",
            },
          };
        });
      }
    }
  }

  if (userInfo.password.password) {
    if (userInfo?.confirmPassword?.confirmPassword) {
      if (
        userInfo.confirmPassword.confirmPassword === userInfo.password.password
      ) {
        setUserInfo((prev) => {
          return {
            ...prev,
            [userInfo.confirmPassword]: {
              ...userInfo[userInfo.confirmPassword],
              placeholder: `${"Confirm Password"}`,
              color: "#ccc",
              iconColor: "var(--dark)",
            },
          };
        });
      } else {
        sign = false;
        setWarning((prev) =>
          prev ? `${prev} and confirm your password ` : "Confirm your password"
        );

        setUserInfo((prev) => {
          return {
            ...prev,
            confirmPassword: {
              ...userInfo.confirmPassword,
              placeholder: `${"Confirm Password"}`,
              color: "red",
              iconColor: "red",
            },
          };
        });
      }
    }
  }
  if (sign) {
    if (Object.keys(userInfo).length === 2) {
      const info = {
        email: userInfo.email.email,
        password: userInfo.password.password,
      };
      try {
        const res = await axios.post(`${endPoint}/auth`, info, {
          withCredentials: true,
        });

        // store access token locally to send it with next requests and redirect user to home page

        localStorage.setItem("accessToken", res.data.accessToken);
        localStorage.setItem("email", info.email);
        Navigate("/home");
      } catch (err) {
        setWarning(err.response.data.message);
      }
    } else {
      const info = {
        username: userInfo.username.username,
        email: userInfo.email.email,
        password: userInfo.password.password,
      };
      try {
        const res = await axios.post(`${endPoint}/register`, info);
        const res2 = await axios.post(`${endPoint}/auth`, info, {
          withCredentials: true,
        });

        localStorage.setItem("accessToken", res2.data.accessToken);
        localStorage.setItem("email", info.email);
        Navigate("/home");
      } catch (err) {
        setWarning(err.response.data.message);
      }
    }
  }
}
export default handleSign;
