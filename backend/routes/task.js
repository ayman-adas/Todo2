const express = require("express");
const { createTask, insertTaskCollabortor, retriveTaskollabortor, retriveTasksCollaborate, deleteTaskCollaborator, UpdateIsDoneTask, retriveTasksReleaetedToProject } = require("../controller/task");

const taskRouter = express.Router();

// Pass the functions as handlers, not invoke them
taskRouter.post("/task/create", createTask);
taskRouter.post("/task/insert/collaborator", insertTaskCollabortor);
taskRouter.get("/task/insert/collaborator", insertTaskCollabortor);
taskRouter.get("/task/collabortors/retrive", retriveTaskollabortor);
taskRouter.get("/task/collaborate/retrive", retriveTasksCollaborate);
taskRouter.get("/project/tasks/retrive", retriveTasksReleaetedToProject);

taskRouter.delete("/task/collabortors/delete", deleteTaskCollaborator);
taskRouter.put("/task/updateIsDone", UpdateIsDoneTask);

module.exports = {taskRouter};
