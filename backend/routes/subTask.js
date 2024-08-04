const express = require("express");
const { createSubTask, retriveSubTasksReleaetedToTask } = require("../controller/subTask");
const subTaskRouter = express.Router();
subTaskRouter.post('/subTask/create',createSubTask);
subTaskRouter.get("/tasks/subTasks/retrive", retriveSubTasksReleaetedToTask);

module.exports={subTaskRouter}