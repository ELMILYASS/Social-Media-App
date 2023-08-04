export default function handleSign(
  e,
  [userInfo, setUserInfo],
  [warning, setWarning]
) {
  e.preventDefault();
  for (let field in userInfo) {
    if (userInfo[field][field] === "") {
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
    } else {
      console.log("good");
    }
  }
}
