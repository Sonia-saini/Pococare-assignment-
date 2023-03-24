import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../Pages/Home";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import Privateroute from "./privateroute";

function Allroutes() {
  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <Privateroute>
              <Home />
            </Privateroute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default Allroutes;
