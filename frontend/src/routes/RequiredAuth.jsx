import React, { useContext, useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import endPoint from "../backendEndPoint";
import axios from "axios";
import Sign from "../components/sign/Sign";
import sendRequest from "../components/Request";
import { UserContext } from "../App";

function RequiredAuth() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSignPage, setIsSignPage] = useState(false);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useContext(UserContext);

  const [connected, setConnected] = useState(false);
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
        setConnected(true);

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

          localStorage.setItem("accessToken", res.data.accessToken);
          setConnected(true);

          if (location.pathname === "/") {
            navigate("/home");
          }
        } catch (err) {
          setConnected(false);
          console.log(err);
          setIsSignPage(true);
          // navigate("/")
        }
      }
    } else {
      setConnected(false);
      setIsSignPage(true);
    }
    setLoading(true);
  };
  function getUser() {
    const query = `query getUser($email : String){
      user(email: $email){
        userId
        email
        dateOfBirth
        country
        city
        description
        friends{
          userId
          email
          dateOfBirth
          country
          city
          username
          description
        }
        username
        
      }
    }`;

    sendRequest(query, { email: localStorage.getItem("email") }).then((data) =>
      setUser(data.data.data.user)
    );
  }
  useEffect(() => {
    testUserPermission(); //must be called each time we change the route that is why we did not need to use a dependency array
  });
  useEffect(() => {
    if (connected) {
      getUser();
    } else {
      setUser(null);
    }
  }, [connected]);
  return isSignPage ? <Sign /> : loading && <Outlet />;
}

export default RequiredAuth;
