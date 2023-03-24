import { Heading, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

function Home() {
  const [status, setStatus] = useState(false);
  const user = JSON.parse(localStorage.getItem("loginuser")) || {};
  useEffect(() => {
    fetch(`http://localhost:3004/`, {
      method: "GET",
      headers: {
        token: JSON.parse(localStorage.getItem("loginuser")).token,
      },
    })
      .then((res) => (res.status === 401 && setStatus(true), res.json()))
      .then((res) => console.log(res))
      .catch((err) => console.log(err.status));
    if (status) {
      fetch(`http://localhost:3004/refresh`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          refreshToken: JSON.parse(localStorage.getItem("loginuser"))
            .refreshToken,
        }),
      })
        .then((res) => res.json())
        .then(
          (res) => (
            alert(res.msg),
            localStorage.setItem(
              "loginuser",
              JSON.stringify({ ...user, token: res.token })
            )
          )
        )
        .catch((err) => <Navigate to="/login" />);
    }
  }, [status]);
  return (
    <>
      Home
      <Heading>token:</Heading>
      <Text>{user && user.token}</Text>
    </>
  );
}

export default Home;
