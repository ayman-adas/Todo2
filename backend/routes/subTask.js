const express = require("express");
const { SubTask } = require("../controller/subTask");
const subTaskRouter = express.Router();
const subtask = new SubTask();
subTaskRouter.post("/subTask/create", subtask.createSubTask);
subTaskRouter.get(
  "/tasks/subTasks/retrive",
  subtask.retriveSubTasksReleaetedToTask
);
subTaskRouter.patch("/subTask/update/isDone", subtask.UpdateIsDoneSubTask);
subTaskRouter.patch("/subTask/update/EndDate", subtask.UpdateEndDateSubTask);
subTaskRouter.patch("/subTask/update/Priority", subtask.UpdatePrioritySubTask);
subTaskRouter.patch(
  "/subTask/update/StartDate",
  subtask.UpdateStartDateSubTask
);
subTaskRouter.patch("/subTask/update/SubTaskName", subtask.UpdateSubTaskName);
subTaskRouter.delete("/subTask/delete", subtask.deleteSubTask);

module.exports = { subTaskRouter };
