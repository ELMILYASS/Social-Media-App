import React, { useContext, useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import endPoint from "../services/backendEndPoint";
import axios from "axios";
import Sign from "../components/sign/Sign";
import { sendRequest } from "./Request";
import { UserContext } from "../App";
import { io } from "socket.io-client";

function RequiredAuth() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSignPage, setIsSignPage] = useState(false);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useContext(UserContext).user;
  const [socket, setSocket] = useContext(UserContext).socket;
  const [connected, setConnected] = useContext(UserContext).connected;
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
          setSocket(null);
          console.log(err);
          setIsSignPage(true);
          // navigate("/")
        }
      }
    } else {
      setConnected(false);
      setIsSignPage(true);
      setSocket(null);
    }
    setLoading(true);
  };
  function getUser() {
    const query = `query getUser($email : String){
      user(email: $email){
        userId
        email
    
        country
        city
        image
        notifications{
          notificationId
          userId
          postId
          message
          createdAt
          isSeen
          status
          post{
            postId
            content
            images
            videos
            createdAt
            updatedAt
            userId
            likes {
              userId
              emoji
            }
            comments {
              commentId
              userId
              content
              createdAt
            }
          
          }
        }
        sentInvitations
        receivedInvitations
        description
        friends
        username
        
      }
    }`;

    sendRequest(query, { email: localStorage.getItem("email") }).then((data) =>
      setUser(data.data.data.user)
    );
  }
  function updateSocketIoId(socketIoId) {
    // console.log("socket id is :,", socketIoId);
    const query = `
          mutation updateUserSocketId(
           
            $email: String!,
            $socketIoId: String,
           
          ) {
            updateUserSocketId(
              email: $email,
              socketIoId: $socketIoId
            ) {
              userId
              email
          
              country
              city
              socketIoId
              image
              description
              notifications{
                notificationId
                userId
                postId
                message
                createdAt
                isSeen
                status
                post{
                  postId
                  content
                  images
                  videos
                  createdAt
                  updatedAt
                  userId
                  likes {
                    userId
                    emoji
                  }
                  comments {
                    commentId
                    userId
                    content
                    createdAt
                  }
                
                }
              }
              sentInvitations
              receivedInvitations
              friends
              username
        
            }
          }
        `;

    try {
      sendRequest(query, {
        email: localStorage.getItem("email"),
        socketIoId: socketIoId,
      }).then((data) => {
        setUser(data.data.data.updateUserSocketId);
      });
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    testUserPermission(); //must be called each time we change the route that is why we did not need to use a dependency array
  });
  useEffect(() => {
    if (connected) {
      getUser();
      const newSocket = io(`${endPoint}`);
      newSocket.on("connect", () => {
        setSocket(newSocket);
        updateSocketIoId(newSocket.id);
      });
    } else {
      updateSocketIoId("");
      setSocket(null);
      setUser(null);
    }
  }, [connected]);
  return isSignPage ? <Sign /> : loading && <Outlet />;
}

export default RequiredAuth;
