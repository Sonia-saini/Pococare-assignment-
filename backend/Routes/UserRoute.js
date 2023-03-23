const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Usermodel } = require("../Models/Usermodel");
require("dotenv").config();


const userRouter = express.Router();

userRouter.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const user = await Usermodel.find({ email });
  console.log(user.length>0)
 if(user.length===0){  
    bcrypt.hash(password, 8, async (err, password) => {
      if (err) {
        console.log(err);
      } 
      else{
        const user = new Usermodel({
          name,
          email,
          password: password,
        });
        await user.save();
  res.status(201).send("Registration Successful");

      }
      
      
    });
  }else{
    res.send("this email id already exists")
  }
}catch (error) {
    console.log("Some Error occurred, unable to Register.");
    res.send(error);
  }
});

userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await Usermodel.find({ email });
    const hashed_password = user[0].password;
    if (user.length > 0) {
      bcrypt.compare(password, hashed_password, (err, result) => {
        if (result) {
          const token = jwt.sign({ userID: user[0]._id }, process.env.key, {
            expiresIn: "24h",
          });
          res.status(201).send({ msg: "Login Successful", token: token,user:user });
        } else {
          res.status(400).send("Wrong credentials, please try again.");
        }
      });
    }
  } catch (error) {
    console.log("Some Error occurred, unable to Login.");
    console.log(error);
  }
});

module.exports = { userRouter };
