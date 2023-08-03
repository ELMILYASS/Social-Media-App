export default function handleSign(
  e,
  [userInfo, setUserInfo],
  [isEmailCorrect, setIsEmailCorrect]
) {
  e.preventDefault();
  for (let field in userInfo) {
    if (userInfo[field][field] === "") {
      if (field == "email") {
        setIsEmailCorrect(true);
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
          setIsEmailCorrect(false);
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
          setIsEmailCorrect(true);
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
}
