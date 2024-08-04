const express = require("express");
const { con } = require("../services/database");
const databaseRouter = express.Router();
databaseRouter.get('/',con)
module.exports=databaseRouter