import React from "react";
import { Outlet } from "react-router-dom";

function RequiredAuth() {
  return <Outlet />;
}

export default RequiredAuth;
