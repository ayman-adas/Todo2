const express = require("express");
const { SubTask} = require("../controller/subTask");
const subTaskRouter = express.Router();
const subtask= new SubTask()
subTaskRouter.post('/subTask/create',subtask.createSubTask);
subTaskRouter.get("/tasks/subTasks/retrive", subtask.retriveSubTasksReleaetedToTask );

module.exports={subTaskRouter}