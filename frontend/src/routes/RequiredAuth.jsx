import React, { useContext, useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import endPoint from "../backendEndPoint";
import axios from "axios";
import Sign from "../components/sign/Sign";

function RequiredAuth() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSignPage, setIsSignPage] = useState(false);
  const testUserPermission = async () => {
    const accessToken = localStorage.getItem("accessToken");

    const email = localStorage.getItem("email");
    if (accessToken) {
      try {
        const res = await axios.get(`${endPoint}/verify`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        if (location.pathname === "/") {
          navigate("/home");
        }
        setIsSignPage(false);
      } catch (err) {
        try {
          //refreshing accessToken
          const res = await axios.get(`${endPoint}/refresh`, {
            withCredentials: true,
          });
          console.log("new token " + res.data.accessToken);
          localStorage.setItem("accessToken", res.data.accessToken);
          if (location.pathname === "/") {
            navigate("/home");
          }
        } catch (err) {
          console.log("here3");
          console.log(err);
          setIsSignPage(true);
        }
      }
    } else {
      setIsSignPage(true);
    }
  };

  useEffect(() => {
    testUserPermission();
  }, []);
  return isSignPage ? <Sign /> : <Outlet />;
}

export default RequiredAuth;
