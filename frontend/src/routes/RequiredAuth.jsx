import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import axios from "axios";

function RequiredAuth() {
  const accessToken = localStorage.getItem("accessToken");
  console.log(accessToken);
  // try {
  //   const res = axios.get("/verify");
  // } catch (err) {}
  return <Outlet />;
}

export default RequiredAuth;
