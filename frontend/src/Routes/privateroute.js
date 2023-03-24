import React from "react";
import { Navigate } from "react-router-dom";

function Privateroute({ children }) {
  let user = JSON.parse(localStorage.getItem("loginuser")) || {};

  if (!user.token) {
    alert("you can't access home page please login first");
    return <Navigate to="/login" />;
  }
  return children;
}

export default Privateroute;
