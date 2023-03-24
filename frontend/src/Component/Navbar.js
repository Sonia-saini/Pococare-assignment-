import { Box, Button } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <Box display={"flex"} gap="20px" bg="blue.700" p={"10px"}>
      <Link to="/">
        {" "}
        <Button>HOME</Button>
      </Link>
      <Link to="/login">
        {" "}
        <Button>LOGIN</Button>
      </Link>
      <Link to="/register">
        {" "}
        <Button>REGISTER</Button>
      </Link>
    </Box>
  );
}

export default Navbar;
