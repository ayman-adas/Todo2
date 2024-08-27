const express = require("express");
const {
  AuthController
} = require("../controller/auth");

const authRouters = express.Router();
auth=new AuthController()
// Pass the functions as handlers, not invoke them
authRouters.post("/signUp",auth.signUp);
authRouters.post("/login", auth.login);
authRouters.post("/forgetPassword",auth. forgetPassword);
authRouters.patch("/updatePassword",auth. updatePassword);
authRouters.get("/users",auth.retrieveUsers)

module.exports = {authRouters};
