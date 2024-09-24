const express = require("express");
const { Tasks } = require("../controller/task");

const taskRouter = express.Router();
const tasks = new Tasks();
// Pass the functions as handlers, not invoke them
taskRouter.post("/task/create", tasks.createTask);
taskRouter.post("/task/insert/collaborator", tasks.insertTaskCollabortor);
taskRouter.get("/task/insert/collaborator", tasks.insertTaskCollabortor);
taskRouter.get("/task/collabortors/retrive", tasks.retriveTaskollabortor);
taskRouter.get("/task/collaborate/retrive", tasks.retriveTasksCollaborate);
taskRouter.get("/project/tasks/retrive", tasks.retriveTasksReleaetedToProject);

taskRouter.delete("/task/collabortors/delete", tasks.deleteTaskCollaborator);
taskRouter.put("/task/updateStatus", tasks.UpdateStatus);
taskRouter.put("/task/updateTaskName", tasks.UpdateTaskName);
taskRouter.put("/task/updateTaskDesc", tasks.UpdateTaskDesc);
taskRouter.delete("/task/delete", tasks.deleteTask);

module.exports = { taskRouter };
