const express = require("express");
const {
    signUp,
    login,
    forgetPassword,
    updatePassword,
} = require("../controller/auth");

const authRouters = express.Router();

// Pass the functions as handlers, not invoke them
authRouters.post("/signUp", signUp);
authRouters.post("/login", login);
authRouters.post("/forgetPassword", forgetPassword);
authRouters.patch("/updatePassword", updatePassword);

module.exports = {authRouters};
