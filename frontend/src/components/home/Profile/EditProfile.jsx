import React, { useContext, useEffect, useState } from "react";
import { AiOutlineEdit, AiOutlineLeft } from "react-icons/ai";
import { useNavigate } from "react-router";

import Input from "../../sign/Input";
import { BsCalendarDate, BsCardImage } from "react-icons/bs";
import { MdEmail, MdOutlineDescription } from "react-icons/md";
import { LiaCitySolid } from "react-icons/lia";
import { BiSolidUser } from "react-icons/bi";
import { RiLockPasswordFill } from "react-icons/ri";
import { UserContext } from "../../../App";
import { sendRequest, sendAxiosRequest } from "../../Request";
import axios from "axios";
function EditProfile({ setDisplayed }) {
  useEffect(() => {
    setDisplayed("profile");
  }, []);
  const [user, setUser] = useContext(UserContext).user;
  const [imageURL, setImageURL] = useContext(UserContext).image;
  console.log("imageurl is : ", imageURL);
  const [saved, setSaved] = useState(false);
  const styles = {
    opacity: saved ? "1" : "0",
    zIndex: saved ? "1" : "-1",
  };
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({
    email: {
      email: user?.email,
      placeholder: "Email",
      color: "var(--gray)",
      iconColor: "var(--dark)",
    },
    password: {
      password: "",
      placeholder: "Type your password",
      color: "var(--gray)",
      iconColor: "var(--dark)",
    },
    username: {
      username: user?.username,
      placeholder: "Username",
      color: "var(--gray)",
      iconColor: "var(--dark)",
    },
    dateOfBirth: {
      dateOfBirth: user?.dateOfBirth,
      placeholder: "Date of Birth",
      color: "var(--gray)",
      iconColor: "var(--dark)",
    },
    country: {
      country: user?.country,
      placeholder: "Country",
      color: "var(--gray)",
      iconColor: "var(--dark)",
    },
    city: {
      city: user?.city,
      placeholder: "City",
      color: "var(--gray)",
      iconColor: "var(--dark)",
    },
    description: {
      description: user?.description,
      placeholder: "Description",
      color: "var(--gray)",
      iconColor: "var(--dark)",
    },
  });

  useEffect(() => {
    setUserInfo({
      email: {
        email: user?.email,
        placeholder: "Email",
        color: "var(--gray)",
        iconColor: "var(--dark)",
      },
      password: {
        password: "",
        placeholder: "Type your new password",
        color: "var(--gray)",
        iconColor: "var(--dark)",
      },
      username: {
        username: user?.username,
        placeholder: "Username",
        color: "var(--gray)",
        iconColor: "var(--dark)",
      },
      dateOfBirth: {
        dateOfBirth: user?.dateOfBirth,
        placeholder: "Date of Birth",
        color: "var(--gray)",
        iconColor: "var(--dark)",
      },
      country: {
        country: user?.country,
        placeholder: "Country",
        color: "var(--gray)",
        iconColor: "var(--dark)",
      },
      city: {
        city: user?.city,
        placeholder: "City",
        color: "var(--gray)",
        iconColor: "var(--dark)",
      },
      description: {
        description: user?.description,
        placeholder: "Write a brief description about you ",
        color: "var(--gray)",
        iconColor: "var(--dark)",
      },
    });
  }, [user?.email]);
  const [warning, setWarning] = useState("");
  const [Imagewarning, setImageWarning] = useState("");
  function handleEditProfile(e) {
    e.preventDefault();
    let correctInfo = true;
    const emailRegex = /^[a-z]+[0-9]+@gmail.com$/g;
    if (userInfo.email.email === "") {
      setWarning((prev) =>
        prev === "" ? "Email is required" : "Email and email are required"
      );
    }

    if (userInfo.username.username === "") {
      setWarning((prev) =>
        prev === "" ? "Username is required" : "Email and username are required"
      );
    }

    if (userInfo.username.username === "" && userInfo.email.email === "") {
      setWarning((prev) => "Email and username are required"),
        setUserInfo((prev) => {
          return {
            ...prev,
            email: {
              email: userInfo.email.email,
              placeholder: `Please enter an email`,
              color: "red",
              iconColor: "red",
            },

            username: {
              username: userInfo.username.username,
              placeholder: `Please enter a username`,
              color: "red",
              iconColor: "red",
            },
          };
        });
    } else {
      if (userInfo.username.username === "") {
        if (!emailRegex.test(userInfo.email.email)) {
          setWarning((prev) => "Username is required and Email is not valid"),
            setUserInfo((prev) => {
              return {
                ...prev,
                email: {
                  ...userInfo.email,
                  placeholder: `Please enter a valid email`,
                  color: "red",
                  iconColor: "red",
                },
                username: {
                  ...userInfo.username,
                  placeholder: `Please enter a username`,
                  color: "red",
                  iconColor: "red",
                },
              };
            });
        } else {
          setWarning((prev) => "Username is required"),
            setUserInfo((prev) => {
              return {
                ...prev,
                email: {
                  ...userInfo.email,

                  color: "var(--gray)",
                  iconColor: "var(--dark)",
                },
                username: {
                  ...userInfo.username,
                  placeholder: `Please enter a username`,
                  color: "red",
                  iconColor: "red",
                },
              };
            });
        }
      } else {
        if (userInfo.email.email === "") {
          setWarning((prev) => "Email is required"),
            setUserInfo((prev) => {
              return {
                ...prev,
                email: {
                  ...userInfo.email,
                  placeholder: `Please enter an email`,
                  color: "red",
                  iconColor: "red",
                },
                username: {
                  ...userInfo.username,

                  color: "var(--gray)",
                  iconColor: "var(--dark)",
                },
              };
            });
        } else {
          if (!emailRegex.test(userInfo.email.email)) {
            setWarning((prev) => "Email is not valid"),
              setUserInfo((prev) => {
                return {
                  ...prev,
                  email: {
                    ...userInfo.email,
                    placeholder: `Please enter a valid email`,
                    color: "red",
                    iconColor: "red",
                  },
                  username: {
                    ...userInfo.username,

                    color: "var(--gray)",
                    iconColor: "var(--dark)",
                  },
                };
              });
          } else {
            setWarning((prev) => ""),
              setUserInfo((prev) => {
                return {
                  ...prev,
                  email: {
                    ...userInfo.email,

                    color: "var(--gray)",
                    iconColor: "var(--dark)",
                  },
                  username: {
                    ...userInfo.username,

                    color: "var(--gray)",
                    iconColor: "var(--dark)",
                  },
                };
              });
          }

          const updatedUser = {
            email: userInfo.email.email,
            password: userInfo.password.password,
            description: userInfo.description.description || "",
            username: userInfo.username.username,
            country: userInfo.country.country || "",
            city:
              userInfo.country.country !== "Select Country"
                ? userInfo.city.city
                  ? userInfo.city.city
                  : ""
                : "",
          };
          const query = `
          mutation updateUser(
            $userId: ID!,
            $username: String!,
            $email: String!,
            $password: String,
            $description: String,
            $country: String,
            $city: String
          ) {
            updateUser(
              userId: $userId,
              username: $username,
              email: $email,
              password: $password,
              description: $description,
              country: $country,
              city: $city
            ) {
              userId
              email
              dateOfBirth
              country
              city
      
              sentInvitations
              receivedInvitations
              description
              friends 
              username
              image
              socketIoId
            }
          }
        `;

          try {
            sendRequest(query, {
              userId: user.userId,
              username: userInfo.username.username,
              email: userInfo.email.email,
              country: userInfo.country.country,
              city: userInfo.city.city,
              password: userInfo.password.password,
              description: userInfo.description.description,
            }).then((data) => {
              setSaved(true);
              setTimeout(() => {
                setSaved(false);
              }, 1000);
              setUser(data.data.data.updateUser);
            });
          } catch (err) {
            console.log(err);
          }
        }
      }
    }
  }

  async function changeImage(e) {
    const file = e.target.files[0];
    console.log("file is ;", file);
    const formData = new FormData();
    formData.append(file.name, file);
    console.log(user.userId);
    formData.append("userId", user.userId);
    console.log(formData);
    try {
      const res = await sendAxiosRequest("POST", "profileImage", formData);
      console.log(res);
      setImageWarning("");

      setImageURL(URL.createObjectURL(file));
    } catch (err) {
      setImageWarning(err.response.data.message);
    }
  }
  return (
    <div className="section sm:ml-[90px]  sectionHeight flex flex-col justify-evenly  sm:px-10 px-4 py-1 overflow-auto">
      <div className="flex flex-col gap-3">
        <div className="relative text-center text-xl ">
          <div
            className="absolute z-50 cursor-pointer top-1/2 translate-y-[-50%]"
            onClick={() => navigate("/home/profile")}
          >
            <AiOutlineLeft />
          </div>
          <div className="text-main font-medium">Edit Profile</div>
        </div>

        <div className=" relative w-fit  mx-auto">
          <div className="h-[140px] rounded-full bg-white border-solid border-main border-[1px]  p-[2px] w-[140px] overflow-hidden max-[400px]:w-[120px] max-[400px]:h-[120px]">
            <img
              src={imageURL}
              alt="Profile Image"
              className="object-cover w-full h-full rounded-full duration-[0.3s]  hover:scale-110"
            />
            <label htmlFor="imageUpload" className="cursor-pointer">
              <BsCardImage
                className="absolute bottom-3 text-2xl right-2"
                color="var(--main)"
              />
            </label>
          </div>
        </div>

        <input
          type="file"
          id="imageUpload"
          className="hidden"
          name="file"
          onChange={changeImage}
        />
      </div>
      {warning && <div className="text-red-500  text-center">{warning}</div>}
      {Imagewarning && (
        <div className="text-red-500  text-center">{Imagewarning}</div>
      )}
      <div style={styles} className="text-main text-center duration-[0.3s]">
        Saved Well
      </div>
      <form className="flex flex-col  sm:px-10">
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
          type="text"
          name="description"
          color={userInfo.description.color}
          placeholder={userInfo.description.placeholder}
          iconColor={userInfo.description.iconColor}
          info={[userInfo, setUserInfo]}
          Icon={<MdOutlineDescription />}
        />
        <Input
          type="date"
          name="dateOfBirth"
          color={userInfo.dateOfBirth.color}
          placeholder={userInfo.dateOfBirth.placeholder}
          iconColor={userInfo.dateOfBirth.iconColor}
          info={[userInfo, setUserInfo]}
          Icon={<BsCalendarDate />}
        />
        <Input
          type="text"
          name="country"
          color={userInfo.country.color}
          placeholder={userInfo.country.placeholder}
          iconColor={userInfo.country.iconColor}
          info={[userInfo, setUserInfo]}
          Icon={<LiaCitySolid />}
        />
        {userInfo.country.country &&
          userInfo.country.country !== "Select Country" && (
            <Input
              type="text"
              name="city"
              color={userInfo.city.color}
              placeholder={userInfo.city.placeholder}
              iconColor={userInfo.city.iconColor}
              info={[userInfo, setUserInfo]}
              Icon={<LiaCitySolid />}
            />
          )}
        <button
          className="bg-main w-full rounded-full text-white cursor-pointer h-10 text-[18px] flex items-center justify-center mb-5"
          onClick={handleEditProfile}
        >
          <AiOutlineEdit className="mr-2 text-xl" />
          Save changes
        </button>
      </form>
    </div>
  );
}

export default EditProfile;

/*
<div>

</div>
*/
