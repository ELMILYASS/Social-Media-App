export default function handleSign(
  e,
  [userInfo, setUserInfo],
  [warning, setWarning]
) {
  e.preventDefault();
  for (let field in userInfo) {
    if (userInfo[field][field].trim() === "") {
      if (field == "email") {
        setWarning("");
      }
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
      if (field == "email") {
        const emailRegex = /^[a-z]+[0-9]+@gmail.com$/g;
        if (!emailRegex.test(userInfo.email.email)) {
          setWarning("Email is not correct, Please enter a valid Email");
          setUserInfo((prev) => {
            return {
              ...prev,
              [field]: {
                ...userInfo[field],
                placeholder: `${field}`,
                color: "red-500",
                iconColor: "red-500",
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
                color: "gray-500",
                iconColor: "dark",
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
              color: "gray-500",
              iconColor: "dark",
            },
          };
        });
      }
    }
  }
  console.log(
    userInfo?.confirmPassword?.confirmPassword === userInfo.password.password
  );
}
