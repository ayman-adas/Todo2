const express = require("express");
const { SubTaskAction } = require("../controller/subTaskAction");
const subTaskActionRouter = express.Router();
const subTaskAction = new SubTaskAction();
subTaskActionRouter.post(
  "/subTaskAction/create",
  subTaskAction.createSubTaskAction
);

module.exports = { subTaskActionRouter };
